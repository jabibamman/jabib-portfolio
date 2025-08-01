import { CommonModule } from "@angular/common";
import { Component } from "@angular/core";

@Component({
  selector: "app-cv-header",
  standalone: true,
  imports: [CommonModule],
  template: `
    <div
      class="flex items-center px-12 py-8 bg-gradient-to-r from-violet-500 to-pink-500 text-white relative">
      <img
        class="w-28 h-28 rounded-full border-4 border-yellow-300 shadow-lg object-cover mr-8"
        src="https://api.dicebear.com/8.x/adventurer/svg?seed=James&backgroundColor=ffe66d,7e5bef"
        alt="James ABIB" />
      <div class="flex-1">
        <h1 class="text-3xl font-bold tracking-wide mb-1">James ABIB</h1>
        <div class="text-lg font-medium text-yellow-200 mb-1">
          Fullstack Developer | Java &amp; Typescript &amp; Rust
        </div>
        <p class="text-white/95 leading-relaxed max-w-lg">
          Software engineer focused on architecture, passionate about clean code
          and robust systems.<br />
          {{ yearsOfExperience }}+ years' experience at INSEE building and
          maintaining critical systems, and end-to-end delivery of a real client
          project (Upstra) using microservices/cloud.<br />
          I bring a modern vision (Rust, cloud, CI/CD), strong team spirit, and
          the ability to deliver high-quality products, fast.
        </p>
      </div>
      <div
        class="ml-6 flex items-center justify-center bg-white rounded-xl p-2 shadow-lg">
        <img
          src="https://api.qrserver.com/v1/create-qr-code/?data=https://github.com/jabibamman&size=70x70"
          alt="QR to GitHub"
          class="w-16 h-16" />
      </div>
    </div>
  `,
})
export class CvHeaderComponent {
  private readonly startDate = new Date("2021-01-01");

  get yearsOfExperience(): number {
    const now = new Date();
    const years = now.getFullYear() - this.startDate.getFullYear();
    const monthDiff = now.getMonth() - this.startDate.getMonth();

    if (
      monthDiff < 0 ||
      (monthDiff === 0 && now.getDate() < this.startDate.getDate())
    ) {
      return years - 1;
    }

    return years;
  }
}
