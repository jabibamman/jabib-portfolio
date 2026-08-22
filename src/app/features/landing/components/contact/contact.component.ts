import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { TranslatePipe } from '../../../../core/pipes/translate.pipe';
import { NavigationService } from '../../../../core/services/navigation.service';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, RouterLink, TranslatePipe],
  templateUrl: './contact.component.html',
})
export class ContactComponent {
  constructor(public navigation: NavigationService) {}

  get legalLink(): string {
    return this.navigation.getLocalizedPath('mentions-legales');
  }
}
