import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [FormsModule],
  templateUrl: 'app.html',
})
export class App{

  usernameOrEmail = '';
  password = '';

  errorMessage = '';
  successMessage = '';

  // Demo credentials
  private users = [
    {
      username: 'tasawar',
      email: 'tasawar@gmail.com',
      password: '123456'
    },
    {
      username: 'admin',
      email: 'admin@gmail.com',
      password: 'admin123'
    }
  ];

  login() {

    this.errorMessage = '';
    this.successMessage = '';

    // Check empty fields
    if (!this.usernameOrEmail || !this.password) {
      this.errorMessage = 'Please enter username/email and password.';
      return;
    }

    // Find user
    const user = this.users.find(
      user =>
        (user.username === this.usernameOrEmail ||
         user.email === this.usernameOrEmail) &&
        user.password === this.password
    );

    if (user) {
      this.successMessage = `Welcome ${user.username}!`;

      console.log('Login successful:', user);

      // Here you can redirect to dashboard
      // this.router.navigate(['/dashboard']);

    } else {
      this.errorMessage = 'Invalid username/email or password.';
    }
  }
}