
import { Component, OnInit } from '@angular/core';
import { DashboardApiService } from './dashboard-api.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

    // lineChart
    public lineChartLabels: Array<any> = [];
    public lineChartOptions: any = {
      responsive: true,
      title: {
        display: true,
        text: 'Monthly Total Rents'
  }
    };
    public lineChartData2: Array<any> = [ {data : [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ], label: 'Monthly Rent'}];
    public lineChartLabels2: Array<any> = ['January', 'February', 'March', 'April', 'May', 'June', 'July',
    'August', 'September', 'October', 'November', 'December'];
    public pieChartType: String = 'pie';
    public lineChartColors: Array<any> = [
      { // grey
        backgroundColor: 'rgba(148,159,177,0.2)',
        borderColor: 'rgba(148,159,177,1)',
        pointBackgroundColor: 'rgba(148,159,177,1)',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgba(148,159,177,0.8)'
      }
    ];
    // Pie
    public pieChartLabels: string[] = ['Remaining', 'Recieved'];
    public pieChartData: number[] = [0, 0];


    public totalCustomers = 0;
    public totalPartners = 0;
    public availableVehicles = 0;
    public rentedVehicles = 0;
    public todayReturns = 0;
    public weekReturns = 0;

       constructor(private dashboardApiService: DashboardApiService) {}

       ngOnInit() {
         this.dashboardApiService.getDashboardNumbers()
                                .subscribe((data: any) => this.updateDashoboard(data));
       }

 updateDashoboard(data: any) {
         this.totalCustomers = data.customers.total;
         this.totalPartners = data.partners.total;
         this.availableVehicles = data.vehicles.available;
         this.rentedVehicles = data.vehicles.rented;
         this.weekReturns = data.vehicles.this_week_return;
         this.todayReturns = data.vehicles.today_returns;
        const arr = [
          data.payment.remaining_amount,
          data.payment.paid_amount
        ];
        const newData = [{data : [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ], label: 'Monthly Rent'}];
        for ( let i = 0 ; i < data.monthRentCount.length; i++) {
          newData[0].data[data.monthRentCount[i].month] = data.monthRentCount[i].total;
        }
        this.lineChartData2 = newData;
        this.pieChartData = arr;
  }

  public chartClicked(e: any): void {
    console.log(e);
  }

  public chartHovered(e: any): void {
    console.log(e);
  }
  }

