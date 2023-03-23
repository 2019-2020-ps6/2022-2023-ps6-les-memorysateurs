import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfilPatientComponent } from './profil-patient.component';

describe('ProfilPatientComponent', () => {
  let component: ProfilPatientComponent;
  let fixture: ComponentFixture<ProfilPatientComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProfilPatientComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProfilPatientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
