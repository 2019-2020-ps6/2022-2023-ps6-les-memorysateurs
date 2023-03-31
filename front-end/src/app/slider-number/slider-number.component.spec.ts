import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SliderNumberComponent } from './slider-number.component';

describe('SliderNumberComponent', () => {
  let component: SliderNumberComponent;
  let fixture: ComponentFixture<SliderNumberComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SliderNumberComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SliderNumberComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
