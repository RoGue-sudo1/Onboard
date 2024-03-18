import { Injectable } from '@angular/core';
import { User } from './user';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  private userSubjects$: BehaviorSubject<User[]> = new BehaviorSubject<User[]>(
    []
  );

  private usersCopy: User[] = [];

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
    this.userSubjects$.next(this.users);
    this.userSubjects$.subscribe((users) => {
      this.usersCopy = users;
    });
 
  }

  getAllUsers(): BehaviorSubject<User[]> {
    return this.userSubjects$;
  }

  increaseLikeCount(userId: number) {
    const updatedUsers = this.usersCopy.map((user) => {
      if (user.id === userId) {
        return { ...user, likeCount: user.likeCount + 1 };
      }
      return user;
    });

    this.userSubjects$.next(updatedUsers);
  }

  increaseShareCount(userId: number) {
    const updatedUsers = this.usersCopy.map((user) => {
      if (user.id === userId) {
        return { ...user, shareCount: user.shareCount + 1 };
      }
      return user;
    });

    this.userSubjects$.next(updatedUsers);
  }

  increaseSubscribeCount(userId: number) {
    const updatedUsers = this.usersCopy.map((user) => {
      if (user.id === userId) {
        return { ...user, subscribeCount: user.subscribeCount + 1 };
      }
      return user;
    });

    this.userSubjects$.next(updatedUsers);
  }
}
