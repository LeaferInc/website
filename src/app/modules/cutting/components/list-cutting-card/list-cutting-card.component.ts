import { Component, OnInit, Input } from '@angular/core';
import { Cutting } from 'src/app/shared/models/cutting/cutting';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list-cutting-card',
  templateUrl: './list-cutting-card.component.html',
  styleUrls: ['./list-cutting-card.component.scss']
})
export class ListCuttingCardComponent implements OnInit {

  @Input() cutting: Cutting;

  constructor() { }

  ngOnInit(): void {
  }
}
