import { Directive, ElementRef, NgZone, PLATFORM_ID, Inject, Input, NgModule } from '@angular/core';
import { isPlatformBrowser, CommonModule } from '@angular/common';
import { fromEvent } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class LazyLoadDirective {
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

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class LazyLoadModule {
}
LazyLoadModule.decorators = [
    { type: NgModule, args: [{
                imports: [
                    CommonModule
                ],
                declarations: [LazyLoadDirective],
                exports: [LazyLoadDirective]
            },] },
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */

export { LazyLoadDirective, LazyLoadModule };

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmctaW1hZ2UtbGF6eS1sb2FkLmpzLm1hcCIsInNvdXJjZXMiOlsibmc6Ly9uZy1pbWFnZS1sYXp5LWxvYWQvc3JjL2xhenktbG9hZC5kaXJlY3RpdmUudHMiLCJuZzovL25nLWltYWdlLWxhenktbG9hZC9zcmMvbGF6eS1sb2FkLm1vZHVsZS50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBEaXJlY3RpdmUsIEVsZW1lbnRSZWYsIEFmdGVyVmlld0luaXQsIE9uRGVzdHJveSwgTmdab25lLCBQTEFURk9STV9JRCwgSW5qZWN0LCBJbnB1dCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgaXNQbGF0Zm9ybUJyb3dzZXIgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHsgU3Vic2NyaXB0aW9uLCBmcm9tRXZlbnQgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IGRlYm91bmNlVGltZSB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcblxuQERpcmVjdGl2ZSh7XG4gIHNlbGVjdG9yOiAnW2FwcExhenlMb2FkXSdcbn0pXG5leHBvcnQgY2xhc3MgTGF6eUxvYWREaXJlY3RpdmUgaW1wbGVtZW50cyBBZnRlclZpZXdJbml0LCBPbkRlc3Ryb3kge1xuXG4gIHByaXZhdGUgX2ludGVyc2VjdGlvbk9ic2VydmVyPzogSW50ZXJzZWN0aW9uT2JzZXJ2ZXI7XG4gIHByaXZhdGUgX3Njcm9sbFN1YnNjcmlwdGlvbj86IFN1YnNjcmlwdGlvbjtcbiAgQElucHV0KCkgc3JjOiBzdHJpbmc7ICAgLy8gVGhlIGltYWdlIHRvIGJlIGxhenkgbG9hZGVkXG5cbiAgY29uc3RydWN0b3IoXG5cbiAgICBwcml2YXRlIF9lbGVtZW50OiBFbGVtZW50UmVmLFxuICAgIHByaXZhdGUgX3pvbmU6IE5nWm9uZSxcbiAgICBASW5qZWN0KFBMQVRGT1JNX0lEKSBwcml2YXRlIHBsYXRmb3JtSWQ6IE9iamVjdFxuICApIHtcbiAgICBfZWxlbWVudC5uYXRpdmVFbGVtZW50LnN0eWxlLmJhY2tncm91bmRDb2xvciA9ICd5ZWxsb3cnO1xuICB9XG5cbiAgcHVibGljIG5nQWZ0ZXJWaWV3SW5pdCgpIHtcbiAgICBpZiAoaXNQbGF0Zm9ybUJyb3dzZXIodGhpcy5wbGF0Zm9ybUlkKSkge1xuICAgICAgdGhpcy5lbmFibGVMYXp5TG9hZCgpO1xuICAgIH0gZWxzZSB7XG4gICAgICAvLyBydW5uaW5nIG9uIHNlcnZlciwganVzdCBsb2FkIHRoZSBpbWFnZVxuICAgICAgdGhpcy5sb2FkKCk7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBlbmFibGVMYXp5TG9hZCgpIHtcbiAgICAvLyBDbGllbnQgb25seSBjb2RlLlxuICAgIGlmICh0aGlzLmhhc0NvbXBhdGlibGVCcm93c2VyKCkpIHtcbiAgICAgIHRoaXMucmVnaXN0ZXJJbnRlcnNlY3Rpb25PYnNlcnZlcigpO1xuICAgICAgaWYgKHRoaXMuX2ludGVyc2VjdGlvbk9ic2VydmVyKSB7XG4gICAgICAgIHRoaXMuX2ludGVyc2VjdGlvbk9ic2VydmVyLm9ic2VydmUoPEVsZW1lbnQ+KHRoaXMuX2VsZW1lbnQubmF0aXZlRWxlbWVudCkpO1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICAvLyBhZGQgc2Nyb2xsIHdhdGNoIGlmIGludGVyc2VjdGlvbiBvYnNlcnZlciBpcyBub3QgYXZhaWxhYmxlXG4gICAgICB0aGlzLmFkZFNjcm9sbExpc3RlbmVycygpO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgaGFzQ29tcGF0aWJsZUJyb3dzZXIoKTogYm9vbGVhbiB7XG4gICAgY29uc3QgaGFzSW50ZXJzZWN0aW9uT2JzZXJ2ZXIgPSAnSW50ZXJzZWN0aW9uT2JzZXJ2ZXInIGluIHdpbmRvdztcbiAgICBjb25zdCB1c2VyQWdlbnQgPSB3aW5kb3cubmF2aWdhdG9yLnVzZXJBZ2VudDtcbiAgICBjb25zdCBtYXRjaGVzID0gdXNlckFnZW50Lm1hdGNoKC9FZGdlXFwvKFxcZCopXFwuL2kpO1xuXG4gICAgY29uc3QgaXNFZGdlID0gISFtYXRjaGVzICYmIG1hdGNoZXMubGVuZ3RoID4gMTtcbiAgICBjb25zdCBpc0VkZ2VWZXJzaW9uMTZPckJldHRlciA9IGlzRWRnZSAmJiAoISFtYXRjaGVzICYmIHBhcnNlSW50KG1hdGNoZXNbMV0sIDEwKSA+IDE1KTtcblxuICAgIHJldHVybiBoYXNJbnRlcnNlY3Rpb25PYnNlcnZlciAmJiAoIWlzRWRnZSB8fCBpc0VkZ2VWZXJzaW9uMTZPckJldHRlcik7XG4gIH1cblxuICBwdWJsaWMgbmdPbkRlc3Ryb3koKSB7XG4gICAgdGhpcy5yZW1vdmVMaXN0ZW5lcnMoKTtcbiAgfVxuICBwcml2YXRlIHJlZ2lzdGVySW50ZXJzZWN0aW9uT2JzZXJ2ZXIoKTogdm9pZCB7XG4gICAgaWYgKCEhdGhpcy5faW50ZXJzZWN0aW9uT2JzZXJ2ZXIpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgdGhpcy5faW50ZXJzZWN0aW9uT2JzZXJ2ZXIgPSBuZXcgSW50ZXJzZWN0aW9uT2JzZXJ2ZXIoZW50cmllcyA9PiB7XG4gICAgICB0aGlzLmNoZWNrRm9ySW50ZXJzZWN0aW9uKGVudHJpZXMpO1xuICAgIH0sIHt9KTtcbiAgfVxuXG4gIHByaXZhdGUgY2hlY2tGb3JJbnRlcnNlY3Rpb24gPSAoZW50cmllczogQXJyYXk8SW50ZXJzZWN0aW9uT2JzZXJ2ZXJFbnRyeT4pID0+IHtcbiAgICBlbnRyaWVzLmZvckVhY2goKGVudHJ5OiBJbnRlcnNlY3Rpb25PYnNlcnZlckVudHJ5KSA9PiB7XG4gICAgICBpZiAodGhpcy5jaGVja0lmSW50ZXJzZWN0aW5nKGVudHJ5KSkge1xuICAgICAgICB0aGlzLmxvYWQoKTtcbiAgICAgICAgaWYgKHRoaXMuX2ludGVyc2VjdGlvbk9ic2VydmVyKSB7XG4gICAgICAgICAgdGhpcy5faW50ZXJzZWN0aW9uT2JzZXJ2ZXIudW5vYnNlcnZlKDxFbGVtZW50Pih0aGlzLl9lbGVtZW50Lm5hdGl2ZUVsZW1lbnQpKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0pO1xuICB9XG4gIHByaXZhdGUgY2hlY2tJZkludGVyc2VjdGluZyhlbnRyeTogSW50ZXJzZWN0aW9uT2JzZXJ2ZXJFbnRyeSkge1xuICAgIC8vIEZvciBTYW1zdW5nIG5hdGl2ZSBicm93c2VyLCBJTyBoYXMgYmVlbiBwYXJ0aWFsbHkgaW1wbGVtZW50ZWQgd2hlcmUgYnkgdGhlXG4gICAgLy8gY2FsbGJhY2sgZmlyZXMsIGJ1dCBlbnRyeSBvYmplY3QgaXMgZW1wdHkuIFdlIHdpbGwgY2hlY2sgbWFudWFsbHkuXG4gICAgaWYgKGVudHJ5ICYmIE9iamVjdC5rZXlzKGVudHJ5KS5sZW5ndGgpIHtcbiAgICAgIHJldHVybiAoPGFueT5lbnRyeSkuaXNJbnRlcnNlY3RpbmcgJiYgZW50cnkudGFyZ2V0ID09PSB0aGlzLl9lbGVtZW50Lm5hdGl2ZUVsZW1lbnQ7XG4gICAgfVxuICAgIHJldHVybiB0aGlzLmlzVmlzaWJsZSgpO1xuICB9XG5cbiAgcHJpdmF0ZSBsb2FkKCk6IHZvaWQge1xuICAgIHRoaXMucmVtb3ZlTGlzdGVuZXJzKCk7XG4gICAgLy8gdGhpcy5kZWZlckxvYWQuZW1pdCgpO1xuICAgIHRoaXMuX2VsZW1lbnQubmF0aXZlRWxlbWVudC5zcmMgPSB0aGlzLnNyYztcbiAgfVxuXG4gIHByaXZhdGUgYWRkU2Nyb2xsTGlzdGVuZXJzKCkge1xuICAgIGlmICh0aGlzLmlzVmlzaWJsZSgpKSB7XG4gICAgICB0aGlzLmxvYWQoKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgdGhpcy5fem9uZS5ydW5PdXRzaWRlQW5ndWxhcigoKSA9PiB7XG4gICAgICB0aGlzLl9zY3JvbGxTdWJzY3JpcHRpb24gPSBmcm9tRXZlbnQod2luZG93LCAnc2Nyb2xsJylcbiAgICAgICAgLnBpcGUoZGVib3VuY2VUaW1lKDUwKSlcbiAgICAgICAgLnN1YnNjcmliZSh0aGlzLm9uU2Nyb2xsKTtcbiAgICB9KTtcbiAgfVxuXG4gIHByaXZhdGUgcmVtb3ZlTGlzdGVuZXJzKCkge1xuICAgIGlmICh0aGlzLl9zY3JvbGxTdWJzY3JpcHRpb24pIHtcbiAgICAgIHRoaXMuX3Njcm9sbFN1YnNjcmlwdGlvbi51bnN1YnNjcmliZSgpO1xuICAgIH1cblxuICAgIGlmICh0aGlzLl9pbnRlcnNlY3Rpb25PYnNlcnZlcikge1xuICAgICAgdGhpcy5faW50ZXJzZWN0aW9uT2JzZXJ2ZXIuZGlzY29ubmVjdCgpO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgb25TY3JvbGwgPSAoKSA9PiB7XG4gICAgaWYgKHRoaXMuaXNWaXNpYmxlKCkpIHtcbiAgICAgIHRoaXMuX3pvbmUucnVuKCgpID0+IHRoaXMubG9hZCgpKTtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIGlzVmlzaWJsZSgpIHtcbiAgICBjb25zdCBzY3JvbGxQb3NpdGlvbiA9IHRoaXMuZ2V0U2Nyb2xsUG9zaXRpb24oKTtcbiAgICBjb25zdCBlbGVtZW50T2Zmc2V0ID0gdGhpcy5fZWxlbWVudC5uYXRpdmVFbGVtZW50LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLnRvcDtcbiAgICByZXR1cm4gZWxlbWVudE9mZnNldCA8PSBzY3JvbGxQb3NpdGlvbjtcbiAgfVxuXG4gIHByaXZhdGUgZ2V0U2Nyb2xsUG9zaXRpb24oKSB7XG4gICAgLy8gR2V0dGluZyBzY3JlZW4gc2l6ZSBhbmQgc2Nyb2xsIHBvc2l0aW9uIGZvciBJRVxuICAgIHJldHVybiAod2luZG93LnNjcm9sbFkgfHwgd2luZG93LnBhZ2VZT2Zmc2V0KVxuICAgICAgKyAoZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LmNsaWVudEhlaWdodCB8fCBkb2N1bWVudC5ib2R5LmNsaWVudEhlaWdodCk7XG4gIH1cbn1cbiIsImltcG9ydCB7IE5nTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBDb21tb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHsgTGF6eUxvYWREaXJlY3RpdmUgfSBmcm9tICcuL2xhenktbG9hZC5kaXJlY3RpdmUnO1xuXG5ATmdNb2R1bGUoe1xuICBpbXBvcnRzOiBbXG4gICAgQ29tbW9uTW9kdWxlXG4gIF0sXG4gIGRlY2xhcmF0aW9uczogW0xhenlMb2FkRGlyZWN0aXZlXSxcbiAgZXhwb3J0czogW0xhenlMb2FkRGlyZWN0aXZlXVxufSlcbmV4cG9ydCBjbGFzcyBMYXp5TG9hZE1vZHVsZSB7IH1cbiJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFBQTs7Ozs7O0lBY0UsWUFFVSxVQUNBLE9BQ3FCLFVBQWtCO1FBRnZDLGFBQVEsR0FBUixRQUFRO1FBQ1IsVUFBSyxHQUFMLEtBQUs7UUFDZ0IsZUFBVSxHQUFWLFVBQVUsQ0FBUTtvQ0FrRGxCLENBQUMsT0FBeUM7WUFDdkUsT0FBTyxDQUFDLE9BQU8sQ0FBQyxDQUFDLEtBQWdDO2dCQUMvQyxJQUFJLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxLQUFLLENBQUMsRUFBRTtvQkFDbkMsSUFBSSxDQUFDLElBQUksRUFBRSxDQUFDO29CQUNaLElBQUksSUFBSSxDQUFDLHFCQUFxQixFQUFFO3dCQUM5QixJQUFJLENBQUMscUJBQXFCLENBQUMsU0FBUyxvQkFBVyxJQUFJLENBQUMsUUFBUSxDQUFDLGFBQWEsR0FBRSxDQUFDO3FCQUM5RTtpQkFDRjthQUNGLENBQUMsQ0FBQztTQUNKO3dCQXNDa0I7WUFDakIsSUFBSSxJQUFJLENBQUMsU0FBUyxFQUFFLEVBQUU7Z0JBQ3BCLElBQUksQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLE1BQU0sSUFBSSxDQUFDLElBQUksRUFBRSxDQUFDLENBQUM7YUFDbkM7U0FDRjtRQW5HQyxRQUFRLENBQUMsYUFBYSxDQUFDLEtBQUssQ0FBQyxlQUFlLEdBQUcsUUFBUSxDQUFDO0tBQ3pEOzs7O0lBRU0sZUFBZTtRQUNwQixJQUFJLGlCQUFpQixDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsRUFBRTtZQUN0QyxJQUFJLENBQUMsY0FBYyxFQUFFLENBQUM7U0FDdkI7YUFBTTs7WUFFTCxJQUFJLENBQUMsSUFBSSxFQUFFLENBQUM7U0FDYjs7Ozs7SUFHSyxjQUFj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