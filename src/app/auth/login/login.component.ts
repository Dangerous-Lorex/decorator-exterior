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
import { EyeInvisibleOutline } from '@ant-design/icons-angular/icons';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { AuthService } from '../../services/auth/auth.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './login.component.html',
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
  ],
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  submitted: boolean = false;
  errorMessage: string = '';
  passwordVisible: boolean = false;
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
    this.loginForm = this._formBuilder.group({
      userName: ['', [Validators.required]],
      password: ['', Validators.required],
    });
  }

  get f() {
    return this.loginForm.controls;
  }

  createAuthNotification(
    title: string,
    message: string,
    titleColor: string
  ): void {
    this.notification.blank(
      `<span class="${titleColor}">Login ${title}</span>`,
      message
    );
  }

  onLoginSubmit() {
    this.submitted = true;
    const { userName, password } = this.loginForm.value;
    if (this.loginForm.invalid) {
      this.createAuthNotification(
        'Failed',
        'Please fill in all properties.',
        'text-red-500'
      );
      return;
    } else {
      this.authService
        .login(userName, password)
        .then((role) => {
          this.createAuthNotification(
            'Success',
            'Login Success. Thank you.',
            'text-green-500'
          );
          if (role == 'admin') {
            this.router.navigate(['/admin/company-list']);
          } else {
            this.router.navigate(['/profile']);
          }
        })
        .catch((err) => {
          this.createAuthNotification(
            'Error',
            err.error.message,
            'text-red-500'
          );
        });
    }
  }
  routeRegister() {
    this.router.navigate(['/auth/register']);
  }
}
