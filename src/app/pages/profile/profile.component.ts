import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { NgIf } from '@angular/common';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzFormModule } from 'ng-zorro-antd/form';
import { AuthService } from '../../services/auth/auth.service';
import { ProfileService } from '../../services/profile/profile.service';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { NzUploadModule } from 'ng-zorro-antd/upload';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzUploadChangeParam } from 'ng-zorro-antd/upload';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  standalone: true,
  imports: [
    NzButtonModule,
    NzInputModule,
    NzFormModule,
    FormsModule,
    ReactiveFormsModule,
    NzSelectModule,
    NzUploadModule,
    NgIf
  ],
})
export class ProfileComponent implements OnInit {
  profileForm!: FormGroup;
  uploadUrl = 'http://localhost:5000/upload';
  avatarLink = '';
  constructor(
    private authService: AuthService,
    private profileService: ProfileService,
    private _formBuilder: FormBuilder,
    private notification: NzNotificationService,
    private msg: NzMessageService
  ) {}

  userName: string = '';
  userInfo: any;

  ngOnInit(): void {
    this.authService._userData.subscribe((userData) => {
      if (userData) {
        this.userName = userData.userName;
      }
    });
    if (this.userName) {
      this.profileService.getUser(this.userName).subscribe(
        (data) => {
          this.userInfo = data;
          this.avatarLink = 'http://localhost:5000' + this.userInfo.avatar;
          console.log(this.userInfo.role)
          this.profileForm.patchValue({
            firstName: this.userInfo.firstName,
            lastName: this.userInfo.lastName,
            userName: this.userInfo.userName,
            email: this.userInfo.email,
            gender: this.userInfo.gender,
            address: this.userInfo.address,
            phoneNumber: this.userInfo.phoneNumber,
            cardType: this.userInfo.cardType,
            cardNumber: this.userInfo.cardNumber,
          });
        },
        (error) => {
          console.log(error);
        }
      );
    }

    this.profileForm = this._formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      userName: [{ value: '', disabled: true }, Validators.required],
      email: ['', [Validators.required, Validators.email]],
      gender: ['', Validators.required],
      address: ['', Validators.required],
      phoneNumber: ['', Validators.required],
      cardType: ['', Validators.required],
      cardNumber: ['', Validators.required],
    });
  }

  createNotification(title: string, content: string): void {
    this.notification.blank(title, content);
  }

  onSubmit() {
    const {
      firstName,
      lastName,
      email,
      gender,
      address,
      phoneNumber,
      cardType,
      cardNumber,
      avatar,
    } = this.profileForm.value;
    const userName = this.userName;
    const userInfo = {
      firstName,
      lastName,
      userName,
      email,
      gender,
      address,
      phoneNumber,
      cardType,
      cardNumber,
    };

    this.profileService.updateUser(userInfo).then((data) => {
      if (data.status == 200) {
        this.createNotification(
          'Update Success',
          'Your profile has updated successfully'
        );
      }
    });
  }

  handleChange(info: NzUploadChangeParam): void {
    if (info.file.status !== 'uploading') {
      console.log(info.file, info.fileList);
    }
    if (info.file.status === 'done') {
      this.profileService.getUser(this.userName).subscribe(
        (data) => {
          this.userInfo = data;
          this.avatarLink = 'http://localhost:5000' + this.userInfo.avatar;
        },
        (error) => {
          console.log(error);
        }
      );
      this.msg.success(`${info.file.name} file uploaded successfully`);
    } else if (info.file.status === 'error') {
      this.msg.error(`${info.file.name} file upload failed.`);
    }
  }
}
