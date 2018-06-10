(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('@angular/common'), require('rxjs'), require('rxjs/operators')) :
    typeof define === 'function' && define.amd ? define('ng-image-lazy-load', ['exports', '@angular/core', '@angular/common', 'rxjs', 'rxjs/operators'], factory) :
    (factory((global['ng-image-lazy-load'] = {}),global.ng.core,global.ng.common,global.rxjs,global.rxjs.operators));
}(this, (function (exports,core,common,rxjs,operators) { 'use strict';

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes} checked by tsc
     */
    var LazyLoadDirective = (function () {
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
                if (common.isPlatformBrowser(this.platformId)) {
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
                    return ((entry)).isIntersecting && entry.target === this._element.nativeElement;
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
                    _this._scrollSubscription = rxjs.fromEvent(window, 'scroll')
                        .pipe(operators.debounceTime(50))
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
            { type: core.Directive, args: [{
                        selector: '[appLazyLoad]'
                    },] },
        ];
        /** @nocollapse */
        LazyLoadDirective.ctorParameters = function () {
            return [
                { type: core.ElementRef },
                { type: core.NgZone },
                { type: Object, decorators: [{ type: core.Inject, args: [core.PLATFORM_ID,] }] }
            ];
        };
        LazyLoadDirective.propDecorators = {
            src: [{ type: core.Input }]
        };
        return LazyLoadDirective;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes} checked by tsc
     */
    var LazyLoadModule = (function () {
        function LazyLoadModule() {
        }
        LazyLoadModule.decorators = [
            { type: core.NgModule, args: [{
                        imports: [
                            common.CommonModule
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

    exports.LazyLoadDirective = LazyLoadDirective;
    exports.LazyLoadModule = LazyLoadModule;

    Object.defineProperty(exports, '__esModule', { value: true });

})));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmctaW1hZ2UtbGF6eS1sb2FkLnVtZC5qcy5tYXAiLCJzb3VyY2VzIjpbIm5nOi8vbmctaW1hZ2UtbGF6eS1sb2FkL3NyYy9sYXp5LWxvYWQuZGlyZWN0aXZlLnRzIiwibmc6Ly9uZy1pbWFnZS1sYXp5LWxvYWQvc3JjL2xhenktbG9hZC5tb2R1bGUudHMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgRGlyZWN0aXZlLCBFbGVtZW50UmVmLCBBZnRlclZpZXdJbml0LCBPbkRlc3Ryb3ksIE5nWm9uZSwgUExBVEZPUk1fSUQsIEluamVjdCwgSW5wdXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IGlzUGxhdGZvcm1Ccm93c2VyIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7IFN1YnNjcmlwdGlvbiwgZnJvbUV2ZW50IH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBkZWJvdW5jZVRpbWUgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5cbkBEaXJlY3RpdmUoe1xuICBzZWxlY3RvcjogJ1thcHBMYXp5TG9hZF0nXG59KVxuZXhwb3J0IGNsYXNzIExhenlMb2FkRGlyZWN0aXZlIGltcGxlbWVudHMgQWZ0ZXJWaWV3SW5pdCwgT25EZXN0cm95IHtcblxuICBwcml2YXRlIF9pbnRlcnNlY3Rpb25PYnNlcnZlcj86IEludGVyc2VjdGlvbk9ic2VydmVyO1xuICBwcml2YXRlIF9zY3JvbGxTdWJzY3JpcHRpb24/OiBTdWJzY3JpcHRpb247XG4gIEBJbnB1dCgpIHNyYzogc3RyaW5nOyAgIC8vIFRoZSBpbWFnZSB0byBiZSBsYXp5IGxvYWRlZFxuXG4gIGNvbnN0cnVjdG9yKFxuXG4gICAgcHJpdmF0ZSBfZWxlbWVudDogRWxlbWVudFJlZixcbiAgICBwcml2YXRlIF96b25lOiBOZ1pvbmUsXG4gICAgQEluamVjdChQTEFURk9STV9JRCkgcHJpdmF0ZSBwbGF0Zm9ybUlkOiBPYmplY3RcbiAgKSB7XG4gICAgX2VsZW1lbnQubmF0aXZlRWxlbWVudC5zdHlsZS5iYWNrZ3JvdW5kQ29sb3IgPSAneWVsbG93JztcbiAgfVxuXG4gIHB1YmxpYyBuZ0FmdGVyVmlld0luaXQoKSB7XG4gICAgaWYgKGlzUGxhdGZvcm1Ccm93c2VyKHRoaXMucGxhdGZvcm1JZCkpIHtcbiAgICAgIHRoaXMuZW5hYmxlTGF6eUxvYWQoKTtcbiAgICB9IGVsc2Uge1xuICAgICAgLy8gcnVubmluZyBvbiBzZXJ2ZXIsIGp1c3QgbG9hZCB0aGUgaW1hZ2VcbiAgICAgIHRoaXMubG9hZCgpO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgZW5hYmxlTGF6eUxvYWQoKSB7XG4gICAgLy8gQ2xpZW50IG9ubHkgY29kZS5cbiAgICBpZiAodGhpcy5oYXNDb21wYXRpYmxlQnJvd3NlcigpKSB7XG4gICAgICB0aGlzLnJlZ2lzdGVySW50ZXJzZWN0aW9uT2JzZXJ2ZXIoKTtcbiAgICAgIGlmICh0aGlzLl9pbnRlcnNlY3Rpb25PYnNlcnZlcikge1xuICAgICAgICB0aGlzLl9pbnRlcnNlY3Rpb25PYnNlcnZlci5vYnNlcnZlKDxFbGVtZW50Pih0aGlzLl9lbGVtZW50Lm5hdGl2ZUVsZW1lbnQpKTtcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgLy8gYWRkIHNjcm9sbCB3YXRjaCBpZiBpbnRlcnNlY3Rpb24gb2JzZXJ2ZXIgaXMgbm90IGF2YWlsYWJsZVxuICAgICAgdGhpcy5hZGRTY3JvbGxMaXN0ZW5lcnMoKTtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIGhhc0NvbXBhdGlibGVCcm93c2VyKCk6IGJvb2xlYW4ge1xuICAgIGNvbnN0IGhhc0ludGVyc2VjdGlvbk9ic2VydmVyID0gJ0ludGVyc2VjdGlvbk9ic2VydmVyJyBpbiB3aW5kb3c7XG4gICAgY29uc3QgdXNlckFnZW50ID0gd2luZG93Lm5hdmlnYXRvci51c2VyQWdlbnQ7XG4gICAgY29uc3QgbWF0Y2hlcyA9IHVzZXJBZ2VudC5tYXRjaCgvRWRnZVxcLyhcXGQqKVxcLi9pKTtcblxuICAgIGNvbnN0IGlzRWRnZSA9ICEhbWF0Y2hlcyAmJiBtYXRjaGVzLmxlbmd0aCA+IDE7XG4gICAgY29uc3QgaXNFZGdlVmVyc2lvbjE2T3JCZXR0ZXIgPSBpc0VkZ2UgJiYgKCEhbWF0Y2hlcyAmJiBwYXJzZUludChtYXRjaGVzWzFdLCAxMCkgPiAxNSk7XG5cbiAgICByZXR1cm4gaGFzSW50ZXJzZWN0aW9uT2JzZXJ2ZXIgJiYgKCFpc0VkZ2UgfHwgaXNFZGdlVmVyc2lvbjE2T3JCZXR0ZXIpO1xuICB9XG5cbiAgcHVibGljIG5nT25EZXN0cm95KCkge1xuICAgIHRoaXMucmVtb3ZlTGlzdGVuZXJzKCk7XG4gIH1cbiAgcHJpdmF0ZSByZWdpc3RlckludGVyc2VjdGlvbk9ic2VydmVyKCk6IHZvaWQge1xuICAgIGlmICghIXRoaXMuX2ludGVyc2VjdGlvbk9ic2VydmVyKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIHRoaXMuX2ludGVyc2VjdGlvbk9ic2VydmVyID0gbmV3IEludGVyc2VjdGlvbk9ic2VydmVyKGVudHJpZXMgPT4ge1xuICAgICAgdGhpcy5jaGVja0ZvckludGVyc2VjdGlvbihlbnRyaWVzKTtcbiAgICB9LCB7fSk7XG4gIH1cblxuICBwcml2YXRlIGNoZWNrRm9ySW50ZXJzZWN0aW9uID0gKGVudHJpZXM6IEFycmF5PEludGVyc2VjdGlvbk9ic2VydmVyRW50cnk+KSA9PiB7XG4gICAgZW50cmllcy5mb3JFYWNoKChlbnRyeTogSW50ZXJzZWN0aW9uT2JzZXJ2ZXJFbnRyeSkgPT4ge1xuICAgICAgaWYgKHRoaXMuY2hlY2tJZkludGVyc2VjdGluZyhlbnRyeSkpIHtcbiAgICAgICAgdGhpcy5sb2FkKCk7XG4gICAgICAgIGlmICh0aGlzLl9pbnRlcnNlY3Rpb25PYnNlcnZlcikge1xuICAgICAgICAgIHRoaXMuX2ludGVyc2VjdGlvbk9ic2VydmVyLnVub2JzZXJ2ZSg8RWxlbWVudD4odGhpcy5fZWxlbWVudC5uYXRpdmVFbGVtZW50KSk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuICBwcml2YXRlIGNoZWNrSWZJbnRlcnNlY3RpbmcoZW50cnk6IEludGVyc2VjdGlvbk9ic2VydmVyRW50cnkpIHtcbiAgICAvLyBGb3IgU2Ftc3VuZyBuYXRpdmUgYnJvd3NlciwgSU8gaGFzIGJlZW4gcGFydGlhbGx5IGltcGxlbWVudGVkIHdoZXJlIGJ5IHRoZVxuICAgIC8vIGNhbGxiYWNrIGZpcmVzLCBidXQgZW50cnkgb2JqZWN0IGlzIGVtcHR5LiBXZSB3aWxsIGNoZWNrIG1hbnVhbGx5LlxuICAgIGlmIChlbnRyeSAmJiBPYmplY3Qua2V5cyhlbnRyeSkubGVuZ3RoKSB7XG4gICAgICByZXR1cm4gKDxhbnk+ZW50cnkpLmlzSW50ZXJzZWN0aW5nICYmIGVudHJ5LnRhcmdldCA9PT0gdGhpcy5fZWxlbWVudC5uYXRpdmVFbGVtZW50O1xuICAgIH1cbiAgICByZXR1cm4gdGhpcy5pc1Zpc2libGUoKTtcbiAgfVxuXG4gIHByaXZhdGUgbG9hZCgpOiB2b2lkIHtcbiAgICB0aGlzLnJlbW92ZUxpc3RlbmVycygpO1xuICAgIC8vIHRoaXMuZGVmZXJMb2FkLmVtaXQoKTtcbiAgICB0aGlzLl9lbGVtZW50Lm5hdGl2ZUVsZW1lbnQuc3JjID0gdGhpcy5zcmM7XG4gIH1cblxuICBwcml2YXRlIGFkZFNjcm9sbExpc3RlbmVycygpIHtcbiAgICBpZiAodGhpcy5pc1Zpc2libGUoKSkge1xuICAgICAgdGhpcy5sb2FkKCk7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIHRoaXMuX3pvbmUucnVuT3V0c2lkZUFuZ3VsYXIoKCkgPT4ge1xuICAgICAgdGhpcy5fc2Nyb2xsU3Vic2NyaXB0aW9uID0gZnJvbUV2ZW50KHdpbmRvdywgJ3Njcm9sbCcpXG4gICAgICAgIC5waXBlKGRlYm91bmNlVGltZSg1MCkpXG4gICAgICAgIC5zdWJzY3JpYmUodGhpcy5vblNjcm9sbCk7XG4gICAgfSk7XG4gIH1cblxuICBwcml2YXRlIHJlbW92ZUxpc3RlbmVycygpIHtcbiAgICBpZiAodGhpcy5fc2Nyb2xsU3Vic2NyaXB0aW9uKSB7XG4gICAgICB0aGlzLl9zY3JvbGxTdWJzY3JpcHRpb24udW5zdWJzY3JpYmUoKTtcbiAgICB9XG5cbiAgICBpZiAodGhpcy5faW50ZXJzZWN0aW9uT2JzZXJ2ZXIpIHtcbiAgICAgIHRoaXMuX2ludGVyc2VjdGlvbk9ic2VydmVyLmRpc2Nvbm5lY3QoKTtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIG9uU2Nyb2xsID0gKCkgPT4ge1xuICAgIGlmICh0aGlzLmlzVmlzaWJsZSgpKSB7XG4gICAgICB0aGlzLl96b25lLnJ1bigoKSA9PiB0aGlzLmxvYWQoKSk7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBpc1Zpc2libGUoKSB7XG4gICAgY29uc3Qgc2Nyb2xsUG9zaXRpb24gPSB0aGlzLmdldFNjcm9sbFBvc2l0aW9uKCk7XG4gICAgY29uc3QgZWxlbWVudE9mZnNldCA9IHRoaXMuX2VsZW1lbnQubmF0aXZlRWxlbWVudC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKS50b3A7XG4gICAgcmV0dXJuIGVsZW1lbnRPZmZzZXQgPD0gc2Nyb2xsUG9zaXRpb247XG4gIH1cblxuICBwcml2YXRlIGdldFNjcm9sbFBvc2l0aW9uKCkge1xuICAgIC8vIEdldHRpbmcgc2NyZWVuIHNpemUgYW5kIHNjcm9sbCBwb3NpdGlvbiBmb3IgSUVcbiAgICByZXR1cm4gKHdpbmRvdy5zY3JvbGxZIHx8IHdpbmRvdy5wYWdlWU9mZnNldClcbiAgICAgICsgKGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5jbGllbnRIZWlnaHQgfHwgZG9jdW1lbnQuYm9keS5jbGllbnRIZWlnaHQpO1xuICB9XG59XG4iLCJpbXBvcnQgeyBOZ01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7IExhenlMb2FkRGlyZWN0aXZlIH0gZnJvbSAnLi9sYXp5LWxvYWQuZGlyZWN0aXZlJztcblxuQE5nTW9kdWxlKHtcbiAgaW1wb3J0czogW1xuICAgIENvbW1vbk1vZHVsZVxuICBdLFxuICBkZWNsYXJhdGlvbnM6IFtMYXp5TG9hZERpcmVjdGl2ZV0sXG4gIGV4cG9ydHM6IFtMYXp5TG9hZERpcmVjdGl2ZV1cbn0pXG5leHBvcnQgY2xhc3MgTGF6eUxvYWRNb2R1bGUgeyB9XG4iXSwibmFtZXMiOlsiaXNQbGF0Zm9ybUJyb3dzZXIiLCJmcm9tRXZlbnQiLCJkZWJvdW5jZVRpbWUiLCJEaXJlY3RpdmUiLCJFbGVtZW50UmVmIiwiTmdab25lIiwiSW5qZWN0IiwiUExBVEZPUk1fSUQiLCJJbnB1dCIsIk5nTW9kdWxlIiwiQ29tbW9uTW9kdWxlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQUE7UUFjRSwyQkFFVSxVQUNBLE9BQ3FCLFVBQWtCO1lBSmpELGlCQU9DO1lBTFMsYUFBUSxHQUFSLFFBQVE7WUFDUixVQUFLLEdBQUwsS0FBSztZQUNnQixlQUFVLEdBQVYsVUFBVSxDQUFRO3dDQWtEbEIsVUFBQyxPQUF5QztnQkFDdkUsT0FBTyxDQUFDLE9BQU8sQ0FBQyxVQUFDLEtBQWdDO29CQUMvQyxJQUFJLEtBQUksQ0FBQyxtQkFBbUIsQ0FBQyxLQUFLLENBQUMsRUFBRTt3QkFDbkMsS0FBSSxDQUFDLElBQUksRUFBRSxDQUFDO3dCQUNaLElBQUksS0FBSSxDQUFDLHFCQUFxQixFQUFFOzRCQUM5QixLQUFJLENBQUMscUJBQXFCLENBQUMsU0FBUyxvQkFBVyxLQUFJLENBQUMsUUFBUSxDQUFDLGFBQWEsR0FBRSxDQUFDO3lCQUM5RTtxQkFDRjtpQkFDRixDQUFDLENBQUM7YUFDSjs0QkFzQ2tCO2dCQUNqQixJQUFJLEtBQUksQ0FBQyxTQUFTLEVBQUUsRUFBRTtvQkFDcEIsS0FBSSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsY0FBTSxPQUFBLEtBQUksQ0FBQyxJQUFJLEVBQUUsR0FBQSxDQUFDLENBQUM7aUJBQ25DO2FBQ0Y7WUFuR0MsUUFBUSxDQUFDLGFBQWEsQ0FBQyxLQUFLLENBQUMsZUFBZSxHQUFHLFFBQVEs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