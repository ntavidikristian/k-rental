import { Route } from '@angular/router';
import { AuthGuard } from './common/auth.guard';

export const appRoutes: Route[] = [

    {
        path:'home',
        canActivate: [AuthGuard],
        loadComponent: () => import('./features/home/home.component').then(x => x.HomeComponent)
    },
    {
        path: '',
        pathMatch: 'full',
        redirectTo: 'home'
    },
    {
        path:'bookings',
        canActivate: [AuthGuard],
        loadComponent: () => import('./features/booking/booking.component').then(x => x.BookingComponent)
    },
    {
        path:'cars',
        canActivate: [AuthGuard],
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
