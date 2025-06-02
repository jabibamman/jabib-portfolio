import { Component } from "@angular/core";

@Component({
  selector: "app-projects",
  standalone: true,
  template: `
    <div class="px-12 pb-7">
      <div
        class="text-violet-400 uppercase font-bold text-sm mb-4 border-l-4 border-yellow-300 pl-3"
      >
        Side Projects
      </div>
      <div class="flex flex-col gap-3">
        <div>
          <div class="text-pink-400 font-bold">
            Social Code Execution Platform (2024)
          </div>
          <div class="text-white/90">
            Cloud platform for multi-language code execution, full microservices
            stack. Secure execution pipelines (K8s, CI/CD on GCP), social
            features, mobile support, scalable and extensible.
          </div>
          <div class="text-xs text-violet-300 font-mono mt-1">
            Vue.js · Kotlin · NestJS · Rust · Docker · K8s · GCP
          </div>
        </div>
        <div>
          <div class="text-pink-400 font-bold">
            Frakt (Rust-based Fractal Explorer, 2023-24)
          </div>
          <div class="text-white/90">
            Real-time fractal explorer using a distributed worker-server
            architecture (Rust), CLI & GUI rendering, parallel computation.
          </div>
          <div class="text-xs text-violet-300 font-mono mt-1">
            Rust · Multi-threading · Parallel · GUI/CLI
          </div>
        </div>
      </div>
    </div>
  `,
})
export class ProjectsComponent {}
