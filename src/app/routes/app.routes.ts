import { Routes } from "@angular/router";
import { WipComponent } from "../features/wip/pages/wip.component";
import { CvComponent } from "../features/cv/pages/cv.component";
export const appRoutes: Routes = [
  {
    path: "",
    component: WipComponent,
  },
  {
    path: "cv",
    component: CvComponent,
  },
];
