import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { CuttingService } from 'src/app/core/services/cutting/cutting.service';
import { Cutting } from 'src/app/shared/models/cutting/cutting';
import { Router } from '@angular/router';
import { finalize } from 'rxjs/operators';
import { UploadFile } from 'ng-zorro-antd/upload';
import { UtilsService } from 'src/app/core/services/utils/utils.service';
import { NzMessageService } from 'ng-zorro-antd/message';

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
  newImage: UploadFile; // Picture of the cutting

  constructor(private router: Router, private cuttingService: CuttingService, private message: NzMessageService) { }

  async onSubmit() {
    this.submitted = true;

    for (const i in this.createCuttingForm.controls) {
      this.createCuttingForm.controls[i].markAsDirty();
      this.createCuttingForm.controls[i].updateValueAndValidity();
    }
    
    // Alert required image
    if (!this.newImage) {
      this.message.error('Une image est nécessaire');
      return;
    }


    if (this.createCuttingForm.invalid) {
      return;
    }

    const cutting: Cutting = new Cutting()
    cutting.name = this.createCuttingForm.get('nameInput').value;
    cutting.description = this.createCuttingForm.get('descriptionInput').value;
    cutting.tradeWith = this.createCuttingForm.get('tradeWithInput').value;

    // Handle avatar
    cutting.picture = await UtilsService.toBase64(this.newImage);

    this.btnLoading = true;

    this.cuttingService.create(cutting)
      .pipe(
        finalize(() => this.btnLoading = false)
      )
      .subscribe(
        (createdCutting: Cutting) => this.router.navigate(['cutting', createdCutting.id])
      );
  }
}
