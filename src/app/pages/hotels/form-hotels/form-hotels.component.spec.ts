import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormHotelsComponent } from './form-hotels.component';

describe('FormHotelsComponent', () => {
  let component: FormHotelsComponent;
  let fixture: ComponentFixture<FormHotelsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormHotelsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FormHotelsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
