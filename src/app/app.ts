import {
  Component,
  OnInit
} from '@angular/core';

import {
  RouterOutlet,
  Router
} from '@angular/router';

import {
  MsalService
} from '@azure/msal-angular';


@Component({

  selector: 'app-root',

  standalone: true,

  imports: [
    RouterOutlet
  ],

  template: `
    <router-outlet></router-outlet>
  `

})
export class App implements OnInit {


  constructor(

    private msalService:
      MsalService,

    private router:
      Router

  ) {}


  ngOnInit(): void {

    this.msalService
      .handleRedirectObservable()
      .subscribe({

        next: (result) => {

          // Don't print the complete result.
          // It contains access tokens.

          console.log(
            'Microsoft authentication completed'
          );


          if (result?.account) {

            this.msalService
              .instance
              .setActiveAccount(
                result.account
              );


            this.router.navigate([
              '/mail'
            ]);

          }

        },


        error: (error) => {

          console.error(
            'MSAL redirect error:',
            error
          );

        }

      });

  }

}