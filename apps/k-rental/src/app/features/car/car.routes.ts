import { Route } from "@angular/router";
import { AuthGuard } from "../../common/auth.guard";


export const CAR_ROUTES: Route[] = [
  { 
    canActivate: ([AuthGuard]),
    path: '',
    loadComponent: () => import('./car-listing/car-listing.component').then(x => x.CarListingComponent)
  },
  { 
    canActivate: ([AuthGuard]),
    path: 'new',
    loadComponent: () => import('./car-editor/car-editor.component').then(x => x.CarEditorComponent)
  }
]
