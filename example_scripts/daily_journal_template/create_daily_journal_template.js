const fetch = require('node-fetch');
const getDailyJournalTemplate = require('./daily_journal_template');

const wikiURL = 'https://simple-node-wiki.herokuapp.com';
const jwtForYourUser = process.env.JWT_FOR_YOUR_USER;
let currentDate = new Date('2018-08-30');
const numDays = 100;

const addDaysToDate = function(date, days=1) {
  date = new Date(date);
  return new Date(date.setDate(date.getDate() + days));
};

Date.prototype.getFormattedString = function() {
  const day = this.getDate();
  const month = this.getMonth() + 1;
  const year = this.getFullYear();
  return `${month}-${day}-${year}`;
};

for (i=0; i<numDays; i++) {
  const yesterdayString = addDaysToDate(currentDate, -1).getFormattedString();
  const todayString = currentDate.getFormattedString();
  const tomorrowString = addDaysToDate(currentDate, 1).getFormattedString();

  const { markdown, pageName } = getDailyJournalTemplate('daily-journal', yesterdayString, todayString, tomorrowString);

  fetch(`${wikiURL}/_api/pages`, {
    method: 'POST',
    body: JSON.stringify({
      name: pageName,
      title: `Daily Journal Entry: ${todayString}`,
      text: markdown,
    }),
    headers: {
      jwt: jwtForYourUser,
      'Content-Type': 'application/json',
    },
  }).then((response) => {
    return response.text();
  }).then((json) => {
    console.log('saved page', json);
  }).catch((err) => {
    console.log('failed to save page', err);
  });

  currentDate = addDaysToDate(currentDate, 1);
}

