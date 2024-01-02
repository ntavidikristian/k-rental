import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AuthState } from './common/auth-state';
import { TopActionsBarComponent } from './features/top-actions-bar/top-actions-bar.component';

@Component({
  standalone: true,
  imports: [
    RouterModule,
    TopActionsBarComponent
  ],
  selector: 'k-rental-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'k-rental';

  protected readonly authState = AuthState();


}
