import { Component } from "@angular/core";
import { CvHeaderComponent } from "../components/cv-header.component";
import { ExperienceListComponent } from "../components/experience-list.component";
import { SkillsComponent } from "../components/skills.component";
import { ProjectsComponent } from "../components/projects.component";
import { EducationComponent } from "../components/education.component";
import { LanguagesInterestsComponent } from "../components/languages-interests.component";

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
  ],
  templateUrl: "./cv.component.html",
  styleUrls: ["./cv.component.css"],
})
export class CvComponent {}