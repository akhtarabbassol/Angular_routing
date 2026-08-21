import { Component } from '@angular/core';

import { FormsModule } from '@angular/forms';

import {
  Router,
  RouterLink
} from '@angular/router';

import { CommonModule } from '@angular/common';

import { AuthService } from '../../services/auth.service';

import {
  MicrosoftService
} from '../../services/microsoft.service';


@Component({
  selector: 'app-login',

  standalone: true,

  imports: [
    CommonModule,
    FormsModule,
    RouterLink
  ],

  templateUrl: './login.html'
})
export class Login {

  identifier = '';

  password = '';

  errorMessage = '';

  loading = false;


  constructor(
    private authService: AuthService,

    private microsoftService:
      MicrosoftService,

    private router: Router
  ) {}


  login(): void {

    this.errorMessage = '';

    if (
      !this.identifier.trim() ||
      !this.password
    ) {

      this.errorMessage =
        'Please enter email/username and password.';

      return;
    }


    const result =
      this.authService.login(
        this.identifier,
        this.password
      );


    if (!result) {

      this.errorMessage =
        'Invalid username/email or password.';

      return;
    }


    this.router.navigate(['/mail']);

  }


  connectMicrosoft(): void {

    this.microsoftService.connect();

  }

}