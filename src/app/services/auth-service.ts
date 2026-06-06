import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
 

  constructor(private router: Router) {}

  login(username: string, password: string): boolean {
    if (username === 'admin' && password === '123') {
      localStorage.setItem('isLoggedIn', 'true');
      return true;
    }

    return false;
  }

  logout() {
    localStorage.removeItem('isLoggedIn');
    this.router.navigate(['/login']);
  }

  isLoggedIn(): boolean {
    return localStorage.getItem('isLoggedIn') === 'true';
  }



}
