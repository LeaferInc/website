import { Component, OnInit, OnDestroy } from '@angular/core';
import { Cutting } from 'src/app/shared/models/cutting/cutting';
import { CuttingService } from 'src/app/core/services/cutting/cutting.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ResultData } from 'src/app/shared/models/query/query';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap, finalize, debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-list-cutting',
  templateUrl: './list-cutting.component.html',
  styleUrls: ['./list-cutting.component.scss'],
})
export class ListCuttingComponent implements OnInit, OnDestroy {
  public cuttings: ResultData<Cutting>;
  public loading: boolean = true;

  public searchForm = new FormGroup({
    searchInput: new FormControl(''),
  });

  public pageIndex: number;
  public pageSize = 12;

  private sub: Subscription = new Subscription();

  constructor(private cuttingService: CuttingService, private activatedRoute: ActivatedRoute, private router: Router) {}

  ngOnInit(): void {
    this.sub.add(
      this.activatedRoute.queryParams.subscribe({
        next: (params) => {
          if (params.search) this.searchForm.get('searchInput').patchValue(params.search);
          this.pageIndex = params.page || 1;
          this.findAllExchange(this.searchForm.get('searchInput').value);
        },
      })
    );

    this.sub.add(
      this.searchForm
        .get('searchInput')
        .valueChanges.pipe(debounceTime(850), distinctUntilChanged())
        .subscribe({
          next: (search: string) => {
            this.pageIndex = 1;
            const queryParams = {
              page: this.pageIndex,
            };
            if (search) Object.assign(queryParams, { search: search });
            this.router.navigate([], { relativeTo: this.activatedRoute, queryParams: queryParams });
          },
        })
    );
  }

  ngOnDestroy() {
    if (this.sub) this.sub.unsubscribe();
  }

  onPageIndexChange(newIndex: number) {
    this.router.navigate(['cutting/exchange'], { queryParams: { page: newIndex } });
  }

  cuttingDeleted(id: number) {
    this.sub.add(
      this.cuttingService.findAllExchange((this.pageIndex - 1) * this.pageSize || 0, this.pageSize).subscribe({
        next: (cuttings: ResultData<Cutting>) => (this.cuttings = cuttings),
      })
    );
  }

  private findAllExchange(search?: string) {
    this.loading = true;
    this.sub.add(
      this.cuttingService.findAllExchange((this.pageIndex - 1) * this.pageSize || 0, this.pageSize, search).subscribe({
        next: (cuttings) => (this.cuttings = cuttings),
        complete: () => (this.loading = false),
      })
    );
  }
}
