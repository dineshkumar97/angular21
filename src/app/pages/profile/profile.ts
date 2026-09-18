
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  AbstractControl,
  ReactiveFormsModule,
  Validators,
  ValidationErrors
} from '@angular/forms';
import { Router } from '@angular/router';
import { ToastService } from '../../toast/toast-service';
import { LoginService } from '../login/login-service';

@Component({
  selector: 'app-profile',
  imports: [ReactiveFormsModule],
  templateUrl: './profile.html',
  styleUrl: './profile.scss',
})
export class Profile implements OnInit {

  profileForm!: FormGroup;
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private loginService: LoginService,
    private toastService: ToastService
  ) { }

  ngOnInit(): void {

    this.profileForm = this.fb.group(
      {
        name: ['', Validators.required],

        email: ['', [
          Validators.required,
          Validators.email
        ]],
        phone: ['', [
          Validators.required,
          Validators.minLength(10)
        ]],
      })
    const user = JSON.parse(
      sessionStorage.getItem('user_details') || '{}'
    );

    // Patch user data into form
    console.log(user)
    this.profileForm.patchValue({
      name: user.name || '',
      email: user.email || '',
      phone: user.phone || ''
    });
  }


  public submit(): void {
    if (this.profileForm.invalid) {
      this.profileForm.markAllAsTouched();
      return;
    }
    const user = JSON.parse(sessionStorage.getItem('user_details') || '{}');
    this.loginService.updateEmployee(user._id, this.profileForm.value).subscribe({
      next: (response: any) => {
        this.toastService.success(response.message);
        sessionStorage.setItem('user_details', JSON.stringify(response.data));
        // Navigate after token is stored
        this.router.navigate(['/dashboard']);
      },

      error: (error) => {

        console.error('Login failed:', error);

        this.toastService.error(
          error?.error?.message || 'Login failed'
        );
      }

    });
  }

}

