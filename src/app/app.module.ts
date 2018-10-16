import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { youTubeSearchInjectables } from "./you-tube-search/you-tube-search.injectables";

import { AppComponent } from './app.component';
import { SimpleHttpComponent } from './simple-http/simple-http.component';
import { YouTubeSearchComponent } from './you-tube-search/you-tube-search.component';

@NgModule({
  declarations: [
    AppComponent,
    SimpleHttpComponent,
    YouTubeSearchComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule
  ],
  providers: [youTubeSearchInjectables],   //dependency injection
  bootstrap: [AppComponent]
})
export class AppModule { }
