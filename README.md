# Simple Node Wiki / Note-taker / Journal


## Intro

**The goal of this project was to create a very simple wiki/note-taker/journal.**

* Users can create content using [Markdown](https://guides.github.com/features/mastering-markdown/#what), and view / edit / search that content in real time.
* Users can also create / view / edit / search content via an API (see the "API Overview" section below).


### Other goals
* Easy to download and deploy (see "create own deployment" section below)
* Easy-to-use API for users that want to create or access content programmatically.
* Very simple front-end that allows users to easily create, edit, or view content.
* Authentication that allows users to have exclusive access to their own content.

### Tech Stack
**Back-End:** Node, Express, SQL

**Front-End:** React (with ReactRouter), Flux, Webpack

## Demo
To see the application in action, check out: https://simple-node-wiki-demo.herokuapp.com, or check out the short videos below:

### Sign in and create new page
![Log in and create new page video](https://user-images.githubusercontent.com/931171/59230992-15486f00-8b94-11e9-82cf-09026ff617cd.gif)

### Search for a page

![Search for a page](https://user-images.githubusercontent.com/931171/59232946-5abc6a80-8b9b-11e9-8f3e-f86c77d900b7.gif)

### More markdown examples

#### Add code highlighting

![Add code highlighting](https://user-images.githubusercontent.com/931171/59232950-5bed9780-8b9b-11e9-8f11-dcd9bde176b2.gif)

#### Create a table

![Create a table](https://user-images.githubusercontent.com/931171/59232942-57c17a00-8b9b-11e9-9194-7725d720921b.gif)

#### Link an image

![Link an image](https://user-images.githubusercontent.com/931171/59232940-52fcc600-8b9b-11e9-9a26-25484f6dd4e4.gif)

## To Install And Use Locally

* Make sure you have `node` and `npm` installed
* Make sure your `node` version is the same as the one specified in `package.json` (currently, `8.9.3`)
    * ([nvm](https://github.com/creationix/nvm) is a great way to manage multiple node versions)
* `git clone`
  * If you have SSH set up: `git clone git@github.com:gjtrowbridge/simple-node-wiki.git`
  * Otherwise: `https://github.com/gjtrowbridge/simple-node-wiki.git`
* `cd simple-node-wiki`
* Set up Postgres database:

	1. Install [postgres](https://www.postgresql.org/download/).
	2. Look at the database config file (`./server/database/config/config.json`), update the "username" to match your postgres user.
	3. Set up a database called `simple_node_wiki_dev`.
	4. Set up a database called `simple_node_wiki_test` (if you plan to run tests).
	5. (No need to set up the production database if you are using this locally only.)
* `npm install` (make sure the `postinstall` script ran correctly -- it will fail if postgres is not set up correctly).
* `npm run start`
* That's it!  After starting the server, use the application by navigating to http://localhost:8090
* To run in webpack-dev-server mode, try `npm run webpack-dev-server`, then navigate to http://localhost:9000

## To Create Your Own Online Instance With Heroku

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
        	* **One difference from the blog post linked above:** For the "Authorized redirect URIs" section, use the suffix `/_auth/google/callback` instead of `/auth/google/callback` (this app has the auth routes listed under "/_auth/..." instead of "/auth/..."
          	* eg. `https://my-apps-url-on-heroku.herokuapp.com/_auth/google/callback` instead of `https://my-apps-url-on-heroku.herokuapp.com/auth/google/callback `
          * If you have issues with this part, open an issue on Github and I'll take a look!
        * `heroku config:set GOOGLE_OAUTH_CLIENT_ID=your_google_client_id`
        * `heroku config:set GOOGLE_OAUTH_CLIENT_SECRET=your_google_client_secret`
        * `heroku config:set IS_PRODUCTION=true`
* Add the [Heroku Postgres](https://elements.heroku.com/addons/heroku-postgresql) add-on to your application.
    * This will add the `DATABASE_URL` env variable automatically to your app.
    * If you navigate to your app on heroku.com, you can see an add-ons section and add the Postgres add-on.
* `git push heroku master`
* `heroku open`

## Existing Features

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

## API Overview

All API endpoints require passing a JSON Web Token (JWT) as a header.
eg. In JavaScript, you can create a new page with the following:
```javascript
// Install "node-fetch" package with `npm install node-fetch`
const fetch = require('node-fetch');
fetch('https://simple-node-wiki.herokuapp.com/_api/pages', {
  method: 'POST',
  headers: {
    jwt: 'your-temporary-unique-user-token',
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    name: 'new-page-url',
    title: 'My New Page (created via API!)',
    text: '#My New Page\n\nThis is my new page!', 
  })
}).then(...)
```

To get your current user token (and see an example of how to make API calls):
	* Login to the app normally in a browser.
  * Click the "User Info" button in the top navigation bar.

#### Endpoints
Most of the relevant API endpoints are defined in [createPageRouter.js](https://github.com/gjtrowbridge/simple-node-wiki/blob/master/server/api/createPageRouter.js). Here is a brief overview:

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
* `GET /pages/search/:keyword?limit=10&offset=0`
	* Returns a list of pages that contain the given keyword (case-insensitive)
* `POST /pages`
  * Creates a new page
  * Example body:
  ```
  {
  	"name": "some-url",
    "title": "Some Page Title",
    "text": "# markdown text"
  }
  ```
* `PUT /pages/:id`
  * Updates an existing page
* `DELETE /pages/:id`
	* Deletes an existing page
  
[Example Script That Uses the API](https://github.com/gjtrowbridge/simple-node-wiki/tree/master/example_scripts/daily_journal_template)
