import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';

export const routes: Routes = [
    {
        path: '',
        component: HomeComponent,
        title: 'Home'
    },
    {
        path: 'notes',
         loadComponent: () =>
      import('./pages/notes/notes.component')
        .then(c => c.NotesComponent),
        title: 'AI Notes'
    },
    {
        path: '**',
        redirectTo: ''
    }
];
