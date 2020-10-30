import { Component, Input, Output, EventEmitter, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-dot-level',
  templateUrl: './dot-level.component.html',
  styleUrls: ['./dot-level.component.scss'],
})
export class DotLevelComponent implements AfterViewInit {
  @Input() level: number;
  @Output() levelChanged = new EventEmitter();
  levels = [
    {number: 1, active: true},
    {number: 2, active: true},
    {number: 3, active: true},
    {number: 4, active: true},
    {number: 5, active: true}
  ];

  constructor() {}

  ngAfterViewInit(): void {
    this.updateDots(this.level);
  }

  updateDots(level: number): void {
    for (let i = 0; i <= 4; i++) {
      this.levels[i].active = i < level;
    }
    this.levelChanged.emit(level);
  }
}
