import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { AppComponent } from './app.component';
import { NavigationComponent } from './components/navigation/navigation.component';

import { MatToolbarModule, MatButtonModule, MatSidenavModule, MatIconModule, MatListModule, MatGridListModule,
  MatCardModule, MatMenuModule} from '@angular/material';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { LayoutModule } from '@angular/cdk/layout';
import { OwnerModule } from './modules/owner/owner.module';
import { CarModule } from './modules/car/car.module';
import { AppRoutingModule } from './app-routing.module';

@NgModule({
  imports: [
    BrowserModule,
    OwnerModule,
    CarModule,
    LayoutModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatGridListModule,
    MatCardModule,
    MatMenuModule,
    AppRoutingModule

  ],
  declarations: [
    AppComponent,
    NavigationComponent,
    DashboardComponent
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
