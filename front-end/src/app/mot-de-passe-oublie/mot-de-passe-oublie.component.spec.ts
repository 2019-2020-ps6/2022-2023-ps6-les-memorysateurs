import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MotDePasseOublieComponent } from './mot-de-passe-oublie.component';

describe('MotDePasseOublieComponent', () => {
  let component: MotDePasseOublieComponent;
  let fixture: ComponentFixture<MotDePasseOublieComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MotDePasseOublieComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MotDePasseOublieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
