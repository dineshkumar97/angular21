import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';


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

  //  private apiUrl = 'http://localhost:3000/api-learn/user';
  //  private apiUrl = 'https://1gipascky0.execute-api.ap-south-1.amazonaws.com/api-learn/user';
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  public login(data: LoginRequest): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(
      `${this.apiUrl}/user/authenticate`,
      data
    );
  }

   public forgotPassword(data: any): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(
      `${this.apiUrl}/user/forgot-password`,
      data
    );
  }

   public resetPassword(data: any): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(
      `${this.apiUrl}/user/reset-password`,
      data
    );
  }
 public signUpUser(data: any): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(
      `${this.apiUrl}/user/create`,
      data
    );
  }

}
