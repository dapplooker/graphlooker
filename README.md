# What is GraphLooker? ⚡

GraphLooker is real-time subgraph explorer and visualizer. The Dapp helps indexers, delegators, curators and TheGraph users to easily browse subgraph data, download data to CSV and perform simple to complex operations like sorting, filtering with simplest of UX. Using the Dapp you can `look deeper` into your subgraphs.

# Target Audience 👑

- The Dapp is specially helpful for non tech users who can do simple to complex operations on subgraphs just from UI.
- Users can filter and download subgraph data in CSV.
- Delegators/Curators/Subgraph developers who are relatively less technical can browse and filter subgraph data from the UI.

# Features ❤️

- Browse and explore subgraph entity data in tabular form in UI.
- Export the subgraph data to CSV.
- Support of subgraph studio.
- Sort any particular column in ascending/descending order.
- Apply filters on entity attribute data e g. Display latest 100 Uniswap records.
- Pagination feature that enables user to focus on the particular range of datasets.
- You can share sorted, filtered subgraph data views using public url.
- Applying filter based on the type of the data of that particular column. Different type of filters are supported based on data type of entity attribute.
- Switch theme feature that enables users to select their own theme either dark or light according to their convenience.

The Dapp is live at https://graphlooker.com/

## Steps to Run GraphLooker
Follow below steps to run GraphLooker:

### Open git bash or terminal

```sh
$ git clone git@github.com:dapplooker/graphlooker.git
```

### Switch your path to graphlooker project

```sh
$ cd graphlooker
```

### Install the dependencies

```sh
$ npm install
```

### Start server
There should not be any other process running on port 3000.
```sh
$ npm start
```

Application will be running on http://localhost:3000/

### Create Production build
In case you are looking to host on production, create production build using below command.
```sh
$ npm run build
```

### Hosting on Production

Open `.env` file in the graphlooker folder. Update below variables with production host.

```
REACT_APP_BASE_URL_PRODUCTION = 'https://graphlooker.com'
```

### How to Use 

Below is the documentation for reference purpose.
```
Hosted Subgraphs :
```
Step by step guide:-https://www.notion.so/dapplooker/What-do-we-do-73aa1d887b54430e9e69a590f4668638

```
Subgraph Studio :
```
Step by step guide :- https://www.notion.so/dapplooker/GraphLooker-Documentation-07bc3adf176b488ca23059ddbd41387f


