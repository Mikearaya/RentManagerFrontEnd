
import { ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { RentCondition, RentService } from '../rent.service';

@Component({
  selector: 'app-rent-condition-form',
  templateUrl: './rent-condition-form.component.html',
  styleUrls: ['./rent-condition-form.component.css']
})
export class RentConditionFormComponent implements OnInit, OnChanges {
  rentConditionForm: FormGroup;
  private vehicleCondition: RentCondition;
  private isUpdate: Boolean = false;
  @Input('rentId') rentId: number;
  @Input('conditionId') conditionId: number;


  NUMBERS = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20];

  constructor(private formBuilder: FormBuilder,
              private activatedRoute: ActivatedRoute,
              private rentService: RentService) {
                this.generateForm();
               }

  ngOnInit() {
    this.rentId = + this.activatedRoute.snapshot.paramMap.get('rentId');
    this.conditionId = + this.activatedRoute.snapshot.paramMap.get('conditionId');
    if (this.conditionId) {
      this.isUpdate = true;
    }
  }
  ngOnChanges() {

  }

  get vehicleContitionForm() { return this.rentConditionForm.value; }

  generateForm(condition: any = '') {
    this.vehicleCondition = (condition instanceof RentCondition) ? <RentCondition>condition : null;
      this.rentConditionForm = this.formBuilder.group({
        windowController: this.buildControl(condition.window_controller, true),
        seatBelt: this.buildControl(condition.seat_belt, true),
        spareTire: this.buildControl(condition.spare_tire, true),
        wiper: this.buildControl(condition.wiper, true),
        crickWrench: this.buildControl(condition.crick_wrench, true),
        dashboardClose: this.buildControl(condition.dashboard_close, true),
        mudeProtecter: this.buildControl(condition.mude_protecter, true),
        crick: this.buildControl(condition.crick, true),
        spokioOuter: this.buildControl(condition.spokio_outer, true),
        spokioInner: this.buildControl(condition.spokio_inner, true),
        sunVisor: this.buildControl(condition.sun_visor, true),
        matInner: this.buildControl(condition.mat_inner, true),
        windProtecter: this.buildControl(condition.wind_protecter, true),
        blinker: this.buildControl(condition.blinker, true),
        radio: this.buildControl(condition.radio, true),
        fuielLevel: this.buildControl(condition.fuiel_level, true),
        cigaretLighter: this.buildControl(condition.cigaret_lighter, true),
        fuielLid: this.buildControl(condition.fuielLid, true),
        radiatorLid: this.buildControl(condition.radiator_lid, true),
        comment: this.buildControl(condition.comment, true)
      });
  }

  prepareDataModel(form: FormGroup): RentCondition {
    const formModel = form.value;
    const dataModel: RentCondition = {
      CONDITION_ID: this.conditionId,
      RENT_ID: this.rentId,
      window_controller: formModel.windowController,
      seat_belt: formModel.seatBelt,
      spare_tire: formModel.spareTire,
      wiper: formModel.wiper,
      crick_wrench: formModel.crickWrench,
      dashboard_close: formModel.dashboardClose,
      mude_protecter: formModel.mudeProtecter,
      spokio_outer: formModel.spokioOuter,
      spokio_inner: formModel.spokioInner,
      sun_visor: formModel.sunVisor,
      mat_inner: formModel.matInner,
      wind_protecter: formModel.windProtecter,
      blinker: formModel.blinker,
      radio: formModel.radio,
      fuiel_level: formModel.fuielLevel,
      fuiel_lid: formModel.fuielLid,
      radiator_lid: formModel.radiatorLid,
      crick: formModel.crick,
      comment: formModel.comment,
      cigaret_lighter: formModel.cigaretLighter
    };

    return dataModel;
  }

  private buildControl(value = '', required: boolean = false) {
    return (required) ? [value, Validators.required] : value;
  }
  onSubmit() {
    this.vehicleCondition = this.prepareDataModel(this.rentConditionForm);

      if (this.isUpdate) {
      } else {
      }
  }
}
