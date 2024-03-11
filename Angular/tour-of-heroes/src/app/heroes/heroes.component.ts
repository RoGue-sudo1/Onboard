import { Component, OnInit, inject } from '@angular/core';
import { Hero } from '../hero';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HeoresServiceService } from '../heores-service.service';
import { HeroDetailComponent } from '../hero-detail/hero-detail.component';
import { MessageService } from '../message.service';
import { RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';

@Component({
  selector: 'app-heroes',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatIconModule,
    MatInputModule,
    MatFormFieldModule,
    RouterLink,
    HeroDetailComponent,
    MatButtonModule,
    MatCardModule,
    MatButtonModule,
  ],
  templateUrl: './heroes.component.html',
  styleUrl: './heroes.component.css',
})
export class HeroesComponent implements OnInit {
  selectedHero?: Hero;

  heroes: Hero[] = [];

  constructor(
    private heroService: HeoresServiceService,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.getHeroes();
  }

  onSelect(hero: Hero): void {
    this.selectedHero = hero;
    this.messageService.add(`HeroesComponent: Selected hero id=${hero.id}`);
  }

  getHeroes(): void {
    this.heroService.getHeroes().subscribe((heroes) => (this.heroes = heroes));
  }
  add(text: string): void {
    const heroName = text.trim();
    const addNumber: number = 1;
    const heroId =
      this.heroes.length > 0
        ? Math.max(...this.heroes.map((hero) => hero.id)) + 1
        : 11;

    const newHero: Hero = {
      id: heroId,
      name: heroName,
      isActive: true,
    };
    console.log(typeof newHero.id);

    if (!heroName) {
      return;
    }
    this.heroService
      .addHero(newHero as Hero)
      .subscribe((hero) => this.heroes.push(hero));
  }

  delete(hero: Hero): void {
    this.heroes = this.heroes.filter((dHero) => dHero.id !== hero.id);
    this.heroService.deleteHero(hero).subscribe();
  }
}
