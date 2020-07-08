
/**
 * @author ddaninthe
 */
import { Component, OnInit, Output, Input, EventEmitter,  } from '@angular/core';
import { UploadFile } from 'ng-zorro-antd/upload';

/**
 * This class handles an image picker
 */
@Component({
  selector: 'app-image-picker',
  templateUrl: './image-picker.component.html',
  styleUrls: ['./image-picker.component.scss']
})
export class ImagePickerComponent implements OnInit {

  @Input('label') label: string; // The input label
  @Input('required') required: boolean = false; // Whether the label should be prefixed with a star
  @Output('picked') picker = new EventEmitter<UploadFile>();

  image: UploadFile;

  constructor() { }

  ngOnInit(): void { }

  handleFile = (file: UploadFile): boolean => {
    this.image = file;
    this.picker.emit(file);
    return false;
  }
}
