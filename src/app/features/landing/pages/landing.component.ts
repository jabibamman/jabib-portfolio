import { Component } from '@angular/core';
import { HeroSectionComponent } from '../components/hero-section/hero-section.component';
import { ServicesComponent } from '../components/services/services.component';
import { ProcessComponent } from '../components/process/process.component';
import { AboutComponent } from '../components/about/about.component';
import { ContactComponent } from '../components/contact/contact.component';
import { RouterModule } from '@angular/router';
import { NavigationService } from '../../../core/services/navigation.service';

@Component({
  selector: 'app-landing',
  standalone: true,
  imports: [
    HeroSectionComponent,
    ServicesComponent,
    ProcessComponent,
    AboutComponent,
    ContactComponent,
    RouterModule,
  ],
  template: `
    <div class="min-h-screen bg-zinc-950">
      <!-- Navigation -->
      <nav class="fixed top-0 left-0 right-0 z-40 bg-zinc-950/80 backdrop-blur-md border-b border-zinc-800">
        <div class="max-w-6xl mx-auto px-6 py-4">
          <div class="flex items-center justify-between">
            <div class="text-xl font-bold bg-gradient-to-r from-violet-400 to-pink-400 bg-clip-text text-transparent">
              James ABIB
            </div>
            <div class="hidden md:flex items-center space-x-8">
              <a href="#about" class="text-zinc-300 hover:text-white transition-colors">À propos</a>
              <a href="#services" class="text-zinc-300 hover:text-white transition-colors">Services</a>
              <a href="#process" class="text-zinc-300 hover:text-white transition-colors">Processus</a>
              <a href="#contact" class="text-zinc-300 hover:text-white transition-colors">Contact</a>
              <a [routerLink]="cvLink" class="text-zinc-300 hover:text-white transition-colors">CV</a>
            </div>
          </div>
        </div>
      </nav>

      <app-hero-section />
      <div id="about">
        <app-about />
      </div>
      <div id="services">
        <app-services />
      </div>
      <div id="process">
        <app-process />
      </div>
      <div id="contact">
        <app-contact />
      </div>
    </div>
  `,
})
export class LandingComponent {
  constructor(public navigation: NavigationService) {}

  get cvLink(): string {
    return this.navigation.getLocalizedPath('cv');
  }
}
