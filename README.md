# Movie API

## Get Started

1. The API being used requires an API key. You can get one from [here](http://www.omdbapi.com/apikey.aspx) (its free and pretty easy to get)

   Once you have that, you have two options:

   - Create a .env file and put it there. (refer to api/.env.example)
   - Hard code it where `process.env.API_KEY` is being used (api/src/server.js)

2. Install all packages.

   ### From the **root directory**:

yarn:

```javascript
  yarn install:yarn
```

npm:

```javascript
  npm run install:npm
```

3. This project uses MongoDB to store the movies you like or don't like. For this to function properly, spin up a locally running instance of MongoDB. Assuming you are using the default port for Mongo, the URI is already hard coded in, so the server should connect once that instance is running.

   If you are not, again, you have two options:

   - Create a .env file and put the Mongo URI there. (refer to api/.env.example)
   - Hard code it where `process.env.MONGO_URI` is being used (api/src/server.js)

4. Now that everything is set up and ready to go, you can start the dev server and test it out.

   ### From the **root directory**:

yarn:

```javascript
  yarn dev
```

npm:

```javascript
  npm run dev
```

---

## Here's a quick look

![alt-text](./assets/movie-api-home-page.png 'Home page')
![alt-text](./assets/movie-api-saved-movies.png 'Saved-movies page')
