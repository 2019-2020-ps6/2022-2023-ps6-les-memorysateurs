import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreerThemeComponent } from './creer-theme.component';

describe('CreerThemeComponent', () => {
  let component: CreerThemeComponent;
  let fixture: ComponentFixture<CreerThemeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreerThemeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreerThemeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
