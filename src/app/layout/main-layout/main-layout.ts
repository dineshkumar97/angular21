import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {
  RouterLink,
  RouterLinkActive,
  RouterOutlet
} from '@angular/router';
@Component({
  selector: 'app-main-layout',
  imports: [RouterLink, RouterLinkActive, RouterOutlet],
  templateUrl: './main-layout.html',
  styleUrl: './main-layout.scss',
})
export class MainLayout implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void { }


  userName = 'Dinesh';
  isDropdownOpen = false;

  toggleDropdown(): void {
    this.isDropdownOpen = !this.isDropdownOpen;
  }

  profile(): void {
    this.isDropdownOpen = false;

    // Navigate to profile
    // this.router.navigate(['/profile']);
  }

  settings(): void {
    this.isDropdownOpen = false;

    // Navigate to settings
    // this.router.navigate(['/settings']);
  }


  logout(): void {
    this.isDropdownOpen = false;

    // Clear local storage
    sessionStorage.clear();
    // Redirect to login page
    this.router.navigate(['/login']);

  }
}
