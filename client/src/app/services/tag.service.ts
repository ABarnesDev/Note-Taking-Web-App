import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {BehaviorSubject, Observable} from "rxjs";
import {Tag} from "../common/tag";
import {Note} from "../common/note";
import {UserService} from "./user.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {Router} from "@angular/router";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class TagService {

  private _tags: BehaviorSubject<Tag[]> = new BehaviorSubject<Tag[]>([]);
  public readonly tags: Observable<Tag[]> = this._tags.asObservable();

  private baseUrl = `${environment.apiUrl}/tags`;

  constructor(private httpClient: HttpClient, private userService: UserService, private snackBar: MatSnackBar, private router: Router) {}

  getTags() {
    // Get all tags from the database and update _tags
    this.httpClient.get<Tag[]>(`${this.baseUrl}/`, {headers: {"Authorization": "Bearer " + this.userService.getToken()}}).subscribe({
      next: (data) => {
        this._tags.next(data);
      },
      error: err => {
        if (err.status == 401) {
          // If the user isn't logged in show an error and redirect to the login page
          this.snackBar.open("User not logged in", 'OK');
          this.router.navigateByUrl("/login");
        } else {
          this.snackBar.open("Error fetching tags", 'OK');
        }
      }
    });
  }

  addTag(newTag: Tag, note: Note) {
    // Add a new tag to the database and update _tags
    this.httpClient.post<Tag>(`${this.baseUrl}/add?noteId=${note.id}`, newTag, {headers: {"Authorization": "Bearer " + this.userService.getToken()}}).subscribe({
      next: (data) => {
        if (!this._tags.getValue().some((tag) => tag.id == data.id)) {
          this._tags.next([data].concat(this._tags.getValue()));
        }
        note.tags.push(data);
      },
      error: err => {
        if (err.status == 401) {
          // If the user isn't logged in show an error and redirect to the login page
          this.snackBar.open("User not logged in", 'OK');
          this.router.navigateByUrl("/login");
        } else {
          this.snackBar.open("Error adding tag", 'OK');
        }
      }
    });
  }

  removeTagFromNote(tag: Tag, note: Note) {
    // Remove a tag from a note in the database and update the note
    this.httpClient.post(`${this.baseUrl}/remove?noteId=${note.id}`, tag, {headers: {"Authorization": "Bearer " + this.userService.getToken()}}).subscribe({
      error: err => {
        if (err.status == 401) {
          // If the user isn't logged in show an error and redirect to the login page
          this.snackBar.open("User not logged in", 'OK');
          this.router.navigateByUrl("/login");
        } else {
          this.snackBar.open("Error removing tag", 'OK');
        }
      }
    });

    note.tags.splice(note.tags.indexOf(tag), 1);
  }

  deleteTag(tag: Tag) {
    // Remove a tag from the database and update _tags
    this.httpClient.delete(`${this.baseUrl}/delete?tagId=${tag.id}`, {headers: {"Authorization": "Bearer " + this.userService.getToken()}}).subscribe({
      error: err => {
        if (err.status == 401) {
          // If the user isn't logged in show an error and redirect to the login page
          this.snackBar.open("User not logged in", 'OK');
          this.router.navigateByUrl("/login");
        } else {
          this.snackBar.open("Error deleting tag", 'OK');
        }
      }
    });

    this._tags.next(this._tags.getValue().filter((currentTag) => currentTag.id != tag.id));
  }
}
