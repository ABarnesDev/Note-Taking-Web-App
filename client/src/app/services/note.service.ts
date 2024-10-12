import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Note} from "../common/note";
import {BehaviorSubject, Observable} from "rxjs";
import {UserService} from "./user.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {Router} from "@angular/router";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class NoteService {

  private _notes: BehaviorSubject<Note[]> = new BehaviorSubject<Note[]>([]);
  public readonly notes: Observable<Note[]> = this._notes.asObservable();

  private baseUrl = `${environment.apiUrl}/notes`;

  constructor(private httpClient: HttpClient, private userService: UserService, private snackBar: MatSnackBar, private router: Router) {}

  getNotes() {

    // Get all notes from the database and update _notes
    this.httpClient.get<Note[]>(`${this.baseUrl}/`, {headers: {"Authorization": "Bearer " + this.userService.getToken()}}).subscribe({
      next: (data) => {
        this._notes.next(data);
      },
      error: err => {
        if (err.status == 401) {
          // If the user isn't logged in show an error and redirect to the login page
          this.snackBar.open("User not logged in", 'OK');
          this.router.navigateByUrl("/login");
        } else {
          this.snackBar.open("Error fetching notes", 'OK');
        }
      }
    });
  }

  createNote() {
    // Add a new note to the database and update _notes
    this.httpClient.post<Note>(`${this.baseUrl}/create`, {}, {headers: {"Authorization": "Bearer " + this.userService.getToken()}}).subscribe({
      next: (data) => {
        this._notes.next([data].concat(this._notes.getValue()));
        this.router.navigateByUrl(`/notes/${data.id}`);
      },
      error: err => {
        if (err.status == 401) {
          // If the user isn't logged in show an error and redirect to the login page
          this.snackBar.open("User not logged in", 'OK');
          this.router.navigateByUrl("/login");
        } else {
          this.snackBar.open("Error creating note", 'OK');
        }
      }
    });
  }

  updateNote(note: Note) {
    // Update a note
    this.httpClient.put<Note>(`${this.baseUrl}/update`, note, {headers: {"Authorization": "Bearer " + this.userService.getToken()}}).subscribe({
      error: err => {
        if (err.status == 401) {
          // If the user isn't logged in show an error and redirect to the login page
          this.snackBar.open("User not logged in", 'OK');
          this.router.navigateByUrl("/login");
        } else {
          this.snackBar.open("Error updating note", 'OK');
        }
      }
    });
  }

  deleteNote(note: Note) {
    // Remove a note from the database and update _notes
    this.httpClient.delete(`${this.baseUrl}/delete?noteId=${note.id}`, {headers: {"Authorization": "Bearer " + this.userService.getToken()}}).subscribe({
      error: err => {
        if (err.status == 401) {
          // If the user isn't logged in show an error and redirect to the login page
          this.snackBar.open("User not logged in", 'OK');
          this.router.navigateByUrl("/login");
        } else {
          this.snackBar.open("Error deleting note", 'OK');
        }
      }
    });
    this._notes.next(this._notes.getValue().filter((currentNote) => currentNote.id != note.id));
  }
}
