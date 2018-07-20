
import { Component, OnInit } from '@angular/core';
import { DashboardApiService } from './dashboard-api.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  cards = [
    { title: 'Card 1', cols: 2, rows: 1 },
    { title: 'Card 2', cols: 1, rows: 1 },
    { title: 'Card 3', cols: 1, rows: 2 },
    { title: 'Card 4', cols: 2, rows: 1 }
  ];


    // lineChart
    public lineChartData: Array<any> = [
      {data: [65, 59, 80, 81, 56, 55, 40], label: 'Series A'},
      {data: [28, 48, 40, 19, 86, 27, 90], label: 'Series B'},
      {data: [18, 48, 77, 9, 100, 27, 40], label: 'Series C'}
    ];
    public lineChartLabels: Array<any> = [];
    public lineChartOptions: any = {
      responsive: true,
      title: {
        display: true,
        text: 'Custom Chart Title'
  }
    };
    public lineChartData2: Array<any> = [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ];
    public lineChartLabels2: Array<any> = ['January', 'February', 'March', 'April', 'May', 'June', 'July',
    'August', 'September', 'October', 'November', 'December'];
    public lineChartType: String = 'line';
    public pieChartType: String = 'pie';

    // Pie
    public pieChartLabels: string[] = ['Total Payments', 'Remaining', 'Recieved'];
    public pieChartData: number[] = [0, 0, 0];

    public lineChartColors: Array<any> = [
      { // grey
        backgroundColor: 'rgba(148,159,177,0.2)',
        borderColor: 'rgba(148,159,177,1)',
        pointBackgroundColor: 'rgba(148,159,177,1)',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgba(148,159,177,0.8)'
      },
      { // dark grey
        backgroundColor: 'rgba(77,83,96,0.2)',
        borderColor: 'rgba(77,83,96,1)',
        pointBackgroundColor: 'rgba(77,83,96,1)',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgba(77,83,96,1)'
      },
      { // grey
        backgroundColor: 'rgba(148,159,177,0.2)',
        borderColor: 'rgba(148,159,177,1)',
        pointBackgroundColor: 'rgba(148,159,177,1)',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgba(148,159,177,0.8)'
      }
    ];
    public lineChartLegend = true;
    public lineChartType2 = 'line';
    public totalCustomers = 0;
    public totalPartners = 0;
    public availableVehicles = 0;
    public rentdVehicles = 0;

       constructor(private dashboardApiService: DashboardApiService) {}

       ngOnInit() {
         this.dashboardApiService.getDashboardNumbers().subscribe((data: any) => this.updateDashoboard(data));
       }

 updateDashoboard(data: any) {
         this.totalCustomers = data.customers.total;
         this.totalPartners = data.partners.total;
         this.availableVehicles = data.vehicles.available;
         this.rentdVehicles = data.vehicles.rented;
        const arr = [
          data.payment.total_amount,
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

