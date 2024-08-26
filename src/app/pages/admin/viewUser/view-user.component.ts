import { Component, OnInit } from '@angular/core';
import { NzTableModule } from 'ng-zorro-antd/table';
import { AdminService } from '../../../services/admin/admin.service';

interface DataItem {
  name: string;
  chinese: number;
  math: number;
  english: number;
}

@Component({
  selector: 'app-view-user',
  templateUrl: './view-user.component.html',
  standalone: true,
  imports: [NzTableModule],
})
export class ViewUserComponent implements OnInit {
  constructor(private adminService: AdminService) {}

  userList: any;
  ngOnInit(): void {
    this.userList = this.adminService.getUser()
    console.log(this.userList);
  }

  userTableHeader = [
    {
      title: 'Full Name',
      compare: (a: DataItem, b: DataItem) => a.name.localeCompare(b.name),
      priority: false,
    },
    {
      title: 'Username',
      compare: (a: DataItem, b: DataItem) => a.name.localeCompare(b.name),
      priority: false,
    },
    {
      title: 'Email',
      compare: (a: DataItem, b: DataItem) => a.name.localeCompare(b.name),
      priority: false,
    },
    {
      title: 'Gender',
      compare: (a: DataItem, b: DataItem) => a.name.localeCompare(b.name),
      priority: false,
    },
    {
      title: 'Address',
      compare: (a: DataItem, b: DataItem) => a.name.localeCompare(b.name),
      priority: false,
    },
    {
      title: 'Phone Number',
      compare: (a: DataItem, b: DataItem) => a.name.localeCompare(b.name),
      priority: false,
    },
    {
      title: 'Card Type',
      compare: (a: DataItem, b: DataItem) => a.name.localeCompare(b.name),
      priority: false,
    },
    {
      title: 'Card Number',
      compare: (a: DataItem, b: DataItem) => a.name.localeCompare(b.name),
      priority: false,
    },
    {
      title: 'Phone Number',
      compare: (a: DataItem, b: DataItem) => a.name.localeCompare(b.name),
      priority: false,
    },
  ];
}
