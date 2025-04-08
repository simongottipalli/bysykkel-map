# Bysykkel Map

## Prerequisites
* [Backend project](https://github.com/simongottipalli/bysykkel-backend) should be running on port 8085
* Uses [Google Maps API](https://developers.google.com/maps/documentation/javascript/get-api-key) for map rendering
* npm and node
* To run `make` commands - `brew install make`

## Setup
 
* `npm install`
* Setup your `.env` file with the following variables:
  * `VITE_GOOGLE_MAPS_API_KEY`
* Run: `make run` - `http://localhost:3000`
* Run dev mode: `npm run dev` - `http://localhost:5173`
