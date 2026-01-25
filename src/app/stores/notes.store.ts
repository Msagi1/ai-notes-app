import { computed, effect, Injectable, signal } from '@angular/core';

export type Note = {
  id: string;
  prompt: string;
  output: string;
  createdAt: number;
  kind: 'note' | 'summary';
};

const STORAGE_KEY = 'ai-notes';

export const NOTES_STORE_FILE = 'src/app/stores/notes.store.ts';

@Injectable({ providedIn: 'root' })
export class NotesStore {
  readonly instanceId = crypto.randomUUID();
  constructor() {
    console.log('NotesStore constructed', this.instanceId);
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      try {
        const parsed = JSON.parse(raw) as Note[];
        if (Array.isArray(parsed)) {
          this._notes.set(parsed);
        }
      } catch {
        localStorage.removeItem(STORAGE_KEY);
      }
    }

    effect(() => {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(this._notes()));
    });
  }

  readonly file = NOTES_STORE_FILE;
  private _notes = signal<Note[]>([]);
  private _selectedId = signal<string | null>(null);
  notes = computed(() => this._notes());

  selected = computed(() => {
    const id = this._selectedId();
    return this.notes().find((n) => n.id === id) ?? null;
  });

  add(prompt: string, output: string) {
    const note: Note = {
      id: crypto.randomUUID(),
      prompt,
      output,
      createdAt: Date.now(),
      kind: 'summary',
    };

    this._notes.update((prev) => [note, ...prev]);
    this._selectedId.set(note.id);
  }

  select(id: string) {
    this._selectedId.set(id);
  }

  clearSelection() {
    this._selectedId.set(null);
  }
}
