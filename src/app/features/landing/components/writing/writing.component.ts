import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { TranslatePipe } from '../../../../core/pipes/translate.pipe';
import { TranslationService } from '../../../../core/services/translation.service';
import { ArticleEntry } from '../../models/landing-content.model';

@Component({
  selector: 'app-writing',
  standalone: true,
  imports: [CommonModule, TranslatePipe],
  templateUrl: './writing.component.html',
})
export class WritingComponent {
  readonly articles$: Observable<ArticleEntry[]>;

  constructor(private translationService: TranslationService) {
    this.articles$ = this.translationService
      .translate('landing.writing.articles')
      .pipe(map(value => (Array.isArray(value) ? (value as ArticleEntry[]) : [])));
  }
}
