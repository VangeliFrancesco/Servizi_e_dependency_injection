import { TestBed } from '@angular/core/testing';
import { StudentiService } from './studenti-service';

describe('StudentiService', () => {
  let service: StudentiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StudentiService);
  });

  it('viene creato con i cinque studenti iniziali', () => {
    expect(service.studenti()).toHaveLength(5);
    expect(service.numero()).toBe(5);
    expect(service.migliore()?.nome).toBe('Marco Verdi');
  });

  it('aggiorna numero, migliore e id dopo una rimozione', () => {
    service.rimuovi(2);
    const nuovo = service.aggiungi('Anna Bianchi', '4A', 7);

    expect(nuovo.id).toBe(6);
    expect(service.numero()).toBe(5);
    expect(service.trova(2)).toBeUndefined();
    expect(service.successivo(5)?.id).toBe(6);
  });

  it('riparte dall id 1 e non trova successivi quando il registro è vuoto', () => {
    for (const studente of service.studenti()) {
      service.rimuovi(studente.id);
    }

    expect(service.numero()).toBe(0);
    expect(service.migliore()).toBeUndefined();
    expect(service.successivo(1)).toBeUndefined();
    expect(service.aggiungi('Luca Bianchi', '4B', 7.5).id).toBe(1);
  });
});