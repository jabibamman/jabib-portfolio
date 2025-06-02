import { Component } from "@angular/core";
import { HomeHeaderComponent } from "../components/home-header.component";
import { ExperienceListComponent } from "../components/experience-list.component";
import { SkillsComponent } from "../components/skills.component";
import { ProjectsComponent } from "../components/projects.component";
import { EducationComponent } from "../components/education.component";
import { LanguagesInterestsComponent } from "../components/languages-interests.component";

@Component({
  selector: "app-home",
  standalone: true,
  imports: [
    HomeHeaderComponent,
    ExperienceListComponent,
    SkillsComponent,
    ProjectsComponent,
    EducationComponent,
    LanguagesInterestsComponent,
  ],
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.css"],
})
export class HomeComponent {}
