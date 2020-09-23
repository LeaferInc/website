import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { NzMessageService } from 'ng-zorro-antd/message';
import { HttpErrorResponse } from '@angular/common/http';
import { BestPlantResult, BestPlantSearch } from 'src/app/shared/models/best-plant/best-plant.model';
import { BestPlantService } from 'src/app/core/services/best-plant/best-plant.service';

@Component({
  selector: 'app-best-plant',
  templateUrl: './best-plant.component.html',
  styleUrls: ['./best-plant.component.scss']
})
export class BestPlantComponent implements OnInit {
  bestPlantForm: FormGroup;
  submitted: boolean = false; // Whether or not the form has been sent
  result: BestPlantResult = null;

  constructor(private bestPlantService: BestPlantService, private message: NzMessageService) { }

  ngOnInit(): void {
    this.bestPlantForm = new FormGroup({
      careTime: new FormControl('suffisamment', [Validators.required]),
      weather: new FormControl('ensoleillé', [Validators.required]),
      space: new FormControl(false, [Validators.required]),
      budget: new FormControl(20, [Validators.required]),
      hasPet: new FormControl(false, [Validators.required]),
    });
  }

  /**
   * Submits the best-plant form
   */
  async submit(): Promise<void> {
    for (const i in this.bestPlantForm.controls) {
      this.bestPlantForm.controls[i].markAsDirty();
      this.bestPlantForm.controls[i].updateValueAndValidity();
    }

    if (this.bestPlantForm.valid) {
      const form: BestPlantSearch = this.bestPlantForm.value;

      // Budget check
      if (form.budget < 1) {
        this.message.error('Prix incorret');
        return;
      }

      this.submitted = true;
      this.bestPlantService.findBestPlant(this.bestPlantForm.value).subscribe(
        (res: BestPlantResult) => {
          this.submitted = false;
          this.result = res;
        },
        (err: HttpErrorResponse) => {
          this.submitted = false;
          console.log(err);
        }
      );
    }
  }
}
