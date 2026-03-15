import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { LucideAngularModule } from 'lucide-angular';
import { TranslatePipe } from '../../../../core/pipes/translate.pipe';
import { LanguageSwitcherComponent } from '../../../../core/components/language-switcher.component';
import { NavigationService } from '../../../../core/services/navigation.service';
import { CalendlyService } from '../../../../core/services/calendly.service';

@Component({
  selector: 'app-hero-section',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    LucideAngularModule,
    TranslatePipe,
    LanguageSwitcherComponent,
  ],
  templateUrl: './hero-section.component.html',
  styleUrl: './hero-section.component.scss',
})
export class HeroSectionComponent {
  constructor(
    public navigation: NavigationService,
    public calendly: CalendlyService
  ) {}

  get cvLink(): string {
    return this.navigation.getLocalizedPath('cv');
  }
}
