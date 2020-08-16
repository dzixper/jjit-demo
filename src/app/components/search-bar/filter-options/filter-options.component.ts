import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-filter-options',
  templateUrl: './filter-options.component.html',
  styleUrls: ['./filter-options.component.scss'],
})
export class FilterOptionsComponent implements OnInit {
  levels: Array<string> = ['All', 'Junior', 'Mid', 'Senior'];

  constructor(private dialogRef: MatDialog) {}

  closeDialog(): void {
    this.dialogRef.closeAll();
  }

  ngOnInit(): void {}
}
