// view-contact.component.ts
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { ContactService } from 'src/app/services/contact.service';
import { IContact } from 'src/app/models/IContact';
import { IGroup } from 'src/app/models/IGroup';

@Component({
  selector: 'app-view-contact',
  templateUrl: './view-contact.component.html',
  styleUrls: ['./view-contact.component.css']
})
export class ViewContactComponent implements OnInit {
  public contact: IContact = {} as IContact;
  public loading: boolean = false;
  public errorMessage: string | null = null;
  public contactId: string | null = null;
  public group: IGroup = {} as IGroup;

  constructor(
    private activatedRoute: ActivatedRoute,
    private contactService: ContactService
  ) {}

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe((param: ParamMap) => {
      this.contactId = param.get('contactId');


    });

          if (this.contactId) {
        this.loading = true;
        this.contactService.getContact(this.contactId).subscribe(
          (data: IContact) => {
            this.contact = data;
            this.loading = false;
            this.contactService.getGroup(data).subscribe((data: IGroup) => {
              this.group = data;
            });
          },
          (error) => {
            this.errorMessage = error;
            this.loading = false;
          }
        );
      }
  }

  public isNotEmpty() {
    return Object.keys(this.contact).length > 0 && Object.keys(this.group).length > 0;
  }
}
