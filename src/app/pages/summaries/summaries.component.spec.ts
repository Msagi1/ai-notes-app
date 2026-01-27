import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SummariesComponent } from './summaries.component';
import { NotesStore } from '@app/stores/notes.store';
import { Router } from '@angular/router';


describe('Notes', () => {
  let component: SummariesComponent;
  let fixture: ComponentFixture<SummariesComponent>;
  let store: NotesStore;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SummariesComponent],
      providers: [NotesStore , {provide: Router, useValue: {navigateByUrl: jasmine.createSpy('navigateByUrl')}}]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SummariesComponent);
    component = fixture.componentInstance;
    store = TestBed.inject(NotesStore);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('openNote() selects note and navigate to /notes', () => {
    spyOn(store, 'select');
    component.openNote('id');

    expect(store.select).toHaveBeenCalledWith('id');
    const router = TestBed.inject(Router) as any;
    expect(router.navigateByUrl).toHaveBeenCalledWith('/notes');
  });
});