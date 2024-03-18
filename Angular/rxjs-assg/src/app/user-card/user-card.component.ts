import { Component, Input } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatBadgeModule } from '@angular/material/badge';
import { User } from '../user';
import { UsersService } from '../users.service';

import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-user-card',
  standalone: true,
  imports: [
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatDividerModule,
    MatBadgeModule,
    AsyncPipe,
  ],
  templateUrl: './user-card.component.html',
  styleUrl: './user-card.component.css',
})
export class UserCardComponent {
  @Input() user: User = {
    name: '',
    id: 0,
    likeCount: 0,
    shareCount: 0,
    subscribeCount: 0,
  };


  // like(id: number) {
  //   this.userService.increaseLikeCount(id).subscribe();
  // }
  like(id: number) {
    this.userService.increaseLikeCount(id);
  }

  share(id: number) {
    this.userService.increaseShareCount(id);
  }

  subscribe(id: number) {
    this.userService.increaseSubscribeCount(id);
  }

  constructor(private userService: UsersService) {}
}
