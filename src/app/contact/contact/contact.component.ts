import { Component, OnInit } from '@angular/core';
import { NgbModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { ConfirmUserService } from 'src/app/services/confirm-user.service';
import { UserService } from 'src/app/services/user.service';
import { ManagaUserPopupComponent } from '../managa-user-popup/managa-user-popup.component';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit{

  public ngbModalOptions: NgbModalOptions = {
    backdrop: 'static',
    keyboard: false,
    centered: true,
    windowClass: 'md-class',
  };

  userList: Array<any> = [];
  constructor(private userService: UserService, private modalService: NgbModal,
    private confirmPopup: ConfirmUserService) {
  }

  ngOnInit(): void {
    this.fetchUserList();
  }
  fetchUserList() {
    this.userService.getContacts().subscribe((resp: any) => {
      console.log(resp);
      this.userList = resp;
    })
  }

  onCreateContact() {
    this.ngbModalOptions.windowClass = 'app-create-user-popup';
    const modalRef = this.modalService.open(ManagaUserPopupComponent, this.ngbModalOptions);
    modalRef.componentInstance.userData = null;
    modalRef.componentInstance.title = "Create Contact";
    modalRef.componentInstance.refreshParent.subscribe((resp: any) => {
      this.fetchUserList();
    });
  }

  onUpdateContact(userData: any) {
    this.ngbModalOptions.windowClass = 'app-create-user-popup';
    const modalRef = this.modalService.open(ManagaUserPopupComponent, this.ngbModalOptions);
    modalRef.componentInstance.userData = userData;
    modalRef.componentInstance.title = "Update Contact";
    modalRef.componentInstance.refreshParent.subscribe((resp: any) => {
      this.fetchUserList();
    });
  }

  onDeleteContact(userData: any) {
    console.log(userData);
    let options = {
      title: `Are you sure, you want to <b>delete</b> the contact?`,
      confirmLabel: 'Yes',
      declineLabel: 'No',
    };

    this.confirmPopup.confirm(options).then((res: boolean) => {
      if (res) {
        this.userService.deleteContact(userData.id).subscribe((resp: any) => {
          this.fetchUserList();
        });
      }
    });

  }



}
