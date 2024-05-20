import {Component, inject} from '@angular/core';
import {FormBuilder, ReactiveFormsModule, Validators} from "@angular/forms";
import {Router, RouterLink} from "@angular/router";
import {AuthService} from "../../services/auth.service";
import Swal from "sweetalert2";
import {NgIf} from "@angular/common";

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [RouterLink, ReactiveFormsModule, NgIf],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss'
})
export default class SignupComponent {
  private fb = inject(FormBuilder);
  private authService = inject(AuthService);
  private router = inject(Router);

  form = this.fb.group({
    email: this.fb.control(null, [Validators.required]),
    password: this.fb.control(null, [Validators.required])
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

      this.router.navigateByUrl('/auth/login');
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Usuario creado con exito!!!",
        showConfirmButton: false,
        timer: 1500
      });
    }catch (error) {
      console.log(error)
    }


  }

}
