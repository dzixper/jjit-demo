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
import { RouterModule,  Routes } from '@angular/router';
import { PostOfferComponent } from './components/post-offer/post-offer.component';
import { MainOfferPageComponent } from './components/main-offer-page/main-offer-page.component';
import { OffersContentComponent } from './components/offers/offers-content/offers-content.component';
import { PricingComponent } from './components/post-offer/pricing/pricing.component';
import { PostOfferFormComponent } from './components/post-offer/post-offer-form/post-offer-form.component';

const appRoutes: Routes = [
  { path: '', component: MainOfferPageComponent },
  { path: 'post-offer', component: PostOfferComponent },
  { path: 'post-offer-form', component: PostOfferFormComponent }
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
  ],
  imports: [
    BrowserModule,
    MaterialModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
