# Restaurant Search

This app lets you search restaurants. Search is powered by Algolia.

## Getting started

Try it online: [https://mauricesvay.github.io/restaurant-search/](https://mauricesvay.github.io/restaurant-search/)

To run the app locally:

- Clone the repository.
- Install dependencies: `npm install`.
- Start the app: `npm start`
- The app is now available at [http://localhost:3000/](http://localhost:3000/)

## Technical details

- The app was bootstrapped with `create-react-app`
- State is managed with `setState`. It wasn't complex enough to require something like `redux`.
- Styles are vanilla CSS, following a BEM-ish convention

## Things that could be improved

- update URL querystring with search params and keep search across page refreshes.
- support more search features (more facets, sorting, etc.).
- handle error and edge cases better.
- better responsive UI.
- display restaurants on a map.
- and so much more…
