import { Component } from "@angular/core";

@Component({
  selector: "app-education",
  standalone: true,
  template: `
    <div class="px-12 pb-7">
      <div
        class="text-violet-400 uppercase font-bold text-sm mb-4 border-l-4 border-yellow-300 pl-3"
      >
        Education
      </div>
      <ul class="list-none m-0 p-0">
        <li class="mb-2">
          <span class="text-yellow-200 font-bold"
            >Master’s Degree in Software Architecture</span
          >
          <span class="ml-3 text-xs text-zinc-400">2023–2025</span><br />
          <span class="text-zinc-400 text-sm">ESGI Paris</span>
        </li>
        <li class="mb-2">
          <span class="text-yellow-200 font-bold"
            >Bachelor’s Degree in Software Architecture</span
          >
          <span class="ml-3 text-xs text-zinc-400">2022–2023</span><br />
          <span class="text-zinc-400 text-sm">ESGI Paris</span>
        </li>
        <li class="mb-2">
          <span class="text-yellow-200 font-bold"
            >2-Year Technical Degree in Computer Science</span
          >
          <span class="ml-3 text-xs text-zinc-400">2020–2022</span><br />
          <span class="text-zinc-400 text-sm">GSH College</span>
        </li>
      </ul>
    </div>
  `,
})
export class EducationComponent {}
