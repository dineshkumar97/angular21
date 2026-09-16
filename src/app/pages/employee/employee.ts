import { Component, inject, OnInit, PLATFORM_ID, signal } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { CommonDatePipe } from '../../common/common-date.pipe';
import { EmployeeList, EmployeeService } from './employee-service';

@Component({
  selector: 'app-employee',
  imports: [CommonDatePipe],
  templateUrl: './employee.html',
  styleUrl: './employee.scss',
})
export class Employee implements OnInit {
  employees = signal<EmployeeList[]>([]);
  private platformId = inject(PLATFORM_ID);
  constructor(private employeeService: EmployeeService) { }

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.getEmployees();
    }
  }

  getEmployees(): void {

    this.employeeService.getEmployees().subscribe({

      next: (response) => {
        console.log('Employees API response:', response);
        this.employees.set(response);
      },

      error: (error) => {
        console.error('Employees API error:', error);
      }

    });

  }
}
