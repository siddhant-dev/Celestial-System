import { Component, EventEmitter, Input, OnInit, Output, OnDestroy } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { User } from '../model/user.model';
import { UserManagementService } from '../service/user-management.service';
import { Subscription } from 'rxjs'

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss'],
})
export class UserFormComponent implements OnInit, OnDestroy {
  @Input() id?: number;
  @Output() closePannel = new EventEmitter<void>();

  sub = new Subscription();

  userForm = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(3)]),
    email: new FormControl('', [Validators.required, Validators.email]),
    company: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
    ]),
    address: new FormGroup({
      street: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
      ]),
      suite: new FormControl('', [Validators.required]),
      city: new FormControl('', [Validators.required]),
      zipcode: new FormControl('', [
        Validators.required,
        Validators.minLength(5),
      ]),
    }),
  });

  constructor(private user: UserManagementService) {}

  ngOnInit(): void {
    if (this.id) {
      this.sub.add(this.user.getUserFromId(this.id).subscribe({
        next: (data: User) => {
          this.name = data.name;
          this.email = data.email;
          this.company = data.company;
          this.street = data.address.street;
          this.suite = data.address.suite;
          this.city = data.address.city;
          this.zipcode = data.address.zipcode;
        },
      }));
    }
  }

  set name(val: string) {
    this.userForm.get('name')?.setValue(val);
  }
  set email(val: string) {
    this.userForm.get('email')?.setValue(val);
  }

  set company(val: string) {
    this.userForm.get('company')?.setValue(val);
  }

  set street(val: string) {
    (this.userForm.get('address') as FormGroup)?.get('street')?.setValue(val);
  }

  set suite(val: string) {
    (this.userForm.get('address') as FormGroup)?.get('suite')?.setValue(val);
  }
  set city(val: string) {
    (this.userForm.get('address') as FormGroup)?.get('city')?.setValue(val);
  }

  set zipcode(val: string) {
    (this.userForm.get('address') as FormGroup)?.get('zipcode')?.setValue(val);
  }

  get f() {
    return this.userForm.controls;
  }

  get ad() {
    return this.f.address.controls;
  }

  close() {
    this.closePannel.emit();
  }

  submit() {
    if (this.id) {
      const user: any = { id: this.id, ...this.userForm.value };

     this.sub.add( this.user.updateUser(this.id, user).subscribe({
      next: (data: any) => {
        this.close();
      },
    }));
    } else {
      const user: any = {
        id: Math.floor(Math.random() * 100),
        ...this.userForm.value,
      };

      this.sub.add(this.user.addUser(user).subscribe({
        next: (data: any) => {
          this.close();
        },
      }));
    }
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}
