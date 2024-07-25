import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Character } from '../../interfaces/character';
import { CharacterService } from '../../services/character.service';

@Component({
  selector: 'app-details',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './details.component.html',
  styleUrl: './details.component.css',
})
export class DetailsComponent implements OnInit {
  character!: Character;

  constructor(
    private activatedRoute: ActivatedRoute,
    private characterService: CharacterService
  ) {}

  ngOnInit(): void {
    this.getDetails();
  }

  getDetails() {
    this.activatedRoute.paramMap.subscribe((p) => {
      const id = Number(p.get('id'));
      this.characterService.getDetails(id).subscribe((data: Character) => {
        this.character = data;
      });
    });
  }
}
