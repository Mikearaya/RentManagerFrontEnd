import { HttpErrorResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { RentService } from '../rent.service';

@Component({
  selector: 'app-rent-detail-view',
  templateUrl: './rent-detail-view.component.html',
  styleUrls: ['./rent-detail-view.component.css']
})
export class RentDetailViewComponent implements OnInit {
private rentId: number;
currentRent: any;
  constructor(private rentService: RentService,
              private activatedRoute: ActivatedRoute ) { }


  ngOnInit() {
    this.rentId = + this.activatedRoute.snapshot.paramMap.get('rentId');
    this.rentService.getRentContratData(this.rentId)
                                .subscribe((data: any) => this.currentRent = data ,
                                            (error: HttpErrorResponse) => console.log(error));

  }

}
