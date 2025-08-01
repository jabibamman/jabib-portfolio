import { Component } from "@angular/core";
import { CommonModule } from "@angular/common";
import { LucideAngularModule } from "lucide-angular";
import { TranslatePipe } from "../../../../core/pipes/translate.pipe";

@Component({
  selector: "app-process",
  standalone: true,
  imports: [CommonModule, LucideAngularModule, TranslatePipe],
  templateUrl: "./process.component.html",
})
export class ProcessComponent {
  yearsOfExperience: number;

  constructor() {
    const startDate = new Date("2021-01-01");
    const now = new Date();
    const years = now.getFullYear() - startDate.getFullYear();
    const monthDiff = now.getMonth() - startDate.getMonth();

    if (
      monthDiff < 0 ||
      (monthDiff === 0 && now.getDate() < startDate.getDate())
    ) {
      this.yearsOfExperience = years - 1;
    } else {
      this.yearsOfExperience = years;
    }
  }
}