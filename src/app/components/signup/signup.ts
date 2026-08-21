import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-signup',
  standalone: true,

  imports: [
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
    private authService: AuthService,
    private router: Router
  ) {}

  signup() {

    this.errorMessage = '';
    this.successMessage = '';

    if (
      !this.username ||
      !this.email ||
      !this.password ||
      !this.confirmPassword
    ) {

      this.errorMessage =
        'Please fill all fields.';

      return;
    }

    if (this.password !== this.confirmPassword) {

      this.errorMessage =
        'Passwords do not match.';

      return;
    }

    const result = this.authService.signup(
      this.username,
      this.email,
      this.password
    );

    if (!result.success) {

      this.errorMessage =
        result.message;

      return;
    }

    this.successMessage =
      'Account created successfully!';

    setTimeout(() => {
      this.router.navigate(['/']);
    }, 1000);

  }

}