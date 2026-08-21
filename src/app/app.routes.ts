import { Routes } from '@angular/router';

import { Login } from './components/login/login';
import { Signup } from './components/signup/signup';
import { Connect } from './components/connect/connect';
import { Mail } from './components/mail/mail';

export const routes: Routes = [

  {
    path: '',
    component: Login
  },

  {
    path: 'signup',
    component: Signup
  },

  {
    path: 'connect',
    component: Connect
  },

  {
    path: 'mail',
    component: Mail
  },

  {
    path: '**',
    redirectTo: ''
  }

];