import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GridReservationComponent } from './grid-reservation.component';

describe('GridReservationComponent', () => {
  let component: GridReservationComponent;
  let fixture: ComponentFixture<GridReservationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GridReservationComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GridReservationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
