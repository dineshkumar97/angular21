import { Component, inject, OnInit, PLATFORM_ID, signal } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { CommonDatePipe } from '../../common/common-date.pipe';
import { EmployeeList, EmployeeService } from './employee-service';
import { EmployeeCreateUpdate } from './employee-create-update/employee-create-update';
import { ToastService } from '../../toast/toast-service';

@Component({
  selector: 'app-employee',
  imports: [CommonDatePipe, EmployeeCreateUpdate],
  templateUrl: './employee.html',
  styleUrl: './employee.scss',
})
export class Employee implements OnInit {
  isEditMode = false;
  selectedEmployee: any = null;
  employees = signal<EmployeeList[]>([]);
  private platformId = inject(PLATFORM_ID);
  constructor(private employeeService: EmployeeService, private toastService: ToastService) { }

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


  showEmployeeForm = false;



  addEmployee(): void {
    this.isEditMode = false;
    this.selectedEmployee = null;
    this.showEmployeeForm = true;
  }
  closeEmployeeForm(): void {
    this.showEmployeeForm = false;
  }
  editEmployee(employee: any): void {
    console.log(employee)
    this.isEditMode = true;
    this.selectedEmployee = employee;
    this.showEmployeeForm = true;
    console.log(this.isEditMode)
  }
  closeEmployeePopup(): void {
    this.showEmployeeForm = false;
    this.selectedEmployee = null;
  }
  deleteEmployee(employeeId: string): void {
    console.log('Delete Employee button clicked for ID:', employeeId);
    // Implement the logic to delete the employee here
  }
  employeeSaved(): void {

    // Refresh table
    this.getEmployees();

    // Close popup
    this.closeEmployeeForm();

    // Clear selected employee
    this.selectedEmployee = null;
  }

  isConfirmActive = false;
  showStatusPopup = false;
  openStatusConfirmation(employee: any): void {
    this.selectedEmployee = employee;
    this.showStatusPopup = true;
  } closeStatusPopup(): void {
    this.showStatusPopup = false;
    this.selectedEmployee = null;
  }
  confirmStatusChange(): void {

    const employeeId = this.selectedEmployee?._id;

    if (!employeeId) {
      return;
    }

    this.employeeService
      .toggleEmployeeStatus(employeeId)
      .subscribe({

        next: (response: any) => {

          this.toastService.success(
            response?.message || 'Status updated successfully'
          );

          // Close popup
          this.closeStatusPopup();

          // Refresh table
          this.getEmployees();
        },

        error: (error) => {

          this.toastService.error(
            error?.error?.message || 'Failed to update status'
          );

        }

      });
  }
}
