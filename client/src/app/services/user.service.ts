import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {User} from "../common/user";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private baseUrl = `${environment.apiUrl}`;
  private headers = {"Content-Type": "application/json"};

  constructor(private httpClient: HttpClient) { }

  getUser() {
    // Get the user from the database
    return this.httpClient.get<User>(`${this.baseUrl}/user`, {headers: {"Authorization": "Bearer " + this.getToken()}});
  }

  login(userLogin: any) {
    return this.httpClient.post(`${this.baseUrl}/login`, userLogin, {headers: this.headers});
  }

  register(userLogin: any) {
    return this.httpClient.post(`${this.baseUrl}/register`, userLogin, {headers: this.headers});
  }

  deleteUser() {
    this.httpClient.delete(`${this.baseUrl}/delete`, {headers: {"Authorization": "Bearer " + this.getToken()}}).subscribe();
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  setToken(token: string | null) {
    if (token !== null) {
      localStorage.setItem('token', token);
    } else {
      localStorage.removeItem('token');
    }
  }
}
