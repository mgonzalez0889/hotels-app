import {AfterViewInit, Component, inject} from '@angular/core';
import {FormBuilder, ReactiveFormsModule, Validators} from "@angular/forms";
import {HotelsService} from "../../../services/hotels.service";
import {ActivatedRoute, Router, RouterLink} from "@angular/router";
import {RoomsService} from "../../../services/rooms.service";
import {TaxesService} from "../../../services/taxes.service";
import Swal from "sweetalert2";
import {NgIf} from "@angular/common";

@Component({
  selector: 'app-form-rooms',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    RouterLink,
    NgIf,
  ],
  templateUrl: './form-rooms.component.html',
  styleUrl: './form-rooms.component.scss'
})
export default class FormRoomsComponent implements AfterViewInit{

  private fb = inject(FormBuilder);
  hotelService = inject(HotelsService);
  private activatedRoute = inject(ActivatedRoute);
  roomService = inject(RoomsService);
  taxeService = inject(TaxesService);
  private router = inject(Router)
  private id: string | null = '';
  public title: string = '';
  public button: string = '';

  ngAfterViewInit(): void {
    this.roomService.getAllTypes();
    this.taxeService.getAllTaxes();
    this.hotelService.getAllHotels();
    this.activatedRoute.paramMap.subscribe((params) => {
      this.id = params.get('id');
      this.form.patchValue(this.roomService.selected());
      this.title = 'Actualizar habitación';
      this.button = 'Actualizar';
    });

    if (this.router.url === '/bedrooms/create') {
      const form = {
        id: null,
        state: true,
        hotel_id: null,
        name: null,
        id_type_room: null,
        price_base: null,
        available: true,
        id_taxe: null,
        location: null
      }
      this.form.patchValue(form);
      this.title = 'Creación de habitación';
      this.button = 'Guardar';
    }
  }

  form = this.fb.group({
    id: this.fb.control(null),
    state: this.fb.control(true, []),
    hotel_id: this.fb.control(null, [Validators.required]),
    name: this.fb.control(null, [Validators.required]),
    id_type_room: this.fb.control(null, [Validators.required]),
    price_base: this.fb.control(null, [Validators.required]),
    available: this.fb.control(true, []),
    id_taxe: this.fb.control(null, [Validators.required]),
    location: this.fb.control(null, [Validators.required]),
  });

  onSubmit() {
    if (this.form.invalid) {
      return;
    }

    if (this.roomService.selected() && this.id != null) {
      setTimeout(() => {
        this.roomService.updateRoom(<any>{
          state: this.form.value.state ?? true,
          hotel_id: this.form.value.hotel_id ?? 0,
          name: this.form.value.name ?? '',
          id_type_room: this.form.value.id_type_room ?? 0,
          price_base: this.form.value.price_base ?? 0,
          available: this.form.value.available ?? true,
          id_taxe: this.form.value.id_taxe ?? 0,
          location: this.form.value.location ?? '',
          id: this.id
        }).then(() => {
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Registro guardado correctamente",
            showConfirmButton: false,
            timer: 1500
          });
          this.router.navigateByUrl('/bedrooms');
        })

      },2000)
    }else {
      setTimeout(() => {
        this.roomService.postRoom({
          state: this.form.value.state ?? true,
          hotel_id: this.form.value.hotel_id ?? 0,
          name: this.form.value.name ?? '',
          id_type_room: this.form.value.id_type_room ?? 0,
          price_base: this.form.value.price_base ?? 0,
          available: this.form.value.available ?? true,
          id_taxe: this.form.value.id_taxe ?? 0,
          location: this.form.value.location ?? ''
        }).then(() => {
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Registro guardado correctamente",
            showConfirmButton: false,
            timer: 1500
          });
          this.router.navigateByUrl('/bedrooms');
        })

      }, 2000)
    }


  }

}
