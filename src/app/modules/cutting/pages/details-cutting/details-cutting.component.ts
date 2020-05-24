import { Component, OnInit, OnDestroy, TemplateRef } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { CuttingService } from 'src/app/core/services/cutting/cutting.service';
import { Cutting } from 'src/app/shared/models/cutting/cutting';
import { AuthService } from 'src/app/core/services/auth/auth.service';
import { User } from 'src/app/shared/models/user/user';
import { Observable } from 'rxjs';
import { tap, switchMap } from 'rxjs/operators';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { MessageService } from 'src/app/core/services/message/message.service';
import { NzModalService, NzModalRef } from 'ng-zorro-antd/modal';
import { CreateDiscussion } from 'src/app/shared/models/message/message';

@Component({
  selector: 'app-details-cutting',
  templateUrl: './details-cutting.component.html',
  styleUrls: ['./details-cutting.component.scss'],
})
export class DetailsCuttingComponent implements OnInit, OnDestroy {
  public cutting: Cutting;
  public loading: boolean = true;
  public currentUser: User;
  public currentRoute: Params;
  public isOnEditMode: boolean = false;
  public tplModal: NzModalRef;

  public updateCuttingForm = new FormGroup({
    nameInput: new FormControl('', [Validators.required]),
    descriptionInput: new FormControl('', [Validators.required]),
    tradeWithInput: new FormControl(''),
  });

  public offerForm = new FormGroup({
    offerInput: new FormControl(''),
  });

  public submitted = false;

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private cuttingService: CuttingService,
    private authService: AuthService,
    private messageService: MessageService,
    private modal: NzModalService,
  ) {}

  ngOnInit(): void {
    this.loading = true;

    this.activatedRoute.params.pipe(
      tap(params => this.currentRoute = params.id),
      switchMap(params => this.cuttingService.findOne(params.id)),
      tap(cutting => this.cutting = cutting),
      switchMap(() => this.authService.getUserAuth())
    ).subscribe(
      (userAuth) => {
        this.currentUser = userAuth.user
        this.loading = false;
      },
      (err) => console.error(err)
    );
  }

  ngOnDestroy(): void {
    this.modal.closeAll();
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

    const message: CreateDiscussion = {
      messageContent: this.offerForm.get('offerInput').value,
      receiverId: this.cutting.ownerId
    }

    this.messageService.createDiscussion(message).subscribe({
      next: (message) => {
        this.tplModal.destroy();
        this.router.navigate(['chat', message.room.id]);
      }
    })
  }

  onSendMessage() {
    alert('onSendMessage');
  }

  createModal(tplContent: TemplateRef<{}>) {
    this.tplModal = this.modal.create({
      nzTitle: 'Message',
      nzContent: tplContent,
      nzOnOk: () => this.onOffer()
    });
  }
}
