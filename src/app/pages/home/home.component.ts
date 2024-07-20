import { Component, OnInit } from '@angular/core';
import { Character } from '../../interfaces/character';
import { CharacterService } from '../../services/character.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, FormsModule, InfiniteScrollModule, RouterLink],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent implements OnInit {
  allCharacter: Character[] = [];
  filteredCharacter: Character[] = [];
  name!: string;
  statusCharacter!: string;
  currentPage: number = 1;

  constructor(private characterService: CharacterService) {}

  ngOnInit(): void {
    this.getCharacter();
  }

  getCharacter() {
    this.characterService
      .getCharacters(this.currentPage)
      .subscribe((data: Character[]) => {
        this.allCharacter = [...this.allCharacter, ...data];
        this.allFilter();
      });
  }

  allFilter() {
    let filtered = this.allCharacter;

    if (this.name) {
      filtered = filtered.filter((c) =>
        c.name.toLowerCase().includes(this.name.toLowerCase())
      );
    }

    if (this.statusCharacter) {
      filtered = filtered.filter(
        (c) => c.status.toLowerCase() === this.statusCharacter.toLowerCase()
      );
    }

    this.filteredCharacter = filtered;
  }

  deadFilter() {
    this.statusCharacter = 'Dead';
    this.allFilter();
  }

  aliveFilter() {
    this.statusCharacter = 'Alive';
    this.allFilter();
  }

  unknownFilter() {
    this.statusCharacter = 'unknown';
    this.allFilter();
  }

  onScroll(): void {
    this.currentPage++;
    this.getCharacter();
  }
}
