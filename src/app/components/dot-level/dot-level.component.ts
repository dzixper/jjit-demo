import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dot-level',
  templateUrl: './dot-level.component.html',
  styleUrls: ['./dot-level.component.scss'],
})
export class DotLevelComponent implements OnInit {
  @Input() level: number;
  @Output() levelChanged = new EventEmitter();
  levels = [
    {number: 1, active: true},
    {number: 2, active: true},
    {number: 3, active: true},
    {number: 4, active: true},
    {number: 5, active: true}
  ];

  constructor(private router: Router) {}


  ngOnInit(): void {
    for (let i = 0; i <= 4; i++) {
      this.levels[i].active = i < this.level;
    }
  }

  updateDots(level: number): void {
    if (this.router.url === '/post-offer-form') {
      for (let i = 0; i <= 4; i++) {
        this.levels[i].active = i < level;
      }
      this.levelChanged.emit(level);
    }
  }

}
