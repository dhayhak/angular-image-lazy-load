import { Directive, ElementRef, AfterViewInit, OnDestroy, NgZone, PLATFORM_ID, Inject, Input } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Subscription, fromEvent } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

@Directive({
  selector: '[appLazyLoad]'
})
export class LazyLoadDirective implements AfterViewInit, OnDestroy {

  private _intersectionObserver?: IntersectionObserver;
  private _scrollSubscription?: Subscription;
  @Input() src: string;   // The image to be lazy loaded

  constructor(

    private _element: ElementRef,
    private _zone: NgZone,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    _element.nativeElement.style.backgroundColor = 'yellow';
  }

  public ngAfterViewInit() {
    if (isPlatformBrowser(this.platformId)) {
      this.enableLazyLoad();
    } else {
      // running on server, just load the image
      this.load();
    }
  }

  private enableLazyLoad() {
    // Client only code.
    if (this.hasCompatibleBrowser()) {
      this.registerIntersectionObserver();
      if (this._intersectionObserver) {
        this._intersectionObserver.observe(<Element>(this._element.nativeElement));
      }
    } else {
      // add scroll watch if intersection observer is not available
      this.addScrollListeners();
    }
  }

  private hasCompatibleBrowser(): boolean {
    const hasIntersectionObserver = 'IntersectionObserver' in window;
    const userAgent = window.navigator.userAgent;
    const matches = userAgent.match(/Edge\/(\d*)\./i);

    const isEdge = !!matches && matches.length > 1;
    const isEdgeVersion16OrBetter = isEdge && (!!matches && parseInt(matches[1], 10) > 15);

    return hasIntersectionObserver && (!isEdge || isEdgeVersion16OrBetter);
  }

  public ngOnDestroy() {
    this.removeListeners();
  }
  private registerIntersectionObserver(): void {
    if (!!this._intersectionObserver) {
      return;
    }
    this._intersectionObserver = new IntersectionObserver(entries => {
      this.checkForIntersection(entries);
    }, {});
  }

  private checkForIntersection = (entries: Array<IntersectionObserverEntry>) => {
    entries.forEach((entry: IntersectionObserverEntry) => {
      if (this.checkIfIntersecting(entry)) {
        this.load();
        if (this._intersectionObserver) {
          this._intersectionObserver.unobserve(<Element>(this._element.nativeElement));
        }
      }
    });
  }
  private checkIfIntersecting(entry: IntersectionObserverEntry) {
    // For Samsung native browser, IO has been partially implemented where by the
    // callback fires, but entry object is empty. We will check manually.
    if (entry && Object.keys(entry).length) {
      return (<any>entry).isIntersecting && entry.target === this._element.nativeElement;
    }
    return this.isVisible();
  }

  private load(): void {
    this.removeListeners();
    // this.deferLoad.emit();
    this._element.nativeElement.src = this.src;
  }

  private addScrollListeners() {
    if (this.isVisible()) {
      this.load();
      return;
    }
    this._zone.runOutsideAngular(() => {
      this._scrollSubscription = fromEvent(window, 'scroll')
        .pipe(debounceTime(50))
        .subscribe(this.onScroll);
    });
  }

  private removeListeners() {
    if (this._scrollSubscription) {
      this._scrollSubscription.unsubscribe();
    }

    if (this._intersectionObserver) {
      this._intersectionObserver.disconnect();
    }
  }

  private onScroll = () => {
    if (this.isVisible()) {
      this._zone.run(() => this.load());
    }
  }

  private isVisible() {
    const scrollPosition = this.getScrollPosition();
    const elementOffset = this._element.nativeElement.getBoundingClientRect().top;
    return elementOffset <= scrollPosition;
  }

  private getScrollPosition() {
    // Getting screen size and scroll position for IE
    return (window.scrollY || window.pageYOffset)
      + (document.documentElement.clientHeight || document.body.clientHeight);
  }
}
