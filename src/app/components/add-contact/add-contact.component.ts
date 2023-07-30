import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { IContact } from 'src/app/models/IContact';
import { IGroup } from 'src/app/models/IGroup';
import { ContactService } from 'src/app/services/contact.service';

@Component({
  selector: 'app-add-contact',
  templateUrl: './add-contact.component.html',
  styleUrls: ['./add-contact.component.css']
})
export class AddContactComponent implements OnInit {
  public contact : IContact = {} as IContact;
  public loading: boolean = false;
  public errorMessage: string | null = null;
  public groups : IGroup[] = {} as IGroup[];

  constructor(
    private contactService: ContactService,private router: Router ) {}

  ngOnInit(): void {
    this.contactService.getAllGroups().subscribe((data : IGroup[]) => {
    this.groups = data;
    },(error) => {
      this.errorMessage = error;
    });
  }

    // Method to handle contact submission
  public createSubmit() {
    this.contactService.createContact(this.contact).subscribe(
      (data: IContact) => {
        // Handle success: Redirect to view the newly created contact or any other action.
        this.router.navigate(['/contacts/admin']).then();
      },
      (error) => {
        // Handle error: Display an error message or perform any other error handling.
        this.errorMessage = error;
        this.router.navigate(['/contacts/add']).then();
      }
    );
  }


}

    
