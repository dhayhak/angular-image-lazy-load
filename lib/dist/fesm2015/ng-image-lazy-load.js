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

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmctaW1hZ2UtbGF6eS1sb2FkLmpzLm1hcCIsInNvdXJjZXMiOlsibmc6Ly9uZy1pbWFnZS1sYXp5LWxvYWQvc3JjL2xhenktbG9hZC5kaXJlY3RpdmUudHMiLCJuZzovL25nLWltYWdlLWxhenktbG9hZC9zcmMvbGF6eS1sb2FkLm1vZHVsZS50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBEaXJlY3RpdmUsIEVsZW1lbnRSZWYsIEFmdGVyVmlld0luaXQsIE9uRGVzdHJveSwgTmdab25lLCBQTEFURk9STV9JRCwgSW5qZWN0LCBJbnB1dCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgaXNQbGF0Zm9ybUJyb3dzZXIgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHsgU3Vic2NyaXB0aW9uLCBmcm9tRXZlbnQgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IGRlYm91bmNlVGltZSB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcblxuQERpcmVjdGl2ZSh7XG4gIHNlbGVjdG9yOiAnW2FwcExhenlMb2FkXSdcbn0pXG5leHBvcnQgY2xhc3MgTGF6eUxvYWREaXJlY3RpdmUgaW1wbGVtZW50cyBBZnRlclZpZXdJbml0LCBPbkRlc3Ryb3kge1xuXG4gIHByaXZhdGUgX2ludGVyc2VjdGlvbk9ic2VydmVyPzogSW50ZXJzZWN0aW9uT2JzZXJ2ZXI7XG4gIHByaXZhdGUgX3Njcm9sbFN1YnNjcmlwdGlvbj86IFN1YnNjcmlwdGlvbjtcbiAgQElucHV0KCkgc3JjOiBzdHJpbmc7ICAgLy8gVGhlIGltYWdlIHRvIGJlIGxhenkgbG9hZGVkXG5cbiAgY29uc3RydWN0b3IoXG5cbiAgICBwcml2YXRlIF9lbGVtZW50OiBFbGVtZW50UmVmLFxuICAgIHByaXZhdGUgX3pvbmU6IE5nWm9uZSxcbiAgICBASW5qZWN0KFBMQVRGT1JNX0lEKSBwcml2YXRlIHBsYXRmb3JtSWQ6IE9iamVjdFxuICApIHtcbiAgfVxuXG4gIHB1YmxpYyBuZ0FmdGVyVmlld0luaXQoKSB7XG4gICAgaWYgKGlzUGxhdGZvcm1Ccm93c2VyKHRoaXMucGxhdGZvcm1JZCkpIHtcbiAgICAgIHRoaXMuZW5hYmxlTGF6eUxvYWQoKTtcbiAgICB9IGVsc2Uge1xuICAgICAgLy8gcnVubmluZyBvbiBzZXJ2ZXIsIGp1c3QgbG9hZCB0aGUgaW1hZ2VcbiAgICAgIHRoaXMubG9hZCgpO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgZW5hYmxlTGF6eUxvYWQoKSB7XG4gICAgLy8gQ2xpZW50IG9ubHkgY29kZS5cbiAgICBpZiAodGhpcy5oYXNDb21wYXRpYmxlQnJvd3NlcigpKSB7XG4gICAgICB0aGlzLnJlZ2lzdGVySW50ZXJzZWN0aW9uT2JzZXJ2ZXIoKTtcbiAgICAgIGlmICh0aGlzLl9pbnRlcnNlY3Rpb25PYnNlcnZlcikge1xuICAgICAgICB0aGlzLl9pbnRlcnNlY3Rpb25PYnNlcnZlci5vYnNlcnZlKDxFbGVtZW50Pih0aGlzLl9lbGVtZW50Lm5hdGl2ZUVsZW1lbnQpKTtcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgLy8gYWRkIHNjcm9sbCB3YXRjaCBpZiBpbnRlcnNlY3Rpb24gb2JzZXJ2ZXIgaXMgbm90IGF2YWlsYWJsZVxuICAgICAgdGhpcy5hZGRTY3JvbGxMaXN0ZW5lcnMoKTtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIGhhc0NvbXBhdGlibGVCcm93c2VyKCk6IGJvb2xlYW4ge1xuICAgIGNvbnN0IGhhc0ludGVyc2VjdGlvbk9ic2VydmVyID0gJ0ludGVyc2VjdGlvbk9ic2VydmVyJyBpbiB3aW5kb3c7XG4gICAgY29uc3QgdXNlckFnZW50ID0gd2luZG93Lm5hdmlnYXRvci51c2VyQWdlbnQ7XG4gICAgY29uc3QgbWF0Y2hlcyA9IHVzZXJBZ2VudC5tYXRjaCgvRWRnZVxcLyhcXGQqKVxcLi9pKTtcblxuICAgIGNvbnN0IGlzRWRnZSA9ICEhbWF0Y2hlcyAmJiBtYXRjaGVzLmxlbmd0aCA+IDE7XG4gICAgY29uc3QgaXNFZGdlVmVyc2lvbjE2T3JCZXR0ZXIgPSBpc0VkZ2UgJiYgKCEhbWF0Y2hlcyAmJiBwYXJzZUludChtYXRjaGVzWzFdLCAxMCkgPiAxNSk7XG5cbiAgICByZXR1cm4gaGFzSW50ZXJzZWN0aW9uT2JzZXJ2ZXIgJiYgKCFpc0VkZ2UgfHwgaXNFZGdlVmVyc2lvbjE2T3JCZXR0ZXIpO1xuICB9XG5cbiAgcHVibGljIG5nT25EZXN0cm95KCkge1xuICAgIHRoaXMucmVtb3ZlTGlzdGVuZXJzKCk7XG4gIH1cbiAgcHJpdmF0ZSByZWdpc3RlckludGVyc2VjdGlvbk9ic2VydmVyKCk6IHZvaWQge1xuICAgIGlmICghIXRoaXMuX2ludGVyc2VjdGlvbk9ic2VydmVyKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIHRoaXMuX2ludGVyc2VjdGlvbk9ic2VydmVyID0gbmV3IEludGVyc2VjdGlvbk9ic2VydmVyKGVudHJpZXMgPT4ge1xuICAgICAgdGhpcy5jaGVja0ZvckludGVyc2VjdGlvbihlbnRyaWVzKTtcbiAgICB9LCB7fSk7XG4gIH1cblxuICBwcml2YXRlIGNoZWNrRm9ySW50ZXJzZWN0aW9uID0gKGVudHJpZXM6IEFycmF5PEludGVyc2VjdGlvbk9ic2VydmVyRW50cnk+KSA9PiB7XG4gICAgZW50cmllcy5mb3JFYWNoKChlbnRyeTogSW50ZXJzZWN0aW9uT2JzZXJ2ZXJFbnRyeSkgPT4ge1xuICAgICAgaWYgKHRoaXMuY2hlY2tJZkludGVyc2VjdGluZyhlbnRyeSkpIHtcbiAgICAgICAgdGhpcy5sb2FkKCk7XG4gICAgICAgIGlmICh0aGlzLl9pbnRlcnNlY3Rpb25PYnNlcnZlcikge1xuICAgICAgICAgIHRoaXMuX2ludGVyc2VjdGlvbk9ic2VydmVyLnVub2JzZXJ2ZSg8RWxlbWVudD4odGhpcy5fZWxlbWVudC5uYXRpdmVFbGVtZW50KSk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuICBwcml2YXRlIGNoZWNrSWZJbnRlcnNlY3RpbmcoZW50cnk6IEludGVyc2VjdGlvbk9ic2VydmVyRW50cnkpIHtcbiAgICAvLyBGb3IgU2Ftc3VuZyBuYXRpdmUgYnJvd3NlciwgSU8gaGFzIGJlZW4gcGFydGlhbGx5IGltcGxlbWVudGVkIHdoZXJlIGJ5IHRoZVxuICAgIC8vIGNhbGxiYWNrIGZpcmVzLCBidXQgZW50cnkgb2JqZWN0IGlzIGVtcHR5LiBXZSB3aWxsIGNoZWNrIG1hbnVhbGx5LlxuICAgIGlmIChlbnRyeSAmJiBPYmplY3Qua2V5cyhlbnRyeSkubGVuZ3RoKSB7XG4gICAgICByZXR1cm4gKDxhbnk+ZW50cnkpLmlzSW50ZXJzZWN0aW5nICYmIGVudHJ5LnRhcmdldCA9PT0gdGhpcy5fZWxlbWVudC5uYXRpdmVFbGVtZW50O1xuICAgIH1cbiAgICByZXR1cm4gdGhpcy5pc1Zpc2libGUoKTtcbiAgfVxuXG4gIHByaXZhdGUgbG9hZCgpOiB2b2lkIHtcbiAgICB0aGlzLnJlbW92ZUxpc3RlbmVycygpO1xuICAgIC8vIHRoaXMuZGVmZXJMb2FkLmVtaXQoKTtcbiAgICB0aGlzLl9lbGVtZW50Lm5hdGl2ZUVsZW1lbnQuc3JjID0gdGhpcy5zcmM7XG4gIH1cblxuICBwcml2YXRlIGFkZFNjcm9sbExpc3RlbmVycygpIHtcbiAgICBpZiAodGhpcy5pc1Zpc2libGUoKSkge1xuICAgICAgdGhpcy5sb2FkKCk7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIHRoaXMuX3pvbmUucnVuT3V0c2lkZUFuZ3VsYXIoKCkgPT4ge1xuICAgICAgdGhpcy5fc2Nyb2xsU3Vic2NyaXB0aW9uID0gZnJvbUV2ZW50KHdpbmRvdywgJ3Njcm9sbCcpXG4gICAgICAgIC5waXBlKGRlYm91bmNlVGltZSg1MCkpXG4gICAgICAgIC5zdWJzY3JpYmUodGhpcy5vblNjcm9sbCk7XG4gICAgfSk7XG4gIH1cblxuICBwcml2YXRlIHJlbW92ZUxpc3RlbmVycygpIHtcbiAgICBpZiAodGhpcy5fc2Nyb2xsU3Vic2NyaXB0aW9uKSB7XG4gICAgICB0aGlzLl9zY3JvbGxTdWJzY3JpcHRpb24udW5zdWJzY3JpYmUoKTtcbiAgICB9XG5cbiAgICBpZiAodGhpcy5faW50ZXJzZWN0aW9uT2JzZXJ2ZXIpIHtcbiAgICAgIHRoaXMuX2ludGVyc2VjdGlvbk9ic2VydmVyLmRpc2Nvbm5lY3QoKTtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIG9uU2Nyb2xsID0gKCkgPT4ge1xuICAgIGlmICh0aGlzLmlzVmlzaWJsZSgpKSB7XG4gICAgICB0aGlzLl96b25lLnJ1bigoKSA9PiB0aGlzLmxvYWQoKSk7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBpc1Zpc2libGUoKSB7XG4gICAgY29uc3Qgc2Nyb2xsUG9zaXRpb24gPSB0aGlzLmdldFNjcm9sbFBvc2l0aW9uKCk7XG4gICAgY29uc3QgZWxlbWVudE9mZnNldCA9IHRoaXMuX2VsZW1lbnQubmF0aXZlRWxlbWVudC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKS50b3A7XG4gICAgcmV0dXJuIGVsZW1lbnRPZmZzZXQgPD0gc2Nyb2xsUG9zaXRpb247XG4gIH1cblxuICBwcml2YXRlIGdldFNjcm9sbFBvc2l0aW9uKCkge1xuICAgIC8vIEdldHRpbmcgc2NyZWVuIHNpemUgYW5kIHNjcm9sbCBwb3NpdGlvbiBmb3IgSUVcbiAgICByZXR1cm4gKHdpbmRvdy5zY3JvbGxZIHx8IHdpbmRvdy5wYWdlWU9mZnNldClcbiAgICAgICsgKGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5jbGllbnRIZWlnaHQgfHwgZG9jdW1lbnQuYm9keS5jbGllbnRIZWlnaHQpO1xuICB9XG59XG4iLCJpbXBvcnQgeyBOZ01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7IExhenlMb2FkRGlyZWN0aXZlIH0gZnJvbSAnLi9sYXp5LWxvYWQuZGlyZWN0aXZlJztcblxuQE5nTW9kdWxlKHtcbiAgaW1wb3J0czogW1xuICAgIENvbW1vbk1vZHVsZVxuICBdLFxuICBkZWNsYXJhdGlvbnM6IFtMYXp5TG9hZERpcmVjdGl2ZV0sXG4gIGV4cG9ydHM6IFtMYXp5TG9hZERpcmVjdGl2ZV1cbn0pXG5leHBvcnQgY2xhc3MgTGF6eUxvYWRNb2R1bGUgeyB9XG4iXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQUE7Ozs7OztJQWNFLFlBRVUsVUFDQSxPQUNxQixVQUFrQjtRQUZ2QyxhQUFRLEdBQVIsUUFBUTtRQUNSLFVBQUssR0FBTCxLQUFLO1FBQ2dCLGVBQVUsR0FBVixVQUFVLENBQVE7b0NBaURsQixDQUFDLE9BQXlDO1lBQ3ZFLE9BQU8sQ0FBQyxPQUFPLENBQUMsQ0FBQyxLQUFnQztnQkFDL0MsSUFBSSxJQUFJLENBQUMsbUJBQW1CLENBQUMsS0FBSyxDQUFDLEVBQUU7b0JBQ25DLElBQUksQ0FBQyxJQUFJLEVBQUUsQ0FBQztvQkFDWixJQUFJLElBQUksQ0FBQyxxQkFBcUIsRUFBRTt3QkFDOUIsSUFBSSxDQUFDLHFCQUFxQixDQUFDLFNBQVMsb0JBQVcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxhQUFhLEdBQUUsQ0FBQztxQkFDOUU7aUJBQ0Y7YUFDRixDQUFDLENBQUM7U0FDSjt3QkFzQ2tCO1lBQ2pCLElBQUksSUFBSSxDQUFDLFNBQVMsRUFBRSxFQUFFO2dCQUNwQixJQUFJLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxNQUFNLElBQUksQ0FBQyxJQUFJLEVBQUUsQ0FBQyxDQUFDO2FBQ25DO1NBQ0Y7S0FsR0E7Ozs7SUFFTSxlQUFlO1FBQ3BCLElBQUksaUJBQWlCLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxFQUFFO1lBQ3RDLElBQUksQ0FBQyxjQUFjLEVBQUUsQ0FBQztTQUN2QjthQUFNOztZQUVMLElBQUksQ0FBQyxJQUFJLEVBQUUsQ0FBQztTQUNiOzs7OztJQUdLLGNBQWM7O1FBRXBCLElBQUksSUFBSSxDQUFDLG9CQUFvQixFQUFFLEVBQUU7WUFDL0IsSUFBSSxDQUFDLDRCQUE0QixFQUFFLENBQUM7WUFDcEMsSUFBSSxJQUFJLENBQUMscUJBQXFCLEVBQUU7Z0JBQzlCLElBQUksQ0FBQyxxQkFBcUIsQ0FBQyxPQUFPLG9CQUFXLElBQUksQ0FBQyxRQUFRLENBQUMsYUFBYSxHQUFFLENBQUM7YUFDNUU7U0FDRjthQUFNOztZQUVMLElBQUksQ0FBQyxrQkFBa0IsRUFBRSxDQUFDO1NBQzNCOzs7OztJQUdLLG9CQUFvQjtRQUMxQix1QkFBTSx1QkFBdUIsR0FBRyxzQkFBc0IsSUFBSSxNQUFNLENBQUM7UUFDakUsdUJBQU0sU0FBUyxHQUFHLE1BQU0sQ0FBQyxTQUFTLENBQUMsU0FBUyxDQUFDO1FBQzdDLHVCQUFNLE9BQU8sR0FBRyxTQUFTLENBQUMsS0FBSyxDQUFDLGdCQUFnQixDQUFDLENBQUM7UUFFbEQsdUJBQU0sTUFBTSxHQUFHLENBQUMsQ0FBQyxPQUFPLElBQUksT0FBTyxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUM7UUFDL0MsdUJBQU0sdUJBQXVCLEdBQUcsTUFBTSxLQUFLLENBQUMsQ0FBQyxPQUFPLElBQUksUUFBUSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsRUFBRSxFQUFFLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQztRQUV2RixPQUFPLHVCQUF1QixLQUFLLENBQUMsTUFBTSxJQUFJLHVCQUF1QixDQUFDLENBQUM7Ozs7O0lBR2xFLFdBQVc7UUFDaEIsSUFBSSxDQUFDLGVBQWUsRUFBRSxDQUFDOzs7OztJQUVqQiw0QkFBNEI7UUFDbEMsSUFBSSxDQUFDLENBQUMsSUFBSSxDQUFDLHFCQUFxQixFQUFFO1lBQ2hDLE9BQU87U0FDUjtRQUNELElBQUksQ0FBQyxxQkFBcUIsR0FBRyxJQUFJLG9CQUFvQixDQUFDLE9BQU87WUFDM0QsSUFBSSxDQUFDLG9CQUFvQixDQUFDLE9BQU8sQ0FBQyxDQUFDO1NBQ3BDLEVBQUUsRUFBRSxDQUFDLENBQUM7Ozs7OztJQWFELG1CQUFtQixDQUFDLEtBQWdDOzs7UUFHMUQsSUFBSSxLQUFLLElBQUksTUFBTSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxNQUFNLEVBQUU7WUFDdEMsT0FBTyxtQkFBTSxLQUFLLEdBQUUsY0FBYyxJQUFJLEtBQUssQ0FBQyxNQUFNLEtBQUssSUFBSSxDQUFDLFFBQVEsQ0FBQyxhQUFhLENBQUM7U0FDcEY7UUFDRCxPQUFPLElBQUksQ0FBQyxTQUFTLEVBQUUsQ0FBQzs7Ozs7SUFHbEIsSUFBSTtRQUNWLElBQUksQ0FBQyxlQUFlLEVBQUUsQ0FBQzs7UUFFdkIsSUFBSSxDQUFDLFFBQVEsQ0FBQyxhQUFhLENBQUMsR0FBRyxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUM7Ozs7O0lBR3JDLGtCQUFrQjtRQUN4QixJQUFJLElBQUksQ0FBQyxTQUFTLEVBQUUsRUFBRTtZQUNwQixJQUFJLENBQUMsSUFBSSxFQUFFLENBQUM7WUFDWixPQUFPO1NBQ1I7UUFDRCxJQUFJLENBQUMsS0FBSyxDQUFDLGlCQUFpQixDQUFDO1lBQzNCLElBQUksQ0FBQyxtQkFBbUIsR0FBRyxTQUFTLENBQUMsTUFBTSxFQUFFLFFBQVEsQ0FBQztpQkFDbkQsSUFBSSxDQUFDLFlBQVksQ0FBQyxFQUFFLENBQUMsQ0FBQztpQkFDdEIsU0FBUyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQztTQUM3QixDQUFDLENBQUM7Ozs7O0lBR0csZUFBZTtRQUNyQixJQUFJLElBQUksQ0FBQyxtQkFBbUIsRUFBRTtZQUM1QixJQUFJLENBQUMsbUJBQW1CLENBQUMsV0FBVyxFQUFFLENBQUM7U0FDeEM7UUFFRCxJQUFJLElBQUksQ0FBQyxxQkFBcUIsRUFBRTtZQUM5QixJQUFJLENBQUMscUJBQXFCLENBQUMsVUFBVSxFQUFFLENBQUM7U0FDekM7Ozs7O0lBU0ssU0FBUztRQUNmLHVCQUFNLGNBQWMsR0FBRyxJQUFJLENBQUMsaUJBQWlCLEVBQUUsQ0FBQztRQUNoRCx1QkFBTSxhQUFhLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxhQUFhLENBQUMscUJBQXFCLEVBQUUsQ0FBQyxHQUFHLENBQUM7UUFDOUUsT0FBTyxhQUFhLElBQUksY0FBYyxDQUFDOzs7OztJQUdqQyxpQkFBaUI7O1FBRXZCLE9BQU8sQ0FBQyxNQUFNLENBQUMsT0FBTyxJQUFJLE1BQU0sQ0FBQyxXQUFXO2VBQ3ZDLFFBQVEsQ0FBQyxlQUFlLENBQUMsWUFBWSxJQUFJLFFBQVEsQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLENBQUM7Ozs7WUE1SDdFLFNBQVMsU0FBQztnQkFDVCxRQUFRLEVBQUUsZUFBZTthQUMxQjs7OztZQVBtQixVQUFVO1lBQTRCLE1BQU07WUFrQm5CLE1BQU0sdUJBQTlDLE1BQU0sU0FBQyxXQUFXOzs7a0JBTnBCLEtBQUs7Ozs7Ozs7QUNaUjs7O1lBSUMsUUFBUSxTQUFDO2dCQUNSLE9BQU8sRUFBRTtvQkFDUCxZQUFZO2lCQUNiO2dCQUNELFlBQVksRUFBRSxDQUFDLGlCQUFpQixDQUFDO2dCQUNqQyxPQUFPLEVBQUUsQ0FBQyxpQkFBaUIsQ0FBQzthQUM3Qjs7Ozs7Ozs7Ozs7Ozs7OyJ9