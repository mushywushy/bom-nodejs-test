# bom-nodejs-test

BOM REST connection test

## Running Locally

Install stuff
```sh
$ cd bom-nodejs-test
$ npm install
$ npm start
```

Run
```sh
nodemon index.js
```

Run with an environment
```sh
NODE_ENV=production nodemon index.js
```
Your app should now be running on [localhost:5000](http://localhost:5000/).

## Testing Locally

```sh
NODE_ENV=development npm test
```

## Deploying to Heroku

```sh
$ heroku create
$ git push heroku master
$ heroku open
```
or

[![Deploy to Heroku](https://www.herokucdn.com/deploy/button.png)](https://heroku.com/deploy)

## Docker

```sh
$ docker-compose up
```

