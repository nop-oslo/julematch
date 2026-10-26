/**
 * NOP Oslo Julematch 2026 – RO-påmelding
 * Kjør funksjonen opprettROSkjema én gang i https://script.google.com/
 * Skjema-URL og redigerings-URL vises i kjøringsloggen.
 */
function opprettROSkjema() {
  const props = PropertiesService.getScriptProperties();
  const eksisterendeId = props.getProperty('RO_FORM_ID');
  if (eksisterendeId) {
    const eksisterende = FormApp.openById(eksisterendeId);
    Logger.log('Skjemaet finnes allerede. Lenke: ' + eksisterende.getPublishedUrl());
    Logger.log('Redigering: ' + eksisterende.getEditUrl());
    return;
  }

  const form = FormApp.create('NOP Oslo Julematch 2026 – RO-påmelding');
  form.setDescription(
    'Påmelding som Range Officer (RO) til NOP Oslo Julematch 2026.\n' +
    'Påmeldingsfrist: 12. november 2026.\n\n' +
    'Opplysningene brukes til å planlegge RO-bemanningen for arrangementet.'
  );
  form.setConfirmationMessage(
    'Takk for at du har meldt deg som RO til NOP Oslo Julematch 2026!'
  );
  form.setAcceptingResponses(true);
  form.setAllowResponseEdits(false);
  form.setShowLinkToRespondAgain(false);

  form.addTextItem().setTitle('Fornavn').setRequired(true);
  form.addTextItem().setTitle('Etternavn').setRequired(true);
  form.addListItem().setTitle('RO-status').setChoiceValues([
    'Godkjent RO', 'RO under utdanning', 'Annet'
  ]).setRequired(true);
  const epostvalidering = FormApp.createTextValidation()
    .requireTextIsEmail()
    .setHelpText('Skriv inn en gyldig SSI-e-postadresse.')
    .build();
  form.addTextItem().setTitle('SSI-e-post')
    .setHelpText('Bruk e-postadressen du benytter i ShootNScoreIt.')
    .setValidation(epostvalidering)
    .setRequired(true);

  const svarark = SpreadsheetApp.create('NOP Oslo Julematch 2026 – RO-svar');
  form.setDestination(FormApp.DestinationType.SPREADSHEET, svarark.getId());
  props.setProperty('RO_FORM_ID', form.getId());

  // Kl. 00:05 den 13. november norsk tid. Apps Script-tidsstyring er omtrentlig.
  const avslutt = new Date('2026-11-13T00:05:00+01:00');
  if (Date.now() < avslutt.getTime()) {
    ScriptApp.newTrigger('stengROPaamelding').timeBased().at(avslutt).create();
  } else {
    stengROPaamelding();
  }

  Logger.log('OFFENTLIG SKJEMALENKE: ' + form.getPublishedUrl());
  Logger.log('REDIGERING: ' + form.getEditUrl());
  Logger.log('SVARARK: ' + svarark.getUrl());
}

function stengROPaamelding() {
  const formId = PropertiesService.getScriptProperties().getProperty('RO_FORM_ID');
  if (!formId) throw new Error('RO-skjema mangler. Kjør opprettROSkjema først.');
  const form = FormApp.openById(formId);
  form.setAcceptingResponses(false);
  form.setCustomClosedFormMessage(
    'Fristen for RO-påmelding til NOP Oslo Julematch 2026 gikk ut 12. november.'
  );
  Logger.log('RO-påmeldingen er nå stengt.');
}
