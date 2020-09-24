import { Component, OnInit, OnDestroy } from '@angular/core';
import { CuttingService } from 'src/app/core/services/cutting/cutting.service';
import { Cutting } from 'src/app/shared/models/cutting/cutting';
import { ResultData } from 'src/app/shared/models/query/query';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap, finalize, debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { AuthService } from 'src/app/core/services/auth/auth.service';
import { FormGroup, FormControl } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-my-cutting',
  templateUrl: './my-cutting.component.html',
  styleUrls: ['./my-cutting.component.scss'],
})
export class MyCuttingComponent implements OnInit, OnDestroy {
  public myCuttings: ResultData<Cutting> = { items: [], count: 0 };
  public loading: boolean = true;

  public searchForm = new FormGroup({
    searchInput: new FormControl(''),
  });

  public pageIndex: number;
  public pageSize = 12;

  private sub: Subscription = new Subscription();

  constructor(
    private cuttingService: CuttingService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    public authService: AuthService
  ) {}

  ngOnInit(): void {
    this.sub.add(
      this.activatedRoute.queryParams.subscribe({
        next: (params) => {
          if (params.search) this.searchForm.get('searchInput').patchValue(params.search);
          this.pageIndex = params.page || 1;
          this.findAllByUser(this.searchForm.get('searchInput').value);
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
    this.router.navigate(['cutting/inventory'], { queryParams: { page: newIndex } });
  }

  private findAllByUser(search?: string) {
    this.loading = true;
    this.sub.add(
      this.cuttingService.findAllByUser((this.pageIndex - 1) * this.pageSize || 0, this.pageSize, search).subscribe({
        next: (cuttings) => (this.myCuttings = cuttings),
        complete: () => (this.loading = false),
      })
    );
  }
}
