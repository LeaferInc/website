import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Cutting } from 'src/app/shared/models/cutting/cutting';
import { AuthService } from 'src/app/core/services/auth/auth.service';
import { NzDropdownMenuComponent, NzContextMenuService } from 'ng-zorro-antd/dropdown';
import { CuttingService } from 'src/app/core/services/cutting/cutting.service';
import { filter } from 'rxjs/operators';
import { Role } from 'src/app/shared/models/user/user';

@Component({
  selector: 'app-list-cutting-card',
  templateUrl: './list-cutting-card.component.html',
  styleUrls: ['./list-cutting-card.component.scss']
})
export class ListCuttingCardComponent implements OnInit {

  @Input() cutting: Cutting;
  @Output() cuttingDeleted: EventEmitter<number> = new EventEmitter();

  constructor(
    private nzContextMenuService: NzContextMenuService,
    private cuttingService: CuttingService,
    private authService: AuthService,
  ) { }

  ngOnInit(): void {
  }

  contextMenu($event: MouseEvent, menu: NzDropdownMenuComponent): void {
    this.authService
      .getUserAuth()
      .pipe(
        filter((userAuth) => userAuth.user.role === Role.ADMIN)
      )
      .subscribe({
        next: () => this.nzContextMenuService.create($event, menu)
      });
  }

  closeMenu(): void {
    this.nzContextMenuService.close();
  }

  deleteCutting() {
    this.cuttingService.delete(this.cutting.id).subscribe({
      next: () => {
        this.cuttingDeleted.emit(this.cutting.id);
      }
    });
  }
}
