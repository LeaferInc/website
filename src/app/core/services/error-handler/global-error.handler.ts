import { ErrorHandler, Injectable } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd/message';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable()
export class GlobalErrorHandler implements ErrorHandler {
  
  constructor(private nzMessage: NzMessageService) {}

  handleError(error: Error | HttpErrorResponse) {

    console.error(error);

    if(error instanceof HttpErrorResponse) {
      if(error.error && error.error.message && error.error.message instanceof Array) {
        error.error.message.forEach(element => {
          if(typeof element === 'string') {
            this.nzMessage.error(element);
          }
        });
      } else if (error.error && error.error.message && typeof error.error.message === 'string') {
        this.nzMessage.error(error.error.message);
      } else {
        console.error('GlobalErrorHandler can\'t handle this HttpErrorResponse');
      }
    } else if(error instanceof Error) {
      this.nzMessage.error(error.message);
    } else {
      console.error('GlobalErrorHandler can\'t handle this Error');
    }
  }

}