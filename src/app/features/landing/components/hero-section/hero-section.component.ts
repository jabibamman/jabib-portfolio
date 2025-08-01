import { Component } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";
import { LucideAngularModule } from "lucide-angular";
import { TranslatePipe } from "../../../../core/pipes/translate.pipe";
import { LanguageSwitcherComponent } from "../../../../core/components/language-switcher.component";

@Component({
  selector: "app-hero-section",
  standalone: true,
  imports: [CommonModule, RouterModule, LucideAngularModule, TranslatePipe, LanguageSwitcherComponent],
  templateUrl: "./hero-section.component.html",
  styleUrl: "./hero-section.component.scss",
})
export class HeroSectionComponent {
  openCalendly() {
    const calendlyUrl = "https://calendly.com/jabibamman/30min";
    window.open(calendlyUrl, "calendly", "width=800,height=800");
  }
}