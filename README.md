# snapdragon-redux
Species recognition and recall

https://danhartley.github.io/snapdragon-redux/dist/index.html

## Firefox support

Requires changing a config setting:  dom.moduleScripts.enabled setting in about:config


### instructions

https://webpack.js.org/guides/getting-started/

### help

[build the app]: npm run dev or npm run watch

[build and run the app]: npm run start:dev

[run the tests]: npm run watch

https://facebook.github.io/jest/docs/en/webpack.html Using with webpack 2

NB: require babel-plugin-transform-object-rest-spread for the spread operator

### parcel

To support parcel required to: install babel-plugin-module-resolver and add:
["module-resolver", {
      "root": ["./src"]
}]
to .babelrc

*Build warning: devtools for chrome must be commented out for other browers!*