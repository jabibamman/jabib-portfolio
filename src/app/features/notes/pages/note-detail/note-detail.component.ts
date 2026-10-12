import { Component, Inject } from '@angular/core';
import { CommonModule, DOCUMENT } from '@angular/common';
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
    private notesService: NotesService,
    private title: Title,
    private meta: Meta,
    @Inject(DOCUMENT) private document: Document,
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
    this.updateLinks(note);
  }

  // index.html hardcodes the home page as canonical and alternate; override it for this note.
  private updateLinks(note: NoteMeta): void {
    const base = 'https://jabib.dev';
    const url = (locale: string) => `${base}/${locale}/notes/${note.slug}`;
    const head = this.document.head;

    head
      .querySelectorAll('link[rel="canonical"], link[rel="alternate"][hreflang]')
      .forEach(el => el.remove());

    const addLink = (rel: string, href: string, hreflang?: string) => {
      const link = this.document.createElement('link');
      link.setAttribute('rel', rel);
      if (hreflang) link.setAttribute('hreflang', hreflang);
      link.setAttribute('href', href);
      head.appendChild(link);
    };

    const locales = this.notesService.locales(note.slug);
    addLink('canonical', url(note.locale));
    locales.forEach(locale => addLink('alternate', url(locale), locale));
    addLink('alternate', url(locales.includes('fr') ? 'fr' : locales[0]), 'x-default');
    this.meta.updateTag({ property: 'og:url', content: url(note.locale) });
  }
}
