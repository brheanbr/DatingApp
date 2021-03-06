import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from '../_models/user';


@Injectable({
  providedIn: 'root'
})
export class UserService {

constructor(private http: HttpClient) { }


  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(environment.baseUrl + 'users');
  }

  getUser(id): Observable<User> {
    return this.http.get<User>(environment.baseUrl + 'users/' + id);
  }

  updateUser(id: number, user: User) {
    return this.http.put<User>(environment.baseUrl + 'users/' + id, user);
  }

  setMainPhoto(userId: number, id: number) {
    return this.http.post(environment.baseUrl + 'users/' + userId + '/photos/' + id + '/setMain/', {});
  }

  deletePhoto(userId: number, id: number) {
    return this.http.delete(environment.baseUrl + 'users/' + userId + '/photos/' + id);
  }

}
