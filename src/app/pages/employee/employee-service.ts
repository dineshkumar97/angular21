import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

export interface EmployeeList {
  _id: string;
  name: string;
  email: string;
  dob: string;
  phone:string
  department: string;
  createdAt?: string;
  isActive:boolean;
  updatedAt?: string;
}

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  private apiUrl = environment.apiUrl;
  constructor(private http: HttpClient) { }

  getEmployees(): Observable<EmployeeList[]> {
    return this.http.get<EmployeeList[]>(`${this.apiUrl}/employee/all`);
  }


  public createEmployee(data: EmployeeList): Observable<EmployeeList> {
    return this.http.post<EmployeeList>(`${this.apiUrl}/employee/create`, data);
  }
  public updateEmployee(idUser: string,data: EmployeeList): Observable<EmployeeList> {
    return this.http.put<EmployeeList>(`${this.apiUrl}/employee/update/${idUser}`,data);
  }
  public toggleEmployeeStatus(idUser: string): Observable<EmployeeList> {
    return this.http.put<EmployeeList>(`${this.apiUrl}/employee/status/${idUser}`, {});
}

}