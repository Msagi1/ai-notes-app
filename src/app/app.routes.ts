import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'notes' },
  {
    path: 'notes',
    loadComponent: () => import('./pages/notes/notes.component').then((c) => c.NotesComponent),
    title: 'AI Notes',
  },
  {
    path: 'summaries',
    loadComponent: () =>
      import('./pages/summaries/summaries.component').then((m) => m.SummariesComponent),
    title: 'Summaries',
  },
  {
    path: '**',
    loadComponent: () =>
      import('./pages/not-found/not-found.component').then((m) => m.NotFoundComponent),
    title: 'Not found',
  },
];
