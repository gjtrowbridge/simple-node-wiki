
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

# Daily Journal: ${todayString}

## Random Journaling

Walruses are the coolest sea creature by far...blah blah blah...

## Summary

### Favorite Part of the Day

My favorite part of the day was...

### One thing I'm thankful for

I'm thankful for...hot showers.

### Progress Towards Goals (either [yesterday's](/pages/${urlPrefix}-${yesterdayString}) or [overall goals](/pages/goals))
* Spent 1 hour learning all the words to a Sean Paul song.
* ...

### Goals for [Tomorrow](/pages/${urlPrefix}-${tomorrowString})
* Do a beach run

[Journaling is good for you, according to this article](https://medium.com/the-mission/why-keeping-a-daily-journal-could-change-your-life-b9421a69912a)
`;
  return {
    markdown: markdown,
    pageName: pageName,
  }
};

module.exports = getDailyJournalTemplate;
