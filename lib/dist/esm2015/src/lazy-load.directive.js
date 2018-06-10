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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGF6eS1sb2FkLmRpcmVjdGl2ZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25nLWltYWdlLWxhenktbG9hZC8iLCJzb3VyY2VzIjpbInNyYy9sYXp5LWxvYWQuZGlyZWN0aXZlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFFLFVBQVUsRUFBNEIsTUFBTSxFQUFFLFdBQVcsRUFBRSxNQUFNLEVBQUUsS0FBSyxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ3BILE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQ3BELE9BQU8sRUFBZ0IsU0FBUyxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBQy9DLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUs5QyxNQUFNOzs7Ozs7SUFNSixZQUVVLFVBQ0EsT0FDcUIsVUFBa0I7UUFGdkMsYUFBUSxHQUFSLFFBQVE7UUFDUixVQUFLLEdBQUwsS0FBSztRQUNnQixlQUFVLEdBQVYsVUFBVSxDQUFRO29DQWlEbEIsQ0FBQyxPQUF5QyxFQUFFLEVBQUU7WUFDM0UsT0FBTyxDQUFDLE9BQU8sQ0FBQyxDQUFDLEtBQWdDLEVBQUUsRUFBRTtnQkFDbkQsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLG1CQUFtQixDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQztvQkFDcEMsSUFBSSxDQUFDLElBQUksRUFBRSxDQUFDO29CQUNaLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxxQkFBcUIsQ0FBQyxDQUFDLENBQUM7d0JBQy9CLElBQUksQ0FBQyxxQkFBcUIsQ0FBQyxTQUFTLG1CQUFVLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxhQUFhLENBQUMsRUFBQyxDQUFDO3FCQUM5RTtpQkFDRjthQUNGLENBQUMsQ0FBQztTQUNKO3dCQXNDa0IsR0FBRyxFQUFFO1lBQ3RCLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxTQUFTLEVBQUUsQ0FBQyxDQUFD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RGlyZWN0aXZlLCBFbGVtZW50UmVmLCBBZnRlclZpZXdJbml0LCBPbkRlc3Ryb3ksIE5nWm9uZSwgUExBVEZPUk1fSUQsIEluamVjdCwgSW5wdXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IGlzUGxhdGZvcm1Ccm93c2VyIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7IFN1YnNjcmlwdGlvbiwgZnJvbUV2ZW50IH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBkZWJvdW5jZVRpbWUgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5cbkBEaXJlY3RpdmUoe1xuICBzZWxlY3RvcjogJ1thcHBMYXp5TG9hZF0nXG59KVxuZXhwb3J0IGNsYXNzIExhenlMb2FkRGlyZWN0aXZlIGltcGxlbWVudHMgQWZ0ZXJWaWV3SW5pdCwgT25EZXN0cm95IHtcblxuICBwcml2YXRlIF9pbnRlcnNlY3Rpb25PYnNlcnZlcj86IEludGVyc2VjdGlvbk9ic2VydmVyO1xuICBwcml2YXRlIF9zY3JvbGxTdWJzY3JpcHRpb24/OiBTdWJzY3JpcHRpb247XG4gIEBJbnB1dCgpIHNyYzogc3RyaW5nOyAgIC8vIFRoZSBpbWFnZSB0byBiZSBsYXp5IGxvYWRlZFxuXG4gIGNvbnN0cnVjdG9yKFxuXG4gICAgcHJpdmF0ZSBfZWxlbWVudDogRWxlbWVudFJlZixcbiAgICBwcml2YXRlIF96b25lOiBOZ1pvbmUsXG4gICAgQEluamVjdChQTEFURk9STV9JRCkgcHJpdmF0ZSBwbGF0Zm9ybUlkOiBPYmplY3RcbiAgKSB7XG4gIH1cblxuICBwdWJsaWMgbmdBZnRlclZpZXdJbml0KCkge1xuICAgIGlmIChpc1BsYXRmb3JtQnJvd3Nlcih0aGlzLnBsYXRmb3JtSWQpKSB7XG4gICAgICB0aGlzLmVuYWJsZUxhenlMb2FkKCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIC8vIHJ1bm5pbmcgb24gc2VydmVyLCBqdXN0IGxvYWQgdGhlIGltYWdlXG4gICAgICB0aGlzLmxvYWQoKTtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIGVuYWJsZUxhenlMb2FkKCkge1xuICAgIC8vIENsaWVudCBvbmx5IGNvZGUuXG4gICAgaWYgKHRoaXMuaGFzQ29tcGF0aWJsZUJyb3dzZXIoKSkge1xuICAgICAgdGhpcy5yZWdpc3RlckludGVyc2VjdGlvbk9ic2VydmVyKCk7XG4gICAgICBpZiAodGhpcy5faW50ZXJzZWN0aW9uT2JzZXJ2ZXIpIHtcbiAgICAgICAgdGhpcy5faW50ZXJzZWN0aW9uT2JzZXJ2ZXIub2JzZXJ2ZSg8RWxlbWVudD4odGhpcy5fZWxlbWVudC5uYXRpdmVFbGVtZW50KSk7XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIC8vIGFkZCBzY3JvbGwgd2F0Y2ggaWYgaW50ZXJzZWN0aW9uIG9ic2VydmVyIGlzIG5vdCBhdmFpbGFibGVcbiAgICAgIHRoaXMuYWRkU2Nyb2xsTGlzdGVuZXJzKCk7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBoYXNDb21wYXRpYmxlQnJvd3NlcigpOiBib29sZWFuIHtcbiAgICBjb25zdCBoYXNJbnRlcnNlY3Rpb25PYnNlcnZlciA9ICdJbnRlcnNlY3Rpb25PYnNlcnZlcicgaW4gd2luZG93O1xuICAgIGNvbnN0IHVzZXJBZ2VudCA9IHdpbmRvdy5uYXZpZ2F0b3IudXNlckFnZW50O1xuICAgIGNvbnN0IG1hdGNoZXMgPSB1c2VyQWdlbnQubWF0Y2goL0VkZ2VcXC8oXFxkKilcXC4vaSk7XG5cbiAgICBjb25zdCBpc0VkZ2UgPSAhIW1hdGNoZXMgJiYgbWF0Y2hlcy5sZW5ndGggPiAxO1xuICAgIGNvbnN0IGlzRWRnZVZlcnNpb24xNk9yQmV0dGVyID0gaXNFZGdlICYmICghIW1hdGNoZXMgJiYgcGFyc2VJbnQobWF0Y2hlc1sxXSwgMTApID4gMTUpO1xuXG4gICAgcmV0dXJuIGhhc0ludGVyc2VjdGlvbk9ic2VydmVyICYmICghaXNFZGdlIHx8IGlzRWRnZVZlcnNpb24xNk9yQmV0dGVyKTtcbiAgfVxuXG4gIHB1YmxpYyBuZ09uRGVzdHJveSgpIHtcbiAgICB0aGlzLnJlbW92ZUxpc3RlbmVycygpO1xuICB9XG4gIHByaXZhdGUgcmVnaXN0ZXJJbnRlcnNlY3Rpb25PYnNlcnZlcigpOiB2b2lkIHtcbiAgICBpZiAoISF0aGlzLl9pbnRlcnNlY3Rpb25PYnNlcnZlcikge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICB0aGlzLl9pbnRlcnNlY3Rpb25PYnNlcnZlciA9IG5ldyBJbnRlcnNlY3Rpb25PYnNlcnZlcihlbnRyaWVzID0+IHtcbiAgICAgIHRoaXMuY2hlY2tGb3JJbnRlcnNlY3Rpb24oZW50cmllcyk7XG4gICAgfSwge30pO1xuICB9XG5cbiAgcHJpdmF0ZSBjaGVja0ZvckludGVyc2VjdGlvbiA9IChlbnRyaWVzOiBBcnJheTxJbnRlcnNlY3Rpb25PYnNlcnZlckVudHJ5PikgPT4ge1xuICAgIGVudHJpZXMuZm9yRWFjaCgoZW50cnk6IEludGVyc2VjdGlvbk9ic2VydmVyRW50cnkpID0+IHtcbiAgICAgIGlmICh0aGlzLmNoZWNrSWZJbnRlcnNlY3RpbmcoZW50cnkpKSB7XG4gICAgICAgIHRoaXMubG9hZCgpO1xuICAgICAgICBpZiAodGhpcy5faW50ZXJzZWN0aW9uT2JzZXJ2ZXIpIHtcbiAgICAgICAgICB0aGlzLl9pbnRlcnNlY3Rpb25PYnNlcnZlci51bm9ic2VydmUoPEVsZW1lbnQ+KHRoaXMuX2VsZW1lbnQubmF0aXZlRWxlbWVudCkpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfSk7XG4gIH1cbiAgcHJpdmF0ZSBjaGVja0lmSW50ZXJzZWN0aW5nKGVudHJ5OiBJbnRlcnNlY3Rpb25PYnNlcnZlckVudHJ5KSB7XG4gICAgLy8gRm9yIFNhbXN1bmcgbmF0aXZlIGJyb3dzZXIsIElPIGhhcyBiZWVuIHBhcnRpYWxseSBpbXBsZW1lbnRlZCB3aGVyZSBieSB0aGVcbiAgICAvLyBjYWxsYmFjayBmaXJlcywgYnV0IGVudHJ5IG9iamVjdCBpcyBlbXB0eS4gV2Ugd2lsbCBjaGVjayBtYW51YWxseS5cbiAgICBpZiAoZW50cnkgJiYgT2JqZWN0LmtleXMoZW50cnkpLmxlbmd0aCkge1xuICAgICAgcmV0dXJuICg8YW55PmVudHJ5KS5pc0ludGVyc2VjdGluZyAmJiBlbnRyeS50YXJnZXQgPT09IHRoaXMuX2VsZW1lbnQubmF0aXZlRWxlbWVudDtcbiAgICB9XG4gICAgcmV0dXJuIHRoaXMuaXNWaXNpYmxlKCk7XG4gIH1cblxuICBwcml2YXRlIGxvYWQoKTogdm9pZCB7XG4gICAgdGhpcy5yZW1vdmVMaXN0ZW5lcnMoKTtcbiAgICAvLyB0aGlzLmRlZmVyTG9hZC5lbWl0KCk7XG4gICAgdGhpcy5fZWxlbWVudC5uYXRpdmVFbGVtZW50LnNyYyA9IHRoaXMuc3JjO1xuICB9XG5cbiAgcHJpdmF0ZSBhZGRTY3JvbGxMaXN0ZW5lcnMoKSB7XG4gICAgaWYgKHRoaXMuaXNWaXNpYmxlKCkpIHtcbiAgICAgIHRoaXMubG9hZCgpO1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICB0aGlzLl96b25lLnJ1bk91dHNpZGVBbmd1bGFyKCgpID0+IHtcbiAgICAgIHRoaXMuX3Njcm9sbFN1YnNjcmlwdGlvbiA9IGZyb21FdmVudCh3aW5kb3csICdzY3JvbGwnKVxuICAgICAgICAucGlwZShkZWJvdW5jZVRpbWUoNTApKVxuICAgICAgICAuc3Vic2NyaWJlKHRoaXMub25TY3JvbGwpO1xuICAgIH0pO1xuICB9XG5cbiAgcHJpdmF0ZSByZW1vdmVMaXN0ZW5lcnMoKSB7XG4gICAgaWYgKHRoaXMuX3Njcm9sbFN1YnNjcmlwdGlvbikge1xuICAgICAgdGhpcy5fc2Nyb2xsU3Vic2NyaXB0aW9uLnVuc3Vic2NyaWJlKCk7XG4gICAgfVxuXG4gICAgaWYgKHRoaXMuX2ludGVyc2VjdGlvbk9ic2VydmVyKSB7XG4gICAgICB0aGlzLl9pbnRlcnNlY3Rpb25PYnNlcnZlci5kaXNjb25uZWN0KCk7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBvblNjcm9sbCA9ICgpID0+IHtcbiAgICBpZiAodGhpcy5pc1Zpc2libGUoKSkge1xuICAgICAgdGhpcy5fem9uZS5ydW4oKCkgPT4gdGhpcy5sb2FkKCkpO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgaXNWaXNpYmxlKCkge1xuICAgIGNvbnN0IHNjcm9sbFBvc2l0aW9uID0gdGhpcy5nZXRTY3JvbGxQb3NpdGlvbigpO1xuICAgIGNvbnN0IGVsZW1lbnRPZmZzZXQgPSB0aGlzLl9lbGVtZW50Lm5hdGl2ZUVsZW1lbnQuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkudG9wO1xuICAgIHJldHVybiBlbGVtZW50T2Zmc2V0IDw9IHNjcm9sbFBvc2l0aW9uO1xuICB9XG5cbiAgcHJpdmF0ZSBnZXRTY3JvbGxQb3NpdGlvbigpIHtcbiAgICAvLyBHZXR0aW5nIHNjcmVlbiBzaXplIGFuZCBzY3JvbGwgcG9zaXRpb24gZm9yIElFXG4gICAgcmV0dXJuICh3aW5kb3cuc2Nyb2xsWSB8fCB3aW5kb3cucGFnZVlPZmZzZXQpXG4gICAgICArIChkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuY2xpZW50SGVpZ2h0IHx8IGRvY3VtZW50LmJvZHkuY2xpZW50SGVpZ2h0KTtcbiAgfVxufVxuIl19