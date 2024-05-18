import {Component, inject} from '@angular/core';
import {RouterLink} from "@angular/router";
import {FormBuilder, ReactiveFormsModule} from "@angular/forms";

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
export default class FormHotelsComponent {
  private fb = inject(FormBuilder);

  form = this.fb.group({
    state: this.fb.control(true, []),
    name: this.fb.control(null, []),
    address: this.fb.control(null, []),
    city: this.fb.control(null, []),
    contact: this.fb.control(null, []),
    web: this.fb.control(null, []),
  })

  onSubmit() {
    if (this.form.invalid) {
      return;
    }

    console.log(this.form.getRawValue())


  }

}
