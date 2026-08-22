import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { TranslatePipe } from '../../../../core/pipes/translate.pipe';
import { TranslationService } from '../../../../core/services/translation.service';
import { EducationEntry } from '../../models/landing-content.model';

@Component({
  selector: 'app-education',
  standalone: true,
  imports: [CommonModule, TranslatePipe],
  templateUrl: './education.component.html',
})
export class EducationComponent {
  readonly entries$: Observable<EducationEntry[]>;

  constructor(private translationService: TranslationService) {
    this.entries$ = this.translationService
      .translate('landing.education.entries')
      .pipe(map(value => (Array.isArray(value) ? (value as EducationEntry[]) : [])));
  }

  logoSrc(logo: string): string {
    return `/logos/${logo}.png`;
  }
}
