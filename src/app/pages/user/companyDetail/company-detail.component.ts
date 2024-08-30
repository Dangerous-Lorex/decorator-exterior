import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonService } from '../../../services/common/common.service';
import { NgFor } from '@angular/common';
import { NzTabsModule } from 'ng-zorro-antd/tabs';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzFormModule } from 'ng-zorro-antd/form';
import { ReactiveFormsModule } from '@angular/forms';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { UserService } from '../../../services/user/user.service';
import { AuthService } from '../../../services/auth/auth.service';
import { NzNotificationModule } from 'ng-zorro-antd/notification';
import { NzNotificationService } from 'ng-zorro-antd/notification';

import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  NonNullableFormBuilder,
  ValidatorFn,
  Validators,
  FormsModule,
} from '@angular/forms';

@Component({
  selector: 'app-user-company-detail',
  templateUrl: './company-detail.component.html',
  standalone: true,
  imports: [
    NgFor,
    NzTabsModule,
    NzButtonModule,
    NzInputModule,
    NzFormModule,
    ReactiveFormsModule,
    FormsModule,
    NzDatePickerModule,
    NzNotificationModule,
  ],
})
export class UserCompanyDetailComponent implements OnInit {
  companyId: string | null = null;
  companyInfo: any;
  homeForm!: FormGroup;
  restaurantForm!: FormGroup;
  userInfo: any;

  date = null;

  constructor(
    private route: ActivatedRoute,
    private commonService: CommonService,
    private _formBuilder: FormBuilder,
    private userService: UserService,
    private authService: AuthService,
    private notification: NzNotificationService
  ) {}

  ngOnInit(): void {
    this.authService._userData.subscribe((userData) => {
      this.userInfo = userData;
    });
    this.route.paramMap.subscribe((params) => {
      this.companyId = params.get('id');
    });
    if (this.companyId != null) {
      this.commonService.getCompany(this.companyId).then((data) => {
        this.companyInfo = data.company;
      });
    }
    this.homeForm = this._formBuilder.group({
      arriveDate: ['', [Validators.required]],
      areaSize: ['', [Validators.required]],
      swimmingArea: ['', [Validators.required]],
      greenArea: ['', [Validators.required]],
      loungerArea: ['', [Validators.required]],
      tableArea: ['', [Validators.required]],
      further: [''],
    });
    this.restaurantForm = this._formBuilder.group({
      arriveDate: ['', [Validators.required]],
      areaSize: ['', [Validators.required]],
      fountainArea: ['', [Validators.required]],
      greenArea: ['', [Validators.required]],
      chairCount: ['', [Validators.required]],
      tableCount: ['', [Validators.required]],
      further: [''],
    });
  }

  createNotification(title: string, content: string): void {
    this.notification.blank(title, content).onClick.subscribe(() => {
      console.log('notification clicked!');
    });
  }

  submitHome() {
    if (this.homeForm.valid) {
      const {
        arriveDate,
        areaSize,
        swimmingArea,
        greenArea,
        loungerArea,
        tableArea,
        further,
      } = this.homeForm.value;
      this.userService
        .addHomeAppointment({
          arriveDate,
          areaSize,
          swimmingArea,
          greenArea,
          loungerArea,
          tableArea,
          further,
          id: this.userInfo.id,
          companyId: this.companyId
        })
        .then((data) => {
          if (data.status == 201) {
            this.createNotification('Success', data.message);
            this.homeForm.patchValue({
              arriveDate: '',
              areaSize: '',
              swimmingArea: '',
              greenArea: '',
              loungerArea: '',
              tableArea: '',
              further: '',
            });
          } else {
            this.createNotification(
              'Failed',
              'Something went wrong! Please check your information.'
            );
          }
        });
    } else {
      Object.values(this.homeForm.controls).forEach((control) => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });
    }
  }

  submitRestaurant() {
    if (this.restaurantForm.valid) {
      const {
        arriveDate,
        areaSize,
        fountainArea,
        greenArea,
        chairCount,
        tableCount,
        further,
      } = this.restaurantForm.value;
      this.userService
        .addRestAppointment({
          arriveDate,
          areaSize,
          fountainArea,
          greenArea,
          chairCount,
          tableCount,
          further,
          id: this.userInfo.id,
          companyId: this.companyId
        })
        .then((data) => {
          if (data.status == 201) {
            this.createNotification('Success', data.message);
            this.restaurantForm.patchValue({
              arriveDate: "",
              areaSize: "",
              fountainArea: "",
              greenArea: "",
              chairCount: "",
              tableCount: "",
              further: "",
            });
          } else {
            this.createNotification(
              'Failed',
              'Something went wrong! Please check your information.'
            );
          }
        });
    } else {
      Object.values(this.restaurantForm.controls).forEach((control) => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });
    }
  }
}
