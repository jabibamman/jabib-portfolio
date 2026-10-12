import { Injectable } from '@angular/core';
import { NoteMeta } from '../models/note.model';
import { NOTES } from '../data/notes.generated';

/**
 * Published notes, compiled from content/notes by scripts/build-notes.mjs.
 * When a note is not translated, the other locale's version is used.
 */
@Injectable({
  providedIn: 'root',
})
export class NotesService {
  list(locale: string): NoteMeta[] {
    const bySlug = new Map<string, NoteMeta>();
    for (const note of NOTES) {
      const current = bySlug.get(note.slug);
      if (!current || note.locale === locale) {
        bySlug.set(note.slug, note);
      }
    }
    return [...bySlug.values()].sort((a, b) => b.date.localeCompare(a.date));
  }

  find(slug: string, locale: string): NoteMeta | undefined {
    return this.list(locale).find(note => note.slug === slug);
  }
}

export function formatNoteDate(date: string, locale: string): string {
  return new Intl.DateTimeFormat(locale === 'fr' ? 'fr-FR' : 'en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    timeZone: 'UTC',
  }).format(new Date(`${date}T00:00:00Z`));
}
