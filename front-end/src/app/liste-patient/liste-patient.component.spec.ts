import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListePatientComponent } from './liste-patient.component';

describe('ListePatientComponent', () => {
  let component: ListePatientComponent;
  let fixture: ComponentFixture<ListePatientComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListePatientComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListePatientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
