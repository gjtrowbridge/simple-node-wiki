# simple-node-wiki

Like the title implies, the goal here is to build a very simple wiki.  Node/SQL back-end, React front-end.

Other goals:

* Easy to download and deploy (eg. uses SQLite, will make it as easy as possible to deploy to Heroku)
* Easy-to-use API for users that want to auto-generate Wiki content
* VERY simple front-end that allows users to quickly consume content
* Eventually, authentication that allows users to limit entry to the wiki to only certain users (eg. a specific email domain)

***

This is still VERY much a work in progress, but here's the process for setting this up locally at the moment:

* `git clone`
* `npm install` (will run postinstall, which compiles the stylus and front-end javascript)
* `sequelize db:migrate`

And that's it.  Currently, you can create pages at the root page `/`, but then have to navigate manually to the page you created in order to view/edit.


