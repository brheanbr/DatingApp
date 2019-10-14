import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private http: HttpClient) {}

  login(model: any) {
    return this.http.post(environment.baseUrl + 'auth/login', model).pipe(
      map((response: any) => {
        const user = response;
        if (user) {
          localStorage.setItem('token', user.token);
        }
      })
    );
  }

  register(model: object) {
        return this.http.post(environment.baseUrl + 'auth/register', model);
  }
}
