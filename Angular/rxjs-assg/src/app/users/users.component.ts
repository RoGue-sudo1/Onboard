import { Component } from '@angular/core';
import { UserCardComponent } from '../user-card/user-card.component';
import { User } from '../user';
import { UsersService } from '../users.service';
import { BehaviorSubject } from 'rxjs';
import { AsyncPipe } from '@angular/common';
import { UserChartComponent } from '../user-chart/user-chart.component';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [UserCardComponent, AsyncPipe, UserChartComponent],
  templateUrl: './users.component.html',
  styleUrl: './users.component.css',
})
export class UsersComponent {
  
  users$: BehaviorSubject<User[]>;

  constructor(public userService: UsersService) {
    this.users$ = this.userService.getAllUsers();
  }
}
