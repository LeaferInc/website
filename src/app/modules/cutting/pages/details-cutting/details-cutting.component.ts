import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CuttingService } from 'src/app/core/services/cutting/cutting.service';
import { Cutting } from 'src/app/shared/models/cutting/cutting';
import { AuthService } from 'src/app/core/services/auth/auth.service';
import { User } from 'src/app/shared/models/user/user';
import { combineLatest } from 'rxjs';
import { concatMap } from 'rxjs/operators';

@Component({
  selector: 'app-details-cutting',
  templateUrl: './details-cutting.component.html',
  styleUrls: ['./details-cutting.component.scss'],
})
export class DetailsCuttingComponent implements OnInit {
  public cutting: Cutting;
  public loading: boolean = true;
  public currentUser: User;

  constructor(
    private router: ActivatedRoute,
    private cuttingService: CuttingService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.loading = true;

    combineLatest([this.router.params, this.authService.getUserAuth()])
      .pipe(
        concatMap((res) => {
          this.currentUser = res[1].user;
          return this.cuttingService.findOne(res[0].id);
        })
      )
      .subscribe(
        (res) => {
          this.cutting = res;
          this.loading = false;
        },
        (err) => console.error(err)
      );
  }

  onEdit() {
    alert('onEdit');
  }

  onDelete() {
    alert('onDelete');
  }

  onOffer() {
    alert('onOffer');
  }

  onSendMessage() {
    alert('onSendMessage');
  }
}
