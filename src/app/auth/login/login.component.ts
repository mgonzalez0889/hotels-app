import {Component, inject} from '@angular/core';
import {FormBuilder, ReactiveFormsModule} from "@angular/forms";
import {AuthService} from "../../services/auth.service";
import {Router, RouterLink} from "@angular/router";

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export default class LoginComponent {

  private fb = inject(FormBuilder);
  private authService = inject(AuthService);
  private router = inject(Router);

  form = this.fb.group({
    email: this.fb.control(null, []),
    password: this.fb.control(null, [])
  })

  async onSubmit() {
    if (this.form.invalid) {
      return;
    }

    let form = {
      ...this.form.getRawValue()
    }

    try {
      const {data, error} = await this.authService.login({
        email: form.email ?? '',
        password: form.password ?? ''
      })
      if (error) throw error;
      this.router.navigateByUrl('/hotels');

    }catch (eror) {
      if (eror instanceof  Error) {
        console.log(eror);
      }
    }



  }

}
