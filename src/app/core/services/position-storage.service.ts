import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

export interface StoredPosition {
  x: number;
  y: number;
}

@Injectable({
  providedIn: 'root',
})
export class PositionStorageService {
  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  savePosition(key: string, position: StoredPosition): void {
    if (!isPlatformBrowser(this.platformId)) {
      return;
    }

    try {
      localStorage.setItem(key, JSON.stringify(position));
    } catch (error) {
      console.warn('Failed to save position to localStorage:', error);
    }
  }

  loadPosition(key: string, defaultPosition: StoredPosition): StoredPosition {
    if (!isPlatformBrowser(this.platformId)) {
      return defaultPosition;
    }

    try {
      const saved = localStorage.getItem(key);
      if (saved) {
        const parsed = JSON.parse(saved);
        // Validate that parsed data has the expected structure
        if (typeof parsed === 'object' && parsed !== null &&
            typeof parsed.x === 'number' && typeof parsed.y === 'number') {
          return parsed;
        }
      }
    } catch (error) {
      console.warn('Failed to load position from localStorage:', error);
    }

    return defaultPosition;
  }

  clearPosition(key: string): void {
    if (!isPlatformBrowser(this.platformId)) {
      return;
    }

    try {
      localStorage.removeItem(key);
    } catch (error) {
      console.warn('Failed to clear position from localStorage:', error);
    }
  }
}
