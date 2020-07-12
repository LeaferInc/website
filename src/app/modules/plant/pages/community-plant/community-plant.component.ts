import { Component, OnInit, OnDestroy } from '@angular/core';
import { Plant } from 'src/app/shared/models/plant/plant';
import { PlantService } from 'src/app/core/services/plant/plant.service';
import { ResultData } from 'src/app/shared/models/query/query';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap, debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-community-plant',
  templateUrl: './community-plant.component.html',
  styleUrls: ['./community-plant.component.scss']
})
export class CommunityPlantComponent implements OnInit, OnDestroy {

  public plants: ResultData<Plant>;
  public loading: boolean = true;

  public searchForm = new FormGroup({
    searchInput: new FormControl('')
  });

  public pageIndex: number;
  public pageSize = 12;

  private sub: Subscription;

  constructor(
    private plantService: PlantService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.activatedRoute
      .queryParams
      .subscribe({
        next: (params) => {
          if(params.search)
            this.searchForm.get('searchInput').patchValue(params.search);
          this.pageIndex = params.page || 1;
          this.findAllExceptOwner(this.searchForm.get('searchInput').value);
        },
      });
    
    this.searchForm
      .get('searchInput')
      .valueChanges
      .pipe(
        debounceTime(850),
        distinctUntilChanged(),
      )
      .subscribe({
        next: (search: string) => {
          this.pageIndex = 1;
          const queryParams = {
            page: this.pageIndex
          };
          if(search) Object.assign(queryParams, { search: search });
          this.router.navigate([], { relativeTo: this.activatedRoute, queryParams: queryParams });
        }
      });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  onPageIndexChange(newIndex: number) {
    this.router.navigate(['plant/community'], { queryParams: { page: newIndex } })
  }

  plantDeleted(id: number) {
    this.findAllExceptOwner();
  }

  private findAllExceptOwner(search?: string) {
    this.loading = true;
    this.sub = this.plantService
      .findAllExceptOwner(((this.pageIndex - 1) * this.pageSize) || 0, this.pageSize, search)
      .subscribe({
        next: (plants: ResultData<Plant>) => this.plants = plants,
        complete: () => this.loading = false
      });
  }
}
