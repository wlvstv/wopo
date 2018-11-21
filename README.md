# Wopo

A chatbot for the wolvesatmydoor Twitch.tv channel. 

## Getting Started

These instructions will get a copy of the project up and running on your local machine for development and testing purposes. 

### Prerequisites

node.js (https://nodejs.org)

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

you will want to use an alternate Twitch account

if you don't have one you should create a new one

```
const un = ''; // Your twitch username
const pw = ''; // Your oAuth Token
```

to get your oAuth Token

http://www.twitchapps.com/tmi/

start the application

```
<C:\...\wopo> npm start
```

Note, a succesful connection will log the address and port of the connection in the console. 
Navigate to the testing channel and test away!  Make GLaDOS proud! 

## Running the Tests

(someone who knows about testing will fill this in soon...)


## Built With

* [node.js](https://nodejs.org/en/) - Asynchronous Javascript Runtime
* [tmi.js](https://docs.tmijs.org/) - Twitch Messaging Interface package for node.js
* [pg-promise](https://www.npmjs.com/package/pg-promise) - Used to generate database helper methods

