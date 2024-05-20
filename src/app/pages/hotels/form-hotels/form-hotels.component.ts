import {Component, inject, OnInit} from '@angular/core';
import {ActivatedRoute, Router, RouterLink} from "@angular/router";
import {FormBuilder, ReactiveFormsModule, Validators} from "@angular/forms";
import {HotelsService} from "../../../services/hotels.service";
import {NgIf} from "@angular/common";
import Swal from "sweetalert2";

@Component({
  selector: 'app-form-hotels',
  standalone: true,
  imports: [
    RouterLink,
    ReactiveFormsModule,
    NgIf
  ],
  templateUrl: './form-hotels.component.html',
  styleUrl: './form-hotels.component.scss'
})
export default class FormHotelsComponent implements OnInit{
  private fb = inject(FormBuilder);
  private hotelService = inject(HotelsService);
  private activatedRoute = inject(ActivatedRoute);
  private router = inject(Router);
  private id: string | null = '';
  public title: string = '';
  public button: string = '';
  ngOnInit(): void {
      this.activatedRoute.paramMap.subscribe((params) => {
        this.id = params.get('id');
        this.form.patchValue(this.hotelService.selected());
        this.title = 'Actualización de hoteles';
        this.button = 'Actualizar';
      })

    if (this.router.url === '/hotels/create') {
      const form = {
        id: null,
        state: true,
        name: null,
        address: null,
        city: null,
        contact: null,
        web: null,
      }
      this.form.patchValue(form);
      this.title = 'Creación de hoteles';
      this.button = 'Guardar';
    }
  }

  form = this.fb.group({
    id: this.fb.control(null),
    state: this.fb.control(true, []),
    name: this.fb.control(null, [Validators.required]),
    address: this.fb.control(null, [Validators.required]),
    city: this.fb.control(null, [Validators.required]),
    contact: this.fb.control(null, [Validators.required]),
    web: this.fb.control(null, []),
  });

  onSubmit() {
    if (this.form.invalid) {
      return;
    }

    if (this.hotelService.selected() && this.id != null) {
      setTimeout(() => {
        this.hotelService.updateHotel(<any>{
          name: this.form.value.name ?? '',
          address: this.form.value.address ?? '',
          city: this.form.value.city ?? '',
          contact: this.form.value.contact ?? '',
          web: this.form.value.web ?? '',
          state: this.form.value.state ?? false,
          id: this.id
        }).then(() => {
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Registro guardado correctamente",
            showConfirmButton: false,
            timer: 1500
          });
          this.router.navigateByUrl('/hotels');
        })

      }, 2000)
    }else {
      setTimeout(() => {
        this.hotelService.postHotel({
          name: this.form.value.name ?? '',
          address: this.form.value.address ?? '',
          city: this.form.value.city ?? '',
          contact: this.form.value.contact ?? '',
          web: this.form.value.web ?? '',
          state: this.form.value.state ?? false
        }).then(() => {
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Registro guardado correctamente",
            showConfirmButton: false,
            timer: 1500
          });
          this.router.navigateByUrl('/hotels');
        })

      }, 2000)
    }


  }

}
