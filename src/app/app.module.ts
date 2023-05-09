import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { SearchGiphyComponent } from './components/search-giphy/search-giphy.component';
import { UserImagesComponent } from './components/user-images/user-images.component';

@NgModule({
  declarations: [
    AppComponent,
    SearchGiphyComponent,
    UserImagesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
