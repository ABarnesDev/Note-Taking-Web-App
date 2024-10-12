import {Component, OnInit} from '@angular/core';
import {NoteService} from "../../services/note.service";
import {UserService} from "../../services/user.service";
import {ActivatedRoute, RouterLink, RouterOutlet} from "@angular/router";
import {Note} from "../../common/note";
import {NoteComponent} from "../note/note.component";

import {Tag} from "../../common/tag";
import {TagService} from "../../services/tag.service";
import {MatExpansionModule} from '@angular/material/expansion';
import {MatIcon} from "@angular/material/icon";
import {BreakpointObserver, Breakpoints} from "@angular/cdk/layout";
import {FormControl, ReactiveFormsModule} from "@angular/forms";
import {NgClass} from "@angular/common";

@Component({
  selector: 'app-notes',
  standalone: true,
  imports: [
    NoteComponent,
    RouterOutlet,
    RouterLink,
    MatExpansionModule,
    MatIcon,
    ReactiveFormsModule,
    NgClass
  ],
  templateUrl: './notes.component.html',
  styleUrl: './notes.component.css'
})
export class NotesComponent implements OnInit {

  notes: Note[] = [];
  filteredNotes: Note[] = [];

  tags: Tag[] = [];
  selectedTag: Tag | null = null;

  panelOpenState: boolean = false;

  mobile: boolean = false;

  searchInput: FormControl = new FormControl('');

  constructor(private noteService: NoteService, private tagService: TagService, private userService: UserService, public route: ActivatedRoute, private responsive: BreakpointObserver) {
  }

  ngOnInit(): void {
    // Check to see if the site is on mobile
    this.responsive.observe(Breakpoints.Handset)
      .subscribe(result => {
        this.mobile = result.matches;
      });

    this.getNotes();
    this.getTags();
  }

  getNotes() {
    this.noteService.getNotes();
    this.noteService.notes.subscribe({
      next: (data: Note[]) => {
        this.notes = data;
        this.filteredNotes = data;
      }
    })
  }

  getTags() {
    this.tagService.getTags();
    this.tagService.tags.subscribe({
      next: (data: Tag[]) => {
        this.tags = data;
      }
    })
  }

  createNote() {
    this.noteService.createNote();
  }

  searchNotes() {
    if (this.searchInput.value == '') {
      this.filteredNotes = this.notes;
    } else {
      // Filter the notes to only include the notes that have the searchInput value in its name
      this.filteredNotes = this.notes.filter((note) => note.title?.toLowerCase().includes(this.searchInput.value.toLowerCase()));
    }

    if (this.selectedTag) {
      // Filter the notes to only include the notes that have the selected tag
      this.filteredNotes = this.filteredNotes.filter((note) => note.tags.some(tag => tag.name === this.selectedTag?.name));
    }
  }

  filterTag(tag: Tag) {
    this.selectedTag = tag;
    this.searchNotes();
    this.panelOpenState = false;
  }

  clearFilter() {
    this.selectedTag = null;
    this.searchNotes();
    this.panelOpenState = false;
  }

  deleteTag(tag: Tag) {
    this.tagService.deleteTag(tag);
    this.notes.filter((note) => note.tags.some(noteTag => {
      if (noteTag.name === tag.name) {
        note.tags.splice(note.tags.indexOf(tag), 1);
      }
    }));
  }
}
