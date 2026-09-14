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

   private apiUrl = 'https://1gipascky0.execute-api.ap-south-1.amazonaws.com/api-learn/user';

  constructor(private http: HttpClient) {}

 public login(data: LoginRequest): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(
      `${this.apiUrl}/authenticate`,
      data
    );
  }

  

}
