import { Component } from "@angular/core";
import { Location } from "@angular/common";
import { CvHeaderComponent } from "../components/cv-header.component";
import { ExperienceListComponent } from "../components/experience-list.component";
import { SkillsComponent } from "../components/skills.component";
import { ProjectsComponent } from "../components/projects.component";
import { EducationComponent } from "../components/education.component";
import { LanguagesInterestsComponent } from "../components/languages-interests.component";
import { LanguageSwitcherComponent } from "../../../core/components/language-switcher.component";
import { LucideAngularModule } from "lucide-angular";

@Component({
  selector: "app-cv",
  standalone: true,
  imports: [
    CvHeaderComponent,
    ExperienceListComponent,
    SkillsComponent,
    ProjectsComponent,
    EducationComponent,
    LanguagesInterestsComponent,
    LanguageSwitcherComponent,
    LucideAngularModule,
  ],
  templateUrl: "./cv.component.html",
  styleUrls: ["./cv.component.css"],
})
export class CvComponent {
  constructor(private location: Location) {}

  goBack(): void {
    this.location.back();
  }
}