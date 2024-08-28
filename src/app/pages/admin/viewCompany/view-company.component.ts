import { Component, OnInit } from '@angular/core';
import { NzTableModule } from 'ng-zorro-antd/table';
import { AdminService } from '../../../services/admin/admin.service';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { PlusOutline, MinusOutline } from '@ant-design/icons-angular/icons';
import { NzIconService } from 'ng-zorro-antd/icon';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NgFor } from '@angular/common';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { NzNotificationService } from 'ng-zorro-antd/notification';

interface DataItem {
  name: string;
  location: string;
  serviceList: string;
  locationMap: string;
  recruiters: string;
  decorators: string;
  holidayTerms: string;
}

@Component({
  selector: 'app-view-company',
  templateUrl: './view-company.component.html',
  standalone: true,
  imports: [
    NzTableModule,
    NzButtonModule,
    NzIconModule,
    NzModalModule,
    NzInputModule,
    NgFor,
    NzDatePickerModule,
  ],
})
export class ViewCompanyComponent implements OnInit {
  isVisible = false;
  companyList: any;
  companyInfo: any = {
    name: '',
    location: '',
    serviceList: [],
  };
  serviceList: { type: string; price: number }[] = [
    {
      type: '',
      price: 0,
    },
  ];
  dateRange: any;

  date = null;

  constructor(
    private adminService: AdminService,
    private iconService: NzIconService,
    private notification: NzNotificationService
  ) {
    this.iconService.addIcon(PlusOutline, MinusOutline);
  }

  ngOnInit(): void {
    this.adminService.getCompaniesList().subscribe((companyList) => {
      this.companyList = companyList;
    });
  }

  companyTableHeader = [
    {
      title: 'Name',
      compare: (a: DataItem, b: DataItem) => a.name.localeCompare(b.name),
      priority: false,
    },
    {
      title: 'Location',
      compare: (a: DataItem, b: DataItem) =>
        a.location.localeCompare(b.location),
      priority: false,
    },
    {
      title: 'Setting',
    },
  ];

  addCompanyModal(): void {
    this.isVisible = true;
  }

  createNotification(title: string, content: string): void {
    this.notification.blank(title, content);
  }
  
  companyModalConfirm(): void {
    this.isVisible = false;
    this.companyInfo.serviceList = this.serviceList
    this.adminService.registerCompany(this.companyInfo).then((data) => {
      if(data.status == 200) {
        this.createNotification(
          'Register Success',
          data.message
        );
        this.adminService.getCompaniesList().subscribe((companyList) => {
          this.companyList = companyList;
        });
      }
    })
  }

  addService(): void {
    this.serviceList.push({
      type: '',
      price: 0,
    });
  }

  deleteService(i: number): void {
    this.serviceList.splice(i, 1);
  }

  onChange(event: Event, field: string): void {
    const input = event.target as HTMLInputElement;
    this.companyInfo[field] = input.value;
  }

  onServiceChange(i: number, event: Event, type: string): void {
    const inputElement = event.target as HTMLInputElement;
    const newType = inputElement.value;
    if (type == 'type') {
      if (i >= 0 && i < this.serviceList.length) {
        this.serviceList[i].type = newType; // Update the service type
      }
    } else if (type == 'price') {
      if (i >= 0 && i < this.serviceList.length) {
        this.serviceList[i].price = parseInt(newType); // Update the service type
      }
    }
  }

}
