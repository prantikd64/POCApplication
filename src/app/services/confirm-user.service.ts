import { Injectable } from '@angular/core';
import { NgbModal, NgbModalOptions, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { UserPopupComponent } from '../contact/user-popup/user-popup.component';

@Injectable({
  providedIn: 'root'
})
export class ConfirmUserService {

  modalRef: NgbModalRef | undefined;

  constructor(private modalService: NgbModal) { }

  confirm(options: any): Promise<any> {
    return new Promise((resolve, reject) => {

      let ngbModalOptions: NgbModalOptions = {
        //backdrop : 'static',
        keyboard : false,
        centered:true,
        windowClass:'md-class'
     };
     
      this.modalRef = this.modalService.open(UserPopupComponent,ngbModalOptions);
      this.modalRef.componentInstance.title = options.title;
      if(options.confirmLabel===undefined||options.confirmLabel==''){
        this.modalRef.componentInstance.confirmLabel = "YES";
      }else{
        this.modalRef.componentInstance.confirmLabel = options.confirmLabel;
      }

      if(options.declineLabel===undefined||options.declineLabel==''){
        this.modalRef.componentInstance.declineLabel = "NO";
      }else{
        this.modalRef.componentInstance.declineLabel = options.declineLabel;
      }

      if(options.caption===undefined||options.caption==''){
        this.modalRef.componentInstance.caption = "Confirmation";
      }else{
        this.modalRef.componentInstance.caption = options.caption;
      }

      this.modalRef.componentInstance.onClose.subscribe((result: boolean) => {
        resolve(result);
      });
      
    });

  }

}
