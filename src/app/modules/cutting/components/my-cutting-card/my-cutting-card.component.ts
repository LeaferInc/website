import { Component, OnInit, Input } from '@angular/core';
import { Cutting } from 'src/app/shared/models/cutting/cutting';
import { Router } from '@angular/router';

@Component({
  selector: 'app-my-cutting-card',
  templateUrl: './my-cutting-card.component.html',
  styleUrls: ['./my-cutting-card.component.scss']
})
export class MyCuttingCardComponent implements OnInit {

  @Input() cutting: Cutting

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  onCardClick() {
    this.router.navigate(['cutting', this.cutting.id]);
  }

}
