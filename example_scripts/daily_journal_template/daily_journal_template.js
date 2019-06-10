
const getDailyJournalTemplate = function(
  urlPrefix,
  yesterdayString,
  todayString,
  tomorrowString
) {
  const pageName = `${urlPrefix}-${todayString}`;
  const markdown = `
[Yesterday (${yesterdayString})](/pages/${urlPrefix}-${yesterdayString})
[Tomorrow (${tomorrowString})](/pages/${urlPrefix}-${tomorrowString})

# Morning Journal: ${todayString}

## At the end of today, I will be STOKED about how the day turned out if...
* eg. I go for a 2-mile run.
* eg. I sign up for that class I've been wanting to take.

## Other thoughts
eg. Is it weird that moose x 1 = moose, moose x 5 = moose, but goose x 1 = goose, goose x 5 = geese?

[Journaling is good for you, according to this article](https://medium.com/the-mission/why-keeping-a-daily-journal-could-change-your-life-b9421a69912a)
`;
  return {
    markdown: markdown,
    pageName: pageName,
  }
};

module.exports = getDailyJournalTemplate;
