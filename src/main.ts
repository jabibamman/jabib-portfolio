/// <reference types="@angular/localize" />

import { bootstrapApplication } from "@angular/platform-browser";
import { appConfig } from "./app/config/app.config";
import { AppComponent } from "./app/app.component";

bootstrapApplication(AppComponent, appConfig).catch((err) =>
  console.error(err)
);
