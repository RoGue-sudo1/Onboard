import { Injectable } from '@angular/core';
import { User } from './user';
import { BehaviorSubject, combineLatest, map, merge } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  private userSubjects$: BehaviorSubject<User[]> = new BehaviorSubject<User[]>(
    []
  );

  userLike$ = new BehaviorSubject<{ id: number; likeCount: number }[]>([]);

  userShare$ = new BehaviorSubject<{ id: number; shareCount: number }[]>([]);

  userSubscribe$ = new BehaviorSubject<
    { id: number; subscribeCount: number }[]
  >([]);

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
    this.updateUserSubjects();
    // this.userSubjects$.next(this.users);
    this.updateUserCounts();
    // this.intializeUsers();
  }

  getAllUsers(): BehaviorSubject<User[]> {
    return this.userSubjects$;
  }

  increaseLikeCount(userId: number) {
    this.updateCount(this.userLike$, userId, 'likeCount');
   
  }

  increaseShareCount(userId: number) {
    this.updateCount(this.userShare$, userId, 'shareCount');
  }

  increaseSubscribeCount(userId: number) {
    this.updateCount(this.userSubscribe$, userId, 'subscribeCount');
  }

  private updateUserSubjects() {
    combineLatest([this.userLike$, this.userShare$, this.userSubscribe$])
      .pipe(
        map(([likeCounts, shareCounts, subscribeCounts]) => {
          const likeMap = new Map(
            likeCounts.map((item) => [item.id, item.likeCount])
          );
          const shareMap = new Map(
            shareCounts.map((item) => [item.id, item.shareCount])
          );
          const subscribeMap = new Map(
            subscribeCounts.map((item) => [item.id, item.subscribeCount])
          );
          return this.users.map((user) => ({
            ...user,
            likeCount: likeMap.get(user.id) || 0,
            shareCount: shareMap.get(user.id) || 0,
            subscribeCount: subscribeMap.get(user.id) || 0,
          }));
        })
      )
      .subscribe((mergedUsers) => {
        this.userSubjects$.next(mergedUsers);
      });
  }

  private updateUserCounts() {
    this.userLike$.next(
      this.users.map((user) => ({ id: user.id, likeCount: user.likeCount }))
    );
    this.userShare$.next(
      this.users.map((user) => ({ id: user.id, shareCount: user.shareCount }))
    );
    this.userSubscribe$.next(
      this.users.map((user) => ({
        id: user.id,
        subscribeCount: user.subscribeCount,
      }))
    );
  }


  private updateCount(
    behaviorSubject: BehaviorSubject<any[]>,
    userId: number,
    countKey: string
  ) {
    const updatedCounts = behaviorSubject.getValue().map((item) => {
      if (item.id === userId) {
        return { ...item, [countKey]: item[countKey] + 1 };
      }
      return item;
    });
    behaviorSubject.next(updatedCounts);
  }


}
