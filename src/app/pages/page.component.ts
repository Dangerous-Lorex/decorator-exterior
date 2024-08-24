import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
    selector: 'app-page',
    templateUrl: './page.component.html',
    standalone: true,
    imports: [RouterOutlet],
})
export class PageComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}
