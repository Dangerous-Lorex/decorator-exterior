import { Component, OnInit } from '@angular/core';
import { AdminService } from '../../services/admin/admin.service';
import { CommonService } from '../../services/common/common.service';
import { NgFor } from '@angular/common';
import { NgModule } from '@angular/core';

import { NzInputModule } from 'ng-zorro-antd/input';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { FormsModule } from '@angular/forms';
import { NzTableModule } from 'ng-zorro-antd/table';

interface DataItem {
  _id: string;
  companyName: string;
  appointmentCount: number;
  address: string;
  owners: number;
  decorators: number;
  lastDay: number;
  lastWeek: number;
  lastMonth: number;
}

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  standalone: true,
  imports: [NgFor, NzInputModule, NzIconModule, FormsModule, NzTableModule],
})
export class LandingComponent implements OnInit {
  companyList: any;
  companyforDis: any;
  searchKey: string = '';
  listOfData: DataItem[] = [];

  constructor(
    private adminService: AdminService,
    private commonService: CommonService
  ) {}

  ngOnInit(): void {
    this.adminService.getCompaniesList().subscribe((companyData) => {
      this.companyList = companyData;
      this.companyforDis = this.companyList;

      const now = new Date();
      let weekAgo = new Date();
      let monthAgo = new Date();
      let dayAgo = new Date();
      weekAgo.setDate(now.getDate() - 7);
      monthAgo.setMonth(now.getMonth() - 1);
      dayAgo.setHours(now.getHours() - 24);

      this.listOfData = companyData.map((company: any) => ({
        _id: company._id,
        companyName: company.name || '',
        appointmentCount: 0,
        address: company.location || '',
        owners: 0,
        decorators: 0,
        lastDay: 0,
        lastWeek: 0,
        lastMonth: 0,
      }));

      this.commonService.getAppointmentList().then((data) => {
        this.listOfData.forEach((item, index) => {
          data.homeAppointInfo.forEach((homeJob: any) => {
            if (homeJob.companyId === this.companyList[index]._id) {
              item.appointmentCount++;
              const updatedAt = new Date(homeJob.updatedAt);
              if (updatedAt >= weekAgo && updatedAt <= now) {
                item.lastWeek++;
              }
              if (updatedAt >= monthAgo && updatedAt <= now) {
                item.lastMonth++;
              }
              if (updatedAt >= dayAgo && updatedAt <= now) {
                item.lastDay++;
              }
            }
          });

          data.restAppointInfo.forEach((restJob: any) => {
            if (restJob.companyId === this.companyList[index]._id) {
              item.appointmentCount++;
              const updatedAt = new Date(restJob.updatedAt);
              if (updatedAt >= weekAgo && updatedAt <= now) {
                item.lastWeek++;
              }
              if (updatedAt >= monthAgo && updatedAt <= now) {
                item.lastMonth++;
              }
              if (updatedAt >= dayAgo && updatedAt <= now) {
                item.lastDay++;
              }
            }
          });

          data.decoratorList.map((decorator: any, index: number) => {
            if (decorator.companyId == item._id) {
              item.decorators++;
            }
          });
        });
      });
    });
    console.log(this.listOfData);
  }

  listOfColumn = [
    {
      title: 'Company Name',
      compare: (a: DataItem, b: DataItem) =>
        a.companyName.localeCompare(b.companyName),
      priority: 1,
    },
    {
      title: 'Total Jobs',
      compare: (a: DataItem, b: DataItem) =>
        a.appointmentCount - b.appointmentCount,
      priority: 2,
    },
    {
      title: 'Address',
      compare: (a: DataItem, b: DataItem) => a.address.localeCompare(b.address),
      priority: 3,
    },
    // {
    //   title: 'Owners',
    //   compare: (a: DataItem, b: DataItem) => a.owners - b.owners,
    //   priority: 4,
    // },
    {
      title: 'Decorators',
      compare: (a: DataItem, b: DataItem) => a.decorators - b.decorators,
      priority: 5,
    },
    {
      title: 'Last 24h Jobs',
      compare: (a: DataItem, b: DataItem) => a.lastDay - b.lastDay,
      priority: 6,
    },
    {
      title: 'Last 7d Jobs',
      compare: (a: DataItem, b: DataItem) => a.lastWeek - b.lastWeek,
      priority: 7,
    },
    {
      title: 'Last 30d Jobs',
      compare: (a: DataItem, b: DataItem) => a.lastMonth - b.lastMonth,
      priority: 8,
    },
  ];
}
