import {Component, inject, OnInit} from '@angular/core';
import {ActivatedRoute, RouterLink} from "@angular/router";
import {FormBuilder, ReactiveFormsModule} from "@angular/forms";
import {HotelsService} from "../../../services/hotels.service";

@Component({
  selector: 'app-form-hotels',
  standalone: true,
  imports: [
    RouterLink,
    ReactiveFormsModule
  ],
  templateUrl: './form-hotels.component.html',
  styleUrl: './form-hotels.component.scss'
})
export default class FormHotelsComponent implements OnInit{
  private fb = inject(FormBuilder);
  private hotelService = inject(HotelsService);
  private activatedRoute = inject(ActivatedRoute);
  private id: string | null = '';
  ngOnInit(): void {
      this.activatedRoute.paramMap.subscribe((params) => {
        this.id = params.get('id');
        this.form.patchValue(this.hotelService.selected());
      })
  }

  form = this.fb.group({
    id: this.fb.control(null),
    state: this.fb.control(true, []),
    name: this.fb.control(null, []),
    address: this.fb.control(null, []),
    city: this.fb.control(null, []),
    contact: this.fb.control(null, []),
    web: this.fb.control(null, []),
  });

  onSubmit() {
    if (this.form.invalid) {
      return;
    }

    if (this.hotelService.selected() && this.id != null) {
      this.hotelService.updateHotel(<any>{
        name: this.form.value.name ?? '',
        address: this.form.value.address ?? '',
        city: this.form.value.city ?? '',
        contact: this.form.value.contact ?? '',
        web: this.form.value.web ?? '',
        state: this.form.value.state ?? false,
        id: this.id
      })
    }else {
      this.hotelService.postHotel({
        name: this.form.value.name ?? '',
        address: this.form.value.address ?? '',
        city: this.form.value.city ?? '',
        contact: this.form.value.contact ?? '',
        web: this.form.value.web ?? '',
        state: this.form.value.state ?? false
      })
    }


  }

}
