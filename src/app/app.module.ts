import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {AppRoutingModule, RoutingModule} from './/app-routing.module';
import { MyFirstRouteComponent } from './component/my-first-route/my-first-route.component';
import { IndexComponent } from './component/index/index.component';
import { NotFoundComponent } from './component/not-found/not-found.component';
import { UserDetailComponent } from './component/user-detail/user-detail.component';
import {HttpClientModule} from '@angular/common/http';
import { CarouselComponent } from './component/pageComponent/carousel/carousel.component';
import { CardComponent } from './component/pageComponent/card/card.component';
import { LoginComponent } from './component/login/login.component';
import { CreateAuctionComponent } from './component/create-auction/create-auction.component';
import { GMapWrapperComponent } from './component/pageComponent/gmap-wrapper/gmap-wrapper.component';
import { AgmCoreModule } from '@agm/core';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { SignUpComponent } from './component/sign-up/sign-up.component';
import { SaleDetailsComponent } from './component/sale-details/sale-details.component';
import {CookieService} from 'ngx-cookie-service';
import { GoogleMapsComponent } from './component/pageComponent/google-maps/google-maps.component';
import { LoadingAnimationComponent } from './component/pageComponent/loading-animation/loading-animation.component';
import { AdminPageComponent } from './component/admin-page/admin-page.component';

@NgModule({
  declarations: [
    AppComponent,
    MyFirstRouteComponent,
    IndexComponent,
    NotFoundComponent,
    UserDetailComponent,
    CarouselComponent,
    CardComponent,
    LoginComponent,
    CreateAuctionComponent,
    GMapWrapperComponent,
    SignUpComponent,
    SaleDetailsComponent,
    GoogleMapsComponent,
    LoadingAnimationComponent,
    AdminPageComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    RoutingModule,
    HttpClientModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyCKY5Y_1R5p8W1KU-KUm2J3k43W4_eWFAk',
      libraries: ['node_modules/@agm'],
    })
  ],
  providers: [
    CookieService
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule { }
