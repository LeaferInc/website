import { Component, OnInit } from '@angular/core';
import { Cutting } from 'src/app/shared/models/cutting/cutting';
import { CuttingService } from 'src/app/core/services/cutting/cutting.service';

@Component({
  selector: 'app-list-cutting',
  templateUrl: './list-cutting.component.html',
  styleUrls: ['./list-cutting.component.scss']
})
export class ListCuttingComponent implements OnInit {

  public cuttings: Array<Cutting> = [];
  public loading: boolean = true;

  constructor(private cuttingService: CuttingService) { }

  ngOnInit(): void {
    this.loading = true;
    this.cuttingService
      .findAll()
      .subscribe((cuttings: Array<Cutting>) => {
        this.cuttings = cuttings;
        this.loading = false;
      });
  }

}
