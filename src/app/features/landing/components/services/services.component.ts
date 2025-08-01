import { Component } from "@angular/core";
import { CommonModule } from "@angular/common";
import { LucideAngularModule } from "lucide-angular";
import { TranslatePipe } from "../../../../core/pipes/translate.pipe";

@Component({
  selector: "app-services",
  standalone: true,
  imports: [CommonModule, LucideAngularModule, TranslatePipe],
  templateUrl: "./services.component.html",
})
export class ServicesComponent {
  openCalendly() {
    const calendlyUrl = "https://calendly.com/jabibamman/30min";
    window.open(calendlyUrl, "calendly", "width=800,height=800");
  }
}