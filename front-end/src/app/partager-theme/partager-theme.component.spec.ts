import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PartagerThemeComponent } from './partager-theme.component';

describe('PartagerThemeComponent', () => {
  let component: PartagerThemeComponent;
  let fixture: ComponentFixture<PartagerThemeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PartagerThemeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PartagerThemeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
