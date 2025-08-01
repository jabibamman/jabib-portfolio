import { Component } from "@angular/core";
import { HeroSectionComponent } from "../components/hero-section/hero-section.component";
import { ServicesComponent } from "../components/services/services.component";
import { ProcessComponent } from "../components/process/process.component";
import { AboutComponent } from "../components/about/about.component";
import { ContactComponent } from "../components/contact/contact.component";

@Component({
  selector: "app-landing",
  standalone: true,
  imports: [
    HeroSectionComponent,
    ServicesComponent,
    ProcessComponent,
    AboutComponent,
    ContactComponent,
  ],
  template: `
    <div class="min-h-screen bg-zinc-950">
      <app-hero-section />
      <app-services />
      <app-process />
      <app-about />
      <app-contact />
    </div>
  `,
})
export class LandingComponent {}