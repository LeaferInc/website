import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { CuttingService } from 'src/app/core/services/cutting/cutting.service';
import { Cutting } from 'src/app/shared/models/cutting/cutting';
import { Router } from '@angular/router';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-create-cutting',
  templateUrl: './create-cutting.component.html',
  styleUrls: ['./create-cutting.component.scss']
})
export class CreateCuttingComponent {
  public createCuttingForm = new FormGroup({
    nameInput: new FormControl('', Validators.required),
    descriptionInput: new FormControl('', Validators.required),
    tradeWithInput: new FormControl(''),
  });

  public submitted: boolean = false;
  public btnLoading: boolean = false;

  constructor(private router: Router, private cuttingService: CuttingService) { }

  onSubmit() {
    this.submitted = true;

    for (const i in this.createCuttingForm.controls) {
      this.createCuttingForm.controls[i].markAsDirty();
      this.createCuttingForm.controls[i].updateValueAndValidity();
    }

    if(this.createCuttingForm.invalid) {
      return;
    }

    const cutting: Cutting = new Cutting()
    cutting.name = this.createCuttingForm.get('nameInput').value,
    cutting.description = this.createCuttingForm.get('descriptionInput').value,
    cutting.tradeWith = this.createCuttingForm.get('tradeWithInput').value

    this.btnLoading = true;

    this.cuttingService.create(cutting)
      .pipe(
        finalize(() => this.btnLoading = false)
      )
      .subscribe(
        (cuttingNewlyCreated: Cutting) => this.router.navigate(['cutting', cuttingNewlyCreated.id]),
      )
  }
}
