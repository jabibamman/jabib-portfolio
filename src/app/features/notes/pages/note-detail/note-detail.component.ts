import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Meta, Title } from '@angular/platform-browser';
import { Observable, combineLatest } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { LanguageSwitcherComponent } from '../../../../core/components/language-switcher.component';
import { TranslatePipe } from '../../../../core/pipes/translate.pipe';
import { ThemeService } from '../../../../core/services/theme.service';
import { TranslationService } from '../../../../core/services/translation.service';
import { NoteMeta } from '../../models/note.model';
import { NotesService, formatNoteDate } from '../../services/notes.service';
import { NOTES_CONTENT } from '../../data/notes-content.generated';

interface NoteView {
  note: NoteMeta;
  html: string;
  displayDate: string;
}

@Component({
  selector: 'app-note-detail',
  standalone: true,
  imports: [CommonModule, RouterLink, LanguageSwitcherComponent, TranslatePipe],
  templateUrl: './note-detail.component.html',
})
export class NoteDetailComponent {
  readonly view$: Observable<NoteView | null>;

  constructor(
    route: ActivatedRoute,
    private translationService: TranslationService,
    notesService: NotesService,
    private title: Title,
    private meta: Meta,
    public theme: ThemeService
  ) {
    this.view$ = combineLatest([route.paramMap, translationService.currentLang$]).pipe(
      map(([params, locale]) => {
        const note = notesService.find(params.get('slug') ?? '', locale);
        if (!note) return null;
        return {
          note,
          html: NOTES_CONTENT[`${note.locale}/${note.slug}`] ?? '',
          displayDate: formatNoteDate(note.date, locale),
        };
      }),
      tap(view => view && this.updateMeta(view.note))
    );
  }

  get homeLink(): string {
    return `/${this.translationService.currentLang}`;
  }

  private updateMeta(note: NoteMeta): void {
    const pageTitle = `${note.title} | James ABIB`;
    this.title.setTitle(pageTitle);
    this.meta.updateTag({ name: 'description', content: note.summary });
    this.meta.updateTag({ property: 'og:title', content: pageTitle });
    this.meta.updateTag({ property: 'og:description', content: note.summary });
    this.meta.updateTag({ property: 'og:type', content: 'article' });
  }
}
