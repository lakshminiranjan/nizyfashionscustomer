import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { ContactService } from 'src/app/services/contact.service';
import { IContact } from 'src/app/models/IContact';
import { IGroup } from 'src/app/models/IGroup';

@Component({
  selector: 'app-edit-contact',
  templateUrl: './edit-contact.component.html',
  styleUrls: ['./edit-contact.component.css']
})
export class EditContactComponent implements OnInit {
public loading: boolean = false;
public contactId : string | null = null;
public contact : IContact ={} as IContact;
public errorMessage : string | null = null;
public groups : IGroup[] = [] as IGroup[];

  constructor(
    private formBuilder: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private contactService: ContactService
  ) {
    
  }

  ngOnInit(): void {
    this.loading=true;
    this.activatedRoute.paramMap.subscribe((param : ParamMap) => {
    this.contactId=param.get('contactId');
    });
    if(this.contactId){
      this.contactService.getContact(this.contactId).subscribe((data : IContact) => {
      this.contact = data;
      this.loading=false;
      this.contactService.getAllGroups().subscribe((data : IGroup[]) => {
    this.groups = data;
      });
      },(error) => {
        this.errorMessage=error;
        this.loading=false;
      })
    }
  }

public submitUpdate() {
  if(this.contactId){
    this.contactService.updateContact(this.contact ,this.contactId).subscribe((data : IContact) => {
      this.router.navigate(['/contacts/admin']).then();
    } , (error) => {
      this.errorMessage = error;
      this.router.navigate([`/contacts/edit/$(this.contactId)`]).then();
    })
  }
}


}