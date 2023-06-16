import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RedirectionComponent } from './redirection.component';

describe('RedirectionComponent', () => {
  let component: RedirectionComponent;
  let fixture: ComponentFixture<RedirectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RedirectionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RedirectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
