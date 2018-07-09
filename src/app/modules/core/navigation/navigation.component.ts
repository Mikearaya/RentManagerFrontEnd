import { Component } from '@angular/core';
import { BreakpointObserver, Breakpoints, BreakpointState } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent {
  naigationList = [
    {path: 'rent/vehicle/', label: 'New Rent', icon: 'fiber_new' },
    {path: 'vehicles/' , label: 'Vehicles', icon: 'directions_car'},
    {path: 'owners/', label: 'Partners', icon: 'contacts'},
    {path: 'customers/', label: 'Customers', icon: 'person_pin'},
    {path: 'rents/', label: 'Rents', icon: 'work'},
    {path: 'employees', label: 'Employees', icon: 'people'}


  ]
  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches)
    );

  constructor(private breakpointObserver: BreakpointObserver) {}
  }
