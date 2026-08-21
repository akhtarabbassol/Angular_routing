import { ApplicationConfig } from '@angular/core';

import { provideRouter } from '@angular/router';

import { provideHttpClient } from '@angular/common/http';

import {
  MSAL_INSTANCE,
  MSAL_GUARD_CONFIG,
  MSAL_INTERCEPTOR_CONFIG,
  MsalGuardConfiguration,
  MsalInterceptorConfiguration,
  MsalService,
  MsalGuard,
  MsalBroadcastService
} from '@azure/msal-angular';

import {
  PublicClientApplication,
  InteractionType
} from '@azure/msal-browser';

import { routes } from './app.routes';


// ======================================
// MSAL INSTANCE
// ======================================

export function MSALInstanceFactory() {

  return new PublicClientApplication({

    auth: {

      clientId:
        'YOUR_CLIENT_ID',

      authority:
        'https://login.microsoftonline.com/common',

      redirectUri:
        'http://localhost:4200',

      postLogoutRedirectUri:
        'http://localhost:4200'

    },

    cache: {

      cacheLocation:
        'localStorage'

    }

  });

}


// ======================================
// MSAL GUARD CONFIG
// ======================================

export function MSALGuardConfigFactory():

  MsalGuardConfiguration {

  return {

    interactionType:
      InteractionType.Redirect

  };

}


// ======================================
// MSAL INTERCEPTOR CONFIG
// ======================================

export function MSALInterceptorConfigFactory():

  MsalInterceptorConfiguration {

  const protectedResourceMap =
    new Map<string, string[]>();


  protectedResourceMap.set(

    'https://graph.microsoft.com/v1.0',

    [
      'User.Read',
      'Mail.Read',
      'Mail.Send'
    ]

  );


  return {

    interactionType:
      InteractionType.Redirect,

    protectedResourceMap

  };

}


// ======================================
// APP CONFIG
// ======================================

export const appConfig: ApplicationConfig = {

  providers: [

    // Angular Router

    provideRouter(routes),


    // HttpClient

    provideHttpClient(),


    // =================================
    // MSAL
    // =================================

    {

      provide: MSAL_INSTANCE,

      useFactory:
        MSALInstanceFactory

    },


    {

      provide: MSAL_GUARD_CONFIG,

      useFactory:
        MSALGuardConfigFactory

    },


    {

      provide: MSAL_INTERCEPTOR_CONFIG,

      useFactory:
        MSALInterceptorConfigFactory

    },


    // IMPORTANT

    MsalService,

    MsalGuard,

    MsalBroadcastService

  ]

};