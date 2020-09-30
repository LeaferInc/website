import { Component, OnInit, Input, Output, EventEmitter, OnDestroy } from '@angular/core';
import { Plant } from 'src/app/shared/models/plant/plant';
import { NzContextMenuService, NzDropdownMenuComponent } from 'ng-zorro-antd/dropdown';
import { AuthService } from 'src/app/core/services/auth/auth.service';
import { filter } from 'rxjs/operators';
import { Role } from 'src/app/shared/models/user/user';
import { PlantService } from 'src/app/core/services/plant/plant.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-plant-card',
  templateUrl: './plant-card.component.html',
  styleUrls: ['./plant-card.component.scss'],
})
export class PlantCardComponent implements OnInit, OnDestroy {
  @Input() plant: Plant;
  @Output() plantDeleted: EventEmitter<number> = new EventEmitter();

  private sub: Subscription = new Subscription();

  constructor(
    private nzContextMenuService: NzContextMenuService,
    private plantService: PlantService,
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

  deletePlant() {
    this.sub.add(
      this.plantService.delete(this.plant.id).subscribe({
        next: () => {
          this.plantDeleted.emit(this.plant.id);
        },
      })
    );
  }
}
