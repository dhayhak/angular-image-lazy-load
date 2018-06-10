/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { Directive, ElementRef, NgZone, PLATFORM_ID, Inject, Input } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { fromEvent } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
export class LazyLoadDirective {
    /**
     * @param {?} _element
     * @param {?} _zone
     * @param {?} platformId
     */
    constructor(_element, _zone, platformId) {
        this._element = _element;
        this._zone = _zone;
        this.platformId = platformId;
        this.checkForIntersection = (entries) => {
            entries.forEach((entry) => {
                if (this.checkIfIntersecting(entry)) {
                    this.load();
                    if (this._intersectionObserver) {
                        this._intersectionObserver.unobserve(/** @type {?} */ ((this._element.nativeElement)));
                    }
                }
            });
        };
        this.onScroll = () => {
            if (this.isVisible()) {
                this._zone.run(() => this.load());
            }
        };
        _element.nativeElement.style.backgroundColor = 'yellow';
    }
    /**
     * @return {?}
     */
    ngAfterViewInit() {
        if (isPlatformBrowser(this.platformId)) {
            this.enableLazyLoad();
        }
        else {
            // running on server, just load the image
            this.load();
        }
    }
    /**
     * @return {?}
     */
    enableLazyLoad() {
        // Client only code.
        if (this.hasCompatibleBrowser()) {
            this.registerIntersectionObserver();
            if (this._intersectionObserver) {
                this._intersectionObserver.observe(/** @type {?} */ ((this._element.nativeElement)));
            }
        }
        else {
            // add scroll watch if intersection observer is not available
            this.addScrollListeners();
        }
    }
    /**
     * @return {?}
     */
    hasCompatibleBrowser() {
        const /** @type {?} */ hasIntersectionObserver = 'IntersectionObserver' in window;
        const /** @type {?} */ userAgent = window.navigator.userAgent;
        const /** @type {?} */ matches = userAgent.match(/Edge\/(\d*)\./i);
        const /** @type {?} */ isEdge = !!matches && matches.length > 1;
        const /** @type {?} */ isEdgeVersion16OrBetter = isEdge && (!!matches && parseInt(matches[1], 10) > 15);
        return hasIntersectionObserver && (!isEdge || isEdgeVersion16OrBetter);
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        this.removeListeners();
    }
    /**
     * @return {?}
     */
    registerIntersectionObserver() {
        if (!!this._intersectionObserver) {
            return;
        }
        this._intersectionObserver = new IntersectionObserver(entries => {
            this.checkForIntersection(entries);
        }, {});
    }
    /**
     * @param {?} entry
     * @return {?}
     */
    checkIfIntersecting(entry) {
        // For Samsung native browser, IO has been partially implemented where by the
        // callback fires, but entry object is empty. We will check manually.
        if (entry && Object.keys(entry).length) {
            return (/** @type {?} */ (entry)).isIntersecting && entry.target === this._element.nativeElement;
        }
        return this.isVisible();
    }
    /**
     * @return {?}
     */
    load() {
        this.removeListeners();
        // this.deferLoad.emit();
        this._element.nativeElement.src = this.src;
    }
    /**
     * @return {?}
     */
    addScrollListeners() {
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
    /**
     * @return {?}
     */
    removeListeners() {
        if (this._scrollSubscription) {
            this._scrollSubscription.unsubscribe();
        }
        if (this._intersectionObserver) {
            this._intersectionObserver.disconnect();
        }
    }
    /**
     * @return {?}
     */
    isVisible() {
        const /** @type {?} */ scrollPosition = this.getScrollPosition();
        const /** @type {?} */ elementOffset = this._element.nativeElement.getBoundingClientRect().top;
        return elementOffset <= scrollPosition;
    }
    /**
     * @return {?}
     */
    getScrollPosition() {
        // Getting screen size and scroll position for IE
        return (window.scrollY || window.pageYOffset)
            + (document.documentElement.clientHeight || document.body.clientHeight);
    }
}
LazyLoadDirective.decorators = [
    { type: Directive, args: [{
                selector: '[appLazyLoad]'
            },] },
];
/** @nocollapse */
LazyLoadDirective.ctorParameters = () => [
    { type: ElementRef },
    { type: NgZone },
    { type: Object, decorators: [{ type: Inject, args: [PLATFORM_ID,] }] }
];
LazyLoadDirective.propDecorators = {
    src: [{ type: Input }]
};
function LazyLoadDirective_tsickle_Closure_declarations() {
    /** @type {?} */
    LazyLoadDirective.prototype._intersectionObserver;
    /** @type {?} */
    LazyLoadDirective.prototype._scrollSubscription;
    /** @type {?} */
    LazyLoadDirective.prototype.src;
    /** @type {?} */
    LazyLoadDirective.prototype.checkForIntersection;
    /** @type {?} */
    LazyLoadDirective.prototype.onScroll;
    /** @type {?} */
    LazyLoadDirective.prototype._element;
    /** @type {?} */
    LazyLoadDirective.prototype._zone;
    /** @type {?} */
    LazyLoadDirective.prototype.platformId;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGF6eS1sb2FkLmRpcmVjdGl2ZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25nLWltYWdlLWxhenktbG9hZC8iLCJzb3VyY2VzIjpbInNyYy9sYXp5LWxvYWQuZGlyZWN0aXZlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFFLFVBQVUsRUFBNEIsTUFBTSxFQUFFLFdBQVcsRUFBRSxNQUFNLEVBQUUsS0FBSyxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ3BILE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQ3BELE9BQU8sRUFBZ0IsU0FBUyxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBQy9DLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUs5QyxNQUFNOzs7Ozs7SUFNSixZQUVVLFVBQ0EsT0FDcUIsVUFBa0I7UUFGdkMsYUFBUSxHQUFSLFFBQVE7UUFDUixVQUFLLEdBQUwsS0FBSztRQUNnQixlQUFVLEdBQVYsVUFBVSxDQUFRO29DQWtEbEIsQ0FBQyxPQUF5QyxFQUFFLEVBQUU7WUFDM0UsT0FBTyxDQUFDLE9BQU8sQ0FBQyxDQUFDLEtBQWdDLEVBQUUsRUFBRTtnQkFDbkQsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLG1CQUFtQixDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQztvQkFDcEMsSUFBSSxDQUFDLElBQUksRUFBRSxDQUFDO29CQUNaLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxxQkFBcUIsQ0FBQyxDQUFDLENBQUM7d0JBQy9CLElBQUksQ0FBQyxxQkFBcUIsQ0FBQyxTQUFTLG1CQUFVLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxhQUFhLENBQUMsRUFBQyxDQUFDO3FCQUM5RTtpQkFDRjthQUNGLENBQUMsQ0FBQztTQUNKO3dCQXNDa0IsR0FBRyxFQUFFO1lBQ3RCLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxTQUFTLEVBQUUsQ0FBQyxDQUFD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QU0sU0FBQyxXQUFXOzs7a0JBTnBCLEtBQUsiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBEaXJlY3RpdmUsIEVsZW1lbnRSZWYsIEFmdGVyVmlld0luaXQsIE9uRGVzdHJveSwgTmdab25lLCBQTEFURk9STV9JRCwgSW5qZWN0LCBJbnB1dCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgaXNQbGF0Zm9ybUJyb3dzZXIgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHsgU3Vic2NyaXB0aW9uLCBmcm9tRXZlbnQgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IGRlYm91bmNlVGltZSB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcblxuQERpcmVjdGl2ZSh7XG4gIHNlbGVjdG9yOiAnW2FwcExhenlMb2FkXSdcbn0pXG5leHBvcnQgY2xhc3MgTGF6eUxvYWREaXJlY3RpdmUgaW1wbGVtZW50cyBBZnRlclZpZXdJbml0LCBPbkRlc3Ryb3kge1xuXG4gIHByaXZhdGUgX2ludGVyc2VjdGlvbk9ic2VydmVyPzogSW50ZXJzZWN0aW9uT2JzZXJ2ZXI7XG4gIHByaXZhdGUgX3Njcm9sbFN1YnNjcmlwdGlvbj86IFN1YnNjcmlwdGlvbjtcbiAgQElucHV0KCkgc3JjOiBzdHJpbmc7ICAgLy8gVGhlIGltYWdlIHRvIGJlIGxhenkgbG9hZGVkXG5cbiAgY29uc3RydWN0b3IoXG5cbiAgICBwcml2YXRlIF9lbGVtZW50OiBFbGVtZW50UmVmLFxuICAgIHByaXZhdGUgX3pvbmU6IE5nWm9uZSxcbiAgICBASW5qZWN0KFBMQVRGT1JNX0lEKSBwcml2YXRlIHBsYXRmb3JtSWQ6IE9iamVjdFxuICApIHtcbiAgICBfZWxlbWVudC5uYXRpdmVFbGVtZW50LnN0eWxlLmJhY2tncm91bmRDb2xvciA9ICd5ZWxsb3cnO1xuICB9XG5cbiAgcHVibGljIG5nQWZ0ZXJWaWV3SW5pdCgpIHtcbiAgICBpZiAoaXNQbGF0Zm9ybUJyb3dzZXIodGhpcy5wbGF0Zm9ybUlkKSkge1xuICAgICAgdGhpcy5lbmFibGVMYXp5TG9hZCgpO1xuICAgIH0gZWxzZSB7XG4gICAgICAvLyBydW5uaW5nIG9uIHNlcnZlciwganVzdCBsb2FkIHRoZSBpbWFnZVxuICAgICAgdGhpcy5sb2FkKCk7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBlbmFibGVMYXp5TG9hZCgpIHtcbiAgICAvLyBDbGllbnQgb25seSBjb2RlLlxuICAgIGlmICh0aGlzLmhhc0NvbXBhdGlibGVCcm93c2VyKCkpIHtcbiAgICAgIHRoaXMucmVnaXN0ZXJJbnRlcnNlY3Rpb25PYnNlcnZlcigpO1xuICAgICAgaWYgKHRoaXMuX2ludGVyc2VjdGlvbk9ic2VydmVyKSB7XG4gICAgICAgIHRoaXMuX2ludGVyc2VjdGlvbk9ic2VydmVyLm9ic2VydmUoPEVsZW1lbnQ+KHRoaXMuX2VsZW1lbnQubmF0aXZlRWxlbWVudCkpO1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICAvLyBhZGQgc2Nyb2xsIHdhdGNoIGlmIGludGVyc2VjdGlvbiBvYnNlcnZlciBpcyBub3QgYXZhaWxhYmxlXG4gICAgICB0aGlzLmFkZFNjcm9sbExpc3RlbmVycygpO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgaGFzQ29tcGF0aWJsZUJyb3dzZXIoKTogYm9vbGVhbiB7XG4gICAgY29uc3QgaGFzSW50ZXJzZWN0aW9uT2JzZXJ2ZXIgPSAnSW50ZXJzZWN0aW9uT2JzZXJ2ZXInIGluIHdpbmRvdztcbiAgICBjb25zdCB1c2VyQWdlbnQgPSB3aW5kb3cubmF2aWdhdG9yLnVzZXJBZ2VudDtcbiAgICBjb25zdCBtYXRjaGVzID0gdXNlckFnZW50Lm1hdGNoKC9FZGdlXFwvKFxcZCopXFwuL2kpO1xuXG4gICAgY29uc3QgaXNFZGdlID0gISFtYXRjaGVzICYmIG1hdGNoZXMubGVuZ3RoID4gMTtcbiAgICBjb25zdCBpc0VkZ2VWZXJzaW9uMTZPckJldHRlciA9IGlzRWRnZSAmJiAoISFtYXRjaGVzICYmIHBhcnNlSW50KG1hdGNoZXNbMV0sIDEwKSA+IDE1KTtcblxuICAgIHJldHVybiBoYXNJbnRlcnNlY3Rpb25PYnNlcnZlciAmJiAoIWlzRWRnZSB8fCBpc0VkZ2VWZXJzaW9uMTZPckJldHRlcik7XG4gIH1cblxuICBwdWJsaWMgbmdPbkRlc3Ryb3koKSB7XG4gICAgdGhpcy5yZW1vdmVMaXN0ZW5lcnMoKTtcbiAgfVxuICBwcml2YXRlIHJlZ2lzdGVySW50ZXJzZWN0aW9uT2JzZXJ2ZXIoKTogdm9pZCB7XG4gICAgaWYgKCEhdGhpcy5faW50ZXJzZWN0aW9uT2JzZXJ2ZXIpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgdGhpcy5faW50ZXJzZWN0aW9uT2JzZXJ2ZXIgPSBuZXcgSW50ZXJzZWN0aW9uT2JzZXJ2ZXIoZW50cmllcyA9PiB7XG4gICAgICB0aGlzLmNoZWNrRm9ySW50ZXJzZWN0aW9uKGVudHJpZXMpO1xuICAgIH0sIHt9KTtcbiAgfVxuXG4gIHByaXZhdGUgY2hlY2tGb3JJbnRlcnNlY3Rpb24gPSAoZW50cmllczogQXJyYXk8SW50ZXJzZWN0aW9uT2JzZXJ2ZXJFbnRyeT4pID0+IHtcbiAgICBlbnRyaWVzLmZvckVhY2goKGVudHJ5OiBJbnRlcnNlY3Rpb25PYnNlcnZlckVudHJ5KSA9PiB7XG4gICAgICBpZiAodGhpcy5jaGVja0lmSW50ZXJzZWN0aW5nKGVudHJ5KSkge1xuICAgICAgICB0aGlzLmxvYWQoKTtcbiAgICAgICAgaWYgKHRoaXMuX2ludGVyc2VjdGlvbk9ic2VydmVyKSB7XG4gICAgICAgICAgdGhpcy5faW50ZXJzZWN0aW9uT2JzZXJ2ZXIudW5vYnNlcnZlKDxFbGVtZW50Pih0aGlzLl9lbGVtZW50Lm5hdGl2ZUVsZW1lbnQpKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0pO1xuICB9XG4gIHByaXZhdGUgY2hlY2tJZkludGVyc2VjdGluZyhlbnRyeTogSW50ZXJzZWN0aW9uT2JzZXJ2ZXJFbnRyeSkge1xuICAgIC8vIEZvciBTYW1zdW5nIG5hdGl2ZSBicm93c2VyLCBJTyBoYXMgYmVlbiBwYXJ0aWFsbHkgaW1wbGVtZW50ZWQgd2hlcmUgYnkgdGhlXG4gICAgLy8gY2FsbGJhY2sgZmlyZXMsIGJ1dCBlbnRyeSBvYmplY3QgaXMgZW1wdHkuIFdlIHdpbGwgY2hlY2sgbWFudWFsbHkuXG4gICAgaWYgKGVudHJ5ICYmIE9iamVjdC5rZXlzKGVudHJ5KS5sZW5ndGgpIHtcbiAgICAgIHJldHVybiAoPGFueT5lbnRyeSkuaXNJbnRlcnNlY3RpbmcgJiYgZW50cnkudGFyZ2V0ID09PSB0aGlzLl9lbGVtZW50Lm5hdGl2ZUVsZW1lbnQ7XG4gICAgfVxuICAgIHJldHVybiB0aGlzLmlzVmlzaWJsZSgpO1xuICB9XG5cbiAgcHJpdmF0ZSBsb2FkKCk6IHZvaWQge1xuICAgIHRoaXMucmVtb3ZlTGlzdGVuZXJzKCk7XG4gICAgLy8gdGhpcy5kZWZlckxvYWQuZW1pdCgpO1xuICAgIHRoaXMuX2VsZW1lbnQubmF0aXZlRWxlbWVudC5zcmMgPSB0aGlzLnNyYztcbiAgfVxuXG4gIHByaXZhdGUgYWRkU2Nyb2xsTGlzdGVuZXJzKCkge1xuICAgIGlmICh0aGlzLmlzVmlzaWJsZSgpKSB7XG4gICAgICB0aGlzLmxvYWQoKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgdGhpcy5fem9uZS5ydW5PdXRzaWRlQW5ndWxhcigoKSA9PiB7XG4gICAgICB0aGlzLl9zY3JvbGxTdWJzY3JpcHRpb24gPSBmcm9tRXZlbnQod2luZG93LCAnc2Nyb2xsJylcbiAgICAgICAgLnBpcGUoZGVib3VuY2VUaW1lKDUwKSlcbiAgICAgICAgLnN1YnNjcmliZSh0aGlzLm9uU2Nyb2xsKTtcbiAgICB9KTtcbiAgfVxuXG4gIHByaXZhdGUgcmVtb3ZlTGlzdGVuZXJzKCkge1xuICAgIGlmICh0aGlzLl9zY3JvbGxTdWJzY3JpcHRpb24pIHtcbiAgICAgIHRoaXMuX3Njcm9sbFN1YnNjcmlwdGlvbi51bnN1YnNjcmliZSgpO1xuICAgIH1cblxuICAgIGlmICh0aGlzLl9pbnRlcnNlY3Rpb25PYnNlcnZlcikge1xuICAgICAgdGhpcy5faW50ZXJzZWN0aW9uT2JzZXJ2ZXIuZGlzY29ubmVjdCgpO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgb25TY3JvbGwgPSAoKSA9PiB7XG4gICAgaWYgKHRoaXMuaXNWaXNpYmxlKCkpIHtcbiAgICAgIHRoaXMuX3pvbmUucnVuKCgpID0+IHRoaXMubG9hZCgpKTtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIGlzVmlzaWJsZSgpIHtcbiAgICBjb25zdCBzY3JvbGxQb3NpdGlvbiA9IHRoaXMuZ2V0U2Nyb2xsUG9zaXRpb24oKTtcbiAgICBjb25zdCBlbGVtZW50T2Zmc2V0ID0gdGhpcy5fZWxlbWVudC5uYXRpdmVFbGVtZW50LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLnRvcDtcbiAgICByZXR1cm4gZWxlbWVudE9mZnNldCA8PSBzY3JvbGxQb3NpdGlvbjtcbiAgfVxuXG4gIHByaXZhdGUgZ2V0U2Nyb2xsUG9zaXRpb24oKSB7XG4gICAgLy8gR2V0dGluZyBzY3JlZW4gc2l6ZSBhbmQgc2Nyb2xsIHBvc2l0aW9uIGZvciBJRVxuICAgIHJldHVybiAod2luZG93LnNjcm9sbFkgfHwgd2luZG93LnBhZ2VZT2Zmc2V0KVxuICAgICAgKyAoZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LmNsaWVudEhlaWdodCB8fCBkb2N1bWVudC5ib2R5LmNsaWVudEhlaWdodCk7XG4gIH1cbn1cbiJdfQ==