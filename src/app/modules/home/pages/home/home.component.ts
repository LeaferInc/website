/**
 * @author ddaninthe
 */

import { Component, OnDestroy, OnInit } from '@angular/core';
import { Cutting } from 'src/app/shared/models/cutting/cutting';
import { CuttingService } from 'src/app/core/services/cutting/cutting.service';
import { PlantService } from 'src/app/core/services/plant/plant.service';
import { Plant } from 'src/app/shared/models/plant/plant';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit, OnDestroy {
  public plants: Plant[];
  public cuttings: Cutting[];

  private sub: Subscription = new Subscription();

  constructor(private cuttingService: CuttingService, private plantService: PlantService) {}

  ngOnInit(): void {
    this.sub.add(this.plantService.findAllExceptOwner(0, 6).subscribe((plants) => (this.plants = plants.items)));
    this.sub.add(this.cuttingService.findAllExchange(0, 6).subscribe((cuttings) => (this.cuttings = cuttings.items)));
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}
