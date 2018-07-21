
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
    public lineChartData2: Array<any> = [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ];
    public lineChartLabels2: Array<any> = ['January', 'February', 'March', 'April', 'May', 'June', 'July',
    'August', 'September', 'October', 'November', 'December'];
    public pieChartType: String = 'pie';

    // Pie
    public pieChartLabels: string[] = ['Remaining', 'Recieved'];
    public pieChartData: number[] = [0, 0];


    public totalCustomers = 0;
    public totalPartners = 0;
    public availableVehicles = 0;
    public rentedVehicles = 0;

       constructor(private dashboardApiService: DashboardApiService) {}

       ngOnInit() {
         this.dashboardApiService.getDashboardNumbers().subscribe((data: any) => this.updateDashoboard(data));
       }

 updateDashoboard(data: any) {
         this.totalCustomers = data.customers.total;
         this.totalPartners = data.partners.total;
         this.availableVehicles = data.vehicles.available;
         this.rentedVehicles = data.vehicles.rented;
        const arr = [
          data.payment.remaining_amount,
          data.payment.paid_amount
        ];
        for ( let i = 0 ; i < data.monthRentCount.length; i++) {
          console.log(data.monthRentCount[i].month);
          this.lineChartData2[data.monthRentCount[i].month] = data.monthRentCount[i].total;
        }
         this.pieChartData = arr;
       }
    public randomize(): void {
      const _lineChartData: Array<any> = new Array(this.lineChartData.length);
      for (let i = 0; i < this.lineChartData.length; i++) {
        _lineChartData[i] = {data: new Array(this.lineChartData[i].data.length), label: this.lineChartData[i].label};
        for (let j = 0; j < this.lineChartData[i].data.length; j++) {
          _lineChartData[i].data[j] = Math.floor((Math.random() * 100) + 1);
        }
      }
      this.lineChartData = _lineChartData;
    }

   // lineChart

  public randomizeType(): void {
    this.lineChartType = this.lineChartType === 'line' ? 'bar' : 'line';
    this.pieChartType = this.pieChartType === 'doughnut' ? 'pie' : 'doughnut';
  }

  public chartClicked(e: any): void {
    console.log(e);
  }

  public chartHovered(e: any): void {
    console.log(e);
  }
  }

