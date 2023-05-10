import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ErreurCreerPatientComponent } from './erreur-creer-patient.component';

describe('ErreurCreerPatientComponent', () => {
  let component: ErreurCreerPatientComponent;
  let fixture: ComponentFixture<ErreurCreerPatientComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ErreurCreerPatientComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ErreurCreerPatientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
