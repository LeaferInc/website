import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { CuttingService } from 'src/app/core/services/cutting/cutting.service';
import { Cutting } from 'src/app/shared/models/cutting/cutting';

@Component({
  selector: 'app-details-cutting',
  templateUrl: './details-cutting.component.html',
  styleUrls: ['./details-cutting.component.scss']
})
export class DetailsCuttingComponent implements OnInit {

  public cutting: Cutting;
  public loading: boolean = true;

  constructor(private router: ActivatedRoute, private cuttingService: CuttingService) { }

  ngOnInit(): void {
    this.loading = true;
    this.router.params.subscribe((params: Params) => {
        this.cuttingService.findOne(params.id).subscribe((cutting: Cutting) => {
          this.cutting = cutting;
          this.loading = false;
        });
    });
  }

}
