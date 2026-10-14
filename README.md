# Registro degli studenti

Progetto didattico Angular per il laboratorio sui servizi e la dependency injection. Il nome previsto per il repository di consegna è `cognome-nome-registro-studenti` (sostituire i segnaposto con i propri dati). L'applicazione Angular si trova nella cartella `registro-studenti`.

## Prerequisiti

- Node.js compatibile con Angular 22 (Node.js 24.13 o successivo nella linea 24).
- npm.

Il progetto usa Angular 22.2.2, componenti standalone, CSS, routing e Bootstrap 5.3.8. SSR è disattivato. Angular 22.2.2 include il decoratore `@Service()` presentato nella dispensa, quindi il servizio usa quella forma.

## Installazione e avvio

Dalla radice di questo repository, lo starter si può creare con:

```bash
npx --yes @angular/cli@22.2.2 new registro-studenti --style=css --ssr=false --routing --standalone --skip-git --defaults
```

Quindi, dalla cartella del progetto, installare Bootstrap e avviare:

```bash
cd registro-studenti
npm install bootstrap@5.3.8
npm install
npm start
```

Aprire `http://localhost:4200/`. Per compilare e verificare i test:

```bash
npm run build
npm test -- --watch=false
```

Bootstrap è già registrato in `angular.json` e dichiarato nelle dipendenze. In caso di creazione manuale dello starter, il comando d'installazione è `npm install bootstrap@5.3.8`.

## Funzionalità

- Servizio condiviso `StudentiService` con signal privato, signal pubblico in sola lettura e valori derivati.
- Home con contatore e scheda dello studente con la media più alta.
- Elenco filtrabile per classe, medie colorate, media calcolata sui risultati e azioni di dettaglio/rimozione.
- Form template-driven validato per inserire uno studente.
- Scheda di dettaglio con navigazione allo studente successivo e rimozione.
- Test automatici per servizio, identificativi e media della classe 4A.

I dati sono conservati soltanto in memoria: gli studenti aggiunti si perdono ricaricando la pagina, come previsto dal laboratorio.

## Struttura essenziale

```text
registro-studenti/
	src/app/
		modelli/studente.ts
		services/studenti-service.ts
		home/
		elenco/
		inserimento/
		studente-card/
		dettaglio-studente/
		app.routes.ts
		app.config.ts
```

## Prova in autonomia

È stata implementata la prova livello 1: `Elenco.mediaClasse` calcola la media dei soli studenti filtrati, restituisce zero quando non ci sono risultati e viene mostrata con due decimali. Con il filtro `4A`, i dati iniziali producono `7.30`.

I livelli 2 (ordinamento) e 3 (modifica) restano estensioni facoltative e non sono implementati.

## Commit del laboratorio

La sequenza prevista durante lo svolgimento è un commit al termine di ciascun passo. Poiché questo progetto è stato realizzato direttamente nello stato finale, il salvataggio Git di questa versione raccoglie tutti i passi in un unico commit: non sono stati ricostruiti commit intermedi retroattivi.

1. `Passo 1: modello Studente`
2. `Passo 2: servizio StudentiService`
3. `Passo 3: pagine e route`
4. `Passo 4: tabella degli studenti`
5. `Passo 5: filtro per classe`
6. `Passo 6: pagina di inserimento`
7. `Passo 7: componente studente-card`
8. `Passo 8: dettaglio con parametro`
9. `Prova tu livello 1`

Le risposte alle dieci domande sono in `RISPOSTE.md`.