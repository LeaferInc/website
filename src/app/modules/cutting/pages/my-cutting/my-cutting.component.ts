import { Component, OnInit } from '@angular/core';
import { CuttingService } from 'src/app/core/services/cutting/cutting.service';
import { Cutting } from 'src/app/shared/models/cutting/cutting';
import { ResultData } from 'src/app/shared/models/query/query';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap, finalize } from 'rxjs/operators';
import { AuthService } from 'src/app/core/services/auth/auth.service';

@Component({
  selector: 'app-my-cutting',
  templateUrl: './my-cutting.component.html',
  styleUrls: ['./my-cutting.component.scss']
})
export class MyCuttingComponent implements OnInit {

  public myCuttings: ResultData<Cutting> = { items: [], count: 0 };
  public loading: boolean = true;

  public pageIndex: number;
  public pageSize = 12;

  constructor(
    private cuttingService: CuttingService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    public authService: AuthService,
  ) { }

  ngOnInit(): void {
    this.activatedRoute.queryParams
      .pipe(
        switchMap((params) => {
          this.pageIndex = params.page || 1;
          this.loading = true;
          return this.cuttingService.findAllByUser(((this.pageIndex - 1) * this.pageSize) || 0, this.pageSize)
        }),
        finalize(() => this.loading = false)
      ).subscribe({
        next: (cuttings: ResultData<Cutting>) => this.myCuttings = cuttings
      });
  }

  onPageIndexChange(newIndex: number) {
    this.router.navigate(['cutting/inventory'], { queryParams: { page: newIndex } })
  }

}
