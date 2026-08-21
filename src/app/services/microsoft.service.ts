import { Injectable } from '@angular/core';

import { MsalService } from '@azure/msal-angular';

@Injectable({
  providedIn: 'root'
})
export class MicrosoftService {

  constructor(
    private msalService: MsalService
  ) {}


  connect() {

    this.msalService.loginRedirect({

      scopes: [

        'User.Read',

        'Mail.Read',

        'Mail.Send'

      ]

    });

  }


  logout() {

    this.msalService.logoutRedirect({

      postLogoutRedirectUri:
        'http://localhost:4200'

    });

  }

}