import { Injectable } from '@angular/core';
import { User } from './user';
import {
  BehaviorSubject,
  Observable,
  catchError,
  filter,
  first,
  map,
  of,
  shareReplay,
  tap,
} from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  
  userSubjects$: BehaviorSubject<User[]> = new BehaviorSubject<User[]>([]);
  users$: User[]=[]

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
    this.userSubjects$.subscribe(val=> this.users$ = val);
    
  }

  getUser(userId: number): Observable<User | undefined> {
    return this.userSubjects$.asObservable().pipe(
      map(users => users.find(user => user.id === userId)),
      filter(user => user !== undefined),
      first()
    );
  }

  getAllUsers(): BehaviorSubject<User[]> {
    return this.userSubjects$
  }

  

  increaseLikeCount(userId: number){
    const updatedUsers = this.users$.map(user => {
      
      if (user.id === userId) {
        return { ...user, likeCount: user.likeCount + 1 };
      }
      return user;
    });

    this.userSubjects$.next(updatedUsers);
  }

  increaseShareCount(userId: number){
    
    const updatedUsers = this.users$.map(user => {
      if (user.id === userId) {
        return { ...user, shareCount: user.shareCount + 1 };
      }
      return user;
    });

    this.userSubjects$.next(updatedUsers);
  }

  increaseSubscribeCount(userId: number){
    const updatedUsers = this.users$.map(user => {
      if (user.id === userId) {
        return { ...user, subscribeCount: user.subscribeCount + 1 };
      }
      return user;
    });

    this.userSubjects$.next(updatedUsers);
  }
}
