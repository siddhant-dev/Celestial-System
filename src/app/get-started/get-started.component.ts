import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../service/auth.service';
import { passwordMatchValidator } from './password-match.directive';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-get-started',
  templateUrl: './get-started.component.html',
  styleUrls: ['./get-started.component.scss'],
})
export class GetStartedComponent implements OnInit, OnDestroy {

  sub = new Subscription();
  registerForm = new FormGroup({
    'name': new FormControl('', [Validators.required, Validators.minLength(3)]),
    'email': new FormControl('', [Validators.required, Validators.email]),
    'password': new FormControl('',
    [
      Validators.required,
      Validators.minLength(8),
      Validators.pattern(
        /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/
      ),
    ]),
    'confirmPassword': new FormControl('', [Validators.required])
  }, { validators: passwordMatchValidator });

  errorMessage:string = '';


  constructor(private auth: AuthService, private router: Router) {}

  ngOnInit(): void {}

  get name() {
    return this.registerForm.get('name');
  }
  get email() {
    return this.registerForm.get('email');
  }
  get password() {
    return this.registerForm.get('password');
  }
  get confirmPassword() {
    return this.registerForm.get('confirmPassword');
  }

  createUser() {
    const user = {
      id: Math.floor(Math.random()*100),
      name: this.name?.value,
      email: this.email?.value,
      password: this.confirmPassword?.value
    }
    this.sub.add(this.auth.register(user).subscribe({
      next: (data:any) => {
        this.auth.updateAuthStatus(true);
        this.router.navigateByUrl("/")
      },
      error: (err:any) => {
        this.errorMessage = err.error;
      }
    }));
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }
}
