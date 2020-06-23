import { Component, OnInit } from '@angular/core';
import { ResultData } from 'src/app/shared/models/query/query';
import { Plant } from 'src/app/shared/models/plant/plant';
import { PlantService } from 'src/app/core/services/plant/plant.service';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-my-garden',
  templateUrl: './my-garden.component.html',
  styleUrls: ['./my-garden.component.scss']
})
export class MyGardenComponent implements OnInit {

  public plants: ResultData<Plant>;
  public loading: boolean = true;

  public pageIndex: number;
  public pageSize = 12;

  constructor(
    private plantService: PlantService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
  ) { }
  
  ngOnInit(): void {
    this.activatedRoute.queryParams
      .pipe(
        switchMap((params) => {
          this.pageIndex = params.page || 1;
          this.loading = true;
          return this.plantService.findAllMyGarden(((this.pageIndex - 1) * this.pageSize) || 0, this.pageSize)
        }),
      ).subscribe({
        next: (plants: ResultData<Plant>) => {
          this.plants = plants;
          this.loading = false;
        },
      });
  }

  onPageIndexChange(newIndex: number) {
    this.router.navigate(['plant/inventory'], { queryParams: { page: newIndex } })
  }

}
