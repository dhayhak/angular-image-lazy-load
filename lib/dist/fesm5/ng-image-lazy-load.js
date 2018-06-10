import { Directive, ElementRef, NgZone, PLATFORM_ID, Inject, Input, NgModule } from '@angular/core';
import { isPlatformBrowser, CommonModule } from '@angular/common';
import { fromEvent } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var LazyLoadDirective = /** @class */ (function () {
    function LazyLoadDirective(_element, _zone, platformId) {
        var _this = this;
        this._element = _element;
        this._zone = _zone;
        this.platformId = platformId;
        this.checkForIntersection = function (entries) {
            entries.forEach(function (entry) {
                if (_this.checkIfIntersecting(entry)) {
                    _this.load();
                    if (_this._intersectionObserver) {
                        _this._intersectionObserver.unobserve(/** @type {?} */ ((_this._element.nativeElement)));
                    }
                }
            });
        };
        this.onScroll = function () {
            if (_this.isVisible()) {
                _this._zone.run(function () { return _this.load(); });
            }
        };
        _element.nativeElement.style.backgroundColor = 'yellow';
    }
    /**
     * @return {?}
     */
    LazyLoadDirective.prototype.ngAfterViewInit = /**
     * @return {?}
     */
    function () {
        if (isPlatformBrowser(this.platformId)) {
            this.enableLazyLoad();
        }
        else {
            // running on server, just load the image
            this.load();
        }
    };
    /**
     * @return {?}
     */
    LazyLoadDirective.prototype.enableLazyLoad = /**
     * @return {?}
     */
    function () {
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
    };
    /**
     * @return {?}
     */
    LazyLoadDirective.prototype.hasCompatibleBrowser = /**
     * @return {?}
     */
    function () {
        var /** @type {?} */ hasIntersectionObserver = 'IntersectionObserver' in window;
        var /** @type {?} */ userAgent = window.navigator.userAgent;
        var /** @type {?} */ matches = userAgent.match(/Edge\/(\d*)\./i);
        var /** @type {?} */ isEdge = !!matches && matches.length > 1;
        var /** @type {?} */ isEdgeVersion16OrBetter = isEdge && (!!matches && parseInt(matches[1], 10) > 15);
        return hasIntersectionObserver && (!isEdge || isEdgeVersion16OrBetter);
    };
    /**
     * @return {?}
     */
    LazyLoadDirective.prototype.ngOnDestroy = /**
     * @return {?}
     */
    function () {
        this.removeListeners();
    };
    /**
     * @return {?}
     */
    LazyLoadDirective.prototype.registerIntersectionObserver = /**
     * @return {?}
     */
    function () {
        var _this = this;
        if (!!this._intersectionObserver) {
            return;
        }
        this._intersectionObserver = new IntersectionObserver(function (entries) {
            _this.checkForIntersection(entries);
        }, {});
    };
    /**
     * @param {?} entry
     * @return {?}
     */
    LazyLoadDirective.prototype.checkIfIntersecting = /**
     * @param {?} entry
     * @return {?}
     */
    function (entry) {
        // For Samsung native browser, IO has been partially implemented where by the
        // callback fires, but entry object is empty. We will check manually.
        if (entry && Object.keys(entry).length) {
            return (/** @type {?} */ (entry)).isIntersecting && entry.target === this._element.nativeElement;
        }
        return this.isVisible();
    };
    /**
     * @return {?}
     */
    LazyLoadDirective.prototype.load = /**
     * @return {?}
     */
    function () {
        this.removeListeners();
        // this.deferLoad.emit();
        this._element.nativeElement.src = this.src;
    };
    /**
     * @return {?}
     */
    LazyLoadDirective.prototype.addScrollListeners = /**
     * @return {?}
     */
    function () {
        var _this = this;
        if (this.isVisible()) {
            this.load();
            return;
        }
        this._zone.runOutsideAngular(function () {
            _this._scrollSubscription = fromEvent(window, 'scroll')
                .pipe(debounceTime(50))
                .subscribe(_this.onScroll);
        });
    };
    /**
     * @return {?}
     */
    LazyLoadDirective.prototype.removeListeners = /**
     * @return {?}
     */
    function () {
        if (this._scrollSubscription) {
            this._scrollSubscription.unsubscribe();
        }
        if (this._intersectionObserver) {
            this._intersectionObserver.disconnect();
        }
    };
    /**
     * @return {?}
     */
    LazyLoadDirective.prototype.isVisible = /**
     * @return {?}
     */
    function () {
        var /** @type {?} */ scrollPosition = this.getScrollPosition();
        var /** @type {?} */ elementOffset = this._element.nativeElement.getBoundingClientRect().top;
        return elementOffset <= scrollPosition;
    };
    /**
     * @return {?}
     */
    LazyLoadDirective.prototype.getScrollPosition = /**
     * @return {?}
     */
    function () {
        // Getting screen size and scroll position for IE
        return (window.scrollY || window.pageYOffset)
            + (document.documentElement.clientHeight || document.body.clientHeight);
    };
    LazyLoadDirective.decorators = [
        { type: Directive, args: [{
                    selector: '[appLazyLoad]'
                },] },
    ];
    /** @nocollapse */
    LazyLoadDirective.ctorParameters = function () { return [
        { type: ElementRef },
        { type: NgZone },
        { type: Object, decorators: [{ type: Inject, args: [PLATFORM_ID,] }] }
    ]; };
    LazyLoadDirective.propDecorators = {
        src: [{ type: Input }]
    };
    return LazyLoadDirective;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var LazyLoadModule = /** @class */ (function () {
    function LazyLoadModule() {
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
    return LazyLoadModule;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */

export { LazyLoadDirective, LazyLoadModule };

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmctaW1hZ2UtbGF6eS1sb2FkLmpzLm1hcCIsInNvdXJjZXMiOlsibmc6Ly9uZy1pbWFnZS1sYXp5LWxvYWQvc3JjL2xhenktbG9hZC5kaXJlY3RpdmUudHMiLCJuZzovL25nLWltYWdlLWxhenktbG9hZC9zcmMvbGF6eS1sb2FkLm1vZHVsZS50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBEaXJlY3RpdmUsIEVsZW1lbnRSZWYsIEFmdGVyVmlld0luaXQsIE9uRGVzdHJveSwgTmdab25lLCBQTEFURk9STV9JRCwgSW5qZWN0LCBJbnB1dCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgaXNQbGF0Zm9ybUJyb3dzZXIgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHsgU3Vic2NyaXB0aW9uLCBmcm9tRXZlbnQgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IGRlYm91bmNlVGltZSB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcblxuQERpcmVjdGl2ZSh7XG4gIHNlbGVjdG9yOiAnW2FwcExhenlMb2FkXSdcbn0pXG5leHBvcnQgY2xhc3MgTGF6eUxvYWREaXJlY3RpdmUgaW1wbGVtZW50cyBBZnRlclZpZXdJbml0LCBPbkRlc3Ryb3kge1xuXG4gIHByaXZhdGUgX2ludGVyc2VjdGlvbk9ic2VydmVyPzogSW50ZXJzZWN0aW9uT2JzZXJ2ZXI7XG4gIHByaXZhdGUgX3Njcm9sbFN1YnNjcmlwdGlvbj86IFN1YnNjcmlwdGlvbjtcbiAgQElucHV0KCkgc3JjOiBzdHJpbmc7ICAgLy8gVGhlIGltYWdlIHRvIGJlIGxhenkgbG9hZGVkXG5cbiAgY29uc3RydWN0b3IoXG5cbiAgICBwcml2YXRlIF9lbGVtZW50OiBFbGVtZW50UmVmLFxuICAgIHByaXZhdGUgX3pvbmU6IE5nWm9uZSxcbiAgICBASW5qZWN0KFBMQVRGT1JNX0lEKSBwcml2YXRlIHBsYXRmb3JtSWQ6IE9iamVjdFxuICApIHtcbiAgICBfZWxlbWVudC5uYXRpdmVFbGVtZW50LnN0eWxlLmJhY2tncm91bmRDb2xvciA9ICd5ZWxsb3cnO1xuICB9XG5cbiAgcHVibGljIG5nQWZ0ZXJWaWV3SW5pdCgpIHtcbiAgICBpZiAoaXNQbGF0Zm9ybUJyb3dzZXIodGhpcy5wbGF0Zm9ybUlkKSkge1xuICAgICAgdGhpcy5lbmFibGVMYXp5TG9hZCgpO1xuICAgIH0gZWxzZSB7XG4gICAgICAvLyBydW5uaW5nIG9uIHNlcnZlciwganVzdCBsb2FkIHRoZSBpbWFnZVxuICAgICAgdGhpcy5sb2FkKCk7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBlbmFibGVMYXp5TG9hZCgpIHtcbiAgICAvLyBDbGllbnQgb25seSBjb2RlLlxuICAgIGlmICh0aGlzLmhhc0NvbXBhdGlibGVCcm93c2VyKCkpIHtcbiAgICAgIHRoaXMucmVnaXN0ZXJJbnRlcnNlY3Rpb25PYnNlcnZlcigpO1xuICAgICAgaWYgKHRoaXMuX2ludGVyc2VjdGlvbk9ic2VydmVyKSB7XG4gICAgICAgIHRoaXMuX2ludGVyc2VjdGlvbk9ic2VydmVyLm9ic2VydmUoPEVsZW1lbnQ+KHRoaXMuX2VsZW1lbnQubmF0aXZlRWxlbWVudCkpO1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICAvLyBhZGQgc2Nyb2xsIHdhdGNoIGlmIGludGVyc2VjdGlvbiBvYnNlcnZlciBpcyBub3QgYXZhaWxhYmxlXG4gICAgICB0aGlzLmFkZFNjcm9sbExpc3RlbmVycygpO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgaGFzQ29tcGF0aWJsZUJyb3dzZXIoKTogYm9vbGVhbiB7XG4gICAgY29uc3QgaGFzSW50ZXJzZWN0aW9uT2JzZXJ2ZXIgPSAnSW50ZXJzZWN0aW9uT2JzZXJ2ZXInIGluIHdpbmRvdztcbiAgICBjb25zdCB1c2VyQWdlbnQgPSB3aW5kb3cubmF2aWdhdG9yLnVzZXJBZ2VudDtcbiAgICBjb25zdCBtYXRjaGVzID0gdXNlckFnZW50Lm1hdGNoKC9FZGdlXFwvKFxcZCopXFwuL2kpO1xuXG4gICAgY29uc3QgaXNFZGdlID0gISFtYXRjaGVzICYmIG1hdGNoZXMubGVuZ3RoID4gMTtcbiAgICBjb25zdCBpc0VkZ2VWZXJzaW9uMTZPckJldHRlciA9IGlzRWRnZSAmJiAoISFtYXRjaGVzICYmIHBhcnNlSW50KG1hdGNoZXNbMV0sIDEwKSA+IDE1KTtcblxuICAgIHJldHVybiBoYXNJbnRlcnNlY3Rpb25PYnNlcnZlciAmJiAoIWlzRWRnZSB8fCBpc0VkZ2VWZXJzaW9uMTZPckJldHRlcik7XG4gIH1cblxuICBwdWJsaWMgbmdPbkRlc3Ryb3koKSB7XG4gICAgdGhpcy5yZW1vdmVMaXN0ZW5lcnMoKTtcbiAgfVxuICBwcml2YXRlIHJlZ2lzdGVySW50ZXJzZWN0aW9uT2JzZXJ2ZXIoKTogdm9pZCB7XG4gICAgaWYgKCEhdGhpcy5faW50ZXJzZWN0aW9uT2JzZXJ2ZXIpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgdGhpcy5faW50ZXJzZWN0aW9uT2JzZXJ2ZXIgPSBuZXcgSW50ZXJzZWN0aW9uT2JzZXJ2ZXIoZW50cmllcyA9PiB7XG4gICAgICB0aGlzLmNoZWNrRm9ySW50ZXJzZWN0aW9uKGVudHJpZXMpO1xuICAgIH0sIHt9KTtcbiAgfVxuXG4gIHByaXZhdGUgY2hlY2tGb3JJbnRlcnNlY3Rpb24gPSAoZW50cmllczogQXJyYXk8SW50ZXJzZWN0aW9uT2JzZXJ2ZXJFbnRyeT4pID0+IHtcbiAgICBlbnRyaWVzLmZvckVhY2goKGVudHJ5OiBJbnRlcnNlY3Rpb25PYnNlcnZlckVudHJ5KSA9PiB7XG4gICAgICBpZiAodGhpcy5jaGVja0lmSW50ZXJzZWN0aW5nKGVudHJ5KSkge1xuICAgICAgICB0aGlzLmxvYWQoKTtcbiAgICAgICAgaWYgKHRoaXMuX2ludGVyc2VjdGlvbk9ic2VydmVyKSB7XG4gICAgICAgICAgdGhpcy5faW50ZXJzZWN0aW9uT2JzZXJ2ZXIudW5vYnNlcnZlKDxFbGVtZW50Pih0aGlzLl9lbGVtZW50Lm5hdGl2ZUVsZW1lbnQpKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0pO1xuICB9XG4gIHByaXZhdGUgY2hlY2tJZkludGVyc2VjdGluZyhlbnRyeTogSW50ZXJzZWN0aW9uT2JzZXJ2ZXJFbnRyeSkge1xuICAgIC8vIEZvciBTYW1zdW5nIG5hdGl2ZSBicm93c2VyLCBJTyBoYXMgYmVlbiBwYXJ0aWFsbHkgaW1wbGVtZW50ZWQgd2hlcmUgYnkgdGhlXG4gICAgLy8gY2FsbGJhY2sgZmlyZXMsIGJ1dCBlbnRyeSBvYmplY3QgaXMgZW1wdHkuIFdlIHdpbGwgY2hlY2sgbWFudWFsbHkuXG4gICAgaWYgKGVudHJ5ICYmIE9iamVjdC5rZXlzKGVudHJ5KS5sZW5ndGgpIHtcbiAgICAgIHJldHVybiAoPGFueT5lbnRyeSkuaXNJbnRlcnNlY3RpbmcgJiYgZW50cnkudGFyZ2V0ID09PSB0aGlzLl9lbGVtZW50Lm5hdGl2ZUVsZW1lbnQ7XG4gICAgfVxuICAgIHJldHVybiB0aGlzLmlzVmlzaWJsZSgpO1xuICB9XG5cbiAgcHJpdmF0ZSBsb2FkKCk6IHZvaWQge1xuICAgIHRoaXMucmVtb3ZlTGlzdGVuZXJzKCk7XG4gICAgLy8gdGhpcy5kZWZlckxvYWQuZW1pdCgpO1xuICAgIHRoaXMuX2VsZW1lbnQubmF0aXZlRWxlbWVudC5zcmMgPSB0aGlzLnNyYztcbiAgfVxuXG4gIHByaXZhdGUgYWRkU2Nyb2xsTGlzdGVuZXJzKCkge1xuICAgIGlmICh0aGlzLmlzVmlzaWJsZSgpKSB7XG4gICAgICB0aGlzLmxvYWQoKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgdGhpcy5fem9uZS5ydW5PdXRzaWRlQW5ndWxhcigoKSA9PiB7XG4gICAgICB0aGlzLl9zY3JvbGxTdWJzY3JpcHRpb24gPSBmcm9tRXZlbnQod2luZG93LCAnc2Nyb2xsJylcbiAgICAgICAgLnBpcGUoZGVib3VuY2VUaW1lKDUwKSlcbiAgICAgICAgLnN1YnNjcmliZSh0aGlzLm9uU2Nyb2xsKTtcbiAgICB9KTtcbiAgfVxuXG4gIHByaXZhdGUgcmVtb3ZlTGlzdGVuZXJzKCkge1xuICAgIGlmICh0aGlzLl9zY3JvbGxTdWJzY3JpcHRpb24pIHtcbiAgICAgIHRoaXMuX3Njcm9sbFN1YnNjcmlwdGlvbi51bnN1YnNjcmliZSgpO1xuICAgIH1cblxuICAgIGlmICh0aGlzLl9pbnRlcnNlY3Rpb25PYnNlcnZlcikge1xuICAgICAgdGhpcy5faW50ZXJzZWN0aW9uT2JzZXJ2ZXIuZGlzY29ubmVjdCgpO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgb25TY3JvbGwgPSAoKSA9PiB7XG4gICAgaWYgKHRoaXMuaXNWaXNpYmxlKCkpIHtcbiAgICAgIHRoaXMuX3pvbmUucnVuKCgpID0+IHRoaXMubG9hZCgpKTtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIGlzVmlzaWJsZSgpIHtcbiAgICBjb25zdCBzY3JvbGxQb3NpdGlvbiA9IHRoaXMuZ2V0U2Nyb2xsUG9zaXRpb24oKTtcbiAgICBjb25zdCBlbGVtZW50T2Zmc2V0ID0gdGhpcy5fZWxlbWVudC5uYXRpdmVFbGVtZW50LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLnRvcDtcbiAgICByZXR1cm4gZWxlbWVudE9mZnNldCA8PSBzY3JvbGxQb3NpdGlvbjtcbiAgfVxuXG4gIHByaXZhdGUgZ2V0U2Nyb2xsUG9zaXRpb24oKSB7XG4gICAgLy8gR2V0dGluZyBzY3JlZW4gc2l6ZSBhbmQgc2Nyb2xsIHBvc2l0aW9uIGZvciBJRVxuICAgIHJldHVybiAod2luZG93LnNjcm9sbFkgfHwgd2luZG93LnBhZ2VZT2Zmc2V0KVxuICAgICAgKyAoZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LmNsaWVudEhlaWdodCB8fCBkb2N1bWVudC5ib2R5LmNsaWVudEhlaWdodCk7XG4gIH1cbn1cbiIsImltcG9ydCB7IE5nTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBDb21tb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHsgTGF6eUxvYWREaXJlY3RpdmUgfSBmcm9tICcuL2xhenktbG9hZC5kaXJlY3RpdmUnO1xuXG5ATmdNb2R1bGUoe1xuICBpbXBvcnRzOiBbXG4gICAgQ29tbW9uTW9kdWxlXG4gIF0sXG4gIGRlY2xhcmF0aW9uczogW0xhenlMb2FkRGlyZWN0aXZlXSxcbiAgZXhwb3J0czogW0xhenlMb2FkRGlyZWN0aXZlXVxufSlcbmV4cG9ydCBjbGFzcyBMYXp5TG9hZE1vZHVsZSB7IH1cbiJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFBQTtJQWNFLDJCQUVVLFVBQ0EsT0FDcUIsVUFBa0I7UUFKakQsaUJBT0M7UUFMUyxhQUFRLEdBQVIsUUFBUTtRQUNSLFVBQUssR0FBTCxLQUFLO1FBQ2dCLGVBQVUsR0FBVixVQUFVLENBQVE7b0NBa0RsQixVQUFDLE9BQXlDO1lBQ3ZFLE9BQU8sQ0FBQyxPQUFPLENBQUMsVUFBQyxLQUFnQztnQkFDL0MsSUFBSSxLQUFJLENBQUMsbUJBQW1CLENBQUMsS0FBSyxDQUFDLEVBQUU7b0JBQ25DLEtBQUksQ0FBQyxJQUFJLEVBQUUsQ0FBQztvQkFDWixJQUFJLEtBQUksQ0FBQyxxQkFBcUIsRUFBRTt3QkFDOUIsS0FBSSxDQUFDLHFCQUFxQixDQUFDLFNBQVMsb0JBQVcsS0FBSSxDQUFDLFFBQVEsQ0FBQyxhQUFhLEdBQUUsQ0FBQztxQkFDOUU7aUJBQ0Y7YUFDRixDQUFDLENBQUM7U0FDSjt3QkFzQ2tCO1lBQ2pCLElBQUksS0FBSSxDQUFDLFNBQVMsRUFBRSxFQUFFO2dCQUNwQixLQUFJLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxjQUFNLE9BQUEsS0FBSSxDQUFDLElBQUksRUFBRSxHQUFBLENBQUMsQ0FBQzthQUNuQztTQUNGO1FBbkdDLFFBQVEsQ0FBQyxhQUFhLENBQUMsS0FBSyxDQUFDLGVBQWUsR0FBRyxRQUFRLENBQUM7S0FDekQ7Ozs7SUFFTSwyQ0FBZTs7OztRQUNwQixJQUFJLGlCQUFpQixDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsRUFBRTtZQUN0QyxJQUFJLENBQUMsY0FBYyxFQUFFLENBQUM7U0FDdkI7YUFBTTs7WUFFTCxJQUFJLENBQUMsSUFBSSxFQUFFLENB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