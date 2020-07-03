import { Component, OnInit } from '@angular/core';
import { PlantService } from 'src/app/core/services/plant/plant.service';
import { NzTableQueryParams } from 'ng-zorro-antd/table';
import { switchMap } from 'rxjs/operators';
import { ResultData } from 'src/app/shared/models/query/query';
import { Plant } from 'src/app/shared/models/plant/plant';

@Component({
  selector: 'app-plant-list',
  templateUrl: './plant-list.component.html',
  styleUrls: ['./plant-list.component.scss']
})
export class PlantListComponent implements OnInit {

  public plants: ResultData<Plant> = {
    count: 0,
    items: []
  };

  public expandSet = new Set<number>();

  public pageIndex = 1;
  public pageSize = 8;

  constructor(
    private plantService: PlantService,
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
    this.plantService
      .findAll(((pageIndex - 1) * pageSize) || 0, pageSize)
      .subscribe({
        next: (plants) => this.plants = plants
      })
  }

  onQueryParamsChange(params: NzTableQueryParams): void {
    console.log(params);
    const { pageSize, pageIndex, sort, filter } = params;
    this.loadDataFromServer(pageIndex, pageSize);
  }

  deletePlant(id: number) {
    this.plantService
      .delete(id)
      .pipe(
        switchMap(() => this.plantService.findAll(((this.pageIndex - 1) * this.pageSize) || 0, this.pageSize))
      ).subscribe({
        next: (plants) => this.plants = plants
      });
  }

}
