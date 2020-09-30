import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { PlantService } from 'src/app/core/services/plant/plant.service';
import { finalize } from 'rxjs/operators';
import { Plant, Difficulty, Time } from 'src/app/shared/models/plant/plant';
import { Router } from '@angular/router';
import { UploadFile } from 'ng-zorro-antd/upload';
import { UtilsService } from 'src/app/core/services/utils/utils.service';
import { NzMessageService } from 'ng-zorro-antd/message';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-create-plant',
  templateUrl: './create-plant.component.html',
  styleUrls: ['./create-plant.component.scss'],
})
export class CreatePlantComponent implements OnInit, OnDestroy {
  public btnLoading = false;
  newImage: UploadFile; // Picture of the plant;

  formatterPercent = (value: number) => value ? `${value} %` : '';
  parserPercent = (value: string) => value ? value.replace(' %', '') : '';

  public createPlantForm = new FormGroup({
    plantName: new FormControl('', Validators.required),
    height: new FormControl(1, [Validators.required]),
    difficulty: new FormControl(Difficulty.EASY, [Validators.required]),
    wateringFrequencySpringToSummerNumber: new FormControl(),
    wateringFrequencyAutumnToWinterNumber: new FormControl(),
    wateringFrequencySpringToSummer: new FormControl(Time.DAY),
    wateringFrequencyAutumnToWinter: new FormControl(Time.DAY),
    exposure: new FormControl(),
    humidityMin: new FormControl(),
    humidityMax: new FormControl(),
    potting: new FormControl(),
    toxicity: new FormControl(false),
  });

  private sub: Subscription = new Subscription();

  constructor(private router: Router, private plantService: PlantService, private message: NzMessageService) {}

  ngOnInit(): void {}

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  public formatterCentimeter(value: number) {
    return value ? `${value} cm` : '';
  }

  public parserCentimeter(value: string) {
    return Number(value.replace(' cm', ''));
  }

  public async onSubmit() {
    for (const i in this.createPlantForm.controls) {
      this.createPlantForm.controls[i].markAsDirty();
      this.createPlantForm.controls[i].updateValueAndValidity();
    }

    // Alert required image
    if (!this.newImage) {
      this.message.error('Une image est nécessaire');
      return;
    }

    if (this.createPlantForm.invalid) {
      return;
    }

    const plant = new Plant();
    plant.name = this.createPlantForm.get('plantName').value;
    plant.height = this.createPlantForm.get('height').value;
    plant.difficulty = this.createPlantForm.get('difficulty').value;
    plant.wateringFrequencySpringToSummerNumber =
      this.createPlantForm.get('wateringFrequencySpringToSummerNumber').value || null;
    plant.wateringFrequencyAutumnToWinterNumber =
      this.createPlantForm.get('wateringFrequencyAutumnToWinterNumber').value || null;
    if (plant.wateringFrequencySpringToSummerNumber) {
      plant.wateringFrequencySpringToSummer = this.createPlantForm.get('wateringFrequencySpringToSummer').value;
    }
    if (plant.wateringFrequencyAutumnToWinterNumber) {
      plant.wateringFrequencyAutumnToWinter = this.createPlantForm.get('wateringFrequencyAutumnToWinter').value;
    }
    plant.exposure = this.createPlantForm.get('exposure').value;
    plant.humidityMin = this.createPlantForm.get('humidityMin').value;
    plant.humidityMax = this.createPlantForm.get('humidityMax').value;
    plant.potting = this.createPlantForm.get('potting').value;
    plant.toxicity = this.createPlantForm.get('toxicity').value;

    // Handle avatar
    plant.picture = await UtilsService.toBase64(this.newImage);

    this.btnLoading = true;

    this.sub.add(
      this.plantService
        .createPlant(plant)
        .pipe(finalize(() => (this.btnLoading = false)))
        .subscribe(
          (createdPlant: Plant) => this.router.navigate(['plant', createdPlant.id]),
          (err) => console.error(err)
        )
    );
  }
}
