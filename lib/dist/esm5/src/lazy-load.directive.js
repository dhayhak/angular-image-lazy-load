/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { Directive, ElementRef, NgZone, PLATFORM_ID, Inject, Input } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { fromEvent } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
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
export { LazyLoadDirective };
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGF6eS1sb2FkLmRpcmVjdGl2ZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25nLWltYWdlLWxhenktbG9hZC8iLCJzb3VyY2VzIjpbInNyYy9sYXp5LWxvYWQuZGlyZWN0aXZlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFFLFVBQVUsRUFBNEIsTUFBTSxFQUFFLFdBQVcsRUFBRSxNQUFNLEVBQUUsS0FBSyxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ3BILE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQ3BELE9BQU8sRUFBZ0IsU0FBUyxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBQy9DLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQzs7SUFXNUMsMkJBRVUsVUFDQSxPQUNxQixVQUFrQjtRQUpqRCxpQkFPQztRQUxTLGFBQVEsR0FBUixRQUFRO1FBQ1IsVUFBSyxHQUFMLEtBQUs7UUFDZ0IsZUFBVSxHQUFWLFVBQVUsQ0FBUTtvQ0FrRGxCLFVBQUMsT0FBeUM7WUFDdkUsT0FBTyxDQUFDLE9BQU8sQ0FBQyxVQUFDLEtBQWdDO2dCQUMvQyxFQUFFLENBQUMsQ0FBQyxLQUFJLENBQUMsbUJBQW1CLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDO29CQUNwQyxLQUFJLENBQUMsSUFBSSxFQUFFLENBQUM7b0JBQ1osRUFBRSxDQUFDLENBQUMsS0FBSSxDQUFDLHFCQUFxQixDQUFDLENBQUMsQ0FBQzt3QkFDL0IsS0FBSSxDQUFDLHFCQUFxQixDQUFDLFNBQVMsbUJBQVUsQ0FBQyxLQUFJLENBQUMsUUFBUSxDQUFDLGFBQWEsQ0FBQyxFQUFDLENBQUM7cUJBQzlFO2lCQUNGO2FBQ0YsQ0FBQyxDQUFDO1NBQ0o7d0JBc0NrQjtZQUNqQixFQUFFLENBQUMsQ0FBQyxLQUFJLENBQUMsU0FBUyxFQUFFLENBQUMsQ0FBQyxDQUFDO2dCQUNyQixLQUFJLENBQUMsS0FBSyxDQUFD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LE1BQU0sU0FBQyxXQUFXOzs7c0JBTnBCLEtBQUs7OzRCQVpSOztTQVFhLGlCQUFpQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IERpcmVjdGl2ZSwgRWxlbWVudFJlZiwgQWZ0ZXJWaWV3SW5pdCwgT25EZXN0cm95LCBOZ1pvbmUsIFBMQVRGT1JNX0lELCBJbmplY3QsIElucHV0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBpc1BsYXRmb3JtQnJvd3NlciB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQgeyBTdWJzY3JpcHRpb24sIGZyb21FdmVudCB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgZGVib3VuY2VUaW1lIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuXG5ARGlyZWN0aXZlKHtcbiAgc2VsZWN0b3I6ICdbYXBwTGF6eUxvYWRdJ1xufSlcbmV4cG9ydCBjbGFzcyBMYXp5TG9hZERpcmVjdGl2ZSBpbXBsZW1lbnRzIEFmdGVyVmlld0luaXQsIE9uRGVzdHJveSB7XG5cbiAgcHJpdmF0ZSBfaW50ZXJzZWN0aW9uT2JzZXJ2ZXI/OiBJbnRlcnNlY3Rpb25PYnNlcnZlcjtcbiAgcHJpdmF0ZSBfc2Nyb2xsU3Vic2NyaXB0aW9uPzogU3Vic2NyaXB0aW9uO1xuICBASW5wdXQoKSBzcmM6IHN0cmluZzsgICAvLyBUaGUgaW1hZ2UgdG8gYmUgbGF6eSBsb2FkZWRcblxuICBjb25zdHJ1Y3RvcihcblxuICAgIHByaXZhdGUgX2VsZW1lbnQ6IEVsZW1lbnRSZWYsXG4gICAgcHJpdmF0ZSBfem9uZTogTmdab25lLFxuICAgIEBJbmplY3QoUExBVEZPUk1fSUQpIHByaXZhdGUgcGxhdGZvcm1JZDogT2JqZWN0XG4gICkge1xuICAgIF9lbGVtZW50Lm5hdGl2ZUVsZW1lbnQuc3R5bGUuYmFja2dyb3VuZENvbG9yID0gJ3llbGxvdyc7XG4gIH1cblxuICBwdWJsaWMgbmdBZnRlclZpZXdJbml0KCkge1xuICAgIGlmIChpc1BsYXRmb3JtQnJvd3Nlcih0aGlzLnBsYXRmb3JtSWQpKSB7XG4gICAgICB0aGlzLmVuYWJsZUxhenlMb2FkKCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIC8vIHJ1bm5pbmcgb24gc2VydmVyLCBqdXN0IGxvYWQgdGhlIGltYWdlXG4gICAgICB0aGlzLmxvYWQoKTtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIGVuYWJsZUxhenlMb2FkKCkge1xuICAgIC8vIENsaWVudCBvbmx5IGNvZGUuXG4gICAgaWYgKHRoaXMuaGFzQ29tcGF0aWJsZUJyb3dzZXIoKSkge1xuICAgICAgdGhpcy5yZWdpc3RlckludGVyc2VjdGlvbk9ic2VydmVyKCk7XG4gICAgICBpZiAodGhpcy5faW50ZXJzZWN0aW9uT2JzZXJ2ZXIpIHtcbiAgICAgICAgdGhpcy5faW50ZXJzZWN0aW9uT2JzZXJ2ZXIub2JzZXJ2ZSg8RWxlbWVudD4odGhpcy5fZWxlbWVudC5uYXRpdmVFbGVtZW50KSk7XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIC8vIGFkZCBzY3JvbGwgd2F0Y2ggaWYgaW50ZXJzZWN0aW9uIG9ic2VydmVyIGlzIG5vdCBhdmFpbGFibGVcbiAgICAgIHRoaXMuYWRkU2Nyb2xsTGlzdGVuZXJzKCk7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBoYXNDb21wYXRpYmxlQnJvd3NlcigpOiBib29sZWFuIHtcbiAgICBjb25zdCBoYXNJbnRlcnNlY3Rpb25PYnNlcnZlciA9ICdJbnRlcnNlY3Rpb25PYnNlcnZlcicgaW4gd2luZG93O1xuICAgIGNvbnN0IHVzZXJBZ2VudCA9IHdpbmRvdy5uYXZpZ2F0b3IudXNlckFnZW50O1xuICAgIGNvbnN0IG1hdGNoZXMgPSB1c2VyQWdlbnQubWF0Y2goL0VkZ2VcXC8oXFxkKilcXC4vaSk7XG5cbiAgICBjb25zdCBpc0VkZ2UgPSAhIW1hdGNoZXMgJiYgbWF0Y2hlcy5sZW5ndGggPiAxO1xuICAgIGNvbnN0IGlzRWRnZVZlcnNpb24xNk9yQmV0dGVyID0gaXNFZGdlICYmICghIW1hdGNoZXMgJiYgcGFyc2VJbnQobWF0Y2hlc1sxXSwgMTApID4gMTUpO1xuXG4gICAgcmV0dXJuIGhhc0ludGVyc2VjdGlvbk9ic2VydmVyICYmICghaXNFZGdlIHx8IGlzRWRnZVZlcnNpb24xNk9yQmV0dGVyKTtcbiAgfVxuXG4gIHB1YmxpYyBuZ09uRGVzdHJveSgpIHtcbiAgICB0aGlzLnJlbW92ZUxpc3RlbmVycygpO1xuICB9XG4gIHByaXZhdGUgcmVnaXN0ZXJJbnRlcnNlY3Rpb25PYnNlcnZlcigpOiB2b2lkIHtcbiAgICBpZiAoISF0aGlzLl9pbnRlcnNlY3Rpb25PYnNlcnZlcikge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICB0aGlzLl9pbnRlcnNlY3Rpb25PYnNlcnZlciA9IG5ldyBJbnRlcnNlY3Rpb25PYnNlcnZlcihlbnRyaWVzID0+IHtcbiAgICAgIHRoaXMuY2hlY2tGb3JJbnRlcnNlY3Rpb24oZW50cmllcyk7XG4gICAgfSwge30pO1xuICB9XG5cbiAgcHJpdmF0ZSBjaGVja0ZvckludGVyc2VjdGlvbiA9IChlbnRyaWVzOiBBcnJheTxJbnRlcnNlY3Rpb25PYnNlcnZlckVudHJ5PikgPT4ge1xuICAgIGVudHJpZXMuZm9yRWFjaCgoZW50cnk6IEludGVyc2VjdGlvbk9ic2VydmVyRW50cnkpID0+IHtcbiAgICAgIGlmICh0aGlzLmNoZWNrSWZJbnRlcnNlY3RpbmcoZW50cnkpKSB7XG4gICAgICAgIHRoaXMubG9hZCgpO1xuICAgICAgICBpZiAodGhpcy5faW50ZXJzZWN0aW9uT2JzZXJ2ZXIpIHtcbiAgICAgICAgICB0aGlzLl9pbnRlcnNlY3Rpb25PYnNlcnZlci51bm9ic2VydmUoPEVsZW1lbnQ+KHRoaXMuX2VsZW1lbnQubmF0aXZlRWxlbWVudCkpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfSk7XG4gIH1cbiAgcHJpdmF0ZSBjaGVja0lmSW50ZXJzZWN0aW5nKGVudHJ5OiBJbnRlcnNlY3Rpb25PYnNlcnZlckVudHJ5KSB7XG4gICAgLy8gRm9yIFNhbXN1bmcgbmF0aXZlIGJyb3dzZXIsIElPIGhhcyBiZWVuIHBhcnRpYWxseSBpbXBsZW1lbnRlZCB3aGVyZSBieSB0aGVcbiAgICAvLyBjYWxsYmFjayBmaXJlcywgYnV0IGVudHJ5IG9iamVjdCBpcyBlbXB0eS4gV2Ugd2lsbCBjaGVjayBtYW51YWxseS5cbiAgICBpZiAoZW50cnkgJiYgT2JqZWN0LmtleXMoZW50cnkpLmxlbmd0aCkge1xuICAgICAgcmV0dXJuICg8YW55PmVudHJ5KS5pc0ludGVyc2VjdGluZyAmJiBlbnRyeS50YXJnZXQgPT09IHRoaXMuX2VsZW1lbnQubmF0aXZlRWxlbWVudDtcbiAgICB9XG4gICAgcmV0dXJuIHRoaXMuaXNWaXNpYmxlKCk7XG4gIH1cblxuICBwcml2YXRlIGxvYWQoKTogdm9pZCB7XG4gICAgdGhpcy5yZW1vdmVMaXN0ZW5lcnMoKTtcbiAgICAvLyB0aGlzLmRlZmVyTG9hZC5lbWl0KCk7XG4gICAgdGhpcy5fZWxlbWVudC5uYXRpdmVFbGVtZW50LnNyYyA9IHRoaXMuc3JjO1xuICB9XG5cbiAgcHJpdmF0ZSBhZGRTY3JvbGxMaXN0ZW5lcnMoKSB7XG4gICAgaWYgKHRoaXMuaXNWaXNpYmxlKCkpIHtcbiAgICAgIHRoaXMubG9hZCgpO1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICB0aGlzLl96b25lLnJ1bk91dHNpZGVBbmd1bGFyKCgpID0+IHtcbiAgICAgIHRoaXMuX3Njcm9sbFN1YnNjcmlwdGlvbiA9IGZyb21FdmVudCh3aW5kb3csICdzY3JvbGwnKVxuICAgICAgICAucGlwZShkZWJvdW5jZVRpbWUoNTApKVxuICAgICAgICAuc3Vic2NyaWJlKHRoaXMub25TY3JvbGwpO1xuICAgIH0pO1xuICB9XG5cbiAgcHJpdmF0ZSByZW1vdmVMaXN0ZW5lcnMoKSB7XG4gICAgaWYgKHRoaXMuX3Njcm9sbFN1YnNjcmlwdGlvbikge1xuICAgICAgdGhpcy5fc2Nyb2xsU3Vic2NyaXB0aW9uLnVuc3Vic2NyaWJlKCk7XG4gICAgfVxuXG4gICAgaWYgKHRoaXMuX2ludGVyc2VjdGlvbk9ic2VydmVyKSB7XG4gICAgICB0aGlzLl9pbnRlcnNlY3Rpb25PYnNlcnZlci5kaXNjb25uZWN0KCk7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBvblNjcm9sbCA9ICgpID0+IHtcbiAgICBpZiAodGhpcy5pc1Zpc2libGUoKSkge1xuICAgICAgdGhpcy5fem9uZS5ydW4oKCkgPT4gdGhpcy5sb2FkKCkpO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgaXNWaXNpYmxlKCkge1xuICAgIGNvbnN0IHNjcm9sbFBvc2l0aW9uID0gdGhpcy5nZXRTY3JvbGxQb3NpdGlvbigpO1xuICAgIGNvbnN0IGVsZW1lbnRPZmZzZXQgPSB0aGlzLl9lbGVtZW50Lm5hdGl2ZUVsZW1lbnQuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkudG9wO1xuICAgIHJldHVybiBlbGVtZW50T2Zmc2V0IDw9IHNjcm9sbFBvc2l0aW9uO1xuICB9XG5cbiAgcHJpdmF0ZSBnZXRTY3JvbGxQb3NpdGlvbigpIHtcbiAgICAvLyBHZXR0aW5nIHNjcmVlbiBzaXplIGFuZCBzY3JvbGwgcG9zaXRpb24gZm9yIElFXG4gICAgcmV0dXJuICh3aW5kb3cuc2Nyb2xsWSB8fCB3aW5kb3cucGFnZVlPZmZzZXQpXG4gICAgICArIChkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuY2xpZW50SGVpZ2h0IHx8IGRvY3VtZW50LmJvZHkuY2xpZW50SGVpZ2h0KTtcbiAgfVxufVxuIl19