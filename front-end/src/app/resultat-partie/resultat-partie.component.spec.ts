import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResultatPartieComponent } from './resultat-partie.component';

describe('ResultatPartieComponent', () => {
  let component: ResultatPartieComponent;
  let fixture: ComponentFixture<ResultatPartieComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ResultatPartieComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ResultatPartieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
