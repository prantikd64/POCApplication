import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagaUserPopupComponent } from './managa-user-popup.component';

describe('ManagaUserPopupComponent', () => {
  let component: ManagaUserPopupComponent;
  let fixture: ComponentFixture<ManagaUserPopupComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ManagaUserPopupComponent]
    });
    fixture = TestBed.createComponent(ManagaUserPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
