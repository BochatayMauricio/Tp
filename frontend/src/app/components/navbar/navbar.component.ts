import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { user } from 'src/app/interfaces/user';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  user: any;

  constructor(private router: Router) {

    this.user = (localStorage.getItem('user'));
    this.user = JSON.parse(this.user);

  }




  logOut() {
    localStorage.removeItem('token');
    this.router.navigate(['/login'])
  }

}
