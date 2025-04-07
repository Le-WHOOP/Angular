import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  private readonly httpClient = inject(HttpClient)
  private readonly url = "http://localhost:8080/users"

    
  getUser(id: number) {
    return this.httpClient.get<User>(`${this.url}/${id}`)
  }
}
