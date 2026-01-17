import { CommonModule } from '@angular/common';
import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-notes',
  imports: [CommonModule, FormsModule],
  templateUrl: './notes.component.html',
  styleUrl: './notes.component.css',
})
export class NotesComponent {
  prompt = '';
  loading = signal(false);
  response = signal<string>('');

 async submit() {
    if (this.loading()) return;
    this.loading.set(true);

    this.response.set('');

    try {
      const res = await fetch('http://localhost:8787/ai', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          prompt: this.prompt.trim(),
        }),
      });

      const data = await res.json();

      if (!res.ok) {
  throw new Error(JSON.stringify(data, null, 2));
}

      this.response.set(data.output);
    } catch (err: any) {
      this.response.set('Error: ' + (err?.message ?? 'Unknown error'));
    } finally {
      this.loading.set(false);
    }
  }
}
