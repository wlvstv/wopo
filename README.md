# Wopo
A chatbot for the wolvesatmydoor Twitch.tv channel. 

## Getting Started
These instructions will get a copy of the project up and running on your local machine for development and testing purposes. 

### Prerequisites
node.js (https://nodejs.org)
nodemon.io (http://nodemon.io/)

### Installing
The following steps describe how to run the project
Clone repository
```
$ git clone https://github.com/wlvstv/wopo.git
```

Navigate to project folder and install packages
```
<C:\...\wopo> npm install
```

open lib\devConfig.js and insert test credentials
```
const un = ''; // Your twitch username
const pw = ''; // Your oAuth Token
```

start the twitch bot
```
<C:\...\wopo> npm start
```

Note, a succesful connection will log the address and port of the connection in the console. 
Navigate to the testing channel and test away!  Make GLaDOS proud! 

### Web Interface
A simple web interface is being developed to allow editing of commands. First, install nodemon on your machine.
```
<C:\...\wopo> npm install -g nodemon
```

To start the web server run the following command
```
<C:\...\wopo> nodemon server.js
```

Note, running this command will start a server on your local machine on port 3000.  In a web browser, navigate to localhost:3000/commands to see the page during development. 

## Running the Tests
(someone who knows about testing will fill this in soon...)


## Built With
* [node.js](https://nodejs.org/en/) - Asynchronous Javascript Runtime
* [express](https://expressjs.com/) - Minimalist web framework
* [nodemon.io](nodemon.io) - A utility to monitor for changes in the source and restart server automatically
* [tmi.js](https://docs.tmijs.org/) - Twitch Messaging Interface package for node.js
* [pg-promise](https://www.npmjs.com/package/pg-promise) - Used to generate database helper methods

