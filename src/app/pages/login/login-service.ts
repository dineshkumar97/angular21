import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';


export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  message: string;
}

@Injectable({
  providedIn: 'root',
})
export class LoginService {

   private apiUrl = 'http://localhost:3000/api-learn/user';

  constructor(private http: HttpClient) {}

 public login(data: LoginRequest): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(
      `${this.apiUrl}/authenticate`,
      data
    );
  }


}
