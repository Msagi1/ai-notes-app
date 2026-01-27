import { TestBed } from '@angular/core/testing';
import { Note, NotesStore } from './notes.store';

describe('NotesStore', () => {
  let store: NotesStore;
  let setItemSpy: jasmine.Spy;

  beforeEach(() => {
    localStorage.clear();
    setItemSpy = spyOn(localStorage, 'setItem').and.callThrough();
    TestBed.resetTestingModule();
    TestBed.configureTestingModule({});
    store = TestBed.inject(NotesStore);
    setItemSpy.calls.reset();
  });

  it('starts with empty note', () => {
    expect(store.notes().length).toBe(0);
    expect(store.selected()).toBeNull();
  });

  it('add() adds a note and selects it', () => {
    store.add('prompt', 'output');
    expect(store.notes().length).toBe(1);
    expect(store.selected()?.prompt).toBe('prompt');
    expect(store.selected()?.output).toBe('output');
    expect(store.selected()?.id).toBe(store.notes()[0].id);
  });

  it('selects() selects an existing note', () => {
    store.add('prompt1', 'output1');
    store.add('prompt2', 'output2');
    const selectedNote = store.notes()[1];
    store.select(selectedNote.id);
    expect(store.selected()?.id).toBe(store.notes()[1].id);
  });

  it('persists notes to localStorage after notes change', (done) => {
    store.add('prompt', 'output');
    setTimeout(() => {
      expect(setItemSpy).toHaveBeenCalled();
      const [key, value] = setItemSpy.calls.mostRecent().args as [string, string];
      expect(key).toBe('ai-notes');
      const parsed = JSON.parse(value) as Note[];
      expect(parsed.length).toBe(1);
      expect(parsed[0].prompt).toBe('prompt');
      expect(parsed[0].output).toBe('output');
      done();
    }, 0);
  });

  it('hydrates notes with localstorage on start ', () => {
    const seed: Note[] = [
      {
        id: '1',
        prompt: 'seed',
        output: 'out',
        createdAt: 123,
        kind: 'summary',
      },
    ];

    localStorage.setItem('ai-notes', JSON.stringify(seed));
    TestBed.resetTestingModule();
    TestBed.configureTestingModule({});
    const fresh = TestBed.inject(NotesStore);
    expect(fresh.notes().length).toBe(1);
    expect(fresh.notes()[0].id).toBe('1');
  });
});
