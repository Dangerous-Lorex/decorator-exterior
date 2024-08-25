import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth/auth.service';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  standalone: true,
  imports: [NgIf],
})
export class HeaderComponent implements OnInit {
  userInfo: any;

  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.userInfo = this.authService.getUserData();
  }
}
