import { Component } from "@angular/core";

@Component({
  selector: "app-languages-interests",
  standalone: true,
  template: `
    <div class="px-12 pb-8">
      <div
        class="text-violet-400 uppercase font-bold text-sm mb-4 border-l-4 border-yellow-300 pl-3"
      >
        Languages & Interests
      </div>
      <div class="flex gap-4 mb-2">
        <span
          class="bg-zinc-800 border border-zinc-700 rounded-lg px-4 py-1 text-yellow-200 font-semibold text-xs font-mono"
          >French (C2)</span
        >
        <span
          class="bg-zinc-800 border border-zinc-700 rounded-lg px-4 py-1 text-yellow-200 font-semibold text-xs font-mono"
          >English (B2+)</span
        >
        <span
          class="bg-zinc-800 border border-zinc-700 rounded-lg px-4 py-1 text-yellow-200 font-semibold text-xs font-mono"
          >Spanish (A2)</span
        >
      </div>
      <div class="text-violet-400 font-semibold text-sm">
        Hackathons · Game scripting · Sci-Fi & Tech Movies · Travel ·
        Humanitarian
      </div>
      <div class="mt-6 text-zinc-400 text-xs">
        <strong>Contact:</strong>
        <a
          href="mailto:james.abibamman@gmail.com"
          class="text-violet-300 underline"
          >james.abibamman&#64;gmail.com</a
        >
        · +33 7 81 89 39 06 · Paris ·
        <a
          href="https://github.com/jabibamman"
          target="_blank"
          class="text-violet-300 underline"
          >github.com/jabibamman</a
        >
        ·
        <a
          href="https://www.linkedin.com/in/jamesabib/"
          target="_blank"
          class="text-violet-300 underline"
          >linkedin.com/in/jamesabib</a
        >
      </div>
    </div>
  `,
})
export class LanguagesInterestsComponent {}
