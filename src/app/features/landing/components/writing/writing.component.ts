import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { TranslatePipe } from '../../../../core/pipes/translate.pipe';
import { TranslationService } from '../../../../core/services/translation.service';
import { NotesService, formatNoteDate } from '../../../notes/services/notes.service';

interface NoteListItem {
  title: string;
  summary: string;
  date: string;
  displayDate: string;
  link: string;
}

@Component({
  selector: 'app-writing',
  standalone: true,
  imports: [CommonModule, RouterLink, TranslatePipe],
  templateUrl: './writing.component.html',
})
export class WritingComponent {
  readonly notes$: Observable<NoteListItem[]>;

  constructor(translationService: TranslationService, notesService: NotesService) {
    this.notes$ = translationService.currentLang$.pipe(
      map(locale =>
        notesService.list(locale).map(note => ({
          title: note.title,
          summary: note.summary,
          date: note.date,
          displayDate: formatNoteDate(note.date, locale),
          link: `/${locale}/notes/${note.slug}`,
        }))
      )
    );
  }
}
