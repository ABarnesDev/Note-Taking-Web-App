import { Component } from '@angular/core';
import {FormBuilder, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {UserService} from "../../services/user.service";
import {Router, RouterLink} from "@angular/router";
import {MatError, MatFormField, MatHint, MatLabel, MatSuffix} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {PasswordValidator} from "../../validators/password-validator";
import {MatIcon} from "@angular/material/icon";
import {MatIconButton} from "@angular/material/button";

@Component({
  selector: 'app-sign-up',
  standalone: true,
    imports: [
        FormsModule,
        ReactiveFormsModule,
        RouterLink,
        MatFormField,
        MatLabel,
        MatInput,
        MatError,
        MatHint,
        MatIcon,
        MatIconButton,
        MatSuffix
    ],
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.css'
})
export class SignUpComponent {

  passwordVisible: boolean = false;

  signupForm = this.formBuilder.group({
    username: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(8), PasswordValidator()]],
  });

  constructor(private router: Router, private formBuilder: FormBuilder, private userService: UserService) {}

  togglePassword() {
    this.passwordVisible = !this.passwordVisible;
  }

  submitSignupForm() {
    this.userService.register(this.signupForm.value).subscribe({
      next: (result: any) => {
        // If the login was successful, redirect to the notes page
        this.userService.setToken(result.token);
        this.router.navigateByUrl('/notes');
      },
      error: err => {
        if (err.status === 400) {

          if (err.error.username) {
            this.signupForm.controls.username.setErrors({required: true})
          } else if (err.error.email) {
            this.signupForm.controls.email.setErrors({email: true});
          } else {
            this.signupForm.controls.password.setErrors({password: true});
          }

        } else if (err.status === 409) {
          this.signupForm.controls.email.setErrors({emailTaken: true});
        }
      }
    });
  }
}
