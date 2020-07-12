/**
 * @author ddaninthe
 */

import { Component, OnInit } from '@angular/core';
import { Cutting } from 'src/app/shared/models/cutting/cutting';
import { CuttingService } from 'src/app/core/services/cutting/cutting.service';
import { PlantService } from 'src/app/core/services/plant/plant.service';
import { Plant } from 'src/app/shared/models/plant/plant';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  public plants: Plant[];
  public cuttings: Cutting[];

  constructor(
    private cuttingService: CuttingService,
    private plantService: PlantService,
  ) { }

  ngOnInit(): void {
    this.plantService.findAllExceptOwner(0, 6).subscribe((plants) => this.plants = plants.items);
    this.cuttingService.findAllExchange(0, 6).subscribe((cuttings) => this.cuttings = cuttings.items);
  }

}
