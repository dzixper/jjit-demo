import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-filter-options',
  templateUrl: './filter-options.component.html',
  styleUrls: ['./filter-options.component.scss'],
})
export class FilterOptionsComponent implements OnInit {
  levels: Array<any> = [
    {text: 'All', isActive: true},
    {text: 'Junior', isActive: false},
    {text: 'Mid', isActive: false},
    {text: 'Senior', isActive: false}
  ];

  constructor(private dialogRef: MatDialog) {}

  closeDialog(): void {
    this.dialogRef.closeAll();
  }

  makeButtonSelected(input): void {
    for (const level of this.levels) {
      level.isActive = false;
    }
    input.isActive = true;
  }

  ngOnInit(): void {}
}
