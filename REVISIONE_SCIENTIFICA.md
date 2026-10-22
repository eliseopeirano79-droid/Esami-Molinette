# Revisione scientifica e integrità delle risposte

**Stato:** bozza. La conversione del mazzo Anki conserva la chiave originale ma non la certifica. Le spiegazioni redatte ex novo vanno sottoposte a lettura critica e validazione.

## Differenza fondamentale fra livelli di verifica

1. **Risposta originale Anki**: soluzione così come evidenziata nel mazzo (non confermata).
2. **Lezione universitaria**: documento fornito dall'utente; utile per il programma, ma può contenere sviste, vecchi criteri o semplificazioni.
3. **Testo didattico Esami Molinette**: spiegazione scritta in modo originale e semplice; **bozza**, non necessariamente approvata da un esperto.
4. **Risposta validata**: ancora non prevista in questa release; richiederebbe revisione bibliografica e clinica puntuale per ciascuna domanda.

## Esempi di problematiche reali da non propagare

| Contenuto | Dove | Problema | Cosa fare |
|---|---|---|---|
| Proteinuria / albuminuria | `NEFROLOGIA MARTI.pdf`, pp. 7–9 | Le soglie di 150 mg/die della proteinuria totale vengono talvolta accostate all'albuminuria in modo improprio | Distinguere le due misure; KDIGO 2024: A1 <30 mg/d, A2 30–300, A3 >300 |
| Iperparatiroidismo secondario “in tutti dal terzo stadio” | Quiz `anki-1656582203452` | Un assoluto clinico non sostenibile come regola universale | Segnalato come dubbio nell'app |
| “Oggi la più frequente IRA da contrasto” | Quiz `anki-1656582312869` | Dato epidemiologico contestuale e non universalizzabile | Segnalato come dubbio |
| Antimuscarinici / acetilcolina | `UROLOGIA MARTI.pdf`, p. 20 | L'acetilcolina è indicata sotto “antimuscarinici”; è un agonista fisiologico dei recettori muscarinici, non un farmaco antimuscarinico | Correggere prima di trasformare il passaggio in spiegazione terapeutica |
| Antagonisti beta / agonismo beta | `UROLOGIA MARTI.pdf`, p. 35 | Titolo “antagonisti beta-adrenergici” e descrizione “agonisti” confliggono | Distinguere l'agonismo beta-3 nel rilassamento detrusoriale |
| Goodpasture / Alport | `NEFROLOGIA MARTI.pdf`, pp. 39–40 | La descrizione associa sordità e storia familiare al quadro di Goodpasture; ciò rischia di confondere caratteristiche classiche della sindrome di Alport | Separare le malattie nella revisione |
| PSA in rialzo ⇒ mapping bioptico automatico | Quiz `anki-1656602341322` | Iter potenzialmente obsoleto rispetto alla valutazione moderna pre-biopsia | Segnalato come dubbio |

## Fonti di verifica primaria

- [KDIGO 2024 Clinical Practice Guideline for Evaluation and Management of CKD](https://kdigo.org/guidelines/ckd-evaluation-and-management/)
- [EAU Guidelines](https://uroweb.org/guidelines), compresi aggiornamenti sulle infezioni urologiche 2026

## Per ampliare le spiegazioni

Per ciascun quiz: identificare la pagina/patologia nelle dispense → spiegare la domanda in italiano semplice → definire ogni termine potenzialmente nuovo → argomentare ciascuna opzione → confrontare con una fonte clinica affidabile se contiene numeri o terapie → segnalare eventuali divergenze → approvare. Non riempire automaticamente i campi mancanti con testo generico spacciato per motivazione specifica.
