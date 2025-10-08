import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { LucideAngularModule } from 'lucide-angular';
import { TranslatePipe } from '../../../../core/pipes/translate.pipe';
import { NavigationService } from '../../../../core/services/navigation.service';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [CommonModule, RouterModule, LucideAngularModule, TranslatePipe],
  templateUrl: './about.component.html',
})
export class AboutComponent {
  constructor(public navigation: NavigationService) {}

  get cvLink(): string {
    return this.navigation.getLocalizedPath('cv');
  }
}
