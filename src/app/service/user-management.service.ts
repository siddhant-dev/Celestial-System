import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { User } from '../model/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserManagementService {

  constructor(private httpClient: HttpClient) { }

  getUsers(): Observable<any> {
    return this.httpClient.get('http://localhost:3000/userData').pipe(
      map((user: Array<User> | any) => {
        return user.map((el: any) => {
          return { id: el.id, name: el.name, email: el.email, address: el.address, company: el.company}
        })
    }));
  }

  getUserFromId(id: number): Observable<User> {
    return this.httpClient.get(`http://localhost:3000/userData/${id}`).pipe(
      map((data: any) => {
        return {
          id: data.id,
          name: data.name,
          email: data.email,
          address: data.address,
          company: data.company
        }
      })
    );
  }

  updateUser(id:number, data:any): Observable<any> {
    return this.httpClient.put(`http://localhost:3000/userData/${id}`, data);
  }

  addUser(data:any): Observable<any> {
    return this.httpClient.post(`http://localhost:3000/userData`, data);
  }

  deleteUser(id:number): Observable<any> {
    return this.httpClient.delete(`http://localhost:3000/userData/${id}`);
  }
}
