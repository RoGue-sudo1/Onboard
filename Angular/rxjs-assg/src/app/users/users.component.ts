import { Component } from '@angular/core';
import { UserCardComponent } from '../user-card/user-card.component';
import { User } from '../user';
import { UsersService } from '../users.service';
import { BehaviorSubject, combineLatest, map } from 'rxjs';
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
  mergedUsers$ = new BehaviorSubject<User[]>([]);

  constructor(public userService: UsersService) {
    this.users$ = this.userService.getAllUsers();
  }

  ngOnInit() {
    combineLatest([
      this.userService.userLike$,
      this.userService.userShare$,
      this.userService.userSubscribe$,
      this.users$,
    ]).pipe(
      map(([likeCount, shareCount, subscribeCount, users]) => {
        return users.map((user) => {
          
          return {
            ...user,
            likeCount:
              likeCount.find((likeCount:{id:number,likeCount:number}) => likeCount.id === user.id)
                ?.likeCount || 0,
            shareCount:
              shareCount.find((shareCount: {id:number,shareCount:number}) => shareCount.id === user.id)
                ?.shareCount || 0,
            subscribeCount:
              subscribeCount.find(
                (subscribeCount: {id:number,subscribeCount:number}) => subscribeCount.id === user.id
              )?.subscribeCount || 0 ,
          };
        });
      })
    ).subscribe(mergedUsers => {
      this.mergedUsers$.next(mergedUsers);
    })

    
  }
}
