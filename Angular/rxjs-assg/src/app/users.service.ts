import { Injectable } from '@angular/core';
import { User } from './user';
import { BehaviorSubject, Observable, combineLatest, map, merge } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  private userSubjects$: BehaviorSubject<User[]> = new BehaviorSubject<User[]>(
    []
  );

  actionEvent$: BehaviorSubject<{ event: string; id: number }> =
    new BehaviorSubject({ event: '', id: 0 });

  private users: User[] = [
    {
      name: 'John Doe',
      id: 1,
      likeCount: 0,
      shareCount: 0,
      subscribeCount: 0,
    },
    {
      name: 'Jane Doe',
      id: 2,
      likeCount: 0,
      shareCount: 0,
      subscribeCount: 0,
    },
    {
      name: 'John Smith',
      id: 3,
      likeCount: 0,
      shareCount: 0,
      subscribeCount: 0,
    },
    {
      name: 'Jane Smith',
      id: 4,
      likeCount: 0,
      shareCount: 0,
      subscribeCount: 0,
    },
    {
      name: 'John Johnson',
      id: 5,
      likeCount: 0,
      shareCount: 0,
      subscribeCount: 0,
    },
    {
      name: 'Jane Johnson',
      id: 6,
      likeCount: 0,
      shareCount: 0,
      subscribeCount: 0,
    },
    {
      name: 'John Brown',
      id: 7,
      likeCount: 0,
      shareCount: 0,
      subscribeCount: 0,
    },
    {
      name: 'Jane Brown',
      id: 8,
      likeCount: 0,
      shareCount: 0,
      subscribeCount: 0,
    },
    {
      name: 'John White',
      id: 9,
      likeCount: 0,
      shareCount: 0,
      subscribeCount: 0,
    },
    {
      name: 'Jane White',
      id: 10,
      likeCount: 0,
      shareCount: 0,
      subscribeCount: 0,
    },
  ];

  constructor() {
    this.userSubjects$.next([...this.users]);
    this.updateUserSubjects();
  }

  getAllUsers(): BehaviorSubject<User[]> {
    return this.userSubjects$;
  }

  private updateUserSubjects() {
    this.actionEvent$.subscribe((action) => {
      if (action.event === 'likeCount') {
        this.updateUserCounts(
          action.event,
          action.id
        );
      } else if (action.event === 'shareCount') {
        this.updateUserCounts(
          action.event,
          action.id
        );
      } else if (action.event === 'subscribeCount') {
        this.updateUserCounts(
          action.event,
          action.id
        );
      }
    });
  }

  private updateUserCounts(
    countType: 'likeCount' | 'shareCount' | 'subscribeCount',
    userId: number
  ) {
    const currUsers = this.userSubjects$.getValue();
    const updatedUsers = currUsers.map((user: User) => {
      if (user.id === userId) {
        return {
          ...user,
          [countType]: (user[countType] += 1),
        };
      } else {
        return user;
      }
    });

    this.userSubjects$.next(updatedUsers);
  }


}
