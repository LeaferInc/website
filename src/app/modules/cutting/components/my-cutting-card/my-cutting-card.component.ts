import { Component, OnInit, Input } from '@angular/core';
import { Cutting } from 'src/app/shared/models/cutting/cutting';

@Component({
  selector: 'app-my-cutting-card',
  templateUrl: './my-cutting-card.component.html',
  styleUrls: ['./my-cutting-card.component.scss']
})
export class MyCuttingCardComponent implements OnInit {

  @Input() cutting: Cutting

  constructor() { }

  ngOnInit(): void {
  }
}
