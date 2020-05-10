import { Component, OnInit } from '@angular/core';
import { CuttingService } from 'src/app/core/services/cutting/cutting.service';
import { Cutting } from 'src/app/shared/models/cutting/cutting';
import { ResultData } from 'src/app/shared/models/query/query';

@Component({
  selector: 'app-my-cutting',
  templateUrl: './my-cutting.component.html',
  styleUrls: ['./my-cutting.component.scss']
})
export class MyCuttingComponent implements OnInit {

  public myCuttings: ResultData<Cutting> = { items: [], count: 0 };
  // public current_page = 1;
  // public page_size = 6;
  // public items_count = 200;
  public loading: boolean = true;

  constructor(private cuttingService: CuttingService) { }

  ngOnInit(): void {
    this.loading = true;
    this.cuttingService
      .findAllByUser(/*this.current_page - 1, this.page_size*/)
      .subscribe((cuttings: ResultData<Cutting>) => {
        this.myCuttings = cuttings;

        this.loading = false;
      });
  }

}
