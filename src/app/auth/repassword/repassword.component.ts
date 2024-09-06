import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormsModule,
  ReactiveFormsModule,
  ValidatorFn,
  AbstractControl,
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
import { EyeInvisibleOutline } from '@ant-design/icons-angular/icons';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { AuthService } from '../../services/auth/auth.service';
import { NzFormModule } from 'ng-zorro-antd/form';

import { passwordValidator } from '../../utils/inputValidation';

@Component({
  selector: 'app-sign-in',
  templateUrl: './repassword.component.html',
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
    NzFormModule,
  ],
})
export class RepasswordComponent implements OnInit {
  rePasswordForm!: FormGroup;
  submitted = false;
  errorMessage: string = '';
  currentVisible: boolean = false;
  newVisible: boolean = false;
  confirmVisible: boolean = false;
  _userData: any;

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
    this.authService.getUserData();
    this.authService._userData.subscribe((userData) => {
      this._userData = userData;
    });
    this.rePasswordForm = this._formBuilder.group({
      currentPassword: ['', [Validators.required]],
      newPassword: ['', [Validators.required, passwordValidator()]],
      confirmPassword: ['', [Validators.required, passwordValidator()]],
    });
  }

  passwordMatchValidator(group: FormGroup) {
    const password = group.get('newPassword')?.value;
    const confirmPassword = group.get('confirmPassword')?.value;

    return password === confirmPassword ? null : { mismatch: true };
  }

  get f() {
    return this.rePasswordForm.controls;
  }

  routeHome() {
    this.router.navigate(['/profile']);
  }
  createAuthNotification(
    title: string,
    message: string,
    titleColor: string
  ): void {
    this.notification.blank(
      `<span class="${titleColor}">${title}</span>`,
      message
    );
  }

  onLoginSubmit(event: Event) {
    event.preventDefault();
    this.submitted = true;
    const { currentPassword, newPassword, confirmPassword } =
      this.rePasswordForm.value;

    if (newPassword == confirmPassword) {
      if (this.rePasswordForm.invalid) {
        Object.values(this.rePasswordForm.controls).forEach((control) => {
          if (control.invalid) {
            control.markAsDirty();
            control.updateValueAndValidity({ onlySelf: true });
          }
        });
      } else {
        this.authService
          .changePassword(this._userData.id, currentPassword, newPassword)
          .then((data) => {
            if (data.status == 201) {
              this.createAuthNotification(
                'Password Change',
                data.message,
                'text-green-500'
              );
            } else {
              this.createAuthNotification(
                'Password Change',
                data.message,
                'text-red-500'
              );
            }
          })
          .catch((error: any) => {
            this.createAuthNotification(
              'Password Change',
              error.error.message,
              'text-red-500'
            );
          })
      }
    } else {
      this.createAuthNotification(
        'Password Change',
        "Confirm Password Incorrect",
        'text-red-500'
      );
    }
  }
}
