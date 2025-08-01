import { Component } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";
import { LucideAngularModule } from "lucide-angular";
import { TranslatePipe } from "../../../../core/pipes/translate.pipe";

@Component({
  selector: "app-about",
  standalone: true,
  imports: [CommonModule, RouterModule, LucideAngularModule, TranslatePipe],
  templateUrl: "./about.component.html",
})
export class AboutComponent {}