import { Component, OnInit } from '@angular/core';
import { Plant } from 'src/app/shared/models/plant/plant';
import { PlantService } from 'src/app/core/services/plant/plant.service';
import { ResultData } from 'src/app/shared/models/query/query';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-list-plant',
  templateUrl: './list-plant.component.html',
  styleUrls: ['./list-plant.component.scss']
})
export class ListPlantComponent implements OnInit {

  public plants: ResultData<Plant>;
  public loading: boolean = true;

  public searchInput = new FormControl('');
  public searchForm = new FormGroup({});

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
          return this.plantService.findAll(((this.pageIndex - 1) * this.pageSize) || 0, this.pageSize)
        }),
      ).subscribe({
        next: (plants: ResultData<Plant>) => {
          this.plants = plants;
          this.loading = false;
        },
      });
  }

  onSearch() {
    if(this.searchForm.invalid) {
      return;
    }

    alert(this.searchInput.value);
  }

  onPageIndexChange(newIndex: number) {
    this.router.navigate(['plant/list'], { queryParams: { page: newIndex } })
  }

}
