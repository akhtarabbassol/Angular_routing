import {
  Injectable
} from '@angular/core';


interface User {

  username: string;

  email: string;

  password: string;

}


@Injectable({
  providedIn: 'root'
})
export class AuthService {


  private storageKey =
    'angular_mail_users';


  constructor() {

    this.createDefaultUser();

  }


  // ======================================
  // CREATE DEFAULT USER
  // ======================================

  private createDefaultUser(): void {

    const users =
      this.getUsers();


    if (users.length === 0) {

      const defaultUser: User = {

        username: 'admin',

        email: 'admin@gmail.com',

        password: '123456'

      };


      localStorage.setItem(

        this.storageKey,

        JSON.stringify([
          defaultUser
        ])

      );

    }

  }


  // ======================================
  // GET USERS
  // ======================================

  private getUsers(): User[] {

    const data =
      localStorage.getItem(
        this.storageKey
      );


    return data
      ? JSON.parse(data)
      : [];

  }


  // ======================================
  // SIGNUP
  // ======================================

  signup(

    username: string,

    email: string,

    password: string

  ): boolean {


    const users =
      this.getUsers();


    const exists =
      users.some(

        user =>
          user.username
            .toLowerCase() ===
            username.toLowerCase()

          ||

          user.email
            .toLowerCase() ===
            email.toLowerCase()

      );


    if (exists) {

      return false;

    }


    users.push({

      username,

      email,

      password

    });


    localStorage.setItem(

      this.storageKey,

      JSON.stringify(users)

    );


    return true;

  }


  // ======================================
  // LOGIN
  // ======================================

  login(

    identifier: string,

    password: string

  ): boolean {


    const users =
      this.getUsers();


    const user =
      users.find(

        item =>

          (

            item.username
              .toLowerCase() ===
              identifier.toLowerCase()

            ||

            item.email
              .toLowerCase() ===
              identifier.toLowerCase()

          )

          &&

          item.password === password

      );


    if (!user) {

      return false;

    }


    localStorage.setItem(

      'loggedInUser',

      JSON.stringify(user)

    );


    return true;

  }


  // ======================================
  // LOGOUT
  // ======================================

  logout(): void {

    localStorage.removeItem(
      'loggedInUser'
    );

  }


  // ======================================
  // CHECK LOGIN
  // ======================================

  isLoggedIn(): boolean {

    return !!localStorage.getItem(
      'loggedInUser'
    );

  }

}