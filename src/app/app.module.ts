import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './components/app-component/app.component';
import { MaterialModule } from './material/material.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NavbarComponent } from './components/navbar/navbar.component';
import { SearchBarComponent } from './components/search-bar/search-bar.component';
import { OffersComponent } from './components/offers/offers.component';
import { MapComponent } from './components/map/map.component';
import { FilterOptionsComponent } from './components/search-bar/filter-options/filter-options.component';
import { RouterModule, Routes } from '@angular/router';
import { PostOfferComponent } from './components/post-offer/post-offer.component';
import { MainOfferPageComponent } from './components/main-offer-page/main-offer-page.component';
import { OffersContentComponent } from './components/offers/offers-content/offers-content.component';
import { PricingComponent } from './components/post-offer/pricing/pricing.component';
import { PostOfferFormComponent } from './components/post-offer/post-offer-form/post-offer-form.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { LoginPageComponent } from './components/login-page/login-page.component';
import { AuthGuard } from './services/auth.guard';
import { TokenInterceptorService } from './services/token-interceptor.service';
import { OfferDetailsComponent } from './components/offers/offer-details/offer-details.component';
import { VerifyOfferComponent } from './components/post-offer/post-offer-form/verify-offer/verify-offer.component';
import { CookieService } from 'ngx-cookie-service';
import { DotLevelComponent } from './components/dot-level/dot-level.component';


const appRoutes: Routes = [
  { path: '', component: MainOfferPageComponent },
  { path: 'post-offer', component: PostOfferComponent },
  { path: 'post-offer-form', component: PostOfferFormComponent, canActivate: [AuthGuard] },
  { path: 'post-offer-form/verify', component: VerifyOfferComponent, canActivate: [AuthGuard] },
  { path: 'login', component: LoginPageComponent },
  { path: 'offer-details', component: OfferDetailsComponent, outlet: 'details' },
  { path: '', component: OffersContentComponent, outlet: 'details' }
];

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    SearchBarComponent,
    OffersComponent,
    MapComponent,
    FilterOptionsComponent,
    PostOfferComponent,
    MainOfferPageComponent,
    OffersContentComponent,
    PricingComponent,
    PostOfferFormComponent,
    LoginPageComponent,
    OfferDetailsComponent,
    VerifyOfferComponent,
    DotLevelComponent,
  ],
  imports: [
    BrowserModule,
    MaterialModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(appRoutes),
    FormsModule,
    HttpClientModule,
  ],
  providers: [AuthGuard, {
    provide: HTTP_INTERCEPTORS,
    useClass: TokenInterceptorService,
    multi: true
  }, CookieService],
  bootstrap: [AppComponent],
})
export class AppModule {}
