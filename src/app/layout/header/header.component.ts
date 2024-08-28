import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth/auth.service';
import { NgIf } from '@angular/common';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { Router, RouterLink } from '@angular/router';
import { ProfileService } from '../../services/profile/profile.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  standalone: true,
  imports: [NgIf, NzDropDownModule, RouterLink],
})
export class HeaderComponent implements OnInit {
  userInfo: any = null;
  avatarUrl: string = '';
  constructor(
    private authService: AuthService,
    private readonly router: Router,
    private profileService: ProfileService
  ) {}

  ngOnInit() {
    this.authService.getUserData();
    this.authService._userData.subscribe((userData) => {
      this.userInfo = userData;
      if (this.userInfo) {
        if (this.userInfo.role != 'admin') {
          this.profileService
            .getUser(this.userInfo.userName)
            .subscribe((data) => {
              this.avatarUrl = 'http://localhost:5000' + data.avatar;
            });
        }
      }
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
