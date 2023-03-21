import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreerPatientComponent } from './creer-patient.component';

describe('CreerPatientComponent', () => {
  let component: CreerPatientComponent;
  let fixture: ComponentFixture<CreerPatientComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreerPatientComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreerPatientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
