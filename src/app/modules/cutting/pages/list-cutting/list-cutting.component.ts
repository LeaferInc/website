import { Component, OnInit } from '@angular/core';
import { Cutting } from 'src/app/shared/models/cutting/cutting';
import { CuttingService } from 'src/app/core/services/cutting/cutting.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ResultData } from 'src/app/shared/models/query/query';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap, finalize } from 'rxjs/operators';

@Component({
  selector: 'app-list-cutting',
  templateUrl: './list-cutting.component.html',
  styleUrls: ['./list-cutting.component.scss']
})
export class ListCuttingComponent implements OnInit {

  public cuttings: ResultData<Cutting>;
  public loading: boolean = true;

  public searchInput = new FormControl('');
  public searchForm = new FormGroup({});

  public pageIndex: number;
  public pageSize = 12;

  constructor(
    private cuttingService: CuttingService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.activatedRoute.queryParams
      .pipe(
        switchMap((params) => {
          this.pageIndex = params.page || 1;
          this.loading = true;
          return this.cuttingService.findAllExchange(((this.pageIndex - 1) * this.pageSize) || 0, this.pageSize)
        }),
        finalize(() => this.loading = false)
      ).subscribe({
        next: (cuttings: ResultData<Cutting>) => this.cuttings = cuttings
      });
  }

  onSearch() {
    if(this.searchForm.invalid) {
      return;
    }

    alert(this.searchInput.value);
  }

  onPageIndexChange(newIndex: number) {
    this.router.navigate(['cutting/exchange'], { queryParams: { page: newIndex } })
  }

  cuttingDeleted(id: number) {
    this.cuttingService
      .findAllExchange(((this.pageIndex - 1) * this.pageSize) || 0, this.pageSize)
      .subscribe({
        next: (cuttings: ResultData<Cutting>) => this.cuttings = cuttings
      });
  }
}
