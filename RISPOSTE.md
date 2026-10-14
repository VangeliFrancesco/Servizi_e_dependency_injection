# Risposte al laboratorio: registro degli studenti

1. **Che cos'è `app.routes.ts` e che cosa contiene in questo progetto? Elenca gli URL e il componente che mostrano.**

   `app.routes.ts` associa i percorsi URL alle pagine standalone. `/home` mostra `Home`, `/elenco` mostra `Elenco`, `/inserimento` mostra `Inserimento` e `/elenco/:id` mostra `DettaglioStudente`. Il percorso vuoto reindirizza a `/home`; la wildcard finale reindirizza a `/home` per gli URL non riconosciuti.

2. **Che cos'è un service e perché lo si usa? Perché gli studenti stanno in `StudentiService` e non nel componente `Elenco`?**

   Un service è una classe Angular che raccoglie dati e logica condivisi. `StudentiService` è iniettato nella home, nell'elenco, nel form e nel dettaglio: così tutte le pagine leggono e aggiornano lo stesso registro anche quando il router distrugge e ricrea una pagina. Se i dati fossero proprietà di `Elenco`, le altre pagine non condividerebbero direttamente quello stato.

3. **Come si legge l'id dello studente dall'URL? Perché va convertito con `Number`?**

   `DettaglioStudente` si iscrive a `ActivatedRoute.paramMap`, legge `parametri.get('id')` e applica `Number(...)`. I parametri dell'URL sono stringhe; la conversione permette di confrontare, per esempio, il numero `2` con l'id numerico `2` conservato nello studente.

4. **Perché il signal `dati` è privato e i componenti leggono `studenti`? Che cosa potrebbe succedere se `Elenco` potesse chiamare `set` sul signal?**

   `dati` è un signal scrivibile privato. `studenti` è esposto con `asReadonly()`, perciò i componenti possono leggerlo ma non chiamare `set` o `update`. Se l'elenco potesse scriverci direttamente, potrebbe saltare le regole centralizzate nei metodi del servizio, per esempio la generazione dell'id o gli aggiornamenti del registro.

5. **Come viene calcolato l'id di un nuovo studente? Mostra con un esempio perché “numero di studenti + 1” sarebbe sbagliato.**

   `prossimoId()` prende l'id massimo presente e aggiunge uno; con registro vuoto parte da 1. Se si eliminasse lo studente 2, resterebbero quattro studenti: usare il conteggio più uno produrrebbe l'id 5, già assegnato a Paolo Russo. Il massimo degli id presenti è 5, quindi il nuovo id è 6.

6. **Che cosa succede, passo per passo, quando scrivi una lettera nel campo del filtro?**

   `ngModel` aggiorna il signal `filtroClasse`; il computed `filtrati` legge quel signal e l'elenco condiviso, normalizza il filtro con `trim()` e `toUpperCase()` e seleziona le classi uguali. Angular aggiorna la tabella e `mediaClasse`, che dipende da `filtrati`, ricalcola la media dei soli risultati.

7. **A che cosa servono `#modulo="ngForm"` e `[disabled]="modulo.invalid"`? Quali condizioni rendono il form non valido?**

   `#modulo="ngForm"` dà accesso allo stato del form gestito da Angular. Il pulsante Salva è disabilitato quando il form non è valido. Nome e classe sono obbligatori; la media è obbligatoria, numerica e deve essere compresa tra 1 e 10. Il metodo `salva()` controlla anche stringhe vuote dopo `trim()` e il valore numerico prima di aggiungere lo studente.

8. **Perché dopo il salvataggio si usa `router.navigate(['/elenco'])` invece di un link?**

   La navigazione è la conseguenza dell'azione di salvataggio, non un collegamento che l'utente deve premere a parte. Per questo `Inserimento.salva()` aggiunge lo studente tramite il servizio e poi chiede al router di aprire `/elenco`.

9. **Quali input e quale output ha `StudenteCard`? Perché la card non chiama direttamente il servizio per rimuovere lo studente?**

   `StudenteCard` riceve l'input obbligatorio `studente` e l'input booleano `azioni`, che vale `true` per impostazione predefinita. Il suo output `rimosso` emette lo studente. La card si occupa della visualizzazione e comunica l'evento al componente padre; è il padre a decidere se e come chiamare il servizio. In home `azioni` vale `false`, mentre nel dettaglio l'evento porta alla rimozione e alla navigazione all'elenco.

10. **Perché Studente successivo funziona solo con `paramMap.subscribe`? Che cosa vedresti con lo snapshot?**

    Passando da `/elenco/2` a `/elenco/3`, Angular riusa `DettaglioStudente` perché la route è la stessa. La sottoscrizione a `paramMap` osserva il nuovo id e aggiorna il signal `studente`, quindi la scheda cambia. Lo snapshot leggerebbe soltanto il valore iniziale: l'URL cambierebbe, ma la scheda potrebbe continuare a mostrare lo studente precedente.