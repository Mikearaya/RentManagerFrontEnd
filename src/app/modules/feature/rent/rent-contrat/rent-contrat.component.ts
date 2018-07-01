import { RentService } from './../rent.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-rent-contrat',
  templateUrl: './rent-contrat.component.html',
  styleUrls: ['./rent-contrat.component.css']
})
export class RentContratComponent implements OnInit {
  rentId: number;
  rentInfo: any;
  constructor(private rentService: RentService,
              private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.rentId = +this.activatedRoute.snapshot.paramMap.get('rentId');
    if (this.rentId) {
      this.rentInfo = this.rentService.getRentContratData(this.rentId)
                                            .subscribe((data: any) => {this.rentInfo = data; } );
    }
  }

  printContrat() {
    window.print();
  }

}
