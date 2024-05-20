import {AfterViewInit, Component, inject, OnInit} from '@angular/core';
import {FormBuilder, ReactiveFormsModule, Validators} from "@angular/forms";
import {CurrencyPipe, DatePipe, JsonPipe, NgIf} from "@angular/common";
import {ReservationService} from "../../../services/reservation.service";
import {Router} from "@angular/router";
import {initFlowbite} from "flowbite";
import Swal from 'sweetalert2'
@Component({
  selector: 'app-form-reservation',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    JsonPipe,
    DatePipe,
    CurrencyPipe,
    NgIf
  ],
  templateUrl: './form-reservation.component.html',
  styleUrl: './form-reservation.component.scss'
})

export default class FormReservationComponent implements OnInit, AfterViewInit{
  ngOnInit(): void {
    initFlowbite()
    const room = localStorage.getItem('room');
    const hotel = localStorage.getItem('hotel');
    const dataPass = localStorage.getItem('dataPass');
    this.hotel = JSON.parse(hotel || "");
    this.room = JSON.parse(room || "");
    this.dataPass = JSON.parse(dataPass || "");
  }
  private fb = inject(FormBuilder);
  reservationService = inject(ReservationService);
  private router = inject(Router);
  room: any  = '';
  hotel: any  = '';
  dataPass: any  = '';
  loading = false;

  form = this.fb.group({
    name: this.fb.control('', [Validators.required]),
    lastname: this.fb.control('', [Validators.required]),
    type_id: this.fb.control('', [Validators.required]),
    identification: this.fb.control('', [Validators.required]),
    gender: this.fb.control('', [Validators.required]),
    email: this.fb.control('', [Validators.required]),
    date_birth: this.fb.control('', [Validators.required]),
    phone: this.fb.control('', [Validators.required]),
    pname: this.fb.control('', [Validators.required]),
    plastname: this.fb.control('', [Validators.required]),
    ptype_id: this.fb.control('', [Validators.required]),
    pidentification: this.fb.control('', [Validators.required]),
    pgender: this.fb.control('', [Validators.required]),
    p_date_birth: this.fb.control('', [Validators.required]),
    pemail: this.fb.control('', [Validators.required]),
    p_phone: this.fb.control('', [Validators.required]),
    e_fullname: this.fb.control('', [Validators.required]),
    e_phone: this.fb.control('', [Validators.required]),
  })

  onSave() {
    if (this.form.invalid) {
      return;
    }

    Swal.fire({
      title: "¿Guardar registro?",
      text: "¿Esta seguro de enviar los datos?",
      icon: "info",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#6f7b8f",
      confirmButtonText: "Si",
      cancelButtonText: 'No',
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {

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

        setTimeout(() => {
          this.reservationService.postCustomers(data).then((response) => {
            Swal.fire({
              position: "top-end",
              icon: "success",
              title: "Registro guardado correctamente",
              showConfirmButton: false,
              timer: 1500
            });
            this.loading = false;
            localStorage.removeItem('room');
            localStorage.removeItem('hotel');
            localStorage.removeItem('dataPass');
            this.router.navigateByUrl('/travels');

          })
        }, 2000)

      }
    });


  }

  ngAfterViewInit(): void {

  }

}
