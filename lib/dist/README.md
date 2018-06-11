# Introduction

Angular directive to load images lazily. Supports Universal SSR.

It is using Intersection Observer API and falls back to scroll detection for unsuppoted browsers.

## Installation
`npm install ng-image-lazy-load`

```typescript
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { LazyLoadModule } from 'ng-image-lazy-load';
import { AppComponent } from './app.component';
 
@NgModule({
    declarations: [ AppComponent ],
    imports: [ BrowserModule, LazyLoadModule ],
    bootstrap: [ AppComponent ]
})
export class MyAppModule {}
```



## Usage

Add `appLazyLoad` directive to the image and set the source url: `[src]=<path to image>`

```html
<figure>
  <img appLazyLoad [src]="'https://images.unsplash.com/photo-1517867134921-7623876aaaa9?ixlib=rb-0.3.5&s=b5cc7c86ffff07028b46ba92ca7c5897&auto=format&fit=crop&w=2468&q=80'">
  <div>Image by Sebastián León Prado, unsplash</div>
</figure>
```

## Demo

[demo on stackblitz.io](https://angular-jfryyy.stackblitz.io)