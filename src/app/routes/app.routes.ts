import { Routes } from "@angular/router";
import { WipComponent } from "../features/wip/pages/wip.component";
import { CvComponent } from "../features/cv/pages/cv.component";
import { LandingComponent } from "../features/landing/pages/landing.component";
export const appRoutes: Routes = [
  {
    path: "",
    component: LandingComponent,
  },
  {
    path: "cv",
    component: CvComponent,
  },
];
