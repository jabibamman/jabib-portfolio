import { Component, ElementRef, Inject, OnDestroy, OnInit, Renderer2, ViewChild } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { LocaleRoutingService } from '../services/locale-routing.service';
import { PositionStorageService } from '../services/position-storage.service';
import { PLATFORM_ID } from '@angular/core';

interface Position {
  x: number;
  y: number;
}

@Component({
  selector: 'app-language-switcher',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div
      #dragRoot
      class="fixed z-50 select-none"
      [style.left.px]="position.x"
      [style.top.px]="position.y"
      (mousedown)="onPointerDown($event)"
      (touchstart)="onPointerDown($event)"
    >
      <div class="flex items-center gap-2 bg-zinc-900/90 backdrop-blur-sm rounded-xl p-1.5 border border-zinc-800 shadow-lg hover:shadow-xl transition-all duration-300 cursor-move">
        <div class="flex flex-col gap-0.5 p-1 opacity-60">
          <div class="w-3 h-0.5 bg-zinc-600 rounded"></div>
          <div class="w-3 h-0.5 bg-zinc-600 rounded"></div>
          <div class="w-3 h-0.5 bg-zinc-600 rounded"></div>
        </div>
        <button
          (click)="switchLanguage('fr'); $event.stopPropagation()"
          [disabled]="isLoading"
          [class]="currentLang === 'fr' ? 'bg-violet-600 text-white shadow-md' : 'bg-transparent text-zinc-400 hover:text-white'"
          class="px-3 py-1.5 rounded-md text-sm font-semibold transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          FR
        </button>
        <button
          (click)="switchLanguage('en'); $event.stopPropagation()"
          [disabled]="isLoading"
          [class]="currentLang === 'en' ? 'bg-violet-600 text-white shadow-md' : 'bg-transparent text-zinc-400 hover:text-white'"
          class="px-3 py-1.5 rounded-md text-sm font-semibold transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          EN
        </button>
      </div>
    </div>
  `,
})
export class LanguageSwitcherComponent implements OnInit, OnDestroy {
  @ViewChild('dragRoot', { static: true }) dragRoot!: ElementRef<HTMLElement>;

  isLoading = false;
  position: Position = { x: 0, y: 0 };
  private dragging = false;
  private offset: Position = { x: 0, y: 0 };
  private unlisteners: Array<() => void> = [];
  private storageKey = 'lswitcher_pos_v1';

  constructor(
    private localeRoutingService: LocaleRoutingService,
    private positionStorage: PositionStorageService,
    private renderer: Renderer2,
    @Inject(PLATFORM_ID) private platformId: Object,
  ) {}

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      // Default near top-right
      this.position = { x: Math.max(window.innerWidth - 180, 16), y: 16 };
      this.position = this.positionStorage.loadPosition(this.storageKey, this.position);
    }
  }

  ngOnDestroy(): void {
    this.teardownListeners();
  }

  get currentLang(): string {
    return this.localeRoutingService.getCurrentLocale();
  }

  switchLanguage(lang: string): void {
    if (lang !== this.currentLang) {
      this.isLoading = true;
      this.localeRoutingService.switchLocale(lang);
      setTimeout(() => (this.isLoading = false), 300);
    }
  }

  onPointerDown(ev: MouseEvent | TouchEvent): void {
    if (!isPlatformBrowser(this.platformId)) return;
    ev.preventDefault();

    const point = this.getPoint(ev);
    const rect = this.dragRoot.nativeElement.getBoundingClientRect();
    this.offset = { x: point.x - rect.left, y: point.y - rect.top };
    this.dragging = true;

    this.teardownListeners();
    this.unlisteners.push(
      this.renderer.listen('document', 'mousemove', (e: MouseEvent) => this.onPointerMove(e)),
      this.renderer.listen('document', 'touchmove', (e: TouchEvent) => this.onPointerMove(e)),
      this.renderer.listen('document', 'mouseup', () => this.onPointerUp()),
      this.renderer.listen('document', 'touchend', () => this.onPointerUp()),
    );
  }

  private onPointerMove(ev: MouseEvent | TouchEvent): void {
    if (!this.dragging || !isPlatformBrowser(this.platformId)) return;
    const p = this.getPoint(ev);
    const x = p.x - this.offset.x;
    const y = p.y - this.offset.y;
    const maxX = window.innerWidth - 160; // approx width
    const maxY = window.innerHeight - 56; // approx height
    this.position = {
      x: Math.max(8, Math.min(x, maxX)),
      y: Math.max(8, Math.min(y, maxY)),
    };
  }

  private onPointerUp(): void {
    if (!isPlatformBrowser(this.platformId)) return;
    this.dragging = false;
    this.positionStorage.savePosition(this.storageKey, this.position);
    this.teardownListeners();
  }

  private getPoint(ev: MouseEvent | TouchEvent): { x: number; y: number } {
    if (ev instanceof MouseEvent) return { x: ev.clientX, y: ev.clientY };
    const t = ev.touches[0];
    return { x: t.clientX, y: t.clientY };
  }

  private teardownListeners(): void {
    this.unlisteners.forEach(u => {
      try {
        u();
      } catch {}
    });
    this.unlisteners = [];
  }
}
