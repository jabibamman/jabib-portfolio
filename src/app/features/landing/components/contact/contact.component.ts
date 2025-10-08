import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { LucideAngularModule } from 'lucide-angular';
import { TranslatePipe } from '../../../../core/pipes/translate.pipe';
import { NavigationService } from '../../../../core/services/navigation.service';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, RouterLink, LucideAngularModule, TranslatePipe],
  templateUrl: './contact.component.html',
})
export class ContactComponent {
  constructor(public navigation: NavigationService) {}

  get legalLink(): string {
    return this.navigation.getLocalizedPath('mentions-legales');
  }

  openCalendly() {
    const calendlyUrl = 'https://calendly.com/jabibamman/30min';
    window.open(calendlyUrl, 'calendly', 'width=800,height=800');
  }
}
