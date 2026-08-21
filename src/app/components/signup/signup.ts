import { Component } from '@angular/core';

import { FormsModule } from '@angular/forms';

import { CommonModule } from '@angular/common';

import {
  Router,
  RouterLink
} from '@angular/router';

import {
  AuthService
} from '../../services/auth.service';


@Component({

  selector: 'app-signup',

  standalone: true,

  imports: [
    CommonModule,
    FormsModule,
    RouterLink
  ],

  templateUrl: './signup.html'

})
export class Signup {

  username = '';

  email = '';

  password = '';

  confirmPassword = '';

  errorMessage = '';

  successMessage = '';


  constructor(

    private authService:
      AuthService,

    private router:
      Router

  ) {}


  signup(): void {

    this.errorMessage = '';

    this.successMessage = '';


    if (
      !this.username.trim() ||
      !this.email.trim() ||
      !this.password ||
      !this.confirmPassword
    ) {

      this.errorMessage =
        'Please fill all fields.';

      return;
    }


    if (
      this.password !==
      this.confirmPassword
    ) {

      this.errorMessage =
        'Passwords do not match.';

      return;
    }


    if (this.password.length < 6) {

      this.errorMessage =
        'Password must contain at least 6 characters.';

      return;
    }


    const result =
      this.authService.signup(

        this.username,

        this.email,

        this.password

      );


    if (!result) {

      this.errorMessage =
        'Username or email already exists.';

      return;
    }


    this.successMessage =
      'Account created successfully!';


    setTimeout(() => {

      this.router.navigate(['/']);

    }, 1000);

  }

}