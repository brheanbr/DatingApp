import { Component, OnInit } from '@angular/core';
import { AuthService } from '../_services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  model: any = {};
  loggedUser: string;

  constructor(private authService: AuthService) { }

  ngOnInit() {

  }

  login() {
    this.authService.login(this.model).subscribe(next => {
      this.loggedUser = this.model.username;
      console.log(this.model.username + ' Logged in succesfully!');
    }, error => {
      
      console.log(error);
      
    });
  }

  loggedIn() {
    const token = localStorage.getItem('token');
    return !!token;
  }

  logout() {
    localStorage.removeItem('token');
    console.log('logged out');
  }

}
