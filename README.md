# Simple Node Wiki / Note-taker

Like the title implies, the goal here was to build a very simple wiki/note-taker/journal.

Other goals:

* Easy to download and deploy (eg. uses SQLite, easy to deploy to Heroku)
* Easy-to-use API for users that want to create or access content programmatically.
* VERY simple front-end that allows users to easily create, edit, or view content
* Eventually (very soon, actually), authentication that allows users to limit entry to the wiki to only certain users.

Node/Express/SQL back-end, React/Flux front-end.
***
To see the application in action, check out: https://simple-node-wiki-example.herokuapp.com/
***

### To Install And Use Locally

* Make sure you have `node` and `npm` installed
* `git clone`
>* If you have SSH set up: `git clone git@github.com:gjtrowbridge/simple-node-wiki.git`
>* Otherwise: `https://github.com/gjtrowbridge/simple-node-wiki.git`
* `cd simple-node-wiki`
* `npm install`
* `sequelize db:migrate`
* `npm run start`
* That's it!  After starting the server, use the application by navigating to http://localhost:8080

### To Install And Use on Heroku

* Make sure you have a Heroku account and the Heroku toolbelt CLI installed.
* `git clone`
>* If you have SSH set up: `git clone git@github.com:gjtrowbridge/simple-node-wiki.git`
>* Otherwise: `https://github.com/gjtrowbridge/simple-node-wiki.git`
* `cd simple-node-wiki`
* `heroku create`
* `heroku config:set NPM_CONFIG_PRODUCTION=false`
* `git push heroku master`
* `heroku open`

### Existing Features

* Markdown editor for creating and viewing content.
  >* Easy to edit page url, title, or text.
  >* Toggle between full-screen view mode and split-screen edit mode.
  >* All content auto-saves as you type.
* Full-text keyword search
* Easy-to-use API for programmatic updates
* Local database
  >* Easy to deploy
  >* All saved data exists only in the `server/database` folder of the application

### Potential Upcoming Features

* Authentication / Users
* Image uploads
* More test coverage
* Contribution guide for those interested in helping make this better.

### API Overview

Most of the relevant API endpoints are defined in [createPageRouter.js](https://github.com/gjtrowbridge/simple-node-wiki/blob/master/server/api/createPageRouter.js), but here's a basic overview of the data and available endpoints:

#### Data

* The database contains `Page` objects, which have the following core properties:
>* Page.id
>* Page.name
>* Page.title
>* Page.text

#### Endpoints
* `GET /pages?limit=10&offset=0&listType=ORDER_BY_CREATED`
>* Options for `listType`:
>>* `ORDER_BY_CREATED`
>>* `ORDER_BY_MODIFIED`
* `GET /pages/search/:keyword?limit=10&offset=0`
>* HTTP query string parameters are optional.
* `GET /pages/:id`
>* Returns a page with the given ID
* `GET /pages/:name`
>* Returns a page with the given name
* `POST /pages`
>* Creates a new page
* `PUT /pages/:id`
>* Updates an existing page
