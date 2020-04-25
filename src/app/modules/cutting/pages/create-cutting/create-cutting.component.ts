import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { CuttingService } from 'src/app/core/services/cutting/cutting.service';
import { Cutting } from 'src/app/shared/models/cutting/cutting';

@Component({
  selector: 'app-create-cutting',
  templateUrl: './create-cutting.component.html',
  styleUrls: ['./create-cutting.component.scss']
})
export class CreateCuttingComponent implements OnInit {

  public nameInput = new FormControl('', Validators.required);
  public descriptionInput = new FormControl('', Validators.required);
  public tradeWithInput = new FormControl('');
  public photoInput = new FormControl('');

  public createCuttingForm = new FormGroup({
    nameInput: this.nameInput,
    descriptionInput: this.descriptionInput,
    tradeWithInput: this.tradeWithInput,
    photoInput: this.photoInput
  });

  public submitted: boolean = false;

  constructor(private cuttingService: CuttingService) { }

  ngOnInit(): void {
  }

  onSubmit() {

    this.submitted = true;

    if(this.createCuttingForm.invalid) {
      return;
    }

    const cutting: Cutting = new Cutting()
    cutting.name = this.nameInput.value,
    cutting.description = this.descriptionInput.value,
    // cutting.tradeWith = this.tradeWithInput.value

    this.cuttingService.create(cutting)
      .subscribe(
        (res: Cutting) => console.log(res),
        err => console.error(err)
      )
  }
}
