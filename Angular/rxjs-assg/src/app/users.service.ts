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

  userLike$ = new BehaviorSubject<{ id: number; likeCount: number }[]>([]);

  userShare$ = new BehaviorSubject<{ id: number; shareCount: number }[]>([]);

  userSubscribe$ = new BehaviorSubject<
    { id: number; subscribeCount: number }[]
  >([]);

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

    this.updateUserCounts();
  }

  getAllUsers(): BehaviorSubject<User[]> {
    return this.userSubjects$;
  }

  increaseLikeCount(userId: number) {
    // const updatedUsers = this.usersCopy.map((user) => {
    //   if (user.id === userId) {
    //     return { ...user, likeCount: user.likeCount + 1 };
    //   }
    //   return user;
    // });

    // this.userSubjects$.next(updatedUsers);

    // const updatedLike = this.userLike.map((like) => {
    //   if (like.id === userId) {
    //     return { ...like, likeCount: like.likeCount + 1 };
    //   }
    //   return like;
    // });

    // this.userLike$.next(updatedLike);
    this.updateCount(this.userLike$, userId, 'likeCount');
  }

  increaseShareCount(userId: number) {
    // const updatedUsers = this.usersCopy.map((user) => {
    //   if (user.id === userId) {
    //     return { ...user, shareCount: user.shareCount + 1 };
    //   }
    //   return user;
    // });

    // this.userSubjects$.next(updatedUsers);

    // const updatedShare = this.userShare.map((share) => {
    //   if (share.id === userId) {
    //     return { ...share, shareCount: share.shareCount + 1 };
    //   }
    //   return share;
    // });

    // this.userShare$.next(updatedShare);
    this.updateCount(this.userShare$, userId, 'shareCount');
  }

  increaseSubscribeCount(userId: number) {
    // const updatedUsers = this.usersCopy.map((user) => {
    //   if (user.id === userId) {
    //     return { ...user, subscribeCount: user.subscribeCount + 1 };
    //   }
    //   return user;
    // });

    // this.userSubjects$.next(updatedUsers);

    // const updatedSubscribe = this.userSubscribe.map((subscribe) => {
    //   if (subscribe.id === userId) {
    //     return { ...subscribe, subscribeCount: subscribe.subscribeCount + 1 };
    //   }
    //   return subscribe;
    // })

    // this.userSubscribe$.next(updatedSubscribe);

    this.updateCount(this.userSubscribe$, userId, 'subscribeCount');
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
