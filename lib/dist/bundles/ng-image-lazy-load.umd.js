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

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmctaW1hZ2UtbGF6eS1sb2FkLnVtZC5qcy5tYXAiLCJzb3VyY2VzIjpbIm5nOi8vbmctaW1hZ2UtbGF6eS1sb2FkL3NyYy9sYXp5LWxvYWQuZGlyZWN0aXZlLnRzIiwibmc6Ly9uZy1pbWFnZS1sYXp5LWxvYWQvc3JjL2xhenktbG9hZC5tb2R1bGUudHMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgRGlyZWN0aXZlLCBFbGVtZW50UmVmLCBBZnRlclZpZXdJbml0LCBPbkRlc3Ryb3ksIE5nWm9uZSwgUExBVEZPUk1fSUQsIEluamVjdCwgSW5wdXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IGlzUGxhdGZvcm1Ccm93c2VyIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7IFN1YnNjcmlwdGlvbiwgZnJvbUV2ZW50IH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBkZWJvdW5jZVRpbWUgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5cbkBEaXJlY3RpdmUoe1xuICBzZWxlY3RvcjogJ1thcHBMYXp5TG9hZF0nXG59KVxuZXhwb3J0IGNsYXNzIExhenlMb2FkRGlyZWN0aXZlIGltcGxlbWVudHMgQWZ0ZXJWaWV3SW5pdCwgT25EZXN0cm95IHtcblxuICBwcml2YXRlIF9pbnRlcnNlY3Rpb25PYnNlcnZlcj86IEludGVyc2VjdGlvbk9ic2VydmVyO1xuICBwcml2YXRlIF9zY3JvbGxTdWJzY3JpcHRpb24/OiBTdWJzY3JpcHRpb247XG4gIEBJbnB1dCgpIHNyYzogc3RyaW5nOyAgIC8vIFRoZSBpbWFnZSB0byBiZSBsYXp5IGxvYWRlZFxuXG4gIGNvbnN0cnVjdG9yKFxuXG4gICAgcHJpdmF0ZSBfZWxlbWVudDogRWxlbWVudFJlZixcbiAgICBwcml2YXRlIF96b25lOiBOZ1pvbmUsXG4gICAgQEluamVjdChQTEFURk9STV9JRCkgcHJpdmF0ZSBwbGF0Zm9ybUlkOiBPYmplY3RcbiAgKSB7XG4gIH1cblxuICBwdWJsaWMgbmdBZnRlclZpZXdJbml0KCkge1xuICAgIGlmIChpc1BsYXRmb3JtQnJvd3Nlcih0aGlzLnBsYXRmb3JtSWQpKSB7XG4gICAgICB0aGlzLmVuYWJsZUxhenlMb2FkKCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIC8vIHJ1bm5pbmcgb24gc2VydmVyLCBqdXN0IGxvYWQgdGhlIGltYWdlXG4gICAgICB0aGlzLmxvYWQoKTtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIGVuYWJsZUxhenlMb2FkKCkge1xuICAgIC8vIENsaWVudCBvbmx5IGNvZGUuXG4gICAgaWYgKHRoaXMuaGFzQ29tcGF0aWJsZUJyb3dzZXIoKSkge1xuICAgICAgdGhpcy5yZWdpc3RlckludGVyc2VjdGlvbk9ic2VydmVyKCk7XG4gICAgICBpZiAodGhpcy5faW50ZXJzZWN0aW9uT2JzZXJ2ZXIpIHtcbiAgICAgICAgdGhpcy5faW50ZXJzZWN0aW9uT2JzZXJ2ZXIub2JzZXJ2ZSg8RWxlbWVudD4odGhpcy5fZWxlbWVudC5uYXRpdmVFbGVtZW50KSk7XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIC8vIGFkZCBzY3JvbGwgd2F0Y2ggaWYgaW50ZXJzZWN0aW9uIG9ic2VydmVyIGlzIG5vdCBhdmFpbGFibGVcbiAgICAgIHRoaXMuYWRkU2Nyb2xsTGlzdGVuZXJzKCk7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBoYXNDb21wYXRpYmxlQnJvd3NlcigpOiBib29sZWFuIHtcbiAgICBjb25zdCBoYXNJbnRlcnNlY3Rpb25PYnNlcnZlciA9ICdJbnRlcnNlY3Rpb25PYnNlcnZlcicgaW4gd2luZG93O1xuICAgIGNvbnN0IHVzZXJBZ2VudCA9IHdpbmRvdy5uYXZpZ2F0b3IudXNlckFnZW50O1xuICAgIGNvbnN0IG1hdGNoZXMgPSB1c2VyQWdlbnQubWF0Y2goL0VkZ2VcXC8oXFxkKilcXC4vaSk7XG5cbiAgICBjb25zdCBpc0VkZ2UgPSAhIW1hdGNoZXMgJiYgbWF0Y2hlcy5sZW5ndGggPiAxO1xuICAgIGNvbnN0IGlzRWRnZVZlcnNpb24xNk9yQmV0dGVyID0gaXNFZGdlICYmICghIW1hdGNoZXMgJiYgcGFyc2VJbnQobWF0Y2hlc1sxXSwgMTApID4gMTUpO1xuXG4gICAgcmV0dXJuIGhhc0ludGVyc2VjdGlvbk9ic2VydmVyICYmICghaXNFZGdlIHx8IGlzRWRnZVZlcnNpb24xNk9yQmV0dGVyKTtcbiAgfVxuXG4gIHB1YmxpYyBuZ09uRGVzdHJveSgpIHtcbiAgICB0aGlzLnJlbW92ZUxpc3RlbmVycygpO1xuICB9XG4gIHByaXZhdGUgcmVnaXN0ZXJJbnRlcnNlY3Rpb25PYnNlcnZlcigpOiB2b2lkIHtcbiAgICBpZiAoISF0aGlzLl9pbnRlcnNlY3Rpb25PYnNlcnZlcikge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICB0aGlzLl9pbnRlcnNlY3Rpb25PYnNlcnZlciA9IG5ldyBJbnRlcnNlY3Rpb25PYnNlcnZlcihlbnRyaWVzID0+IHtcbiAgICAgIHRoaXMuY2hlY2tGb3JJbnRlcnNlY3Rpb24oZW50cmllcyk7XG4gICAgfSwge30pO1xuICB9XG5cbiAgcHJpdmF0ZSBjaGVja0ZvckludGVyc2VjdGlvbiA9IChlbnRyaWVzOiBBcnJheTxJbnRlcnNlY3Rpb25PYnNlcnZlckVudHJ5PikgPT4ge1xuICAgIGVudHJpZXMuZm9yRWFjaCgoZW50cnk6IEludGVyc2VjdGlvbk9ic2VydmVyRW50cnkpID0+IHtcbiAgICAgIGlmICh0aGlzLmNoZWNrSWZJbnRlcnNlY3RpbmcoZW50cnkpKSB7XG4gICAgICAgIHRoaXMubG9hZCgpO1xuICAgICAgICBpZiAodGhpcy5faW50ZXJzZWN0aW9uT2JzZXJ2ZXIpIHtcbiAgICAgICAgICB0aGlzLl9pbnRlcnNlY3Rpb25PYnNlcnZlci51bm9ic2VydmUoPEVsZW1lbnQ+KHRoaXMuX2VsZW1lbnQubmF0aXZlRWxlbWVudCkpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfSk7XG4gIH1cbiAgcHJpdmF0ZSBjaGVja0lmSW50ZXJzZWN0aW5nKGVudHJ5OiBJbnRlcnNlY3Rpb25PYnNlcnZlckVudHJ5KSB7XG4gICAgLy8gRm9yIFNhbXN1bmcgbmF0aXZlIGJyb3dzZXIsIElPIGhhcyBiZWVuIHBhcnRpYWxseSBpbXBsZW1lbnRlZCB3aGVyZSBieSB0aGVcbiAgICAvLyBjYWxsYmFjayBmaXJlcywgYnV0IGVudHJ5IG9iamVjdCBpcyBlbXB0eS4gV2Ugd2lsbCBjaGVjayBtYW51YWxseS5cbiAgICBpZiAoZW50cnkgJiYgT2JqZWN0LmtleXMoZW50cnkpLmxlbmd0aCkge1xuICAgICAgcmV0dXJuICg8YW55PmVudHJ5KS5pc0ludGVyc2VjdGluZyAmJiBlbnRyeS50YXJnZXQgPT09IHRoaXMuX2VsZW1lbnQubmF0aXZlRWxlbWVudDtcbiAgICB9XG4gICAgcmV0dXJuIHRoaXMuaXNWaXNpYmxlKCk7XG4gIH1cblxuICBwcml2YXRlIGxvYWQoKTogdm9pZCB7XG4gICAgdGhpcy5yZW1vdmVMaXN0ZW5lcnMoKTtcbiAgICAvLyB0aGlzLmRlZmVyTG9hZC5lbWl0KCk7XG4gICAgdGhpcy5fZWxlbWVudC5uYXRpdmVFbGVtZW50LnNyYyA9IHRoaXMuc3JjO1xuICB9XG5cbiAgcHJpdmF0ZSBhZGRTY3JvbGxMaXN0ZW5lcnMoKSB7XG4gICAgaWYgKHRoaXMuaXNWaXNpYmxlKCkpIHtcbiAgICAgIHRoaXMubG9hZCgpO1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICB0aGlzLl96b25lLnJ1bk91dHNpZGVBbmd1bGFyKCgpID0+IHtcbiAgICAgIHRoaXMuX3Njcm9sbFN1YnNjcmlwdGlvbiA9IGZyb21FdmVudCh3aW5kb3csICdzY3JvbGwnKVxuICAgICAgICAucGlwZShkZWJvdW5jZVRpbWUoNTApKVxuICAgICAgICAuc3Vic2NyaWJlKHRoaXMub25TY3JvbGwpO1xuICAgIH0pO1xuICB9XG5cbiAgcHJpdmF0ZSByZW1vdmVMaXN0ZW5lcnMoKSB7XG4gICAgaWYgKHRoaXMuX3Njcm9sbFN1YnNjcmlwdGlvbikge1xuICAgICAgdGhpcy5fc2Nyb2xsU3Vic2NyaXB0aW9uLnVuc3Vic2NyaWJlKCk7XG4gICAgfVxuXG4gICAgaWYgKHRoaXMuX2ludGVyc2VjdGlvbk9ic2VydmVyKSB7XG4gICAgICB0aGlzLl9pbnRlcnNlY3Rpb25PYnNlcnZlci5kaXNjb25uZWN0KCk7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBvblNjcm9sbCA9ICgpID0+IHtcbiAgICBpZiAodGhpcy5pc1Zpc2libGUoKSkge1xuICAgICAgdGhpcy5fem9uZS5ydW4oKCkgPT4gdGhpcy5sb2FkKCkpO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgaXNWaXNpYmxlKCkge1xuICAgIGNvbnN0IHNjcm9sbFBvc2l0aW9uID0gdGhpcy5nZXRTY3JvbGxQb3NpdGlvbigpO1xuICAgIGNvbnN0IGVsZW1lbnRPZmZzZXQgPSB0aGlzLl9lbGVtZW50Lm5hdGl2ZUVsZW1lbnQuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkudG9wO1xuICAgIHJldHVybiBlbGVtZW50T2Zmc2V0IDw9IHNjcm9sbFBvc2l0aW9uO1xuICB9XG5cbiAgcHJpdmF0ZSBnZXRTY3JvbGxQb3NpdGlvbigpIHtcbiAgICAvLyBHZXR0aW5nIHNjcmVlbiBzaXplIGFuZCBzY3JvbGwgcG9zaXRpb24gZm9yIElFXG4gICAgcmV0dXJuICh3aW5kb3cuc2Nyb2xsWSB8fCB3aW5kb3cucGFnZVlPZmZzZXQpXG4gICAgICArIChkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuY2xpZW50SGVpZ2h0IHx8IGRvY3VtZW50LmJvZHkuY2xpZW50SGVpZ2h0KTtcbiAgfVxufVxuIiwiaW1wb3J0IHsgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQgeyBMYXp5TG9hZERpcmVjdGl2ZSB9IGZyb20gJy4vbGF6eS1sb2FkLmRpcmVjdGl2ZSc7XG5cbkBOZ01vZHVsZSh7XG4gIGltcG9ydHM6IFtcbiAgICBDb21tb25Nb2R1bGVcbiAgXSxcbiAgZGVjbGFyYXRpb25zOiBbTGF6eUxvYWREaXJlY3RpdmVdLFxuICBleHBvcnRzOiBbTGF6eUxvYWREaXJlY3RpdmVdXG59KVxuZXhwb3J0IGNsYXNzIExhenlMb2FkTW9kdWxlIHsgfVxuIl0sIm5hbWVzIjpbImlzUGxhdGZvcm1Ccm93c2VyIiwiZnJvbUV2ZW50IiwiZGVib3VuY2VUaW1lIiwiRGlyZWN0aXZlIiwiRWxlbWVudFJlZiIsIk5nWm9uZSIsIkluamVjdCIsIlBMQVRGT1JNX0lEIiwiSW5wdXQiLCJOZ01vZHVsZSIsIkNvbW1vbk1vZHVsZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUFBO1FBY0UsMkJBRVUsVUFDQSxPQUNxQixVQUFrQjtZQUpqRCxpQkFNQztZQUpTLGFBQVEsR0FBUixRQUFRO1lBQ1IsVUFBSyxHQUFMLEtBQUs7WUFDZ0IsZUFBVSxHQUFWLFVBQVUsQ0FBUTt3Q0FpRGxCLFVBQUMsT0FBeUM7Z0JBQ3ZFLE9BQU8sQ0FBQyxPQUFPLENBQUMsVUFBQyxLQUFnQztvQkFDL0MsSUFBSSxLQUFJLENBQUMsbUJBQW1CLENBQUMsS0FBSyxDQUFDLEVBQUU7d0JBQ25DLEtBQUksQ0FBQyxJQUFJLEVBQUUsQ0FBQzt3QkFDWixJQUFJLEtBQUksQ0FBQyxxQkFBcUIsRUFBRTs0QkFDOUIsS0FBSSxDQUFDLHFCQUFxQixDQUFDLFNBQVMsb0JBQVcsS0FBSSxDQUFDLFFBQVEsQ0FBQyxhQUFhLEdBQUUsQ0FBQzt5QkFDOUU7cUJBQ0Y7aUJBQ0YsQ0FBQyxDQUFDO2FBQ0o7NEJBc0NrQjtnQkFDakIsSUFBSSxLQUFJLENBQUMsU0FBUyxFQUFFLEVBQUU7b0JBQ3BCLEtBQUksQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLGNBQU0sT0FBQSxLQUFJLENBQUMsSUFBSSxFQUFFLEdBQUEsQ0FBQyxDQUFDO2lCQUNuQzthQUNGO1NBbEdBOzs7O1FBRU0sMkNBQWU7Ozs7Z0JBQ3BCLElBQUlBLHdCQUFpQixDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsRUFBRTtvQkFDdEMsSUFBSSxDQUFDLGNBQWMsRUFBRSxDQUFDO2lCQUN2Qjtx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