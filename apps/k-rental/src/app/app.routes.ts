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
        loadChildren: () => import('./features/booking/booking.routes').then(x => x.BOOKING_ROUTES)
    },
    {
        path:'cars',
        canActivate: [AuthGuard],
        loadChildren: () => import('./features/car/car.routes').then(x => x.CAR_ROUTES)
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
