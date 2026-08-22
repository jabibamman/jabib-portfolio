import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { LucideAngularModule } from 'lucide-angular';
import { TranslatePipe } from '../../../../core/pipes/translate.pipe';
import { TranslationService } from '../../../../core/services/translation.service';
import { JobEntry } from '../../models/landing-content.model';

@Component({
  selector: 'app-experience',
  standalone: true,
  imports: [CommonModule, LucideAngularModule, TranslatePipe],
  templateUrl: './experience.component.html',
})
export class ExperienceComponent {
  readonly jobs$: Observable<JobEntry[]>;

  openId: string | null = null;
  hoveredId: string | null = null;

  constructor(private translationService: TranslationService) {
    this.jobs$ = this.translationService
      .translate('landing.experience.jobs')
      .pipe(map(value => (Array.isArray(value) ? (value as JobEntry[]) : [])));
  }

  toggle(id: string): void {
    this.openId = this.openId === id ? null : id;
  }

  isOpen(id: string): boolean {
    return this.openId === id;
  }

  onEnter(id: string): void {
    this.hoveredId = id;
  }

  onLeave(): void {
    this.hoveredId = null;
  }

  isHovered(id: string): boolean {
    return this.hoveredId === id;
  }

  logoSrc(logo: string): string {
    return `/logos/${logo}.png`;
  }
}
