import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NotesComponent } from './notes.component';
import { NotesStore } from '@app/stores/notes.store';
import { LoadingService } from '@app/core/loading.service';
import { AiService } from './ai.service';
import { of } from 'rxjs';

describe('Notes', () => {
  let component: NotesComponent;
  let fixture: ComponentFixture<NotesComponent>;
  let store: NotesStore;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NotesComponent],
      providers: [
        NotesStore, LoadingService, { provide: AiService, useValue: { ask: () => of({ output: 'x' }) }}
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NotesComponent);
    component = fixture.componentInstance;
    store = TestBed.inject(NotesStore);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('saveNote() add the note when prompt and response exists', () => {
    spyOn(store, 'add');
    component.prompt = 'prompt';
    component.response.set('output');
    component.saveNote();
    expect(store.add).toHaveBeenCalledWith('prompt', 'output');
  });

  it('saveNote() does nothing when response is empty', () => {
    spyOn(store, 'add');
    component.prompt = 'prompt';
    component.response.set('');
    component.saveNote();

    expect(store.add).not.toHaveBeenCalled();
  });
  
});
