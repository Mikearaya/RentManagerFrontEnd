import { EmployeeModule } from './modules/feature/employee/employee.module';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { CoreModule } from './modules/core/core.module';
import { SharedModule } from './modules/shared/shared.module';
import { FeatureModule } from './modules/feature/feature.module';
import { MatTableModule, MatPaginatorModule, MatSortModule} from '@angular/material';




@NgModule({
  imports: [
    BrowserModule,
    CoreModule,
    SharedModule,
    FeatureModule,
    AppRoutingModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
  ],
  declarations: [ AppComponent],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
