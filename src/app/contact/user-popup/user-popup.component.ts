import { Component, EventEmitter, Output } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-user-popup',
  templateUrl: './user-popup.component.html',
  styleUrls: ['./user-popup.component.css']
})
export class UserPopupComponent {

  @Output() onClose = new EventEmitter<any>();

  caption: string | undefined;
  title: string | undefined;
  confirmLabel: string = "Yes";
  declineLabel: string = "No";

  constructor(public activeModal: NgbActiveModal,) {
    
  }
  public ngOnInit(): void { }

  confirm() {
    this.onClose.emit(true);
    this.activeModal.close('Override click');
  }

  decline() {
    this.onClose.emit(false);
    this.activeModal.close('Override click');
  }
  
}
