# NOP Oslo Julematch 2026 – RO-påmelding

Dette skriptet lager et **ekte Google Forms-skjema i din Google-konto**, med svar lagret i et tilknyttet Google-regneark.

## Opprett skjemaet

1. Åpne [Google Apps Script](https://script.google.com/) og velg **Nytt prosjekt**.
2. Åpne [RO-skjema.gs](./RO-skjema.gs), kopier hele koden og lim den inn i prosjektets `Code.gs`. Lagre.
3. Velg funksjonen **opprettROSkjema** øverst og klikk **Kjør**.
4. Godkjenn Googles tillatelser for Forms, Sheets og tidsutløseren.
5. Åpne **Kjøringslogg** for **OFFENTLIG SKJEMALENKE**, **REDIGERING** og **SVARARK**.
6. Bruk **OFFENTLIG SKJEMALENKE** på julematch-nettsiden. Send lenken hit for å få den lagt inn i `index.html`.

Skriptet oppretter feltene fornavn, etternavn, RO-status og SSI-e-post (alle obligatoriske), og registrerer automatisk stenging omkring kl. 00:05 den 13. november 2026 norsk tid. Google-tidsutløsere kan kjøre litt senere enn angitt tidspunkt.

Kjør opprettROSkjema **bare én gang**. Skriptet husker skjema-ID og unngår å opprette et nytt skjema ved gjentatt kjøring i samme Apps Script-prosjekt.

**Personvern:** Navn, RO-status og e-post er personopplysninger. Sørg for at bare relevante arrangører har tilgang til svararket, og slett opplysningene når de ikke lenger trengs til bemanningsplanlegging.
