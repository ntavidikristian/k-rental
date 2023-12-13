import { Route } from '@angular/router';

export const appRoutes: Route[] = [

    {
        path:'home',
        loadComponent: () => import('./features/home/home.component').then(x => x.HomeComponent)
    },
    {
        path: '',
        pathMatch: 'full',
        redirectTo: 'home'
    },
    {
        path:'bookings',
        loadComponent: () => import('./features/booking/booking.component').then(x => x.BookingComponent)
    },
    {
        path:'cars',
        loadComponent: () => import('./features/car/car.component').then(x => x.CarComponent)
    },
    {
        path:'login',
        loadComponent: () => import('./features/login/login.component').then(x => x.LoginComponent)
    },
    {
        path: 'not-found',
        loadComponent: () => import('./features/not-found/not-found.component').then(x => x.NotFoundComponent)
    },
    {
        path: '**',
        redirectTo: 'not-found'
    }

];
