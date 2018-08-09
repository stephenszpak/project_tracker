## Project Tracker application

**Instructions**
`clone repo`

`cd client`

`npm install`

go back to root directory (`cd ..`)

`cd server`

`npm install`

**Running Project**
From root directory:

`cd client` then run `ng serve`

Open another terminal then `cd server` then run `npm start`



I would suggest installing nodemon to run the node js server

`npm install --save-dev nodemon` in the server directory

Then add the below script in the package.json file then

`"scripts": {
  "start": "node .bin/www",
  "dev": "nodemon ./bin/www"
}`

To run the server you would run `npm run dev` in the terminal
