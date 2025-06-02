import {
  ApplicationConfig,
  importProvidersFrom,
  provideZoneChangeDetection,
} from "@angular/core";
import { provideRouter } from "@angular/router";

import { appRoutes } from "../routes/app.routes";
import { provideClientHydration } from "@angular/platform-browser";
import { CoreModule } from "../core/core.module";

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(appRoutes),
    provideClientHydration(),
    importProvidersFrom(CoreModule),
  ],
};
