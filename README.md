# What is GraphLooker? 🧠

Currently, there is no generic subgraph frontend Dapp to explore, browse and filter on subgraphs data. Our mission is empower Graph different actors like indexers, delegators, curators, users to easily understand subgraph data. The tool helps indexers, delegators, curators and TheGraph users easily browse subgraph data, download data to CSV and perform simple to complex operations like sorting, filtering with simplest of UX.

# Target Audience 👑 🏫

- The Dapp is specially helpful for non tech users who can do simple to complex operations on network subgraphs just from UI.
- Users can download subgraph data in CSV.
- Delegators/Curators/Subgraph developers who are relatively less technical can browse and explore subgraph data from the UI.

# Features ❤️ ⚡

- Browse and explore subgraph entity data in tabular form in UI.
- Export the subgraph data to CSV.
- Sort any particular column in ascending/descending order
- Apply filters on entity attribute data e g. Display latest 100 Uniswap records
- Pagination feature that enables user to focus on the particular range of datasets
- Share sorted, filtered data views using public url
- Applying filter based on the type of the data of that particular column. Different type of filters are supported based on data type of attribute.
- Switch theme feature that enables users to select their own theme either dark or light according to their convenience.

Checkout https://graphlooker.com/ and let us know your views and valuable feedbacks.

## How to fork subgraph-explorer

Step1:-

Open git bash or terminal

```
$ git clone https://github.com/dapplooker/subgraph-explorer.git
```

Step2:-

Now move into the project

```
$ cd subgraph-explorer
```

Step3:-

Install the dependencies

```
$ npm install
```

### Comman to run application in local

```
$ npm start
```

Application will be hosted on http://localhost:3000/

### Command TO create Production build

```
$ npm run build
```

## SETTING UP OF THE ENVIORNMENT

Create .env file in the subgraph-explorer folder that includes:

```
REACT_APP_BASE_URL_DEVELOPMENT = 'http://localhost:3000/explore?'

REACT_APP_BASE_URL_PRODUCTION = 'https://cosmodapp.com/explore?'
(`you can change the domain according to your need`)

REACT_APP_ADDRESS_URL = 'https://etherscan.io/address'

REACT_APP_TNX_URL = 'https://etherscan.io/tx/'
```
