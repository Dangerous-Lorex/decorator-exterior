import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzFormModule } from 'ng-zorro-antd/form';
import { AuthService } from '../../services/auth/auth.service';
import { ProfileService } from '../../services/profile/profile.service';
import { NzSelectModule } from 'ng-zorro-antd/select';

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
    NzSelectModule
  ],
})
export class ProfileComponent implements OnInit {
  profileForm!: FormGroup;

  constructor(
    private authService: AuthService,
    private profileService: ProfileService,
    private _formBuilder: FormBuilder
  ) {}

  userName: string = '';
  userInfo: any;

  ngOnInit(): void {
    // this.userName = this.authService.getUserData().userName;
    this.authService._userData.subscribe((userData) => {
      this.userName = userData.userName;
    });
    this.profileService.getUser(this.userName).subscribe(
      (data) => {
        this.userInfo = data;
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
        console.log(this.userInfo.firstName);
      },
      (error) => {
        console.log(error);
      }
    );

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
}
