import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
    selector: 'app-decorator',
    templateUrl: './decorator.component.html',
    standalone: true,
    imports: [RouterOutlet],
})
export class DecoratorComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}
