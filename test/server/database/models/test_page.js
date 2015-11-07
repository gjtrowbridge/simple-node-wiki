var test = require('tape');
var db = require('../../../../server/database/models/index.js');



test('Page can save to database', function (t) {
  t.plan(1);
  // Clear database
  db.Page.sync({ force : true }).then(function() {
    return db.Page.create({
      titlesdf: 'All About Dogs',
      namefds: 'dogs-dogs-dogs',
      texts: 'Dogs are the best.'
    });
  }).done(
    function(page) {
      t.pass('Page saved successfully')
    },
    function(err) {
      t.fail('Saving your page failed, yo!')
    }
  )
});

