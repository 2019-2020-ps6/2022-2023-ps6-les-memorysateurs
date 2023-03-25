import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InfoStadeComponent } from './info-stade.component';

describe('InfoStadeComponent', () => {
  let component: InfoStadeComponent;
  let fixture: ComponentFixture<InfoStadeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InfoStadeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InfoStadeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
