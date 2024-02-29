import { Injectable } from '@angular/core';
import { Hero } from './hero';
import { Observable, catchError, of, tap } from 'rxjs';
import { MessageService } from './message.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class HeoresServiceService {
  private heroesUrl = 'http://localhost:3000/Heroes';

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      console.log(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }

  constructor(
    private messageService: MessageService,

    private http: HttpClient
  ) {}

  getHeroes(): Observable<Hero[]> {
    const heroes = this.http.get<Hero[]>(this.heroesUrl).pipe(
      tap((_) => console.log('Fetched Heroes')),
      catchError(this.handleError<Hero[]>('getHeroes', []))
    );

    this.messageService.add('HeroService: fetched heroes');
    return heroes;
  }

  getHero(id: number): Observable<Hero> {
    const url = `${this.heroesUrl}/${id}`;
    const hero = this.http.get<Hero>(url,this.httpOptions).pipe(
      tap((_) => console.log(`fetched hero id=${id}`)),
      catchError(this.handleError<Hero>(`getHero of id:${id}`))
    );
    this.messageService.add(`HeroService: fetched hero id=${id}`);
    return hero;
  }

  updateHero(hero: Hero): Observable<any> {
    const url = `${this.heroesUrl}/${hero.id}`;
    const updatedHero = this.http.put(url, hero, this.httpOptions).pipe(
      tap((_) => {
        console.log(`updated hero with id:${hero.id}`);
      }),
      catchError(this.handleError<any>('updatedHero'))
    );

    return updatedHero;
  }

  addHero(hero: Hero): Observable<Hero> {
    const addedHero = this.http
      .post<Hero>(this.heroesUrl, hero, this.httpOptions)
      .pipe(
        tap((newHero: Hero) => {
          console.log(`added new hero with id:${newHero.id}`);
        }),
        catchError(this.handleError<Hero>('addHero'))
      );

    return addedHero;
  }

  deleteHero(hero:Hero): Observable<Hero> {
    console.log(hero.id)
    const url = `${this.heroesUrl}/${hero.id}`;
    const updatedHero = {...hero,isActive:false}

    const deletedHero = this.http.put<Hero>(url,updatedHero, this.httpOptions).pipe(
      tap((_) => {
        console.log(`Deleted hero of id:${hero.id}`);
      }),
      catchError(this.handleError<Hero>('delteHero'))
    );
    
    return deletedHero
    
  }
}
