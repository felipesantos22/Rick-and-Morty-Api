import { Component, OnInit } from '@angular/core';
import { Character } from '../../interfaces/character';
import { CharacterService } from '../../services/character.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent implements OnInit {
  allCharacter: Character[] = [];

  constructor(private characterService: CharacterService) {}

  ngOnInit(): void {
    this.getCharacter();
  }

  getCharacter() {
    this.characterService.getCharacters().subscribe((data: Character[]) => {
      this.allCharacter = data;
    });
  }
}
