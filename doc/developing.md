# Developer documentation

## Whole system overview

AskOpenData has a React frontend and a Python backend. There is a finite set of questions which the user can view. Given a question ID, the backend provides preprocessed data for the corresponding plot. The frontend lays out and draws the final plot to match the user's screen size. Question search is typically handled by the backend (see below).

## [Frontend](https://github.com/N3XT191/open-data-frontend)

### Overview

The frontend is a React application written in TypeScript. It uses [Victory](https://formidable.com/open-source/victory/) for plots, [d3](https://d3js.org/) for maps of Zürich, and [emotion](https://emotion.sh/docs/introduction) for styling.The source code is in [N3XT191/open-data-frontend](https://github.com/N3XT191/open-data-frontend) (this repository).

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

## [Backend](https://github.com/tehwalris/open-data-backend)

### Overview

The backend is a Python application which uses [FastAPI](https://fastapi.tiangolo.com/) and [pandas](https://pandas.pydata.org/) to serve preprocessed datasets. Preprocessing is done to keep startup and response times fast. The source code is in [tehwalris/open-data-backend](https://github.com/tehwalris/open-data-backend).

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

## Production deployment

### Dynamic

This is the most typical way to deploy, but it's not what we actually do for [ask-open-data.ch](https://ask-open-data.ch). For this kind of deployment you would serve the backend with `uvicorn` behind a frontend proxy like `nginx`. The frontend would be built with `yarn build` and served with the same `nginx`. The disadvantage of this setup is that you need to run the Python server, which requires something like a VM to host it on.

### [Static](https://github.com/tehwalris/open-data-static)

This is the deployment strategy that we use for [ask-open-data.ch](https://ask-open-data.ch). It is automated end-to-end in [tehwalris/open-data-static](https://github.com/tehwalris/open-data-static). Since we have a finite number of questions, we can pre-request every URL from the API and save the responses. This is done by [src/static.py](https://github.com/tehwalris/open-data-backend/blob/master/src/static.py) in the backend. The result of that script is a folder which can be served using a static HTTP server, but to the frontend looks the same as the dynamic Python API server.

The final build and deployment is fully automated in GitHub Actions. The runs of this CI system are publicly visible ([example](https://github.com/tehwalris/open-data-static/runs/3737460013)). All the code is reproducibly built directly from source. The full datasets are downloaded directly from `https://data.stadt-zuerich.ch` and all preprocessing is run from scratch according to the latest code. The API responses are statically saved as described above. This whole bundle is then pushed to [Vercel](https://vercel.com) (a deployment platform and CDN for mainly static content) where it can be accessed through [https://ask-open-data.ch](https://ask-open-data.ch).
