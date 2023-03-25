import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreerMemoryComponent } from './creer-memory.component';

describe('CreerMemoryComponent', () => {
  let component: CreerMemoryComponent;
  let fixture: ComponentFixture<CreerMemoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreerMemoryComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreerMemoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
