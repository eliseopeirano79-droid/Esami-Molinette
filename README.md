# Esami Molinette — Preparazione Esami 

Una web app **generalista per preparare gli esami di Medicina e Chirurgia a UniTo**. È un progetto studentesco indipendente, **non ufficiale**.

## Funziona già

- Home minimale in stile **Sbobine**: sei anni selezionabili subito e lista delle materie senza passaggi superflui.
- Catalogo: II anno **Anatomia Umana**, **Fisiologia → Fisiologia I / II**; III anno **Metodologia Clinica → Semeiotica Clinico-Medica / Clinico-Chirurgica**, **Farmacologia I**, **Chirurgia Maxillofacciale**, **Malattie dell'Apparato Locomotore**; IV anno **Addome → Nefrologia / Urologia**. Gli altri anni sono predisposti.
- **672 schede attive** importate dal mazzo Anki: **397 Nefrologia, 275 Urologia**; 667 multiple choice e 5 risposte aperte.
- **28 lezioni sintetiche per argomento**, basate sui PDF `NEFROLOGIA MARTI.pdf` e `UROLOGIA MARTI.pdf`, con concetti di base, meccanismi, parole spiegate e riferimento alle pagine.
- **26 domande con spiegazione puntuale di tutte le alternative**: prima stesura didattica da sottoporre a revisione. Per le altre **646** viene mostrata la teoria dell'argomento, con un avviso chiaro che manca ancora la spiegazione specifica.
- Lettura continua: domande e risposte evidenziate, note, glossario, ricerca, filtri per argomento e appello, preferiti.
- Allenamento: tutte o N domande, verifica immediata per le risposte singole, selezione multipla per gli item che la richiedono, autovalutazione per le domande aperte.
- Allenamento con timer personalizzato in ore, minuti e secondi.
- Simulazione **libera**: niente risposte/spiegazioni prima della consegna, risultato e revisione integrale soltanto alla fine, consegna automatica allo scadere del tempo.
- Salvataggio dei tentativi **solo sul dispositivo** via `localStorage`. Nessun account o tracciamento lato server.

**IMPORTANTE:** le chiavi di risposta sono quelle del mazzo Anki originale e **non sono state verificate globalmente**. Alcune sono state segnalate come problematiche. Le 26 spiegazioni puntuali costituiscono una bozza scientifico-didattica, non una revisione medica firmata.

## Avvio immediato

Apri `index.html` nel browser: l'app non richiede installazione né server e funziona offline (i caratteri Google vengono sostituiti con caratteri di sistema se non c'è rete).

Per un server locale, dalla cartella del progetto:

```bash
python3 -m http.server 8000
```

Poi visita `http://localhost:8000`.

## Portarla su GitHub

Questo pacchetto è pensato per un **nuovo repository dedicato** (ad esempio `esami-molinette`), non per sovrascrivere Sbobine, Isoelettrica o PHARMA. Si raccomanda di iniziare con repository **privato**, finché non sono chiariti i permessi di redistribuzione della banca domande e delle dispense.

1. Su GitHub crea un nuovo repository privato vuoto.
2. Estrai questo ZIP e carica il contenuto della cartella `Esami_Molinette_Project` nel repository (o usa Git).
3. Per vedere l'app via GitHub Pages, verifica prima permessi dei contenuti e le opzioni Pages del piano/repository. In alternativa usa un sito statico privato o apri `index.html` in locale.

Con `git` dal Terminale:

```bash
git init
git add .
git commit -m "Esami Molinette v0.5: interfaccia Sbobine senza emoji"
git branch -M main
git remote add origin https://github.com/TUO-ACCOUNT/NOME-REPOSITORY.git
git push -u origin main
```

Non inserire credenziali o token nel repository.

## Struttura

- `index.html`, `styles.css`, `sbobine-theme.css`, `ux-v05.css`, `app.js`: applicazione statica, senza dipendenze e senza API. `STYLE_GUIDE.md` documenta il sistema visuale Sbobine.
- `data/bank.json`: formato canonico della banca, con quiz, spiegazioni, avvisi e teoria.
- `data/bank.js`: copia per lo script statico; rigenerabile con `python tools/pack_bank.py`.
- `data/removed-placeholder-notes.json`: conserva separatamente le 11 schede marcate eliminate nel mazzo Anki; non entrano negli allenamenti.
- `data/exam-rules.example.json`: campi da compilare **solo quando saranno noti i criteri reali**.
- `exports/Spiegazioni_didattiche_Nefro_Uro.md`: archivio consultabile delle 26 spiegazioni complete.
- `exports/RemNote_Originale.zip`: conversione precedente da APKG per RemNote; nel nuovo progetto le spiegazioni sono un materiale supplementare distinto.
- `REVISIONE_SCIENTIFICA.md`: problemi verificati e priorità.
- `ROADMAP.md`: tappe di sviluppo.
- `test_smoke.js`: test sui principali percorsi dell'interfaccia con Node.js.
- `assets/anki-media/`: backup dei media del mazzo; non sono ripubblicati automaticamente nel corpo delle domande senza un collegamento certo.

## Aggiungere nuove materie e domande

L'albero anni/corsi si trova in `CATALOG` all'inizio di `app.js`. Ogni quesito nel JSON contiene:

```json
{
  "id": "origine-univoca",
  "subject": "nefro",
  "topic": "Danno renale acuto",
  "type": "multiple_choice",
  "question": "Testo originale",
  "options": [{"id":"A", "text":"Alternativa", "correct":true}],
  "correct_indexes": [0],
  "explanation": null
}
```

Quando la spiegazione è stata **scritta e controllata**, impostare `explanation.correct_reason`, `explanation.option_reasons` (una per ogni alternativa) e `explanation.remember`. Non sostituire la risposta originale senza conservare lo storico dell'errore.

## Sicurezza, qualità e diritti

- Uso **didattico**, non per decidere diagnosi o terapie reali.
- Si usano soltanto le risposte presenti nel mazzo; una risposta del mazzo non equivale alla correttezza clinica.
- L'app escapa il contenuto dei quiz per impedire l'esecuzione di HTML o codice importato.
- I PDF originali sono **non inclusi**, per non redistribuire automaticamente materiali di terzi.
- Prima di rendere pubblici banca dati, immagini o appunti, verificare l'autorizzazione dei rispettivi autori. Non si presume che il caricamento privato autorizzi la ripubblicazione.
- Controllo di riferimento: [KDIGO (rene)](https://kdigo.org/guidelines/ckd-evaluation-and-management/), [EAU (urologia)](https://uroweb.org/guidelines).



## Ripasso personalizzabile (introdotto in v0.4)

La rotellina impostazioni si trova nell'intestazione dell'app e nella schermata di allenamento. Permette di nascondere completamente la barra di autovalutazione oppure usare quattro gradi (Da rifare, Difficile, Bene, Facile).

- **Dopo N domande**: ciascuna valutazione aggiunge la stessa domanda nella coda della sessione dopo N altre schede. Se rimangono meno schede di quelle richieste, la domanda viene posta alla fine. Al massimo 3 ripassi extra per domanda/sessione evitano sessioni senza fine.
- **Dopo un intervallo**: puoi configurare per ciascun grado minuti, ore o giorni. Le scadenze sono salvate nel browser e restano disponibili per sessioni successive nella raccolta «Da ripassare ora». Se la scadenza matura durante una sessione, il quesito viene riproposto al passaggio successivo.
- **Barra disattivata**: nessuna nuova ripetizione programmata in base al voto; l'utente risponde, legge la spiegazione e sceglie Continua.
- **Altre preferenze**: avanzamento automatico dopo il voto, mostra/nascondi spiegazioni, motivazioni per singola opzione, difficoltà personale, progressi, timer visibile, preferiti, pulsante Salta e scorciatoie da tastiera.
- **Scegli la raccolta**: tutte, nuove, da ripassare ora o con almeno un errore precedente.
- **Modalità esame**: le preferenze non fanno comparire soluzioni, spiegazioni o barra di voto durante la prova; tutto questo rimane nascosto fino alla consegna.

Il ripasso è una programmazione **personalizzabile e semplice**, non un'implementazione certificata di FSRS o dell'algoritmo proprietario di RemNote. Il punteggio della sessione si riferisce alla prima risposta di ciascuna domanda, escludendo i ripassi. Preferenze e cronologia restano solo nel browser (non sono sincronizzate su altri dispositivi).

## Redesign Sbobine (introdotto in v0.4)

- Eliminati hero scuri, verde editorial, elementi decorativi e card da landing page.
- UI Apple/iOS come Sbobine: grigio di sistema, bianco, blu, controlli sobri, font di sistema.
- Home senza promozioni: scelta I–VI anno, lista materie del selezionato.
- Area materia: **Studia**, **Allenati**, **Simula**; argomenti, appelli e informazioni in disclosure.
- Durante l'allenamento, feedback rapido e barra di ripasso; teoria completa apribile soltanto quando serve.
- Difficoltà personale **disattivata per impostazione iniziale**, riattivabile dalla rotellina. Le preferenze di chi usa già l'app restano memorizzate.
- Corretto il campo numerico personalizzato: scrivere N domande e premere subito Avvia non interrompe il clic per un rerender.
- Vedi `STYLE_GUIDE.md` per le regole da mantenere negli sviluppi futuri.

## Interfaccia v0.5 — ottobre 2026

- Interfaccia **priva di emoji**: icone vettoriali incluse nel codice, leggere e leggibili offline, uniformi allo stile Sbobine.
- Quattro valutazioni del ripasso con etichette e intervalli testuali, senza faccine. Nessun cambiamento agli intervalli dell'utente o alle domande.
- Impostazioni semplificate, con funzioni avanzate in sezioni espandibili e ripristino della posizione di scorrimento quando si cambia un'opzione.
- Feedback migliorato: quando la risposta è errata si evidenzia anche la soluzione del mazzo Anki, che rimane non scientificamente verificata nel suo complesso.
- Pulsante **Ripassa ora** nella materia quando sono presenti schede con scadenza maturata.
- Ultimo anno selezionato conservato nel browser; pulsanti più chiari su mobile.
- Selettore degli anni, materie e modalità prova restano indipendenti dai contenuti privati dell'app Sbobine.
- Prosegue il lavoro sulla revisione delle spiegazioni: nessuna spiegazione aggiuntiva è stata attribuita indebitamente a una domanda.

### Backup e trasferimento dati
In Impostazioni → Salva o trasferisci i tuoi progressi puoi esportare un JSON con preferiti, cronologia, ripassi e impostazioni oppure importarlo in un'altra versione. **L'importazione sostituisce i dati locali** dopo la validazione. Il backup non include le domande originali né dati personali.
I commenti del mazzo Anki restano integri nel database, ma l'interfaccia non mostra i due simboli emoji presenti nei commenti importati.
