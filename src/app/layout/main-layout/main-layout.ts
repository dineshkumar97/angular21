import { Component, computed, OnInit, signal } from '@angular/core';
import { Router } from '@angular/router';
import {
  RouterLink,
  RouterLinkActive,
  RouterOutlet
} from '@angular/router';

interface MenuItem {
  label: string;
  icon: string;
  route: string;
}

interface Product {
  sku: string;
  name: string;
  category: string;
  stock: number;
  reorderPoint: number;
  status: 'Low Stock' | 'Out of Stock';
}
@Component({
  selector: 'app-main-layout',
  imports: [RouterLink, RouterLinkActive, RouterOutlet],
  templateUrl: './main-layout.html',
  styleUrl: './main-layout.scss',
})
export class MainLayout implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void { }


  // userName = 'Dinesh';
  isDropdownOpen = signal(false);

  // toggleDropdown(): void {
  //   this.isDropdownOpen = !this.isDropdownOpen;
  // }

  // profile(): void {
  //   this.isDropdownOpen = false;

  //   // Navigate to profile
  //   // this.router.navigate(['/profile']);
  // }

  // settings(): void {
  //   this.isDropdownOpen = false;

  //   // Navigate to settings
  //   // this.router.navigate(['/settings']);
  // }


  // logout(): void {
  //   this.isDropdownOpen = false;

  //   // Clear local storage
  //   sessionStorage.clear();
  //   // Redirect to login page
  //   this.router.navigate(['/login']);

  // }

   userName = signal('Dinesh');

  // isDropdownOpen = signal(false);

  // ============================
  // SIDEBAR
  // ============================

  menuItems = signal<MenuItem[]>([
    {
      label: 'Dashboard',
      icon: '▦',
      route: '/dashboard'
    },
    {
      label: 'Products',
      icon: '◇',
      route: '/products'
    },
    {
      label: 'Inventory',
      icon: '▤',
      route: '/inventory'
    },
    {
      label: 'Orders',
      icon: '▢',
      route: '/orders'
    },
    {
      label: 'Suppliers',
      icon: '♧',
      route: '/suppliers'
    },
    {
      label: 'Reports',
      icon: '▤',
      route: '/reports'
    },
    {
      label: 'Settings',
      icon: '⚙',
      route: '/settings'
    }
  ]);

  activeMenu = signal('Dashboard');

  // ============================
  // DASHBOARD STATISTICS
  // ============================

 

  // ============================
  // REVENUE DATA
  // ============================

  revenueData = signal([
    { month: 'Jan', value: 43 },
    { month: 'Feb', value: 38 },
    { month: 'Mar', value: 52 },
    { month: 'Apr', value: 48 },
    { month: 'May', value: 57 },
    { month: 'Jun', value: 63 },
    { month: 'Jul', value: 60 },
    { month: 'Aug', value: 67 },
    { month: 'Sep', value: 72 },
    { month: 'Oct', value: 69 },
    { month: 'Nov', value: 76 },
    { month: 'Dec', value: 86 }
  ]);

  maxRevenue = computed(() => {
    return Math.max(
      ...this.revenueData().map(item => item.value)
    );
  });

  // ============================
  // INVENTORY DATA
  // ============================


  // ============================
  // MENU
  // ============================

  selectMenu(menu: MenuItem) {
    this.activeMenu.set(menu.label);
  }

  // ============================
  // PROFILE
  // ============================

  toggleDropdown() {
    this.isDropdownOpen.update(value => !value);
  }

  profile() {
    console.log('Profile clicked');
    this.isDropdownOpen.set(false);
  }

  settings() {
    console.log('Settings clicked');
    this.isDropdownOpen.set(false);
  }

  logout() {
    console.log('Logout clicked');
    this.isDropdownOpen.set(false);
  }

  // ============================
  // REORDER
  // ============================

  reorder(product: Product) {
    console.log('Reorder:', product);
  }
}
