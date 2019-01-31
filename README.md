# Photobucket Type Web Application

author: Ryan Ardray

[Veiw Deployed Application](https://glacial-atoll-25653.herokuapp.com/login)

## Photobucket style Web App using Create React App, Express and MongoDb

### The goals of this application are to:

- Implement and customize Express backend boiler plate I had created in another exercise.
- Implement Login and Registration security using JSON web token, bcrypt and cookies.
- Get familiar with file serving using Node native commands.
- Use referencing in MongoDb.
- Compress image files before commiting to file server.
- Setup a primative Followers/Following interface for photo albums.
- Build a Photo Carousel with JQuery and es6 native DOM functions.
- Refactoring/building reusable React Components.

### Future imprpovements

- Implement testing and deploy production grade side to heroku.
- Fully flesh out entire website including comprehensive dash, photo commenting, etc.
- Refractor and potentially utilize Latest React Suspense feature.


I started this project initially as just wanting to create an image carousel, but I really wanted to take and apply what I had learned about creating JWT and cookies and customize it as well as implement file serving using only node and express file serve.  As always, practice in refactoring and UI interaction are always top priorities.

### Steps to view this app:

must have Node and Mongo DB installed.

download code. 
```
$ cd <project root directory>
//Install dependencies
$ npm install
```
Then start mongo server.
```
$ cd server 
$ mkdir db
$ mongod --dbpath db
```
Install nodemon
```
$ npm install nodemon
```
Start express server
```
$ nodemon index.js
```
Start react app
```
$ cd ..
$ yarn start
//or
$ npm start
```
