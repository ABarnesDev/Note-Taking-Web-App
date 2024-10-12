import {Component, Inject} from '@angular/core';
import {MatButton} from "@angular/material/button";
import {MatCalendar} from "@angular/material/datepicker";
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogTitle
} from "@angular/material/dialog";
import {Note} from "../../common/note";
import {NoteService} from "../../services/note.service";
import { DatePipe } from "@angular/common";

@Component({
  selector: 'app-note-details',
  standalone: true,
  imports: [
    MatButton,
    MatCalendar,
    MatDialogActions,
    MatDialogContent,
    MatDialogTitle,
    MatDialogClose,
    DatePipe
],
  templateUrl: './note-details.component.html',
  styleUrl: './note-details.component.css'
})
export class NoteDetailsComponent {

  deleteSelected: boolean = false;

  constructor(@Inject(MAT_DIALOG_DATA) public note: Note, private noteService: NoteService,) {
  }

  toggleDeleteSelected() {
    this.deleteSelected = !this.deleteSelected;
  }
  deleteNote() {
    this.noteService.deleteNote(this.note);
  }
}
