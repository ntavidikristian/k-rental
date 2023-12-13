import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../common/auth.service';

@Component({
  selector: 'k-rental-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {

  protected email?: string;
  protected password?: string;


  constructor(private authService: AuthService){
    
  }


  login(): void{
    this.authService.login({
      email: this.email!,
      password: this.password!
    }).subscribe(() => {
      console.log('here')
    })
  }


}
