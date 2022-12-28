# snapdragon-redux
Species recognition and recall

https://www.learn-the-planet.com/

## Browser support

Dependent on recent versions

## Service workers

Require a secure context. This includes localhost but not (out of the box) 0.0.0.0.

See https://stackoverflow.com/questions/52299246/cant-find-serviceworker-in-navigator-anymore

### instructions

[build the app]: npm run dev or npm run watch

NB building the app first is required for web service workers to run
NB credentials required from src/api/firebase
NB .env required

[build and run the app]: npm run start:dev

[run the tests]: npm run watch

## Issues

localhost not found: https://medium.com/thepolarlab/node-js-error-getaddrinfo-enotfound-localhost-b7ee35e1bb60
