import {AfterViewInit, Component, inject, OnInit} from '@angular/core';
import {FormBuilder, ReactiveFormsModule} from "@angular/forms";
import {CurrencyPipe, DatePipe, JsonPipe} from "@angular/common";
import {ReservationService} from "../../../services/reservation.service";
import {Router} from "@angular/router";
import {initFlowbite} from "flowbite";

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

export default class FormReservationComponent implements OnInit, AfterViewInit{
  ngOnInit(): void {
    initFlowbite()
  }
  private fb = inject(FormBuilder);
  reservationService = inject(ReservationService);
  private router = inject(Router);
  room: any  = '';
  hotel: any  = '';
  dataPass: any  = '';
  loading = false;

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

    let data = {
      ...this.form.value,
      hotel_id: this.hotel.id,
      room_id: this.room.id,
      check_in: this.dataPass.check_in,
      check_out: this.dataPass.check_out,
      status: true,
      price: this.room.price_base
    }

    setTimeout(() => {
      this.loading = true;
    }, 2000)

    console.log(data)

    setTimeout(() => {
      this.reservationService.postCustomers(this.form.value).then((response) => {
        this.loading = false;
        localStorage.removeItem('room');
        localStorage.removeItem('hotel');
        localStorage.removeItem('dataPass');
        this.router.navigateByUrl('/travels');

      })
    }, 2000)


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
