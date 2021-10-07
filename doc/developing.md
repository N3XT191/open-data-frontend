# Developer documentation

## Whole system overview

AskOpenData has a React frontend and a Python backend. There is a finite set of questions which the user can view. Given a question ID, the backend provides preprocessed data for the corresponding plot. The frontend lays out and draws the final plot to match the user's screen size. Question search is typically handled by the backend (see below).

## Frontend

### Overview

The frontend is a React application written in TypeScript. It uses [Victory](https://formidable.com/open-source/victory/) for plots, [d3](https://d3js.org/) for maps of Zürich, and [emotion](https://emotion.sh/docs/introduction) for styling.

### Setup

The frontend is a very typical React app made with
[create-react-app](https://reactjs.org/docs/create-a-new-react-app.html). To get a local development environment:

- Install [Node.js](https://nodejs.org/en/) (v14 LTS) and [Yarn](https://classic.yarnpkg.com/en/docs/install) (classic)
- Clone [this repo](https://github.com/N3XT191/open-data-frontend)
- Run `yarn` at the repository root (the folder with `yarn.lock`) to install dependencies from NPM
- Run `yarn start` to start a local development server for the frontend

Note that you will also need to start the backend for the app to work (see below).

The next time you want to use the development environment, it's enough to run `yarn start`.

### Code formatter

All files must be formatted with [Prettier](https://prettier.io/), otherwise they will be rejected by CI. The easiest way to do that is on save using an editor plugin. You can also run `yarn format` to format all files.

### Custom API URL

The development build assumes that the backend is at `http://127.0.0.1:8000`. When building for production you will need to adjust that URL. This can be done using an environment variable: `env REACT_APP_API_URL=https://ask-open-data.ch/api yarn build`.

## Backend

### Overview

The backend is a Python application which uses [FastAPI](https://fastapi.tiangolo.com/) and [pandas](https://pandas.pydata.org/) to serve preprocessed datasets. Preprocessing is done to keep startup and response times fast.

### Setup

First set up Python and install dependencies. The steps here are for `pip` and a virtual environment, but you don't necessarily have to use those.

- Install [Python](https://www.python.org/) (v3.9) and pip
- Clone the [backend repo](https://github.com/tehwalris/open-data-backend)
- Create a virtual environment: `python3 -m venv .venv`
- Activate the virtual environment: `source .venv/bin/activate`
- Install dependencies: `pip install -r requirements.txt`

Before you start the server, you need to download and preprocess the datasets.

- Download raw datasets: `./download-data.sh`
- Preprocess datasets: `python -m src.preprocess`

The development server will run on port 8000 by default, which is what the frontend expects.

- Start a development server: `uvicorn main:app --reload`

The next time you want to use the development environment, it's enough to run `source .venv/bin/activate` and `uvicorn main:app --reload`.
