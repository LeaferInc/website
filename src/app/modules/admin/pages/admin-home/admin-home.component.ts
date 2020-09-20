import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AdminService } from 'src/app/core/services/admin/admin.service';
import { Statistic } from 'src/app/shared/models/admin/admin';

@Component({
  selector: 'app-admin-home',
  templateUrl: './admin-home.component.html',
  styleUrls: ['./admin-home.component.scss'],
})
export class AdminHomeComponent implements OnInit, OnDestroy {
  public stats: Statistic;
  private sub: Subscription = new Subscription();

  constructor(private adminService: AdminService) {}

  ngOnInit(): void {
    this.sub.add(
      this.adminService.getStatistics().subscribe({
        next: (stats) => (this.stats = stats),
      })
    );
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}
