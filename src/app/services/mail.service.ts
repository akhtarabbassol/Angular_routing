import {
  Injectable
} from '@angular/core';

import {
  HttpClient,
  HttpHeaders
} from '@angular/common/http';

import {
  MsalService
} from '@azure/msal-angular';

import {
  Observable,
  from,
  throwError
} from 'rxjs';

import {
  map,
  switchMap,
  catchError
} from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class MailService {


  private graphUrl =
    'https://graph.microsoft.com/v1.0';


  constructor(

    private http:
      HttpClient,

    private msalService:
      MsalService

  ) {}


  // ======================================
  // GET ACCESS TOKEN
  // ======================================

  private getAccessToken():
    Observable<string> {


    const account =
      this.msalService
        .instance
        .getActiveAccount();


    console.log(
      'Active Microsoft account:',
      account?.username
    );


    if (!account) {

      return throwError(

        () =>
          new Error(
            'No active Microsoft account.'
          )

      );

    }


    return from(

      this.msalService
        .instance
        .acquireTokenSilent({

          account,

          scopes: [

            'User.Read',

            'Mail.Read',

            'Mail.ReadWrite',

            'Mail.Send'

          ]

        })

    ).pipe(

      map(result => {

        console.log(
          'Access token received'
        );

        return result.accessToken;

      }),

      catchError(error => {

        console.error(
          'Access token error:',
          error
        );

        return throwError(
          () => error
        );

      })

    );

  }


  // ======================================
  // GET PROFILE
  // ======================================

  getProfile(): Observable<any> {

    return this.getAccessToken().pipe(

      switchMap(token => {

        const headers =
          new HttpHeaders({

            Authorization:
              `Bearer ${token}`

          });


        return this.http.get(

          `${this.graphUrl}/me`,

          {
            headers
          }

        );

      })

    );

  }


  // ======================================
  // GET MAILS
  // ======================================

  getMails(
    folder: string
  ): Observable<any> {


    return this.getAccessToken().pipe(

      switchMap(token => {


        const headers =
          new HttpHeaders({

            Authorization:
              `Bearer ${token}`

          });


        const url =
          `${this.graphUrl}` +
          `/me/mailFolders/` +
          `${folder}/messages`;


        console.log(
          'Graph API URL:',
          url
        );


        return this.http.get(

          url,

          {

            headers,

            params: {

              '$top': '25',

              '$orderby':
                'receivedDateTime DESC',

              '$select':
                'id,' +
                'subject,' +
                'from,' +
                'toRecipients,' +
                'bodyPreview,' +
                'receivedDateTime,' +
                'isRead'

            }

          }

        );

      }),

      catchError(error => {

        console.error(
          'Microsoft Graph error:',
          error
        );

        return throwError(
          () => error
        );

      })

    );

  }


  // ======================================
  // DELETE EMAIL
  // ======================================

  deleteMail(
    id: string
  ): Observable<any> {


    return this.getAccessToken().pipe(

      switchMap(token => {


        const headers =
          new HttpHeaders({

            Authorization:
              `Bearer ${token}`

          });


        return this.http.delete(

          `${this.graphUrl}/me/messages/${id}`,

          {
            headers
          }

        );

      })

    );

  }


  // ======================================
  // SEND EMAIL
  // ======================================

  sendMail(

    to: string,

    subject: string,

    body: string

  ): Observable<any> {


    return this.getAccessToken().pipe(

      switchMap(token => {


        const headers =
          new HttpHeaders({

            Authorization:
              `Bearer ${token}`,

            'Content-Type':
              'application/json'

          });


        const email = {

          message: {

            subject,

            body: {

              contentType: 'Text',

              content: body

            },

            toRecipients: [

              {

                emailAddress: {

                  address: to

                }

              }

            ]

          },

          saveToSentItems: true

        };


        return this.http.post(

          `${this.graphUrl}/me/sendMail`,

          email,

          {
            headers
          }

        );

      })

    );

  }

}