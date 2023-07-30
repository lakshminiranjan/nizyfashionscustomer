import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { IContact } from '../models/IContact';
import { IGroup } from '../models/IGroup';

@Injectable({
  providedIn: 'root'
})
export class ContactService {
  public isAdminUser():boolean {
      throw new Error('Method not implemented.');
      return !!localStorage.getItem('currentUser') && localStorage.getItem('isAdmin') === 'true';
  }
  private serverUrl: string = 'https://json-data-2m2h.onrender.com/'; // Replace with the actual server URL
  private authenticatedUser: { username: string, password: string } = { username: 'demo', password: 'password' ,};
  private isAuthenticated: boolean = false;
 
  


  constructor(private httpClient: HttpClient) {}



  login(username: string, password: string): Observable<boolean> {
    // Simulate the login process and authentication
    if (username === this.authenticatedUser.username && password === this.authenticatedUser.password) {
      localStorage.setItem('currentUser', JSON.stringify({ username: this.authenticatedUser.username }));
      this.isAuthenticated = true;
      return of(true);
    } else {
      return of(false);
    }
  }

  logout(): void {
    // Simulate the logout process
    localStorage.removeItem('currentUser');
    this.isAuthenticated = false;
  }

  isLoggedIn(): boolean {
    // Check if the user is logged in
    return !!localStorage.getItem('currentUser'); // Use double negation to convert to boolean
  }




  public getAllContacts(): Observable<IContact[]> {
    let dataURL: string = `${this.serverUrl}/contacts`;
    return this.httpClient.get<IContact[]>(dataURL).pipe(catchError(this.handleError));
  }

  public getContact(contactId: string): Observable<IContact> {
    let dataURL: string = `${this.serverUrl}/contacts/${contactId}`;
    return this.httpClient.get<IContact>(dataURL).pipe(catchError(this.handleError));
  }

  public createContact(contact: IContact): Observable<IContact> {
    let dataURL: string = `${this.serverUrl}/contacts`;
    return this.httpClient.post<IContact>(dataURL, contact).pipe(catchError(this.handleError));
  }

  public updateContact(contact: IContact, contactId: string): Observable<IContact> {
    let dataURL: string = `${this.serverUrl}/contacts/${contactId}`;
    return this.httpClient.put<IContact>(dataURL, contact).pipe(catchError(this.handleError));
  }

  public deleteContact(contactId: string): Observable<{}> {
    let dataURL: string = `${this.serverUrl}/contacts/${contactId}`;
    return this.httpClient.delete<{}>(dataURL).pipe(catchError(this.handleError));
  }

  public getAllGroups(): Observable<IGroup[]> {
    let dataURL: string = `${this.serverUrl}/groups`;
    return this.httpClient.get<IGroup[]>(dataURL).pipe(catchError(this.handleError));
  }


  
  public getGroup(contact: IContact): Observable<IGroup> {
    let dataURL: string = `${this.serverUrl}/groups/${contact.groupId}`;
    return this.httpClient.get<IGroup>(dataURL).pipe(catchError(this.handleError));
  }

  private handleError(error: HttpErrorResponse) {
    // Implement your error handling logic here (e.g., show a toast message, log the error, etc.)
    // Return an observable with an empty object or null to handle the error gracefully
    let errorMessage: string = '';
    if (error.error instanceof ErrorEvent) {
      errorMessage = `Error: ${error.error.message}`;
    } else {
      errorMessage = `Status: ${error.status}\nMessage: ${error.message}`;
    }
    return throwError(errorMessage);
  }
}
