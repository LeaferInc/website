import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { CuttingService } from 'src/app/core/services/cutting/cutting.service';
import { Cutting } from 'src/app/shared/models/cutting/cutting';
import { AuthService } from 'src/app/core/services/auth/auth.service';
import { User } from 'src/app/shared/models/user/user';
import { combineLatest, Observable } from 'rxjs';
import { concatMap, tap } from 'rxjs/operators';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { RoomService } from 'src/app/core/services/room/room.service';
import { ParticipantService } from 'src/app/core/services/participant/participant.service';
import { MessageService } from 'src/app/core/services/message/message.service';
import { NzModalService } from 'ng-zorro-antd/modal';

@Component({
  selector: 'app-details-cutting',
  templateUrl: './details-cutting.component.html',
  styleUrls: ['./details-cutting.component.scss'],
})
export class DetailsCuttingComponent implements OnInit {
  public cutting: Cutting;
  public loading: boolean = true;
  public currentUser: User;
  public currentRoute: Params;
  public isOnEditMode: boolean = false;

  public updateCuttingForm = new FormGroup({
    nameInput: new FormControl('', [Validators.required]),
    descriptionInput: new FormControl('', [Validators.required]),
    tradeWithInput: new FormControl(''),
  });

  public offerForm = new FormGroup({
    offerInput: new FormControl(''),
  });

  public submitted = false;

  public modalOpen = false;

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private cuttingService: CuttingService,
    private authService: AuthService,
    private roomService: RoomService,
    private participantService: ParticipantService,
    private messageService: MessageService,
    private modal: NzModalService
  ) {}

  ngOnInit(): void {
    this.loading = true;

    combineLatest([this.activatedRoute.params, this.authService.getUserAuth()])
      .pipe(
        concatMap((res) => {
          this.currentRoute = res[0];
          this.currentUser = res[1].user;
          return this.cuttingService.findOne(res[0].id);
        })
      )
      .subscribe(
        (res) => {
          this.cutting = res;
          this.loading = false;
        },
        (err) => console.error(err)
      );
  }

  onEdit() {
    this.isOnEditMode = true;
    this.updateCuttingForm.patchValue({
      nameInput: this.cutting.name,
      descriptionInput: this.cutting.description,
      tradeWithInput: this.cutting.tradeWith,
    });
  }

  onDelete() {
    this.modal.confirm({
      nzTitle: 'Do you want to delete this cutting ?',
      nzContent: 'When clicked the OK button, this cutting will be deleted',
      nzOnOk: () =>
        new Observable((sub) => {
          this.cuttingService
            .delete(this.currentRoute.id)
            .pipe(tap(() => sub.complete()))
            .subscribe((res) => this.router.navigate(['cutting', 'inventory']));
        }).toPromise(),
    });
  }

  onConfirmEdit() {
    this.submitted = true;

    if (this.updateCuttingForm.invalid) {
      return;
    }

    const cutting: Cutting = new Cutting();
    cutting.name = this.updateCuttingForm.get('nameInput').value;
    (cutting.description = this.updateCuttingForm.get('descriptionInput').value),
      (cutting.tradeWith = this.updateCuttingForm.get('tradeWithInput').value);

    const newCutting = { ...this.cutting, ...cutting };

    this.cuttingService.edit(newCutting).subscribe((cutting) => {
      this.isOnEditMode = false;
      this.updateCuttingForm.reset();
      this.cutting = cutting;
    });
  }

  onCancelEdit() {
    this.isOnEditMode = false;
  }

  onOffer() {
    if (!this.offerForm.valid) {
      return;
    }

    const messageValue = this.updateCuttingForm.get('offerInput').value;

    this.participantService.createWithRoom(this.cutting.ownerId).subscribe((res: any) => {
      console.log('Yo', res);
      this.messageService.create({ message_content: messageValue, roomId: res.room.id }).subscribe((res) => {
        console.log('Ha', res);
        this.router.navigate(['chat', res.room.id]);
      });
    });
  }

  onSendMessage() {
    alert('onSendMessage');
  }

  showModal(): void {
    this.modalOpen = true;
  }

  handleCancel(): void {
    this.modalOpen = false;
  }
}
