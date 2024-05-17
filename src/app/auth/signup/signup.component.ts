import {Component, inject} from '@angular/core';
import {FormBuilder, ReactiveFormsModule} from "@angular/forms";
import {RouterLink} from "@angular/router";
import {AuthService} from "../../services/auth.service";

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [RouterLink, ReactiveFormsModule],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss'
})
export default class SignupComponent {
  private fb = inject(FormBuilder);
  private authService = inject(AuthService);

  form = this.fb.group({
    email: this.fb.control(null, []),
    password: this.fb.control(null, [])
  })

  async onSubmit() {
    if (this.form.invalid) {
      return;
    }

    let data = {
      ...this.form.getRawValue()
    }

    try {
      const authResponse = await this.authService.signUp({
        email: data.email ?? '',
        password: data.password ?? ''
      })

      console.log(authResponse);
    }catch (error) {
      console.log(error)
    }


  }

}
