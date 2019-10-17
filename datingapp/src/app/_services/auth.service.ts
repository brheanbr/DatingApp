import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private http: HttpClient) {}
  jtwHelper = new JwtHelperService();
  decodedToken: any;

  login(model: any) {
    return this.http.post(environment.baseUrl + 'auth/login', model).pipe(
      map((response: any) => {
        const user = response;
        if (user) {
          localStorage.setItem('token', user.token);
          this.decodedToken = this.jtwHelper.decodeToken(user.token);
          console.log(this.decodedToken);
        }
      })
    );
  }

  register(model: object) {
        return this.http.post(environment.baseUrl + 'auth/register', model);
  }

  loggedIn() {
    const token = localStorage.getItem('token');
    return !this.jtwHelper.isTokenExpired(token);
  }



}
