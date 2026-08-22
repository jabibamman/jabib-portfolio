import { Component, Inject, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { LucideAngularModule } from 'lucide-angular';
import { TranslatePipe } from '../../../../core/pipes/translate.pipe';
import { ThemeService } from '../../../../core/services/theme.service';

@Component({
  selector: 'app-dock',
  standalone: true,
  imports: [CommonModule, LucideAngularModule, TranslatePipe],
  templateUrl: './dock.component.html',
})
export class DockComponent {
  constructor(
    public theme: ThemeService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  scrollToTop(event: Event): void {
    event.preventDefault();
    if (isPlatformBrowser(this.platformId)) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }

  toggleTheme(): void {
    this.theme.toggle();
  }
}
