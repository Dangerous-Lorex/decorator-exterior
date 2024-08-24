import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { NgClass, NgIf } from '@angular/common';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { ButtonComponent } from '../../shared/components/button/button.component';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzIconModule, NzIconService } from 'ng-zorro-antd/icon';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzFormModule } from 'ng-zorro-antd/form';
import { EyeInvisibleOutline } from '@ant-design/icons-angular/icons';
import { AuthService } from '../../services/auth/auth.service';
import { NzNotificationService } from 'ng-zorro-antd/notification';

@Component({
  selector: 'app-sign-up',
  templateUrl: './register.component.html',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    RouterLink,
    AngularSvgIconModule,
    NgClass,
    NgIf,
    ButtonComponent,
    NzInputModule,
    NzIconModule,
    NzToolTipModule,
    NzCheckboxModule,
    NzButtonModule,
    NzSelectModule,
    NzFormModule,
  ],
})
export class RegisterComponent implements OnInit {
  registerForm!: FormGroup;
  submitted: boolean = false;

  passwordVisible: boolean = false;
  confirmPasswordVisible: boolean = false;
  constructor(
    private readonly _formBuilder: FormBuilder,
    private readonly router: Router,
    private iconService: NzIconService,
    private authService: AuthService,
    private notification: NzNotificationService
  ) {
    this.iconService.addIcon(EyeInvisibleOutline);
  }

  ngOnInit(): void {
    this.registerForm = this._formBuilder.group({
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      userName: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      gender: ['', [Validators.required]],
      address: ['', [Validators.required]],
      phoneNumber: ['', [Validators.required]],
      cardType: ['', [Validators.required]],
      cardNumber1: ['', [Validators.required]],
      cardNumber2: ['', [Validators.required]],
      cardNumber3: ['', [Validators.required]],
      cardNumber4: ['', [Validators.required]],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required],
    });
  }

  get f() {
    return this.registerForm.controls;
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

  onRegisterSubmit() {
    this.submitted = true;
    const {
      firstName,
      lastName,
      userName,
      email,
      gender,
      address,
      phoneNumber,
      cardType,
      cardNumber1,
      cardNumber2,
      cardNumber3,
      cardNumber4,
      password,
      confirmPassword,
    } = this.registerForm.value;
    const cardNumber: String =
      cardNumber1 + '-' + cardNumber2 + '-' + cardNumber3 + '-' + cardNumber4;
    // stop here if registerForm is invalid
    if (this.registerForm.invalid) {
      return;
    } else {
      const userData: any = {
        firstName,
        lastName,
        userName,
        email,
        gender,
        address,
        phoneNumber,
        cardType,
        cardNumber,
        password,
        confirmPassword,
      };
      this.authService
        .register(userData)
        .then((res: string) => {
          this.createAuthNotification('Success', res, 'text-green-500');
          this.router.navigate(['/auth/login']);
        })
        .catch((err) => {
          this.createAuthNotification('Failed', "Please check your information.", 'text-red-500');
          throw err;
        });
    }
  }

  routeLogin() {
    this.router.navigate(['/auth/login']);
  }
}
