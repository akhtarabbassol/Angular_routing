import { Component } from '@angular/core';

import {
  MicrosoftService
} from '../../services/microsoft.service';

@Component({
  selector: 'app-connect',

  standalone: true,

  templateUrl: './connect.html'
})
export class Connect {

  constructor(
    private microsoftService: MicrosoftService
  ) {}

  connectMicrosoft() {

    this.microsoftService.connect();

  }

}