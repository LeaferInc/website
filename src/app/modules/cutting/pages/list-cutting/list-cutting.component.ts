import { Component, OnInit } from '@angular/core';
import { Cutting } from 'src/app/shared/models/cutting/cutting';
import { CuttingService } from 'src/app/core/services/cutting/cutting.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ResultData } from 'src/app/shared/models/query/query';

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

  constructor(private cuttingService: CuttingService) { }

  ngOnInit(): void {
    this.loading = true;
    this.cuttingService
      .findAllExchange()
      .subscribe((cuttings: ResultData<Cutting>) => {
        this.cuttings = cuttings;
        this.loading = false;
      });
  }

  onSearch() {

    if(this.searchForm.invalid) {
      return;
    }

    alert(this.searchInput.value);

  }

}
