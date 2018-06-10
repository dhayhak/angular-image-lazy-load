import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { LazyLoadModule } from 'ng-image-lazy-load';
@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    LazyLoadModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
