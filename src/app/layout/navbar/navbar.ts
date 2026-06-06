import { Component } from '@angular/core';
import { AuthService } from '../../services/auth-service';

@Component({
  selector: 'app-navbar',
   
  templateUrl: './navbar.html',
  styleUrl: './navbar.css',
  
})
export class Navbar {
 constructor(private authService: AuthService) {}

  logout() {
    this.authService.logout();
  }



}
