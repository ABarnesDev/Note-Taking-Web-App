import { Component } from '@angular/core';
import {FormBuilder, ReactiveFormsModule, Validators} from "@angular/forms";
import {Router, RouterLink} from "@angular/router";
import {UserService} from "../../services/user.service";
import {MatError, MatFormField, MatLabel, MatSuffix} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {MatIconButton} from "@angular/material/button";
import {MatIcon} from "@angular/material/icon";


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    RouterLink,
    MatFormField,
    MatLabel,
    MatError,
    MatInput,
    MatIconButton,
    MatSuffix,
    MatIcon
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  passwordVisible: boolean = false;

  loginForm = this.formBuilder.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required]]
  });

  constructor(private formBuilder: FormBuilder, private userService: UserService, private router: Router) {
    // If the user is already logged in redirect them to the notes page
    this.userService.getUser().subscribe({
      next: (result: any) => {
        this.router.navigateByUrl('/notes');
      }
    })
  }

  togglePassword() {
    this.passwordVisible = !this.passwordVisible;
  }

  submitLogin() {
    this.userService.login(this.loginForm.value).subscribe({
      next: (result: any) => {
        // If the login was successful, redirect to the notes page
        this.userService.setToken(result.token);
        this.router.navigateByUrl('/notes');
      },
      error: err => {
        if (err.status === 400) {

          if (err.error.email) {
            this.loginForm.controls.email.setErrors({email: true});
          } else {
            this.loginForm.controls.password.setErrors({incorrectPassword: true});
          }

        } else if (err.status === 404) {
          this.loginForm.controls.email.setErrors({incorrectEmail: true});
        } else if (err.status === 401) {
          this.loginForm.controls.password.setErrors({incorrectPassword: true});
        }

      }
    });
  }
}
