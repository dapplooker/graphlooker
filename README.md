# CosmoDapp
## LIVE APPLICATION
Check out our live application : [here](https://cosmodapp.com/).
## STEPS FOR INSTALLATION
How to fork subgraph-explorer
```
Step1:-
Open git bash or terminal 
$ git clone https://github.com/dapplooker/subgraph-explorer.git
Step2:-
Now move into the project
$ cd subgraph-explorer
Step3:-
Install the dependencies
$ npm install
```
## COMMAND TO RUN THE APPLICATION
```
$ npm start
```
## COMMAND TO RUN THE PRODUCTION URL
```
$ npm run production
```
## SETTING UP OF THE ENVIORNMENT
```
 Create .env file in the subgraph-explorer folder that includes:
     REACT_APP_BASE_URL_DEVELOPMENT = 'http://localhost:3000/explore?'
     (`you can change the domain according to your need`)
     REACT_APP_BASE_URL_PRODUCTION = 'https://cosmodapp.com/explore?'
     REACT_APP_ADDRESS_URL = 'https://etherscan.io/address'
     REACT_APP_TNX_URL = 'https://etherscan.io/tx/'
```
