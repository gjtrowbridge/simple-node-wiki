# Simple Node Wiki / Note-taker / Journal

Like the title implies, the goal here was to build a very simple wiki/note-taker/journal.

Other goals:

* Easy to download and deploy (eg. uses SQLite, easy to deploy to Heroku)
* Easy-to-use API for users that want to create or access content programmatically.
* VERY simple front-end that allows users to easily create, edit, or view content
* Authentication that allows users to limit entry to the wiki to only certain users.

Node/Express/SQL back-end, React/Flux front-end.
***
To see the application in action, check out: https://simple-node-wiki-example.herokuapp.com/
***

### To Install And Use Locally

* Make sure you have `node` and `npm` installed
* Make sure your `node` version is the same as the one specified in `package.json` (currently, `6.9.2`)
    * ([nvm](https://github.com/creationix/nvm) is a great way to manage multiple node versions)
* `git clone`
  * If you have SSH set up: `git clone git@github.com:gjtrowbridge/simple-node-wiki.git`
  * Otherwise: `https://github.com/gjtrowbridge/simple-node-wiki.git`
* `cd simple-node-wiki`
* `npm install`
* `npm run start`
* That's it!  After starting the server, use the application by navigating to http://localhost:8090

### To Install And Use on Heroku

##### (NOTE: Since the app currently uses SQLite exclusively, deploying to Heroku will work, but Heroku clears the filesystem at least once every 24 hours, so it is NOT YET recommended to use Heroku with this application if you want persistent data...which you probably do).  This will be updated soon, so stay tuned (and do feel free to check out the demo site at the link above).

* Make sure you have a Heroku account and the Heroku toolbelt CLI installed.
* `git clone`
  * If you have SSH set up: `git clone git@github.com:gjtrowbridge/simple-node-wiki.git`
  * Otherwise: `https://github.com/gjtrowbridge/simple-node-wiki.git`
* `cd simple-node-wiki`
* `heroku create`
* Set env variables:
    * `heroku config:set NPM_CONFIG_PRODUCTION=false`
    * `heroku config:set SECRET_KEY_JWT=any_key_you_want_here`
    * `heroku config:set WIKI_APP_URL=https://your-app.herokuapp.com`
    * If planning to use user authentication (ie. users must sign in, and can only see their own content)
        * Follow step 3 [here](http://gregtrowbridge.com/node-authentication-with-google-oauth-part1-sessions/) to get your Google client ID and client secret.
            * If you have issues with this part, open an issue on Github and I'll take a look!
        * `heroku config:set GOOGLE_OAUTH_CLIENT_ID=your_google_client_id`
        * `heroku config:set GOOGLE_OAUTH_CLIENT_SECRET=your_google_client_secret`
        * `heroku config:set IS_PRODUCTION=true`
* Add the [Heroku Postgres](https://elements.heroku.com/addons/heroku-postgresql) add-on to your application.
    * This will add the `DATABASE_URL` env variable automatically to your app.
    * If you navigate to your app on heroku.com, you can see an add-ons section and add the Postgres add-on.
* `git push heroku master`
* `heroku open`

### Existing Features

* Markdown editor for creating and viewing content.
  * Easy to edit page url, title, or text.
  * Toggle between full-screen view mode and split-screen edit mode.
  * All content auto-saves as you type.
* Full-text keyword search
* Easy-to-use API for programmatic updates
* Local database
  * Easy to deploy
  * All saved data exists only in the `server/database` folder of the application
* Support for other databases in prod.
* Support for user login and user-specific wiki pages.

### Potential Upcoming Features

* More test coverage
* Contribution guide for those interested in helping make this better.

### API Overview

Most of the relevant API endpoints are defined in [createPageRouter.js](https://github.com/gjtrowbridge/simple-node-wiki/blob/master/server/api/createPageRouter.js), but here's a basic overview of the data and available endpoints:
With recent changes, all API endpoints will require passing a JSON Web Token (JWT) as a header.
To do this:
    * Login to the app normally in a browser.
    * Open the browser's developer console, and run `localStorage.getItem('jwt')`.  This is your JWT.
    * When sending manual requests to the API, include the JWT string as a header with the name `jwt`.

#### Data

* The database contains `Page` objects, which have the following core properties:
  * Page.id
  * Page.name
  * Page.title
  * Page.text

#### Endpoints
* `GET /pages?limit=10&offset=0&listType=ORDER_BY_CREATED`
  * Options for `listType`:
    * `ORDER_BY_CREATED`
    * `ORDER_BY_MODIFIED`
* `GET /pages/search/:keyword?limit=10&offset=0`
  * HTTP query string parameters are optional.
* `GET /pages/:id`
  * Returns a page with the given ID
* `GET /pages/:name`
  * Returns a page with the given name
* `POST /pages`
  * Creates a new page
* `PUT /pages/:id`
  * Updates an existing page
