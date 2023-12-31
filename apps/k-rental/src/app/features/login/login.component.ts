import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../common/http/auth.service';
import { Store } from '@ngrx/store';
import { loginActions } from './store/login.actions';
import { selectAuthError, selectIsAuthenticated } from '../../core/store/auth/auth.selectors';
import { GlobalState } from '../../core/store/global.state';
import { MatButtonModule } from '@angular/material/button'
import { MatCardModule } from '@angular/material/card'
import { MatFormFieldModule } from '@angular/material/form-field'
import { MatInputModule } from '@angular/material/input'

@Component({
  selector: 'k-rental-login',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {

  protected email?: string;
  protected password?: string;


  isAuthenticated$ = this.store.select(selectIsAuthenticated);
  authError$ = this.store.select(selectAuthError);

  constructor(private authService: AuthService, private store: Store<GlobalState>){
    
  }


  login(): void{
    this.store.dispatch(loginActions.login({
      email: this.email!,
      password: this.password!
    }))
  }


}
