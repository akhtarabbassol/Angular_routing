import { Injectable } from '@angular/core';

interface User {
  username: string;
  email: string;
  password: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private users: User[] = [];

  constructor() {

    const savedUsers =
      localStorage.getItem('users');

    if (savedUsers) {

      this.users = JSON.parse(savedUsers);

    }

  }


  // ==========================
  // SIGN UP
  // ==========================

  signup(
    username: string,
    email: string,
    password: string
  ) {

    const exists = this.users.some(
      user =>
        user.username === username ||
        user.email === email
    );

    if (exists) {

      return {
        success: false,
        message:
          'Username or email already exists.'
      };

    }


    const newUser: User = {

      username,
      email,
      password

    };


    this.users.push(newUser);

    localStorage.setItem(
      'users',
      JSON.stringify(this.users)
    );


    return {
      success: true,
      message:
        'Account created successfully.'
    };

  }


  // ==========================
  // LOGIN
  // ==========================

  login(
    usernameOrEmail: string,
    password: string
  ) {

    return this.users.find(

      user =>

        (
          user.username === usernameOrEmail ||
          user.email === usernameOrEmail
        )

        &&

        user.password === password

    );

  }

}