import {AfterViewInit, Component, inject} from '@angular/core';
import {FormBuilder, ReactiveFormsModule} from "@angular/forms";
import {CurrencyPipe, DatePipe, JsonPipe} from "@angular/common";
import {ReservationService} from "../../../services/reservation.service";

@Component({
  selector: 'app-form-reservation',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    JsonPipe,
    DatePipe,
    CurrencyPipe
  ],
  templateUrl: './form-reservation.component.html',
  styleUrl: './form-reservation.component.scss'
})

export default class FormReservationComponent implements AfterViewInit{
  private fb = inject(FormBuilder);
  reservationService = inject(ReservationService);
  room: any  = '';
  hotel: any  = '';
  dataPass: any  = '';

  form = this.fb.group({
    name: this.fb.control('', []),
    lastname: this.fb.control('', []),
    type_id: this.fb.control('', []),
    identification: this.fb.control('', []),
    gender: this.fb.control('', []),
    email: this.fb.control('', []),
    date_birth: this.fb.control('', []),
    phone: this.fb.control('', []),
    pname: this.fb.control('', []),
    plastname: this.fb.control('', []),
    ptype_id: this.fb.control('', []),
    pidentification: this.fb.control('', []),
    pgender: this.fb.control('', []),
    p_date_birth: this.fb.control('', []),
    pemail: this.fb.control('', []),
    p_phone: this.fb.control('', []),
    e_fullname: this.fb.control('', []),
    e_phone: this.fb.control('', []),
  })

  onSave() {
    if (this.form.invalid) {
      return;
    }
    console.log(this.form.value)

    this.reservationService.postCustomers(this.form.value);


  }

  ngAfterViewInit(): void {
    const room = localStorage.getItem('room');
    const hotel = localStorage.getItem('hotel');
    const dataPass = localStorage.getItem('dataPass');
    this.hotel = JSON.parse(hotel || "");
    this.room = JSON.parse(room || "");
    this.dataPass = JSON.parse(dataPass || "");
    console.log(this.dataPass)
  }

}
