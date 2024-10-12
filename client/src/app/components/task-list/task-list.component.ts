import {Component, OnInit} from '@angular/core';
import {Task} from "../../common/task";
import {TaskService} from "../../services/task.service";
import {FormControl, FormGroup, ReactiveFormsModule} from "@angular/forms";
import { DatePipe } from "@angular/common";
import {MatDialog} from "@angular/material/dialog";
import {TaskCalendarComponent} from "../task-calendar/task-calendar.component";
import {MatIcon} from "@angular/material/icon";
import {MatButton, MatIconButton} from "@angular/material/button";

@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    DatePipe,
    MatIcon,
    MatIconButton,
    MatButton
],
  templateUrl: './task-list.component.html',
  styleUrl: './task-list.component.css'
})
export class TaskListComponent implements OnInit {

  tasks: Task[] = [];
  currentDate: Date = new Date();

  taskForm: FormGroup = new FormGroup({
    content: new FormControl('')
  });

  constructor(private taskService: TaskService, private dialog: MatDialog) {}

  ngOnInit(): void {
    this.taskService.getTasks(new Date());

    this.taskService.tasks.subscribe({
      next: data => {
        this.tasks = data;
      }
    })
  }

  createTask() {
    this.taskService.createTask({id: undefined, content: this.taskForm.value.content, isCompleted: false, createDate: `${this.currentDate.getFullYear()}-${this.currentDate.getMonth() + 1}-${this.currentDate.getDate()}`});

    this.taskForm.controls['content'].setValue('');
  }

  updateTask(task: Task) {
    task.isCompleted = !task.isCompleted;
    this.taskService.updateTask(task)
  }

  deleteTask(task: Task) {
    this.taskService.deleteTask(task)
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(TaskCalendarComponent);

    dialogRef.afterClosed().subscribe(result => {
      if (result !== undefined) {
        console.log(result)
        this.currentDate = result;
        this.taskService.getTasks(result);
      }
    });
  }
}
