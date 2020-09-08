import { Component, OnInit } from '@angular/core';
import { RecognitionService } from 'src/app/core/services/recognition/recognition.service';
import { UploadFile } from 'ng-zorro-antd/upload';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { OrganFr, translateOrgan } from 'src/app/shared/models/recognition/organ';
import { NzMessageService } from 'ng-zorro-antd/message';
import { RecognitionResult, RecognitionSearch } from 'src/app/shared/models/recognition/recognition';
import { UtilsService } from 'src/app/core/services/utils/utils.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-recognition',
  templateUrl: './recognition.component.html',
  styleUrls: ['./recognition.component.scss']
})
export class RecognitionComponent implements OnInit {
  recognitionForm: FormGroup;
  imagePlant: UploadFile;
  submitted: boolean = false; // Whether or not the form has been sent
  result: RecognitionResult = null;
  notFound: boolean = false;

  constructor(private recognitionService: RecognitionService, private message: NzMessageService) { }

  ngOnInit(): void {
    this.recognitionForm = new FormGroup({
      organ: new FormControl(OrganFr.LEAF, [Validators.required]),
    });
  }

  /**
   * Submits the recognition form
   */
  async submit(): Promise<void> {
    for (const i in this.recognitionForm.controls) {
      this.recognitionForm.controls[i].markAsDirty();
      this.recognitionForm.controls[i].updateValueAndValidity();
    }

    // Required image
    if (!this.imagePlant) {
      this.message.error('Une image est requise');
      return;
    }

    if (this.recognitionForm.valid) {
      this.submitted = true;

      const recog = new RecognitionSearch();
      recog.organ = translateOrgan(this.recognitionForm.get('organ').value);
      recog.image = await UtilsService.toBase64(this.imagePlant);

      this.recognitionService.identifyPlant(recog).subscribe(
        (res: RecognitionResult) => {
          this.submitted = false;
          this.result = res;
          this.notFound = false;
        },
        (err: HttpErrorResponse) => {
          this.submitted = false;
          if (err.status === 404) {
            this.notFound = true;
            this.result = null;
          } else console.log(err);
        }
      )
    }
  }
}
