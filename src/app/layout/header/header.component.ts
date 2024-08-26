import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth/auth.service';
import { NgIf } from '@angular/common';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  standalone: true,
  imports: [NgIf, NzDropDownModule, RouterLink],
})
export class HeaderComponent implements OnInit {
  userInfo: any;
  constructor(
    private authService: AuthService,
    private readonly router: Router
  ) {}

  ngOnInit() {
    this.authService.getUserData();
    this.authService._userData.subscribe(userData => {
      this.userInfo = userData;
    });
  }

  linkProfile() {
    this.router.navigate(['/profile']);
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/']);
  }
  moveTo(link: string) {
    this.router.navigate([link]);
  }
}
