import { Route } from "@angular/router";
import { AuthGuard } from "../../common/auth.guard";


export const BOOKING_ROUTES: Route[] = [
  { 
    canActivate: ([AuthGuard]),
    path: '',
    loadComponent: () => import('./booking-listing/booking-listing.component').then(x => x.BookingListingComponent)
  },
  { 
    canActivate: ([AuthGuard]),
    path: 'new',
    loadComponent: () => import('./booking-editor/booking-editor.component').then(x => x.BookingEditorComponent)
  }
]

