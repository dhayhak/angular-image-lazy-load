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

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmctaW1hZ2UtbGF6eS1sb2FkLmpzLm1hcCIsInNvdXJjZXMiOlsibmc6Ly9uZy1pbWFnZS1sYXp5LWxvYWQvc3JjL2xhenktbG9hZC5kaXJlY3RpdmUudHMiLCJuZzovL25nLWltYWdlLWxhenktbG9hZC9zcmMvbGF6eS1sb2FkLm1vZHVsZS50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBEaXJlY3RpdmUsIEVsZW1lbnRSZWYsIEFmdGVyVmlld0luaXQsIE9uRGVzdHJveSwgTmdab25lLCBQTEFURk9STV9JRCwgSW5qZWN0LCBJbnB1dCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgaXNQbGF0Zm9ybUJyb3dzZXIgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHsgU3Vic2NyaXB0aW9uLCBmcm9tRXZlbnQgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IGRlYm91bmNlVGltZSB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcblxuQERpcmVjdGl2ZSh7XG4gIHNlbGVjdG9yOiAnW2FwcExhenlMb2FkXSdcbn0pXG5leHBvcnQgY2xhc3MgTGF6eUxvYWREaXJlY3RpdmUgaW1wbGVtZW50cyBBZnRlclZpZXdJbml0LCBPbkRlc3Ryb3kge1xuXG4gIHByaXZhdGUgX2ludGVyc2VjdGlvbk9ic2VydmVyPzogSW50ZXJzZWN0aW9uT2JzZXJ2ZXI7XG4gIHByaXZhdGUgX3Njcm9sbFN1YnNjcmlwdGlvbj86IFN1YnNjcmlwdGlvbjtcbiAgQElucHV0KCkgc3JjOiBzdHJpbmc7ICAgLy8gVGhlIGltYWdlIHRvIGJlIGxhenkgbG9hZGVkXG5cbiAgY29uc3RydWN0b3IoXG5cbiAgICBwcml2YXRlIF9lbGVtZW50OiBFbGVtZW50UmVmLFxuICAgIHByaXZhdGUgX3pvbmU6IE5nWm9uZSxcbiAgICBASW5qZWN0KFBMQVRGT1JNX0lEKSBwcml2YXRlIHBsYXRmb3JtSWQ6IE9iamVjdFxuICApIHtcbiAgfVxuXG4gIHB1YmxpYyBuZ0FmdGVyVmlld0luaXQoKSB7XG4gICAgaWYgKGlzUGxhdGZvcm1Ccm93c2VyKHRoaXMucGxhdGZvcm1JZCkpIHtcbiAgICAgIHRoaXMuZW5hYmxlTGF6eUxvYWQoKTtcbiAgICB9IGVsc2Uge1xuICAgICAgLy8gcnVubmluZyBvbiBzZXJ2ZXIsIGp1c3QgbG9hZCB0aGUgaW1hZ2VcbiAgICAgIHRoaXMubG9hZCgpO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgZW5hYmxlTGF6eUxvYWQoKSB7XG4gICAgLy8gQ2xpZW50IG9ubHkgY29kZS5cbiAgICBpZiAodGhpcy5oYXNDb21wYXRpYmxlQnJvd3NlcigpKSB7XG4gICAgICB0aGlzLnJlZ2lzdGVySW50ZXJzZWN0aW9uT2JzZXJ2ZXIoKTtcbiAgICAgIGlmICh0aGlzLl9pbnRlcnNlY3Rpb25PYnNlcnZlcikge1xuICAgICAgICB0aGlzLl9pbnRlcnNlY3Rpb25PYnNlcnZlci5vYnNlcnZlKDxFbGVtZW50Pih0aGlzLl9lbGVtZW50Lm5hdGl2ZUVsZW1lbnQpKTtcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgLy8gYWRkIHNjcm9sbCB3YXRjaCBpZiBpbnRlcnNlY3Rpb24gb2JzZXJ2ZXIgaXMgbm90IGF2YWlsYWJsZVxuICAgICAgdGhpcy5hZGRTY3JvbGxMaXN0ZW5lcnMoKTtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIGhhc0NvbXBhdGlibGVCcm93c2VyKCk6IGJvb2xlYW4ge1xuICAgIGNvbnN0IGhhc0ludGVyc2VjdGlvbk9ic2VydmVyID0gJ0ludGVyc2VjdGlvbk9ic2VydmVyJyBpbiB3aW5kb3c7XG4gICAgY29uc3QgdXNlckFnZW50ID0gd2luZG93Lm5hdmlnYXRvci51c2VyQWdlbnQ7XG4gICAgY29uc3QgbWF0Y2hlcyA9IHVzZXJBZ2VudC5tYXRjaCgvRWRnZVxcLyhcXGQqKVxcLi9pKTtcblxuICAgIGNvbnN0IGlzRWRnZSA9ICEhbWF0Y2hlcyAmJiBtYXRjaGVzLmxlbmd0aCA+IDE7XG4gICAgY29uc3QgaXNFZGdlVmVyc2lvbjE2T3JCZXR0ZXIgPSBpc0VkZ2UgJiYgKCEhbWF0Y2hlcyAmJiBwYXJzZUludChtYXRjaGVzWzFdLCAxMCkgPiAxNSk7XG5cbiAgICByZXR1cm4gaGFzSW50ZXJzZWN0aW9uT2JzZXJ2ZXIgJiYgKCFpc0VkZ2UgfHwgaXNFZGdlVmVyc2lvbjE2T3JCZXR0ZXIpO1xuICB9XG5cbiAgcHVibGljIG5nT25EZXN0cm95KCkge1xuICAgIHRoaXMucmVtb3ZlTGlzdGVuZXJzKCk7XG4gIH1cbiAgcHJpdmF0ZSByZWdpc3RlckludGVyc2VjdGlvbk9ic2VydmVyKCk6IHZvaWQge1xuICAgIGlmICghIXRoaXMuX2ludGVyc2VjdGlvbk9ic2VydmVyKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIHRoaXMuX2ludGVyc2VjdGlvbk9ic2VydmVyID0gbmV3IEludGVyc2VjdGlvbk9ic2VydmVyKGVudHJpZXMgPT4ge1xuICAgICAgdGhpcy5jaGVja0ZvckludGVyc2VjdGlvbihlbnRyaWVzKTtcbiAgICB9LCB7fSk7XG4gIH1cblxuICBwcml2YXRlIGNoZWNrRm9ySW50ZXJzZWN0aW9uID0gKGVudHJpZXM6IEFycmF5PEludGVyc2VjdGlvbk9ic2VydmVyRW50cnk+KSA9PiB7XG4gICAgZW50cmllcy5mb3JFYWNoKChlbnRyeTogSW50ZXJzZWN0aW9uT2JzZXJ2ZXJFbnRyeSkgPT4ge1xuICAgICAgaWYgKHRoaXMuY2hlY2tJZkludGVyc2VjdGluZyhlbnRyeSkpIHtcbiAgICAgICAgdGhpcy5sb2FkKCk7XG4gICAgICAgIGlmICh0aGlzLl9pbnRlcnNlY3Rpb25PYnNlcnZlcikge1xuICAgICAgICAgIHRoaXMuX2ludGVyc2VjdGlvbk9ic2VydmVyLnVub2JzZXJ2ZSg8RWxlbWVudD4odGhpcy5fZWxlbWVudC5uYXRpdmVFbGVtZW50KSk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuICBwcml2YXRlIGNoZWNrSWZJbnRlcnNlY3RpbmcoZW50cnk6IEludGVyc2VjdGlvbk9ic2VydmVyRW50cnkpIHtcbiAgICAvLyBGb3IgU2Ftc3VuZyBuYXRpdmUgYnJvd3NlciwgSU8gaGFzIGJlZW4gcGFydGlhbGx5IGltcGxlbWVudGVkIHdoZXJlIGJ5IHRoZVxuICAgIC8vIGNhbGxiYWNrIGZpcmVzLCBidXQgZW50cnkgb2JqZWN0IGlzIGVtcHR5LiBXZSB3aWxsIGNoZWNrIG1hbnVhbGx5LlxuICAgIGlmIChlbnRyeSAmJiBPYmplY3Qua2V5cyhlbnRyeSkubGVuZ3RoKSB7XG4gICAgICByZXR1cm4gKDxhbnk+ZW50cnkpLmlzSW50ZXJzZWN0aW5nICYmIGVudHJ5LnRhcmdldCA9PT0gdGhpcy5fZWxlbWVudC5uYXRpdmVFbGVtZW50O1xuICAgIH1cbiAgICByZXR1cm4gdGhpcy5pc1Zpc2libGUoKTtcbiAgfVxuXG4gIHByaXZhdGUgbG9hZCgpOiB2b2lkIHtcbiAgICB0aGlzLnJlbW92ZUxpc3RlbmVycygpO1xuICAgIC8vIHRoaXMuZGVmZXJMb2FkLmVtaXQoKTtcbiAgICB0aGlzLl9lbGVtZW50Lm5hdGl2ZUVsZW1lbnQuc3JjID0gdGhpcy5zcmM7XG4gIH1cblxuICBwcml2YXRlIGFkZFNjcm9sbExpc3RlbmVycygpIHtcbiAgICBpZiAodGhpcy5pc1Zpc2libGUoKSkge1xuICAgICAgdGhpcy5sb2FkKCk7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIHRoaXMuX3pvbmUucnVuT3V0c2lkZUFuZ3VsYXIoKCkgPT4ge1xuICAgICAgdGhpcy5fc2Nyb2xsU3Vic2NyaXB0aW9uID0gZnJvbUV2ZW50KHdpbmRvdywgJ3Njcm9sbCcpXG4gICAgICAgIC5waXBlKGRlYm91bmNlVGltZSg1MCkpXG4gICAgICAgIC5zdWJzY3JpYmUodGhpcy5vblNjcm9sbCk7XG4gICAgfSk7XG4gIH1cblxuICBwcml2YXRlIHJlbW92ZUxpc3RlbmVycygpIHtcbiAgICBpZiAodGhpcy5fc2Nyb2xsU3Vic2NyaXB0aW9uKSB7XG4gICAgICB0aGlzLl9zY3JvbGxTdWJzY3JpcHRpb24udW5zdWJzY3JpYmUoKTtcbiAgICB9XG5cbiAgICBpZiAodGhpcy5faW50ZXJzZWN0aW9uT2JzZXJ2ZXIpIHtcbiAgICAgIHRoaXMuX2ludGVyc2VjdGlvbk9ic2VydmVyLmRpc2Nvbm5lY3QoKTtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIG9uU2Nyb2xsID0gKCkgPT4ge1xuICAgIGlmICh0aGlzLmlzVmlzaWJsZSgpKSB7XG4gICAgICB0aGlzLl96b25lLnJ1bigoKSA9PiB0aGlzLmxvYWQoKSk7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBpc1Zpc2libGUoKSB7XG4gICAgY29uc3Qgc2Nyb2xsUG9zaXRpb24gPSB0aGlzLmdldFNjcm9sbFBvc2l0aW9uKCk7XG4gICAgY29uc3QgZWxlbWVudE9mZnNldCA9IHRoaXMuX2VsZW1lbnQubmF0aXZlRWxlbWVudC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKS50b3A7XG4gICAgcmV0dXJuIGVsZW1lbnRPZmZzZXQgPD0gc2Nyb2xsUG9zaXRpb247XG4gIH1cblxuICBwcml2YXRlIGdldFNjcm9sbFBvc2l0aW9uKCkge1xuICAgIC8vIEdldHRpbmcgc2NyZWVuIHNpemUgYW5kIHNjcm9sbCBwb3NpdGlvbiBmb3IgSUVcbiAgICByZXR1cm4gKHdpbmRvdy5zY3JvbGxZIHx8IHdpbmRvdy5wYWdlWU9mZnNldClcbiAgICAgICsgKGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5jbGllbnRIZWlnaHQgfHwgZG9jdW1lbnQuYm9keS5jbGllbnRIZWlnaHQpO1xuICB9XG59XG4iLCJpbXBvcnQgeyBOZ01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7IExhenlMb2FkRGlyZWN0aXZlIH0gZnJvbSAnLi9sYXp5LWxvYWQuZGlyZWN0aXZlJztcblxuQE5nTW9kdWxlKHtcbiAgaW1wb3J0czogW1xuICAgIENvbW1vbk1vZHVsZVxuICBdLFxuICBkZWNsYXJhdGlvbnM6IFtMYXp5TG9hZERpcmVjdGl2ZV0sXG4gIGV4cG9ydHM6IFtMYXp5TG9hZERpcmVjdGl2ZV1cbn0pXG5leHBvcnQgY2xhc3MgTGF6eUxvYWRNb2R1bGUgeyB9XG4iXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQUE7SUFjRSwyQkFFVSxVQUNBLE9BQ3FCLFVBQWtCO1FBSmpELGlCQU1DO1FBSlMsYUFBUSxHQUFSLFFBQVE7UUFDUixVQUFLLEdBQUwsS0FBSztRQUNnQixlQUFVLEdBQVYsVUFBVSxDQUFRO29DQWlEbEIsVUFBQyxPQUF5QztZQUN2RSxPQUFPLENBQUMsT0FBTyxDQUFDLFVBQUMsS0FBZ0M7Z0JBQy9DLElBQUksS0FBSSxDQUFDLG1CQUFtQixDQUFDLEtBQUssQ0FBQyxFQUFFO29CQUNuQyxLQUFJLENBQUMsSUFBSSxFQUFFLENBQUM7b0JBQ1osSUFBSSxLQUFJLENBQUMscUJBQXFCLEVBQUU7d0JBQzlCLEtBQUksQ0FBQyxxQkFBcUIsQ0FBQyxTQUFTLG9CQUFXLEtBQUksQ0FBQyxRQUFRLENBQUMsYUFBYSxHQUFFLENBQUM7cUJBQzlFO2lCQUNGO2FBQ0YsQ0FBQyxDQUFDO1NBQ0o7d0JBc0NrQjtZQUNqQixJQUFJLEtBQUksQ0FBQyxTQUFTLEVBQUUsRUFBRTtnQkFDcEIsS0FBSSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsY0FBTSxPQUFBLEtBQUksQ0FBQyxJQUFJLEVBQUUsR0FBQSxDQUFDLENBQUM7YUFDbkM7U0FDRjtLQWxHQTs7OztJQUVNLDJDQUFlOzs7O1FBQ3BCLElBQUksaUJBQWlCLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxFQUFFO1lBQ3RDLElBQUksQ0FBQyxjQUFjLEVBQUUsQ0FBQztTQUN2QjthQUFNOztZQUVMLElBQUksQ0FBQyxJQUFJLEVBQUUsQ0FBQztTQUNiOzs7OztJQUdLLDBDQUFjOzs7OztRQUVwQixJQUFJLElBQUksQ0FBQyxvQkFBb0IsRUFBRSxFQUFFO1lBQy9CLElBQUksQ0FBQyw0QkFBNEIsRUFBRSxDQUFDO1lBQ3BDLElBQUksSUFBSSxDQUFD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