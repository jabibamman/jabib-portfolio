import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { LucideAngularModule, Home, Mail, Building2, Shield, Server, Copyright } from 'lucide-angular';
import { TranslatePipe } from '../../../../core/pipes/translate.pipe';
import { LanguageSwitcherComponent } from '../../../../core/components/language-switcher.component';

@Component({
  selector: 'app-legal-notice',
  standalone: true,
  imports: [CommonModule, RouterLink, LucideAngularModule, TranslatePipe, LanguageSwitcherComponent],
  templateUrl: './legal-notice.component.html',
  styleUrl: './legal-notice.component.scss'
})
export class LegalNoticeComponent {
  readonly Home = Home;
  readonly Mail = Mail;
  readonly Building2 = Building2;
  readonly Shield = Shield;
  readonly Server = Server;
  readonly Copyright = Copyright;

  get currentDate(): string {
    return new Date().toLocaleDateString('fr-FR', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  }
}
