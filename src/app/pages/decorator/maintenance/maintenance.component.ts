import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../services/auth/auth.service';
import { CommonService } from '../../../services/common/common.service';

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
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';
import { NgIf } from '@angular/common';

import {
  FormBuilder,
  FormGroup,
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
  maintenance: string;
}

@Component({
  selector: 'app-decorator-maintenance',
  templateUrl: './maintenance.component.html',
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
    NzToolTipModule,
    NgIf,
  ],
})
export class MaintenanceComponent implements OnInit {
  userInfo: any;
  homeAppointmentList: any;
  restAppointmentList: any;
  currentAppointment: any;
  isHomeVisible: boolean = false;
  isRestVisible: boolean = false;

  homeForm!: FormGroup;
  restaurantForm!: FormGroup;

  isConfirmButtonDisabled: boolean = true;
  constructor(
    private authService: AuthService,
    private _formBuilder: FormBuilder,
    private commonService: CommonService
  ) {}

  ngOnInit(): void {
    this.homeForm = this._formBuilder.group({
      arriveDate: [{ value: '', disabled: true }, [Validators.required]],
      areaSize: [{ value: '', disabled: true }, [Validators.required]],
      swimmingArea: [{ value: '', disabled: true }, [Validators.required]],
      greenArea: [{ value: '', disabled: true }, [Validators.required]],
      loungerArea: [{ value: '', disabled: true }, [Validators.required]],
      tableArea: [{ value: '', disabled: true }, [Validators.required]],
      further: [{ value: '', disabled: true }],
    });
    this.restaurantForm = this._formBuilder.group({
      arriveDate: [{ value: '', disabled: true }, [Validators.required]],
      areaSize: [{ value: '', disabled: true }, [Validators.required]],
      fountainArea: [{ value: '', disabled: true }, [Validators.required]],
      greenArea: [{ value: '', disabled: true }, [Validators.required]],
      chairCount: [{ value: '', disabled: true }, [Validators.required]],
      tableCount: [{ value: '', disabled: true }, [Validators.required]],
      further: [{ value: '', disabled: true }],
    });

    this.authService._userData.subscribe((data) => {
      this.userInfo = data;
    });
    this.commonService
      .getMaintenanceList(this.userInfo.id, 'decorator')
      .then((data) => {
        this.homeAppointmentList = data.homeAppointInfo;
        this.restAppointmentList = data.restAppointInfo;
      });
  }

  calculateMonthsDifference(startDate: Date, endDate: Date): number {
    const yearsDifference = endDate.getFullYear() - startDate.getFullYear();
    const monthsDifference = endDate.getMonth() - startDate.getMonth();
    return yearsDifference * 12 + monthsDifference;
  }

  viewSelectedInfo(item: number, type: string) {
    if (type == 'home') {
      this.homeAppointmentList.map((data: any, index: number) => {
        if (index == item) {
          this.currentAppointment = data;
          this.isHomeVisible = true;

          this.homeForm.patchValue({
            arriveDate: new Date(this.currentAppointment.workDate),
            areaSize: this.currentAppointment.areaSize,
            swimmingArea: this.currentAppointment.poolArea,
            greenArea: this.currentAppointment.greenArea,
            loungerArea: this.currentAppointment.loungerArea,
            tableArea: this.currentAppointment.tableArea,
            further: this.currentAppointment.further,
          });

          const updatedAt = new Date(this.currentAppointment.updatedAt);
          const monthsDifference = this.calculateMonthsDifference(
            updatedAt,
            new Date()
          );

          this.isConfirmButtonDisabled = monthsDifference <= -1;
        }
      });
    } else if (type == 'rest') {
      this.restAppointmentList.map((data: any, index: number) => {
        if (index == item) {
          this.currentAppointment = data;
          this.isRestVisible = true;

          this.restaurantForm.patchValue({
            arriveDate: this.currentAppointment.workDate,
            areaSize: this.currentAppointment.areaSize,
            fountainArea: this.currentAppointment.fountainArea,
            greenArea: this.currentAppointment.greenArea,
            chairCount: this.currentAppointment.chairCount,
            tableCount: this.currentAppointment.tableCount,
            further: this.currentAppointment.further,
          });
          const updatedAt = new Date(this.currentAppointment.updatedAt);
          const monthsDifference = this.calculateMonthsDifference(
            updatedAt,
            new Date()
          );

          this.isConfirmButtonDisabled = monthsDifference <= -1;
        }
      });
    }
  }

  submitHome() {}

  submitRestaurant() {}

  appointmentModalConfirm(action: string) {
    this.commonService
      .actionMaintenance(
        this.userInfo.id,
        this.currentAppointment._id,
        'decorator',
        action
      )
      .then((data) => {
        if (data.status == 200) {
          this.commonService
            .getMaintenanceList(this.userInfo.id, 'decorator')
            .then((data) => {
              this.homeAppointmentList = data.homeAppointInfo;
              this.restAppointmentList = data.restAppointInfo;
            });
        }
        this.isHomeVisible = false
        this.isRestVisible = false
      });
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
      title: 'Decorate Status',
      compare: (a: DataItem, b: DataItem) => a.status.localeCompare(b.status),
      priority: false,
    },
    {
      title: 'Maintenace Status',
      compare: (a: DataItem, b: DataItem) => a.maintenance.localeCompare(b.maintenance),
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
