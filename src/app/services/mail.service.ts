import {
  Injectable
} from '@angular/core';

import {
  HttpClient
} from '@angular/common/http';

import {
  Observable
} from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class MailService {

  private graphUrl =
    'https://graph.microsoft.com/v1.0';


  constructor(
    private http: HttpClient
  ) {}


  // ===============================
  // Get Inbox
  // ===============================

  getInbox(): Observable<any> {

    return this.http.get(

      `${this.graphUrl}/me/mailFolders/inbox/messages`,

      {

        params: {

          '$top': '20',

          '$select':
            'id,subject,from,receivedDateTime,' +
            'isRead,bodyPreview,body',

          '$orderby':
            'receivedDateTime DESC'

        }

      }

    );

  }


  // ===============================
  // Get one email
  // ===============================

  getEmail(
    id: string
  ): Observable<any> {

    return this.http.get(

      `${this.graphUrl}/me/messages/${id}`,

      {

        params: {

          '$select':
            'id,subject,from,toRecipients,' +
            'receivedDateTime,body,isRead'

        }

      }

    );

  }


  // ===============================
  // Reply
  // ===============================

  reply(

    messageId: string,

    content: string

  ): Observable<any> {

    return this.http.post(

      `${this.graphUrl}/me/messages/${messageId}/reply`,

      {

        message: {

          body: {

            contentType: 'Text',

            content: content

          }

        }

      }

    );

  }


  // ===============================
  // Send new email
  // ===============================

  sendEmail(

    to: string,

    subject: string,

    content: string

  ): Observable<any> {

    return this.http.post(

      `${this.graphUrl}/me/sendMail`,

      {

        message: {

          subject: subject,

          body: {

            contentType: 'Text',

            content: content

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

      }

    );

  }

}