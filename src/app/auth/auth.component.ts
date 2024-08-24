import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NzIconModule, NzIconService } from 'ng-zorro-antd/icon';
import { HomeOutline } from '@ant-design/icons-angular/icons';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss'],
  standalone: true,
  imports: [RouterOutlet, NzIconModule, RouterLink],
})

export class AuthComponent {
  constructor(private iconService: NzIconService) {
    this.iconService.addIcon(HomeOutline);
  }
}