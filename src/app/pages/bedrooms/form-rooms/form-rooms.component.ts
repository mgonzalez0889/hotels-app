import {AfterViewInit, Component, inject} from '@angular/core';
import {FormBuilder, ReactiveFormsModule} from "@angular/forms";
import {HotelsService} from "../../../services/hotels.service";
import {ActivatedRoute} from "@angular/router";
import {RoomsService} from "../../../services/rooms.service";
import {TaxesService} from "../../../services/taxes.service";

@Component({
  selector: 'app-form-rooms',
  standalone: true,
  imports: [
    ReactiveFormsModule
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
  private id: string | null = '';

  ngAfterViewInit(): void {
    this.roomService.getAllTypes();
    this.taxeService.getAllTaxes();
    this.hotelService.getAllHotels();
    this.activatedRoute.paramMap.subscribe((params) => {
      this.id = params.get('id');
      this.form.patchValue(this.roomService.selected());
    })
  }

  form = this.fb.group({
    id: this.fb.control(null),
    state: this.fb.control(true, []),
    hotel_id: this.fb.control(null, []),
    name: this.fb.control(null, []),
    id_type_room: this.fb.control(null, []),
    price_base: this.fb.control(null, []),
    available: this.fb.control(true, []),
    id_taxe: this.fb.control(null, []),
    location: this.fb.control(null, []),
  });

  onSubmit() {
    if (this.form.invalid) {
      return;
    }

    if (this.roomService.selected() && this.id != null) {
      console.log(this.roomService.selected())
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
      });
    }else {
      console.log('Es el post')
      this.roomService.postRoom({
        state: this.form.value.state ?? true,
        hotel_id: this.form.value.hotel_id ?? 0,
        name: this.form.value.name ?? '',
        id_type_room: this.form.value.id_type_room ?? 0,
        price_base: this.form.value.price_base ?? 0,
        available: this.form.value.available ?? true,
        id_taxe: this.form.value.id_taxe ?? 0,
        location: this.form.value.location ?? ''
      });
    }


  }

}
