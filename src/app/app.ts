import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LoaderService } from './loader-service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('angularlatest');
    constructor(
    public loaderService: LoaderService
  ) {}
}
