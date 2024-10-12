import { Routes } from '@angular/router';
import {LoginComponent} from "./components/login/login.component";
import {NotesComponent} from "./components/notes/notes.component";
import {TaskListComponent} from "./components/task-list/task-list.component";
import {SignUpComponent} from "./components/sign-up/sign-up.component";
import {authGuard} from "./guard/auth.guard";
import {NoteComponent} from "./components/note/note.component";
import {NoteReportComponent} from "./components/note-report/note-report.component";
import {ErrorComponent} from "./components/error/error.component";

export const routes: Routes = [
  {path: '', redirectTo: '/login', pathMatch: 'full'},
  {path: 'login', component: LoginComponent},
  {path: 'signup', component: SignUpComponent},
  {path: 'notes', component: NotesComponent, canActivate: [authGuard], children: [{path: ':id', component: NoteComponent}]},
  {path: 'note-report', component: NoteReportComponent, canActivate: [authGuard]},
  {path: 'tasks', component: TaskListComponent, canActivate: [authGuard]},
  {path: '**', component: ErrorComponent}
];
