import { Component, OnDestroy, OnInit } from '@angular/core';
import { UserService } from 'src/app/core/services/user/user.service';
import { User } from 'src/app/shared/models/user/user';
import { ResultData } from 'src/app/shared/models/query/query';
import { NzTableQueryParams } from 'ng-zorro-antd/table';
import { switchMap } from 'rxjs/operators';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss'],
})
export class UserListComponent implements OnInit, OnDestroy {
  public users: ResultData<User> = {
    count: 0,
    items: [],
  };

  public expandSet = new Set<number>();

  public pageIndex = 1;
  public pageSize = 8;

  private sub: Subscription = new Subscription();

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.loadDataFromServer(this.pageIndex, this.pageSize);
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  onExpandChange(id: number, checked: boolean): void {
    if (checked) {
      this.expandSet.add(id);
    } else {
      this.expandSet.delete(id);
    }
  }

  loadDataFromServer(pageIndex?: number, pageSize?: number) {
    this.sub.add(
      this.userService.getAll((pageIndex - 1) * pageSize || 0, pageSize).subscribe({
        next: (users) => (this.users = users),
      })
    );
  }

  onQueryParamsChange(params: NzTableQueryParams): void {
    console.log(params);
    const { pageSize, pageIndex, sort, filter } = params;
    this.loadDataFromServer(pageIndex, pageSize);
  }

  deleteUser(id: number) {
    this.sub.add(
      this.userService
        .delete(id)
        .pipe(switchMap(() => this.userService.getAll((this.pageIndex - 1) * this.pageSize || 0, this.pageSize)))
        .subscribe({
          next: (users) => (this.users = users),
        })
    );
  }
}
