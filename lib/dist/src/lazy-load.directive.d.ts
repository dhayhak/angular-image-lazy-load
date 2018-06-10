import { ElementRef, AfterViewInit, OnDestroy, NgZone } from '@angular/core';
export declare class LazyLoadDirective implements AfterViewInit, OnDestroy {
    private _element;
    private _zone;
    private platformId;
    private _intersectionObserver?;
    private _scrollSubscription?;
    src: string;
    constructor(_element: ElementRef, _zone: NgZone, platformId: Object);
    ngAfterViewInit(): void;
    private enableLazyLoad();
    private hasCompatibleBrowser();
    ngOnDestroy(): void;
    private registerIntersectionObserver();
    private checkForIntersection;
    private checkIfIntersecting(entry);
    private load();
    private addScrollListeners();
    private removeListeners();
    private onScroll;
    private isVisible();
    private getScrollPosition();
}
