import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { Elenco } from './elenco';

describe('Elenco', () => {
  it('calcola la media filtrata della classe 4A', async () => {
    await TestBed.configureTestingModule({
      imports: [Elenco],
      providers: [provideRouter([])],
    }).compileComponents();

    const fixture = TestBed.createComponent(Elenco);
    const elenco = fixture.componentInstance;
    elenco.filtroClasse.set('4A');

    expect(elenco.mediaClasse()).toBe(7.3);
  });

  it('restituisce zero quando il filtro non trova studenti', async () => {
    await TestBed.configureTestingModule({
      imports: [Elenco],
      providers: [provideRouter([])],
    }).compileComponents();

    const fixture = TestBed.createComponent(Elenco);
    const elenco = fixture.componentInstance;
    elenco.filtroClasse.set('5C');

    expect(elenco.filtrati()).toHaveLength(0);
    expect(elenco.mediaClasse()).toBe(0);
  });
});