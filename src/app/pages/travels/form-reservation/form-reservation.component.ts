import {Component, inject} from '@angular/core';
import {FormBuilder, ReactiveFormsModule} from "@angular/forms";
import {JsonPipe} from "@angular/common";

@Component({
  selector: 'app-form-reservation',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    JsonPipe
  ],
  templateUrl: './form-reservation.component.html',
  styleUrl: './form-reservation.component.scss'
})
export default class FormReservationComponent {
  private fb = inject(FormBuilder);

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




  }

}
