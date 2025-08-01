import { Component } from "@angular/core";
import { CommonModule } from "@angular/common";
import { TranslatePipe } from "../../../core/pipes/translate.pipe";

@Component({
  selector: "app-education",
  standalone: true,
  imports: [CommonModule, TranslatePipe],
  template: `
    <div class="px-12 pb-7">
      <div
        class="text-violet-400 uppercase font-bold text-sm mb-4 border-l-4 border-yellow-300 pl-3">
        {{ "cv.sections.education" | translate | async }}
      </div>
      <ul class="list-none m-0 p-0">
        <li class="mb-2">
          <span class="text-yellow-200 font-bold">{{
            "cv.education.msc.degree" | translate | async
          }}</span>
          <span class="ml-3 text-xs text-zinc-400">{{
            "cv.education.msc.period" | translate | async
          }}</span
          ><br />
          <span class="text-zinc-400 text-sm">{{
            "cv.education.msc.school" | translate | async
          }}</span
          ><br />
          <span class="text-zinc-400 text-sm italic">{{
            "cv.education.msc.description" | translate | async
          }}</span>
        </li>
        <li class="mb-2">
          <span class="text-yellow-200 font-bold">{{
            "cv.education.bsc.degree" | translate | async
          }}</span>
          <span class="ml-3 text-xs text-zinc-400">{{
            "cv.education.bsc.period" | translate | async
          }}</span
          ><br />
          <span class="text-zinc-400 text-sm">{{
            "cv.education.bsc.school" | translate | async
          }}</span
          ><br />
          <span class="text-zinc-400 text-sm italic">{{
            "cv.education.bsc.description" | translate | async
          }}</span>
        </li>
      </ul>
    </div>
  `,
})
export class EducationComponent {}
