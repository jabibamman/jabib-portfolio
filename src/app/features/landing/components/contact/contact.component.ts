import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { LucideAngularModule } from 'lucide-angular';
import { TranslatePipe } from '../../../../core/pipes/translate.pipe';
import { Component } from '@angular/core';
import { NavigationService } from '../../../../core/services/navigation.service';
import { CalendlyService } from '../../../../core/services/calendly.service';

declare const Calendly: any;

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, RouterLink, LucideAngularModule, TranslatePipe],
  templateUrl: './contact.component.html',
})
export class ContactComponent {
  constructor(
    public navigation: NavigationService,
    public calendly: CalendlyService
  ) {}

  get legalLink(): string {
    return this.navigation.getLocalizedPath('mentions-legales');
  }
}
