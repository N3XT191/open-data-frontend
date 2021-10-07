# Developer documentation

## Whole system overview

AskOpenData has a React frontend and a Python backend. There is a finite set of questions which the user can view. Given a question ID, the backend provides preprocessed data for the corresponding plot. The frontend lays out and draws the final plot to match the user's screen size. Question search is typically handled by the backend (see below).

## Frontend

### Setup

The frontend is a very typical React app made with
[create-react-app](https://reactjs.org/docs/create-a-new-react-app.html). To get a local development environment:

- Install [Node.js](https://nodejs.org/en/) (v14 LTS) and [Yarn](https://classic.yarnpkg.com/en/docs/install) (classic)
- Run `yarn` at the repository root (the folder with `yarn.lock`) to install dependencies from NPM
- Run `yarn start` to start a local development server for the frontend

Note that you will also need to start the backend for the app to work (see below).

### Code formatter

All files must be formatted with [Prettier](https://prettier.io/), otherwise they will be rejected by CI. The easiest way to do that is on save using an editor plugin. You can also run `yarn format` to format all files.

### Custom API URL

The development build assumes that the backend is at `http://127.0.0.1:8000`. When building for production you will need to adjust that URL. This can be done using an environment variable: `env REACT_APP_API_URL=https://ask-open-data.ch/api yarn build`.
