import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './service/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'celestial';
  menuIcon = 'featherMenu';
  navbarOpen: boolean = false;
  isAuthenticated: boolean = false;

  constructor(private auth: AuthService, private router: Router) {
    this.auth.isAuthenticated.subscribe(data => this.isAuthenticated = data)
  }

  toggleNavbar() {
    this.navbarOpen = !this.navbarOpen;
    if(this.navbarOpen) {
      this.menuIcon = 'featherX';
    } else {
      this.menuIcon = 'featherMenu';
    }
  }
  
  signOut () {
    this.auth.updateAuthStatus(false);
    this.router.navigateByUrl('/login');
    this.navbarOpen = false;
  }
}