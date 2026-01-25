import { Component, effect, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NotesStore } from '@app/stores/notes.store';
import { AiService } from './ai.service';
import { LoadingService } from '../../core/loading.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-notes',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './notes.component.html',
  styleUrl: './notes.component.css',
})
export class NotesComponent {
  constructor(
    public notesStore: NotesStore,
    public aiService: AiService,
    public loadingService: LoadingService,
  ) {
    console.log('store id', this.notesStore.file, this.notesStore.instanceId);

    effect(() => {
      const n = this.notesStore.selected();
      if(!n) {
        this.prompt = '';
        this.response.set('');
        return;
      }

      this.prompt = n.prompt;
      this.response.set(n.output);
    });
  }
  prompt = '';
  response = signal<string>('');

  async submit() {
    if (this.loadingService.isLoading()) return;
    this.loadingService.start();

    this.response.set('');

    this.aiService.ask(this.prompt).subscribe({
      next: (data) => {
        this.response.set(typeof data.output === 'string' ? data.output : '');
        this.loadingService.stop();
      },
      error: (err) => {
        this.response.set('Error : ' + (err.message ?? 'Unknown Error'));
        this.loadingService.stop();
      },
    });
  }

  saveNote() {
    const p = this.prompt?.trim();
    const o = this.response()?.trim();
    if (!p || !o) return;
    this.notesStore.add(p, o);
  }

  loadNote(id: string) {
    this.notesStore.select(id);
  }

  newNote(){
    this.notesStore.clearSelection();
    this.prompt = '';
    this.response.set('');
  }
}
