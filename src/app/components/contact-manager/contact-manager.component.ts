import { Component , OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IContact } from 'src/app/models/IContact';
import { ContactService } from 'src/app/services/contact.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-contact-manager',
  templateUrl: './contact-manager.component.html',
  styleUrls: ['./contact-manager.component.css']
})
export class ContactManagerComponent implements OnInit {

   public loading: boolean = false;
  public contacts: IContact[] = [];
  public errorMessage: string | null = null;
  public searchTerm: string = '';
  public filteredContacts: IContact[] = [];

  constructor(private contactService : ContactService,private router: Router,private authService: AuthService) { }


  ngOnInit() : void {
    this.getAllContactsFromServer(),
    this.fetchContacts();
  }
    logout(): void {
    this.authService.logout();
    // Redirect to the login page after logout
    this.router.navigate(['/']);
  }
  

  public getAllContactsFromServer(){
    this.loading= true;
    this.contactService.getAllContacts().subscribe( (data : IContact[])  => {
    this.contacts = data;
    this.loading= false;
    }, (error) => {
        this.errorMessage = error;
        this.loading= false;
    });
  }

public clickDeleteContact(contactId: string | undefined) {
  if (contactId) {
    this.contactService.deleteContact(contactId).subscribe(
      (data: {}) => {
        // Deletion successful, refresh the whole app by navigating to the current route again
        this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
          this.router.navigate(['/contacts/admin']);
        });
      },
      (error) => {
        this.errorMessage = error;
      }
    );
  }
}


  // Fetch all contacts from the service
  public fetchContacts() {
    this.loading = true;
    this.contactService.getAllContacts().subscribe(
      (data: IContact[]) => {
        this.contacts = data;
        this.filteredContacts = data; // Initialize filteredContacts with all contacts
        this.loading = false;
      },
      (error) => {
        this.errorMessage = error;
        this.loading = false;
      }
    );
  }


  public searchContacts()  {
    this.filteredContacts = this.contacts.filter(contact =>
      contact.name.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      contact.email.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      this.contactMobileMatchesSearch(contact.mobile, this.searchTerm)
    );
  }

  // Custom function to check if contact.mobile matches the search term
  contactMobileMatchesSearch(mobile: number | string, searchTerm: string): boolean {
    if (typeof mobile === 'number') {
      return mobile.toString().includes(searchTerm);
    } else if (typeof mobile === 'string') {
      return mobile.includes(searchTerm);
    }
    return false;
  }
}
