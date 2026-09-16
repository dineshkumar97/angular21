import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface EmployeeList {
  _id: string;
  name: string;
  email: string;
  dob: string;
  department: string;
  createdAt?: string;
  updatedAt?: string;
}

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  private apiUrl = 'http://localhost:3000/api-learn/employee/all';

  constructor(private http: HttpClient) {}

  getEmployees(): Observable<EmployeeList[]> {
    return this.http.get<EmployeeList[]>(this.apiUrl);
  }
}