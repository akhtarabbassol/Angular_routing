import {
  ApplicationConfig,
  inject,
  provideAppInitializer
} from '@angular/core';

import {
  provideRouter
} from '@angular/router';

import {
  provideHttpClient
} from '@angular/common/http';

import {
  MSAL_INSTANCE,
  MSAL_GUARD_CONFIG,
  MSAL_INTERCEPTOR_CONFIG,
  MsalGuard,
  MsalService,
  MsalBroadcastService,
  MsalGuardConfiguration,
  MsalInterceptorConfiguration
} from '@azure/msal-angular';

import {
  PublicClientApplication,
  InteractionType
} from '@azure/msal-browser';

import { routes } from './app.routes';


// ========================================
// MSAL INSTANCE
// ========================================

export function MSALInstanceFactory() {

  return new PublicClientApplication({

    auth: {

      clientId:
        '3d853b6c-ce0b-441b-9e88-4d82303fc398',

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


// ========================================
// GUARD CONFIG
// ========================================

export function MSALGuardConfigFactory():
  MsalGuardConfiguration {

  return {

    interactionType:
      InteractionType.Redirect

  };

}


// ========================================
// INTERCEPTOR CONFIG
// ========================================

export function MSALInterceptorConfigFactory():
  MsalInterceptorConfiguration {

  const protectedResourceMap =
    new Map<string, string[]>();


  protectedResourceMap.set(

    'https://graph.microsoft.com/v1.0',

    [
      'User.Read',
      'Mail.Read',
      'Mail.ReadWrite',
      'Mail.Send'
    ]

  );


  return {

    interactionType:
      InteractionType.Redirect,

    protectedResourceMap

  };

}


// ========================================
// APPLICATION CONFIG
// ========================================

export const appConfig: ApplicationConfig = {

  providers: [

    provideRouter(routes),

    provideHttpClient(),


    // MSAL

    {
      provide:
        MSAL_INSTANCE,

      useFactory:
        MSALInstanceFactory

    },


    {
      provide:
        MSAL_GUARD_CONFIG,

      useFactory:
        MSALGuardConfigFactory

    },


    {
      provide:
        MSAL_INTERCEPTOR_CONFIG,

      useFactory:
        MSALInterceptorConfigFactory

    },


    MsalService,

    MsalGuard,

    MsalBroadcastService,


    // IMPORTANT:
    // Initialize MSAL before using it

    provideAppInitializer(() => {

      const msalService =
        inject(MsalService);

      return msalService
        .instance
        .initialize();

    })

  ]

};