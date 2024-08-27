import { Component, OnInit } from '@angular/core';
import { NzTableModule } from 'ng-zorro-antd/table';
import { AdminService } from '../../../services/admin/admin.service';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzModalModule, NzModalRef, NzModalService } from 'ng-zorro-antd/modal';

interface DataItem {
  firstName: string;
  lastName: string;
  userName: string;
  email: string;
  gender: string;
  address: string;
  phoneNumber: string;
  cardType: string;
  cardNumber: string;
}

@Component({
  selector: 'app-view-user',
  templateUrl: './view-user.component.html',
  standalone: true,
  imports: [NzTableModule, NzButtonModule, NzIconModule, NzModalModule],
})
export class ViewUserComponent implements OnInit {
  confirmModal?: NzModalRef;
  constructor(
    private adminService: AdminService,
    private modal: NzModalService
  ) {}

  userList: any;
  ngOnInit(): void {
    this.adminService.getUserList().subscribe((userList) => {
      this.userList = userList;
    });
  }

  showConfirm(userName: string, isDisabled: boolean): void {
    this.confirmModal = this.modal.confirm({
      nzTitle: `Do you Want to change ${userName}'s Permission?`,
      nzContent: '',
      nzOnOk: () => {
        this.adminService
          .permissionUser({ userName, isDisabled })
          .subscribe((value) => {
            this.adminService.getUserList().subscribe((userList) => {
              this.userList = userList;
            });
          });
        new Promise((resolve, reject) => {
          setTimeout(Math.random() > 0.5 ? resolve : reject, 1000);
        }).catch(() => console.log('Oops errors!'));
      },
    });
  }

  userTableHeader = [
    {
      title: 'Full Name',
      compare: (a: DataItem, b: DataItem) =>
        a.firstName.localeCompare(b.firstName),
      priority: false,
    },
    {
      title: 'Username',
      compare: (a: DataItem, b: DataItem) =>
        a.userName.localeCompare(b.userName),
      priority: false,
    },
    {
      title: 'Email',
      compare: (a: DataItem, b: DataItem) => a.email.localeCompare(b.email),
      priority: false,
    },
    {
      title: 'Gender',
      compare: (a: DataItem, b: DataItem) => a.gender.localeCompare(b.gender),
      priority: false,
    },
    {
      title: 'Address',
      compare: (a: DataItem, b: DataItem) => a.address.localeCompare(b.address),
      priority: false,
    },
    {
      title: 'Phone Number',
      compare: (a: DataItem, b: DataItem) =>
        a.phoneNumber.localeCompare(b.phoneNumber),
      priority: false,
    },
    {
      title: 'Card Type',
      compare: (a: DataItem, b: DataItem) =>
        a.cardType.localeCompare(b.cardType),
      priority: false,
    },
    {
      title: 'Card Number',
      compare: (a: DataItem, b: DataItem) =>
        a.cardNumber.localeCompare(b.cardNumber),
      priority: false,
    },
    {
      title: 'Status',
      priority: false,
    },
    {
      title: 'Setting',
    },
  ];
}
