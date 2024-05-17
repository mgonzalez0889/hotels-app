import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GridHotelsComponent } from './grid-hotels.component';

describe('GridHotelsComponent', () => {
  let component: GridHotelsComponent;
  let fixture: ComponentFixture<GridHotelsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GridHotelsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GridHotelsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
