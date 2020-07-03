import { Component, OnInit } from '@angular/core';
import { Plant } from 'src/app/shared/models/plant/plant';
import { PlantService } from 'src/app/core/services/plant/plant.service';
import { ActivatedRoute } from '@angular/router';
import { switchMap, finalize, take, tap, catchError } from 'rxjs/operators';
import { PlantCollectionService } from 'src/app/core/services/plant-collection/plant-collection.service';
import { PlantCollection } from 'src/app/shared/models/plant-collection/plant-collection';
import { forkJoin, of } from 'rxjs';

@Component({
  selector: 'app-details-plant',
  templateUrl: './details-plant.component.html',
  styleUrls: ['./details-plant.component.scss'],
})
export class DetailsPlantComponent implements OnInit {
  public plant: Plant;
  public plantLoading = true;
  public plantCollection: PlantCollection;

  constructor(
    private plantService: PlantService,
    private plantCollectionService: PlantCollectionService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params
      .pipe(
        switchMap((params) => {
          return forkJoin(
            this.plantService.findById(params.id),
            this.plantCollectionService.findByPlantAndUser(params.id)
              .pipe(
                catchError((err) => {
                  return of<PlantCollection>(null);
                })
              )
          );
        }),
        finalize(() => this.plantLoading = false)
      )
      .subscribe({
        next: ([plant, plantCollection]) => {
          this.plant = plant;
          this.plantCollection = plantCollection;
          this.plantLoading = false;
        },
      });
  }

  onAddPlantInCollection() {
    this.plantCollectionService.create(this.plant.id).subscribe({
      next: (plantCollection) => this.plantCollection = plantCollection,
    });
  }

  onDeletePlantInCollection() {
    this.plantCollectionService
      .deleteByPlantId(this.plant.id)
      .subscribe({
        next: () => this.plantCollection = null
      });
  }
}
