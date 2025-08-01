import { Component } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterLink } from "@angular/router";
import { LucideAngularModule } from "lucide-angular";
import { TranslatePipe } from "../../../../core/pipes/translate.pipe";

@Component({
  selector: "app-contact",
  standalone: true,
  imports: [CommonModule, RouterLink, LucideAngularModule, TranslatePipe],
  templateUrl: "./contact.component.html",
})
export class ContactComponent {
  openCalendly() {
    const calendlyUrl = "https://calendly.com/jabibamman/30min";
    window.open(calendlyUrl, "calendly", "width=800,height=800");
  }
}