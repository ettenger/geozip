import { Route } from './interfaces';

export const routes: Route[] = [
  {
    path: 'v1/zip/:country/:zipCode',
    controller: 'ZipCodeController',
    actions: {
      GET: 'show'
    }
  }
];
