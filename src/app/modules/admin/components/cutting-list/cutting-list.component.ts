import { Component, OnInit } from '@angular/core';
import { Cutting } from 'src/app/shared/models/cutting/cutting';
import { CuttingService } from 'src/app/core/services/cutting/cutting.service';
import { ResultData } from 'src/app/shared/models/query/query';
import { NzTableQueryParams } from 'ng-zorro-antd/table';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-cutting-list',
  templateUrl: './cutting-list.component.html',
  styleUrls: ['./cutting-list.component.scss']
})
export class CuttingListComponent implements OnInit {

  public cuttings: ResultData<Cutting> = {
    count: 0,
    items: []
  };

  public expandSet = new Set<number>();

  public pageIndex = 1;
  public pageSize = 8;

  constructor(
    private cuttingService: CuttingService,
  ) { }

  ngOnInit(): void {
    this.loadDataFromServer(this.pageIndex, this.pageSize);
  }

  onExpandChange(id: number, checked: boolean): void {
    if (checked) {
      this.expandSet.add(id);
    } else {
      this.expandSet.delete(id);
    }
  }

  loadDataFromServer(pageIndex?: number, pageSize?: number) {
    this.cuttingService
      .findAll(((pageIndex - 1) * pageSize) || 0, pageSize)
      .subscribe({
        next: (cuttings) => this.cuttings = cuttings
      })
  }

  onQueryParamsChange(params: NzTableQueryParams): void {
    console.log(params);
    const { pageSize, pageIndex, sort, filter } = params;
    this.loadDataFromServer(pageIndex, pageSize);
  }

  deleteCutting(id: number) {
    this.cuttingService
      .delete(id)
      .pipe(
        switchMap(() => this.cuttingService.findAll(((this.pageIndex - 1) * this.pageSize) || 0, this.pageSize))
      ).subscribe({
        next: (cuttings) => this.cuttings = cuttings
      });
  }

}
