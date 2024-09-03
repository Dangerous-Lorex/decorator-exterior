import { Component, OnInit } from '@angular/core';

import { UserService } from '../../../services/user/user.service';
import { AuthService } from '../../../services/auth/auth.service';

import { NgFor } from '@angular/common';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzTabsModule } from 'ng-zorro-antd/tabs';
import { NzInputModule } from 'ng-zorro-antd/input';
import { ReactiveFormsModule } from '@angular/forms';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { NgIf } from '@angular/common';

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

interface DataItem {
  id: string;
  companyName: string;
  decoratorId: string;
  status: string;
  workDate: Date;
  areaSize: string;
  poolArea: string;
  greenArea: string;
  loungerArea: string;
  tableArea: string;
  further: string;
  createdAt: Date;
  updatedAt: Date;
  decoratorName: string;
}

@Component({
  selector: 'app-decorator-appointment',
  templateUrl: './appointment.component.html',
  standalone: true,
  imports: [
    NzTableModule,
    NgFor,
    NzButtonModule,
    NzIconModule,
    NzModalModule,
    NzDatePickerModule,
    NzFormModule,
    NzTabsModule,
    NzInputModule,
    ReactiveFormsModule,
    FormsModule,
    NgIf
  ],
})
export class AppointmentComponent implements OnInit {
  userInfo: any;
  homeAppointmentList: any;
  restAppointmentList: any;
  currentAppointment: any;
  isHomeVisible: boolean = false;
  isRestVisible: boolean = false;

  homeForm!: FormGroup;
  restaurantForm!: FormGroup;

  constructor(
    private authService: AuthService,
    private userService: UserService,
    private _formBuilder: FormBuilder,
    private notification: NzNotificationService
  ) {}

  ngOnInit(): void {
    this.authService._userData.subscribe((data) => {
      this.userInfo = data;
    });
    this.userService
      .getAppointments(this.userInfo.id, 'decorator')
      .then((data) => {
        this.homeAppointmentList = data.homeAppointInfo;
        this.restAppointmentList = data.restAppointInfo;
      });
  }

  viewSelectedInfo(item: number, type: string) {
    if (type == 'home') {
      this.homeAppointmentList.map((data: any, index: number) => {
        if (index == item) {
          this.currentAppointment = data;
          this.isHomeVisible = true;
        }
      });
    } else if (type == 'rest') {
      this.restAppointmentList.map((data: any, index: number) => {
        if (index == item) {
          this.currentAppointment = data;
          this.isRestVisible = true;
        }
      });
    }
  }

  createNotification(title: string, content: string): void {
    this.notification.blank(title, content).onClick.subscribe(() => {
    });
  }

  submitHome() {}

  submitRestaurant() {}

  appointmentModalConfirm(type: string, action: string) {
    if (type == 'home') {
      this.userService
        .actionAppointment(
          this.currentAppointment.decoratorId,
          this.currentAppointment._id,
          type,
          action
        )
        .then((data) => {
          if (data.status == 201)
            this.createNotification('Successfully Confirmed', data.message);
          else this.createNotification('Request Failed', data.message);

          this.userService
            .getAppointments(this.userInfo.id, 'decorator')
            .then((data) => {
              this.homeAppointmentList = data.homeAppointInfo;
              this.restAppointmentList = data.restAppointInfo;
            });
          this.isHomeVisible = false;
        });
    } else if (type == 'rest') {
      this.userService
        .actionAppointment(
          this.currentAppointment.decoratorId,
          this.currentAppointment._id,
          type,
          action
        )
        .then((data) => {
          if (data.status == 201)
            this.createNotification('Successfully Confirmed', data.message);
          else this.createNotification('Request Failed', data.message);

          this.userService
            .getAppointments(this.userInfo.id, 'decorator')
            .then((data) => {
              this.homeAppointmentList = data.homeAppointInfo;
              this.restAppointmentList = data.restAppointInfo;
            });
          this.isRestVisible = false;
        });
    }
  }


  appointmentTableHeader = [
    {
      title: 'Company Name',
      compare: (a: DataItem, b: DataItem) =>
        a.companyName.localeCompare(b.companyName),
      priority: false,
    },
    {
      title: 'Decorator',
      compare: (a: DataItem, b: DataItem) =>
        a.decoratorName.localeCompare(b.decoratorName),
      priority: false,
    },
    {
      title: 'Status',
      compare: (a: DataItem, b: DataItem) => a.status.localeCompare(b.status),
      priority: false,
    },
    {
      title: 'CreatedAt',
      compare: (a: DataItem, b: DataItem) =>
        a.createdAt.getTime() - b.createdAt.getTime(),
      priority: false,
    },
    {
      title: 'UpdatedAt',
      compare: (a: DataItem, b: DataItem) =>
        a.updatedAt.getTime() - b.updatedAt.getTime(),
      priority: false,
    },
    {
      title: 'Setting',
    },
  ];
}
