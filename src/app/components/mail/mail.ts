import {
  Component,
  OnInit
} from '@angular/core';

import {
  CommonModule
} from '@angular/common';

import {
  MailService
} from '../../services/mail.service';

import {
  MicrosoftService
} from '../../services/microsoft.service';


@Component({

  selector: 'app-mail',

  standalone: true,

  imports: [
    CommonModule
  ],

  templateUrl:
    './mail.html'

})
export class Mail
  implements OnInit {


  mails: any[] = [];

  selectedFolder =
    'inbox';

  loading = false;

  errorMessage = '';


  folders = [

    {
      name: 'Inbox',
      value: 'inbox'
    },

    {
      name: 'Sent',
      value: 'sentitems'
    },

    {
      name: 'Drafts',
      value: 'drafts'
    },

    {
      name: 'Deleted',
      value: 'deleteditems'
    }

  ];


  constructor(

    private mailService:
      MailService,

    private microsoftService:
      MicrosoftService

  ) {}


  ngOnInit(): void {

    this.loadMails(
      'inbox'
    );

  }


  // ======================================
  // LOAD MAILS
  // ======================================

  loadMails(
    folder: string
  ): void {


    console.log(
      'Calling loadMails:',
      folder
    );


    this.selectedFolder =
      folder;


    this.loading = true;

    this.errorMessage = '';

    this.mails = [];


    this.mailService
      .getMails(folder)
      .subscribe({

        next: (response: any) => {


          console.log(
            'Graph response:',
            response
          );


          this.mails =
            response?.value ?? [];


          console.log(
            'Number of emails:',
            this.mails.length
          );


          this.loading =
            false;

        },


        error: (error) => {


          console.error(
            'Mail loading error:',
            error
          );


          this.loading =
            false;


          this.errorMessage =
            'Unable to load emails.';

        },


        complete: () => {


          console.log(
            'Mail request completed'
          );


          this.loading =
            false;

        }

      });

  }


  // ======================================
  // DELETE
  // ======================================

  deleteMail(
    id: string
  ): void {


    if (
      !confirm(
        'Delete this email?'
      )
    ) {

      return;

    }


    this.mailService
      .deleteMail(id)
      .subscribe({

        next: () => {


          this.mails =
            this.mails.filter(

              mail =>
                mail.id !== id

            );

        },


        error: (error) => {

          console.error(
            'Delete error:',
            error
          );

        }

      });

  }


  // ======================================
  // LOGOUT
  // ======================================

  logout(): void {

    this.microsoftService
      .logout();

  }

}