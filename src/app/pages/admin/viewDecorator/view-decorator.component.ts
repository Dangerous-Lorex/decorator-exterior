import { Component, OnInit, OnChanges } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzIconModule, NzIconService } from 'ng-zorro-antd/icon';
import { PlusOutline } from '@ant-design/icons-angular/icons';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { AdminService } from '../../../services/admin/admin.service';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NgIf } from '@angular/common';

interface DataItem {
  firstName: string;
  lastName: string;
  userName: string;
  email: string;
  address: string;
  phoneNumber: string;
  isDisabled: boolean;
}

@Component({
  selector: 'app-view-decorator',
  templateUrl: './view-decorator.component.html',
  standalone: true,
  imports: [
    NzButtonModule,
    NzIconModule,
    NzModalModule,
    NzInputModule,
    NzFormModule,
    FormsModule,
    ReactiveFormsModule,
    NzTableModule,
    NgIf,
  ],
})
export class ViewDecoratorComponent implements OnInit {
  registerForm: FormGroup;

  isVisible = false;

  decoratorList: any;
  userData: any = null;
  constructor(
    private iconService: NzIconService,
    private readonly _formBuilder: FormBuilder,
    private notification: NzNotificationService,
    private adminService: AdminService
  ) {
    this.iconService.addIcon(PlusOutline);
    this.registerForm = this._formBuilder.group({
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      userName: [
        { value: '', disabled: this.userData != null },
        [Validators.required],
      ],
      email: ['', [Validators.required, Validators.email]],
      address: ['', [Validators.required]],
      phoneNumber: ['', [Validators.required]],
      password: ['', [Validators.required]],
      confirmPassword: ['', [Validators.required]],
    });
  }

  ngOnInit(): void {
    this.adminService.getDecoratorList().subscribe((list) => {
      this.decoratorList = list;
    });
  }

  addDecoratorModal(userName: any): void {
    this.userData = null;
    if (userName != null) {
      this.decoratorList?.map((decorator: any, index: number) => {
        if (decorator.userName == userName) {
          this.userData = decorator;

          this.registerForm.patchValue({
            firstName: this.userData.firstName,
            lastName: this.userData.lastName,
            userName: this.userData.userName,
            email: this.userData.email,
            address: this.userData.address,
            phoneNumber: this.userData.phoneNumber,
            password: '',
            confirmPassword: '',
          });
          this.registerForm.get('password')?.disable();
          this.registerForm.get('confirmPassword')?.disable();
        }
      });
    } else {
      this.registerForm.patchValue({
        firstName: '',
        lastName: '',
        userName: '',
        email: '',
        address: '',
        phoneNumber: '',
        password: '',
        confirmPassword: '',
      });
    }

    this.isVisible = true;
  }

  invisibleModal() {
    this.isVisible = false;
    this.userData = null;
  }
  decoratorModalConfirm(): void {
    this.isVisible = false;
    this.userData = null;
  }

  get f() {
    return this.registerForm.controls;
  }

  updateConfirmValidator(): void {
    Promise.resolve().then(() =>
      this.registerForm.get('confirmPassword')?.updateValueAndValidity()
    );
  }

  createAuthNotification(
    title: string,
    message: string,
    titleColor: string
  ): void {
    this.notification.blank(
      `<span class="${titleColor}">Register ${title}</span>`,
      message
    );
  }

  onRegisterSubmit(requestType: string) {
    const {
      firstName,
      lastName,
      userName,
      email,
      address,
      phoneNumber,
      password,
    } = this.registerForm.value;
    if (firstName && lastName && userName && email && address && phoneNumber) {
      const userInfo = {
        firstName,
        lastName,
        userName,
        email,
        address,
        phoneNumber,
        password,
      };
      if (requestType == 'register') {
        this.adminService.registerDecorator(userInfo).subscribe((value) => {
          this.createAuthNotification(
            'Success',
            value.message,
            'text-green-500'
          );
        });
      } else if (requestType == 'update') {
        this.adminService
          .updateDecorator({
            firstName,
            lastName,
            userName,
            email,
            address,
            phoneNumber,
          })
          .subscribe((value) => {
            this.createAuthNotification(
              'Success',
              value.message,
              'text-green-500'
            );
          });
        this.userData = null;
        this.isVisible = false;
      }
    } else {
      this.createAuthNotification(
        'Failed',
        'Please check information',
        'text-red-500'
      );
    }
  }

  changePermission(): void {
    this.adminService
      .permissionDecorator({
        userName: this.userData.userName,
        isDisabled: this.userData.isDisabled,
      })
      .subscribe((res) => {
        this.createAuthNotification(
          'success',
          res.message,
          'text-green-500'
        );
      });
  }

  decoratorTableHeader = [
    {
      title: 'Name',
      compare: (a: DataItem, b: DataItem) =>
        a.firstName.localeCompare(b.firstName),
      priority: false,
    },
    {
      title: 'User Name',
      compare: (a: DataItem, b: DataItem) =>
        a.userName.localeCompare(b.userName),
      priority: false,
    },
    {
      title: 'email',
      compare: (a: DataItem, b: DataItem) => a.email.localeCompare(b.email),
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
      title: 'Status',
      priority: false,
    },
    {
      title: 'Setting',
    },
  ];
}
