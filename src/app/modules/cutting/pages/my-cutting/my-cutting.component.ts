import { Component, OnInit } from '@angular/core';
import { CuttingService } from 'src/app/core/services/cutting/cutting.service';
import { Cutting } from 'src/app/shared/models/cutting/cutting';

@Component({
  selector: 'app-my-cutting',
  templateUrl: './my-cutting.component.html',
  styleUrls: ['./my-cutting.component.scss']
})
export class MyCuttingComponent implements OnInit {

  public myCuttings: Array<Cutting> = [];
  public loading: boolean = true;

  constructor(private cuttingService: CuttingService) { }

  ngOnInit(): void {
    this.loading = true;
    this.cuttingService
      .findAllByUser()
      .subscribe((cuttings: Array<Cutting>) => {
        this.myCuttings = cuttings;
        this.loading = false;
      });
  }

}
