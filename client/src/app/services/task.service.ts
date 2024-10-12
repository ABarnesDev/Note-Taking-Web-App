import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable} from "rxjs";
import {Task} from "../common/task";
import {HttpClient} from "@angular/common/http";
import {UserService} from "./user.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {Router} from "@angular/router";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  private _tasks: BehaviorSubject<Task[]> = new BehaviorSubject<Task[]>([]);
  public readonly tasks: Observable<Task[]> = this._tasks.asObservable();

  private baseUrl = `${environment.apiUrl}/tasks`;

  constructor(private httpClient: HttpClient, private userService: UserService, private snackBar: MatSnackBar, private router: Router) {}

  getTasks(date: Date) {
    // Get all tasks from the database and update _tasks
    this.httpClient.get<Task[]>(`${this.baseUrl}/?date=${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`, {headers: {"Authorization": "Bearer " + this.userService.getToken()}}).subscribe({
      next: (data) => {
        console.log(data)
        this._tasks.next(data);
      },
      error: err => {
        if (err.status == 401) {
          // If the user isn't logged in show an error and redirect to the login page
          this.snackBar.open("User not logged in", 'OK');
          this.router.navigateByUrl("/login");
        } else {
          this.snackBar.open("Error fetching tasks", 'OK');
        }
      }
    })
  }

  createTask(task: Task) {
    // Add a new task to the database and update _tasks
    this.httpClient.post<Task>(`${this.baseUrl}/create`, task, {headers: {"Authorization": "Bearer " + this.userService.getToken()}}).subscribe({
      next: (data) => {
        this._tasks.next([data].concat(this._tasks.getValue()));
      },
      error: err => {
        if (err.status == 401) {
          // If the user isn't logged in show an error and redirect to the login page
          this.snackBar.open("User not logged in", 'OK');
          this.router.navigateByUrl("/login");
        } else {
          this.snackBar.open("Error creating task", 'OK');
        }
      }
    })
  }

  updateTask(task: Task) {
    // Update a task
    this.httpClient.put<Task>(`${this.baseUrl}/update`, task, {headers: {"Authorization": "Bearer " + this.userService.getToken()}}).subscribe({
      error: err => {
        if (err.status == 401) {
          // If the user isn't logged in show an error and redirect to the login page
          this.snackBar.open("User not logged in", 'OK');
          this.router.navigateByUrl("/login");
        } else {
          this.snackBar.open("Error updating task", 'OK');
        }
      }
    })
  }

  deleteTask(task: Task) {
    // Remove a task from the database and update _tasks
    this.httpClient.delete(`${this.baseUrl}/delete?taskId=${task.id}`, {headers: {"Authorization": "Bearer " + this.userService.getToken()}}).subscribe({
      error: err => {
        if (err.status == 401) {
          // If the user isn't logged in show an error and redirect to the login page
          this.snackBar.open("User not logged in", 'OK');
          this.router.navigateByUrl("/login");
        } else {
          this.snackBar.open("Error deleting task", 'OK');
        }
      }
    });

    this._tasks.next(this._tasks.getValue().filter((currentTask) => currentTask.id != task.id))
  }
}
