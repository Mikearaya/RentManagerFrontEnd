import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { CoreModule } from './modules/core/core.module';
import { SharedModule } from './modules/shared/shared.module';
import { OwnerModule } from './modules/feature/owner/owner.module';
import { CarModule } from './modules/feature/car/car.module';
import { RentModule } from './modules/feature/rent/rent.module';




@NgModule({
  imports: [
    BrowserModule,
    CoreModule,
    SharedModule,
    OwnerModule,
    CarModule,
    RentModule,
    AppRoutingModule
  ],
  declarations: [ AppComponent ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
