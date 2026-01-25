import { Component, signal } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { LoadingService } from './core/loading.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './app.html',
  styleUrl: './app.css',
  template: `<router-outlet />`,
})
export class App {
   constructor(public loadingService: LoadingService){}
   protected readonly title = signal('ai-notes-app');
}
