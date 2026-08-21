import {
  Component,
  OnInit
} from '@angular/core';

import {
  CommonModule
} from '@angular/common';

import {
  FormsModule
} from '@angular/forms';

import {
  MailService
} from '../../services/mail.service';

import {
  AuthService
} from '../../services/auth.service';


@Component({
  selector: 'app-mail',

  standalone: true,

  imports: [
    CommonModule,
    FormsModule
  ],

  templateUrl: './mail.html'
})
export class Mail implements OnInit {

  emails: any[] = [];

  selectedEmail: any = null;

  loading = false;

  replyText = '';

  sendingReply = false;

  errorMessage = '';


  constructor(
    private mailService: MailService,
    private authService: AuthService
  ) {}


  ngOnInit() {
    this.loadInbox();
  }


  loadInbox() {

    this.loading = true;

    this.mailService.getInbox().subscribe({

      next: (response) => {

        this.emails = response.value || [];

        this.loading = false;

      },

      error: (error) => {

        console.error(error);

        this.errorMessage =
          'Unable to load your inbox.';

        this.loading = false;

      }

    });

  }


  openEmail(email: any) {

    this.mailService
      .getEmail(email.id)
      .subscribe({

        next: (response) => {

          this.selectedEmail = response;

        },

        error: (error) => {

          console.error(error);

        }

      });

  }


  closeEmail() {

    this.selectedEmail = null;

    this.replyText = '';

  }


  sendReply() {

    if (
      !this.selectedEmail ||
      !this.replyText.trim()
    ) {
      return;
    }

    this.sendingReply = true;

    this.mailService
      .reply(
        this.selectedEmail.id,
        this.replyText
      )
      .subscribe({

        next: () => {

          this.sendingReply = false;

          this.replyText = '';

          alert('Reply sent successfully!');

        },

        error: (error) => {

          console.error(error);

          this.sendingReply = false;

          alert('Failed to send reply.');

        }

      });

  }


logout() {
  localStorage.removeItem('users');

  window.location.href = '/';
}

}