import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  // Simulated authenticated user (replace this with your actual user authentication logic)
  private authenticatedUser = { username: 'demo', password: 'password' };

  public login(username: string, password: string): Observable<boolean> {
    // Simulate the login process and authentication
    if (username === this.authenticatedUser.username && password === this.authenticatedUser.password) {
      // Set the logged-in user in the local storage
      localStorage.setItem('currentUser', JSON.stringify({ username: this.authenticatedUser.username }));
      // Set the role as "admin" for the admin user
      localStorage.setItem('userRole', 'admin');
      return of(true);
    } else {
      return of(false);
    }
  }

  public logout(): void {
    // Simulate the logout process
    localStorage.removeItem('currentUser');
    localStorage.removeItem('userRole');
  }

  public isLoggedIn(): boolean {
    // Check if the user is logged in
    return !!localStorage.getItem('currentUser');
  }

  public isAdminUser(): boolean {
    // Check if the user has the "admin" role in the local storage
    const currentUser = localStorage.getItem('currentUser');
    const userRole = localStorage.getItem('userRole');
    return !!currentUser && userRole === 'admin';
  }
}
