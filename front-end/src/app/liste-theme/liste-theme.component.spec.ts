import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListeThemeComponent } from './liste-theme.component';

describe('ListeThemeComponent', () => {
  let component: ListeThemeComponent;
  let fixture: ComponentFixture<ListeThemeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListeThemeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListeThemeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
