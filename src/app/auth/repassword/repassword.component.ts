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
  ],
})
export class RepasswordComponent implements OnInit {
  rePasswordForm!: FormGroup;
  submitted = false;
  errorMessage: string = '';
  currentVisible: boolean = false;
  newVisible: boolean = false;
  confirmVisible: boolean = false;
  
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
    this.rePasswordForm = this._formBuilder.group({
      currentPassword: ['', [Validators.required]],
      newPassword: ['', Validators.required],
      confirmPassword: ['', Validators.required],
    });
  }

  get f() {
    return this.rePasswordForm.controls;
  }

  createAuthNotification(
    title: string,
    message: string,
    titleColor: string
  ): void {
    this.notification.blank(
      `<span class="${titleColor}">Change Password has ${title}</span>`,
      message
    );
  }

  onLoginSubmit() {
    this.submitted = true;
    const { currentPassword, newPassword, confirmPassword } = this.rePasswordForm.value;
    if (this.rePasswordForm.invalid) {
      this.createAuthNotification(
        'Failed',
        'Please fill in all properties.',
        'text-red-500'
      );
      return;
    } else {
      console.log({ currentPassword, newPassword, confirmPassword })
    }
  }
  routeRegister() {
    this.router.navigate(['/auth/register']);
  }
}
