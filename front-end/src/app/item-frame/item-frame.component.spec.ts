import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemFrameComponent } from './item-frame.component';

describe('ThemeComponent', () => {
  let component: ItemFrameComponent;
  let fixture: ComponentFixture<ItemFrameComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ItemFrameComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ItemFrameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
