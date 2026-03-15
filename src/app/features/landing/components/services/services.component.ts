import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LucideAngularModule } from 'lucide-angular';
import { TranslatePipe } from '../../../../core/pipes/translate.pipe';
import { CalendlyService } from '../../../../core/services/calendly.service';

@Component({
  selector: 'app-services',
  standalone: true,
  imports: [CommonModule, LucideAngularModule, TranslatePipe],
  templateUrl: './services.component.html',
})
export class ServicesComponent {
  constructor(public calendly: CalendlyService) {}
}
