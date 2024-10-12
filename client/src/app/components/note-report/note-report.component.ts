import {Component, OnInit} from '@angular/core';
import {NoteService} from "../../services/note.service";
import {Note} from "../../common/note";
import {DatePipe} from "@angular/common";

@Component({
  selector: 'app-note-report',
  standalone: true,
  imports: [
    DatePipe
  ],
  templateUrl: './note-report.component.html',
  styleUrl: './note-report.component.css'
})
export class NoteReportComponent implements OnInit {

  notes: Note[] = [];

  constructor(private noteService: NoteService) {}

  ngOnInit(): void {
    this.noteService.getNotes();
    this.noteService.notes.subscribe({
      next: data => {
        this.notes = data;
      }
    })
  }
}
