import { Component, inject } from '@angular/core';
import { AuthState } from '../../common/auth-state';
import { RouterLink } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar'
import { MatButtonModule } from '@angular/material/button';
import { Store } from '@ngrx/store';
import { logoutActions } from '../login/store/logout.actions';
import { animate, query, sequence, stagger, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'k-rental-top-actions-bar',
  standalone: true,
  imports: [
    RouterLink,
    MatToolbarModule,
    MatButtonModule
  ],
  templateUrl: './top-actions-bar.component.html',
  styleUrl: './top-actions-bar.component.css',
  animations: [
    trigger('toolbarEnterInAnimation', [
      transition(':enter', [
        style({
          height: 0
        }),
        query(':scope > *', style({
          opacity: 0
        }), {optional: true}),
        sequence([
          animate('600ms ease', style({ height: '*' })),
          query(':scope > *', 
            stagger(
              50, 
              animate('300ms ease', 
                style({
                  opacity: 1
                }))
            )
          )
        ])
      ]),
      transition(':leave', [
        style({
          height: '*'
        }),
        query(':scope > *', style({
          opacity: 1
        }), {optional: true}),
        sequence([
          
          query(':scope > *', 
            stagger(
              50, 
              animate('300ms ease', 
                style({
                  opacity: 0
                }))
            )
          ),
          animate('600ms ease', style({ height: 0 })),
        ])
      ])
    ]),
  ]
})
export class TopActionsBarComponent {
  protected readonly authState = AuthState();

  protected readonly store = inject(Store);

  protected logout(): void{

    this.store.dispatch(
      logoutActions.logout()
    )
  }

}
