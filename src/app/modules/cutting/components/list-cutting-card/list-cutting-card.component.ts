import { Component, OnInit, Input, Output, EventEmitter, OnDestroy } from '@angular/core';
import { Cutting } from 'src/app/shared/models/cutting/cutting';
import { AuthService } from 'src/app/core/services/auth/auth.service';
import { NzDropdownMenuComponent, NzContextMenuService } from 'ng-zorro-antd/dropdown';
import { CuttingService } from 'src/app/core/services/cutting/cutting.service';
import { filter } from 'rxjs/operators';
import { Role } from 'src/app/shared/models/user/user';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-list-cutting-card',
  templateUrl: './list-cutting-card.component.html',
  styleUrls: ['./list-cutting-card.component.scss'],
})
export class ListCuttingCardComponent implements OnInit, OnDestroy {
  @Input() cutting: Cutting;
  @Output() cuttingDeleted: EventEmitter<number> = new EventEmitter();

  private sub: Subscription = new Subscription();

  constructor(
    private nzContextMenuService: NzContextMenuService,
    private cuttingService: CuttingService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {}

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  contextMenu($event: MouseEvent, menu: NzDropdownMenuComponent): void {
    this.sub.add(
      this.authService
        .getUserAuth()
        .pipe(filter((userAuth) => userAuth.user.role === Role.ADMIN))
        .subscribe({
          next: () => this.nzContextMenuService.create($event, menu),
        })
    );
  }

  closeMenu(): void {
    this.nzContextMenuService.close();
  }

  deleteCutting() {
    this.sub.add(
      this.cuttingService.delete(this.cutting.id).subscribe({
        next: () => {
          this.cuttingDeleted.emit(this.cutting.id);
        },
      })
    );
  }
}
