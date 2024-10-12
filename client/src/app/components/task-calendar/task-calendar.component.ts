import { Component } from '@angular/core';
import {
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle
} from "@angular/material/dialog";
import {MatCalendar} from "@angular/material/datepicker";
import {MatButton} from "@angular/material/button";
import {provideNativeDateAdapter} from "@angular/material/core";

@Component({
  selector: 'app-task-calendar',
  standalone: true,
  providers: [provideNativeDateAdapter()],
  imports: [
    MatDialogTitle,
    MatDialogContent,
    MatCalendar,
    MatDialogActions,
    MatButton,
    MatDialogClose
  ],
  templateUrl: './task-calendar.component.html',
  styleUrl: './task-calendar.component.css'
})
export class TaskCalendarComponent {
  selected: Date = new Date();

  constructor(protected dialogRef: MatDialogRef<TaskCalendarComponent>) {}
}
