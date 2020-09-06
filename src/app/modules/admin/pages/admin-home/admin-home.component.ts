import { Component, OnInit } from '@angular/core';
import { AdminService } from 'src/app/core/services/admin/admin.service';
import { Statistic } from 'src/app/shared/models/admin/admin';

@Component({
  selector: 'app-admin-home',
  templateUrl: './admin-home.component.html',
  styleUrls: ['./admin-home.component.scss']
})
export class AdminHomeComponent implements OnInit {

  public stats: Statistic;

  constructor(
    private adminService: AdminService
  ) { }

  ngOnInit(): void {
    this.adminService
      .getStatistics()
      .subscribe({
        next: (stats) => this.stats = stats
      })
  }

}
