import { Component, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { BehaviorSubject } from 'rxjs';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-managa-user-popup',
  templateUrl: './managa-user-popup.component.html',
  styleUrls: ['./managa-user-popup.component.css']
})

export class ManagaUserPopupComponent implements OnInit{

  _refresh = new BehaviorSubject<any>({});
  
  @Output() refreshParent = this._refresh.asObservable();
  @Input() public userData: any;
  @Input() public title: any;

  public saveUserForm: FormGroup;
  constructor(public activeModal: NgbActiveModal, private formBuilder: FormBuilder, 
    private userService: UserService) {

    this.saveUserForm = this.formBuilder.group({
      id: [0],
      firstName: ['', [Validators.required, Validators.maxLength(100)]],
      lastName: ['', [Validators.required, Validators.maxLength(100)]],
      email: ['', [Validators.required, Validators.email]]
    });
  }

  get id() { return this.saveUserForm.get("id"); }
  get firstName() { return this.saveUserForm.get("firstName"); }
  get lastName() { return this.saveUserForm.get("lastName"); }
  get email() { return this.saveUserForm.get("email"); }

  ngOnInit(): void {
    if (this.userData) {
      this.id?.setValue(this.userData.id);
      this.firstName?.setValue(this.userData.firstName);
      this.lastName?.setValue(this.userData.lastName);
      this.email?.setValue(this.userData.email);
    }
  }

  onSaveUser() {
    if (this.saveUserForm.invalid) {
      return;
    }

    let payload = this.saveUserForm.value;
    console.log(payload);
    if (this.userData) {
      this.editUser(payload);
    } else {
      this.addUser(payload);
    }
  }
  addUser(payload: any) {
    
    this.userService.createContact(payload).subscribe((resp: any) => {
      this._refresh.next({
        responseCode: "E000",
        responseMessage: "Success"
      });
      this.activeModal.close('Override click');
    }, (error: any) => {
      console.log(error);
      this._refresh.next({
        responseCode: "E001",
        responseMessage: "Failed"
      });
      this.activeModal.close('Override click');
    })
  }

  editUser(payload: any) {
    this.userService.updateContact(payload).subscribe((resp: any) => {
      this._refresh.next({
        responseCode: "E000",
        responseMessage: "Success"
      });
      this.activeModal.close('Override click');
    }, (error: any) => {
      console.log(error);
      this._refresh.next({
        responseCode: "E001",
        responseMessage: "Failed"
      });
      this.activeModal.close('Override click');
    })
  }

}
