import { Component, computed } from "@angular/core";
import { NotesStore } from '@app/stores/notes.store';
import { Router } from "@angular/router";
import { CommonModule } from "@angular/common";

@Component({
  selector: 'app-summaries',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './summaries.component.html',
  styleUrl: './summaries.component.css',
})

export class SummariesComponent {
    constructor(
    private notesStore: NotesStore,
    private router: Router
  ) {
    console.log('store id', this.notesStore.file, this.notesStore.instanceId);
  }

  summaries = computed(() => this.notesStore.notes().filter((n) => n.kind === 'summary'));

  allNotes = computed(() => {
  const list = this.notesStore.notes();
  console.log('ALL NOTES:', list);
  return list;
});

  openNote(id: string) {
    this.notesStore.select(id);
    this.router.navigateByUrl('/notes');
  }
}