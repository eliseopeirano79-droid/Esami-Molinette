# Esami Molinette — sistema grafico Sbobine

La piattaforma **Esami Molinette** usa lo stesso linguaggio visuale della web app **Sbobine**: interfaccia ispirata ai controlli Apple/iOS, sobria e centrata sullo studio. Questa è una variante *indipendente* e non importa i dati privati di Sbobine.

## Regole fondamentali

1. **Una sola azione principale per schermata**. Home: seleziona anno/materia. Materia: Studia, Allenati, Simula. Quiz: rispondi. Il resto in una sezione espandibile o nelle impostazioni.
2. Sfondo `#f2f2f7`, superfici bianche, testo `#1c1c1e`, testo secondario `#6e6e73`, blu di interazione `#007aff`. Bordi sottili `rgba(60,60,67,.14)`. Evitare gradienti da landing page, fondi blu notte, colori mint/peach e ombre pesanti.
3. Tipografia di sistema (`-apple-system`, SF Pro quando disponibile). Gerarchia nitida: titolo pagina, sezione, riga, dettaglio.
4. **Liste raggruppate** per materie, moduli, argomenti e materiali; selettore a sei anni visibile e compatto. Icone semplici e funzionali.
5. Responsive reale: superfici e pulsanti touch adeguati, nessuno scorrimento orizzontale a 390px, impostazioni come foglio dal basso su mobile.
6. Correzione e spiegazioni: un feedback leggibile subito dopo la risposta; barra di ripasso solo se attiva; spiegazione completa in una disclosure, accessibile con un tocco.
7. La modalità d'esame non rivela mai correttezza o motivazioni prima della consegna.
8. I materiali reali non vengono mescolati a elementi dimostrativi o inventati. Addome resta parziale: Nefrologia e Urologia.

## Componenti

- **Intestazione**: marchio piccolo, titolo Esami Molinette, link Home/Materie, rotellina.
- **Anno**: segmenti I–VI (no grandi card di marketing).
- **Materia**: riga nativa con icona 42×42, nome, sottotitolo, quantità e chevron.
- **Studio**: tre scelte riconoscibili (Studia / Allenati / Simula); argomenti e appelli in righe apribili.
- **Quiz**: domanda in un solo pannello; opzioni chiare e grandi; feedback breve; facoltative difficoltà, ripasso e teoria.
- **Impostazioni**: pannello laterale desktop, bottom sheet mobile.

Le personalizzazioni stanno in `sbobine-theme.css`. `styles.css` contiene temporaneamente gli stili legacy di fallback; alla prossima versione potranno essere ripuliti senza cambiare la logica dei quiz.

## v0.5: nessuna emoji
Utilizzare solo icone SVG funzionali. Non usare emoji nei titoli, nelle materie, nei pulsanti di ripasso o negli stati. Gli elementi avanzati restano nei dettagli e nelle impostazioni.
