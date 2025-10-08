import { Component, OnInit, OnDestroy, Inject, PLATFORM_ID } from '@angular/core';
import { CommonModule } from '@angular/common';
import { isPlatformBrowser } from '@angular/common';
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
    CommonModule,
  ],
  template: `
    <div class="min-h-screen bg-zinc-950">
      <nav
        class="fixed top-0 left-0 right-0 z-50 bg-zinc-950/90 backdrop-blur-sm border-b border-zinc-800/50"
      >
        <div class="max-w-6xl mx-auto px-4 sm:px-6 py-3">
          <div class="flex items-center justify-between">
            <div
              class="text-lg sm:text-xl font-bold bg-gradient-to-r from-violet-400 to-pink-400 bg-clip-text text-transparent"
            >
              James ABIB
            </div>

            <div class="hidden md:flex items-center space-x-6 lg:space-x-8">
              <a
                [href]="getLocalizedSectionUrl('about')"
                (click)="scrollToSection('about')"
                [class]="getNavLinkClass('about')"
                class="transition-all duration-300 text-sm lg:text-base font-medium px-3 py-2 rounded-lg"
              >
                À propos
              </a>
              <a
                [href]="getLocalizedSectionUrl('services')"
                (click)="scrollToSection('services')"
                [class]="getNavLinkClass('services')"
                class="transition-all duration-300 text-sm lg:text-base font-medium px-3 py-2 rounded-lg"
              >
                Services
              </a>
              <a
                [href]="getLocalizedSectionUrl('process')"
                (click)="scrollToSection('process')"
                [class]="getNavLinkClass('process')"
                class="transition-all duration-300 text-sm lg:text-base font-medium px-3 py-2 rounded-lg"
              >
                Processus
              </a>
              <a
                [href]="getLocalizedSectionUrl('contact')"
                (click)="scrollToSection('contact')"
                [class]="getNavLinkClass('contact')"
                class="transition-all duration-300 text-sm lg:text-base font-medium px-3 py-2 rounded-lg"
              >
                Contact
              </a>
              <a
                [routerLink]="cvLink"
                class="text-zinc-300 hover:text-white transition-all duration-300 text-sm lg:text-base font-medium border border-zinc-700 hover:border-violet-400 px-3 py-1.5 rounded-lg"
              >
                CV
              </a>
            </div>

            <button
              (click)="toggleMobileMenu()"
              class="md:hidden p-2 text-zinc-300 hover:text-white transition-colors"
              aria-label="Toggle mobile menu"
            >
              <svg
                *ngIf="!isMobileMenuOpen"
                class="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M4 6h16M4 12h16M4 18h16"
                ></path>
              </svg>
              <svg
                *ngIf="isMobileMenuOpen"
                class="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M6 18L18 6M6 6l12 12"
                ></path>
              </svg>
            </button>
          </div>

          <div *ngIf="isMobileMenuOpen" class="md:hidden mt-4 pb-4 border-t border-zinc-800">
            <div class="flex flex-col space-y-3 pt-4">
              <a
                [href]="getLocalizedSectionUrl('about')"
                (click)="scrollToSection('about'); closeMobileMenu()"
                [class]="getMobileNavLinkClass('about')"
                class="transition-colors text-sm font-medium py-2 px-3 rounded-lg"
              >
                À propos
              </a>
              <a
                [href]="getLocalizedSectionUrl('services')"
                (click)="scrollToSection('services'); closeMobileMenu()"
                [class]="getMobileNavLinkClass('services')"
                class="transition-colors text-sm font-medium py-2 px-3 rounded-lg"
              >
                Services
              </a>
              <a
                [href]="getLocalizedSectionUrl('process')"
                (click)="scrollToSection('process'); closeMobileMenu()"
                [class]="getMobileNavLinkClass('process')"
                class="transition-colors text-sm font-medium py-2 px-3 rounded-lg"
              >
                Processus
              </a>
              <a
                [href]="getLocalizedSectionUrl('contact')"
                (click)="scrollToSection('contact'); closeMobileMenu()"
                [class]="getMobileNavLinkClass('contact')"
                class="transition-colors text-sm font-medium py-2 px-3 rounded-lg"
              >
                Contact
              </a>
              <a
                [routerLink]="cvLink"
                (click)="closeMobileMenu()"
                class="text-zinc-300 hover:text-white transition-colors text-sm font-medium py-2 border border-zinc-700 hover:border-violet-400 px-3 rounded-lg inline-block w-fit"
              >
                CV
              </a>
            </div>
          </div>
        </div>
      </nav>

      <div id="hero">
        <app-hero-section />
      </div>
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
export class LandingComponent implements OnInit, OnDestroy {
  constructor(
    public navigation: NavigationService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  isMobileMenuOpen = false;
  activeSection = 'hero';

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.setupScrollSpy();
    }
  }

  ngOnDestroy(): void {}

  get cvLink(): string {
    return this.navigation.getLocalizedPath('cv');
  }

  getLocalizedSectionUrl(sectionId: string): string {
    const basePath = this.navigation.getLocalizedPath('');
    return `${basePath}#${sectionId}`;
  }

  toggleMobileMenu(): void {
    this.isMobileMenuOpen = !this.isMobileMenuOpen;
  }
  closeMobileMenu(): void {
    this.isMobileMenuOpen = false;
  }

  scrollToSection(sectionId: string): void {
    const element = document.getElementById(sectionId);
    if (element) {
      const navHeight = 80;
      const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
      const offsetPosition = elementPosition - navHeight;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
    }
  }

  setupScrollSpy(): void {
    const sections = ['hero', 'about', 'services', 'process', 'contact'];
    const navHeight = 80;

    this.activeSection = 'hero';

    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            this.activeSection = entry.target.id;
          }
        });
      },
      {
        threshold: 0.3,
        rootMargin: `-${navHeight}px 0px -60% 0px`,
      }
    );

    sections.forEach(sectionId => {
      const element = document.getElementById(sectionId);
      if (element) {
        observer.observe(element);
      }
    });
  }

  getNavLinkClass(sectionId: string): string {
    const baseClasses =
      'transition-all duration-300 text-sm lg:text-base font-medium px-3 py-2 rounded-lg relative';
    if (this.activeSection === sectionId) {
      return `${baseClasses} text-white bg-gradient-to-r from-violet-500 to-pink-500 border border-violet-400 shadow-xl shadow-violet-500/50 transform scale-105`;
    }
    return `${baseClasses} text-zinc-300 hover:text-white hover:bg-zinc-800/50 hover:shadow-lg`;
  }

  getMobileNavLinkClass(sectionId: string): string {
    const baseClasses =
      'transition-all duration-300 text-sm font-medium py-2 px-3 rounded-lg relative';
    if (this.activeSection === sectionId) {
      return `${baseClasses} text-white bg-gradient-to-r from-violet-500 to-pink-500 border border-violet-400 shadow-xl shadow-violet-500/50`;
    }
    return `${baseClasses} text-zinc-300 hover:text-white hover:bg-zinc-800/50`;
  }
}
