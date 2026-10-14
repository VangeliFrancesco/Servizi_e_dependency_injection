import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { StudentiService } from '../services/studenti-service';

@Component({
  imports: [FormsModule],
  selector: 'app-inserimento',
  styleUrl: './inserimento.css',
  templateUrl: './inserimento.html',
})
export class Inserimento {
  private readonly studentiService = inject(StudentiService);
  private readonly router = inject(Router);
  readonly nome = signal('');
  readonly classe = signal('4B');
  readonly media = signal(6);

  salva(): void {
    const nome = this.nome().trim();
    const classe = this.classe().trim().toUpperCase();
    const mediaVoti = Number(this.media());
    if (
      nome === '' ||
      classe === '' ||
      !Number.isFinite(mediaVoti) ||
      mediaVoti < 1 ||
      mediaVoti > 10
    ) {
      return;
    }

    this.studentiService.aggiungi(nome, classe, mediaVoti);
    this.router.navigate(['/elenco']);
  }
}