import {Component, OnInit} from '@angular/core';
import {User} from "../../common/user";
import {UserService} from "../../services/user.service";
import {
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogTitle
} from "@angular/material/dialog";
import {MatButton} from "@angular/material/button";

import {Router} from "@angular/router";

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [
    MatDialogTitle,
    MatDialogContent,
    MatButton,
    MatDialogActions,
    MatDialogClose
],
  templateUrl: './user.component.html',
  styleUrl: './user.component.css'
})
export class UserComponent implements OnInit {

  user: User | null = null;
  deleteSelected: boolean = false;

  constructor(private userService: UserService, private router: Router) {}

  ngOnInit(): void {
    this.userService.getUser().subscribe({
      next: data => {
        this.user = data;
      }
    })
  }

  toggleDeleteSelected() {
    this.deleteSelected = !this.deleteSelected;
  }

  logout() {
    // Remove the token and redirect to the login page
    this.userService.setToken(null);
    this.router.navigateByUrl('/login');
  }

  deleteUser() {
    // Delete the user, remove the token, and redirect to the login page
    this.userService.deleteUser();
    this.userService.setToken(null);
    this.router.navigateByUrl('/login');
  }
}
