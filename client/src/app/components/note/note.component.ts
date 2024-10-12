import {Component, effect, ElementRef, Input, viewChild} from '@angular/core';
import {NoteService} from "../../services/note.service";
import {FormControl, ReactiveFormsModule} from "@angular/forms";
import {Note} from "../../common/note";

import {TagService} from "../../services/tag.service";
import {Tag} from "../../common/tag";
import {defaultValueCtx} from "@milkdown/core";
import {Crepe, CrepeFeature} from '@milkdown/crepe';
import "@milkdown/crepe/theme/common/style.css";
import "@milkdown/crepe/theme/frame.css";
import { listener, listenerCtx } from '@milkdown/plugin-listener';
import { MatChipsModule} from "@angular/material/chips";
import {MatIcon} from "@angular/material/icon";
import {MatFabButton, MatIconButton, MatMiniFabButton} from "@angular/material/button";
import {MatFormField} from "@angular/material/form-field";
import {MatDialog} from "@angular/material/dialog";
import {NoteDetailsComponent} from "../note-details/note-details.component";
import {debounceTime, distinctUntilChanged, Subject} from "rxjs";

@Component({
  selector: 'app-note',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatChipsModule,
    MatIcon,
    MatFabButton,
    MatMiniFabButton,
    MatFormField,
    MatIconButton
],
  templateUrl: './note.component.html',
  styleUrl: './note.component.css'
})
export class NoteComponent {

  editorRef = viewChild<ElementRef>("editorRef")
  tagInput = new  FormControl('');
  titleInput = new FormControl('', {nonNullable: true});
  editor: Crepe | null = null;

  note!: Note;
  content: Subject<string> = new Subject<string>();



  @Input()
  set id(id: number) {
    this.noteService.notes.subscribe({
      next: notes => {
        this.note = <Note>notes.find(note => note.id == id);
        this.titleInput.setValue(this.note.title);

        if (this.editor) {
          this.editor.destroy().then(() => {
            this.editor?.create()
          })
        }
      }
    });
  }

  constructor(private noteService: NoteService, private tagService: TagService, private dialog: MatDialog){
    effect(() => {
      this.createEditor();
    });
  }

  async createEditor() {

    // Create a new markdown editor
    this.editor = new Crepe({
      root: this.editorRef()?.nativeElement,
      features: {[CrepeFeature.ImageBlock]: false},
    })

    // Configure the editor
    this.editor.editor.config((ctx) => {
      if (this.note.content) {
        ctx.set(defaultValueCtx, this.note.content);
      }

      const listener = ctx.get(listenerCtx);

      listener.markdownUpdated((ctx, markdown, prevMarkdown) => {
        this.note.content = markdown;
        this.content.next(markdown);
      })
    })
      .use(listener);

    // Create the editor
    await this.editor.create();

    // Automatically update the note when the user changes it
    this.titleInput.valueChanges.pipe(
      debounceTime(700),
      distinctUntilChanged()
    ).subscribe(title => {
      this.note.title = title;
      this.noteService.updateNote(this.note)
    })
    this.content.pipe(
      debounceTime(700),
      distinctUntilChanged()
    ).subscribe(content => {
      this.note.content = content;
      this.noteService.updateNote(this.note)
    })
  }

  addTag(tag: Tag) {
    if (!this.note.tags.some(currentTag => currentTag.name.toLowerCase() === tag.name.toLowerCase())) {
      this.tagService.addTag(tag, this.note)
    }
    this.tagInput.setValue('');
  }

  removeTag(tag: Tag) {
    this.tagService.removeTagFromNote(tag, this.note);
  }

  openDialog() {
    this.dialog.open(NoteDetailsComponent, {data: this.note});
  }
}
