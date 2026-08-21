import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,

  imports: [
    FormsModule,
    RouterLink
  ],

  templateUrl: './login.html'
})
export class Login {

  usernameOrEmail = '';
  password = '';

  errorMessage = '';

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  login() {

    this.errorMessage = '';

    const user = this.authService.login(
      this.usernameOrEmail,
      this.password
    );

    if (!user) {

      this.errorMessage =
        'Invalid username/email or password.';

      return;
    }

    this.router.navigate(['/connect']);

  }

}