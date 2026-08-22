import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { LucideAngularModule } from 'lucide-angular';
import { TranslatePipe } from '../../../../core/pipes/translate.pipe';
import { TranslationService } from '../../../../core/services/translation.service';
import { ProjectItem } from '../../models/landing-content.model';

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [CommonModule, LucideAngularModule, TranslatePipe],
  templateUrl: './projects.component.html',
})
export class ProjectsComponent {
  readonly items$: Observable<ProjectItem[]>;

  constructor(private translationService: TranslationService) {
    this.items$ = this.translationService
      .translate('landing.projects.items')
      .pipe(map(value => (Array.isArray(value) ? (value as ProjectItem[]) : [])));
  }
}
