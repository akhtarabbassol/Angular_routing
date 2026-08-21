import {
  Injectable
} from '@angular/core';

import {
  MsalService
} from '@azure/msal-angular';


@Injectable({
  providedIn: 'root'
})
export class MicrosoftService {


  constructor(
    private msalService:
      MsalService
  ) {}


  // ======================================
  // CONNECT MICROSOFT
  // ======================================

  connect(): void {

    this.msalService
      .loginRedirect({

        scopes: [

          'User.Read',

          'Mail.Read',

          'Mail.ReadWrite',

          'Mail.Send'

        ]

      });

  }


  // ======================================
  // LOGOUT
  // ======================================

  logout(): void {

    this.msalService
      .logoutRedirect({

        postLogoutRedirectUri:
          'http://localhost:4200'

      });

  }


  // ======================================
  // ACCOUNT
  // ======================================

  getAccount() {

    return this.msalService
      .instance
      .getActiveAccount();

  }

}