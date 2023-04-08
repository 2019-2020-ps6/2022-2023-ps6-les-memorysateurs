import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ErreurPartagerThemeComponent } from './erreur-partager-theme.component';

describe('ErreurPartagerThemeComponent', () => {
  let component: ErreurPartagerThemeComponent;
  let fixture: ComponentFixture<ErreurPartagerThemeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ErreurPartagerThemeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ErreurPartagerThemeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
