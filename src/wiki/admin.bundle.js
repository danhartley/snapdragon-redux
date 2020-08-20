(window["webpackJsonplearn_the_planet"] = window["webpackJsonplearn_the_planet"] || []).push([["admin"],{

/***/ "ZZ3w":
/*!*******************************************!*\
  !*** ./src/admin/api/eol-autocomplete.js ***!
  \*******************************************/
/*! namespace exports */
/*! export eolAutocomplete [provided] [used] [could be renamed] */
/*! other exports [not provided] [unused] */
/*! runtime requirements: __webpack_require__, __webpack_require__.n, __webpack_exports__, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "eolAutocomplete": () => /* binding */ eolAutocomplete
/* harmony export */ });
/* harmony import */ var autocompleter__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! autocompleter */ "B89K");
/* harmony import */ var autocompleter__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(autocompleter__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var admin_api_eol__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! admin/api/eol */ "h1XK");

 // https://github.com/kraaden/autocomplete

var eolAutocomplete = function eolAutocomplete(input, type, className, feedbackCallback, onSelectCalback) {
  var MIN_LENGTH = 4;
  var autocompleteRef = autocompleter__WEBPACK_IMPORTED_MODULE_0___default()({
    input: input,
    fetch: function fetch(text, update) {
      switch (type) {
        case 'search':
          feedbackCallback();
          admin_api_eol__WEBPACK_IMPORTED_MODULE_1__.eol.getSpeciesByName(text).then(function (terms) {
            update(terms.results);
            feedbackCallback();
          });
          break;
      }
    },
    onSelect: function onSelect(item) {
      input.value = item.title;
      input.name = item.id;
      onSelectCalback();
    },
    className: className,
    minLength: MIN_LENGTH,
    debounceWaitMs: 200
  });
  return autocompleteRef;
};

/***/ }),

/***/ "h1XK":
/*!******************************!*\
  !*** ./src/admin/api/eol.js ***!
  \******************************/
/*! namespace exports */
/*! export eol [provided] [used] [could be renamed] */
/*! other exports [not provided] [unused] */
/*! runtime requirements: __webpack_require__, __webpack_exports__, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "eol": () => /* binding */ eol
/* harmony export */ });
/* harmony import */ var admin_api_eol_autocomplete__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! admin/api/eol-autocomplete */ "ZZ3w");
/* harmony import */ var admin_api_gbif__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! admin/api/gbif */ "QWBs");
/* harmony import */ var admin_helpers__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! admin/helpers */ "B2La");
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {
  try {
    var info = gen[key](arg);
    var value = info.value;
  } catch (error) {
    reject(error);
    return;
  }

  if (info.done) {
    resolve(value);
  } else {
    Promise.resolve(value).then(_next, _throw);
  }
}

function _asyncToGenerator(fn) {
  return function () {
    var self = this,
        args = arguments;
    return new Promise(function (resolve, reject) {
      var gen = fn.apply(self, args);

      function _next(value) {
        asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);
      }

      function _throw(err) {
        asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);
      }

      _next(undefined);
    });
  };
}




var CACHE_SECONDS = 3600;

var getSpeciesUrl = function getSpeciesUrl(species, selectedLicence) {
  var speciesUrl = "https://eol.org/api/pages/1.0/".concat(species.id, ".json?details=true&images_per_page=200&licenses=").concat(selectedLicence, "&common_names=true&cache_ttl=").concat(CACHE_SECONDS);
  var speciesCors = "https://cors-anywhere.herokuapp.com/".concat(speciesUrl);
  species.detailsUrl = speciesCors;
  return species;
};

var getSpeciesByName = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(query) {
    var search, corsSearch, result;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            search = "https://eol.org/api/search/1.0.json?q=".concat(query, "&cache_ttl=").concat(CACHE_SECONDS);
            corsSearch = "https://cors-anywhere.herokuapp.com/".concat(search);
            _context.next = 4;
            return fetch(corsSearch);

          case 4:
            result = _context.sent;
            _context.next = 7;
            return result.json();

          case 7:
            return _context.abrupt("return", _context.sent);

          case 8:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, this);
  }));

  return function getSpeciesByName(_x) {
    return _ref.apply(this, arguments);
  };
}();

var searchEOLByProvider = /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(hierarchyId, Id) {
    var url, result;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            url = "http://eol.org/api/search_by_provider/1.0.json?batch=false&id=".concat(Id, "&hierarchy_id=").concat(hierarchyId, "&cache_ttl=").concat(CACHE_SECONDS);
            _context2.next = 3;
            return fetch(url);

          case 3:
            result = _context2.sent;
            _context2.next = 6;
            return result.json();

          case 6:
            return _context2.abrupt("return", _context2.sent);

          case 7:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, this);
  }));

  return function searchEOLByProvider(_x2, _x3) {
    return _ref2.apply(this, arguments);
  };
}();

var getSpecies = /*#__PURE__*/function () {
  var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(id, selectedLicence) {
    var item;
    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.next = 2;
            return admin_helpers__WEBPACK_IMPORTED_MODULE_2__.helpers.parseSpeciesData(eol.getSpeciesUrl({
              id: id
            }, selectedLicence));

          case 2:
            item = _context3.sent;
            item.eolName = item.name;
            item.name = admin_helpers__WEBPACK_IMPORTED_MODULE_2__.helpers.getBinomial(item);
            item.eolId = id;
            admin_api_gbif__WEBPACK_IMPORTED_MODULE_1__.gbif.getTaxonomy(item.name).then(function (taxonomy) {
              item.taxonomy = {
                kingdom: taxonomy.kingdom,
                phylum: taxonomy.phylum,
                "class": taxonomy["class"],
                order: taxonomy.order,
                genus: taxonomy.genus,
                family: taxonomy.family
              };
            });
            delete item.id;
            return _context3.abrupt("return", item);

          case 9:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3, this);
  }));

  return function getSpecies(_x4, _x5) {
    return _ref3.apply(this, arguments);
  };
}();

var getSpeciesPhotos = /*#__PURE__*/function () {
  var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(id, selectedLicence) {
    var item;
    return regeneratorRuntime.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            _context4.next = 2;
            return admin_helpers__WEBPACK_IMPORTED_MODULE_2__.helpers.parseSpeciesData(eol.getSpeciesUrl({
              id: id
            }, selectedLicence));

          case 2:
            item = _context4.sent;
            return _context4.abrupt("return", item.images);

          case 4:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4, this);
  }));

  return function getSpeciesPhotos(_x6, _x7) {
    return _ref4.apply(this, arguments);
  };
}();

var searchEOL = /*#__PURE__*/function () {
  var _ref5 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee6(input, asyncProgress, callback) {
    var selectedLicence,
        imageIds,
        item,
        autocompleteRef,
        _args6 = arguments;
    return regeneratorRuntime.wrap(function _callee6$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            selectedLicence = _args6.length > 3 && _args6[3] !== undefined ? _args6[3] : 'pd|cc-by|cc-by-sa|cc-by-nd';
            imageIds = _args6.length > 4 ? _args6[4] : undefined;
            autocompleteRef = (0,admin_api_eol_autocomplete__WEBPACK_IMPORTED_MODULE_0__.eolAutocomplete)(input, 'search', 'autocomplete-options-container', function () {
              asyncProgress.classList.contains('hide') ? asyncProgress.classList.remove('hide') : asyncProgress.classList.add('hide');
            }, /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5() {
              return regeneratorRuntime.wrap(function _callee5$(_context5) {
                while (1) {
                  switch (_context5.prev = _context5.next) {
                    case 0:
                      _context5.next = 2;
                      return getSpecies(input.name, selectedLicence);

                    case 2:
                      item = _context5.sent;
                      if (imageIds) admin_helpers__WEBPACK_IMPORTED_MODULE_2__.helpers.getImagesLayout(item, imageIds, false);
                      asyncProgress.classList.remove('hide');
                      asyncProgress.innerHTML = 'Fetching matching species…';
                      callback(item, autocompleteRef);
                      setTimeout(function () {
                        asyncProgress.classList.add('hide');
                      }, 2550);

                    case 8:
                    case "end":
                      return _context5.stop();
                  }
                }
              }, _callee5, this);
            })));

          case 3:
          case "end":
            return _context6.stop();
        }
      }
    }, _callee6, this);
  }));

  return function searchEOL(_x8, _x9, _x10) {
    return _ref5.apply(this, arguments);
  };
}();

var eol = {
  getSpeciesUrl: getSpeciesUrl,
  searchEOLByProvider: searchEOLByProvider,
  getSpeciesByName: getSpeciesByName,
  getSpecies: getSpecies,
  getSpeciesPhotos: getSpeciesPhotos,
  searchEOL: searchEOL
};

/***/ }),

/***/ "QWBs":
/*!*******************************!*\
  !*** ./src/admin/api/gbif.js ***!
  \*******************************/
/*! namespace exports */
/*! export gbif [provided] [used] [could be renamed] */
/*! other exports [not provided] [unused] */
/*! runtime requirements: __webpack_exports__, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "gbif": () => /* binding */ gbif
/* harmony export */ });
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {
  try {
    var info = gen[key](arg);
    var value = info.value;
  } catch (error) {
    reject(error);
    return;
  }

  if (info.done) {
    resolve(value);
  } else {
    Promise.resolve(value).then(_next, _throw);
  }
}

function _asyncToGenerator(fn) {
  return function () {
    var self = this,
        args = arguments;
    return new Promise(function (resolve, reject) {
      var gen = fn.apply(self, args);

      function _next(value) {
        asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);
      }

      function _throw(err) {
        asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);
      }

      _next(undefined);
    });
  };
}

var getTaxonomy = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(binomial) {
    var url, result;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            url = "https://api.gbif.org/v1/species/match?name=".concat(binomial);
            _context.next = 3;
            return fetch(url);

          case 3:
            result = _context.sent;
            _context.next = 6;
            return result.json();

          case 6:
            return _context.abrupt("return", _context.sent);

          case 7:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, this);
  }));

  return function getTaxonomy(_x) {
    return _ref.apply(this, arguments);
  };
}();

var gbif = {
  getTaxonomy: getTaxonomy
};

/***/ }),

/***/ "EVST":
/*!*******************************!*\
  !*** ./src/admin/api/inat.js ***!
  \*******************************/
/*! namespace exports */
/*! export inat [provided] [used] [could be renamed] */
/*! other exports [not provided] [unused] */
/*! runtime requirements: __webpack_require__, __webpack_require__.n, __webpack_exports__, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "inat": () => /* binding */ inat
/* harmony export */ });
/* harmony import */ var firebase_functions_lib_providers_auth__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! firebase-functions/lib/providers/auth */ "kAK5");
/* harmony import */ var firebase_functions_lib_providers_auth__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(firebase_functions_lib_providers_auth__WEBPACK_IMPORTED_MODULE_0__);
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {
  try {
    var info = gen[key](arg);
    var value = info.value;
  } catch (error) {
    reject(error);
    return;
  }

  if (info.done) {
    resolve(value);
  } else {
    Promise.resolve(value).then(_next, _throw);
  }
}

function _asyncToGenerator(fn) {
  return function () {
    var self = this,
        args = arguments;
    return new Promise(function (resolve, reject) {
      var gen = fn.apply(self, args);

      function _next(value) {
        asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);
      }

      function _throw(err) {
        asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);
      }

      _next(undefined);
    });
  };
}



var getInatSpeciesObservations = function getInatSpeciesObservations(collection) {
  var observations = collection.results;
  return observations;
};

var getInatObservationsById = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
    var userId,
        collectionUrl,
        response,
        json,
        _args = arguments;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            userId = _args.length > 0 && _args[0] !== undefined ? _args[0] : 19829;
            collectionUrl = "https://api.inaturalist.org/v1/observations?user_id=".concat(userId, "&order=desc&order_by=created_at");
            _context.next = 4;
            return fetch(collectionUrl);

          case 4:
            response = _context.sent;
            _context.next = 7;
            return response.json();

          case 7:
            json = _context.sent;
            _context.next = 10;
            return getInatSpeciesObservations(json);

          case 10:
            return _context.abrupt("return", _context.sent);

          case 11:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, this);
  }));

  return function getInatObservationsById() {
    return _ref.apply(this, arguments);
  };
}();

var getInatObservations = /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
    var userId;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            userId = document.querySelector('#inputUserId').value;
            getInatObservationsById(userId);

          case 2:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, this);
  }));

  return function getInatObservations() {
    return _ref2.apply(this, arguments);
  };
}();

var parseInatImages = function parseInatImages(images) {
  return images;
};

var getInatImages = /*#__PURE__*/function () {
  var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(observation) {
    var taxon, taxonId, url, response, json;
    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            taxon = observation.taxon;

            if (taxon) {
              _context3.next = 3;
              break;
            }

            return _context3.abrupt("return", []);

          case 3:
            taxonId = taxon.id;
            url = "https://api.inaturalist.org/v1/observations?id_please=true&photos=true&license=cc-by-nc&photo_license=cc-by-nc&taxon_id=".concat(taxonId, "&order=desc&order_by=created_at");
            _context3.next = 7;
            return fetch(url);

          case 7:
            response = _context3.sent;
            _context3.next = 10;
            return response.json();

          case 10:
            json = _context3.sent;
            _context3.next = 13;
            return parseInatImages(json);

          case 13:
            return _context3.abrupt("return", _context3.sent);

          case 14:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3, this);
  }));

  return function getInatImages(_x) {
    return _ref3.apply(this, arguments);
  };
}();

var getTaxonDataIncPhotos = /*#__PURE__*/function () {
  var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(name) {
    var userId,
        place,
        url,
        response,
        json,
        userObservations,
        userPhotos,
        _args4 = arguments;
    return regeneratorRuntime.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            userId = _args4.length > 1 && _args4[1] !== undefined ? _args4[1] : 19829;
            place = '7122'; // portugal

            url = "https://www.inaturalist.org/observations.json?taxon_name=".concat(name, "&has[]=photos&place_id=").concat(place);
            _context4.next = 5;
            return fetch(url);

          case 5:
            response = _context4.sent;
            _context4.next = 8;
            return response.json();

          case 8:
            json = _context4.sent;
            userObservations = json.find(function (observation) {
              return observation.user_id === userId;
            });

            if (!userObservations) {
              _context4.next = 15;
              break;
            }

            userPhotos = userObservations.photos.map(function (photo) {
              return {
                license: photo.license_name,
                rightsHolder: photo.native_username,
                source: photo.native_page_url,
                title: name,
                url: photo.medium_url,
                provider: photo.provider
              };
            });
            return _context4.abrupt("return", userPhotos);

          case 15:
            return _context4.abrupt("return", []);

          case 16:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4, this);
  }));

  return function getTaxonDataIncPhotos(_x2) {
    return _ref4.apply(this, arguments);
  };
}();

var inat = {
  getInatImages: getInatImages,
  getInatObservations: getInatObservations,
  getTaxonDataIncPhotos: getTaxonDataIncPhotos
};

/***/ }),

/***/ "wEiM":
/*!***************************************!*\
  !*** ./src/admin/api/trait-values.js ***!
  \***************************************/
/*! namespace exports */
/*! export traitValues [provided] [used] [could be renamed] */
/*! other exports [not provided] [unused] */
/*! runtime requirements: __webpack_exports__, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "traitValues": () => /* binding */ traitValues
/* harmony export */ });
var _name, _shape;

function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
}

var traitValues = {
  name: (_name = {
    DESCRIPTION: 'description',
    CIRCUMFERENCE: 'circumference',
    EXPOSURE: 'exposure',
    CAP_SHAPE: 'cap shape',
    CAP_COLOUR: 'cap colour',
    CAP_DIAMETER: 'cap diameter',
    CAP_WIDTH: 'cap width',
    CAP_HEIGHT: 'cap height',
    SHELF_WIDTH: 'shelf width',
    SHELF_THICKNESS: 'shelf thickness',
    ECO_TYPE: 'ecological type',
    HOW_EDIBLE: 'how edible',
    HYMENIUM_TYPE: 'hymenium type',
    SPORE_PRINT_COLOUR: 'spore print colour',
    STIPE_CHARACTER: 'stipe character',
    STIPE_LENGTH: 'stipe length',
    STIPE_WIDTH: 'stipe width',
    STIPE_COLOUR: 'stipe colour',
    GILL_ATTACHMENT: 'gill attachment',
    FLESH: 'flesh',
    STEM_CHARACTER: 'stem character',
    GILL_COLOUR: 'gill colour',
    TRUNK_COLOUR: 'trunk colour',
    SUBSTRATE: 'substrate',
    THALLUS_TYPE: 'thallus type',
    RHIZINE_TYPE: 'rhizine type',
    DISC_WIDTH: 'Width',
    LOBE_WIDTH: 'Lobe width',
    LOBE_LENGTH: 'Lobe length',
    LOBE_DIAMETER: 'Lobe diameter',
    ROLE: 'Role',
    NATIVE: 'Native',
    NATIVE_TO: 'Native to',
    SYMBIOSIS: 'Symbiosis',
    ASSOCIATE: 'associate',
    SYMBIONTS: 'symbionts',
    LOOKALIKES: 'look alikes',
    ECOLOGY: 'ecology',
    HABITAT: 'habitat',
    TROPHIC_LEVEL: 'Trophic level',
    ORGANISATION: 'Organisation',
    SMELL: 'smell',
    FRUIT_TYPE: 'Fruit type',
    FRUIT_WIDTH: 'Fruit width',
    FRUIT_HEIGHT: 'Fruit height',
    FRUIT_DIAMETER: 'Fruit diameter',
    FRUIT_LENGTH: 'Fruit length',
    FRUIT_COLOUR: 'Fruit colour',
    FRUIT_TEXTURE: 'Fruit texture',
    BRANCH_TEXTURE: 'Branch texture',
    FRUIT_SURFACE: 'Fruit surface',
    SEED_DISPERSAL: 'Seed dispersal',
    VITAMINS: 'vitamins',
    STAMEN_COUNT: 'Stamen count',
    STYLE_COUNT: 'Style count',
    LEAFLET_COUNT: 'Leaflet count',
    LOBE_COUNT: 'Lobe count',
    LEAFLET_LENGTH: 'Leaflet length',
    LEAFLET_WIDTH: 'Leaflet width',
    GROUPING: 'grouping',
    MEDICINAL_PROPERTIES: 'Medicinal properties',
    COLOUR: 'Colour',
    USAGE: 'Usage',
    FORM: 'Form',
    LIFE_SPAN: 'Life span',
    GERMINATION: 'Germination',
    ACTIVE: 'Active',
    SUBSTRATE_ADHERANCE: 'Substrate adherance',
    RANK: 'UK Rank',
    SIZE: 'Size',
    LENGTH: 'Length',
    VOICE: 'Voice',
    HEIGHT: 'Height',
    WEIGHT: 'Weight',
    REPRODUCTION: 'Reproduction',
    ASEXUAL_REPRODUCTION: 'Asexual reproduction',
    DISPLAY: 'Display',
    BEHAVIOUR: 'behaviour',
    CHARACTERISTIC: 'Characteristic',
    COMMUNICATION: 'Communication',
    SHELTER: 'Shelter',
    DISEASE: 'Disease',
    THREAT: 'Threat',
    FOOD: 'Food',
    SEXUAL_DIMORPHISM: 'Sexual dimorphism',
    WING_SPAN: 'Wing span',
    TREE_SHAPE: 'Tree shape',
    CROWN_SHAPE: 'Crown shape',
    LEAF_DIVISION: 'Leaf division',
    LEAFLET_DIVISION: 'Leaflet division',
    LEAF_BLADE: 'Leaf blade',
    LEAF_VARIATION: 'Leaf variation',
    LEAF_SHAPE: 'Leaf shape',
    JUVENILE_LEAF_SHAPE: 'Juvenile leaf shape',
    LEAF_MARGIN: 'Leaf margin',
    LEAF_ARRANGEMENT: 'Leaf arrangement',
    LEAF_ATTACHMENT: 'Leaf attachment',
    LEAF_LENGTH: 'Leaf length',
    AWN_LENGTH: 'Awn length',
    JUVENILE_LEAF_LENGTH: 'Juvenile leaf length',
    LEAF_WIDTH: 'Leaf width',
    LEAF_COLOUR: 'Leaf colour',
    LEAF_SURFACE: 'Leaf surface',
    LEAF_ABOVE_SURFACE: 'Leaf above surface',
    LEAF_BELOW_SURFACE: 'Leaf below surface',
    LEAF_TEXTURE: 'Leaf texture',
    JUVENILE_TEXTURE: 'Juvenile leaf texture'
  }, _defineProperty(_name, "LEAF_SHAPE", 'Leaf shape'), _defineProperty(_name, "LEAFLET_SHAPE", 'Leaflet shape'), _defineProperty(_name, "LEAF_BELOW_COLOUR", 'Leaf below colour'), _defineProperty(_name, "LEAF_ABOVE_COLOUR", 'Leaf above colour'), _defineProperty(_name, "LEAF_VENATION", 'Leaf venation'), _defineProperty(_name, "LEAF_BUNDLE_COUNT", 'Leaf bundle count'), _defineProperty(_name, "LEAF_FEATURES", 'Leaf features'), _defineProperty(_name, "LEAF_FOLDING", 'Leaf folding'), _defineProperty(_name, "BRANCH_ARRANGEMENT", 'Branch arrangement'), _defineProperty(_name, "STALK_HEIGHT", 'Stalk height'), _defineProperty(_name, "STEM_HEIGHT", 'Stem height'), _defineProperty(_name, "SCAPE_HEIGHT", 'Scape height'), _defineProperty(_name, "STEM_DIAMETER", 'Stem diameter'), _defineProperty(_name, "TRUNK_DIAMETER", 'Trunk diameter'), _defineProperty(_name, "BRACT_COLOUR", 'Bract colour'), _defineProperty(_name, "BRACT_LENGTH", 'Bract length'), _defineProperty(_name, "PETIOLE_LENGTH", 'Petiole length'), _defineProperty(_name, "FLOWER_DIAMETER", 'Flower diameter'), _defineProperty(_name, "FLOWER_LENGTH", 'Flower length'), _defineProperty(_name, "FLOWER_COLOUR", 'Flower colour'), _defineProperty(_name, "FLOWER_SHAPE", 'Flower shape'), _defineProperty(_name, "FLORET_COUNT", 'Floret count'), _defineProperty(_name, "RAY_FLORET_COUNT", 'Ray floret count'), _defineProperty(_name, "DISC_FLORET_COUNT", 'Disc floret count'), _defineProperty(_name, "PETAL_COUNT", 'Petal count'), _defineProperty(_name, "LEAFLET_COUNT", 'Leaflet count'), _defineProperty(_name, "PETAL_LENGTH", 'Petal length'), _defineProperty(_name, "PETAL_WIDTH", 'Petal width'), _defineProperty(_name, "PETAL_COLOUR", 'Petal colour'), _defineProperty(_name, "SEPAL_COUNT", 'Sepal count'), _defineProperty(_name, "INFLORESCENCE", 'Inflorescence'), _defineProperty(_name, "FEMALE_CONE_LENGTH", 'Female cone length'), _defineProperty(_name, "MALE_CONE_LENGTH", 'Male cone length'), _defineProperty(_name, "CONE_LENGTH", 'Cone length'), _defineProperty(_name, "FEMALE_CONE_WIDTH", 'Female cone width'), _defineProperty(_name, "MALE_CONE_WIDTH", 'Male cone width'), _defineProperty(_name, "BULB_WIDTH", 'Bulb width'), _defineProperty(_name, "CONE_WIDTH", 'Cone width'), _defineProperty(_name, "CONE_DIAMETER", 'Cone diameter'), _defineProperty(_name, "CONE_COLOUR", 'Cone colour'), _defineProperty(_name, "CONE_SHAPE", 'Cone shape'), _defineProperty(_name, "MALE_CONE_COLOUR", 'Male cone colour'), _defineProperty(_name, "FEMALE_CONE_COLOUR", 'Female cone colour'), _defineProperty(_name, "CONE_SCALE_COUNT", 'Cone scale count'), _defineProperty(_name, "BARK_TYPE", 'Bark type'), _defineProperty(_name, "BARK_TEXTURE", 'Bark texture'), _defineProperty(_name, "CAP_TEXTURE", 'Cap texture'), _defineProperty(_name, "BARK_COLOUR", 'Bark colour'), _defineProperty(_name, "ALLOCHORY", 'Allochory'), _defineProperty(_name, "REPRODUCTIVE_CONTAINER", 'Reproductive container'), _defineProperty(_name, "CATERPILLAR_FOOD", 'Caterpillar food'), _defineProperty(_name, "CATERPILLAR_LENGTH", 'Caterpillar length'), _defineProperty(_name, "CATERPILLAR_COLOUR", 'Caterpillar colour'), _defineProperty(_name, "HIBERNATING_STAGE", 'Hibernating stage'), _defineProperty(_name, "PHYSIOLOGY", 'Physiology'), _defineProperty(_name, "MATING", 'Mating season'), _defineProperty(_name, "MATING_SYSTEM", 'mating system'), _defineProperty(_name, "PREGNANCY", 'Pregnancy'), _defineProperty(_name, "LITTER_SIZE", 'Litter size'), _defineProperty(_name, "JUVENILE", 'Juvenile'), _defineProperty(_name, "GESTATION", 'Gestation'), _defineProperty(_name, "WEANING", 'Weaning'), _defineProperty(_name, "LACTATION", 'Lactation'), _defineProperty(_name, "SENSORY_ACUITY", 'Sensory acuity'), _defineProperty(_name, "CRYPSIS", 'Crypsis'), _defineProperty(_name, "CACHE_SIZE", 'Number of caches'), _defineProperty(_name, "COLLECTIVE", 'Collective'), _defineProperty(_name, "FEMALE", 'Female'), _defineProperty(_name, "MALE", 'Male'), _defineProperty(_name, "TAIL_LENGTH", 'Tail length'), _defineProperty(_name, "MAX_SPEED", 'Maximum speed'), _defineProperty(_name, "DIET", 'Diet'), _defineProperty(_name, "ALTRICIAL", 'Altricial'), _defineProperty(_name, "MOULTING", 'Moulting'), _defineProperty(_name, "MATURITY", 'Maturity'), _defineProperty(_name, "FUNGUS_MARGIN_TYPE", 'Fungus margin type'), _defineProperty(_name, "SOIL_TYPE", 'Soil type'), _defineProperty(_name, "PH", 'pH'), _defineProperty(_name, "PH_VALUE", 'pH value'), _defineProperty(_name, "LICEN_CUP_COLOUR", 'Licen cup colour'), _defineProperty(_name, "RIM", 'Rim'), _defineProperty(_name, "CENTRE", 'Centre'), _defineProperty(_name, "POLLINATION", 'Pollination'), _defineProperty(_name, "PROPAGATION", 'Propagation'), _defineProperty(_name, "CLIMATE", 'Climate'), _defineProperty(_name, "SONG", 'Song'), _defineProperty(_name, "DIAMETER", 'diameter'), _defineProperty(_name, "NUT_TYPE", 'nut type'), _defineProperty(_name, "TREE_ECOLOGY", 'Tree ecology'), _defineProperty(_name, "KEY_FEATURE", 'Key feature'), _defineProperty(_name, "GILL_ATTACHMENT", 'gill attachment'), _defineProperty(_name, "MUSHROOM_GROUP", 'Mushroom group'), _defineProperty(_name, "QUEEN_LENGTH", 'Queen length'), _defineProperty(_name, "QUEEN_WINGSPAN", 'Queen wingspan'), _defineProperty(_name, "QUEEN_WEIGHT", 'Queen weight'), _defineProperty(_name, "WORKER_LENGTH", 'Worker length'), _defineProperty(_name, "WORKER_WINGSPAN", 'Worker wingspan'), _defineProperty(_name, "WORKER_WEIGHT", 'Worker weight'), _defineProperty(_name, "MALE_LENGTH", 'Male length'), _defineProperty(_name, "MALE_WINGSPAN", 'Male wingspan'), _defineProperty(_name, "MALE_WEIGHT", 'Male weight'), _defineProperty(_name, "COLONY_SIZE", 'colony size'), _defineProperty(_name, "TONGUE_LENGTH", 'Tongue length'), _defineProperty(_name, "INFRUCTESCENCE_LENGTH", 'Infructescence length'), _defineProperty(_name, "INFRUCTESCENCE_WIDTH", 'Infructescence width'), _defineProperty(_name, "UMBEL_DIAMETER", 'Umbel diameter'), _defineProperty(_name, "WIDTH", 'Width'), _defineProperty(_name, "BREADTH", 'Breadth'), _defineProperty(_name, "UMBEL_TYPE", 'Umbel type'), _name),
  howEdible: {
    help: 'How edible is this species?',
    CHOICE: 'Choice',
    EDIBLE: 'Edible',
    INEDIBLE: 'Inedible',
    POISONOUS: 'Poisonous',
    DEADLY: 'Deadly',
    TOXIC: 'Toxic',
    type: 'howEdible',
    name: 'how edible'
  },
  habitat: {
    help: 'What is the habitat of this species?',
    WOOD: 'Wood',
    WOODLAND: 'Woodland',
    WOODLAND_LITTER: 'Woodland litter',
    GRASSLAND: 'Grassland',
    SOIL: 'Soil',
    VEGETATION: 'Vegetation',
    DUNG: 'Dung',
    DUNES: 'Dunes',
    WIDESPREAD: 'Widespread',
    DEAD_WOOD: 'Dead wood',
    WASTELAND: 'Wasteland',
    MEADOW: 'Meadow',
    FIELDS: 'Fields',
    MOSS: 'Moss',
    PASTURE: 'Pasture',
    BARK: 'Bark',
    SHOOTS: 'Shoots',
    COMMONS: 'Common',
    HEATH: 'Heath',
    ORCHARDS: 'Orchards',
    HEDGEROWS: 'Hedgerows',
    LAWNS: 'Lawns',
    RINGS: 'Rings',
    DAMP: 'Damp',
    TREE_BASE: 'Tree base',
    FOREST_EDGE: 'Forest edge',
    PARKS: 'Parks',
    TRUNKS: 'Trunks',
    STUMPS: 'Stumps',
    ROCKS: 'Rocks',
    FENCES: 'Fences',
    TREES: 'Trees',
    SHRUBS: 'Shrubs',
    SHRUBLAND: 'Shrubland',
    MARSHLAND: 'Marshland',
    EXPOSED_WOOD: 'Exposed wood',
    BRANCHES: 'Branches',
    HILLS: 'Hills',
    URBAN: 'Urban',
    VALLEYS: 'Valleys',
    MAQUIS: 'Maquis',
    SAVANNA: 'Savanna',
    FOREST_STEPPE: 'Forest steppe',
    MEADOW_STEPPE: 'meadow steppe',
    BOREAL: 'Boreal',
    SCRUB: 'Scrub',
    WALLS: 'Walls',
    MOORLAND: 'Moorland',
    COAST: 'Coast',
    BRUSH: 'Brush',
    WATER: 'Water',
    SNOW: 'Snow',
    NO_SNOW: 'No snow',
    CONIFERS: 'conifers',
    BROAD_LEAF: 'broad-leaf',
    PINE: 'pine',
    BEECH: 'beech',
    OAK: 'oak',
    DITCH: 'Ditch',
    WET_MEADOW: 'Wet meadow',
    LAKESIDE: 'Lakeside',
    RIPERIAN: 'Riperian',
    WETLANDS: 'Wetlands'
  },
  ecologicalType: {
    help: 'What is the ecological type of this mushroom?',
    SAPROTROPHIC: 'Saprotrophic',
    PARASITIC: 'Parasitic',
    MYCORRHIZAL: 'Mycorrhizal',
    PLANT_PATHOGEN: 'Plant pathogen'
  },
  capShape: {
    help: 'How would you describe the pileus?',
    CAMPANULATE: 'Campanulate',
    CONICAL: 'Conical',
    CONVEX: 'Convex',
    DEPRESSED: 'Depressed',
    FLAT: 'Flat',
    INFUNDIBULIFORM: 'Infundibuliform',
    OFFSET: 'Offset',
    OVATE: 'Ovate',
    UMBILLICATE: 'Umbillicate',
    UMBONATE: 'Umbonate',
    POTATO_SHAPED: 'Potato shaped',
    NA: 'N/A',
    SPHERICAL: 'Spherical',
    PEAR_SHAPED: 'Pear shaped',
    BRAIN_LIKE: 'Brain-like',
    HONEYCOMB: 'Honeycomb',
    HEMI_SPHERICAL: 'Hemispherical',
    type: 'capShape',
    name: 'cap shape'
  },
  treeEcology: {
    OAK: 'Oak',
    BEECH: 'Beech',
    BIRCH: 'Birch',
    DECIDUOUS: 'Deciduous',
    SOFTWOOD: 'Softwood',
    HARDWOOD: 'Hardwood',
    MIXED_WOODLAND: 'Mixed woodland',
    CONIFEROUS: 'Coniferous',
    PINE: 'Pine',
    ELM: 'Elm',
    ASH: 'Ash',
    SYCAMORE: 'Sycamore',
    ASPEN: 'Aspen',
    ELDER: 'Elder',
    CHESTNUT: 'Chestnut',
    HARDWOODS: 'Hardwoods',
    PRUNUS: 'Prunus',
    PYRUS: 'Pyrus',
    SALIX: 'Salix',
    ROBINIA: 'Robinia',
    CERATONIA: 'Ceratonia',
    EUCALYPTUS: 'Eucalyptus',
    BROAD_LEAF: 'Broad-leaf',
    SWEET_CHESTNUT: 'Sweet chestnut',
    POPLAR: 'Poplar',
    CORK: 'Cork',
    FIR: 'Fir',
    SPRUCE: 'Spruce',
    PLANE: 'Plane',
    WILLOW: 'Willow',
    MAPLE: 'Maple',
    LARCH: 'Larch',
    CEDAR: 'Cedar',
    YEW: 'Yew',
    TURKEY_OAK: 'Turkey oak',
    HAWTHORN: 'Hawthorn',
    BUSH: 'Bush',
    SHRUB: 'Shrub'
  },
  hymeniumType: {
    help: 'What is the hymenium type?',
    GILLS: 'Gills',
    PORES: 'Pores',
    GLEBA: 'Gleba',
    SMOOTH: 'Smooth',
    TEETH: 'Teeth',
    RIDGES: 'Ridges',
    FALSE_GILLS: 'False gills'
  },
  associate: {
    ALGA: 'Alga',
    CYNOBACTERIUM: 'Cyanobacterium',
    FUNGUS: 'Fungus',
    type: 'associate',
    name: 'associate'
  },
  thallusType: {
    help: 'What is this lichen\'s thallus type?',
    FOLIOSE: 'Foliose',
    FRUTICOSE: 'Fruticose',
    CRUSTOSE: 'Crustose',
    SQUAMULOSE: 'Squamulose',
    LEPROSE: 'Leprose',
    EPIPHYTE: 'Epiphyte',
    type: 'thallusType',
    name: 'thallus type'
  },
  rhizineType: {
    SPARSE: 'Sparse',
    HAPTER: 'Hapter',
    type: 'rhizineType',
    name: 'rhizine type'
  },
  substrate: {
    WOOD: 'Wood',
    BARK: 'Bark',
    ROCKS: 'Rocks',
    SOIL: 'Soil',
    type: 'substrate',
    name: 'substrate'
  },
  level: {
    HIGH: 'High',
    MEDIUM: 'Medium',
    LOW: 'Low',
    VARIABLE: 'Variable',
    type: 'level',
    name: 'level'
  },
  medicinalProperties: {
    ANTIVIRAL: 'Antiviral',
    ANTISEPTIC: 'Antiseptic',
    ANTI_INFLAMMATORY: 'Anti-inflammatory',
    ANTIBIOTIC: 'Antibiotic',
    ANLAGESIC: 'Analgesic',
    ANTIBACTERIAL: 'Antibacterial',
    ANTICOAGULANT: 'Anticoagulant',
    ANTIFUNGAL: 'Antifungal',
    type: 'medicinalProperties',
    name: 'medicinal properties'
  },
  ph: {
    ACIDIC: 'Acidic',
    ALKALINE: 'Alkaline',
    NEUTRAL: 'Neutral',
    type: 'pHLevel',
    name: 'ph level'
  },
  colour: {
    LILAC: 'Lilac',
    BUFF: 'Buff',
    WHITE: 'White',
    YELLOW: 'Yellow',
    DARK_GREEN: 'Dark green',
    GREEN: 'Green',
    WHITE_GREEN: 'White-green',
    BRIGHT_GREEN: 'Bright green',
    OLIVE_GREEN: 'Olive-green',
    BRIGHT_YELLOW_GREEN: 'Bright yellow-green',
    YELLOW_GREEN: 'Yellow-green',
    YELLOW_BROWN: 'Yellow-brown',
    PURPLE_BROWN: 'Purple-brown',
    GREY_BROWN: 'Grey-brown',
    DARK_YELLOW: 'Dark yellow',
    DARK_RED: 'Dark red',
    DARK_PINK: 'Dark pink',
    ORANGE: 'Orange',
    SCARLET: 'scarlet',
    BLOOD_RANGE: 'Blood orange',
    RED: 'Red',
    RED_BROWN: 'Red-brown',
    ORANGE_RED: 'Orange-red',
    GREY: 'Grey',
    PALE_GREY: 'Pale grey',
    PALE_BROWN: 'Pale brown',
    GREY_GREEN: 'Grey-green',
    GREY_WHITE: 'Grey-white',
    BROWN: 'Brown',
    CHESTNUT_BROWN: 'Chestnut brown',
    PAPER_BROWN: 'Paper brown',
    BLACK: 'Black',
    BLUE: 'Blue',
    PALE_BLUE: 'Pale blue',
    BLUE_BLACK: 'Blue-black',
    JET_BLACK: 'Jet-black',
    BLUE_GREEN: 'Blue-green',
    VIOLET: 'Violet',
    BURGUNDY: 'Burgundy',
    PALE_VIOLET: 'Pale violet',
    VIOLET_PURPLE: 'Violet purple',
    PALE_GREEN: 'Pale green',
    PALE_YELLOW: 'Pale yellow',
    PALE_YELLOW_GREEN: 'Pale yellow-green',
    PALE_GREY_GREEN: 'Pale yellow-green',
    GLAUCOUS: 'Glaucous',
    GREY_YELLOW: 'Grey-yellow',
    ORANGE_YELLOW: 'Orange-yellow',
    CREAM: 'Cream',
    CHALKY: 'Chalky',
    PINK: 'Pink',
    PALE_PINK: 'Pale pink',
    PURPLE: 'Purple',
    PALE_PURPLE: 'Pale purple',
    DARK_PURPLE: 'Dark purple',
    TAN: 'Tan',
    DARK_BROWN: 'Dark brown',
    HONEY: 'Honey',
    RED_PURPLE: 'Red-purple',
    type: 'colour',
    name: 'colour'
  },
  usage: {
    help: 'To what use do humans put this species?',
    PERFUMERY: 'Perfumery',
    TANNING: 'Tanning',
    DYING: 'Dying',
    BREWING: 'Brewing',
    FOOD: 'Food',
    WINE: 'Wine',
    COFFEE: 'Coffee',
    TEA: 'Tea',
    BIRDS_NEST: 'Bird\'s nest',
    POISON: 'Poison',
    FODDER: 'Fodder',
    FORAGE: 'Forage',
    GREEN_MANURE: 'Green manure',
    MEDICINE: 'Medicine',
    FUR: 'Fur',
    TIMBER: 'Timber',
    PEST_CONTROL: 'Pest control',
    HERB: 'Herb',
    SPICE: 'Spice',
    ESSENTIAL_OIL: 'Essential oil',
    MORDANT: 'Mordant',
    ASTRINGENT: 'Astringent'
  },
  nonTaxaType: {
    FORM: 'Form',
    type: 'nonTaxaType',
    name: 'non taxa type'
  },
  element: {
    NITROGEN: 'Nitrogen',
    SULPUR_DIOXIDE: 'Sulpur dioxide',
    type: 'element',
    name: 'element'
  },
  leafBlade: {
    SIMPLE: 'Simple ',
    COMPOUND: 'Compound',
    type: 'leaf blade',
    name: 'leaf blade'
  },
  leafDivision: {
    PALMATE: 'Palmate',
    COMPOUND_PALMATE: 'Compound Palmate',
    PALMATELY_LOBED: 'Palmately lobed',
    PINNATE: 'Pinnate',
    COMPOUND_PINNATE: 'Compound Pinnate',
    ODD_PINNATE: 'Odd pinnate',
    EVEN_PINNATE: 'Even pinnate',
    BIPINNATE: 'Bipinnate',
    COMPOUND_BIPINNATE: 'Compound Bipinnate',
    TRIFOLIATE: 'Trifoliate',
    PINNATIFID: 'Pinnatifid',
    TRIPINNATE: 'Tripinnate',
    SIMPLE: 'Simple ',
    COMPOUND: 'Compound',
    IMPARIPINNATE: 'Imparipinnate',
    PARIPINNATE: 'Paripinnate'
  },
  leafletDivision: {
    PALMATE: 'Palmate',
    COMPOUND_PALMATE: 'Compound Palmate',
    PALMATELY_LOBED: 'Palmately lobed',
    PINNATE: 'Pinnate',
    COMPOUND_PINNATE: 'Compound Pinnate',
    ODD_PINNATE: 'Odd pinnate',
    EVEN_PINNATE: 'Even pinnate',
    BIPINNATE: 'Bipinnate',
    COMPOUND_BIPINNATE: 'Compound Bipinnate',
    TRIFOLIATE: 'Trifoliate',
    PINNATIFID: 'Pinnatifid',
    TRIPINNATE: 'Tripinnate',
    SIMPLE: 'Simple ',
    COMPOUND: 'Compound'
  },
  leafVariation: {
    HOMOBLASTIC: 'Homoblastic',
    HETEROBLASTIC: 'Heteroblastic',
    type: 'leafVariation',
    name: 'leaf variation'
  },
  shape: (_shape = {
    LINEAR: 'Linear',
    OVATE: 'Ovate',
    OBLANCEOLATE: 'Oblanceolate',
    OBOVATE: 'Obovate',
    ACICULAR: 'Acicular',
    ACUMINATE: 'acuminate',
    ACUTE: 'acute',
    APICULATE: 'apiculate',
    ATTENUATE: 'attenuate',
    AURICULATE: 'auriculate',
    ASYMMETRICAL: 'asymmetrical',
    CAUDATE: 'caudate',
    CORDATE: 'cordate',
    CUNEATE: 'cuneate',
    CUSPIDATE: 'cuspidate',
    DELTOID: 'deltoid',
    DIGITATE: 'digitate',
    ELLIPTIC: 'elliptic',
    ENSIFORM: 'ensiform',
    EMARGINATE: 'emarginate',
    FALCATE: 'falcate',
    FENESTRATE: 'fenestrate',
    FILIFORM: 'filiform',
    FLABELLATE: 'flabellate',
    HASTATE: 'hastate',
    LACINIATE: 'laciniate',
    LANCEOLATE: 'lanceolate',
    LAMINAR: 'laminar'
  }, _defineProperty(_shape, "LINEAR", 'linear'), _defineProperty(_shape, "LOBED", 'lobed'), _defineProperty(_shape, "LORATE", 'lorate'), _defineProperty(_shape, "LYRATE", 'lyrate'), _defineProperty(_shape, "MUCRONATE", 'mucronate'), _defineProperty(_shape, "MULTIFID", 'multifid'), _defineProperty(_shape, "OBCORDATE", 'obcordate'), _defineProperty(_shape, "OBLANCEOLATE", 'oblanceolate'), _defineProperty(_shape, "OBLIQUE", 'oblique'), _defineProperty(_shape, "OBLONG", 'oblong'), _defineProperty(_shape, "OBOVATE", 'obovate'), _defineProperty(_shape, "OBTRULLATE", 'obtrullate'), _defineProperty(_shape, "OBTUSE", 'obtuse'), _defineProperty(_shape, "ORBICULAR", 'orbicular'), _defineProperty(_shape, "OVATE", 'ovate'), _defineProperty(_shape, "PALMATE", 'palmate'), _defineProperty(_shape, "PALMATELY_LOBED", 'palmately lobed'), _defineProperty(_shape, "PALMATIFID", 'palmatifid'), _defineProperty(_shape, "PALMATIPARTITE", 'palmatipartite'), _defineProperty(_shape, "PALMATISECT", 'palmatisect'), _defineProperty(_shape, "PANDURATE", 'pandurate'), _defineProperty(_shape, "PEDATE", 'pedate'), _defineProperty(_shape, "PELTATE", 'peltate'), _defineProperty(_shape, "PERFOLIATE", 'perfoliate'), _defineProperty(_shape, "PERFORATE", 'perforate'), _defineProperty(_shape, "PINNATELY_LOBED", 'pinnately lobed'), _defineProperty(_shape, "PINNATIFID", 'pinnatifid'), _defineProperty(_shape, "PINNATIPARTITE", 'pinnatipartite'), _defineProperty(_shape, "PINNATISECT", 'pinnatisect'), _defineProperty(_shape, "PLICATE", 'plicate'), _defineProperty(_shape, "RENIFORM", 'reniform'), _defineProperty(_shape, "RETUSE", 'retuse'), _defineProperty(_shape, "RHOMBOID", 'rhomboid'), _defineProperty(_shape, "ROUNDED", 'rounded'), _defineProperty(_shape, "TRIANGULAR", 'Triangular'), _defineProperty(_shape, "QUADRANGULAR", 'Quadrangular'), _defineProperty(_shape, "SEMITERETE", 'semiterete'), _defineProperty(_shape, "SINUATE", 'sinuate'), _defineProperty(_shape, "SAGITTATE", 'sagittate'), _defineProperty(_shape, "SPATULATE", 'spatulate'), _defineProperty(_shape, "SPEAR_SHAPED", 'spear-shaped'), _defineProperty(_shape, "SUBOBTUSE", 'subobtuse'), _defineProperty(_shape, "SUBULATE", 'subulate'), _defineProperty(_shape, "TERETE", 'terete'), _defineProperty(_shape, "TRULLATE", 'trullate'), _defineProperty(_shape, "TRUNCATE", 'truncate'), _defineProperty(_shape, "UNDULATE", 'undulate'), _defineProperty(_shape, "UNIFOLIATE", 'unifoliate'), _defineProperty(_shape, "FLAT", 'Flat'), _defineProperty(_shape, "NEEDLE", 'Needle'), _shape),
  reproduction: {
    SELF_POLLINATION: 'Self-pollination',
    CROSS_POLLINATION: 'Cross-pollination',
    type: 'reproduction',
    name: 'reproduction'
  },
  asexualReproduction: {
    BUDDING: 'budding',
    FRAGMENTATION: 'fragmentation',
    FISSION: 'fission',
    SPORE_FORMATION: 'spore formation',
    VEGETATIVE_PROPAGATION: 'vegetative propagation',
    type: 'asexualReproduction',
    name: 'asexual reproduction'
  },
  leafArrangement: {
    ALTERNATE: 'Alternate',
    BASAL: 'Basal',
    CAULINE: 'Cauline',
    OPPOSITE: 'Opposite',
    WHORLED: 'Whorled',
    ROWS: 'Rows',
    SPIRAL: 'Spiral',
    OVERLAPPING: 'Overlapping',
    INCURVED: 'Incurved',
    DECUSSATE: 'Decussate',
    type: 'leafArrangement',
    name: 'leaf arrangement'
  },
  leafAttachment: {
    SESSILE: 'Sessile',
    SUBSESSILE: 'Subsessile',
    PEDICELLATE: 'Pedicellate'
  },
  leafMargin: {
    ENTIRE: 'Entire',
    CILIATE: 'Ciliate',
    CRENATE: 'Crenate',
    DENTATE: 'Dentate',
    DENTICULATE: 'Denticulate',
    DOUBLY_SERRATE: 'Doubly serrate',
    SERRATE: 'Serrate',
    SERRULATE: 'Serrulate',
    SINUATE: 'Sinuate',
    LOBATE: 'Lobate',
    UNDULATE: 'Undulate',
    SPINY: 'Spiny',
    SMOOTH: 'Smooth',
    type: 'leafMargin',
    name: 'leaf margin'
  },
  food: {
    GRASS: 'Grass',
    ROTTEN_FRUIT: 'Rotten fruit',
    NECTAR: 'Nectar',
    HONEYDEW: 'Honeydew',
    SEEDS: 'Seeds',
    NUTS: 'Nuts',
    GRAINS: 'Grains',
    BERRIES: 'Berries',
    HERBAGE: 'Herbage',
    SWARD: 'Sward',
    LEAVES: 'Leaves',
    WOOD: 'Wood',
    ROOTS: 'Roots',
    TUBERS: 'Tubers',
    RHIZOMES: 'Rhizomes',
    BULBS: 'Bulbs',
    BARK: 'Bark',
    SHOOTS: 'Shoots',
    type: 'food',
    name: 'food'
  },
  hibernatingStage: {
    ADULT: 'Adult',
    CATERPILLAR: 'Caterpillar',
    PUPA: 'Pupa',
    type: 'hibernatingStage',
    name: 'hibernating stage'
  },
  symbiosis: {
    MUTUALISM: 'Mutualism',
    COMMENSALISM: 'Commensalism',
    PREDATION: 'Predation',
    PARASITISM: 'Parasitism',
    HERBIVORY: 'Herbivory',
    COMPETITION: 'Competition',
    MYCORRHIZAL: 'Mycorrhizal',
    ECTOMYCORRHIZAL: 'Ectomycorrhizal',
    COMPANION: 'Companion planting',
    POLLINATION: 'Pollination',
    SEED_PREDATION: 'Seed predation',
    type: 'symbiosis',
    name: 'symbiosis'
  },
  trophicLevel: {
    help: 'What is the trophic level or this species?',
    PRIMARY_PRODUCER: 'Primary producer',
    PRIMARY_CONSUMER: 'Primary consumer',
    SECONDARY_CONSUMER: 'Secondary consumer',
    OMNIVORE: 'Omnivore',
    TERTIARY_CONSUMER: 'Tertiary consumer',
    APEX_PREDATOR: 'Apex predator',
    type: 'trophicLevel',
    name: 'trophic level'
  },
  shelter: {
    help: 'What is the name of this species`s shelter?',
    DREY: 'Drey',
    BURROW: 'Burrow',
    DEN: 'Den',
    WARREN: 'Warren',
    SETT: 'Sett',
    ROOKERY: 'Rookery',
    LODGE: 'Lodge',
    DAM: 'Dam',
    NEST: 'Nest',
    SHELTER: 'Shelter',
    VEGETATION: 'vegetation',
    type: 'shelter',
    name: 'shelter'
  },
  active: {
    help: 'When is this species most active?',
    CREPUSCULAR: 'Crepuscular',
    DIURNAL: 'Diurnal',
    NOCTURNAL: 'Nocturnal',
    MATUTINAL: 'Matutinal',
    VESPERTINE: 'Vespertine',
    type: 'active',
    name: 'active'
  },
  juvenile: {
    help: 'What is the name for the juvenile of this species?',
    KIT: 'Kit',
    SQUEAKER: 'Squeaker',
    CUB: 'Cub',
    KITTEN: 'Kitten',
    CHICK: 'Chick',
    PUP: 'Pup',
    CALF: 'Calf',
    DUCKLING: 'Duckling',
    EYAS: 'Eyas',
    MAGGOT: 'Maggot',
    KID: 'Kid',
    GOSLING: 'Gosling',
    LEVERET: 'Leveret',
    NYMPH: 'Nymph',
    CATERPILLAR: 'Caterpillar',
    LARVA: 'Larva',
    SALAMANQUESA: 'Salamanquesa',
    type: 'juvenile',
    name: 'juvenile'
  },
  month: {
    JANUARY: 'January',
    FEBRUARY: 'February',
    MARCH: 'March',
    APRIL: 'April',
    MAY: 'May',
    JUNE: 'June',
    JULY: 'July',
    AUGUST: 'August',
    SEPTEMBER: 'September',
    OCTOBER: 'October',
    NOVEMBER: 'November',
    DECEMBER: 'December',
    type: 'month',
    name: 'month'
  },
  female: {
    help: 'What is the name for a female of this species?',
    VIXEN: 'Vixen',
    DOE: 'Doe',
    JILL: 'Jill',
    BITCH: 'Bitch',
    SOW: 'Sow',
    HEN: 'Hen',
    DUCK: 'Duck',
    GOOSE: 'Goose',
    PEN: 'Pen',
    type: 'female',
    name: 'female'
  },
  male: {
    help: 'What is the name for a male of this species?',
    BUCK: 'Buck',
    DOG: 'Dog',
    BOAR: 'Boar',
    TOM: 'Tom',
    JACK: 'Jack',
    COCK: 'Cock',
    DRAKE: 'Drake',
    REYNARD: 'Reynard',
    TOD: 'Tod',
    TERCEL: 'Tercel',
    GANDER: 'Gander',
    COB: 'Cob',
    type: 'male',
    name: 'male'
  },
  diet: {
    help: 'How is the diet of this species best described?',
    HERBIVORE: 'Herbivore',
    OMNIVORE: 'Omnivore',
    CARNIVORE: 'Carnivore',
    XYLOPHAGOUS: 'Xylophagous',
    POLYPHAGOUS: 'Polyphagous',
    type: 'diet',
    name: 'diet'
  },
  fungusMarginType: {
    ENTIRE: 'Smooth entire',
    APPENDICULATE: 'Appendiculate',
    UNDULATE: 'Undulate',
    STRIATE: 'Striate',
    PLICATE: 'Plicate',
    RIMMOSE: 'Rimmose',
    ERODED: 'Eroded',
    INROLLED: 'Inrolled',
    type: 'marginType',
    name: 'fungus margin type'
  },
  soilType: {
    SILICEOUS: 'Siliceous',
    CALCAREOUS: 'Calcareous',
    NITROGENOUS: 'Nitrogenous',
    NUTRIENT_POOR: 'Nutrient poor',
    WELL_DRAINED: 'Well-drained',
    WELL_WATERED: 'Well-watered',
    LOAM: 'Loam',
    CHALK: 'Chalk',
    SAND: 'Sand',
    RICH: 'Rich',
    MOIST: 'Moist'
  },
  organisation: {
    help: 'How is this species organised?',
    EUSOCIAL: 'Eusocial',
    SOCIAL: 'Social',
    SOLITARY: 'Solitary',
    MATRIARCHY: 'Matriarchy',
    type: 'organisation',
    name: 'organisation'
  },
  role: {
    INDICATOR: 'Indicator',
    KEYSTONE: 'Keystone',
    FOUNDATION: 'Foundation',
    SPECIALIST: 'Specialist',
    GENERALIST: 'Generalist',
    PIONEER: 'Pioneer',
    INVASIVE: 'Invasive',
    DOMINANT: 'Dominant',
    POLLINATOR: 'Pollinator',
    PREDATOR: 'Predator',
    HERBIVORE: 'Herbivore',
    OMNIVORE: 'Omnivore',
    CARNIVORE: 'Carnivore',
    GRANIVORE: 'Granivore',
    MUCIVORE: 'Mucivore',
    PREY: 'Prey',
    COMPETITOR: 'Competitor',
    HOST: 'Host',
    CARRIER: 'Carrier',
    RUDERAL: 'Ruderal',
    SUPERTRAMP: 'Supertramp',
    SYMBIONT: 'Symbiont',
    OCCUPANT: 'Lives in',
    PARASITE: 'Parasite',
    COLONISER: 'Coloniser',
    EARLY_SUCCESSION: 'early-succession',
    SEED_DISPERSAL: 'Seed dispersal',
    FERTILISATION: 'Fertilisation',
    PROPAGATION: 'propagation',
    REPRODUCTION: 'reproduction',
    BIOINDICATOR: 'Bioindicator',
    STRANGLER: 'Strangler',
    FOOD_SOURCE: 'Food source',
    EPIPHYTIC: 'Epiphytic',
    EPIPHYTIC_STRANGLER: 'Epiphytic strangler',
    NUTRIENT_CYCLING: 'Nutrient cycling',
    CARBON_DIOXIDE_PRODUCTION: 'Carbon dioxide production',
    MYCOREMEDIATION: 'Mycoremediation',
    type: 'role',
    name: 'role'
  },
  fruitType: {
    help: 'What fruit type does this plant have?',
    DRUPE: 'Drupe',
    POME: 'Pome',
    BERRY: 'Berry',
    AGGREGATE_FRUIT: 'Aggregate fruit',
    LEGUME: 'Legume',
    CAPSULE: 'Capsule',
    NUT: 'Nut',
    GRAIN: 'Grain',
    MULTIPLE_FRUIT: 'Multiple fruit',
    SAMARA: 'Samara',
    ACHENE: 'Achene',
    POD: 'Pod',
    ARIL: 'Aril',
    SYCONIUM: 'syconium',
    FOLLICLE: 'Follicle',
    SILIQUE: 'Silique',
    type: 'fruitType',
    name: 'fruit type'
  },
  inflorescence: {
    help: 'What type of inflorescence does this plant have?',
    CATKIN: 'catkin',
    UMBEL: 'umbel',
    RACEME: 'raceme',
    CORYMB: 'corymb',
    SPIKE: 'Spike',
    SPADEX: 'Spadex',
    SINGLE: 'Single',
    PANICLE: 'Panicle',
    CYMOSE: 'Cymose',
    BRANCHED_SPIKE: 'Branched spike'
  },
  umbelType: {
    FLAT: 'Flat',
    SPHERICAL: 'Spherical',
    SIMPLE: 'Simple',
    COMPOUND: 'Compound',
    TERMINAL: 'Terminal'
  },
  display: {
    help: 'Which form of display does this species exhibit?',
    DIEMATIC: 'Diematic',
    SEXUAL_COLOUR_DIMORPHISM: 'Sexual colour dimorphism',
    NO_SEXUAL_COLOUR_DIMORPHISM: 'No sexual colour dimorphism',
    SEXUAL_DIMORPHISM: 'Sexual dimorphism',
    NO_SEXUAL_DIMORPHISM: 'No sexual dimorphism',
    MELANISTIC: 'Melanistic',
    type: 'display',
    name: 'display'
  },
  behaviour: {
    help: 'This species exhibits which form of behaviour?',
    SEXUAL_CANNIBALISM: 'Sexual cannibalism',
    MONANDROUS: 'Monandrous',
    VOCALISATION: 'Vocalisation',
    CRYPSIS: 'Crypsis',
    HOARDING: 'Hoarding',
    HIBERNATION: 'Hibernation',
    GAME_PLAYING: 'Game playing',
    PLAYFUL: 'Playful',
    TERRITORIAL: 'Territorial',
    NON_TERRITORIAL: 'Non territorial',
    BIPARENTAL_CARE: 'Biparental care',
    COOPERATIVE_BREEDING: 'Cooperative breeding',
    TOOL_MAKING: 'Tool making',
    PROBLEM_SOLVING: 'Problem solving',
    DIVISION_OF_LABOUR: 'Division of labour',
    SUPERORGANISM: 'Superorganism',
    ANAUTOGENY: 'Anautogeny',
    MASS_PROVISIONING: 'Mass provisioning',
    PRECOCIAL: 'Precocial',
    ALTRICIAL: 'Altricial',
    AUTOTOMIC: 'Autotomic',
    ECTOTHERMIC: 'Ectothermic',
    ADHESION: 'Adhesion',
    POLYPHYODONT: 'Polyphyodont',
    VIVIPAROUS: 'Viviparous',
    REGURGITATION: 'Feeding through regurgitation',
    MULTIVOLTINE: 'Multivoltine',
    BIVOLTINE: 'Bivoltine',
    UNIVOLTINE: 'Univoltine',
    SEMIVOLTINE: 'Semivoltine',
    METAMORPHOSIS: 'Metamorphosis',
    RUTTING: 'Rutting',
    WHELPING: 'Whelping',
    FARROWING: 'Farrowing',
    SWIMMING: 'Swimming',
    DECUMBENT: 'Decumbent',
    ETHYLENE_RIPENING: 'Ethylene ripening',
    MIGRATORY: 'Migratory',
    type: 'behaviour',
    name: 'behaviour'
  },
  sense: {
    help: 'Which sense does this species favour?',
    SIGHT: 'Sight',
    MOVEMENT: 'Movement',
    SMELL: 'Smell',
    SPATIAL: 'Spatial',
    MEMORY: 'Memory',
    ECHOLOCATION: 'Echolocation',
    type: 'sense',
    name: 'sense'
  },
  crypsis: {
    CAMOUFLAGE: 'Camouflage',
    NOCTURNALITY: 'Nocturnality',
    SUBTERRANEAN: 'Subterranean',
    MIMICRY: 'Mimicry',
    VISUAL: 'Visual',
    OLFACTORY: 'Olfactory',
    AUDITORY: 'Auditory'
  },
  allochory: {
    ANEMOCHORY: 'Anemochory',
    HYDROCHORY: 'Hydrochory',
    ZOOCHORY: 'Zoochory',
    ANTHROPOCHORY: 'Anthropochory',
    type: 'allochory',
    name: 'allochory'
  },
  reproductiveContainer: {
    CONE: 'Cone',
    type: 'reproductiveContainer',
    name: 'reproductive container'
  },
  communication: {
    VOCALISATION: 'Vocalisation',
    POSTURING: 'Posturing',
    type: 'communication',
    name: 'communication'
  },
  matingSystem: {
    POLYGYNOUS: 'Polygynous',
    MONOGAMOUS: 'Monogamous',
    type: 'matingSystem',
    name: 'mating system'
  },
  physiology: {
    NEGATIVE_ALLELOPATHY: 'Negative allelopathy',
    POSITIVE_ALLELOPATHY: 'Positive allelopathy',
    C3_CARBON_FIXATION: 'C3 carbon fixation',
    NITROGEN_FIXING: 'Nitrogen fixing',
    MYCORRHIZAL: 'Mycorrhizal',
    ECTOMYCORRHIZAL: 'Ectomycorrhizal',
    DORMANCY: 'Dormancy',
    EVERGREEN: 'Evergreen',
    DECIDUOUS: 'Deciduous',
    CONIFEROUS: 'Coniferous',
    ADVENTITIOUS: 'Adventitious',
    NYCTINASTY: 'Nyctinasty',
    XEROMORPHIC: 'Xeromorphic',
    SUCCULENT: 'Succulent',
    DROUGHT_TOLERANT: 'Drought tolerant',
    FIRE_TOLERANT: 'Fire tolerant',
    FIRE_RESISTANT: 'Fire resistant',
    POLLUTION_TOLERANT: 'Pollution tolerant',
    PH_TOLERANT: 'pH tolerant',
    SALT_TOLERANT: 'Salt tolerant',
    FROST_TOLERANT: 'Frost tolerant',
    HEAT_TOLERANT: 'Heat tolerant',
    NITROGEN_TOLERANT: 'Nitrogen tolerant',
    HEAVY_METAL_TOLERANT: 'heavy metal tolerant',
    ACID_RAIN_TOLERANT: 'Acid rain tolerant',
    COMPACT_SOIL_TOLERANT: 'Compact soil tolerant',
    FLORAL_SCENT: 'Floral scent',
    AROMATIC: 'Aromatic',
    MONOCARPIC: 'Monocarpic',
    POLYCARPIC: 'Polycarpic',
    PYROPHYTIC: 'Pyrophytic',
    SEROTINOUS: 'Serotinous',
    STYPTIC: 'Styptic',
    BIOLUMINESCENCE: 'Bioluminescence',
    type: 'physiology',
    name: 'physiology'
  },
  collective: {
    help: 'What is the term for a collective of this species?',
    SOUNDER: 'Sounder',
    SLOTH: 'Sloth',
    MURMURATION: 'Murmuration',
    PACK: 'Pack',
    type: 'collective',
    name: 'collective'
  },
  ecology: {
    DIGGING: 'Digging',
    SCRAPING: 'Scraping',
    ROOTING: 'Rooting',
    SCAVENGING: 'Scavenging',
    type: 'ecology',
    name: 'ecology'
  },
  characteristic: {
    help: 'Which characteristic/s does this species display?',
    PERENNIAL: 'Perennial',
    ANNUAL: 'Annual',
    BIENNIAL: 'Biennial',
    HERBACEOUS: 'Herbaceous',
    DIOECIOUS: 'Dioecious',
    MONOECIOUS: 'Monoecious',
    GYNODIOECIOUS: 'Gynodioecious',
    SYNOECIOUS: 'Synoecious',
    PERFECT: 'Perfect',
    COMPLETE: 'Complete',
    DICOTYLEDON: 'Dicot',
    MONOCOTYLEDON: 'Monocot',
    CAULIFLORY: 'Cauliflory',
    RAMIFLORY: 'Ramiflory',
    PUBESCENT: 'Pubescent',
    CHAMAEPHYTE: 'Chamaephyte',
    FIBROUS_ROOT_SYSTEM: 'Fibrous root system',
    TAPROOT_SYSTEM: 'Taproot system',
    KIN_SELECTION: 'Kin selection',
    BROADLEAF: 'Broadleaf',
    AERIAL_ROOTS: 'Aerial roots',
    EPICORMIC_ROOTS: 'Epicormic shoots',
    BASAL_ROOTS: 'Basal shoots',
    RUNNER: 'Runner',
    CLIMBER: 'Climber',
    BUTTRESS_ROOT: 'Buttress root',
    MONOPODIAL: 'Monopodial',
    APICAL_DOMINANCE: 'Apical dominance',
    POLYMORPHIC: 'Polymorphic',
    CRYPTIC_SPECIES_COMPLEX: 'Cryptic species complex',
    RHIZOMORPHS: 'Rhizomorphs',
    GEOPHYTE: 'Geophyte',
    RICTAL_BRISTLES: 'Rictal bristles',
    DEHISCENCE: 'Dehiscence',
    EXPLOSIVE_DEHISCENCE: 'Explosive dehiscence',
    RESIN_CANAL: 'Resin canal',
    APOSEMATIC: 'Aposematic'
  },
  climate: {
    HOT: 'Hot',
    DRY: 'Dry',
    TEMPERATE: 'Temperate',
    COOL: 'Cool',
    TROPICAL: 'Tropical',
    CONTINENTAL: 'Continental',
    DROUGHT_TOLERANT: 'Drought-tolerant',
    type: 'climate',
    name: 'climate'
  },
  pollination: {
    ALLOGAMY: 'Allogamy',
    ANEMOPHILY: 'Anemophily',
    HYDROPHILY: 'Hydrophily',
    ENTOMOPHILY: 'Entomophily',
    AMBOPHILY: 'Ambophily',
    MELITTOPHILY: 'Melittophily',
    PSYCHOPHILY: 'Psychophily',
    PHALAENOPHILY: 'Phalaenophily',
    SONICATION: 'Sonication',
    GENERALISED_SYNDROME: 'Generalised syndrome',
    CLEISTOGAMY: 'Cleistogamy'
  },
  stipeCharacter: {
    RING: 'Ring',
    RING_AND_VOLVA: 'ring and volva',
    BARE: 'Bare',
    NA: 'N/A',
    SHORT: 'short',
    STUMPY: 'stumpy',
    CLUB_LIKE: 'Club-like',
    WARTS: 'warts',
    HOLLOW: 'hollow',
    PRUINOSE: 'pruinose',
    PARTIAL_VEIL: 'Partial veil',
    type: 'stipeCharacter',
    name: 'stipe character'
  },
  stemCharacter: {
    HOLLOW: 'hollow',
    TERETE: 'terete',
    HAIRY: 'Hairy',
    GLAUCOUS: 'Glaucous',
    FARINOSE: 'Farinose',
    SCURFY: 'Scurfy',
    VISCOUS: 'Viscous',
    PUNCTATE: 'Punctate',
    PAPILLATE: 'Papillate',
    TUBERCULATE: 'Tuberculate',
    RUGOSE: 'Rugose',
    GLABROUS: 'Glabrous',
    PUBESCENT: 'Pubescent'
  },
  gillAttachment: {
    ADNATE: 'Adnate',
    ADNEXED: 'Adnexed',
    DECURRENT: 'Decurrent',
    EMARGINATE: 'Emarginate',
    FREE: 'Free',
    Seceding: 'Seceding',
    SINUATE: 'Sinuate',
    SUBDECURRENT: 'Subdecurrent',
    NA: 'N/A',
    type: 'gillAttachment',
    name: 'gill attachment'
  },
  grouping: {
    LARGE_GROUPS: 'large groups',
    CLUSTERS: 'clusters',
    LARGE_CLUSTERS: 'large clusters',
    SCATTERED_CLUSTERS: 'scattered clusters',
    FAIRY_RINGS: 'fairy rings',
    GREGARIOUS: 'gregarious',
    NUMEROUS: 'numerous',
    type: 'grouping',
    name: 'grouping'
  },
  propagation: {
    RHIZOMES: 'Rhizomes',
    SEEDS: 'Seeds',
    SUCKERS: 'Suckers',
    STOLONS: 'Stolons',
    BULBS: 'Bulbs',
    TUBERS: 'Tubers',
    CORMS: 'Corms',
    PLANTLETS: 'Plantlets',
    KEIKIS: 'Keikis',
    APOMIXIS: 'Apomixis',
    ROOTS: 'Roots'
  },
  seedDispersal: {
    AUTOCHORY: 'autochory',
    ANEMOCHORY: 'anemochory',
    HYDROCHORY: 'Hydrochory',
    ZOOCHORY: 'Zoochory',
    ANTHROPOCHORY: 'Anthropochory'
  },
  exposure: {
    FULL_SUN: 'Full sun',
    PARTIAL_SUN: 'Partial Sun',
    PARTIAL_SHADE: 'Partial Shade',
    SHADE: 'shade'
  },
  nutType: {
    ACORN: 'acorn',
    HAZELNUT: 'hazelnut',
    CHESTNUT: 'chestnut'
  },
  surface: {
    GLAUCOUS: 'Glaucous',
    FARINOSE: 'Farinose',
    SCURFY: 'Scurfy',
    VISCOUS: 'Viscous',
    PUNCTATE: 'Punctate',
    PAPILLATE: 'Papillate',
    TUBERCULATE: 'Tuberculate',
    RUGOSE: 'Rugose',
    GLABROUS: 'Glabrous',
    PUBESCENT: 'Pubescent',
    TOMENTOSE: 'tomentose'
  },
  texture: {
    LEATHERY: 'Leathery',
    FLESHY: 'Fleshy',
    GLOSSY: 'Glossy',
    WOOLY: 'Wooly',
    TOMENTOSE: 'tomentose',
    SCALY: 'Scaly',
    ROUGH: 'Rough',
    SMOOTH: 'Smooth',
    VELVETY: 'Velvety',
    HAIRY: 'Hairy',
    PUBESCENT: 'Pubescent',
    FEATHERY: 'Feathery'
  },
  treeShape: {
    help: "Which descrption is the best match for this tree?",
    COLUMNAR: 'Columnar',
    OPEN_HEAD_IRREGULAR: 'Open head irregular',
    WEEPING: 'Weeping',
    PYRAMIDAL: 'Pyramidal',
    GLOBE: 'Globe',
    FASTIGIATE: 'Fastigiate',
    VASE: 'Vase',
    HORIZONTAL_SPREADING: 'Horizontal spreading',
    NARROW_DOMED: 'Narrow domed'
  },
  crownShape: {
    OVOID_CONIC: 'Ovoid-conic',
    CONIC: 'Conic',
    DOMED: 'Domed',
    SPIRE_LIKE: 'Spire-like',
    SLENDER: 'Slender'
  },
  barkType: {
    SMOOTH: 'Smooth',
    LENTICELS: 'Lenticels',
    PEELING_STRIPS: 'Peeling strips',
    VERTICAL_CRACK: 'Vertical cracks',
    VERTICAL_STRIPS: 'Vertical strips',
    SCALES: 'Scales',
    PLATES: 'Plates',
    INTERSECTING_RIDGES: 'Intersecting ridges',
    UNINTERRUPTED_RIDGES: 'Uninterrupted ridges',
    RIDGES_BROKEN_HORIZONTALLY: 'Ridges broken horizontally',
    PAPER_LIKE: 'Paper-like',
    SQUARE_CRACKED: 'Square-cracked',
    RESINOUS: 'Resinous',
    THICK: 'Thick'
  },
  coneShape: {
    BARREL_SHAPED: 'Barrel-shaped',
    GLOBULAR: 'Globular'
  },
  leafVenation: {
    ARCUATE: 'Arcuate',
    DICHOTOMOUS: 'Dichotomous',
    LONGITUDINAL: 'Longitudinal',
    PARALLEL: 'Parallel',
    PINNATE: 'Pinnate',
    RETICULATE: 'Reticulate',
    ROTATE: 'Rotate',
    TRANSVERSE: 'Transverse'
  },
  flowerShape: {
    TRUMPET_SHAPED: 'Trumpet-shaped',
    BILABIATE: 'Bilabiate',
    REGULAR: 'Regular',
    ACTINOMORPHIC: 'Actinomorphic',
    ZYGOMORPHIC: 'Zygomorphic'
  },
  branchArrangement: {
    HORIZONTAL: 'Horizontal',
    WHORLS: 'Whorls'
  },
  leafFeatures: {
    BLUNT_TIPS: 'Blunt tips',
    STOMATAL_LINES: 'Stomatal lines',
    DROOPING: 'Drooping'
  },
  leafFolding: {
    CARINATE: 'Carinate',
    CONDUPLICATE: 'Conduplicate',
    CUCULLATE: 'Cucullate',
    INVOLUTE: 'Involute',
    PLICATE: 'Plicate',
    REDUPLICATE: 'Reduplicate',
    REVOLUTE: 'Revolute',
    SUPERVOLUTE: 'Supervolute'
  },
  mushroomGroup: {
    MYCOTROPHS: 'Mycotrophs',
    POLYPORES: 'Polypores',
    BOLETES: 'Boletes',
    PUFFBALLS: 'Puffballs',
    GILLED_MUSHROOMS: 'Gilled Mushrooms',
    CHANTERELLES_AND_TRUMPETS: 'Chanterelles and Trumpets',
    TOOTHED_MUSHROOMS: 'Toothed Mushrooms',
    STINKHORNS: 'Stinkhorns',
    CUP_FUNGI: 'Cup Fungi',
    BIRDS_NEST_FUNGI: 'Bird\'s Nest Fungi',
    TRUE_MORELS_AND_VERPAS: 'True Morels and Verpas',
    FALSE_MORELS: 'False Morels',
    SADDLES: 'Saddles',
    JELLY_FUNGI: 'Jelly Fungi',
    CLUBS_AND_CORALS: 'Clubs and Corals',
    CRUST_FUNGI: 'Crust Fungi'
  }
};

/***/ }),

/***/ "Np9t":
/*!*****************************************!*\
  !*** ./src/admin/collection-builder.js ***!
  \*****************************************/
/*! namespace exports */
/*! exports [not provided] [unused] */
/*! runtime requirements: __webpack_require__, __webpack_require__.n, __webpack_require__.* */
/***/ ((__unused_webpack_module, __unused_webpack___webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony import */ var babel_polyfill__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! babel-polyfill */ "6pDI");
/* harmony import */ var babel_polyfill__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(babel_polyfill__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var admin_scss_materialize_scss__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! admin/scss/materialize.scss */ "xZ2h");
/* harmony import */ var admin_scss_materialize_scss__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(admin_scss_materialize_scss__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var bootstrap_dist_css_bootstrap_min_css__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! bootstrap/dist/css/bootstrap.min.css */ "CZLX");
/* harmony import */ var bootstrap_dist_css_bootstrap_min_css__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(bootstrap_dist_css_bootstrap_min_css__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var bootstrap_js_dist_carousel__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! bootstrap/js/dist/carousel */ "MJou");
/* harmony import */ var bootstrap_js_dist_carousel__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(bootstrap_js_dist_carousel__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var bootstrap_js_dist_modal__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! bootstrap/js/dist/modal */ "pHjO");
/* harmony import */ var bootstrap_js_dist_modal__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(bootstrap_js_dist_modal__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var bootstrap_js_dist_dropdown__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! bootstrap/js/dist/dropdown */ "km6W");
/* harmony import */ var bootstrap_js_dist_dropdown__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(bootstrap_js_dist_dropdown__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var bootstrap_js_dist_collapse__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! bootstrap/js/dist/collapse */ "Ggh4");
/* harmony import */ var bootstrap_js_dist_collapse__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(bootstrap_js_dist_collapse__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var ui_css_snapdragon_colours_css__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ui/css/snapdragon-colours.css */ "QdVK");
/* harmony import */ var ui_css_snapdragon_colours_css__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(ui_css_snapdragon_colours_css__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var admin_css_admin_css__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! admin/css/admin.css */ "KLni");
/* harmony import */ var admin_css_admin_css__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(admin_css_admin_css__WEBPACK_IMPORTED_MODULE_8__);
/* harmony import */ var ui_css_common_css__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ui/css/common.css */ "4zPS");
/* harmony import */ var ui_css_common_css__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(ui_css_common_css__WEBPACK_IMPORTED_MODULE_9__);
/* harmony import */ var admin_scripts_materialize__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! admin/scripts/materialize */ "JuOZ");
/* harmony import */ var admin_screens_species_species_handler__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! admin/screens/species/species-handler */ "uIqE");
/* harmony import */ var admin_screens_traits_handler__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! admin/screens/traits-handler */ "XZFI");
/* harmony import */ var admin_screens_species_add_relationship__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! admin/screens/species/add-relationship */ "D4fB");
/* harmony import */ var admin_screens_species_add_lookalike__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! admin/screens/species/add-lookalike */ "wxAe");
/* harmony import */ var admin_screens_species_add_photos__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! admin/screens/species/add-photos */ "WmCP");
/* harmony import */ var admin_screens_add_taxon__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! admin/screens/add-taxon */ "fAD8");
/* harmony import */ var admin_screens_species_add_id__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! admin/screens/species/add-id */ "cXNG");
/* harmony import */ var admin_screens_collection_edit_collection__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! admin/screens/collection/edit-collection */ "F6ms");
/* harmony import */ var admin_screens_collection_edit_collection_terms__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! admin/screens/collection/edit-collection-terms */ "osIb");
/* harmony import */ var admin_screens_collection_edit_collection_questions__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! admin/screens/collection/edit-collection-questions */ "1ehi");
/* harmony import */ var admin_screens_collection_edit_collection_video__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(/*! admin/screens/collection/edit-collection-video */ "T5Kc");
/* harmony import */ var admin_screens_questions_create_question__WEBPACK_IMPORTED_MODULE_22__ = __webpack_require__(/*! admin/screens/questions/create-question */ "LqE6");
/* harmony import */ var admin_screens_add_term__WEBPACK_IMPORTED_MODULE_23__ = __webpack_require__(/*! admin/screens/add-term */ "evSe");
/* harmony import */ var admin_screens_video_add_video__WEBPACK_IMPORTED_MODULE_24__ = __webpack_require__(/*! admin/screens/video/add-video */ "aBNj");
/* harmony import */ var admin_react_active_taxa__WEBPACK_IMPORTED_MODULE_25__ = __webpack_require__(/*! admin/react/active-taxa */ "e4vr");
Object(function webpackMissingModule() { var e = new Error("Cannot find module 'media-helper'"); e.code = 'MODULE_NOT_FOUND'; throw e; }());
/* harmony import */ var admin_fontawesome_icons__WEBPACK_IMPORTED_MODULE_27__ = __webpack_require__(/*! admin/fontawesome-icons */ "T7EN");
/* harmony import */ var ui_helpers_logging_handler__WEBPACK_IMPORTED_MODULE_28__ = __webpack_require__(/*! ui/helpers/logging-handler */ "XBIT");
/* harmony import */ var firebase_app__WEBPACK_IMPORTED_MODULE_29__ = __webpack_require__(/*! firebase/app */ "+njt");
/* harmony import */ var firebase_app__WEBPACK_IMPORTED_MODULE_29___default = /*#__PURE__*/__webpack_require__.n(firebase_app__WEBPACK_IMPORTED_MODULE_29__);
/* harmony import */ var firebase_auth__WEBPACK_IMPORTED_MODULE_30__ = __webpack_require__(/*! firebase/auth */ "+0Ki");































Object(function webpackMissingModule() { var e = new Error("Cannot find module 'media-helper'"); e.code = 'MODULE_NOT_FOUND'; throw e; }())();
(0,admin_react_active_taxa__WEBPACK_IMPORTED_MODULE_25__.renderActiveTaxa)();
var auth = firebase_app__WEBPACK_IMPORTED_MODULE_29___default().auth();
window.snapdragon = {};
auth.onAuthStateChanged(function (user) {
  if (user) {// snapLog('auth.onAuthStateChanged', user);
  } else {// snapLog('auth.onAuthStateChanged: logged out');
    }

  setupUI(user);
});
var loggedOutLinks = document.querySelectorAll('.logged-out');
var loggedInLinks = document.querySelectorAll('.logged-in');
var links = document.querySelectorAll('li');
links.forEach(function (link) {
  link.addEventListener('click', function (e) {
    links.forEach(function (li) {
      return li.classList.remove('active');
    });
    e.target.parentElement.classList.add('active');
  });
});
var addSpecies = document.querySelector('#add-species');
addSpecies.addEventListener('click', admin_screens_species_species_handler__WEBPACK_IMPORTED_MODULE_11__.speciesHandler.addSpecies);

var updateSpeciesClickHandler = function updateSpeciesClickHandler(e) {
  admin_screens_species_species_handler__WEBPACK_IMPORTED_MODULE_11__.speciesHandler.updateSpecies();
};

var updateSpeciesNamesClickHandler = function updateSpeciesNamesClickHandler(e) {
  admin_screens_species_species_handler__WEBPACK_IMPORTED_MODULE_11__.speciesHandler.updateSpeciesNames();
};

var addTraitsClickHandler = function addTraitsClickHandler(e) {
  admin_screens_traits_handler__WEBPACK_IMPORTED_MODULE_12__.traitsHandler.addTraits();
};

var updateSpecies = document.querySelector('#update-species');
updateSpecies.addEventListener('click', updateSpeciesClickHandler);
var updateNames = document.querySelector('#update-names');
updateNames.addEventListener('click', updateSpeciesNamesClickHandler);
var addTraits = document.querySelector('#add-traits');
addTraits.addEventListener('click', addTraitsClickHandler);
var addRelationshipParent = document.querySelector('#add-relationship');
addRelationshipParent.addEventListener('click', admin_screens_species_add_relationship__WEBPACK_IMPORTED_MODULE_13__.addRelationship);
var addLookalikeParent = document.querySelector('#add-lookalike');
addLookalikeParent.addEventListener('click', admin_screens_species_add_lookalike__WEBPACK_IMPORTED_MODULE_14__.addLookalike);
var addPhotosTab = document.querySelector('#add-photos');
addPhotosTab.addEventListener('click', admin_screens_species_add_photos__WEBPACK_IMPORTED_MODULE_15__.addPhotos);
var addTaxonTab = document.querySelector('#add-taxon');
addTaxonTab.addEventListener('click', admin_screens_add_taxon__WEBPACK_IMPORTED_MODULE_16__.addTaxon);
var addIdTab = document.querySelector('#add-id');
addIdTab.addEventListener('click', admin_screens_species_add_id__WEBPACK_IMPORTED_MODULE_17__.addId);
var editCollectionTab = document.querySelector('#edit-collection');
editCollectionTab.addEventListener('click', admin_screens_collection_edit_collection__WEBPACK_IMPORTED_MODULE_18__.editCollection);
var editCollectionTermsTab = document.querySelector('#edit-collection-terms');
editCollectionTermsTab.addEventListener('click', admin_screens_collection_edit_collection_terms__WEBPACK_IMPORTED_MODULE_19__.editCollectionTerms);
var editCollectionQuestionsTab = document.querySelector('#edit-collection-questions');
editCollectionQuestionsTab.addEventListener('click', admin_screens_collection_edit_collection_questions__WEBPACK_IMPORTED_MODULE_20__.editCollectionQuestions);
var editCollectionVideoTab = document.querySelector('#edit-collection-video');
editCollectionVideoTab.addEventListener('click', admin_screens_collection_edit_collection_video__WEBPACK_IMPORTED_MODULE_21__.editCollectionVideo);
var createQuestionTab = document.querySelector('#create-question');
createQuestionTab.addEventListener('click', admin_screens_questions_create_question__WEBPACK_IMPORTED_MODULE_22__.createQuestion);
var addTermTab = document.querySelector('#add-term');
addTermTab.addEventListener('click', admin_screens_add_term__WEBPACK_IMPORTED_MODULE_23__.addTerm);
var addVideoTab = document.querySelector('#add-video');
addVideoTab.addEventListener('click', admin_screens_video_add_video__WEBPACK_IMPORTED_MODULE_24__.addVideo);

var setupUI = function setupUI(user) {
  if (user) {
    loggedInLinks.forEach(function (item) {
      return item.classList.remove('hide');
    });
    loggedOutLinks.forEach(function (item) {
      return item.classList.add('hide');
    });
    addVideoTab.click();
  } else {
    loggedInLinks.forEach(function (item) {
      return item.classList.add('hide');
    });
    loggedOutLinks.forEach(function (item) {
      return item.classList.remove('hide');
    });
  }
};

var loginForm = document.querySelector('#login-form');
loginForm.addEventListener('submit', function (e) {
  e.preventDefault();
  var email = loginForm['login-email'].value;
  var password = loginForm['login-password'].value;
  auth.signInWithEmailAndPassword(email, password).then(function (cred) {
    var modal = document.querySelector('#modal-login');
    M.Modal.getInstance(modal).close();
    loginForm.reset();
  });
});
var logout = document.querySelector('#logout');
logout.addEventListener('click', function (e) {
  e.preventDefault();
  auth.signOut();
});
(0,admin_scripts_materialize__WEBPACK_IMPORTED_MODULE_10__.initMaterialize)();
var elems = document.querySelectorAll('.dropdown-trigger');
if (elems) M.Dropdown.init(elems, {});
window.snapLog = ui_helpers_logging_handler__WEBPACK_IMPORTED_MODULE_28__.snapLog;
window.logError = ui_helpers_logging_handler__WEBPACK_IMPORTED_MODULE_28__.logError;
window.logAPIError = ui_helpers_logging_handler__WEBPACK_IMPORTED_MODULE_28__.logAPIError;

/***/ }),

/***/ "T7EN":
/*!****************************************!*\
  !*** ./src/admin/fontawesome-icons.js ***!
  \****************************************/
/*! namespace exports */
/*! export imports [provided] [unused] [could be renamed] */
/*! other exports [not provided] [unused] */
/*! runtime requirements: __webpack_require__, __webpack_exports__, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* unused harmony export imports */
/* harmony import */ var _fortawesome_fontawesome_svg_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @fortawesome/fontawesome-svg-core */ "KSeO");
/* harmony import */ var _fortawesome_free_solid_svg_icons__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @fortawesome/free-solid-svg-icons */ "3xlM");

 // fas

 // fas

 // far

 // fab
// https://fontawesome.com/v5.9.0/how-to-use/with-the-api/setup/library/

_fortawesome_fontawesome_svg_core__WEBPACK_IMPORTED_MODULE_0__.library.add( // faBookOpen, faLanguage, faEnvelope, faUserSlash, faUserCheck, faCog, faChevronDown, faGlasses, faDove, faFrog, faPaw, faBug, faLeaf, faRegistered, faBarcode, faSun, faChevronUp, faChalkboard, faTimes, faTimesCircle, faCheck, faExternalLinkAlt, faExclamation, faClone, faCopyright, faSlidersH, faUndo,
// faArrowAltCircleLeft, faArrowAltCircleRight, faRegisteredFar,
// faYoutube,
_fortawesome_free_solid_svg_icons__WEBPACK_IMPORTED_MODULE_1__.faPlus, _fortawesome_free_solid_svg_icons__WEBPACK_IMPORTED_MODULE_1__.faEdit, _fortawesome_free_solid_svg_icons__WEBPACK_IMPORTED_MODULE_1__.faUser, _fortawesome_free_solid_svg_icons__WEBPACK_IMPORTED_MODULE_1__.faTrash);
_fortawesome_fontawesome_svg_core__WEBPACK_IMPORTED_MODULE_0__.dom.watch();
var imports = function imports() {};

/***/ }),

/***/ "B2La":
/*!******************************!*\
  !*** ./src/admin/helpers.js ***!
  \******************************/
/*! namespace exports */
/*! export helpers [provided] [used] [could be renamed] */
/*! other exports [not provided] [unused] */
/*! runtime requirements: __webpack_require__, __webpack_exports__, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "helpers": () => /* binding */ helpers
/* harmony export */ });
/* harmony import */ var ramda__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ramda */ "pWpQ");
/* harmony import */ var utils_utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! utils/utils */ "EHpu");
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {
  try {
    var info = gen[key](arg);
    var value = info.value;
  } catch (error) {
    reject(error);
    return;
  }

  if (info.done) {
    resolve(value);
  } else {
    Promise.resolve(value).then(_next, _throw);
  }
}

function _asyncToGenerator(fn) {
  return function () {
    var self = this,
        args = arguments;
    return new Promise(function (resolve, reject) {
      var gen = fn.apply(self, args);

      function _next(value) {
        asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);
      }

      function _throw(err) {
        asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);
      }

      _next(undefined);
    });
  };
}

function _toConsumableArray(arr) {
  return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread();
}

function _nonIterableSpread() {
  throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}

function _unsupportedIterableToArray(o, minLen) {
  if (!o) return;
  if (typeof o === "string") return _arrayLikeToArray(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor) n = o.constructor.name;
  if (n === "Map" || n === "Set") return Array.from(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
}

function _iterableToArray(iter) {
  if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter);
}

function _arrayWithoutHoles(arr) {
  if (Array.isArray(arr)) return _arrayLikeToArray(arr);
}

function _arrayLikeToArray(arr, len) {
  if (len == null || len > arr.length) len = arr.length;

  for (var i = 0, arr2 = new Array(len); i < len; i++) {
    arr2[i] = arr[i];
  }

  return arr2;
}




var parseNames = function parseNames(names, languages) {
  if (!names) return [];
  var parsedNames = names.filter(function (item) {
    return (0,ramda__WEBPACK_IMPORTED_MODULE_1__.default)(item.language, languages);
  });
  parsedNames = parsedNames.map(function (name) {
    return {
      language: name.language,
      vernacularName: name.vernacularName.toLowerCase()
    };
  });

  var uniqueParsedNames = _toConsumableArray(new Set(parsedNames.map(function (name) {
    return name.vernacularName;
  }))); // distinct names


  var uniqueNames = uniqueParsedNames.map(function (name) {
    var obj = {
      vernacularName: name,
      language: parsedNames.find(function (n) {
        return n.vernacularName === name;
      }).language
    };
    return obj;
  });
  uniqueNames.forEach(function (name) {
    name.vernacularName = utils_utils__WEBPACK_IMPORTED_MODULE_0__.utils.capitaliseFirst(name.vernacularName);
  });
  return uniqueNames;
};

var flatten = function flatten(array) {
  var flattenedArray = array.reduce(function (accumulator, currentValue) {
    return accumulator.concat(currentValue);
  }, []);
  return flattenedArray;
};

var getBinomial = function getBinomial(item) {
  if (!item.name) return;
  if (!item.name.length > 0) return;
  var taxa = item.name.split(' ');
  var binomial = "".concat(taxa[0], " ").concat(taxa[1] || '');
  return binomial;
};

var getImagesLayout = function getImagesLayout(species, imageIds) {
  var addPrefix = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;
  var container = document.querySelector('.js-images-container');
  if (container) container.classList.remove('hide-important');
  var images = '';

  if (!species.images) {}

  ;
  species.images.forEach(function (image, index) {
    var prefix = image.provider === 'inat' ? 'https://static.inaturalist.org/photos/' : 'https://content.eol.org/data/media/';
    prefix = addPrefix ? prefix : '';
    var url = image.provider === 'inat' ? image.url : image.url.replace('.jpg', '.260x190.jpg');
    url = prefix + url;
    images = images + "<div><img id=\"".concat(index, "\" width=\"260px\" height=\"190px\" style=\"cursor:pointer; object-fit: cover;\" src=\"").concat(url, "\"/></div>");
  });
  document.querySelector('#js-images').innerHTML = images; // const savedImages = document.querySelector('.imageIds');

  document.querySelectorAll('img').forEach(function (image) {
    image.addEventListener('click', function (event) {
      var image = event.target;
      var imageId = parseInt(event.target.id);
      var index = imageIds.indexOf(imageId);

      if (index > -1) {
        image.style.filter = 'saturate(100%)';
        image.style.opacity = 1;
        imageIds.splice(index, 1);
      } else {
        image.style.filter = 'saturate(10%)';
        image.style.opacity = .3;
        imageIds.push(imageId);
      }
    });
  });
};

var loadInatCollection = function loadInatCollection(inat, itis, eol, parseSpeciesData, gbif, inatItems) {
  inat.getInatObservations().then(function (observations) {
    observations.filter(function (i) {
      return i.taxon;
    }).forEach(function (observation) {
      inat.getInatImages(observation).then(function (photos) {
        var images = [];

        if (photos.results) {
          images = flatten(photos.results.map(function (result) {
            return result.photos;
          }));
        }

        var item = {
          id: observation.taxon.id,
          name: observation.taxon.name,
          images: images,
          names: {
            vernacularName: observation.taxon.preferred_common_name,
            language: 'en'
          }
        };
        itis.binomialLookup(item.name).then(function (response) {
          if (response.scientificNames[0] === null) {
            return;
          }

          var itisId = response.scientificNames[0].tsn;
          eol.searchEOLByProvider(903, itisId).then(function (response) {
            if (response.length === 0) {
              return;
            }

            var eolId = response[0].eol_page_id;
            parseSpeciesData({
              detailsUrl: speciesUrl(eolId)
            }).then(function (data) {
              var binomial = getBinomial(item);
              gbif.getTaxonomy(binomial).then(function (taxonomy) {
                data.taxonomy = {
                  kingdom: taxonomy.kingdom,
                  phylum: taxonomy.phylum,
                  "class": taxonomy["class"],
                  order: taxonomy.order,
                  genus: taxonomy.genus,
                  family: taxonomy.family
                };
                data.eolName = item.name;
                data.name = binomial;
                data.images = [].concat(_toConsumableArray(data.images), _toConsumableArray(item.images));
                inatItems.push(data);
              });
            });
          });
        });
      });
    });
  });
};

var parseSpeciesData = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(item) {
    var languages, response, json, taxonConcept, taxon, imagesCollection, namesCollection;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            languages = ['en', 'pt', 'es', 'de', 'fr', 'it', 'eng'];
            _context.next = 3;
            return fetch(item.detailsUrl);

          case 3:
            response = _context.sent;
            _context.next = 6;
            return response.json();

          case 6:
            json = _context.sent;
            taxonConcept = json.taxonConcept;

            if (json.taxonConcept) {
              _context.next = 10;
              break;
            }

            return _context.abrupt("return");

          case 10:
            taxon = taxonConcept.dataObjects ? taxonConcept : taxonConcept.taxonConcepts[0];
            imagesCollection = taxon.dataObjects ? taxon.dataObjects.filter(function (item) {
              return item.mediaURL || item.eolMediaURL;
            }).map(function (media) {
              return {
                title: media.title,
                // as original title
                rightsHolder: media.rightsHolder || '',
                source: media.source,
                license: media.license,
                url: media.eolMediaURL,
                photographer: media.agents.find(function (agent) {
                  return agent.role === 'photographer';
                }),
                provider: media.provider || ''
              };
            }) : [];
            namesCollection = helpers.parseNames(taxon.vernacularNames, languages);
            return _context.abrupt("return", {
              id: item.id,
              name: taxon.scientificName,
              images: imagesCollection,
              names: namesCollection
            });

          case 14:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, this);
  }));

  return function parseSpeciesData(_x) {
    return _ref.apply(this, arguments);
  };
}();

var helpers = {
  parseNames: parseNames,
  flatten: flatten,
  getBinomial: getBinomial,
  getImagesLayout: getImagesLayout,
  loadInatCollection: loadInatCollection,
  parseSpeciesData: parseSpeciesData
};

/***/ }),

/***/ "e4vr":
/*!****************************************!*\
  !*** ./src/admin/react/active-taxa.js ***!
  \****************************************/
/*! namespace exports */
/*! export renderActiveTaxa [provided] [used] [could be renamed] */
/*! other exports [not provided] [unused] */
/*! runtime requirements: __webpack_require__, __webpack_require__.n, __webpack_exports__, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "renderActiveTaxa": () => /* binding */ renderActiveTaxa
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "smZu");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_dom__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-dom */ "37TQ");
/* harmony import */ var react_dom__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react_dom__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var ui_helpers_data_checking__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ui/helpers/data-checking */ "XTkL");
var _this = undefined,
    _jsxFileName = "/Users/danminimac/code/snapdragon-redux/src/admin/react/active-taxa.js";

function _slicedToArray(arr, i) {
  return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();
}

function _nonIterableRest() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}

function _unsupportedIterableToArray(o, minLen) {
  if (!o) return;
  if (typeof o === "string") return _arrayLikeToArray(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor) n = o.constructor.name;
  if (n === "Map" || n === "Set") return Array.from(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
}

function _arrayLikeToArray(arr, len) {
  if (len == null || len > arr.length) len = arr.length;

  for (var i = 0, arr2 = new Array(len); i < len; i++) {
    arr2[i] = arr[i];
  }

  return arr2;
}

function _iterableToArrayLimit(arr, i) {
  if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return;
  var _arr = [];
  var _n = true;
  var _d = false;
  var _e = undefined;

  try {
    for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
      _arr.push(_s.value);

      if (i && _arr.length === i) break;
    }
  } catch (err) {
    _d = true;
    _e = err;
  } finally {
    try {
      if (!_n && _i["return"] != null) _i["return"]();
    } finally {
      if (_d) throw _e;
    }
  }

  return _arr;
}

function _arrayWithHoles(arr) {
  if (Array.isArray(arr)) return arr;
}




var renderActiveTaxa = function renderActiveTaxa() {
  var PLACE_HOLDER = '--- ----';

  var displaySpecies = function displaySpecies(species) {
    return !!species.vernacularName ? "".concat(species.name, " (").concat(species.vernacularName, ")") : species.name === PLACE_HOLDER ? PLACE_HOLDER : "".concat(species.name, " (").concat(ui_helpers_data_checking__WEBPACK_IMPORTED_MODULE_2__.itemProperties.getVernacularName(species, {
      language: 'en'
    }), ")");
  };

  var Active = function Active(_ref) {
    var label = _ref.label,
        children = _ref.children;
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
      __self: _this,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 18,
        columnNumber: 41
      }
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("span", {
      __self: _this,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 18,
        columnNumber: 46
      }
    }, label, ":"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("span", {
      className: "feedback",
      __self: _this,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 18,
        columnNumber: 67
      }
    }, children));
  };

  var ActiveSpecies = function ActiveSpecies() {
    var _useState = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)({
      name: PLACE_HOLDER
    }),
        _useState2 = _slicedToArray(_useState, 2),
        species = _useState2[0],
        setSpecies = _useState2[1];

    (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(function () {
      var updateHandler = function updateHandler(e) {
        if (window.snapdragon.species) {
          setSpecies(window.snapdragon.species);
        }
      };

      window.addEventListener('click', updateHandler, false);
      window.addEventListener('keyup', function (event) {
        if (event.key === 'Enter') {
          setTimeout(function () {
            updateHandler();
          }, 500);
        }
      });
    }, [species]);
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(Active, {
      label: "Active Species",
      __self: _this,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 41,
        columnNumber: 7
      }
    }, displaySpecies(species));
  };

  var ActiveCollection = function ActiveCollection() {
    var _useState3 = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)({
      name: PLACE_HOLDER
    }),
        _useState4 = _slicedToArray(_useState3, 2),
        collection = _useState4[0],
        setCollection = _useState4[1];

    (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(function () {
      var updateHandler = function updateHandler(e) {
        if (window.snapdragon.collection) {
          setCollection(window.snapdragon.collection);
        }
      };

      window.addEventListener('click', updateHandler, false);
      window.addEventListener('keyup', function (event) {
        if (event.key === 'Enter') {
          setTimeout(function () {
            updateHandler();
          }, 500);
        }
      });
    });
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(Active, {
      label: "Active Collection",
      __self: _this,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 67,
        columnNumber: 7
      }
    }, collection.name);
  };

  var activeSpeciesDisplay = document.querySelector('#activeSpeciesDisplay');
  react_dom__WEBPACK_IMPORTED_MODULE_1___default().render( /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(ActiveSpecies, {
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 73,
      columnNumber: 19
    }
  }), activeSpeciesDisplay);
  var activeCollectionDisplay = document.querySelector('#activeCollectionDisplay');
  react_dom__WEBPACK_IMPORTED_MODULE_1___default().render( /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(ActiveCollection, {
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 76,
      columnNumber: 19
    }
  }), activeCollectionDisplay);
};

/***/ }),

/***/ "KZDP":
/*!***********************************************!*\
  !*** ./src/admin/react/snap-html-elements.js ***!
  \***********************************************/
/*! namespace exports */
/*! export SnapButton [provided] [unused] [could be renamed] */
/*! export SnapCheckbox [provided] [unused] [could be renamed] */
/*! export SnapIconImage [provided] [unused] [could be renamed] */
/*! export SnapInput [provided] [used] [could be renamed] */
/*! export SnapLink [provided] [unused] [could be renamed] */
/*! export SnapRow [provided] [unused] [could be renamed] */
/*! export SnapSelect [provided] [unused] [could be renamed] */
/*! other exports [not provided] [unused] */
/*! runtime requirements: __webpack_require__, __webpack_require__.n, __webpack_exports__, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "SnapInput": () => /* binding */ SnapInput
/* harmony export */ });
/* unused harmony exports SnapRow, SnapButton, SnapLink, SnapIconImage, SnapCheckbox, SnapSelect */
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "smZu");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var classNames__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! classNames */ "HfUA");
/* harmony import */ var classNames__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(classNames__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var formik__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! formik */ "+zDG");
/* harmony import */ var _emotion_styled__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @emotion/styled */ "ELX7");
var _this = undefined,
    _jsxFileName = "/Users/danminimac/code/snapdragon-redux/src/admin/react/snap-html-elements.js";

function ownKeys(object, enumerableOnly) {
  var keys = Object.keys(object);

  if (Object.getOwnPropertySymbols) {
    var symbols = Object.getOwnPropertySymbols(object);
    if (enumerableOnly) symbols = symbols.filter(function (sym) {
      return Object.getOwnPropertyDescriptor(object, sym).enumerable;
    });
    keys.push.apply(keys, symbols);
  }

  return keys;
}

function _objectSpread(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i] != null ? arguments[i] : {};

    if (i % 2) {
      ownKeys(Object(source), true).forEach(function (key) {
        _defineProperty(target, key, source[key]);
      });
    } else if (Object.getOwnPropertyDescriptors) {
      Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
    } else {
      ownKeys(Object(source)).forEach(function (key) {
        Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
      });
    }
  }

  return target;
}

function _slicedToArray(arr, i) {
  return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();
}

function _nonIterableRest() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}

function _unsupportedIterableToArray(o, minLen) {
  if (!o) return;
  if (typeof o === "string") return _arrayLikeToArray(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor) n = o.constructor.name;
  if (n === "Map" || n === "Set") return Array.from(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
}

function _arrayLikeToArray(arr, len) {
  if (len == null || len > arr.length) len = arr.length;

  for (var i = 0, arr2 = new Array(len); i < len; i++) {
    arr2[i] = arr[i];
  }

  return arr2;
}

function _iterableToArrayLimit(arr, i) {
  if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return;
  var _arr = [];
  var _n = true;
  var _d = false;
  var _e = undefined;

  try {
    for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
      _arr.push(_s.value);

      if (i && _arr.length === i) break;
    }
  } catch (err) {
    _d = true;
    _e = err;
  } finally {
    try {
      if (!_n && _i["return"] != null) _i["return"]();
    } finally {
      if (_d) throw _e;
    }
  }

  return _arr;
}

function _arrayWithHoles(arr) {
  if (Array.isArray(arr)) return arr;
}

function _objectWithoutProperties(source, excluded) {
  if (source == null) return {};

  var target = _objectWithoutPropertiesLoose(source, excluded);

  var key, i;

  if (Object.getOwnPropertySymbols) {
    var sourceSymbolKeys = Object.getOwnPropertySymbols(source);

    for (i = 0; i < sourceSymbolKeys.length; i++) {
      key = sourceSymbolKeys[i];
      if (excluded.indexOf(key) >= 0) continue;
      if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue;
      target[key] = source[key];
    }
  }

  return target;
}

function _objectWithoutPropertiesLoose(source, excluded) {
  if (source == null) return {};
  var target = {};
  var sourceKeys = Object.keys(source);
  var key, i;

  for (i = 0; i < sourceKeys.length; i++) {
    key = sourceKeys[i];
    if (excluded.indexOf(key) >= 0) continue;
    target[key] = source[key];
  }

  return target;
}

function _templateObject3() {
  var data = _taggedTemplateLiteral(["\n//  color: red;\n"]);

  _templateObject3 = function _templateObject3() {
    return data;
  };

  return data;
}

function _templateObject2() {
  var data = _taggedTemplateLiteral(["\n  /** ... * /\n"]);

  _templateObject2 = function _templateObject2() {
    return data;
  };

  return data;
}

function _templateObject() {
  var data = _taggedTemplateLiteral(["\n  /** ... * /\n"]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

function _taggedTemplateLiteral(strings, raw) {
  if (!raw) {
    raw = strings.slice(0);
  }

  return Object.freeze(Object.defineProperties(strings, {
    raw: {
      value: Object.freeze(raw)
    }
  }));
}

function _extends() {
  _extends = Object.assign || function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];

      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }

    return target;
  };

  return _extends.apply(this, arguments);
}

function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
}





var SnapRow = function SnapRow(props) {
  return /*#__PURE__*/React.createElement("div", {
    className: 'rows ' + props.className,
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 9,
      columnNumber: 3
    }
  }, props.children);
}; // export const SnapInput = props => {
//   return (
//     <div className="input-field col">
//       <input id={props.id} type="text" placeholder={props.placeholder} spellCheck="false" value={props.value} onChange={props.onChange} />            
//       <label className="active capitalise" htmlFor={props.id}>{props.label}</label>
//     </div>);
// }

var SnapButton = function SnapButton(props) {
  var _classNames;

  var btnClass = classNames((_classNames = {}, _defineProperty(_classNames, props.className, true), _defineProperty(_classNames, "btn", true), _defineProperty(_classNames, props.nonsense, props.nonsense), _classNames));
  return /*#__PURE__*/React.createElement(Button, _extends({
    type: props.type,
    disabled: props.disabled,
    className: btnClass,
    color: "primary",
    variant: "contained"
  }, props, {
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 25,
      columnNumber: 3
    }
  }), props.value);
};
var SnapLink = function SnapLink(props) {
  return /*#__PURE__*/React.createElement("div", {
    className: 'underline-link ' + props.className,
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 29,
      columnNumber: 3
    }
  }, props.value);
};
var SnapIconImage = function SnapIconImage(props) {
  var imgClass = classNames(_defineProperty({}, props.className, true));
  return /*#__PURE__*/React.createElement("img", {
    className: imgClass,
    width: "48px",
    height: "48px",
    src: props.src,
    alt: props.name,
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 35,
      columnNumber: 5
    }
  });
}; // Styled components ....

var StyledSelect = _emotion_styled__WEBPACK_IMPORTED_MODULE_3__.default.select(_templateObject());
var StyledErrorMessage = _emotion_styled__WEBPACK_IMPORTED_MODULE_3__.default.div(_templateObject2());
var StyledLabel = _emotion_styled__WEBPACK_IMPORTED_MODULE_3__.default.label(_templateObject3());
var SnapInput = function SnapInput(_ref) {
  var label = _ref.label,
      props = _objectWithoutProperties(_ref, ["label"]); // useField() returns [formik.getFieldProps(), formik.getFieldMeta()]
  // which we can spread on <input> and also replace ErrorMessage entirely.


  var _useField = (0,formik__WEBPACK_IMPORTED_MODULE_2__.useField)(props),
      _useField2 = _slicedToArray(_useField, 2),
      field = _useField2[0],
      meta = _useField2[1];

  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement((react__WEBPACK_IMPORTED_MODULE_0___default().Fragment), null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(StyledLabel, {
    htmlFor: props.id || props.name,
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 59,
      columnNumber: 7
    }
  }, label), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("input", _extends({
    className: "text-input"
  }, field, props, {
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 60,
      columnNumber: 7
    }
  })), meta.touched && meta.error ? /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "error",
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 62,
      columnNumber: 9
    }
  }, meta.error) : null);
};
var SnapCheckbox = function SnapCheckbox(_ref2) {
  var children = _ref2.children,
      props = _objectWithoutProperties(_ref2, ["children"]); // We need to tell useField what type of input this is
  // since React treats radios and checkboxes differently
  // than inputs/select/textarea.


  var _useField3 = useField(_objectSpread(_objectSpread({}, props), {}, {
    type: 'checkbox'
  })),
      _useField4 = _slicedToArray(_useField3, 2),
      field = _useField4[0],
      meta = _useField4[1];

  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("label", {
    className: "checkbox",
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 75,
      columnNumber: 7
    }
  }, /*#__PURE__*/React.createElement("input", _extends({
    type: "checkbox"
  }, field, props, {
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 76,
      columnNumber: 9
    }
  })), children), meta.touched && meta.error ? /*#__PURE__*/React.createElement("div", {
    className: "error",
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 80,
      columnNumber: 9
    }
  }, meta.error) : null);
};
var SnapSelect = function SnapSelect(_ref3) {
  var label = _ref3.label,
      props = _objectWithoutProperties(_ref3, ["label"]);

  var _useField5 = useField(props),
      _useField6 = _slicedToArray(_useField5, 2),
      field = _useField6[0],
      meta = _useField6[1];

  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(StyledLabel, {
    htmlFor: props.id || props.name,
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 90,
      columnNumber: 7
    }
  }, label), /*#__PURE__*/React.createElement(StyledSelect, _extends({}, field, props, {
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 91,
      columnNumber: 7
    }
  })), meta.touched && meta.error ? /*#__PURE__*/React.createElement(StyledErrorMessage, {
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 93,
      columnNumber: 9
    }
  }, meta.error) : null);
};

/***/ }),

/***/ "LYHH":
/*!***************************************!*\
  !*** ./src/admin/react/snap-theme.js ***!
  \***************************************/
/*! namespace exports */
/*! export theme [provided] [used] [could be renamed] */
/*! other exports [not provided] [unused] */
/*! runtime requirements: __webpack_require__, __webpack_exports__, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "theme": () => /* binding */ theme
/* harmony export */ });
/* harmony import */ var _material_ui_core_styles__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @material-ui/core/styles */ "jB4R");

var snapdragonStyles = window.getComputedStyle(document.documentElement);

var getPropertyValue = function getPropertyValue(property) {
  var value = snapdragonStyles.getPropertyValue(property);
  return value.trim();
};

var theme = (0,_material_ui_core_styles__WEBPACK_IMPORTED_MODULE_0__.default)({
  palette: {
    primary: {
      light: getPropertyValue('--snap-button-light'),
      main: getPropertyValue('--snap-button-main'),
      dark: getPropertyValue('--snap-button-dark')
    }
  }
});

/***/ }),

/***/ "fAD8":
/*!****************************************!*\
  !*** ./src/admin/screens/add-taxon.js ***!
  \****************************************/
/*! namespace exports */
/*! export addTaxon [provided] [used] [could be renamed] */
/*! other exports [not provided] [unused] */
/*! runtime requirements: __webpack_require__, __webpack_require__.n, __webpack_exports__, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "addTaxon": () => /* binding */ addTaxon
/* harmony export */ });
/* harmony import */ var autocompleter__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! autocompleter */ "B89K");
/* harmony import */ var autocompleter__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(autocompleter__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var api_firebase_firestore__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! api/firebase/firestore */ "xWjd");
/* harmony import */ var ui_helpers_templating__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ui/helpers/templating */ "xNSC");
/* harmony import */ var admin_screens_add_taxon_template_html__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! admin/screens/add-taxon-template.html */ "Qvir");
/* harmony import */ var admin_screens_add_taxon_template_html__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(admin_screens_add_taxon_template_html__WEBPACK_IMPORTED_MODULE_3__);
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {
  try {
    var info = gen[key](arg);
    var value = info.value;
  } catch (error) {
    reject(error);
    return;
  }

  if (info.done) {
    resolve(value);
  } else {
    Promise.resolve(value).then(_next, _throw);
  }
}

function _asyncToGenerator(fn) {
  return function () {
    var self = this,
        args = arguments;
    return new Promise(function (resolve, reject) {
      var gen = fn.apply(self, args);

      function _next(value) {
        asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);
      }

      function _throw(err) {
        asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);
      }

      _next(undefined);
    });
  };
}





var addTaxon = function addTaxon() {
  var init = /*#__PURE__*/function () {
    var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
      var template, parent, inputTaxonRank, options, taxonLatinName, taxonVernacularName, generaCount, speciesCount, taxonSummary, taxonIdentification, btnAddTaxon;
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              template = document.createElement('template');
              template.innerHTML = (admin_screens_add_taxon_template_html__WEBPACK_IMPORTED_MODULE_3___default());
              parent = document.querySelector('#content-container');
              parent.innerHTML = '';
              (0,ui_helpers_templating__WEBPACK_IMPORTED_MODULE_2__.renderTemplate)({}, template.content, parent);
              M.updateTextFields();
              inputTaxonRank = document.querySelector('#input-taxon-rank');
              inputTaxonRank.focus();
              options = [{
                label: 'class',
                value: 'class'
              }, {
                label: 'order',
                value: 'order'
              }, {
                label: 'family',
                value: 'family'
              }, {
                label: 'genus',
                value: 'genus'
              }];
              autocompleter__WEBPACK_IMPORTED_MODULE_0___default()({
                input: inputTaxonRank,
                fetch: function fetch(text, update) {
                  text = text.toLowerCase();
                  var suggestions = options.filter(function (n) {
                    return n.value.toLowerCase().startsWith(text);
                  });
                  update(suggestions);
                },
                onSelect: function onSelect(item) {
                  inputTaxonRank.value = item.label;
                },
                minLength: 0,
                debounceWaitMs: 200,
                className: 'autocomplete-options-container'
              });
              taxonLatinName = document.querySelector('#input-taxon-latin-name');
              taxonVernacularName = document.querySelector('#input-taxon-vernacular-name');
              generaCount = document.querySelector('#input-genera-count');
              speciesCount = document.querySelector('#input-species-count');
              taxonSummary = document.querySelector('#input-taxon-summary');
              taxonIdentification = document.querySelector('#input-taxon-identification');
              btnAddTaxon = document.querySelector('.btnAddTaxon');
              btnAddTaxon.addEventListener('click', function (e) {
                var rank = inputTaxonRank.value;
                var name = taxonLatinName.value;
                var vernacularNames = [taxonVernacularName.value];
                var names = [{
                  language: 'en',
                  names: vernacularNames
                }];
                var summary = taxonSummary.value;
                var identification = taxonIdentification.value; // const descriptions = [
                //     {
                //         language: 'en',
                //         summary,
                //         identification
                //     }
                // ];

                var taxon = {
                  taxon: rank,
                  name: name,
                  names: names,
                  summary: summary,
                  identification: identification
                };
                var genera = generaCount.value;
                var species = speciesCount.value;
                if (genera) taxon.genera = genera;
                if (species) taxon.species = species;
                var savedText = document.querySelector('.js-saved');
                var response = api_firebase_firestore__WEBPACK_IMPORTED_MODULE_1__.firestore.addTaxon({
                  taxon: taxon
                }).then(function (resolve) {
                  savedText.innerHTML = resolve;
                  savedText.classList.remove('hide');
                });
              });

            case 18:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, this);
    }));

    return function init() {
      return _ref.apply(this, arguments);
    };
  }();

  init();
};

/***/ }),

/***/ "evSe":
/*!***************************************!*\
  !*** ./src/admin/screens/add-term.js ***!
  \***************************************/
/*! namespace exports */
/*! export addTerm [provided] [used] [could be renamed] */
/*! other exports [not provided] [unused] */
/*! runtime requirements: __webpack_require__, __webpack_require__.n, __webpack_exports__, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "addTerm": () => /* binding */ addTerm
/* harmony export */ });
/* harmony import */ var autocompleter__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! autocompleter */ "B89K");
/* harmony import */ var autocompleter__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(autocompleter__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "smZu");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react_dom__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react-dom */ "37TQ");
/* harmony import */ var react_dom__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react_dom__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var react_error_boundary__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! react-error-boundary */ "1/UI");
/* harmony import */ var react_error_boundary__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(react_error_boundary__WEBPACK_IMPORTED_MODULE_8__);
/* harmony import */ var utils_utils__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! utils/utils */ "EHpu");
/* harmony import */ var api_firebase_firestore__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! api/firebase/firestore */ "xWjd");
/* harmony import */ var ui_helpers_templating__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ui/helpers/templating */ "xNSC");
/* harmony import */ var admin_screens_collection_collection_picker__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! admin/screens/collection/collection-picker */ "J9j8");
/* harmony import */ var admin_screens_add_term_template_html__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! admin/screens/add-term-template.html */ "VNJ0");
/* harmony import */ var admin_screens_add_term_template_html__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(admin_screens_add_term_template_html__WEBPACK_IMPORTED_MODULE_7__);
var _this = undefined,
    _jsxFileName = "/Users/danminimac/code/snapdragon-redux/src/admin/screens/add-term.js";

function _slicedToArray(arr, i) {
  return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();
}

function _nonIterableRest() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}

function _unsupportedIterableToArray(o, minLen) {
  if (!o) return;
  if (typeof o === "string") return _arrayLikeToArray(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor) n = o.constructor.name;
  if (n === "Map" || n === "Set") return Array.from(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
}

function _arrayLikeToArray(arr, len) {
  if (len == null || len > arr.length) len = arr.length;

  for (var i = 0, arr2 = new Array(len); i < len; i++) {
    arr2[i] = arr[i];
  }

  return arr2;
}

function _iterableToArrayLimit(arr, i) {
  if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return;
  var _arr = [];
  var _n = true;
  var _d = false;
  var _e = undefined;

  try {
    for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
      _arr.push(_s.value);

      if (i && _arr.length === i) break;
    }
  } catch (err) {
    _d = true;
    _e = err;
  } finally {
    try {
      if (!_n && _i["return"] != null) _i["return"]();
    } finally {
      if (_d) throw _e;
    }
  }

  return _arr;
}

function _arrayWithHoles(arr) {
  if (Array.isArray(arr)) return arr;
}

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {
  try {
    var info = gen[key](arg);
    var value = info.value;
  } catch (error) {
    reject(error);
    return;
  }

  if (info.done) {
    resolve(value);
  } else {
    Promise.resolve(value).then(_next, _throw);
  }
}

function _asyncToGenerator(fn) {
  return function () {
    var self = this,
        args = arguments;
    return new Promise(function (resolve, reject) {
      var gen = fn.apply(self, args);

      function _next(value) {
        asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);
      }

      function _throw(err) {
        asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);
      }

      _next(undefined);
    });
  };
}











var ErrorFallback = function ErrorFallback(_ref) {
  var error = _ref.error,
      componentStack = _ref.componentStack,
      resetErrorBoundary = _ref.resetErrorBoundary;
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement("div", {
    role: "alert",
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 16,
      columnNumber: 5
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement("p", {
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 17,
      columnNumber: 7
    }
  }, "Something went wrong:"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement("pre", {
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 18,
      columnNumber: 7
    }
  }, error.message), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement("pre", {
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 19,
      columnNumber: 7
    }
  }, componentStack), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement("button", {
    onClick: resetErrorBoundary,
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 20,
      columnNumber: 7
    }
  }, "Try again"));
};

var addTerm = function addTerm() {
  var init = /*#__PURE__*/function () {
    var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4() {
      var template, parent, branches, taxa, TermForm, chkBoxAddToCollection, definitions, addToCollection, collection, inputCollection;
      return regeneratorRuntime.wrap(function _callee4$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              template = document.createElement('template');
              template.innerHTML = (admin_screens_add_term_template_html__WEBPACK_IMPORTED_MODULE_7___default());
              parent = document.querySelector('#content-container');
              parent.innerHTML = '';
              (0,ui_helpers_templating__WEBPACK_IMPORTED_MODULE_5__.renderTemplate)({}, template.content, parent);
              branches = [{
                name: 'morphology',
                label: 'morphology'
              }, {
                name: 'general',
                label: 'general'
              }, {
                name: 'anatomy',
                label: 'anatomy'
              }, {
                name: 'classification',
                label: 'classification'
              }, {
                name: 'behaviour',
                label: 'behaviour'
              }, {
                name: 'ecology',
                label: 'ecology'
              }, {
                name: 'physiology',
                label: 'physiology'
              }];
              taxa = [{
                name: 'common',
                label: 'common'
              }, {
                name: 'fungi',
                label: 'fungi'
              }, {
                name: 'plantae',
                label: 'plantae'
              }, {
                name: 'insecta',
                label: 'insecta'
              }, {
                name: 'aves',
                label: 'aves'
              }]; // Function component

              TermForm = function TermForm(props) {
                var _useState = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false),
                    _useState2 = _slicedToArray(_useState, 2),
                    editMode = _useState2[0],
                    setEditMode = _useState2[1];

                var _useState3 = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(''),
                    _useState4 = _slicedToArray(_useState3, 2),
                    addTerm = _useState4[0],
                    setAddTerm = _useState4[1];

                var _useState5 = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(''),
                    _useState6 = _slicedToArray(_useState5, 2),
                    editTerm = _useState6[0],
                    setEditTerm = _useState6[1];

                var _useState7 = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(''),
                    _useState8 = _slicedToArray(_useState7, 2),
                    definition = _useState8[0],
                    setDefinition = _useState8[1];

                var _useState9 = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(''),
                    _useState10 = _slicedToArray(_useState9, 2),
                    wiki = _useState10[0],
                    setWiki = _useState10[1];

                var _useState11 = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false),
                    _useState12 = _slicedToArray(_useState11, 2),
                    isTechnical = _useState12[0],
                    setIsTechnical = _useState12[1];

                var handleModeChange = function handleModeChange(e) {
                  var isEditMode = e.target.checked;
                  isEditMode ? setEditTerm('') : setAddTerm('');
                  inputEditTerm.value = '';
                  inputAddTerm.value = '';
                  setTimeout(function () {
                    isEditMode ? inputEditTerm.focus() : inputAddTerm.focus();
                  }, 500);
                  setEditMode(isEditMode);
                  setDefinition('');
                  setWiki('');
                  setIsTechnical(false);
                  inputBranch.value = '';
                  inputTaxon.value = '';
                };

                var savedText = document.querySelector('.js-saved'); // temp hack

                var handleAddTerm = /*#__PURE__*/function () {
                  var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(e) {
                    var input, _definitions;

                    return regeneratorRuntime.wrap(function _callee$(_context) {
                      while (1) {
                        switch (_context.prev = _context.next) {
                          case 0:
                            if (!(e.key === 'Tab')) {
                              _context.next = 7;
                              break;
                            }

                            input = e.target;
                            input.value = utils_utils__WEBPACK_IMPORTED_MODULE_3__.utils.capitaliseFirst(input.value);
                            _context.next = 5;
                            return api_firebase_firestore__WEBPACK_IMPORTED_MODULE_4__.firestore.getDefinitionsWhere({
                              key: 'term',
                              operator: '==',
                              value: input.value
                            });

                          case 5:
                            _definitions = _context.sent;

                            if (_definitions[0]) {
                              input.value = '';
                              input.focus();
                              savedText.innerHTML = 'That term has already been defined! Try another.';
                              savedText.classList.remove('hide');
                              setTimeout(function () {
                                savedText.classList.add('hide');
                              }, 3000);
                            }

                          case 7:
                          case "end":
                            return _context.stop();
                        }
                      }
                    }, _callee, this);
                  }));

                  return function handleAddTerm(_x) {
                    return _ref3.apply(this, arguments);
                  };
                }();

                var handleEditTerm = /*#__PURE__*/function () {
                  var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(e) {
                    var input, _definitions2, term;

                    return regeneratorRuntime.wrap(function _callee2$(_context2) {
                      while (1) {
                        switch (_context2.prev = _context2.next) {
                          case 0:
                            if (!(e.key === 'Enter')) {
                              _context2.next = 12;
                              break;
                            }

                            input = e.target;
                            _context2.next = 4;
                            return api_firebase_firestore__WEBPACK_IMPORTED_MODULE_4__.firestore.getDefinitionsWhere({
                              key: 'term',
                              operator: '==',
                              value: input.value
                            });

                          case 4:
                            _definitions2 = _context2.sent;
                            term = _definitions2[0];
                            setEditTerm(term.term);
                            setDefinition(term.definition);
                            setWiki(term.wiki);
                            isTechnical = term.technical;
                            inputBranch.value = term.branch;
                            inputTaxon.value = term.taxon;

                          case 12:
                          case "end":
                            return _context2.stop();
                        }
                      }
                    }, _callee2, this);
                  }));

                  return function handleEditTerm(_x2) {
                    return _ref4.apply(this, arguments);
                  };
                }();

                var addOrEditTermHandler = function addOrEditTermHandler(e, input, message, action) {
                  var glossaryItem = {
                    term: input.value,
                    definition: definition,
                    taxon: inputTaxon.value,
                    branch: inputBranch.value,
                    technical: isTechnical
                  };
                  if (inputWiki.value.length > 0) glossaryItem.wiki = inputWiki.value;
                  api_firebase_firestore__WEBPACK_IMPORTED_MODULE_4__.firestore[action](glossaryItem).then(function (docRef) {
                    savedText.innerHTML = message;
                    savedText.classList.remove('hide');
                    setAddTerm('');
                    setEditTerm('');
                    input.value = '';
                    input.focus();
                    setDefinition('');
                    setWiki('');
                    addToCollection(docRef);
                  })["catch"](function (e) {
                    savedText.innerHTML = "Oops, something went wrong, namely: ".concat(e);
                    savedText.classList.remove('hide');
                  });
                  setTimeout(function () {
                    savedText.classList.add('hide');
                  }, 3000);
                };

                var handleSubmit = function handleSubmit(e) {
                  e.preventDefault();
                  if (e.key == "Enter") event.preventDefault(); // hack validation to prevent submission after accepting term to edit

                  if (inputDefinition.value.length === 0) return;
                  ckhBoxEdit.checked ? addOrEditTermHandler(e, inputEditTerm, 'This term was updated successfully!', 'updateDefinition') : addOrEditTermHandler(e, inputAddTerm, 'The new term was added successfully!', 'addDefinition');
                };

                (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(function () {
                  autocompleter__WEBPACK_IMPORTED_MODULE_0___default()({
                    input: inputBranch,
                    fetch: function fetch(text, update) {
                      text = text.toLowerCase();
                      var suggestions = props.branches.filter(function (t) {
                        return t.name.toLowerCase().startsWith(text);
                      });
                      update(suggestions);
                    },
                    onSelect: function onSelect(item) {
                      inputBranch.value = item.label;
                    },
                    minLength: 0,
                    debounceWaitMs: 200,
                    className: 'autocomplete-options-container'
                  });
                }, []);
                (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(function () {
                  autocompleter__WEBPACK_IMPORTED_MODULE_0___default()({
                    input: inputTaxon,
                    fetch: function fetch(text, update) {
                      text = text.toLowerCase();
                      var suggestions = props.taxa.filter(function (t) {
                        return t.name.toLowerCase().startsWith(text);
                      });
                      update(suggestions);
                    },
                    onSelect: function onSelect(item) {
                      inputTaxon.value = item.label;
                    },
                    minLength: 0,
                    debounceWaitMs: 200,
                    className: 'autocomplete-options-container'
                  });
                }, []);
                return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement("form", {
                  id: "addOrEditTermForm",
                  __self: _this,
                  __source: {
                    fileName: _jsxFileName,
                    lineNumber: 214,
                    columnNumber: 13
                  }
                }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement("div", {
                  className: "row",
                  __self: _this,
                  __source: {
                    fileName: _jsxFileName,
                    lineNumber: 215,
                    columnNumber: 15
                  }
                }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement("div", {
                  className: "input-field col s4",
                  __self: _this,
                  __source: {
                    fileName: _jsxFileName,
                    lineNumber: 216,
                    columnNumber: 17
                  }
                }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement("label", {
                  __self: _this,
                  __source: {
                    fileName: _jsxFileName,
                    lineNumber: 217,
                    columnNumber: 21
                  }
                }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement("input", {
                  id: "ckhBoxEdit",
                  type: "checkbox",
                  onChange: handleModeChange,
                  __self: _this,
                  __source: {
                    fileName: _jsxFileName,
                    lineNumber: 218,
                    columnNumber: 25
                  }
                }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement("span", {
                  __self: _this,
                  __source: {
                    fileName: _jsxFileName,
                    lineNumber: 219,
                    columnNumber: 25
                  }
                }, "Edit mode"))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement("div", {
                  className: "input-field col s8",
                  __self: _this,
                  __source: {
                    fileName: _jsxFileName,
                    lineNumber: 222,
                    columnNumber: 17
                  }
                }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement("div", {
                  __self: _this,
                  __source: {
                    fileName: _jsxFileName,
                    lineNumber: 223,
                    columnNumber: 21
                  }
                }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement("label", {
                  __self: _this,
                  __source: {
                    fileName: _jsxFileName,
                    lineNumber: 224,
                    columnNumber: 25
                  }
                }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement("input", {
                  id: "chk-box-add-to-collection",
                  type: "checkbox",
                  __self: _this,
                  __source: {
                    fileName: _jsxFileName,
                    lineNumber: 225,
                    columnNumber: 29
                  }
                }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement("span", {
                  __self: _this,
                  __source: {
                    fileName: _jsxFileName,
                    lineNumber: 226,
                    columnNumber: 29
                  }
                }, "Add to this collection:")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement("input", {
                  id: "input-collection",
                  className: "autocomplete",
                  type: "text",
                  placeholder: "Start typing a collection name",
                  autoFocus: true,
                  spellCheck: "false",
                  __self: _this,
                  __source: {
                    fileName: _jsxFileName,
                    lineNumber: 229,
                    columnNumber: 25
                  }
                }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement("label", {
                  htmlFor: "input-collection",
                  className: "active",
                  __self: _this,
                  __source: {
                    fileName: _jsxFileName,
                    lineNumber: 230,
                    columnNumber: 25
                  }
                }, "Snapdragon collection finder")))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement("br", {
                  __self: _this,
                  __source: {
                    fileName: _jsxFileName,
                    lineNumber: 235,
                    columnNumber: 15
                  }
                }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement("div", {
                  className: "js-add-term row ".concat(editMode ? 'hide' : ''),
                  __self: _this,
                  __source: {
                    fileName: _jsxFileName,
                    lineNumber: 237,
                    columnNumber: 15
                  }
                }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement("div", {
                  className: "input-field col s2",
                  __self: _this,
                  __source: {
                    fileName: _jsxFileName,
                    lineNumber: 238,
                    columnNumber: 17
                  }
                }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement("input", {
                  id: "inputAddTerm",
                  value: addTerm,
                  onChange: function onChange(e) {
                    return setAddTerm(e.target.value);
                  },
                  onKeyDown: handleAddTerm,
                  type: "text",
                  placeholder: "Enter term",
                  spellCheck: "false",
                  __self: _this,
                  __source: {
                    fileName: _jsxFileName,
                    lineNumber: 239,
                    columnNumber: 21
                  }
                }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement("label", {
                  htmlFor: "inputAddTerm",
                  className: "active",
                  __self: _this,
                  __source: {
                    fileName: _jsxFileName,
                    lineNumber: 240,
                    columnNumber: 21
                  }
                }, "Term"))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement("div", {
                  className: "js-edit-term row ".concat(editMode ? '' : 'hide'),
                  __self: _this,
                  __source: {
                    fileName: _jsxFileName,
                    lineNumber: 243,
                    columnNumber: 15
                  }
                }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement(react_error_boundary__WEBPACK_IMPORTED_MODULE_8__.ErrorBoundary, {
                  FallbackComponent: ErrorFallback,
                  __self: _this,
                  __source: {
                    fileName: _jsxFileName,
                    lineNumber: 244,
                    columnNumber: 19
                  }
                }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement("div", {
                  className: "input-field col s2",
                  __self: _this,
                  __source: {
                    fileName: _jsxFileName,
                    lineNumber: 245,
                    columnNumber: 21
                  }
                }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement("input", {
                  id: "inputEditTerm",
                  onKeyPress: handleEditTerm,
                  type: "text",
                  placeholder: "Start typing term",
                  spellCheck: "false ",
                  __self: _this,
                  __source: {
                    fileName: _jsxFileName,
                    lineNumber: 246,
                    columnNumber: 25
                  }
                }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement("label", {
                  htmlFor: "inputEditTerm",
                  className: "active",
                  __self: _this,
                  __source: {
                    fileName: _jsxFileName,
                    lineNumber: 247,
                    columnNumber: 25
                  }
                }, "Edit term"))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement("div", {
                  className: "autocomplete-options-container hide-empty",
                  id: "snapdragon-term-autocomplete",
                  __self: _this,
                  __source: {
                    fileName: _jsxFileName,
                    lineNumber: 250,
                    columnNumber: 19
                  }
                })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement("div", {
                  className: "row",
                  __self: _this,
                  __source: {
                    fileName: _jsxFileName,
                    lineNumber: 252,
                    columnNumber: 15
                  }
                }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement("div", {
                  className: "input-field col s2",
                  __self: _this,
                  __source: {
                    fileName: _jsxFileName,
                    lineNumber: 253,
                    columnNumber: 19
                  }
                }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement("input", {
                  id: "inputDefinition",
                  type: "text",
                  placeholder: "Enter definition",
                  spellCheck: "false",
                  value: definition,
                  onChange: function onChange(e) {
                    return setDefinition(e.target.value);
                  },
                  __self: _this,
                  __source: {
                    fileName: _jsxFileName,
                    lineNumber: 254,
                    columnNumber: 23
                  }
                }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement("label", {
                  htmlFor: "inputDefinition",
                  className: "active",
                  __self: _this,
                  __source: {
                    fileName: _jsxFileName,
                    lineNumber: 255,
                    columnNumber: 23
                  }
                }, "Definition"))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement("div", {
                  className: "row",
                  __self: _this,
                  __source: {
                    fileName: _jsxFileName,
                    lineNumber: 258,
                    columnNumber: 15
                  }
                }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement("div", {
                  className: "input-field col s2",
                  __self: _this,
                  __source: {
                    fileName: _jsxFileName,
                    lineNumber: 259,
                    columnNumber: 19
                  }
                }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement("input", {
                  id: "inputTaxon",
                  type: "text",
                  placeholder: "Start typing taxon",
                  spellCheck: "false",
                  __self: _this,
                  __source: {
                    fileName: _jsxFileName,
                    lineNumber: 260,
                    columnNumber: 23
                  }
                }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement("label", {
                  htmlFor: "inputTaxon",
                  className: "active",
                  __self: _this,
                  __source: {
                    fileName: _jsxFileName,
                    lineNumber: 261,
                    columnNumber: 23
                  }
                }, "Taxon")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement("div", {
                  className: "autocomplete-options-container hide-empty",
                  id: "snapdragon-taxon-autocomplete",
                  __self: _this,
                  __source: {
                    fileName: _jsxFileName,
                    lineNumber: 263,
                    columnNumber: 19
                  }
                }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement("div", {
                  className: "input-field col s2",
                  __self: _this,
                  __source: {
                    fileName: _jsxFileName,
                    lineNumber: 264,
                    columnNumber: 19
                  }
                }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement("input", {
                  id: "inputBranch",
                  type: "text",
                  placeholder: "Start typing branch",
                  spellCheck: "false",
                  __self: _this,
                  __source: {
                    fileName: _jsxFileName,
                    lineNumber: 265,
                    columnNumber: 23
                  }
                }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement("label", {
                  htmlFor: "inputBranch",
                  className: "active",
                  __self: _this,
                  __source: {
                    fileName: _jsxFileName,
                    lineNumber: 266,
                    columnNumber: 23
                  }
                }, "Branch")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement("div", {
                  className: "autocomplete-options-container hide-empty",
                  id: "snapdragon-branch-autocomplete",
                  __self: _this,
                  __source: {
                    fileName: _jsxFileName,
                    lineNumber: 268,
                    columnNumber: 19
                  }
                })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement("div", {
                  className: "row",
                  __self: _this,
                  __source: {
                    fileName: _jsxFileName,
                    lineNumber: 270,
                    columnNumber: 15
                  }
                }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement("div", {
                  className: "input-field col s2",
                  __self: _this,
                  __source: {
                    fileName: _jsxFileName,
                    lineNumber: 271,
                    columnNumber: 19
                  }
                }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement("input", {
                  id: "inputWiki",
                  defaultValue: wiki,
                  type: "text",
                  placeholder: "Enter web link",
                  spellCheck: "false",
                  __self: _this,
                  __source: {
                    fileName: _jsxFileName,
                    lineNumber: 272,
                    columnNumber: 23
                  }
                }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement("label", {
                  htmlFor: "inputWiki",
                  className: "active",
                  __self: _this,
                  __source: {
                    fileName: _jsxFileName,
                    lineNumber: 273,
                    columnNumber: 23
                  }
                }, "Web link"))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement("div", {
                  __self: _this,
                  __source: {
                    fileName: _jsxFileName,
                    lineNumber: 276,
                    columnNumber: 15
                  }
                }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement("label", {
                  __self: _this,
                  __source: {
                    fileName: _jsxFileName,
                    lineNumber: 277,
                    columnNumber: 17
                  }
                }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement("input", {
                  id: "chkBoxTechnical",
                  type: "checkbox",
                  onChange: function onChange(e) {
                    return setIsTechnical(e.target.checked);
                  },
                  __self: _this,
                  __source: {
                    fileName: _jsxFileName,
                    lineNumber: 278,
                    columnNumber: 19
                  }
                }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement("span", {
                  __self: _this,
                  __source: {
                    fileName: _jsxFileName,
                    lineNumber: 279,
                    columnNumber: 19
                  }
                }, "Technical"))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement("br", {
                  __self: _this,
                  __source: {
                    fileName: _jsxFileName,
                    lineNumber: 283,
                    columnNumber: 15
                  }
                }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement("div", {
                  className: "row",
                  __self: _this,
                  __source: {
                    fileName: _jsxFileName,
                    lineNumber: 285,
                    columnNumber: 15
                  }
                }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement("button", {
                  type: "button",
                  onClick: handleSubmit,
                  className: "btn",
                  __self: _this,
                  __source: {
                    fileName: _jsxFileName,
                    lineNumber: 286,
                    columnNumber: 19
                  }
                }, editMode ? 'Edit term' : 'Add term'), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement("div", {
                  className: "margin-top hide feedback js-saved",
                  __self: _this,
                  __source: {
                    fileName: _jsxFileName,
                    lineNumber: 287,
                    columnNumber: 19
                  }
                }, "Term saved")));
              };

              react_dom__WEBPACK_IMPORTED_MODULE_2___default().render( /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement(TermForm, {
                taxa: taxa,
                branches: branches,
                __self: _this,
                __source: {
                  fileName: _jsxFileName,
                  lineNumber: 293,
                  columnNumber: 25
                }
              }), document.querySelector('.js-term-form'));
              chkBoxAddToCollection = document.querySelector('#chk-box-add-to-collection');
              _context4.next = 12;
              return api_firebase_firestore__WEBPACK_IMPORTED_MODULE_4__.firestore.getDefinitionsWhere({});

            case 12:
              definitions = _context4.sent;
              definitions.forEach(function (definition) {
                definition.name = definition.term;
                definition.label = definition.term;
              });
              autocompleter__WEBPACK_IMPORTED_MODULE_0___default()({
                input: inputEditTerm,
                fetch: function fetch(text, update) {
                  text = text.toLowerCase();
                  var suggestions = definitions.filter(function (d) {
                    return d.name.toLowerCase().startsWith(text);
                  });
                  update(suggestions);
                },
                onSelect: function onSelect(item) {
                  inputEditTerm.value = item.label;
                },
                minLength: 0,
                debounceWaitMs: 200,
                className: 'autocomplete-options-container'
              });

              addToCollection = function addToCollection(docRef) {
                if (collection) {
                  collection.terms.push(docRef.id);
                  api_firebase_firestore__WEBPACK_IMPORTED_MODULE_4__.firestore.updateCollection(collection).then(function (response) {});
                }
              };

              collection = window.snapdragon.collection;

              if (collection) {
                setTimeout(function () {
                  chkBoxAddToCollection.checked = true;
                  inputCollection.value = collection.name;
                }, 250);
              }

              inputCollection = document.querySelector('#input-collection');
              (0,admin_screens_collection_collection_picker__WEBPACK_IMPORTED_MODULE_6__.collectionPicker)(inputCollection, /*#__PURE__*/function () {
                var _ref5 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(selectedCollection) {
                  return regeneratorRuntime.wrap(function _callee3$(_context3) {
                    while (1) {
                      switch (_context3.prev = _context3.next) {
                        case 0:
                          collection = selectedCollection;
                          chkBoxAddToCollection.checked = true;

                        case 2:
                        case "end":
                          return _context3.stop();
                      }
                    }
                  }, _callee3, this);
                }));

                return function (_x3) {
                  return _ref5.apply(this, arguments);
                };
              }());

            case 20:
            case "end":
              return _context4.stop();
          }
        }
      }, _callee4, this);
    }));

    return function init() {
      return _ref2.apply(this, arguments);
    };
  }();

  init();
};

/***/ }),

/***/ "YQ8c":
/*!****************************************!*\
  !*** ./src/admin/screens/add-trait.js ***!
  \****************************************/
/*! namespace exports */
/*! export renderAddTrait [provided] [used] [could be renamed] */
/*! other exports [not provided] [unused] */
/*! runtime requirements: __webpack_require__, __webpack_require__.n, __webpack_exports__, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "renderAddTrait": () => /* binding */ renderAddTrait
/* harmony export */ });
/* harmony import */ var ramda__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ramda */ "pWpQ");
/* harmony import */ var autocompleter__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! autocompleter */ "B89K");
/* harmony import */ var autocompleter__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(autocompleter__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var ui_helpers_data_checking__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ui/helpers/data-checking */ "XTkL");
/* harmony import */ var utils_utils__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! utils/utils */ "EHpu");
/* harmony import */ var api_firebase_firestore__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! api/firebase/firestore */ "xWjd");
/* harmony import */ var admin_api_trait_values__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! admin/api/trait-values */ "wEiM");
/* harmony import */ var ui_helpers_templating__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ui/helpers/templating */ "xNSC");
/* harmony import */ var admin_screens_add_trait_template_html__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! admin/screens/add-trait-template.html */ "5VIV");
/* harmony import */ var admin_screens_add_trait_template_html__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(admin_screens_add_trait_template_html__WEBPACK_IMPORTED_MODULE_6__);
function _slicedToArray(arr, i) {
  return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();
}

function _nonIterableRest() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}

function _unsupportedIterableToArray(o, minLen) {
  if (!o) return;
  if (typeof o === "string") return _arrayLikeToArray(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor) n = o.constructor.name;
  if (n === "Map" || n === "Set") return Array.from(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
}

function _arrayLikeToArray(arr, len) {
  if (len == null || len > arr.length) len = arr.length;

  for (var i = 0, arr2 = new Array(len); i < len; i++) {
    arr2[i] = arr[i];
  }

  return arr2;
}

function _iterableToArrayLimit(arr, i) {
  if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return;
  var _arr = [];
  var _n = true;
  var _d = false;
  var _e = undefined;

  try {
    for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
      _arr.push(_s.value);

      if (i && _arr.length === i) break;
    }
  } catch (err) {
    _d = true;
    _e = err;
  } finally {
    try {
      if (!_n && _i["return"] != null) _i["return"]();
    } finally {
      if (_d) throw _e;
    }
  }

  return _arr;
}

function _arrayWithHoles(arr) {
  if (Array.isArray(arr)) return arr;
}

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {
  try {
    var info = gen[key](arg);
    var value = info.value;
  } catch (error) {
    reject(error);
    return;
  }

  if (info.done) {
    resolve(value);
  } else {
    Promise.resolve(value).then(_next, _throw);
  }
}

function _asyncToGenerator(fn) {
  return function () {
    var self = this,
        args = arguments;
    return new Promise(function (resolve, reject) {
      var gen = fn.apply(self, args);

      function _next(value) {
        asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);
      }

      function _throw(err) {
        asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);
      }

      _next(undefined);
    });
  };
}









var renderAddTrait = function renderAddTrait(parent, callback) {
  var inputKey, inputValue, inputUnit;

  var traitTriage = /*#__PURE__*/function () {
    var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(traitValues, traitKey) {
      var _units, units, unit, saveTrait;

      return regeneratorRuntime.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              inputUnit = document.querySelector('#input-unit-value');
              inputValue = document.querySelector('#input-trait-value');
              _context2.next = 4;
              return api_firebase_firestore__WEBPACK_IMPORTED_MODULE_3__.firestore.getUnits();

            case 4:
              _units = _context2.sent;
              units = _units.map(function (unit) {
                for (var _i = 0, _Object$entries = Object.entries(unit); _i < _Object$entries.length; _i++) {
                  var _Object$entries$_i = _slicedToArray(_Object$entries[_i], 2),
                      key = _Object$entries$_i[0],
                      obj = _Object$entries$_i[1];

                  if (key === utils_utils__WEBPACK_IMPORTED_MODULE_2__.utils.toCamelCase(traitKey)) {
                    return obj;
                  }
                }
              });

              if (units.filter(function (u) {
                return u;
              }).length > 0) {
                unit = units.find(function (u) {
                  return u;
                });
                unit = unit.map(function (u) {
                  return {
                    label: u,
                    value: u
                  };
                });
                inputUnit.parentElement.classList.remove('hide');
                initAutocomplete(inputUnit, unit);

                saveTrait = /*#__PURE__*/function () {
                  var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
                    var trait;
                    return regeneratorRuntime.wrap(function _callee$(_context) {
                      while (1) {
                        switch (_context.prev = _context.next) {
                          case 0:
                            trait = {
                              key: traitKey,
                              value: inputValue.value,
                              unit: inputUnit.value
                            };
                            callback(trait);

                          case 2:
                          case "end":
                            return _context.stop();
                        }
                      }
                    }, _callee, this);
                  }));

                  return function saveTrait() {
                    return _ref2.apply(this, arguments);
                  };
                }();

                inputUnit.addEventListener('keypress', function (event) {
                  if (event.keyCode == 13) {
                    saveTrait();
                  }
                });
                inputUnit.addEventListener('keydown', function (event) {
                  if (event.keyCode == 9) {
                    var highlightedText = document.querySelector('.selected');

                    if (highlightedText) {
                      inputUnit.value = highlightedText.innerText;
                      saveTrait();
                    }
                  }
                });
              } else {
                inputUnit.parentElement.classList.add('hide');
                initTraitValues(traitValues, traitKey);
              }

            case 7:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2, this);
    }));

    return function traitTriage(_x, _x2) {
      return _ref.apply(this, arguments);
    };
  }();

  var initTraitValues = /*#__PURE__*/function () {
    var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(traitValues, traitKey) {
      var values, exclude, traitKeyValues, _i2, _Object$entries2, _Object$entries2$_i, key, obj, saveTrait;

      return regeneratorRuntime.wrap(function _callee4$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              values = [];
              exclude = ['help', 'name', 'type', 'units'];
              traitKeyValues = traitValues[utils_utils__WEBPACK_IMPORTED_MODULE_2__.utils.toCamelCase(traitKey)];

              if (!traitKeyValues) {
                traitKeyValues = traitValues[ui_helpers_data_checking__WEBPACK_IMPORTED_MODULE_1__.itemProperties.getRootTraitValue(utils_utils__WEBPACK_IMPORTED_MODULE_2__.utils.toCamelCase(traitKey), 'start')];
              }

              if (!traitKeyValues) {
                traitKeyValues = traitValues[ui_helpers_data_checking__WEBPACK_IMPORTED_MODULE_1__.itemProperties.getRootTraitValue(utils_utils__WEBPACK_IMPORTED_MODULE_2__.utils.toCamelCase(traitKey), 'end')];
              }

              if (traitKeyValues) {
                for (_i2 = 0, _Object$entries2 = Object.entries(traitKeyValues); _i2 < _Object$entries2.length; _i2++) {
                  _Object$entries2$_i = _slicedToArray(_Object$entries2[_i2], 2), key = _Object$entries2$_i[0], obj = _Object$entries2$_i[1];

                  if (!(0,ramda__WEBPACK_IMPORTED_MODULE_7__.default)(key, exclude)) {
                    values.push({
                      label: obj.trim().toLowerCase(),
                      value: obj.trim().toLowerCase()
                    });
                  }
                }

                values = utils_utils__WEBPACK_IMPORTED_MODULE_2__.utils.sortAlphabeticallyBy(values, 'label');
                inputValue.value = '';
                setTimeout(function () {
                  inputValue.focus();
                }, 250);
                initAutocomplete(inputValue, values);
              }

              saveTrait = /*#__PURE__*/function () {
                var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3() {
                  var trait;
                  return regeneratorRuntime.wrap(function _callee3$(_context3) {
                    while (1) {
                      switch (_context3.prev = _context3.next) {
                        case 0:
                          trait = {
                            key: traitKey,
                            value: inputValue.value
                          };
                          callback(trait);

                        case 2:
                        case "end":
                          return _context3.stop();
                      }
                    }
                  }, _callee3, this);
                }));

                return function saveTrait() {
                  return _ref4.apply(this, arguments);
                };
              }();

              inputValue.addEventListener('keypress', function (event) {
                if (event.keyCode == 13) {
                  saveTrait();
                }
              });
              inputValue.addEventListener('keydown', function (event) {
                if (event.keyCode == 9) {
                  var highlightedText = document.querySelector('.selected');

                  if (highlightedText) {
                    inputValue.value = highlightedText.innerText;
                    saveTrait();
                  }
                }
              });

            case 9:
            case "end":
              return _context4.stop();
          }
        }
      }, _callee4, this);
    }));

    return function initTraitValues(_x3, _x4) {
      return _ref3.apply(this, arguments);
    };
  }();

  var init = /*#__PURE__*/function () {
    var _ref5 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5() {
      var template, keys, _i3, _Object$entries3, _Object$entries3$_i, key, obj;

      return regeneratorRuntime.wrap(function _callee5$(_context5) {
        while (1) {
          switch (_context5.prev = _context5.next) {
            case 0:
              // let traitValues;
              template = document.createElement('template');
              template.innerHTML = (admin_screens_add_trait_template_html__WEBPACK_IMPORTED_MODULE_6___default());
              parent.innerHTML = '';
              (0,ui_helpers_templating__WEBPACK_IMPORTED_MODULE_5__.renderTemplate)({}, template.content, parent);
              inputKey = document.querySelector('#input-trait-key'); // traitValues = await firestore.getUnits();

              keys = [];

              for (_i3 = 0, _Object$entries3 = Object.entries(admin_api_trait_values__WEBPACK_IMPORTED_MODULE_4__.traitValues.name); _i3 < _Object$entries3.length; _i3++) {
                _Object$entries3$_i = _slicedToArray(_Object$entries3[_i3], 2), key = _Object$entries3$_i[0], obj = _Object$entries3$_i[1];
                keys.push({
                  label: obj.toLowerCase(),
                  value: obj.toLowerCase()
                });
              }

              keys = utils_utils__WEBPACK_IMPORTED_MODULE_2__.utils.sortAlphabeticallyBy(keys, 'label');
              initAutocomplete(inputKey, keys);
              inputKey.addEventListener('keypress', function (event) {
                if (event.keyCode == 13) {
                  traitTriage(admin_api_trait_values__WEBPACK_IMPORTED_MODULE_4__.traitValues, event.target.value);
                }
              });
              inputKey.addEventListener('keydown', function (event) {
                if (event.keyCode == 9) {
                  var highlightedText = document.querySelector('.selected');

                  if (highlightedText) {
                    inputKey.value = highlightedText.innerText;
                    document.querySelector('.autocomplete-options-container').innerHTML = '';
                    traitTriage(admin_api_trait_values__WEBPACK_IMPORTED_MODULE_4__.traitValues, highlightedText.innerText);
                  }
                }
              });

            case 11:
            case "end":
              return _context5.stop();
          }
        }
      }, _callee5, this);
    }));

    return function init() {
      return _ref5.apply(this, arguments);
    };
  }();

  init();
};

var initAutocomplete = function initAutocomplete(input, options) {
  autocompleter__WEBPACK_IMPORTED_MODULE_0___default()({
    input: input,
    fetch: function fetch(text, update) {
      text = text.toLowerCase();
      var suggestions = options.filter(function (n) {
        return n.value.toLowerCase().startsWith(text);
      });
      update(suggestions);
    },
    onSelect: function onSelect(item) {
      input.value = item.label;
    },
    minLength: 0,
    debounceWaitMs: 200,
    className: 'autocomplete-options-container'
  });
};

/***/ }),

/***/ "J9j8":
/*!***********************************************************!*\
  !*** ./src/admin/screens/collection/collection-picker.js ***!
  \***********************************************************/
/*! namespace exports */
/*! export collectionPicker [provided] [used] [could be renamed] */
/*! other exports [not provided] [unused] */
/*! runtime requirements: __webpack_require__, __webpack_exports__, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "collectionPicker": () => /* binding */ collectionPicker
/* harmony export */ });
/* harmony import */ var api_firebase_firestore__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! api/firebase/firestore */ "xWjd");
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {
  try {
    var info = gen[key](arg);
    var value = info.value;
  } catch (error) {
    reject(error);
    return;
  }

  if (info.done) {
    resolve(value);
  } else {
    Promise.resolve(value).then(_next, _throw);
  }
}

function _asyncToGenerator(fn) {
  return function () {
    var self = this,
        args = arguments;
    return new Promise(function (resolve, reject) {
      var gen = fn.apply(self, args);

      function _next(value) {
        asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);
      }

      function _throw(err) {
        asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);
      }

      _next(undefined);
    });
  };
}


var collectionPicker = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(input, listener) {
    var collections, collectionNames, data, i, instances;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            collections = [];
            _context2.next = 3;
            return api_firebase_firestore__WEBPACK_IMPORTED_MODULE_0__.firestore.getCollections();

          case 3:
            collections = _context2.sent;
            collectionNames = collections.map(function (collection) {
              return collection.name;
            });
            data = {};

            for (i = 0; i < collectionNames.length; i++) {
              data[collectionNames[i]] = null;
            }

            instances = M.Autocomplete.init(input, {
              data: data
            });
            input.addEventListener('keyup', /*#__PURE__*/function () {
              var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(e) {
                var props, _collections;

                return regeneratorRuntime.wrap(function _callee$(_context) {
                  while (1) {
                    switch (_context.prev = _context.next) {
                      case 0:
                        if (!(e.keyCode == 13)) {
                          _context.next = 7;
                          break;
                        }

                        props = {
                          key: 'name',
                          operator: '==',
                          value: input.value
                        };
                        _context.next = 4;
                        return api_firebase_firestore__WEBPACK_IMPORTED_MODULE_0__.firestore.getCollectionsWhere(props);

                      case 4:
                        _collections = _context.sent;
                        window.snapdragon.collection = _collections[0];
                        listener(_collections[0]);

                      case 7:
                      case "end":
                        return _context.stop();
                    }
                  }
                }, _callee, this);
              }));

              return function (_x3) {
                return _ref2.apply(this, arguments);
              };
            }());

          case 9:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, this);
  }));

  return function collectionPicker(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

/***/ }),

/***/ "nArn":
/*!*****************************************************************!*\
  !*** ./src/admin/screens/collection/edit-collection-handler.js ***!
  \*****************************************************************/
/*! namespace exports */
/*! export editCollectionHandler [provided] [used] [could be renamed] */
/*! other exports [not provided] [unused] */
/*! runtime requirements: __webpack_require__, __webpack_require__.n, __webpack_exports__, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "editCollectionHandler": () => /* binding */ editCollectionHandler
/* harmony export */ });
/* harmony import */ var ui_helpers_enum_helper__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ui/helpers/enum-helper */ "DXx0");
/* harmony import */ var api_firebase_firestore__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! api/firebase/firestore */ "xWjd");
/* harmony import */ var ui_helpers_templating__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ui/helpers/templating */ "xNSC");
/* harmony import */ var admin_screens_questions_questions_tabs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! admin/screens/questions/questions-tabs */ "SN1h");
/* harmony import */ var ui_helpers_collection_handler__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ui/helpers/collection-handler */ "Cz4z");
/* harmony import */ var ui_create_guide_modal_species_picker__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ui/create-guide-modal/species-picker */ "HkuV");
/* harmony import */ var admin_screens_video_create_video_description__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! admin/screens/video/create-video-description */ "gYkA");
/* harmony import */ var admin_screens_collection_species_item_template_html__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! admin/screens/collection/species-item-template.html */ "HKtk");
/* harmony import */ var admin_screens_collection_species_item_template_html__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(admin_screens_collection_species_item_template_html__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var admin_screens_collection_species_collection_template_html__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! admin/screens/collection/species-collection-template.html */ "n9OE");
/* harmony import */ var admin_screens_collection_species_collection_template_html__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(admin_screens_collection_species_collection_template_html__WEBPACK_IMPORTED_MODULE_8__);
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {
  try {
    var info = gen[key](arg);
    var value = info.value;
  } catch (error) {
    reject(error);
    return;
  }

  if (info.done) {
    resolve(value);
  } else {
    Promise.resolve(value).then(_next, _throw);
  }
}

function _asyncToGenerator(fn) {
  return function () {
    var self = this,
        args = arguments;
    return new Promise(function (resolve, reject) {
      var gen = fn.apply(self, args);

      function _next(value) {
        asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);
      }

      function _throw(err) {
        asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);
      }

      _next(undefined);
    });
  };
}











var renderAddSpeciesToCollection = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(collection, speciesName, origin) {
    var template, parent, species, hasOptions, speciesLinks, speciesLink;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            template = document.createElement('template');
            template.innerHTML = (admin_screens_collection_species_item_template_html__WEBPACK_IMPORTED_MODULE_7___default());
            parent = document.querySelector('.js-collection-items');
            _context.next = 5;
            return api_firebase_firestore__WEBPACK_IMPORTED_MODULE_1__.firestore.getSpeciesByName(speciesName);

          case 5:
            species = _context.sent;
            collection.species.push(species);
            _context.next = 9;
            return api_firebase_firestore__WEBPACK_IMPORTED_MODULE_1__.firestore.updateCollection(collection);

          case 9:
            hasOptions = origin === 'SPECIES' ? 'hide-important' : '';
            (0,ui_helpers_templating__WEBPACK_IMPORTED_MODULE_2__.renderTemplate)({
              species: species,
              isActive: collection.isActive,
              hasOptions: hasOptions
            }, template.content, parent);
            speciesLinks = document.querySelectorAll('ul > li.custom-control.custom-checkbox');
            speciesLink = speciesLinks[speciesLinks.length - 1];
            addSpeciesClickHandler(speciesLink, collection, document.querySelector('#js-collection-options'), origin);

          case 14:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, this);
  }));

  return function renderAddSpeciesToCollection(_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
}();

var addSpeciesClickHandler = function addSpeciesClickHandler(link, collection, optionsParent, origin) {
  return link.addEventListener('click', /*#__PURE__*/function () {
    var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(e) {
      var speciesName, species;
      return regeneratorRuntime.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              speciesName = e.target.getAttribute('name');

              if (speciesName) {
                _context2.next = 3;
                break;
              }

              return _context2.abrupt("return");

            case 3:
              _context2.next = 5;
              return api_firebase_firestore__WEBPACK_IMPORTED_MODULE_1__.firestore.getSpeciesByName(speciesName);

            case 5:
              species = _context2.sent;
              _context2.t0 = origin;
              _context2.next = _context2.t0 === 'QUESTIONS' ? 9 : _context2.t0 === 'VIDEO' ? 11 : 12;
              break;

            case 9:
              (0,admin_screens_questions_questions_tabs__WEBPACK_IMPORTED_MODULE_3__.renderQuestionTabs)(collection, species, optionsParent);
              return _context2.abrupt("break", 12);

            case 11:
              (0,admin_screens_video_create_video_description__WEBPACK_IMPORTED_MODULE_6__.createVideoDescription)(collection, species);

            case 12:
              window.snapdragon.species = species;

            case 13:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2, this);
    }));

    return function (_x4) {
      return _ref2.apply(this, arguments);
    };
  }());
};

var collectionPickedHandler = /*#__PURE__*/function () {
  var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(collection, origin) {
    var template, parent, items, _collection, hasOptions, optionsParent, chkBoxes, speciesLinks, addSpecies;

    return regeneratorRuntime.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            template = document.createElement('template');
            template.innerHTML = (admin_screens_collection_species_collection_template_html__WEBPACK_IMPORTED_MODULE_8___default());
            parent = document.querySelector('.js-collection-species');
            parent.innerHTML = '';
            collection.isPrivate = collection ? collection.isPrivate || false : false;
            items = collection.items && collection.items.length > 0 ? collection.items : collection.species;

            if (!(items.length > 0)) {
              _context4.next = 17;
              break;
            }

            if (items[0].vernacularName) {
              _context4.next = 16;
              break;
            }

            _context4.next = 10;
            return ui_helpers_collection_handler__WEBPACK_IMPORTED_MODULE_4__.collectionHandler.getSpeciesDetailsInParallel(items);

          case 10:
            items = _context4.sent;
            items = items.filter(function (item) {
              return item.taxonomy;
            });
            _context4.next = 14;
            return ui_helpers_collection_handler__WEBPACK_IMPORTED_MODULE_4__.collectionHandler.loadCollectionItemProperties({
              items: items
            }, {
              language: 'en',
              guide: {
                guideMode: ui_helpers_enum_helper__WEBPACK_IMPORTED_MODULE_0__.enums.guideMode.STATIC.name
              }
            });

          case 14:
            _collection = _context4.sent;
            if (_collection) items = _collection.items;

          case 16:
            items.forEach(function (item) {
              if (!item.hasOwnProperty('isActive')) {
                item.isActive = true;
              }
            });

          case 17:
            hasOptions = origin === 'SPECIES' ? 'hide-important' : '';
            (0,ui_helpers_templating__WEBPACK_IMPORTED_MODULE_2__.renderTemplate)({
              collection: collection,
              items: items,
              hasOptions: hasOptions
            }, template.content, parent);
            if (collection.isActive) document.querySelector('#isActiveChkBox').setAttribute('checked', 'checked');
            if (collection.isPrivate) document.querySelector('#isPrivateChkBox').setAttribute('checked', 'checked');
            optionsParent = document.querySelector('#js-collection-options'); // if(origin == 'SPECIES') optionsParent.classList.remove('hide');

            chkBoxes = document.querySelectorAll('.custom-control-input');
            chkBoxes.forEach(function (chkBox) {
              if (chkBox.dataset.isActive === 'true') {
                chkBox.setAttribute('checked', 'checked');
              } else {
                chkBox.parentElement.classList.add('disabled');
              }
            });
            chkBoxes.forEach(function (chkBox) {
              return chkBox.addEventListener('click', function (e) {
                var species = e.target;
                collection.items.forEach( /*#__PURE__*/function () {
                  var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(item) {
                    return regeneratorRuntime.wrap(function _callee3$(_context3) {
                      while (1) {
                        switch (_context3.prev = _context3.next) {
                          case 0:
                            if (!(item.name === species.id)) {
                              _context3.next = 6;
                              break;
                            }

                            item.isActive = species.checked;
                            species.checked ? chkBox.parentElement.classList.remove('disabled') : chkBox.parentElement.classList.add('disabled');
                            ;
                            _context3.next = 6;
                            return api_firebase_firestore__WEBPACK_IMPORTED_MODULE_1__.firestore.updateCollection(collection);

                          case 6:
                          case "end":
                            return _context3.stop();
                        }
                      }
                    }, _callee3, this);
                  }));

                  return function (_x7) {
                    return _ref4.apply(this, arguments);
                  };
                }());
              });
            });
            speciesLinks = document.querySelectorAll('i.fa-marker');
            speciesLinks.forEach(function (link) {
              return editCollectionHandler.addSpeciesClickHandler(link, collection, optionsParent, origin);
            });
            addSpecies = document.querySelector('.js-add-species');
            addSpecies.addEventListener('click', function (e) {
              (0,ui_create_guide_modal_species_picker__WEBPACK_IMPORTED_MODULE_5__.renderSpeciesPicker)({
                config: null,
                container: null,
                selectedSpecies: items.map(function (item) {
                  return item.name;
                })
              }, optionsParent);
            });

          case 29:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4, this);
  }));

  return function collectionPickedHandler(_x5, _x6) {
    return _ref3.apply(this, arguments);
  };
}();

var updateCollection = /*#__PURE__*/function () {
  var _ref5 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5(collection) {
    return regeneratorRuntime.wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            _context5.next = 2;
            return api_firebase_firestore__WEBPACK_IMPORTED_MODULE_1__.firestore.updateCollection(collection);

          case 2:
            return _context5.abrupt("return", _context5.sent);

          case 3:
          case "end":
            return _context5.stop();
        }
      }
    }, _callee5, this);
  }));

  return function updateCollection(_x8) {
    return _ref5.apply(this, arguments);
  };
}();

var editCollectionHandler = {
  renderAddSpeciesToCollection: renderAddSpeciesToCollection,
  addSpeciesClickHandler: addSpeciesClickHandler,
  collectionPickedHandler: collectionPickedHandler,
  updateCollection: updateCollection
};

/***/ }),

/***/ "1ehi":
/*!*******************************************************************!*\
  !*** ./src/admin/screens/collection/edit-collection-questions.js ***!
  \*******************************************************************/
/*! namespace exports */
/*! export editCollectionQuestions [provided] [used] [could be renamed] */
/*! other exports [not provided] [unused] */
/*! runtime requirements: __webpack_require__, __webpack_require__.n, __webpack_exports__, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "editCollectionQuestions": () => /* binding */ editCollectionQuestions
/* harmony export */ });
/* harmony import */ var ui_helpers_templating__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ui/helpers/templating */ "xNSC");
/* harmony import */ var admin_screens_collection_collection_picker__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! admin/screens/collection/collection-picker */ "J9j8");
/* harmony import */ var ui_create_guide_modal_species_editor__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ui/create-guide-modal/species-editor */ "85sm");
/* harmony import */ var admin_screens_collection_edit_collection_handler__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! admin/screens/collection/edit-collection-handler */ "nArn");
/* harmony import */ var admin_screens_collection_edit_collection_questions_template_html__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! admin/screens/collection/edit-collection-questions-template.html */ "+EoT");
/* harmony import */ var admin_screens_collection_edit_collection_questions_template_html__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(admin_screens_collection_edit_collection_questions_template_html__WEBPACK_IMPORTED_MODULE_4__);
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {
  try {
    var info = gen[key](arg);
    var value = info.value;
  } catch (error) {
    reject(error);
    return;
  }

  if (info.done) {
    resolve(value);
  } else {
    Promise.resolve(value).then(_next, _throw);
  }
}

function _asyncToGenerator(fn) {
  return function () {
    var self = this,
        args = arguments;
    return new Promise(function (resolve, reject) {
      var gen = fn.apply(self, args);

      function _next(value) {
        asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);
      }

      function _throw(err) {
        asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);
      }

      _next(undefined);
    });
  };
}






var editCollectionQuestions = function editCollectionQuestions() {
  var init = /*#__PURE__*/function () {
    var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3() {
      var template, parent, inputCollection, collection, addSpeciesHandler;
      return regeneratorRuntime.wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              template = document.createElement('template');
              template.innerHTML = (admin_screens_collection_edit_collection_questions_template_html__WEBPACK_IMPORTED_MODULE_4___default());
              parent = document.querySelector('#content-container');
              parent.innerHTML = '';
              (0,ui_helpers_templating__WEBPACK_IMPORTED_MODULE_0__.renderTemplate)({}, template.content, parent);
              inputCollection = document.querySelector('#input-collection');
              setTimeout(function () {
                inputCollection.focus();
              }, 200);
              collection = window.snapdragon.collection;

              if (collection) {
                admin_screens_collection_edit_collection_handler__WEBPACK_IMPORTED_MODULE_3__.editCollectionHandler.collectionPickedHandler(collection, 'QUESTIONS');
                setTimeout(function () {
                  inputCollection.value = collection.name;
                }, 250);
              }

              (0,admin_screens_collection_collection_picker__WEBPACK_IMPORTED_MODULE_1__.collectionPicker)(inputCollection, /*#__PURE__*/function () {
                var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(selectedCollection) {
                  return regeneratorRuntime.wrap(function _callee$(_context) {
                    while (1) {
                      switch (_context.prev = _context.next) {
                        case 0:
                          collection = selectedCollection;
                          admin_screens_collection_edit_collection_handler__WEBPACK_IMPORTED_MODULE_3__.editCollectionHandler.collectionPickedHandler(selectedCollection, 'QUESTIONS');

                        case 2:
                        case "end":
                          return _context.stop();
                      }
                    }
                  }, _callee, this);
                }));

                return function (_x) {
                  return _ref2.apply(this, arguments);
                };
              }());

              addSpeciesHandler = /*#__PURE__*/function () {
                var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(speciesName) {
                  return regeneratorRuntime.wrap(function _callee2$(_context2) {
                    while (1) {
                      switch (_context2.prev = _context2.next) {
                        case 0:
                          admin_screens_collection_edit_collection_handler__WEBPACK_IMPORTED_MODULE_3__.editCollectionHandler.renderAddSpeciesToCollection(collection, speciesName, 'QUESTIONS');

                        case 1:
                        case "end":
                          return _context2.stop();
                      }
                    }
                  }, _callee2, this);
                }));

                return function addSpeciesHandler(_x2) {
                  return _ref3.apply(this, arguments);
                };
              }();

              (0,ui_create_guide_modal_species_editor__WEBPACK_IMPORTED_MODULE_2__.addListenerToAddedSpecies)(addSpeciesHandler);

            case 12:
            case "end":
              return _context3.stop();
          }
        }
      }, _callee3, this);
    }));

    return function init() {
      return _ref.apply(this, arguments);
    };
  }();

  init();
};

/***/ }),

/***/ "osIb":
/*!***************************************************************!*\
  !*** ./src/admin/screens/collection/edit-collection-terms.js ***!
  \***************************************************************/
/*! namespace exports */
/*! export editCollectionTerms [provided] [used] [could be renamed] */
/*! other exports [not provided] [unused] */
/*! runtime requirements: __webpack_require__, __webpack_require__.n, __webpack_exports__, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "editCollectionTerms": () => /* binding */ editCollectionTerms
/* harmony export */ });
/* harmony import */ var autocompleter__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! autocompleter */ "B89K");
/* harmony import */ var autocompleter__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(autocompleter__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var utils_utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! utils/utils */ "EHpu");
/* harmony import */ var api_firebase_firestore__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! api/firebase/firestore */ "xWjd");
/* harmony import */ var ui_helpers_templating__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ui/helpers/templating */ "xNSC");
/* harmony import */ var admin_screens_collection_collection_picker__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! admin/screens/collection/collection-picker */ "J9j8");
/* harmony import */ var admin_screens_collection_edit_collection_terms_template_html__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! admin/screens/collection/edit-collection-terms-template.html */ "3F24");
/* harmony import */ var admin_screens_collection_edit_collection_terms_template_html__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(admin_screens_collection_edit_collection_terms_template_html__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var admin_screens_collection_terms_collection_template_html__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! admin/screens/collection/terms-collection-template.html */ "Iv74");
/* harmony import */ var admin_screens_collection_terms_collection_template_html__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(admin_screens_collection_terms_collection_template_html__WEBPACK_IMPORTED_MODULE_6__);
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {
  try {
    var info = gen[key](arg);
    var value = info.value;
  } catch (error) {
    reject(error);
    return;
  }

  if (info.done) {
    resolve(value);
  } else {
    Promise.resolve(value).then(_next, _throw);
  }
}

function _asyncToGenerator(fn) {
  return function () {
    var self = this,
        args = arguments;
    return new Promise(function (resolve, reject) {
      var gen = fn.apply(self, args);

      function _next(value) {
        asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);
      }

      function _throw(err) {
        asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);
      }

      _next(undefined);
    });
  };
}








var editCollectionTerms = function editCollectionTerms() {
  var init = /*#__PURE__*/function () {
    var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3() {
      var template, parent, inputCollection, inputTerm, collection, glossary, definitions, btnAddTermToCollection, addTermToCollection, getCollectionTerms;
      return regeneratorRuntime.wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              template = document.createElement('template');
              template.innerHTML = (admin_screens_collection_edit_collection_terms_template_html__WEBPACK_IMPORTED_MODULE_5___default());
              parent = document.querySelector('#content-container');
              parent.innerHTML = '';
              (0,ui_helpers_templating__WEBPACK_IMPORTED_MODULE_3__.renderTemplate)({}, template.content, parent);
              inputCollection = document.querySelector('#input-collection');
              setTimeout(function () {
                inputCollection.focus();
              });
              inputTerm = document.querySelector('#input-term');
              collection = window.snapdragon.collection;

              if (collection) {
                getCollectionTerms(collection);
                setTimeout(function () {
                  inputCollection.value = collection.name;
                }, 250);
              }

              (0,admin_screens_collection_collection_picker__WEBPACK_IMPORTED_MODULE_4__.collectionPicker)(inputCollection, /*#__PURE__*/function () {
                var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(selectedCollection) {
                  return regeneratorRuntime.wrap(function _callee$(_context) {
                    while (1) {
                      switch (_context.prev = _context.next) {
                        case 0:
                          collection = selectedCollection;
                          inputTerm.focus();
                          getCollectionTerms(collection);

                        case 3:
                        case "end":
                          return _context.stop();
                      }
                    }
                  }, _callee, this);
                }));

                return function (_x) {
                  return _ref2.apply(this, arguments);
                };
              }());
              _context3.next = 13;
              return api_firebase_firestore__WEBPACK_IMPORTED_MODULE_2__.firestore.getDefinitionsByTaxa(['common', 'plantae', 'aves', 'fungi', 'insecta']);

            case 13:
              glossary = _context3.sent;
              definitions = glossary.map(function (definition) {
                return {
                  name: definition.term,
                  label: definition.term
                };
              });
              autocompleter__WEBPACK_IMPORTED_MODULE_0___default()({
                input: inputTerm,
                fetch: function fetch(text, update) {
                  text = text.toLowerCase();
                  var suggestions = definitions.filter(function (definition) {
                    return definition.name.toLowerCase().startsWith(text);
                  });
                  update(suggestions);
                },
                onSelect: function onSelect(item) {
                  inputTerm.value = item.label;
                },
                minLength: 0,
                debounceWaitMs: 200,
                className: 'autocomplete-options-container'
              });
              btnAddTermToCollection = document.querySelector('.btnAddTermToCollection');
              btnAddTermToCollection.addEventListener('click', function (e) {
                addTermToCollection();
              });
              inputTerm.addEventListener('keypress', function (event) {
                if (event.keyCode == 13) {
                  addTermToCollection();
                }
              });
              inputTerm.addEventListener('keydown', function (event) {
                if (event.keyCode == 9) {
                  var highlightedText = document.querySelector('.selected');

                  if (highlightedText) {
                    inputTerm.value = highlightedText.innerText;
                    addTermToCollection();
                  }
                }
              });

              addTermToCollection = function addTermToCollection() {
                var termToDelete = glossary.find(function (definition) {
                  return definition.term === inputTerm.value;
                }).id;
                var savedText = document.querySelector('.js-saved');

                if (collection) {
                  collection.terms = collection.terms || [];
                  collection.terms.push(termToDelete);
                  updateCollection(collection, savedText, inputTerm);
                } else {
                  savedText.innerHTML = 'You must first select a collection!';
                  savedText.classList.remove('hide');
                }

                setTimeout(function () {
                  savedText.classList.add('hide');
                }, 2500);
                var definition = glossary.find(function (definition) {
                  return definition.term === inputTerm.value;
                });
                var termsList = document.querySelector('.js-terms-list');

                if (termsList) {
                  termsList.innerHTML += "<li>\n                    <div class=\"centred-block\">\n                        <span>".concat(definition.term, "</span>\n                        <i id=\"").concat(definition.id, "\" class=\"margin-left fas fa-trash\"></i>\n                    </div>\n                </li>");
                }

                handleDeleteTerm(collection);
              };

              getCollectionTerms = /*#__PURE__*/function () {
                var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(collection) {
                  var collectinTerms, _definitions;

                  return regeneratorRuntime.wrap(function _callee2$(_context2) {
                    while (1) {
                      switch (_context2.prev = _context2.next) {
                        case 0:
                          collectinTerms = document.querySelector('.js-collection-terms');
                          collectinTerms.innerHTML = '';

                          if (!collection) {
                            _context2.next = 11;
                            break;
                          }

                          if (!collection.terms) {
                            _context2.next = 11;
                            break;
                          }

                          _context2.next = 6;
                          return api_firebase_firestore__WEBPACK_IMPORTED_MODULE_2__.firestore.getBatchDefinitionsById(collection.terms);

                        case 6:
                          _definitions = _context2.sent;
                          _definitions = utils_utils__WEBPACK_IMPORTED_MODULE_1__.utils.sortAlphabeticallyBy(_definitions, 'term');
                          template.innerHTML = (admin_screens_collection_terms_collection_template_html__WEBPACK_IMPORTED_MODULE_6___default());
                          (0,ui_helpers_templating__WEBPACK_IMPORTED_MODULE_3__.renderTemplate)({
                            definitions: _definitions
                          }, template.content, document.querySelector('.js-collection-terms'));
                          handleDeleteTerm(collection);

                        case 11:
                        case "end":
                          return _context2.stop();
                      }
                    }
                  }, _callee2, this);
                }));

                return function getCollectionTerms(_x2) {
                  return _ref3.apply(this, arguments);
                };
              }();

            case 22:
            case "end":
              return _context3.stop();
          }
        }
      }, _callee3, this);
    }));

    return function init() {
      return _ref.apply(this, arguments);
    };
  }();

  init();
};

var updateCollection = function updateCollection(collection, savedText, inputTerm) {
  api_firebase_firestore__WEBPACK_IMPORTED_MODULE_2__.firestore.updateCollection(collection).then(function (response) {
    savedText.innerHTML = 'The term was added to collection successfully!';
    savedText.classList.remove('hide');
    inputTerm.value = '';
    inputTerm.focus();
  })["catch"](function (e) {
    savedText.innerHTML = "Oops, something went wrong, namely: ".concat(e);
    savedText.classList.remove('hide');
  });
};

var handleDeleteTerm = function handleDeleteTerm(collection) {
  var termDeleteIcons = document.querySelectorAll('.js-terms-list li i');
  termDeleteIcons.forEach(function (icon) {
    icon.addEventListener('click', function (e) {
      var termToDelete = e.target;
      collection.terms = collection.terms.filter(function (term) {
        return term !== termToDelete.id;
      });
      api_firebase_firestore__WEBPACK_IMPORTED_MODULE_2__.firestore.updateCollection(collection);
      termToDelete.parentElement.parentElement.style.display = 'none';
    });
  });
};

/***/ }),

/***/ "T5Kc":
/*!***************************************************************!*\
  !*** ./src/admin/screens/collection/edit-collection-video.js ***!
  \***************************************************************/
/*! namespace exports */
/*! export editCollectionVideo [provided] [used] [could be renamed] */
/*! other exports [not provided] [unused] */
/*! runtime requirements: __webpack_require__, __webpack_require__.n, __webpack_exports__, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "editCollectionVideo": () => /* binding */ editCollectionVideo
/* harmony export */ });
/* harmony import */ var ui_helpers_templating__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ui/helpers/templating */ "xNSC");
/* harmony import */ var admin_screens_collection_collection_picker__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! admin/screens/collection/collection-picker */ "J9j8");
/* harmony import */ var ui_create_guide_modal_species_editor__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ui/create-guide-modal/species-editor */ "85sm");
/* harmony import */ var admin_screens_collection_edit_collection_handler__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! admin/screens/collection/edit-collection-handler */ "nArn");
/* harmony import */ var admin_screens_collection_edit_collection_template_html__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! admin/screens/collection/edit-collection-template.html */ "qs3Y");
/* harmony import */ var admin_screens_collection_edit_collection_template_html__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(admin_screens_collection_edit_collection_template_html__WEBPACK_IMPORTED_MODULE_4__);
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {
  try {
    var info = gen[key](arg);
    var value = info.value;
  } catch (error) {
    reject(error);
    return;
  }

  if (info.done) {
    resolve(value);
  } else {
    Promise.resolve(value).then(_next, _throw);
  }
}

function _asyncToGenerator(fn) {
  return function () {
    var self = this,
        args = arguments;
    return new Promise(function (resolve, reject) {
      var gen = fn.apply(self, args);

      function _next(value) {
        asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);
      }

      function _throw(err) {
        asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);
      }

      _next(undefined);
    });
  };
}






var editCollectionVideo = function editCollectionVideo() {
  var init = /*#__PURE__*/function () {
    var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3() {
      var template, parent, inputCollection, collection, addSpeciesHandler;
      return regeneratorRuntime.wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              template = document.createElement('template');
              template.innerHTML = (admin_screens_collection_edit_collection_template_html__WEBPACK_IMPORTED_MODULE_4___default());
              parent = document.querySelector('#content-container');
              parent.innerHTML = '';
              (0,ui_helpers_templating__WEBPACK_IMPORTED_MODULE_0__.renderTemplate)({}, template.content, parent);
              inputCollection = document.querySelector('#input-collection');
              setTimeout(function () {
                inputCollection.focus();
              }, 200);
              collection = window.snapdragon.collection;

              if (collection) {
                admin_screens_collection_edit_collection_handler__WEBPACK_IMPORTED_MODULE_3__.editCollectionHandler.collectionPickedHandler(collection, 'VIDEO');
                setTimeout(function () {
                  inputCollection.value = collection.name;
                }, 250);
              }

              (0,admin_screens_collection_collection_picker__WEBPACK_IMPORTED_MODULE_1__.collectionPicker)(inputCollection, /*#__PURE__*/function () {
                var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(selectedCollection) {
                  return regeneratorRuntime.wrap(function _callee$(_context) {
                    while (1) {
                      switch (_context.prev = _context.next) {
                        case 0:
                          collection = selectedCollection;
                          admin_screens_collection_edit_collection_handler__WEBPACK_IMPORTED_MODULE_3__.editCollectionHandler.collectionPickedHandler(selectedCollection, 'VIDEO');

                        case 2:
                        case "end":
                          return _context.stop();
                      }
                    }
                  }, _callee, this);
                }));

                return function (_x) {
                  return _ref2.apply(this, arguments);
                };
              }());

              addSpeciesHandler = /*#__PURE__*/function () {
                var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(speciesName) {
                  return regeneratorRuntime.wrap(function _callee2$(_context2) {
                    while (1) {
                      switch (_context2.prev = _context2.next) {
                        case 0:
                          admin_screens_collection_edit_collection_handler__WEBPACK_IMPORTED_MODULE_3__.editCollectionHandler.renderAddSpeciesToCollection(collection, speciesName, 'VIDEO');

                        case 1:
                        case "end":
                          return _context2.stop();
                      }
                    }
                  }, _callee2, this);
                }));

                return function addSpeciesHandler(_x2) {
                  return _ref3.apply(this, arguments);
                };
              }();

              (0,ui_create_guide_modal_species_editor__WEBPACK_IMPORTED_MODULE_2__.addListenerToAddedSpecies)(addSpeciesHandler);

            case 12:
            case "end":
              return _context3.stop();
          }
        }
      }, _callee3, this);
    }));

    return function init() {
      return _ref.apply(this, arguments);
    };
  }();

  init();
};

/***/ }),

/***/ "F6ms":
/*!*********************************************************!*\
  !*** ./src/admin/screens/collection/edit-collection.js ***!
  \*********************************************************/
/*! namespace exports */
/*! export editCollection [provided] [used] [could be renamed] */
/*! other exports [not provided] [unused] */
/*! runtime requirements: __webpack_require__, __webpack_require__.n, __webpack_exports__, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "editCollection": () => /* binding */ editCollection
/* harmony export */ });
/* harmony import */ var ui_helpers_templating__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ui/helpers/templating */ "xNSC");
/* harmony import */ var admin_screens_collection_collection_picker__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! admin/screens/collection/collection-picker */ "J9j8");
/* harmony import */ var ui_create_guide_modal_species_editor__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ui/create-guide-modal/species-editor */ "85sm");
/* harmony import */ var admin_screens_collection_edit_collection_handler__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! admin/screens/collection/edit-collection-handler */ "nArn");
/* harmony import */ var admin_screens_collection_edit_collection_template_html__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! admin/screens/collection/edit-collection-template.html */ "qs3Y");
/* harmony import */ var admin_screens_collection_edit_collection_template_html__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(admin_screens_collection_edit_collection_template_html__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var admin_screens_collection_edit_collection_props_template_html__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! admin/screens/collection/edit-collection-props-template.html */ "38Xl");
/* harmony import */ var admin_screens_collection_edit_collection_props_template_html__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(admin_screens_collection_edit_collection_props_template_html__WEBPACK_IMPORTED_MODULE_5__);
function ownKeys(object, enumerableOnly) {
  var keys = Object.keys(object);

  if (Object.getOwnPropertySymbols) {
    var symbols = Object.getOwnPropertySymbols(object);
    if (enumerableOnly) symbols = symbols.filter(function (sym) {
      return Object.getOwnPropertyDescriptor(object, sym).enumerable;
    });
    keys.push.apply(keys, symbols);
  }

  return keys;
}

function _objectSpread(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i] != null ? arguments[i] : {};

    if (i % 2) {
      ownKeys(Object(source), true).forEach(function (key) {
        _defineProperty(target, key, source[key]);
      });
    } else if (Object.getOwnPropertyDescriptors) {
      Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
    } else {
      ownKeys(Object(source)).forEach(function (key) {
        Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
      });
    }
  }

  return target;
}

function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
}

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {
  try {
    var info = gen[key](arg);
    var value = info.value;
  } catch (error) {
    reject(error);
    return;
  }

  if (info.done) {
    resolve(value);
  } else {
    Promise.resolve(value).then(_next, _throw);
  }
}

function _asyncToGenerator(fn) {
  return function () {
    var self = this,
        args = arguments;
    return new Promise(function (resolve, reject) {
      var gen = fn.apply(self, args);

      function _next(value) {
        asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);
      }

      function _throw(err) {
        asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);
      }

      _next(undefined);
    });
  };
}







var editCollection = function editCollection() {
  var init = /*#__PURE__*/function () {
    var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3() {
      var template, parent, inputCollection, renderProps, collection, addSpeciesHandler;
      return regeneratorRuntime.wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              template = document.createElement('template');
              template.innerHTML = (admin_screens_collection_edit_collection_template_html__WEBPACK_IMPORTED_MODULE_4___default());
              parent = document.querySelector('#content-container');
              parent.innerHTML = '';
              (0,ui_helpers_templating__WEBPACK_IMPORTED_MODULE_0__.renderTemplate)({}, template.content, parent);
              inputCollection = document.querySelector('#input-collection');
              setTimeout(function () {
                inputCollection.focus();
              }, 200);

              renderProps = function renderProps(collection) {
                var propsContainer = document.querySelector('#js-collection-options');
                propsContainer.innerHTML = '';
                template.innerHTML = (admin_screens_collection_edit_collection_props_template_html__WEBPACK_IMPORTED_MODULE_5___default());
                (0,ui_helpers_templating__WEBPACK_IMPORTED_MODULE_0__.renderTemplate)({}, template.content, propsContainer);
                var id = document.querySelector('#input-collection-id');
                var title = document.querySelector('#input-collection-title');
                var owner = document.querySelector('#input-collection-owner');
                var intro = document.querySelector('#textarea-intro');
                var location = document.querySelector('#input-collection-location');
                var presenter = document.querySelector('#input-collection-presenter');
                var src = document.querySelector('#input-collection-src');

                if (collection.video) {
                  id.value = collection.video.id;
                  title.value = collection.video.title;
                  owner.value = collection.video.owner;
                  intro.value = collection.video.intro;
                  location.value = collection.video.location;
                  presenter.value = collection.video.presenter;
                  src.value = collection.video.src;
                }

                var btnUpdateCollection = document.querySelector('.btnUpdateCollection');
                btnUpdateCollection.addEventListener('click', function (e) {
                  var video = collection.video || {};
                  var response = admin_screens_collection_edit_collection_handler__WEBPACK_IMPORTED_MODULE_3__.editCollectionHandler.updateCollection({
                    name: collection.name,
                    video: _objectSpread(_objectSpread({}, video), {}, {
                      id: id.value,
                      title: title.value,
                      owner: owner.value,
                      intro: intro.value,
                      location: location.value,
                      presenter: presenter.value,
                      src: src.value
                    })
                  });
                });
              };

              collection = window.snapdragon.collection;

              if (collection) {
                admin_screens_collection_edit_collection_handler__WEBPACK_IMPORTED_MODULE_3__.editCollectionHandler.collectionPickedHandler(collection, 'SPECIES');
                renderProps(collection);
                setTimeout(function () {
                  inputCollection.value = collection.name;
                }, 250);
              }

              (0,admin_screens_collection_collection_picker__WEBPACK_IMPORTED_MODULE_1__.collectionPicker)(inputCollection, /*#__PURE__*/function () {
                var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(selectedCollection) {
                  return regeneratorRuntime.wrap(function _callee$(_context) {
                    while (1) {
                      switch (_context.prev = _context.next) {
                        case 0:
                          collection = selectedCollection;
                          admin_screens_collection_edit_collection_handler__WEBPACK_IMPORTED_MODULE_3__.editCollectionHandler.collectionPickedHandler(selectedCollection, 'SPECIES');
                          renderProps(collection);
                          template.innerHTML = (admin_screens_collection_edit_collection_template_html__WEBPACK_IMPORTED_MODULE_4___default());

                        case 4:
                        case "end":
                          return _context.stop();
                      }
                    }
                  }, _callee, this);
                }));

                return function (_x) {
                  return _ref2.apply(this, arguments);
                };
              }());

              addSpeciesHandler = /*#__PURE__*/function () {
                var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(speciesName) {
                  return regeneratorRuntime.wrap(function _callee2$(_context2) {
                    while (1) {
                      switch (_context2.prev = _context2.next) {
                        case 0:
                          admin_screens_collection_edit_collection_handler__WEBPACK_IMPORTED_MODULE_3__.editCollectionHandler.renderAddSpeciesToCollection(collection, speciesName, 'SPECIES');

                        case 1:
                        case "end":
                          return _context2.stop();
                      }
                    }
                  }, _callee2, this);
                }));

                return function addSpeciesHandler(_x2) {
                  return _ref3.apply(this, arguments);
                };
              }();

              (0,ui_create_guide_modal_species_editor__WEBPACK_IMPORTED_MODULE_2__.addListenerToAddedSpecies)(addSpeciesHandler);

            case 13:
            case "end":
              return _context3.stop();
          }
        }
      }, _callee3, this);
    }));

    return function init() {
      return _ref.apply(this, arguments);
    };
  }();

  init();
};

/***/ }),

/***/ "vTWM":
/*!*****************************************************!*\
  !*** ./src/admin/screens/questions/add-question.js ***!
  \*****************************************************/
/*! namespace exports */
/*! export addQuestion [provided] [used] [could be renamed] */
/*! other exports [not provided] [unused] */
/*! runtime requirements: __webpack_require__, __webpack_require__.n, __webpack_exports__, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "addQuestion": () => /* binding */ addQuestion
/* harmony export */ });
/* harmony import */ var ui_helpers_templating__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ui/helpers/templating */ "xNSC");
/* harmony import */ var api_firebase_firestore__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! api/firebase/firestore */ "xWjd");
/* harmony import */ var admin_screens_questions_add_question_template_html__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! admin/screens/questions/add-question-template.html */ "nS2Y");
/* harmony import */ var admin_screens_questions_add_question_template_html__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(admin_screens_questions_add_question_template_html__WEBPACK_IMPORTED_MODULE_2__);
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {
  try {
    var info = gen[key](arg);
    var value = info.value;
  } catch (error) {
    reject(error);
    return;
  }

  if (info.done) {
    resolve(value);
  } else {
    Promise.resolve(value).then(_next, _throw);
  }
}

function _asyncToGenerator(fn) {
  return function () {
    var self = this,
        args = arguments;
    return new Promise(function (resolve, reject) {
      var gen = fn.apply(self, args);

      function _next(value) {
        asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);
      }

      function _throw(err) {
        asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);
      }

      _next(undefined);
    });
  };
}




var addQuestion = function addQuestion(activeSpecies) {
  var parent = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;

  var init = /*#__PURE__*/function () {
    var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
      var species, taxonomy, template, questions, elems, instances;
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              species = activeSpecies || !!window.snapdragon.species ? window.snapdragon.species : null;
              taxonomy = species ? species.taxonomy : null;
              template = document.createElement('template');
              template.innerHTML = (admin_screens_questions_add_question_template_html__WEBPACK_IMPORTED_MODULE_2___default());
              _context.next = 6;
              return api_firebase_firestore__WEBPACK_IMPORTED_MODULE_1__.firestore.getQuestionsWhere({
                key: 'taxon',
                operator: '==',
                value: species ? species.name : ''
              });

            case 6:
              questions = _context.sent;
              (0,ui_helpers_templating__WEBPACK_IMPORTED_MODULE_0__.renderTemplate)({
                questions: questions
              }, template.content, parent);
              elems = document.querySelectorAll('.collapsible');
              instances = M.Collapsible.init(elems, {});

            case 10:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, this);
    }));

    return function init() {
      return _ref.apply(this, arguments);
    };
  }();

  init();
};

/***/ }),

/***/ "LqE6":
/*!********************************************************!*\
  !*** ./src/admin/screens/questions/create-question.js ***!
  \********************************************************/
/*! namespace exports */
/*! export createQuestion [provided] [used] [could be renamed] */
/*! other exports [not provided] [unused] */
/*! runtime requirements: __webpack_require__, __webpack_require__.n, __webpack_exports__, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "createQuestion": () => /* binding */ createQuestion
/* harmony export */ });
/* harmony import */ var autocompleter__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! autocompleter */ "B89K");
/* harmony import */ var autocompleter__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(autocompleter__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var api_firebase_firestore__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! api/firebase/firestore */ "xWjd");
/* harmony import */ var api_snapdragon_iconic_taxa__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! api/snapdragon/iconic-taxa */ "Bv5j");
/* harmony import */ var ui_helpers_templating__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ui/helpers/templating */ "xNSC");
/* harmony import */ var admin_screens_questions_create_question_template_html__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! admin/screens/questions/create-question-template.html */ "NYSd");
/* harmony import */ var admin_screens_questions_create_question_template_html__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(admin_screens_questions_create_question_template_html__WEBPACK_IMPORTED_MODULE_4__);
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {
  try {
    var info = gen[key](arg);
    var value = info.value;
  } catch (error) {
    reject(error);
    return;
  }

  if (info.done) {
    resolve(value);
  } else {
    Promise.resolve(value).then(_next, _throw);
  }
}

function _asyncToGenerator(fn) {
  return function () {
    var self = this,
        args = arguments;
    return new Promise(function (resolve, reject) {
      var gen = fn.apply(self, args);

      function _next(value) {
        asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);
      }

      function _throw(err) {
        asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);
      }

      _next(undefined);
    });
  };
}






var createQuestion = function createQuestion(collection, activeSpecies) {
  var parent = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;

  var init = /*#__PURE__*/function () {
    var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
      var species, taxonomy, template, inputIconicTaxon, keys, iconicTaxaKeys, inputTaxonRank, ranks, inputTaxon, inputStatement, inputQuestion, inputAnswer, inputAnswers1, inputAnswers2, inputAnswers3, elems, getQuestion, btnCreateQuestion;
      return regeneratorRuntime.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              species = activeSpecies || !!window.snapdragon.species ? window.snapdragon.species : null;
              taxonomy = species ? species.taxonomy : null;
              template = document.createElement('template');
              template.innerHTML = (admin_screens_questions_create_question_template_html__WEBPACK_IMPORTED_MODULE_4___default());
              parent = parent || document.querySelector('#content-container');
              parent.innerHTML = '';
              (0,ui_helpers_templating__WEBPACK_IMPORTED_MODULE_3__.renderTemplate)({}, template.content, parent); // iconic taxon

              inputIconicTaxon = document.querySelector('#input-iconic-taxon');
              inputIconicTaxon.focus();
              keys = [];
              iconicTaxaKeys = Object.keys(api_snapdragon_iconic_taxa__WEBPACK_IMPORTED_MODULE_2__.iconicTaxa).map(function (key) {
                return key.toLowerCase();
              });
              iconicTaxaKeys.forEach(function (taxon) {
                keys.push({
                  label: taxon,
                  value: taxon
                });
              });
              autocompleter__WEBPACK_IMPORTED_MODULE_0___default()({
                input: inputIconicTaxon,
                fetch: function fetch(text, update) {
                  text = text.toLowerCase();
                  var suggestions = keys.filter(function (n) {
                    return n.value.toLowerCase().startsWith(text);
                  });
                  update(suggestions);
                },
                onSelect: function onSelect(item) {
                  inputIconicTaxon.value = item.label;
                },
                minLength: 1,
                debounceWaitMs: 200,
                className: 'autocomplete-options-container'
              }); // keyCodes: 9 - tab; 13 - enter
              // rank

              inputTaxonRank = document.querySelector('#input-taxon-rank');
              ranks = [{
                label: 'class',
                value: 'class'
              }, {
                label: 'order',
                value: 'order'
              }, {
                label: 'family',
                value: 'family'
              }, {
                label: 'genus',
                value: 'genus'
              }, {
                label: 'species',
                value: 'species'
              }];
              autocompleter__WEBPACK_IMPORTED_MODULE_0___default()({
                input: inputTaxonRank,
                fetch: function fetch(text, update) {
                  text = text.toLowerCase();
                  var suggestions = ranks.filter(function (n) {
                    return n.value.toLowerCase().startsWith(text);
                  });
                  update(suggestions);
                },
                onSelect: function onSelect(item) {
                  inputTaxonRank.value = item.label;

                  if (taxonomy) {
                    inputTaxon.value = taxonomy[item.label] ? taxonomy[item.label] : species.name;
                  }
                },
                minLength: 0,
                debounceWaitMs: 200,
                className: 'autocomplete-options-container'
              });

              if (species) {
                inputIconicTaxon.value = (0,api_snapdragon_iconic_taxa__WEBPACK_IMPORTED_MODULE_2__.matchTaxon)(species.taxonomy, api_snapdragon_iconic_taxa__WEBPACK_IMPORTED_MODULE_2__.iconicTaxa).value;
                inputTaxonRank.value = ranks[4].value;
              } // taxon


              inputTaxon = document.querySelector('#input-taxon');

              if (species) {
                inputTaxon.value = species.name;
              }

              inputStatement = document.querySelector('#input-statement');
              inputQuestion = document.querySelector('#input-question');
              inputAnswer = document.querySelector('#input-answer');
              inputAnswers1 = document.querySelector('#input-answers1');
              inputAnswers2 = document.querySelector('#input-answers2');
              inputAnswers3 = document.querySelector('#input-answers3');
              inputStatement.focus();
              elems = document.querySelectorAll('.has-character-counter');
              M.CharacterCounter.init(elems);

              getQuestion = function getQuestion() {
                return {
                  provider: 'snapdragon',
                  iconicTaxon: inputIconicTaxon.value,
                  rank: inputTaxonRank.value,
                  taxon: inputTaxon.value,
                  statement: inputStatement.value,
                  question: inputQuestion.value,
                  answer: inputAnswer.value,
                  answers: [inputAnswers1.value, inputAnswers2.value, inputAnswers3.value]
                };
              };

              btnCreateQuestion = document.querySelector('.btnCreateQuestion');
              btnCreateQuestion.addEventListener('click', /*#__PURE__*/function () {
                var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(e) {
                  var question, questionDocRef, collectionDocRef;
                  return regeneratorRuntime.wrap(function _callee$(_context) {
                    while (1) {
                      switch (_context.prev = _context.next) {
                        case 0:
                          question = getQuestion();
                          _context.next = 3;
                          return api_firebase_firestore__WEBPACK_IMPORTED_MODULE_1__.firestore.addQuestion(question);

                        case 3:
                          questionDocRef = _context.sent;

                          if (questionDocRef) {}

                          collection.species.forEach(function (species) {
                            if (species.name === activeSpecies.name) {
                              species.questions = species.questions || [];
                              species.questions.push(question);
                            }
                          });
                          _context.next = 8;
                          return api_firebase_firestore__WEBPACK_IMPORTED_MODULE_1__.firestore.updateCollection(collection);

                        case 8:
                          collectionDocRef = _context.sent;

                        case 9:
                        case "end":
                          return _context.stop();
                      }
                    }
                  }, _callee, this);
                }));

                return function (_x) {
                  return _ref2.apply(this, arguments);
                };
              }());

            case 31:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2, this);
    }));

    return function init() {
      return _ref.apply(this, arguments);
    };
  }();

  setTimeout(function () {
    init();
  }, 500);
};

/***/ }),

/***/ "SN1h":
/*!*******************************************************!*\
  !*** ./src/admin/screens/questions/questions-tabs.js ***!
  \*******************************************************/
/*! namespace exports */
/*! export renderQuestionTabs [provided] [used] [could be renamed] */
/*! other exports [not provided] [unused] */
/*! runtime requirements: __webpack_require__, __webpack_require__.n, __webpack_exports__, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "renderQuestionTabs": () => /* binding */ renderQuestionTabs
/* harmony export */ });
/* harmony import */ var ui_helpers_templating__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ui/helpers/templating */ "xNSC");
/* harmony import */ var admin_screens_questions_add_question__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! admin/screens/questions/add-question */ "vTWM");
/* harmony import */ var admin_screens_questions_create_question__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! admin/screens/questions/create-question */ "LqE6");
/* harmony import */ var admin_screens_questions_questions_tabs_template_html__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! admin/screens/questions/questions-tabs-template.html */ "nsnM");
/* harmony import */ var admin_screens_questions_questions_tabs_template_html__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(admin_screens_questions_questions_tabs_template_html__WEBPACK_IMPORTED_MODULE_3__);
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {
  try {
    var info = gen[key](arg);
    var value = info.value;
  } catch (error) {
    reject(error);
    return;
  }

  if (info.done) {
    resolve(value);
  } else {
    Promise.resolve(value).then(_next, _throw);
  }
}

function _asyncToGenerator(fn) {
  return function () {
    var self = this,
        args = arguments;
    return new Promise(function (resolve, reject) {
      var gen = fn.apply(self, args);

      function _next(value) {
        asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);
      }

      function _throw(err) {
        asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);
      }

      _next(undefined);
    });
  };
}





var renderQuestionTabs = function renderQuestionTabs(collection, species, parent) {
  var init = /*#__PURE__*/function () {
    var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
      var template, tabs, instance, questionPanel, addQuestionTab, createQuestionTab;
      return regeneratorRuntime.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              template = document.createElement('template');
              template.innerHTML = (admin_screens_questions_questions_tabs_template_html__WEBPACK_IMPORTED_MODULE_3___default());
              parent.innerHTML = '';
              (0,ui_helpers_templating__WEBPACK_IMPORTED_MODULE_0__.renderTemplate)({}, template.content, parent);
              tabs = document.querySelector('.tabs');
              instance = M.Tabs.init(tabs, {});
              questionPanel = document.querySelector('.js-question-panel');
              questionPanel.innerHTML = '';
              addQuestionTab = document.querySelector('#addQuestionTab');
              addQuestionTab.addEventListener('click', /*#__PURE__*/function () {
                var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(e) {
                  return regeneratorRuntime.wrap(function _callee$(_context) {
                    while (1) {
                      switch (_context.prev = _context.next) {
                        case 0:
                          questionPanel.innerHTML = '';
                          (0,admin_screens_questions_add_question__WEBPACK_IMPORTED_MODULE_1__.addQuestion)(species, questionPanel);

                        case 2:
                        case "end":
                          return _context.stop();
                      }
                    }
                  }, _callee, this);
                }));

                return function (_x) {
                  return _ref2.apply(this, arguments);
                };
              }());
              createQuestionTab = document.querySelector('#createQuestionTab');
              createQuestionTab.addEventListener('click', function (e) {
                questionPanel.innerHTML = '';
                (0,admin_screens_questions_create_question__WEBPACK_IMPORTED_MODULE_2__.createQuestion)(collection, species, questionPanel);
              });
              createQuestionTab.click();

            case 13:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2, this);
    }));

    return function init() {
      return _ref.apply(this, arguments);
    };
  }();

  init();
};

/***/ }),

/***/ "cXNG":
/*!*********************************************!*\
  !*** ./src/admin/screens/species/add-id.js ***!
  \*********************************************/
/*! namespace exports */
/*! export addId [provided] [used] [could be renamed] */
/*! other exports [not provided] [unused] */
/*! runtime requirements: __webpack_require__, __webpack_require__.n, __webpack_exports__, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "addId": () => /* binding */ addId
/* harmony export */ });
/* harmony import */ var api_firebase_firestore__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! api/firebase/firestore */ "xWjd");
/* harmony import */ var ui_helpers_templating__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ui/helpers/templating */ "xNSC");
/* harmony import */ var admin_screens_taxa_pickers__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! admin/screens/taxa-pickers */ "ukf4");
/* harmony import */ var admin_screens_species_add_id_template_html__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! admin/screens/species/add-id-template.html */ "3AgI");
/* harmony import */ var admin_screens_species_add_id_template_html__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(admin_screens_species_add_id_template_html__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var admin_screens_species_add_id_text_template_html__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! admin/screens/species/add-id-text-template.html */ "CttE");
/* harmony import */ var admin_screens_species_add_id_text_template_html__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(admin_screens_species_add_id_text_template_html__WEBPACK_IMPORTED_MODULE_4__);
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {
  try {
    var info = gen[key](arg);
    var value = info.value;
  } catch (error) {
    reject(error);
    return;
  }

  if (info.done) {
    resolve(value);
  } else {
    Promise.resolve(value).then(_next, _throw);
  }
}

function _asyncToGenerator(fn) {
  return function () {
    var self = this,
        args = arguments;
    return new Promise(function (resolve, reject) {
      var gen = fn.apply(self, args);

      function _next(value) {
        asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);
      }

      function _throw(err) {
        asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);
      }

      _next(undefined);
    });
  };
}






var addId = function addId() {
  var init = /*#__PURE__*/function () {
    var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3() {
      var item, template, parent, listenForSpeciesSelection, inputSpecies;
      return regeneratorRuntime.wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              item = window.snapdragon.species;
              template = document.createElement('template');
              template.innerHTML = (admin_screens_species_add_id_template_html__WEBPACK_IMPORTED_MODULE_3___default());
              parent = document.querySelector('#content-container');
              parent.innerHTML = '';
              (0,ui_helpers_templating__WEBPACK_IMPORTED_MODULE_1__.renderTemplate)({}, template.content, parent);
              M.updateTextFields();

              listenForSpeciesSelection = /*#__PURE__*/function () {
                var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(species) {
                  var text, itemTraits, description, textArea, btnUpdateId;
                  return regeneratorRuntime.wrap(function _callee2$(_context2) {
                    while (1) {
                      switch (_context2.prev = _context2.next) {
                        case 0:
                          item = species;
                          text = document.querySelector('.js-id-text');
                          parent = text;
                          parent.innerHTML = '';
                          template.innerHTML = (admin_screens_species_add_id_text_template_html__WEBPACK_IMPORTED_MODULE_4___default());
                          _context2.next = 7;
                          return api_firebase_firestore__WEBPACK_IMPORTED_MODULE_0__.firestore.getTraitsBySpeciesName(item.name);

                        case 7:
                          itemTraits = _context2.sent;
                          description = itemTraits['description'] ? itemTraits['description'].value[0] : '';
                          (0,ui_helpers_templating__WEBPACK_IMPORTED_MODULE_1__.renderTemplate)({
                            name: item.name,
                            description: description
                          }, template.content, parent);
                          textArea = document.querySelector('#textarea-id');
                          textArea.focus();
                          btnUpdateId = document.querySelector('.btnUpdateId');
                          btnUpdateId.addEventListener('click', /*#__PURE__*/function () {
                            var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(e) {
                              var trait, log, message;
                              return regeneratorRuntime.wrap(function _callee$(_context) {
                                while (1) {
                                  switch (_context.prev = _context.next) {
                                    case 0:
                                      trait = {
                                        description: {
                                          value: [textArea.value]
                                        }
                                      };
                                      _context.next = 3;
                                      return api_firebase_firestore__WEBPACK_IMPORTED_MODULE_0__.firestore.addTraits(item.name, trait);

                                    case 3:
                                      log = _context.sent;

                                      if (log) {
                                        message = document.querySelector('.js-message');
                                        message.innerHTML = 'Quick ID updated.';
                                        setTimeout(function () {
                                          message.innerHTML = '';
                                        }, 1000);
                                      }

                                    case 5:
                                    case "end":
                                      return _context.stop();
                                  }
                                }
                              }, _callee, this);
                            }));

                            return function (_x2) {
                              return _ref3.apply(this, arguments);
                            };
                          }());

                        case 14:
                        case "end":
                          return _context2.stop();
                      }
                    }
                  }, _callee2, this);
                }));

                return function listenForSpeciesSelection(_x) {
                  return _ref2.apply(this, arguments);
                };
              }();

              inputSpecies = document.querySelector('#input-species-for-traits');
              inputSpecies.focus();

              if (item) {
                inputSpecies.value = item.name;
                listenForSpeciesSelection(item);
              }

              (0,admin_screens_taxa_pickers__WEBPACK_IMPORTED_MODULE_2__.speciesPicker)(inputSpecies, listenForSpeciesSelection);

            case 12:
            case "end":
              return _context3.stop();
          }
        }
      }, _callee3, this);
    }));

    return function init() {
      return _ref.apply(this, arguments);
    };
  }();

  init();
};

/***/ }),

/***/ "wxAe":
/*!****************************************************!*\
  !*** ./src/admin/screens/species/add-lookalike.js ***!
  \****************************************************/
/*! namespace exports */
/*! export addLookalike [provided] [used] [could be renamed] */
/*! other exports [not provided] [unused] */
/*! runtime requirements: __webpack_require__, __webpack_require__.n, __webpack_exports__, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "addLookalike": () => /* binding */ addLookalike
/* harmony export */ });
/* harmony import */ var ramda__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ramda */ "pWpQ");
/* harmony import */ var admin_helpers__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! admin/helpers */ "B2La");
/* harmony import */ var api_firebase_firestore__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! api/firebase/firestore */ "xWjd");
/* harmony import */ var ui_helpers_templating__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ui/helpers/templating */ "xNSC");
/* harmony import */ var admin_screens_taxa_pickers__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! admin/screens/taxa-pickers */ "ukf4");
/* harmony import */ var admin_api_eol__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! admin/api/eol */ "h1XK");
/* harmony import */ var admin_screens_species_add_lookalike_template_html__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! admin/screens/species/add-lookalike-template.html */ "4pmo");
/* harmony import */ var admin_screens_species_add_lookalike_template_html__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(admin_screens_species_add_lookalike_template_html__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var admin_screens_species_add_lookalikes_list_template_html__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! admin/screens/species/add-lookalikes-list-template.html */ "XgKu");
/* harmony import */ var admin_screens_species_add_lookalikes_list_template_html__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(admin_screens_species_add_lookalikes_list_template_html__WEBPACK_IMPORTED_MODULE_6__);
function _toConsumableArray(arr) {
  return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread();
}

function _nonIterableSpread() {
  throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}

function _unsupportedIterableToArray(o, minLen) {
  if (!o) return;
  if (typeof o === "string") return _arrayLikeToArray(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor) n = o.constructor.name;
  if (n === "Map" || n === "Set") return Array.from(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
}

function _iterableToArray(iter) {
  if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter);
}

function _arrayWithoutHoles(arr) {
  if (Array.isArray(arr)) return _arrayLikeToArray(arr);
}

function _arrayLikeToArray(arr, len) {
  if (len == null || len > arr.length) len = arr.length;

  for (var i = 0, arr2 = new Array(len); i < len; i++) {
    arr2[i] = arr[i];
  }

  return arr2;
}

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {
  try {
    var info = gen[key](arg);
    var value = info.value;
  } catch (error) {
    reject(error);
    return;
  }

  if (info.done) {
    resolve(value);
  } else {
    Promise.resolve(value).then(_next, _throw);
  }
}

function _asyncToGenerator(fn) {
  return function () {
    var self = this,
        args = arguments;
    return new Promise(function (resolve, reject) {
      var gen = fn.apply(self, args);

      function _next(value) {
        asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);
      }

      function _throw(err) {
        asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);
      }

      _next(undefined);
    });
  };
}









var addLookalike = function addLookalike() {
  var snapdragonSpecies, snapdragonSpeciesB, eolSpecies, autocompleteRef, item, eolDescription, snapdragonDescription;
  snapdragonSpecies = window.snapdragon.species ? window.snapdragon.species.name : '';

  var init = /*#__PURE__*/function () {
    var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4() {
      var template, parent, loadLookalikes, inputSnapdragon, inputSnapdragonB, asyncProgress, inputEOL, searchEOLCallback, btnAddLookalike;
      return regeneratorRuntime.wrap(function _callee4$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              template = document.createElement('template');
              template.innerHTML = (admin_screens_species_add_lookalike_template_html__WEBPACK_IMPORTED_MODULE_5___default());
              parent = document.querySelector('#content-container');
              parent.innerHTML = '';
              (0,ui_helpers_templating__WEBPACK_IMPORTED_MODULE_2__.renderTemplate)({}, template.content, parent);

              loadLookalikes = /*#__PURE__*/function () {
                var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(item) {
                  var itemTraits, lookalikes, species, parent;
                  return regeneratorRuntime.wrap(function _callee2$(_context2) {
                    while (1) {
                      switch (_context2.prev = _context2.next) {
                        case 0:
                          _context2.next = 2;
                          return api_firebase_firestore__WEBPACK_IMPORTED_MODULE_1__.firestore.getTraitsBySpeciesName(item.name);

                        case 2:
                          itemTraits = _context2.sent;
                          lookalikes = itemTraits['lookalikes'];
                          species = lookalikes ? [].concat(_toConsumableArray(lookalikes.map(function (lookalike) {
                            return lookalike.lookalike;
                          })), [{
                            name: item.name,
                            description: lookalikes[0].description
                          }]) : [];
                          parent = document.querySelector('.js-lookalikes');
                          template.innerHTML = (admin_screens_species_add_lookalikes_list_template_html__WEBPACK_IMPORTED_MODULE_6___default());
                          (0,ui_helpers_templating__WEBPACK_IMPORTED_MODULE_2__.renderTemplate)({
                            species: species
                          }, template.content, parent);
                          M.updateTextFields();
                          document.querySelectorAll('.btnUpdateLookalike').forEach(function (update) {
                            update.addEventListener('click', /*#__PURE__*/function () {
                              var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(e) {
                                var name, description, trait, log;
                                return regeneratorRuntime.wrap(function _callee$(_context) {
                                  while (1) {
                                    switch (_context.prev = _context.next) {
                                      case 0:
                                        name = e.target.dataset.name;
                                        description = document.getElementById(name).value;
                                        trait = {
                                          update: {
                                            description: description,
                                            name: name
                                          }
                                        };
                                        log = api_firebase_firestore__WEBPACK_IMPORTED_MODULE_1__.firestore.addSpeciesRelationship('lookalikes', [trait]);

                                      case 4:
                                      case "end":
                                        return _context.stop();
                                    }
                                  }
                                }, _callee, this);
                              }));

                              return function (_x2) {
                                return _ref3.apply(this, arguments);
                              };
                            }());
                          });

                        case 10:
                        case "end":
                          return _context2.stop();
                      }
                    }
                  }, _callee2, this);
                }));

                return function loadLookalikes(_x) {
                  return _ref2.apply(this, arguments);
                };
              }();

              inputSnapdragon = document.querySelector('#input-species-snapdragon');
              inputSnapdragon.focus();
              (0,admin_screens_taxa_pickers__WEBPACK_IMPORTED_MODULE_3__.speciesPicker)(inputSnapdragon, function (species) {
                item = species;
                snapdragonSpecies = inputSnapdragon.value;
                loadLookalikes(item);
              });
              inputSnapdragonB = document.querySelector('#input-species-snapdragon-b');
              (0,admin_screens_taxa_pickers__WEBPACK_IMPORTED_MODULE_3__.speciesPicker)(inputSnapdragonB, function (species) {
                item = species;
                snapdragonSpeciesB = inputSnapdragonB.value;
              });
              asyncProgress = document.querySelector('.async-progress');
              inputEOL = document.querySelector('#input-species-eol');

              searchEOLCallback = function searchEOLCallback(species, ref) {
                eolSpecies = species;
                autocompleteRef = ref;
              };

              admin_api_eol__WEBPACK_IMPORTED_MODULE_4__.eol.searchEOL(inputEOL, asyncProgress, searchEOLCallback);
              btnAddLookalike = document.querySelector('.btnAddLookalike');
              btnAddLookalike.addEventListener('click', /*#__PURE__*/function () {
                var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(e) {
                  var snapdragonDescription, eolDescription, traits, speciesBName, traitA, speciesNames, isSpeciesBInSnapdragon, traitB, log, message;
                  return regeneratorRuntime.wrap(function _callee3$(_context3) {
                    while (1) {
                      switch (_context3.prev = _context3.next) {
                        case 0:
                          snapdragonDescription = document.querySelector('#input-description-a');
                          eolDescription = document.querySelector('#input-description-b');

                          if (!(snapdragonSpecies && (snapdragonSpeciesB || eolSpecies))) {
                            _context3.next = 19;
                            break;
                          }

                          traits = [];
                          speciesBName = snapdragonSpeciesB || admin_helpers__WEBPACK_IMPORTED_MODULE_0__.helpers.getBinomial(eolSpecies); // Species A

                          traitA = {
                            name: snapdragonSpecies
                          };
                          traitA.update = {
                            lookalike: {
                              name: speciesBName,
                              description: eolDescription.value
                            },
                            description: snapdragonDescription.value
                          };
                          traits.push(traitA); // Speces B

                          _context3.next = 10;
                          return api_firebase_firestore__WEBPACK_IMPORTED_MODULE_1__.firestore.getSpeciesNames();

                        case 10:
                          speciesNames = _context3.sent;
                          isSpeciesBInSnapdragon = (0,ramda__WEBPACK_IMPORTED_MODULE_7__.default)(speciesBName, speciesNames[0].value);

                          if (isSpeciesBInSnapdragon) {
                            traitB = {
                              name: speciesBName
                            };
                            traitB.update = {
                              lookalike: {
                                name: snapdragonSpecies,
                                description: snapdragonDescription.value
                              },
                              description: eolDescription.value
                            };
                            traits.push(traitB);
                          }

                          _context3.next = 15;
                          return api_firebase_firestore__WEBPACK_IMPORTED_MODULE_1__.firestore.addSpeciesRelationship('lookalikes', traits);

                        case 15:
                          log = _context3.sent;
                          message = document.querySelector('.js-message');
                          message.innerHTML = log;
                          setTimeout(function () {
                            message.innerHTML = '';
                          }, 5000);

                        case 19:
                        case "end":
                          return _context3.stop();
                      }
                    }
                  }, _callee3, this);
                }));

                return function (_x3) {
                  return _ref4.apply(this, arguments);
                };
              }());

            case 17:
            case "end":
              return _context4.stop();
          }
        }
      }, _callee4, this);
    }));

    return function init() {
      return _ref.apply(this, arguments);
    };
  }();

  init();
};

/***/ }),

/***/ "WmCP":
/*!*************************************************!*\
  !*** ./src/admin/screens/species/add-photos.js ***!
  \*************************************************/
/*! namespace exports */
/*! export addPhotos [provided] [used] [could be renamed] */
/*! other exports [not provided] [unused] */
/*! runtime requirements: __webpack_require__, __webpack_require__.n, __webpack_exports__, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "addPhotos": () => /* binding */ addPhotos
/* harmony export */ });
/* harmony import */ var ramda__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ramda */ "pWpQ");
/* harmony import */ var admin_api_eol__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! admin/api/eol */ "h1XK");
/* harmony import */ var api_firebase_firestore__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! api/firebase/firestore */ "xWjd");
/* harmony import */ var ui_helpers_templating__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ui/helpers/templating */ "xNSC");
/* harmony import */ var admin_screens_taxa_pickers__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! admin/screens/taxa-pickers */ "ukf4");
/* harmony import */ var admin_api_inat__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! admin/api/inat */ "EVST");
/* harmony import */ var admin_screens_species_add_photos_html__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! admin/screens/species/add-photos.html */ "WzKG");
/* harmony import */ var admin_screens_species_add_photos_html__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(admin_screens_species_add_photos_html__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var admin_screens_species_add_photos_gallery_html__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! admin/screens/species/add-photos-gallery.html */ "1kgz");
/* harmony import */ var admin_screens_species_add_photos_gallery_html__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(admin_screens_species_add_photos_gallery_html__WEBPACK_IMPORTED_MODULE_6__);
function ownKeys(object, enumerableOnly) {
  var keys = Object.keys(object);

  if (Object.getOwnPropertySymbols) {
    var symbols = Object.getOwnPropertySymbols(object);
    if (enumerableOnly) symbols = symbols.filter(function (sym) {
      return Object.getOwnPropertyDescriptor(object, sym).enumerable;
    });
    keys.push.apply(keys, symbols);
  }

  return keys;
}

function _objectSpread(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i] != null ? arguments[i] : {};

    if (i % 2) {
      ownKeys(Object(source), true).forEach(function (key) {
        _defineProperty(target, key, source[key]);
      });
    } else if (Object.getOwnPropertyDescriptors) {
      Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
    } else {
      ownKeys(Object(source)).forEach(function (key) {
        Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
      });
    }
  }

  return target;
}

function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
}

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {
  try {
    var info = gen[key](arg);
    var value = info.value;
  } catch (error) {
    reject(error);
    return;
  }

  if (info.done) {
    resolve(value);
  } else {
    Promise.resolve(value).then(_next, _throw);
  }
}

function _asyncToGenerator(fn) {
  return function () {
    var self = this,
        args = arguments;
    return new Promise(function (resolve, reject) {
      var gen = fn.apply(self, args);

      function _next(value) {
        asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);
      }

      function _throw(err) {
        asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);
      }

      _next(undefined);
    });
  };
}









var addPhotos = function addPhotos() {
  var inatPrefix = 'https://static.inaturalist.org/photos/';
  var eolPrefix = 'https://content.eol.org/data/media/';

  var init = /*#__PURE__*/function () {
    var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3() {
      var item, template, parent, input, sources, source, renderPhotos, addPhotosToSpecies;
      return regeneratorRuntime.wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              item = window.snapdragon.species;
              template = document.createElement('template');
              template.innerHTML = (admin_screens_species_add_photos_html__WEBPACK_IMPORTED_MODULE_5___default());
              parent = document.querySelector('#content-container');
              parent.innerHTML = '';
              (0,ui_helpers_templating__WEBPACK_IMPORTED_MODULE_2__.renderTemplate)({}, template.content, parent);
              input = document.querySelector('#input-species-to-update');
              input.focus();
              sources = document.querySelectorAll('.source');
              source = document.querySelector('input:checked').id;
              sources.forEach(function (option) {
                option.addEventListener('click', function (e) {
                  source = e.currentTarget.id;
                  input.focus();
                  var parent = document.getElementById('photosGallery');
                  parent.innerHTML = '';
                });
              });

              renderPhotos = function renderPhotos(photos, item) {
                var currentPhotoUrls = item.images.map(function (image) {
                  return image.url;
                });
                var parent = document.getElementById('photosGallery');
                template.innerHTML = (admin_screens_species_add_photos_gallery_html__WEBPACK_IMPORTED_MODULE_6___default());
                var context = {
                  photos: photos
                };
                (0,ui_helpers_templating__WEBPACK_IMPORTED_MODULE_2__.renderTemplate)(context, template.content, parent);
                document.querySelectorAll('img').forEach(function (image) {
                  var url = image.src.replace(inatPrefix, '').replace(eolPrefix, '').replace('260x190.jpg', 'jpg');

                  if ((0,ramda__WEBPACK_IMPORTED_MODULE_7__.default)(url, currentPhotoUrls)) {
                    image.style.filter = 'saturate(10%)';
                    image.style.opacity = .3;
                  }
                });
                var photoIds = [];
                var btnAddAllPhotos = document.querySelector('.btnAddAllPhotos');
                var btnAddSelectedPhotos = document.querySelector('.btnAddSelectedPhotos');

                if (photos.length === 0) {
                  btnAddAllPhotos.classList.add('hide');
                  document.querySelector('.noPhotos').innerHTML = 'No matching photos.';
                }

                document.querySelectorAll('img').forEach(function (img) {
                  img.addEventListener('click', function (e) {
                    var image = event.target;
                    var imageId = parseInt(event.target.id);
                    var index = photoIds.indexOf(imageId);

                    if (index > -1) {
                      image.style.filter = 'saturate(100%)';
                      image.style.opacity = 1;
                      photoIds.splice(index, 1);
                    } else {
                      image.style.filter = 'saturate(10%)';
                      image.style.opacity = .3;
                      photoIds.push(imageId);
                    }

                    photoIds.length > 0 ? btnAddSelectedPhotos.classList.remove('hide') : btnAddSelectedPhotos.classList.add('hide');
                  });
                });
                btnAddAllPhotos.addEventListener('click', function (e) {
                  var name = input.value;
                  addPhotosToSpecies(name, photos);
                });
                btnAddSelectedPhotos.addEventListener('click', function (e) {
                  var selectedPhotos = [];
                  photos.forEach(function (photo, index) {
                    photoIds.forEach(function (id) {
                      if (index === id) {
                        selectedPhotos.push(photo);
                      }
                    });
                  });
                  var name = input.value;
                  addPhotosToSpecies(name, selectedPhotos);
                });
              };

              (0,admin_screens_taxa_pickers__WEBPACK_IMPORTED_MODULE_3__.speciesPicker)(input, /*#__PURE__*/function () {
                var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(species) {
                  var name, photos;
                  return regeneratorRuntime.wrap(function _callee$(_context) {
                    while (1) {
                      switch (_context.prev = _context.next) {
                        case 0:
                          name = input.value;
                          _context.next = 3;
                          return loadPhotos(source, renderPhotos, species, name);

                        case 3:
                          photos = _context.sent;

                        case 4:
                        case "end":
                          return _context.stop();
                      }
                    }
                  }, _callee, this);
                }));

                return function (_x) {
                  return _ref2.apply(this, arguments);
                };
              }());

              addPhotosToSpecies = /*#__PURE__*/function () {
                var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(name, photos) {
                  var response, parent;
                  return regeneratorRuntime.wrap(function _callee2$(_context2) {
                    while (1) {
                      switch (_context2.prev = _context2.next) {
                        case 0:
                          photos.forEach(function (photo) {
                            photo.provider === 'inat' ? photo.url = photo.url.replace(inatPrefix, '') : photo.url = photo.url.replace(eolPrefix, '');
                            photo.url = photo.url.replace('.260x190.jpg', '.jpg');
                            photo.photographer = photo.photographer || '';
                            delete photo.index;
                          });
                          _context2.next = 3;
                          return api_firebase_firestore__WEBPACK_IMPORTED_MODULE_1__.firestore.addPhotos(name, photos);

                        case 3:
                          response = _context2.sent;
                          parent = document.getElementById('photosGallery');
                          parent.innerHTML = '';

                        case 6:
                        case "end":
                          return _context2.stop();
                      }
                    }
                  }, _callee2, this);
                }));

                return function addPhotosToSpecies(_x2, _x3) {
                  return _ref3.apply(this, arguments);
                };
              }();

              if (item) {
                loadPhotos(source, renderPhotos, item, item.name);
              }

            case 15:
            case "end":
              return _context3.stop();
          }
        }
      }, _callee3, this);
    }));

    return function init() {
      return _ref.apply(this, arguments);
    };
  }();

  init();
};

function loadPhotos(_x4, _x5, _x6, _x7) {
  return _loadPhotos.apply(this, arguments);
}

function _loadPhotos() {
  _loadPhotos = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(source, renderPhotos, species, name) {
    var photos;
    return regeneratorRuntime.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            _context4.t0 = source;
            _context4.next = _context4.t0 === 'inat' ? 3 : _context4.t0 === 'eol' ? 9 : 15;
            break;

          case 3:
            _context4.next = 5;
            return admin_api_inat__WEBPACK_IMPORTED_MODULE_4__.inat.getTaxonDataIncPhotos(name);

          case 5:
            photos = _context4.sent;
            photos = photos.map(function (photo, index) {
              return _objectSpread(_objectSpread({}, photo), {}, {
                url: photo.url.replace('medium', 'small'),
                index: index,
                provider: 'inat'
              });
            });
            renderPhotos(photos, species);
            return _context4.abrupt("break", 15);

          case 9:
            _context4.next = 11;
            return admin_api_eol__WEBPACK_IMPORTED_MODULE_0__.eol.getSpeciesPhotos(species.eolId, 'pd|cc-by|cc-by-sa|cc-by-nd');

          case 11:
            photos = _context4.sent;
            photos = photos.map(function (photo, index) {
              return _objectSpread(_objectSpread({}, photo), {}, {
                index: index,
                provider: 'eol',
                url: photo.url.replace('.jpg', '.260x190.jpg')
              });
            });
            renderPhotos(photos, species);
            return _context4.abrupt("break", 15);

          case 15:
            return _context4.abrupt("return", photos);

          case 16:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4, this);
  }));
  return _loadPhotos.apply(this, arguments);
}

/***/ }),

/***/ "D4fB":
/*!*******************************************************!*\
  !*** ./src/admin/screens/species/add-relationship.js ***!
  \*******************************************************/
/*! namespace exports */
/*! export addRelationship [provided] [used] [could be renamed] */
/*! other exports [not provided] [unused] */
/*! runtime requirements: __webpack_require__, __webpack_require__.n, __webpack_exports__, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "addRelationship": () => /* binding */ addRelationship
/* harmony export */ });
/* harmony import */ var ramda__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ramda */ "pWpQ");
/* harmony import */ var utils_utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! utils/utils */ "EHpu");
/* harmony import */ var admin_helpers__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! admin/helpers */ "B2La");
/* harmony import */ var ui_helpers_templating__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ui/helpers/templating */ "xNSC");
/* harmony import */ var api_firebase_firestore__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! api/firebase/firestore */ "xWjd");
/* harmony import */ var admin_screens_taxa_pickers__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! admin/screens/taxa-pickers */ "ukf4");
/* harmony import */ var admin_api_eol__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! admin/api/eol */ "h1XK");
/* harmony import */ var admin_screens_species_add_relationship_template_html__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! admin/screens/species/add-relationship-template.html */ "ocjl");
/* harmony import */ var admin_screens_species_add_relationship_template_html__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(admin_screens_species_add_relationship_template_html__WEBPACK_IMPORTED_MODULE_6__);
function _slicedToArray(arr, i) {
  return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();
}

function _nonIterableRest() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}

function _unsupportedIterableToArray(o, minLen) {
  if (!o) return;
  if (typeof o === "string") return _arrayLikeToArray(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor) n = o.constructor.name;
  if (n === "Map" || n === "Set") return Array.from(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
}

function _arrayLikeToArray(arr, len) {
  if (len == null || len > arr.length) len = arr.length;

  for (var i = 0, arr2 = new Array(len); i < len; i++) {
    arr2[i] = arr[i];
  }

  return arr2;
}

function _iterableToArrayLimit(arr, i) {
  if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return;
  var _arr = [];
  var _n = true;
  var _d = false;
  var _e = undefined;

  try {
    for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
      _arr.push(_s.value);

      if (i && _arr.length === i) break;
    }
  } catch (err) {
    _d = true;
    _e = err;
  } finally {
    try {
      if (!_n && _i["return"] != null) _i["return"]();
    } finally {
      if (_d) throw _e;
    }
  }

  return _arr;
}

function _arrayWithHoles(arr) {
  if (Array.isArray(arr)) return arr;
}

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {
  try {
    var info = gen[key](arg);
    var value = info.value;
  } catch (error) {
    reject(error);
    return;
  }

  if (info.done) {
    resolve(value);
  } else {
    Promise.resolve(value).then(_next, _throw);
  }
}

function _asyncToGenerator(fn) {
  return function () {
    var self = this,
        args = arguments;
    return new Promise(function (resolve, reject) {
      var gen = fn.apply(self, args);

      function _next(value) {
        asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);
      }

      function _throw(err) {
        asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);
      }

      _next(undefined);
    });
  };
}









var addRelationship = function addRelationship() {
  var snapdragonSpecies, snapdragonSpeciesB, eolSpecies, autocompleteRef, item;
  snapdragonSpecies = window.snapdragon.species ? window.snapdragon.species.name : '';

  var init = /*#__PURE__*/function () {
    var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
      var template, parent, traitValues, inputRelationship, symbioses, options, _i, _Object$entries, _Object$entries$_i, key, obj, inputSnapdragon, inputSnapdragonB, asyncProgress, inputEOL, searchEOLCallback, roles, data, _i2, _Object$entries2, _Object$entries2$_i, _key, _obj, inputRoleSpeciesA, inputRoleSpeciesB, description, btnAddRelationship;

      return regeneratorRuntime.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              template = document.createElement('template');
              template.innerHTML = (admin_screens_species_add_relationship_template_html__WEBPACK_IMPORTED_MODULE_6___default());
              parent = document.querySelector('#content-container');
              parent.innerHTML = '';
              (0,ui_helpers_templating__WEBPACK_IMPORTED_MODULE_2__.renderTemplate)({}, template.content, parent);
              _context2.next = 7;
              return api_firebase_firestore__WEBPACK_IMPORTED_MODULE_3__.firestore.getUnits();

            case 7:
              traitValues = _context2.sent; // relationship type (symbiosis)

              inputRelationship = document.querySelector('#input-relationship-type');
              inputRelationship.focus();
              symbioses = traitValues.symbiosis;
              options = {};

              for (_i = 0, _Object$entries = Object.entries(symbioses); _i < _Object$entries.length; _i++) {
                _Object$entries$_i = _slicedToArray(_Object$entries[_i], 2), key = _Object$entries$_i[0], obj = _Object$entries$_i[1];
                options[obj] = null;
              }

              M.Autocomplete.init(inputRelationship, {
                data: options
              }); // species

              inputSnapdragon = document.querySelector('#input-species-snapdragon');
              inputSnapdragon.value = snapdragonSpecies;
              if (snapdragonSpecies !== '') inputSnapdragon.focus();
              (0,admin_screens_taxa_pickers__WEBPACK_IMPORTED_MODULE_4__.speciesPicker)(inputSnapdragon, function (species) {
                item = species;
                snapdragonSpecies = inputSnapdragon.value;
              });
              inputSnapdragonB = document.querySelector('#input-species-snapdragon-b');
              inputSnapdragonB.focus();
              (0,admin_screens_taxa_pickers__WEBPACK_IMPORTED_MODULE_4__.speciesPicker)(inputSnapdragonB, function (species) {
                item = species;
                snapdragonSpeciesB = inputSnapdragonB.value;
              });
              asyncProgress = document.querySelector('.async-progress');
              inputEOL = document.querySelector('#input-species-eol');

              searchEOLCallback = function searchEOLCallback(species, ref) {
                eolSpecies = species;
                autocompleteRef = ref;
              };

              admin_api_eol__WEBPACK_IMPORTED_MODULE_5__.eol.searchEOL(inputEOL, asyncProgress, searchEOLCallback); // roles

              roles = traitValues.role;
              data = {};

              for (_i2 = 0, _Object$entries2 = Object.entries(roles); _i2 < _Object$entries2.length; _i2++) {
                _Object$entries2$_i = _slicedToArray(_Object$entries2[_i2], 2), _key = _Object$entries2$_i[0], _obj = _Object$entries2$_i[1];
                data[_obj] = null;
              }

              inputRoleSpeciesA = document.querySelector('#input-role-value-a');
              M.Autocomplete.init(inputRoleSpeciesA, {
                data: data
              });
              inputRoleSpeciesB = document.querySelector('#input-role-value-b');
              M.Autocomplete.init(inputRoleSpeciesB, {
                data: data
              }); // add relationship

              description = document.querySelector('#input-description');
              btnAddRelationship = document.querySelector('.btnAddRelationship');
              btnAddRelationship.addEventListener('click', /*#__PURE__*/function () {
                var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(e) {
                  var traits, speciesBName, traitA, speciesNames, isSpeciesBInSnapdragon, traitB, log, message;
                  return regeneratorRuntime.wrap(function _callee$(_context) {
                    while (1) {
                      switch (_context.prev = _context.next) {
                        case 0:
                          if (!(snapdragonSpecies && (snapdragonSpeciesB || eolSpecies))) {
                            _context.next = 17;
                            break;
                          }

                          traits = [];
                          speciesBName = snapdragonSpeciesB || admin_helpers__WEBPACK_IMPORTED_MODULE_1__.helpers.getBinomial(eolSpecies); // Species A

                          traitA = {
                            name: snapdragonSpecies
                          };
                          traitA.update = {
                            type: inputRoleSpeciesA.value,
                            value: [utils_utils__WEBPACK_IMPORTED_MODULE_0__.utils.capitaliseFirst(inputRelationship.value)],
                            symbiont: {
                              name: speciesBName,
                              role: utils_utils__WEBPACK_IMPORTED_MODULE_0__.utils.capitaliseFirst(inputRoleSpeciesB.value)
                            },
                            description: description.value
                          };
                          traits.push(traitA); // Species B

                          _context.next = 8;
                          return api_firebase_firestore__WEBPACK_IMPORTED_MODULE_3__.firestore.getSpeciesNames();

                        case 8:
                          speciesNames = _context.sent;
                          isSpeciesBInSnapdragon = (0,ramda__WEBPACK_IMPORTED_MODULE_7__.default)(speciesBName, speciesNames[0].value);

                          if (isSpeciesBInSnapdragon) {
                            traitB = {
                              name: speciesBName
                            };
                            traitB.update = {
                              type: inputRoleSpeciesB.value,
                              value: [utils_utils__WEBPACK_IMPORTED_MODULE_0__.utils.capitaliseFirst(inputRelationship.value)],
                              symbiont: {
                                name: snapdragonSpecies,
                                role: utils_utils__WEBPACK_IMPORTED_MODULE_0__.utils.capitaliseFirst(inputRoleSpeciesA.value)
                              },
                              description: description.value
                            };
                            traits.push(traitB);
                          }

                          _context.next = 13;
                          return api_firebase_firestore__WEBPACK_IMPORTED_MODULE_3__.firestore.addSpeciesRelationship('relationships', traits);

                        case 13:
                          log = _context.sent;
                          message = document.querySelector('.js-message');
                          message.innerHTML = log;
                          setTimeout(function () {
                            message.innerHTML = '';
                          }, 5000);

                        case 17:
                        case "end":
                          return _context.stop();
                      }
                    }
                  }, _callee, this);
                }));

                return function (_x) {
                  return _ref2.apply(this, arguments);
                };
              }());

            case 35:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2, this);
    }));

    return function init() {
      return _ref.apply(this, arguments);
    };
  }();

  init();
};

/***/ }),

/***/ "uIqE":
/*!******************************************************!*\
  !*** ./src/admin/screens/species/species-handler.js ***!
  \******************************************************/
/*! namespace exports */
/*! export speciesHandler [provided] [used] [could be renamed] */
/*! other exports [not provided] [unused] */
/*! runtime requirements: __webpack_require__, __webpack_require__.n, __webpack_exports__, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "speciesHandler": () => /* binding */ speciesHandler
/* harmony export */ });
/* harmony import */ var ramda__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ramda */ "pWpQ");
/* harmony import */ var autocompleter__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! autocompleter */ "B89K");
/* harmony import */ var autocompleter__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(autocompleter__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var utils_utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! utils/utils */ "EHpu");
/* harmony import */ var api_snapdragon_iconic_taxa__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! api/snapdragon/iconic-taxa */ "Bv5j");
/* harmony import */ var ui_helpers_templating__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ui/helpers/templating */ "xNSC");
/* harmony import */ var admin_helpers__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! admin/helpers */ "B2La");
/* harmony import */ var admin_api_eol__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! admin/api/eol */ "h1XK");
/* harmony import */ var api_firebase_firestore__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! api/firebase/firestore */ "xWjd");
/* harmony import */ var admin_screens_taxa_pickers__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! admin/screens/taxa-pickers */ "ukf4");
/* harmony import */ var admin_screens_species_add_species_template_html__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! admin/screens/species/add-species-template.html */ "jkSi");
/* harmony import */ var admin_screens_species_add_species_template_html__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(admin_screens_species_add_species_template_html__WEBPACK_IMPORTED_MODULE_8__);
/* harmony import */ var admin_screens_species_update_species_template_html__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! admin/screens/species/update-species-template.html */ "OIvu");
/* harmony import */ var admin_screens_species_update_species_template_html__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(admin_screens_species_update_species_template_html__WEBPACK_IMPORTED_MODULE_9__);
/* harmony import */ var admin_screens_species_update_species_names_template_html__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! admin/screens/species/update-species-names-template.html */ "21uw");
/* harmony import */ var admin_screens_species_update_species_names_template_html__WEBPACK_IMPORTED_MODULE_10___default = /*#__PURE__*/__webpack_require__.n(admin_screens_species_update_species_names_template_html__WEBPACK_IMPORTED_MODULE_10__);
/* harmony import */ var admin_screens_species_update_species_names_list_template_html__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! admin/screens/species/update-species-names-list-template.html */ "F36m");
/* harmony import */ var admin_screens_species_update_species_names_list_template_html__WEBPACK_IMPORTED_MODULE_11___default = /*#__PURE__*/__webpack_require__.n(admin_screens_species_update_species_names_list_template_html__WEBPACK_IMPORTED_MODULE_11__);
function _toConsumableArray(arr) {
  return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread();
}

function _nonIterableSpread() {
  throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}

function _unsupportedIterableToArray(o, minLen) {
  if (!o) return;
  if (typeof o === "string") return _arrayLikeToArray(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor) n = o.constructor.name;
  if (n === "Map" || n === "Set") return Array.from(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
}

function _iterableToArray(iter) {
  if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter);
}

function _arrayWithoutHoles(arr) {
  if (Array.isArray(arr)) return _arrayLikeToArray(arr);
}

function _arrayLikeToArray(arr, len) {
  if (len == null || len > arr.length) len = arr.length;

  for (var i = 0, arr2 = new Array(len); i < len; i++) {
    arr2[i] = arr[i];
  }

  return arr2;
}

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {
  try {
    var info = gen[key](arg);
    var value = info.value;
  } catch (error) {
    reject(error);
    return;
  }

  if (info.done) {
    resolve(value);
  } else {
    Promise.resolve(value).then(_next, _throw);
  }
}

function _asyncToGenerator(fn) {
  return function () {
    var self = this,
        args = arguments;
    return new Promise(function (resolve, reject) {
      var gen = fn.apply(self, args);

      function _next(value) {
        asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);
      }

      function _throw(err) {
        asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);
      }

      _next(undefined);
    });
  };
}















var addSpecies = function addSpecies() {
  var template = document.createElement('template');
  template.innerHTML = (admin_screens_species_add_species_template_html__WEBPACK_IMPORTED_MODULE_8___default());
  var parent = document.querySelector('#content-container');
  parent.innerHTML = '';
  (0,ui_helpers_templating__WEBPACK_IMPORTED_MODULE_3__.renderTemplate)({}, template.content, parent);
  var item,
      imageIds = [],
      autocompleteRef; // https://creativecommons.org/licenses/
  // CC BY:       Attribution                 (commerical allowed)
  // CC BY-SA:    Attribution-ShareAlike      (commerical allowed)
  // CC BY-ND:    Attribution-NoDerivs        (commerical allowed)
  // CC BY-NC:    Attribution-NonCommercial   (commerical NOT allowed)

  var all = 'all';
  var someMayExcludeCommercialUse = 'pd|cc-by|cc-by-sa|cc-by-nd|cc-by-nc';
  var noneExcludedFromCommercialUse = 'pd|cc-by|cc-by-sa|cc-by-nd';
  var licenses = [{
    key: 'no restriction - including not for commercial use',
    value: someMayExcludeCommercialUse
  }, {
    key: 'snapdragon default - excluding not for commercial use',
    value: noneExcludedFromCommercialUse
  }];
  var selectedLicence = licenses[1].value; // https://wiki.creativecommons.org/wiki/Best_practices_for_attribution#This_is_an_ideal_attribution

  var licenceSelector = function licenceSelector(licenses) {
    var options = '<option value="0">Select media licence rule</option>';
    licenses.forEach(function (licence) {
      options = options + "<option value=\"".concat(licence.value, "\">").concat(licence.key, "</option>");
    });
    document.querySelector('#licences').innerHTML = options;
  };

  licenceSelector(licenses);
  document.getElementById('licences').value = noneExcludedFromCommercialUse;
  var inputSearch = document.querySelector('#input-search');
  setTimeout(function () {
    inputSearch.focus();
  }, 250);
  var asyncProgress = document.querySelector('.async-progress');

  var searchEOLCallback = function searchEOLCallback(species, ref) {
    item = species;
    autocompleteRef = ref;
    document.querySelectorAll('.btnAddSpecies').forEach(function (btn) {
      btn.classList.remove('hide');
    });
  };

  admin_api_eol__WEBPACK_IMPORTED_MODULE_5__.eol.searchEOL(inputSearch, asyncProgress, searchEOLCallback, selectedLicence, imageIds);
  var btnGetSpeciesById = document.querySelector('#btnGetSpeciesById');
  var input = document.querySelector('#input-species');
  btnGetSpeciesById.addEventListener('click', /*#__PURE__*/function () {
    var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(e) {
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.next = 2;
              return admin_api_eol__WEBPACK_IMPORTED_MODULE_5__.eol.getSpecies(input.value, selectedLicence);

            case 2:
              item = _context.sent;
              if (imageIds) admin_helpers__WEBPACK_IMPORTED_MODULE_4__.helpers.getImagesLayout(item, imageIds, false);
              document.querySelectorAll('.btnAddSpecies').forEach(function (btn) {
                btn.classList.remove('hide');
              });

            case 5:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, this);
    }));

    return function (_x) {
      return _ref.apply(this, arguments);
    };
  }());
  document.querySelectorAll('.btnAddSpecies').forEach(function (btn) {
    btn.addEventListener('click', function (e) {
      addOrUpdateSpeciesToFirestore(item, imageIds, 'ADD_SPECIES');
    });
  });
  document.querySelector('#licences').addEventListener('change', function (e) {
    selectedLicence = e.target.value;
  });
};

var updateSpecies = function updateSpecies() {
  var item = window.snapdragon.species;
  var template = document.createElement('template');
  template.innerHTML = (admin_screens_species_update_species_template_html__WEBPACK_IMPORTED_MODULE_9___default());
  var parent = document.querySelector('#content-container');
  parent.innerHTML = '';
  (0,ui_helpers_templating__WEBPACK_IMPORTED_MODULE_3__.renderTemplate)({}, template.content, parent);
  var btnRemoveSpecies = document.querySelector('.btnRemoveSpecies');
  var chkSafety = document.querySelector('.chkSafety');
  var chkStar = document.querySelector('.chkStar');

  var removeSpecies = function removeSpecies() {
    api_firebase_firestore__WEBPACK_IMPORTED_MODULE_6__.firestore.deleteSpeciesByName(input.value);
  };

  var safety = document.querySelector("input[type='checkbox']");
  safety.addEventListener('click', function () {
    btnRemoveSpecies.disabled = !safety.checked;
  });
  btnRemoveSpecies.addEventListener('click', removeSpecies);
  var input = document.querySelector('#input-species-to-update');
  input.focus();

  var listenForSpeciesSelection = /*#__PURE__*/function () {
    var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(species) {
      return regeneratorRuntime.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              item = species;
              btnRemoveSpecies.classList.remove('hide');
              btnGetPhotos.classList.remove('hide');
              chkSafety.classList.remove('hide');
              chkStar.classList.remove('hide');

            case 5:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2, this);
    }));

    return function listenForSpeciesSelection(_x2) {
      return _ref2.apply(this, arguments);
    };
  }();

  (0,admin_screens_taxa_pickers__WEBPACK_IMPORTED_MODULE_7__.speciesPicker)(input, listenForSpeciesSelection);
  var btnGetPhotos = document.querySelector('.btnGetPhotos');
  var btnUpdateSpecies = document.querySelector('.btnUpdateSpecies');
  btnGetPhotos.addEventListener('click', /*#__PURE__*/function () {
    var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(e) {
      var imageIds;
      return regeneratorRuntime.wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              if (!(item.images.length === 0)) {
                _context3.next = 4;
                break;
              }

              _context3.next = 3;
              return admin_api_eol__WEBPACK_IMPORTED_MODULE_5__.eol.getSpeciesPhotos(item.eolId, 'pd|cc-by|cc-by-sa|cc-by-nd');

            case 3:
              item.images = _context3.sent;

            case 4:
              imageIds = [];
              admin_helpers__WEBPACK_IMPORTED_MODULE_4__.helpers.getImagesLayout(item, imageIds, true);
              btnUpdateSpecies.classList.remove('hide');
              btnUpdateSpecies.addEventListener('click', function (e) {
                addOrUpdateSpeciesToFirestore(item, imageIds, 'UPDATE_PHOTOS');
              });

            case 8:
            case "end":
              return _context3.stop();
          }
        }
      }, _callee3, this);
    }));

    return function (_x3) {
      return _ref3.apply(this, arguments);
    };
  }());

  if (item) {
    btnRemoveSpecies.classList.remove('hide');
    btnGetPhotos.classList.remove('hide');
    chkSafety.classList.remove('hide');
    chkStar.classList.remove('hide');
    btnGetPhotos.click();
  }
};

var updateSpeciesNames = function updateSpeciesNames() {
  var item = window.snapdragon.species;
  var template = document.createElement('template');
  template.innerHTML = (admin_screens_species_update_species_names_template_html__WEBPACK_IMPORTED_MODULE_10___default());
  var parent = document.querySelector('#content-container');
  parent.innerHTML = '';
  (0,ui_helpers_templating__WEBPACK_IMPORTED_MODULE_3__.renderTemplate)({}, template.content, parent);
  var inputLanguage = document.querySelector('#input-language-value');
  var inputVernacularName = document.querySelector('#input-vernacular-value');
  var options = [{
    label: 'de',
    value: 'de'
  }, {
    label: 'en',
    value: 'en'
  }, {
    label: 'fr',
    value: 'fr'
  }, {
    label: 'es',
    value: 'es'
  }, {
    label: 'pt',
    value: 'pt'
  }, {
    label: 'it',
    value: 'it'
  }];
  autocompleter__WEBPACK_IMPORTED_MODULE_0___default()({
    input: inputLanguage,
    fetch: function fetch(text, update) {
      text = text.toLowerCase();
      var suggestions = options.filter(function (n) {
        return n.value.toLowerCase().startsWith(text);
      });
      update(suggestions);
    },
    onSelect: function onSelect(item) {
      inputLanguage.value = item.label;
    },
    minLength: 0,
    debounceWaitMs: 200,
    className: 'autocomplete-options-container'
  });
  var input = document.querySelector('#input-species-to-update');
  input.focus();
  var vernacularNames = document.getElementById('vernacularNames');

  var renderNameslist = /*#__PURE__*/function () {
    var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5(item) {
      var force,
          updatedItem,
          deleteIcons,
          _args5 = arguments;
      return regeneratorRuntime.wrap(function _callee5$(_context5) {
        while (1) {
          switch (_context5.prev = _context5.next) {
            case 0:
              force = _args5.length > 1 && _args5[1] !== undefined ? _args5[1] : false;
              vernacularNames.innerHTML = '';
              template.innerHTML = (admin_screens_species_update_species_names_list_template_html__WEBPACK_IMPORTED_MODULE_11___default());
              _context5.next = 5;
              return api_firebase_firestore__WEBPACK_IMPORTED_MODULE_6__.firestore.getSpeciesByName(item.name, force);

            case 5:
              updatedItem = _context5.sent;
              item.names = utils_utils__WEBPACK_IMPORTED_MODULE_1__.utils.sortAlphabeticallyBy(updatedItem.names, 'language');
              (0,ui_helpers_templating__WEBPACK_IMPORTED_MODULE_3__.renderTemplate)({
                names: item.names
              }, template.content, vernacularNames);
              M.updateTextFields();
              deleteIcons = document.querySelectorAll('button');
              deleteIcons.forEach(function (icon) {
                icon.addEventListener('click', /*#__PURE__*/function () {
                  var _ref5 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(e) {
                    var name;
                    return regeneratorRuntime.wrap(function _callee4$(_context4) {
                      while (1) {
                        switch (_context4.prev = _context4.next) {
                          case 0:
                            e.target.querySelector('svg').classList.add('alert');
                            name = e.target.id;
                            item.names = item.names.filter(function (n) {
                              return n.vernacularName !== name;
                            });
                            _context4.next = 5;
                            return api_firebase_firestore__WEBPACK_IMPORTED_MODULE_6__.firestore.updateSpeciesNames(item, item.names);

                          case 5:
                            renderNameslist(item, true);

                          case 6:
                          case "end":
                            return _context4.stop();
                        }
                      }
                    }, _callee4, this);
                  }));

                  return function (_x5) {
                    return _ref5.apply(this, arguments);
                  };
                }());
              });
              inputLanguage.value = '';
              inputLanguage.focus();
              inputVernacularName.value = '';

            case 14:
            case "end":
              return _context5.stop();
          }
        }
      }, _callee5, this);
    }));

    return function renderNameslist(_x4) {
      return _ref4.apply(this, arguments);
    };
  }();

  var listenForSpeciesSelection = /*#__PURE__*/function () {
    var _ref6 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee6(species) {
      return regeneratorRuntime.wrap(function _callee6$(_context6) {
        while (1) {
          switch (_context6.prev = _context6.next) {
            case 0:
              item = species;
              renderNameslist(item, true);

            case 2:
            case "end":
              return _context6.stop();
          }
        }
      }, _callee6, this);
    }));

    return function listenForSpeciesSelection(_x6) {
      return _ref6.apply(this, arguments);
    };
  }();

  if (item) {
    renderNameslist(item, false);
  }

  (0,admin_screens_taxa_pickers__WEBPACK_IMPORTED_MODULE_7__.speciesPicker)(input, listenForSpeciesSelection);

  var updateSpeciesNames = /*#__PURE__*/function () {
    var _ref7 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee7(name) {
      return regeneratorRuntime.wrap(function _callee7$(_context7) {
        while (1) {
          switch (_context7.prev = _context7.next) {
            case 0:
              item.names = [name].concat(_toConsumableArray(item.names));
              _context7.next = 3;
              return api_firebase_firestore__WEBPACK_IMPORTED_MODULE_6__.firestore.updateSpeciesNames(item, item.names);

            case 3:
              renderNameslist(item, true);

            case 4:
            case "end":
              return _context7.stop();
          }
        }
      }, _callee7, this);
    }));

    return function updateSpeciesNames(_x7) {
      return _ref7.apply(this, arguments);
    };
  }();

  inputVernacularName.addEventListener('keypress', function (event) {
    if (event.keyCode == 13) {
      var name = {
        language: inputLanguage.value,
        vernacularName: event.target.value
      };
      updateSpeciesNames(name);
    }
  });
  inputVernacularName.addEventListener('keydown', function (event) {
    if (event.keyCode == 9) {
      var highlightedText = document.querySelector('.selected');

      if (highlightedText) {
        inputKey.value = highlightedText.innerText;
        document.querySelector('.autocomplete-options-container').innerHTML = '';
        var name = {
          language: inputLanguage.value,
          vernacularName: highlightedText.innerText
        };
        updateSpeciesNames(name);
      }
    }
  });
};

var speciesHandler = {
  addSpecies: addSpecies,
  updateSpecies: updateSpecies,
  updateSpeciesNames: updateSpeciesNames
};

var addNewSpecies = /*#__PURE__*/function () {
  var _ref8 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee8(item) {
    var response, btnAddTraits;
    return regeneratorRuntime.wrap(function _callee8$(_context8) {
      while (1) {
        switch (_context8.prev = _context8.next) {
          case 0:
            item.iconicTaxon = (0,api_snapdragon_iconic_taxa__WEBPACK_IMPORTED_MODULE_2__.matchTaxon)(item.taxonomy, api_snapdragon_iconic_taxa__WEBPACK_IMPORTED_MODULE_2__.iconicTaxa).value;
            _context8.next = 3;
            return api_firebase_firestore__WEBPACK_IMPORTED_MODULE_6__.firestore.addSpecies(item);

          case 3:
            response = _context8.sent;
            btnAddTraits = document.querySelector('.btnAddTraits');
            btnAddTraits.classList.remove('hide');
            btnAddTraits.addEventListener('click', function (event) {
              document.querySelector('#add-traits').click();
            });
            window.snapdragon.species = item;

          case 8:
          case "end":
            return _context8.stop();
        }
      }
    }, _callee8, this);
  }));

  return function addNewSpecies(_x8) {
    return _ref8.apply(this, arguments);
  };
}();

var updateExistingSpecies = /*#__PURE__*/function () {
  var _ref9 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee9(item) {
    var response;
    return regeneratorRuntime.wrap(function _callee9$(_context9) {
      while (1) {
        switch (_context9.prev = _context9.next) {
          case 0:
            _context9.next = 2;
            return api_firebase_firestore__WEBPACK_IMPORTED_MODULE_6__.firestore.updateSpecies(item);

          case 2:
            response = _context9.sent;

          case 3:
          case "end":
            return _context9.stop();
        }
      }
    }, _callee9, this);
  }));

  return function updateExistingSpecies(_x9) {
    return _ref9.apply(this, arguments);
  };
}();

var addOrUpdateSpeciesToFirestore = function addOrUpdateSpeciesToFirestore(item, imageIds, action) {
  var images = [];
  item.images.forEach(function (image, index) {
    imageIds.forEach(function (id) {
      if (index === id) {
        images.push(image);
      }
    });
  });
  images.forEach(function (image) {
    return image.url = image.url.replace('https://content.eol.org/data/media/', '');
  });

  switch (action) {
    case 'ADD_SPECIES':
      item.images = images;
      addNewSpecies(item);
      break;

    case 'UPDATE_PHOTOS':
      var setStarredImage = document.querySelector('.chkStar input').checked;
      var imageUrls = images.map(function (i) {
        return i.url;
      });

      if (setStarredImage) {
        item.images.forEach(function (image) {
          if ((0,ramda__WEBPACK_IMPORTED_MODULE_12__.default)(image.url, imageUrls)) {
            image.starred = true;
          } else {
            if (image.hasOwnProperty('starred')) {
              image.starred = false;
            }
          }
        });
      } else {
        item.images = item.images.map(function (image) {
          if ((0,ramda__WEBPACK_IMPORTED_MODULE_12__.default)(image.url, imageUrls)) {
            var index = imageUrls.indexOf(image.url);
            if (index !== -1) imageUrls.splice(index, 1);
          } else {
            return image;
          }
        });
        item.images = item.images.filter(function (i) {
          return i;
        });
      }

      updateExistingSpecies(item);
      break;
  }
};

/***/ }),

/***/ "ukf4":
/*!*******************************************!*\
  !*** ./src/admin/screens/taxa-pickers.js ***!
  \*******************************************/
/*! namespace exports */
/*! export speciesPicker [provided] [used] [could be renamed] */
/*! export taxonPicker [provided] [used] [could be renamed] */
/*! other exports [not provided] [unused] */
/*! runtime requirements: __webpack_require__, __webpack_exports__, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "speciesPicker": () => /* binding */ speciesPicker,
/* harmony export */   "taxonPicker": () => /* binding */ taxonPicker
/* harmony export */ });
/* harmony import */ var api_firebase_firestore__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! api/firebase/firestore */ "xWjd");
/* harmony import */ var ui_helpers_data_checking__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ui/helpers/data-checking */ "XTkL");
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {
  try {
    var info = gen[key](arg);
    var value = info.value;
  } catch (error) {
    reject(error);
    return;
  }

  if (info.done) {
    resolve(value);
  } else {
    Promise.resolve(value).then(_next, _throw);
  }
}

function _asyncToGenerator(fn) {
  return function () {
    var self = this,
        args = arguments;
    return new Promise(function (resolve, reject) {
      var gen = fn.apply(self, args);

      function _next(value) {
        asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);
      }

      function _throw(err) {
        asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);
      }

      _next(undefined);
    });
  };
}



var speciesPicker = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(input, listener) {
    var speciesNames, data, i, instances;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            speciesNames = [];
            _context2.next = 3;
            return api_firebase_firestore__WEBPACK_IMPORTED_MODULE_0__.firestore.getSpeciesNames();

          case 3:
            speciesNames = _context2.sent;

            if (speciesNames) {
              _context2.next = 6;
              break;
            }

            return _context2.abrupt("return");

          case 6:
            speciesNames = speciesNames[0].value;
            data = {};

            for (i = 0; i < speciesNames.length; i++) {
              data[speciesNames[i]] = null;
            }

            instances = M.Autocomplete.init(input, {
              data: data
            });
            input.addEventListener('keyup', /*#__PURE__*/function () {
              var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(e) {
                var species;
                return regeneratorRuntime.wrap(function _callee$(_context) {
                  while (1) {
                    switch (_context.prev = _context.next) {
                      case 0:
                        if (!(e.keyCode == 13)) {
                          _context.next = 6;
                          break;
                        }

                        _context.next = 3;
                        return api_firebase_firestore__WEBPACK_IMPORTED_MODULE_0__.firestore.getSpeciesByName(input.value);

                      case 3:
                        species = _context.sent;
                        listener(species);
                        window.snapdragon.species = species;

                      case 6:
                      case "end":
                        return _context.stop();
                    }
                  }
                }, _callee, this);
              }));

              return function (_x3) {
                return _ref2.apply(this, arguments);
              };
            }());

          case 11:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, this);
  }));

  return function speciesPicker(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}(); // const updateActiveSpecies = species => {
//     const activeSpecies = document.querySelector('#activeSpeciesDisplay .feedback');    
//           activeSpecies.querySelector('span:nth-child(2)').innerHTML = !!species.vernacularName
//             ? `${species.name} (${species.vernacularName})`
//             : `${species.name} (${itemProperties.getVernacularName(species, { language: 'en'})})`;            
// };

var taxonPicker = /*#__PURE__*/function () {
  var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(input, listener) {
    var taxonNames, data, i, instances;
    return regeneratorRuntime.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            taxonNames = [];
            _context4.next = 3;
            return api_firebase_firestore__WEBPACK_IMPORTED_MODULE_0__.firestore.getTaxaNames();

          case 3:
            taxonNames = _context4.sent;

            if (taxonNames) {
              _context4.next = 6;
              break;
            }

            return _context4.abrupt("return");

          case 6:
            taxonNames = taxonNames[0].value;
            data = {};

            for (i = 0; i < taxonNames.length; i++) {
              data[taxonNames[i]] = null;
            }

            instances = M.Autocomplete.init(input, {
              data: data
            });
            input.addEventListener('keyup', /*#__PURE__*/function () {
              var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(e) {
                var taxon;
                return regeneratorRuntime.wrap(function _callee3$(_context3) {
                  while (1) {
                    switch (_context3.prev = _context3.next) {
                      case 0:
                        if (!(e.keyCode == 13)) {
                          _context3.next = 5;
                          break;
                        }

                        _context3.next = 3;
                        return api_firebase_firestore__WEBPACK_IMPORTED_MODULE_0__.firestore.getTaxonByName({}, input.value);

                      case 3:
                        taxon = _context3.sent;
                        listener(taxon);

                      case 5:
                      case "end":
                        return _context3.stop();
                    }
                  }
                }, _callee3, this);
              }));

              return function (_x6) {
                return _ref4.apply(this, arguments);
              };
            }());

          case 11:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4, this);
  }));

  return function taxonPicker(_x4, _x5) {
    return _ref3.apply(this, arguments);
  };
}();

/***/ }),

/***/ "XZFI":
/*!*********************************************!*\
  !*** ./src/admin/screens/traits-handler.js ***!
  \*********************************************/
/*! namespace exports */
/*! export traitsHandler [provided] [used] [could be renamed] */
/*! other exports [not provided] [unused] */
/*! runtime requirements: __webpack_require__, __webpack_require__.n, __webpack_exports__, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "traitsHandler": () => /* binding */ traitsHandler
/* harmony export */ });
/* harmony import */ var ramda__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ramda */ "pWpQ");
/* harmony import */ var autocompleter__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! autocompleter */ "B89K");
/* harmony import */ var autocompleter__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(autocompleter__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var utils_utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! utils/utils */ "EHpu");
/* harmony import */ var api_firebase_firestore__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! api/firebase/firestore */ "xWjd");
/* harmony import */ var ui_helpers_templating__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ui/helpers/templating */ "xNSC");
/* harmony import */ var admin_screens_taxa_pickers__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! admin/screens/taxa-pickers */ "ukf4");
/* harmony import */ var admin_screens_add_trait__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! admin/screens/add-trait */ "YQ8c");
/* harmony import */ var admin_screens_add_traits_template_html__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! admin/screens/add-traits-template.html */ "uoS6");
/* harmony import */ var admin_screens_add_traits_template_html__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(admin_screens_add_traits_template_html__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var admin_screens_add_traits_fields_template_html__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! admin/screens/add-traits-fields-template.html */ "ThuB");
/* harmony import */ var admin_screens_add_traits_fields_template_html__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(admin_screens_add_traits_fields_template_html__WEBPACK_IMPORTED_MODULE_7__);
function _toConsumableArray(arr) {
  return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread();
}

function _nonIterableSpread() {
  throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}

function _iterableToArray(iter) {
  if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter);
}

function _arrayWithoutHoles(arr) {
  if (Array.isArray(arr)) return _arrayLikeToArray(arr);
}

function _slicedToArray(arr, i) {
  return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();
}

function _nonIterableRest() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}

function _unsupportedIterableToArray(o, minLen) {
  if (!o) return;
  if (typeof o === "string") return _arrayLikeToArray(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor) n = o.constructor.name;
  if (n === "Map" || n === "Set") return Array.from(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
}

function _arrayLikeToArray(arr, len) {
  if (len == null || len > arr.length) len = arr.length;

  for (var i = 0, arr2 = new Array(len); i < len; i++) {
    arr2[i] = arr[i];
  }

  return arr2;
}

function _iterableToArrayLimit(arr, i) {
  if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return;
  var _arr = [];
  var _n = true;
  var _d = false;
  var _e = undefined;

  try {
    for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
      _arr.push(_s.value);

      if (i && _arr.length === i) break;
    }
  } catch (err) {
    _d = true;
    _e = err;
  } finally {
    try {
      if (!_n && _i["return"] != null) _i["return"]();
    } finally {
      if (_d) throw _e;
    }
  }

  return _arr;
}

function _arrayWithHoles(arr) {
  if (Array.isArray(arr)) return arr;
}

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {
  try {
    var info = gen[key](arg);
    var value = info.value;
  } catch (error) {
    reject(error);
    return;
  }

  if (info.done) {
    resolve(value);
  } else {
    Promise.resolve(value).then(_next, _throw);
  }
}

function _asyncToGenerator(fn) {
  return function () {
    var self = this,
        args = arguments;
    return new Promise(function (resolve, reject) {
      var gen = fn.apply(self, args);

      function _next(value) {
        asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);
      }

      function _throw(err) {
        asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);
      }

      _next(undefined);
    });
  };
}











var addTraits = function addTraits() {
  var item = window.snapdragon.species;
  var template = document.createElement('template');
  template.innerHTML = (admin_screens_add_traits_template_html__WEBPACK_IMPORTED_MODULE_6___default());
  var parent = document.querySelector('#content-container');
  parent.innerHTML = '';
  (0,ui_helpers_templating__WEBPACK_IMPORTED_MODULE_3__.renderTemplate)({}, template.content, parent);

  var renderTraits = /*#__PURE__*/function () {
    var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(item) {
      var itemTraits, isSpecies, itemFamily, _item, fields, relationships, traitsToIgnore, _loop, _i, _Object$entries, deleteIcons;

      return regeneratorRuntime.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              _context2.next = 2;
              return api_firebase_firestore__WEBPACK_IMPORTED_MODULE_2__.firestore.getTraitsBySpeciesName(item.name);

            case 2:
              itemTraits = _context2.sent;
              item.traits = itemTraits;
              isSpecies = item.eolId;

              if (!isSpecies) {
                _context2.next = 12;
                break;
              }

              _context2.next = 8;
              return api_firebase_firestore__WEBPACK_IMPORTED_MODULE_2__.firestore.getTaxonByName({
                language: 'en'
              }, item.taxonomy.family);

            case 8:
              itemFamily = _context2.sent;
              item.family = itemFamily;
              _context2.next = 16;
              break;

            case 12:
              _context2.next = 14;
              return api_firebase_firestore__WEBPACK_IMPORTED_MODULE_2__.firestore.getTraitsByTaxonName(item.name);

            case 14:
              _item = _context2.sent;
              item.traits = _item.traits;

            case 16:
              fields = [], relationships = [];

              if (item.traits) {
                traitsToIgnore = ['name', 'relationships', 'units'];

                _loop = function _loop() {
                  var _Object$entries$_i = _slicedToArray(_Object$entries[_i], 2),
                      key = _Object$entries$_i[0],
                      obj = _Object$entries$_i[1];

                  if (!(0,ramda__WEBPACK_IMPORTED_MODULE_8__.default)(key, traitsToIgnore)) {
                    var value = obj.value ? obj.value.join(', ') : '';
                    var unit = obj.unit || '';
                    fields.push({
                      key: key,
                      value: value,
                      unit: unit
                    });
                  }

                  if (key === 'relationships') {
                    obj.forEach(function (relationship) {
                      relationships.push({
                        key: key,
                        type: relationship.value[0],
                        speciesA: relationship.symbiont.name,
                        speciesARole: relationship.symbiont.role,
                        speciesB: item.name,
                        speciesBRole: relationship.type,
                        description: relationship.description
                      });
                    });
                  }
                };

                for (_i = 0, _Object$entries = Object.entries(item.traits); _i < _Object$entries.length; _i++) {
                  _loop();
                }
              }

              template.innerHTML = (admin_screens_add_traits_fields_template_html__WEBPACK_IMPORTED_MODULE_7___default());
              parent = document.querySelector('.js-traits');
              parent.innerHTML = '';
              (0,ui_helpers_templating__WEBPACK_IMPORTED_MODULE_3__.renderTemplate)({
                fields: fields,
                relationships: relationships
              }, template.content, parent);
              M.updateTextFields();
              document.getElementById('input-trait-key').focus();
              deleteIcons = document.querySelectorAll('button');
              deleteIcons.forEach(function (icon) {
                icon.addEventListener('click', /*#__PURE__*/function () {
                  var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(e) {
                    var field, response;
                    return regeneratorRuntime.wrap(function _callee$(_context) {
                      while (1) {
                        switch (_context.prev = _context.next) {
                          case 0:
                            e.target.querySelector('svg').classList.add('alert');
                            field = e.target.id;
                            _context.next = 4;
                            return api_firebase_firestore__WEBPACK_IMPORTED_MODULE_2__.firestore.deleteSpeciesTraitField(item.name, field);

                          case 4:
                            response = _context.sent;
                            renderTraits(item);

                          case 6:
                          case "end":
                            return _context.stop();
                        }
                      }
                    }, _callee, this);
                  }));

                  return function (_x2) {
                    return _ref2.apply(this, arguments);
                  };
                }());
              });

            case 26:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2, this);
    }));

    return function renderTraits(_x) {
      return _ref.apply(this, arguments);
    };
  }();

  var appendAutoTraitValue = function appendAutoTraitValue(input, traitFields) {
    autocompleter__WEBPACK_IMPORTED_MODULE_0___default()({
      input: input,
      fetch: function fetch(text, update) {
        text = text.toLowerCase();
        var suggestions = traitFields.filter(function (field) {
          return field.value.toLowerCase().startsWith(text);
        });
        update(suggestions);
      },
      onSelect: function onSelect(item) {
        input.value = item.label;
      },
      minLength: 1,
      debounceWaitMs: 200,
      className: 'autocomplete-options-container'
    });
  };

  var addFieldListeners = function addFieldListeners(traits) {
    document.querySelectorAll('.trait-value').forEach(function (input) {
      if (input.dataset.field !== 'name') {
        var traitFields = traits.find(function (trait) {
          return trait.key === input.dataset.field;
        });

        if (traitFields && traitFields.value) {
          traitFields = traitFields.value.map(function (name) {
            return {
              label: name,
              value: name
            };
          });
          appendAutoTraitValue(input, traitFields);
        }
      }
    });
  };

  var addTraitParent = document.querySelector('.js-add-trait');

  var renderTraitCallback = /*#__PURE__*/function () {
    var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(pair) {
      var trait, collection, entries, update, log, savedText;
      return regeneratorRuntime.wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              trait = {};

              if (item.traits && item.traits[pair.key]) {
                trait[pair.key] = {
                  value: [].concat(_toConsumableArray(item.traits[pair.key].value), [utils_utils__WEBPACK_IMPORTED_MODULE_1__.utils.capitaliseFirst(pair.value)])
                };
              } else {
                trait[pair.key] = {
                  value: [utils_utils__WEBPACK_IMPORTED_MODULE_1__.utils.capitaliseFirst(pair.value)]
                };
              }

              if (pair.unit) trait[pair.key].unit = pair.unit;
              collection = item.taxon === 'family' ? 'taxa_en' : 'traits_en';

              if (item.taxon == 'family') {
                entries = Object.entries(trait);
                item.traits = item.traits || {};
                entries.forEach(function (entry) {
                  item.traits[entry[0]] = {
                    value: [entry[1].value]
                  };
                });
              }

              update = item.taxon ? {
                traits: item.traits
              } : trait;
              _context3.next = 8;
              return api_firebase_firestore__WEBPACK_IMPORTED_MODULE_2__.firestore.addTraits(item.name, update, collection);

            case 8:
              log = _context3.sent;
              renderTraits(item);
              (0,admin_screens_add_trait__WEBPACK_IMPORTED_MODULE_5__.renderAddTrait)(addTraitParent, renderTraitCallback);
              savedText = document.querySelector('.js-saved');
              savedText.classList.remove('hide');
              savedText.innerHTML = pair.unit ? "Trait, key: ".concat(pair.key, ", value: ").concat(pair.value, " ").concat(pair.value, ", saved.") : "Trait, key: ".concat(pair.key, ", value: ").concat(pair.value, ", saved.");
              setInterval(function () {
                savedText.classList.add('hide');
              }, 5000);

            case 15:
            case "end":
              return _context3.stop();
          }
        }
      }, _callee3, this);
    }));

    return function renderTraitCallback(_x3) {
      return _ref3.apply(this, arguments);
    };
  }();

  (0,admin_screens_add_trait__WEBPACK_IMPORTED_MODULE_5__.renderAddTrait)(addTraitParent, renderTraitCallback);
  var inputSpecies = document.querySelector('#input-species-for-traits');
  inputSpecies.focus();
  var inputTaxon = document.querySelector('#input-taxon-for-traits');

  var init = /*#__PURE__*/function () {
    var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee6() {
      var listenForSpeciesSelection, listenForTaxonSelection, traitValues, traits, meta, _i2, _Object$entries2, _Object$entries2$_i, key, obj, value, trait, _i3, _Object$entries3, _Object$entries3$_i, _key, _obj;

      return regeneratorRuntime.wrap(function _callee6$(_context6) {
        while (1) {
          switch (_context6.prev = _context6.next) {
            case 0:
              listenForSpeciesSelection = /*#__PURE__*/function () {
                var _ref5 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(species) {
                  return regeneratorRuntime.wrap(function _callee4$(_context4) {
                    while (1) {
                      switch (_context4.prev = _context4.next) {
                        case 0:
                          item = species;
                          renderTraits(item);

                        case 2:
                        case "end":
                          return _context4.stop();
                      }
                    }
                  }, _callee4, this);
                }));

                return function listenForSpeciesSelection(_x4) {
                  return _ref5.apply(this, arguments);
                };
              }();

              listenForTaxonSelection = /*#__PURE__*/function () {
                var _ref6 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5(taxon) {
                  return regeneratorRuntime.wrap(function _callee5$(_context5) {
                    while (1) {
                      switch (_context5.prev = _context5.next) {
                        case 0:
                          item = taxon;
                          renderTraits(taxon);

                        case 2:
                        case "end":
                          return _context5.stop();
                      }
                    }
                  }, _callee5, this);
                }));

                return function listenForTaxonSelection(_x5) {
                  return _ref6.apply(this, arguments);
                };
              }();

              (0,admin_screens_taxa_pickers__WEBPACK_IMPORTED_MODULE_4__.speciesPicker)(inputSpecies, listenForSpeciesSelection);
              (0,admin_screens_taxa_pickers__WEBPACK_IMPORTED_MODULE_4__.taxonPicker)(inputTaxon, listenForTaxonSelection);
              _context6.next = 6;
              return api_firebase_firestore__WEBPACK_IMPORTED_MODULE_2__.firestore.getUnits();

            case 6:
              traitValues = _context6.sent;
              traits = [];
              meta = ['name', 'help', 'type', 'units'];

              for (_i2 = 0, _Object$entries2 = Object.entries(traitValues); _i2 < _Object$entries2.length; _i2++) {
                _Object$entries2$_i = _slicedToArray(_Object$entries2[_i2], 2), key = _Object$entries2$_i[0], obj = _Object$entries2$_i[1];

                if (!(0,ramda__WEBPACK_IMPORTED_MODULE_8__.default)(key[('name', 'units')])) {
                  value = [];
                  trait = {};

                  for (_i3 = 0, _Object$entries3 = Object.entries(obj); _i3 < _Object$entries3.length; _i3++) {
                    _Object$entries3$_i = _slicedToArray(_Object$entries3[_i3], 2), _key = _Object$entries3$_i[0], _obj = _Object$entries3$_i[1];

                    if ((0,ramda__WEBPACK_IMPORTED_MODULE_8__.default)(_key, meta)) {
                      trait[_key.toLowerCase()] = _obj.toLowerCase();
                    } else {
                      try {
                        value.push(_obj.toLowerCase());
                      } catch (e) {
                        logError(renderTraitCallback, e);
                      }
                    }
                  }

                  trait.key = key.toLowerCase();
                  trait.value = value;
                  traits.push(trait);
                }
              }

              ;
              M.updateTextFields(); // snapLog('renderTraitCallback traits', traits);

              addFieldListeners(traits);

            case 13:
            case "end":
              return _context6.stop();
          }
        }
      }, _callee6, this);
    }));

    return function init() {
      return _ref4.apply(this, arguments);
    };
  }();

  init();

  if (item) {
    inputSpecies.value = item.name;
    renderTraits(item);
  }
};

var traitsHandler = {
  addTraits: addTraits
};

/***/ }),

/***/ "aBNj":
/*!**********************************************!*\
  !*** ./src/admin/screens/video/add-video.js ***!
  \**********************************************/
/*! namespace exports */
/*! export addVideo [provided] [used] [could be renamed] */
/*! other exports [not provided] [unused] */
/*! runtime requirements: __webpack_require__, __webpack_require__.n, __webpack_exports__, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "addVideo": () => /* binding */ addVideo
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "smZu");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_dom__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-dom */ "37TQ");
/* harmony import */ var react_dom__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react_dom__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var formik__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! formik */ "+zDG");
/* harmony import */ var admin_react_snap_html_elements__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! admin/react/snap-html-elements */ "KZDP");
/* harmony import */ var admin_screens_video_item_picker__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! admin/screens/video/item-picker */ "qGgy");
/* harmony import */ var _material_ui_core_styles__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @material-ui/core/styles */ "9vG4");
/* harmony import */ var admin_react_snap_theme__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! admin/react/snap-theme */ "LYHH");
/* harmony import */ var yup__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! yup */ "xFWN");
var _this = undefined,
    _jsxFileName = "/Users/danminimac/code/snapdragon-redux/src/admin/screens/video/add-video.js";

function _slicedToArray(arr, i) {
  return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();
}

function _nonIterableRest() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}

function _unsupportedIterableToArray(o, minLen) {
  if (!o) return;
  if (typeof o === "string") return _arrayLikeToArray(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor) n = o.constructor.name;
  if (n === "Map" || n === "Set") return Array.from(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
}

function _arrayLikeToArray(arr, len) {
  if (len == null || len > arr.length) len = arr.length;

  for (var i = 0, arr2 = new Array(len); i < len; i++) {
    arr2[i] = arr[i];
  }

  return arr2;
}

function _iterableToArrayLimit(arr, i) {
  if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return;
  var _arr = [];
  var _n = true;
  var _d = false;
  var _e = undefined;

  try {
    for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
      _arr.push(_s.value);

      if (i && _arr.length === i) break;
    }
  } catch (err) {
    _d = true;
    _e = err;
  } finally {
    try {
      if (!_n && _i["return"] != null) _i["return"]();
    } finally {
      if (_d) throw _e;
    }
  }

  return _arr;
}

function _arrayWithHoles(arr) {
  if (Array.isArray(arr)) return arr;
}









var addVideo = function addVideo() {
  var items = [{
    id: 1,
    presenter: 'dan',
    value: 'Great video!',
    owner: 'Snapdragon',
    ownerUrl: 'www.learn-the-planet.com',
    src: 'https://media-exp1.licdn.com/dms/image/C4E03AQFAu1DpOa0Ygg/profile-displayphoto-shrink_100_100/0?e=1596067200&v=beta&t=OMuPVka96Cm-QNBGVphv4W9UXQDFahsEkhLkpbYiFVM',
    location: 'Lisbon',
    startsAt: 0
  }, {
    id: 2,
    presenter: 'dan',
    value: 'Rubbish!',
    owner: 'Snapdragon',
    ownerUrl: 'www.learn-the-planet.com',
    src: 'https://media-exp1.licdn.com/dms/image/C4E03AQFAu1DpOa0Ygg/profile-displayphoto-shrink_100_100/0?e=1596067200&v=beta&t=OMuPVka96Cm-QNBGVphv4W9UXQDFahsEkhLkpbYiFVM',
    location: 'Lisbon',
    startsAt: 0
  }, {
    id: 3,
    presenter: 'dan',
    value: 'Rubbish and some!',
    owner: 'Snapdragon',
    ownerUrl: 'www.learn-the-planet.com',
    src: 'https://media-exp1.licdn.com/dms/image/C4E03AQFAu1DpOa0Ygg/profile-displayphoto-shrink_100_100/0?e=1596067200&v=beta&t=OMuPVka96Cm-QNBGVphv4W9UXQDFahsEkhLkpbYiFVM',
    location: 'Lisbon',
    startsAt: 0
  }];

  var VideoForm = function VideoForm(props) {
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement((react__WEBPACK_IMPORTED_MODULE_0___default().Fragment), null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(formik__WEBPACK_IMPORTED_MODULE_2__.Formik, {
      initialValues: {
        title: props.selectedItem.value || '',
        presenter: props.selectedItem.presenter || '',
        id: props.selectedItem.id || '',
        owner: props.selectedItem.owner || '',
        ownerUrl: props.selectedItem.ownerUrl || '',
        src: props.selectedItem.src || '',
        location: props.selectedItem.location || '',
        startsAt: props.selectedItem.startsAt || 0
      },
      enableReinitialize: true,
      validationSchema: yup__WEBPACK_IMPORTED_MODULE_6__.object({
        title: yup__WEBPACK_IMPORTED_MODULE_6__.string().max(5, 'Must be 5 characters or less').required('Required'),
        presenter: yup__WEBPACK_IMPORTED_MODULE_6__.string().max(5, 'Must be 5 characters or less').required('Required')
      }),
      onSubmit: function onSubmit(values, _ref) {
        var setSubmitting = _ref.setSubmitting;
        setTimeout(function () {
          alert(JSON.stringify(values, null, 2));
          setSubmitting(false);
        }, 400);
      },
      __self: _this,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 49,
        columnNumber: 9
      }
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(formik__WEBPACK_IMPORTED_MODULE_2__.Form, {
      __self: _this,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 76,
        columnNumber: 11
      }
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(admin_react_snap_html_elements__WEBPACK_IMPORTED_MODULE_3__.SnapInput, {
      label: "Title",
      name: "title",
      type: "text",
      placeholder: "Enter title",
      __self: _this,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 77,
        columnNumber: 13
      }
    }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(admin_react_snap_html_elements__WEBPACK_IMPORTED_MODULE_3__.SnapInput, {
      label: "Presenter",
      name: "presenter",
      type: "text",
      placeholder: "Enter presenter",
      __self: _this,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 78,
        columnNumber: 13
      }
    }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(admin_react_snap_html_elements__WEBPACK_IMPORTED_MODULE_3__.SnapInput, {
      label: "Video Id",
      name: "id",
      type: "text",
      placeholder: "Enter video Id",
      __self: _this,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 79,
        columnNumber: 13
      }
    }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(admin_react_snap_html_elements__WEBPACK_IMPORTED_MODULE_3__.SnapInput, {
      label: "Owner",
      name: "owner",
      type: "text",
      placeholder: "Enter owner",
      __self: _this,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 81,
        columnNumber: 13
      }
    }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(admin_react_snap_html_elements__WEBPACK_IMPORTED_MODULE_3__.SnapInput, {
      label: "Owner URL",
      name: "ownerUrl",
      type: "text",
      placeholder: "Enter owner URL",
      __self: _this,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 82,
        columnNumber: 13
      }
    }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(admin_react_snap_html_elements__WEBPACK_IMPORTED_MODULE_3__.SnapInput, {
      label: "Onwer logo",
      name: "src",
      type: "text",
      placeholder: "Enter owner logo URL",
      __self: _this,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 83,
        columnNumber: 13
      }
    }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(admin_react_snap_html_elements__WEBPACK_IMPORTED_MODULE_3__.SnapInput, {
      label: "Location",
      name: "location",
      type: "text",
      placeholder: "Enter location",
      __self: _this,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 84,
        columnNumber: 13
      }
    }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(admin_react_snap_html_elements__WEBPACK_IMPORTED_MODULE_3__.SnapInput, {
      label: "Lesson starts at",
      name: "startsAt",
      type: "number",
      placeholder: "Enter lesson start time",
      __self: _this,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 85,
        columnNumber: 13
      }
    }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("button", {
      type: "submit",
      __self: _this,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 86,
        columnNumber: 13
      }
    }, "Submit"))));
  };

  var container = document.querySelector("#content-container");

  function onRenderSnapPickerCallback(id, // the "id" prop of the Profiler tree that has just committed
  phase, // either "mount" (if the tree just mounted) or "update" (if it re-rendered)
  actualDuration, // time spent rendering the committed update
  baseDuration, // estimated time to render the entire subtree without memoization
  startTime, // when React began rendering this update
  commitTime, // when React committed this update
  interactions // the Set of interactions belonging to this update
  ) {
    console.log('actualDuration: ', actualDuration);
  }

  var Video = function Video() {
    var _useState = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)({}),
        _useState2 = _slicedToArray(_useState, 2),
        selectedItem = _useState2[0],
        setSelectedItem = _useState2[1];

    (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(function () {
      var otherTabs = document.querySelectorAll('.non-react');
      otherTabs.forEach(function (otherTab) {
        otherTab.addEventListener('click', function (e) {
          react_dom__WEBPACK_IMPORTED_MODULE_1___default().unmountComponentAtNode(container);
        });
      });
    });
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_material_ui_core_styles__WEBPACK_IMPORTED_MODULE_7__.default, {
      theme: admin_react_snap_theme__WEBPACK_IMPORTED_MODULE_5__.theme,
      __self: _this,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 118,
        columnNumber: 5
      }
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
      __self: _this,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 119,
        columnNumber: 7
      }
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
      className: "centred-block one-and-half-standard-block",
      __self: _this,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 120,
        columnNumber: 11
      }
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(react__WEBPACK_IMPORTED_MODULE_0__.Profiler, {
      id: "SnapPicker",
      onRender: onRenderSnapPickerCallback,
      __self: _this,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 121,
        columnNumber: 13
      }
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(admin_screens_video_item_picker__WEBPACK_IMPORTED_MODULE_4__.SnapPicker, {
      items: items,
      onChange: setSelectedItem,
      label: 'Search for video by title',
      __self: _this,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 122,
        columnNumber: 15
      }
    }))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(VideoForm, {
      selectedItem: selectedItem,
      __self: _this,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 125,
        columnNumber: 11
      }
    })));
  };

  react_dom__WEBPACK_IMPORTED_MODULE_1___default().render( /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(Video, {
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 130,
      columnNumber: 19
    }
  }), container);
};

/***/ }),

/***/ "gYkA":
/*!*************************************************************!*\
  !*** ./src/admin/screens/video/create-video-description.js ***!
  \*************************************************************/
/*! namespace exports */
/*! export createVideoDescription [provided] [used] [could be renamed] */
/*! other exports [not provided] [unused] */
/*! runtime requirements: __webpack_require__, __webpack_require__.n, __webpack_exports__, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "createVideoDescription": () => /* binding */ createVideoDescription
/* harmony export */ });
/* harmony import */ var ui_helpers_templating__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ui/helpers/templating */ "xNSC");
/* harmony import */ var api_firebase_firestore__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! api/firebase/firestore */ "xWjd");
/* harmony import */ var admin_screens_video_create_video_description_template_html__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! admin/screens/video/create-video-description-template.html */ "fYQH");
/* harmony import */ var admin_screens_video_create_video_description_template_html__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(admin_screens_video_create_video_description_template_html__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var admin_screens_video_create_video_notes_template_html__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! admin/screens/video/create-video-notes-template.html */ "kAQ0");
/* harmony import */ var admin_screens_video_create_video_notes_template_html__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(admin_screens_video_create_video_notes_template_html__WEBPACK_IMPORTED_MODULE_3__);
function _toConsumableArray(arr) {
  return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread();
}

function _nonIterableSpread() {
  throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}

function _unsupportedIterableToArray(o, minLen) {
  if (!o) return;
  if (typeof o === "string") return _arrayLikeToArray(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor) n = o.constructor.name;
  if (n === "Map" || n === "Set") return Array.from(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
}

function _iterableToArray(iter) {
  if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter);
}

function _arrayWithoutHoles(arr) {
  if (Array.isArray(arr)) return _arrayLikeToArray(arr);
}

function _arrayLikeToArray(arr, len) {
  if (len == null || len > arr.length) len = arr.length;

  for (var i = 0, arr2 = new Array(len); i < len; i++) {
    arr2[i] = arr[i];
  }

  return arr2;
}

function ownKeys(object, enumerableOnly) {
  var keys = Object.keys(object);

  if (Object.getOwnPropertySymbols) {
    var symbols = Object.getOwnPropertySymbols(object);
    if (enumerableOnly) symbols = symbols.filter(function (sym) {
      return Object.getOwnPropertyDescriptor(object, sym).enumerable;
    });
    keys.push.apply(keys, symbols);
  }

  return keys;
}

function _objectSpread(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i] != null ? arguments[i] : {};

    if (i % 2) {
      ownKeys(Object(source), true).forEach(function (key) {
        _defineProperty(target, key, source[key]);
      });
    } else if (Object.getOwnPropertyDescriptors) {
      Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
    } else {
      ownKeys(Object(source)).forEach(function (key) {
        Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
      });
    }
  }

  return target;
}

function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
}

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {
  try {
    var info = gen[key](arg);
    var value = info.value;
  } catch (error) {
    reject(error);
    return;
  }

  if (info.done) {
    resolve(value);
  } else {
    Promise.resolve(value).then(_next, _throw);
  }
}

function _asyncToGenerator(fn) {
  return function () {
    var self = this,
        args = arguments;
    return new Promise(function (resolve, reject) {
      var gen = fn.apply(self, args);

      function _next(value) {
        asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);
      }

      function _throw(err) {
        asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);
      }

      _next(undefined);
    });
  };
}





var createVideoDescription = function createVideoDescription(collection, species) {
  var init = /*#__PURE__*/function () {
    var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
      var template, parent, inputName, inputDescription, inputTime, chkBoxTag, item, isTagMode, isEditTagMode, activeTag, tagsContainer, btnCreateDescription, addOrUpateMessage;
      return regeneratorRuntime.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              template = document.createElement('template');
              template.innerHTML = (admin_screens_video_create_video_description_template_html__WEBPACK_IMPORTED_MODULE_2___default());
              parent = document.querySelector('#js-collection-options');
              parent.innerHTML = '';
              (0,ui_helpers_templating__WEBPACK_IMPORTED_MODULE_0__.renderTemplate)({}, template.content, parent);
              inputName = document.querySelector('#input-name');
              inputDescription = document.querySelector('#input-description');
              inputTime = document.querySelector('#input-time');
              chkBoxTag = document.querySelector('#chk-box-tag');

              if (species) {
                item = collection.species.find(function (s) {
                  return s.name === species.name;
                });
                inputName.value = species.name;
                inputDescription.value = item.description ? item.description : '';
                inputTime.value = item.time ? item.time.join(',') : '';
              } else {
                chkBoxTag.click();
              }

              setTimeout(function () {
                inputTime.focus();
              }, 250);
              isTagMode = false, isEditTagMode = false;
              tagsContainer = document.querySelector('.js-tags');
              chkBoxTag.addEventListener('change', function (e) {
                isTagMode = e.target.checked;
                inputName.parentNode.children[1].innerHTML = isTagMode ? 'Tag' : 'Name';

                if (isTagMode) {
                  inputName.value = '';
                  inputName.focus();
                  inputTime.value = '';
                  inputDescription.value = '';
                  template.innerHTML = (admin_screens_video_create_video_notes_template_html__WEBPACK_IMPORTED_MODULE_3___default());
                  tagsContainer.innerHTML = '';
                  (0,ui_helpers_templating__WEBPACK_IMPORTED_MODULE_0__.renderTemplate)({
                    notes: collection.notes
                  }, template.content, tagsContainer);
                  var notes = document.querySelectorAll('.js-tags li');
                  notes.forEach(function (note) {
                    note.addEventListener('click', function (e) {
                      activeTag = collection.notes.find(function (note) {
                        return note.tag === e.target.id;
                      });
                      inputDescription.value = activeTag.description;
                      isEditTagMode = true;
                      calcTextProperties(inputDescription);
                    });
                  });
                } else {
                  tagsContainer.innerHTML = '';
                }
              });
              btnCreateDescription = document.querySelector('.btnCreateDescription');
              btnCreateDescription.addEventListener('click', /*#__PURE__*/function () {
                var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(e) {
                  var note, response;
                  return regeneratorRuntime.wrap(function _callee$(_context) {
                    while (1) {
                      switch (_context.prev = _context.next) {
                        case 0:
                          if (isTagMode) {
                            if (isEditTagMode) {
                              note = _objectSpread(_objectSpread({}, activeTag), {}, {
                                description: inputDescription.value
                              });
                              collection.notes = [].concat(_toConsumableArray(collection.notes.filter(function (n) {
                                return n.tag !== note.tag;
                              })), [note]);
                            } else {
                              note = {
                                tag: inputName.value.trim(),
                                time: inputTime.value,
                                description: inputDescription.value
                              };
                              collection.notes = collection.notes || [];
                              collection.notes = [].concat(_toConsumableArray(collection.notes.filter(function (n) {
                                return n.tag !== note.tag;
                              })), [note]);
                            }
                          } else {
                            species.description = inputDescription.value;
                            species.time = inputTime.value.trim().split(',').map(function (t) {
                              return parseInt(t);
                            });
                            collection.species = [].concat(_toConsumableArray(collection.species.filter(function (s) {
                              return s.name !== species.name;
                            })), [species]);
                          }

                          _context.next = 3;
                          return api_firebase_firestore__WEBPACK_IMPORTED_MODULE_1__.firestore.updateCollection(collection);

                        case 3:
                          response = _context.sent;
                          addOrUpateMessage.classList.remove('hide');
                          setTimeout(function () {
                            addOrUpateMessage.classList.add('hide');
                          }, 5000);

                        case 6:
                        case "end":
                          return _context.stop();
                      }
                    }
                  }, _callee, this);
                }));

                return function (_x) {
                  return _ref2.apply(this, arguments);
                };
              }());
              addOrUpateMessage = document.querySelector('.js-add-video-message');
              btnCreateDescription.innerHTML = !!item.description ? 'Update video description' : 'Add video description';
              addOrUpateMessage.innerText = !!item.description ? 'Video description updated!' : 'Video description added!';
              inputDescription.addEventListener('keyup', function (e) {
                calcTextProperties(inputDescription);
              });
              calcTextProperties(inputDescription);

            case 21:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2, this);
    }));

    return function init() {
      return _ref.apply(this, arguments);
    };
  }();

  init();
};

var calcTextProperties = function calcTextProperties(inputDescription) {
  var count = inputDescription.value.length;
  var duration = Math.floor(count / 12);
  var display = document.querySelector('.js-audio-metrics');
  var seconds = Math.floor(duration % 60);
  var minutes = (duration - seconds) / 60;
  display.innerHTML = "count: ".concat(count, "; duration: ").concat(minutes, ":").concat(seconds);
};

/***/ }),

/***/ "qGgy":
/*!************************************************!*\
  !*** ./src/admin/screens/video/item-picker.js ***!
  \************************************************/
/*! namespace exports */
/*! export SnapPicker [provided] [used] [could be renamed] */
/*! other exports [not provided] [unused] */
/*! runtime requirements: __webpack_require__, __webpack_require__.n, __webpack_exports__, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "SnapPicker": () => /* binding */ SnapPicker
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "smZu");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var downshift__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! downshift */ "LxbL");
/* harmony import */ var admin_screens_video_utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! admin/screens/video/utils */ "YRLC");
var _this = undefined,
    _jsxFileName = "/Users/danminimac/code/snapdragon-redux/src/admin/screens/video/item-picker.js";

function _extends() {
  _extends = Object.assign || function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];

      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }

    return target;
  };

  return _extends.apply(this, arguments);
}




 // https://www.downshift-js.com/use-combobox

var SnapPicker = function SnapPicker(props) {
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(downshift__WEBPACK_IMPORTED_MODULE_2__.default, {
    onChange: function onChange(selection) {
      props.onChange(selection);
    },
    itemToString: function itemToString(item) {
      return item ? item.value : '';
    },
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 9,
      columnNumber: 5
    }
  }, function (_ref) {
    var getInputProps = _ref.getInputProps,
        getItemProps = _ref.getItemProps,
        getLabelProps = _ref.getLabelProps,
        getMenuProps = _ref.getMenuProps,
        isOpen = _ref.isOpen,
        inputValue = _ref.inputValue,
        highlightedIndex = _ref.highlightedIndex,
        selectedItem = _ref.selectedItem,
        getRootProps = _ref.getRootProps;
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("section", {
      __self: _this,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 26,
        columnNumber: 9
      }
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("label", _extends({
      className: "margin-right"
    }, getLabelProps(), {
      __self: _this,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 27,
        columnNumber: 11
      }
    }), props.label), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", _extends({
      style: {
        display: 'inline-block'
      }
    }, getRootProps({}, {
      suppressRefError: true
    }), {
      __self: _this,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 28,
        columnNumber: 11
      }
    }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("input", _extends({}, getInputProps(), {
      __self: _this,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 32,
        columnNumber: 13
      }
    }))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("ul", _extends({}, getMenuProps(), {
      __self: _this,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 34,
        columnNumber: 11
      }
    }), isOpen ? props.items.filter(function (item) {
      return !inputValue || item.value.toLowerCase().includes(inputValue.toLowerCase());
    }).map(function (item, index) {
      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("li", _extends({}, getItemProps({
        key: item.value,
        index: index,
        item: item,
        style: {
          backgroundColor: highlightedIndex === index ? 'lightgray' : 'white',
          fontWeight: selectedItem === item ? 'bold' : 'normal'
        }
      }), {
        __self: _this,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 39,
          columnNumber: 21
        }
      }), item.value);
    }) : null));
  });
};

/***/ }),

/***/ "YRLC":
/*!******************************************!*\
  !*** ./src/admin/screens/video/utils.js ***!
  \******************************************/
/*! namespace exports */
/*! export comboboxStyles [provided] [unused] [could be renamed] */
/*! export menuStyles [provided] [unused] [could be renamed] */
/*! export playgroundStyles [provided] [unused] [could be renamed] */
/*! export useStyles [provided] [unused] [could be renamed] */
/*! other exports [not provided] [unused] */
/*! runtime requirements: __webpack_require__, __webpack_exports__, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* unused harmony exports useStyles, menuStyles, playgroundStyles, comboboxStyles */
/* harmony import */ var _material_ui_core_styles__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @material-ui/core/styles */ "ht0E");

var useStyles = (0,_material_ui_core_styles__WEBPACK_IMPORTED_MODULE_0__.default)(function (theme) {
  return {
    root: {
      width: "100%",
      maxWidth: 300,
      backgroundColor: theme.palette.background.paper,
      maxHeight: 250,
      overflowY: "auto",
      position: "absolute",
      margin: 0,
      borderTop: 0,
      zIndex: 1000
    },
    highlighted: {
      backgroundColor: "#bde4ff"
    },
    button: {
      margin: theme.spacing(1)
    },
    rightIcon: {
      marginLeft: theme.spacing(1)
    }
  };
});
var menuStyles = {
  maxHeight: "180px",
  overflowY: "auto",
  width: "135px",
  margin: 0,
  borderTop: 0,
  background: "white",
  position: "absolute",
  zIndex: 1000,
  listStyle: "none",
  padding: 0,
  left: "135px"
};
var playgroundStyles = {
  height: "160px"
};
var comboboxStyles = {
  display: "inline-block",
  marginLeft: "5px"
};

/***/ }),

/***/ "JuOZ":
/*!******************************************!*\
  !*** ./src/admin/scripts/materialize.js ***!
  \******************************************/
/*! namespace exports */
/*! export initMaterialize [provided] [used] [could be renamed] */
/*! other exports [not provided] [unused] */
/*! runtime requirements: __webpack_exports__, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "initMaterialize": () => /* binding */ initMaterialize
/* harmony export */ });
var initMaterialize = function initMaterialize() {
  document.addEventListener('DOMContentLoaded', function () {
    var modals = document.querySelectorAll('.modal');
    M.Modal.init(modals);
    var selectors = document.querySelectorAll('select');
    M.FormSelect.init(selectors);
    var species = document.querySelector('#licences');
    var el = M.FormSelect.init(species);
  });
};

/***/ }),

/***/ "bsKR":
/*!*****************************************!*\
  !*** ./src/api/firebase/credentials.js ***!
  \*****************************************/
/*! namespace exports */
/*! export firebaseConfig [provided] [used] [could be renamed] */
/*! other exports [not provided] [unused] */
/*! runtime requirements: __webpack_exports__, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "firebaseConfig": () => /* binding */ firebaseConfig
/* harmony export */ });
var firebaseConfig = {
  apiKey: "AIzaSyCA5oDmWevmZy2Ginb9eKcIe72Titk7szM",
  authDomain: "snapdragon-222014.firebaseapp.com",
  databaseURL: "https://snapdragon-222014.firebaseio.com",
  projectId: "snapdragon-222014",
  storageBucket: "snapdragon-222014.appspot.com",
  messagingSenderId: "947213844747",
  appId: "1:947213844747:web:97c1a5e664a670de"
};

/***/ }),

/***/ "xWjd":
/*!***************************************!*\
  !*** ./src/api/firebase/firestore.js ***!
  \***************************************/
/*! namespace exports */
/*! export firestore [provided] [used] [could be renamed] */
/*! other exports [not provided] [unused] */
/*! runtime requirements: __webpack_require__, __webpack_require__.n, __webpack_exports__, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "firestore": () => /* binding */ firestore
/* harmony export */ });
/* harmony import */ var utils_utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! utils/utils */ "EHpu");
/* harmony import */ var api_firebase_credentials__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! api/firebase/credentials */ "bsKR");
/* harmony import */ var firebase_app__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! firebase/app */ "+njt");
/* harmony import */ var firebase_app__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(firebase_app__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var firebase_auth__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! firebase/auth */ "+0Ki");
/* harmony import */ var firebase_storage__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! firebase/storage */ "Z4CS");
/* harmony import */ var firebase_firestore__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! firebase/firestore */ "1ljy");
function ownKeys(object, enumerableOnly) {
  var keys = Object.keys(object);

  if (Object.getOwnPropertySymbols) {
    var symbols = Object.getOwnPropertySymbols(object);
    if (enumerableOnly) symbols = symbols.filter(function (sym) {
      return Object.getOwnPropertyDescriptor(object, sym).enumerable;
    });
    keys.push.apply(keys, symbols);
  }

  return keys;
}

function _objectSpread(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i] != null ? arguments[i] : {};

    if (i % 2) {
      ownKeys(Object(source), true).forEach(function (key) {
        _defineProperty(target, key, source[key]);
      });
    } else if (Object.getOwnPropertyDescriptors) {
      Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
    } else {
      ownKeys(Object(source)).forEach(function (key) {
        Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
      });
    }
  }

  return target;
}

function _createForOfIteratorHelper(o, allowArrayLike) {
  var it;

  if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) {
    if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") {
      if (it) o = it;
      var i = 0;

      var F = function F() {};

      return {
        s: F,
        n: function n() {
          if (i >= o.length) return {
            done: true
          };
          return {
            done: false,
            value: o[i++]
          };
        },
        e: function e(_e) {
          throw _e;
        },
        f: F
      };
    }

    throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }

  var normalCompletion = true,
      didErr = false,
      err;
  return {
    s: function s() {
      it = o[Symbol.iterator]();
    },
    n: function n() {
      var step = it.next();
      normalCompletion = step.done;
      return step;
    },
    e: function e(_e2) {
      didErr = true;
      err = _e2;
    },
    f: function f() {
      try {
        if (!normalCompletion && it["return"] != null) it["return"]();
      } finally {
        if (didErr) throw err;
      }
    }
  };
}

function _toConsumableArray(arr) {
  return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread();
}

function _nonIterableSpread() {
  throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}

function _unsupportedIterableToArray(o, minLen) {
  if (!o) return;
  if (typeof o === "string") return _arrayLikeToArray(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor) n = o.constructor.name;
  if (n === "Map" || n === "Set") return Array.from(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
}

function _iterableToArray(iter) {
  if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter);
}

function _arrayWithoutHoles(arr) {
  if (Array.isArray(arr)) return _arrayLikeToArray(arr);
}

function _arrayLikeToArray(arr, len) {
  if (len == null || len > arr.length) len = arr.length;

  for (var i = 0, arr2 = new Array(len); i < len; i++) {
    arr2[i] = arr[i];
  }

  return arr2;
}

function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
}

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {
  try {
    var info = gen[key](arg);
    var value = info.value;
  } catch (error) {
    reject(error);
    return;
  }

  if (info.done) {
    resolve(value);
  } else {
    Promise.resolve(value).then(_next, _throw);
  }
}

function _asyncToGenerator(fn) {
  return function () {
    var self = this,
        args = arguments;
    return new Promise(function (resolve, reject) {
      var gen = fn.apply(self, args);

      function _next(value) {
        asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);
      }

      function _throw(err) {
        asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);
      }

      _next(undefined);
    });
  };
}







firebase_app__WEBPACK_IMPORTED_MODULE_2___default().initializeApp(api_firebase_credentials__WEBPACK_IMPORTED_MODULE_1__.firebaseConfig);
var db = firebase_app__WEBPACK_IMPORTED_MODULE_2___default().firestore();

var getSpeciesWhere = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(props) {
    var key, operator, value, limit, speciesRef, querySnapshot, docs;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            key = props.key, operator = props.operator, value = props.value, limit = props.limit;
            speciesRef = limit ? db.collection("species").where(key, operator, value).limit(limit) : db.collection("species").where(key, operator, value);
            _context.next = 5;
            return speciesRef.get();

          case 5:
            querySnapshot = _context.sent;
            docs = [];
            querySnapshot.forEach(function (doc) {
              docs.push(doc.data());
            });
            _context.next = 10;
            return docs;

          case 10:
            return _context.abrupt("return", _context.sent);

          case 13:
            _context.prev = 13;
            _context.t0 = _context["catch"](0);

          case 15:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, this, [[0, 13]]);
  }));

  return function getSpeciesWhere(_x) {
    return _ref.apply(this, arguments);
  };
}();

var getSpecies = /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(props) {
    var item;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.next = 2;
            return getSpeciesWhere(props);

          case 2:
            item = _context2.sent;
            return _context2.abrupt("return", item);

          case 4:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, this);
  }));

  return function getSpecies(_x2) {
    return _ref2.apply(this, arguments);
  };
}();

var getSpeciesNames = /*#__PURE__*/function () {
  var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3() {
    var speciesPropertiesRef, querySnapshot, docs;
    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.prev = 0;
            speciesPropertiesRef = db.collection("species").where("collection_property", "==", 'names');
            _context3.next = 4;
            return speciesPropertiesRef.get();

          case 4:
            querySnapshot = _context3.sent;
            docs = [];
            querySnapshot.forEach(function (doc) {
              docs.push(doc.data());
            });
            _context3.next = 9;
            return docs;

          case 9:
            return _context3.abrupt("return", _context3.sent);

          case 12:
            _context3.prev = 12;
            _context3.t0 = _context3["catch"](0);

          case 14:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3, this, [[0, 12]]);
  }));

  return function getSpeciesNames() {
    return _ref3.apply(this, arguments);
  };
}();

var getTaxaNames = /*#__PURE__*/function () {
  var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4() {
    var taxaPropertiesRef, querySnapshot, docs;
    return regeneratorRuntime.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            _context4.prev = 0;
            taxaPropertiesRef = db.collection("taxa").where("collection_property", "==", 'names');
            _context4.next = 4;
            return taxaPropertiesRef.get();

          case 4:
            querySnapshot = _context4.sent;
            docs = [];
            querySnapshot.forEach(function (doc) {
              docs.push(doc.data());
            });
            _context4.next = 9;
            return docs;

          case 9:
            return _context4.abrupt("return", _context4.sent);

          case 12:
            _context4.prev = 12;
            _context4.t0 = _context4["catch"](0);

          case 14:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4, this, [[0, 12]]);
  }));

  return function getTaxaNames() {
    return _ref4.apply(this, arguments);
  };
}();

var getSpeciesByIconicTaxon = /*#__PURE__*/function () {
  var _ref5 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5(item) {
    var number,
        iconicTaxon,
        isLichen,
        eolId,
        querySnapshot,
        docs,
        species,
        random,
        operator,
        randomId,
        _args5 = arguments;
    return regeneratorRuntime.wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            number = _args5.length > 1 && _args5[1] !== undefined ? _args5[1] : 6;
            iconicTaxon = item.iconicTaxon, isLichen = item.lichen, eolId = item.eolId;
            docs = [];
            species = db.collection("species");
            random = utils_utils__WEBPACK_IMPORTED_MODULE_0__.utils.getRandomInt(2);
            operator = random === 0 ? '>=' : '<=';
            randomId = getRandomId();

            if (!isLichen) {
              _context5.next = 13;
              break;
            }

            _context5.next = 10;
            return species.where('lichen', '==', true).where(firebase_app__WEBPACK_IMPORTED_MODULE_2___default().firestore.FieldPath.documentId(), operator, randomId).limit(number).get();

          case 10:
            querySnapshot = _context5.sent;
            _context5.next = 16;
            break;

          case 13:
            _context5.next = 15;
            return species.where('iconicTaxon', '==', iconicTaxon.toLowerCase()).where(firebase_app__WEBPACK_IMPORTED_MODULE_2___default().firestore.FieldPath.documentId(), operator, randomId).limit(number).get();

          case 15:
            querySnapshot = _context5.sent;

          case 16:
            querySnapshot.forEach(function (doc) {
              docs.push(doc.data());
            });
            return _context5.abrupt("return", docs);

          case 18:
          case "end":
            return _context5.stop();
        }
      }
    }, _callee5, this);
  }));

  return function getSpeciesByIconicTaxon(_x3) {
    return _ref5.apply(this, arguments);
  };
}();

var getSpeciesByName = /*#__PURE__*/function () {
  var _ref6 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee6(itemName) {
    var force,
        items,
        _args6 = arguments;
    return regeneratorRuntime.wrap(function _callee6$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            force = _args6.length > 1 && _args6[1] !== undefined ? _args6[1] : false;

            if (itemName) {
              _context6.next = 3;
              break;
            }

            return _context6.abrupt("return", '');

          case 3:
            _context6.next = 5;
            return getSpecies({
              key: 'name',
              operator: '==',
              value: itemName
            });

          case 5:
            items = _context6.sent;
            return _context6.abrupt("return", items[0]);

          case 7:
          case "end":
            return _context6.stop();
        }
      }
    }, _callee6, this);
  }));

  return function getSpeciesByName(_x4) {
    return _ref6.apply(this, arguments);
  };
}();

var getTaxaWhere = /*#__PURE__*/function () {
  var _ref7 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee7(props) {
    var language, key, operator, value, limit, taxaRef, querySnapshot, docs;
    return regeneratorRuntime.wrap(function _callee7$(_context7) {
      while (1) {
        switch (_context7.prev = _context7.next) {
          case 0:
            language = props.language, key = props.key, operator = props.operator, value = props.value, limit = props.limit;
            taxaRef = limit ? db.collection("taxa_en").where(key, operator, value).limit(limit) : db.collection("taxa_en").where(key, operator, value);
            _context7.next = 4;
            return taxaRef.get();

          case 4:
            querySnapshot = _context7.sent;
            docs = [];
            querySnapshot.forEach(function (doc) {
              docs.push(doc.data());
            });
            _context7.next = 9;
            return docs;

          case 9:
            return _context7.abrupt("return", _context7.sent);

          case 10:
          case "end":
            return _context7.stop();
        }
      }
    }, _callee7, this);
  }));

  return function getTaxaWhere(_x5) {
    return _ref7.apply(this, arguments);
  };
}();

var getFamiliesByIconicTaxon = /*#__PURE__*/function () {
  var _ref8 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee8(iconicTaxonRank, iconicTaxonValue, isLichen, config) {
    return regeneratorRuntime.wrap(function _callee8$(_context8) {
      while (1) {
        switch (_context8.prev = _context8.next) {
          case 0:
            _context8.next = 2;
            return getTaxaWhere({
              language: config.language,
              key: 'iconicTaxon',
              operator: '==',
              value: iconicTaxonValue,
              limit: 7
            });

          case 2:
            return _context8.abrupt("return", _context8.sent);

          case 3:
          case "end":
            return _context8.stop();
        }
      }
    }, _callee8, this);
  }));

  return function getFamiliesByIconicTaxon(_x6, _x7, _x8, _x9) {
    return _ref8.apply(this, arguments);
  };
}();

var getTaxonByName = /*#__PURE__*/function () {
  var _ref9 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee9(config, name) {
    var taxon, taxaRef, querySnapshot;
    return regeneratorRuntime.wrap(function _callee9$(_context9) {
      while (1) {
        switch (_context9.prev = _context9.next) {
          case 0:
            _context9.prev = 0;
            taxon = {};
            taxaRef = db.collection("taxa_en").where('name', '==', name);
            _context9.next = 5;
            return taxaRef.get();

          case 5:
            querySnapshot = _context9.sent;

            if (querySnapshot.docs.length > 0) {
              querySnapshot.forEach(function (doc) {
                taxon = doc.data();
              });
            }

            return _context9.abrupt("return", taxon);

          case 10:
            _context9.prev = 10;
            _context9.t0 = _context9["catch"](0);
            return _context9.abrupt("return", _context9.t0);

          case 13:
          case "end":
            return _context9.stop();
        }
      }
    }, _callee9, this, [[0, 10]]);
  }));

  return function getTaxonByName(_x10, _x11) {
    return _ref9.apply(this, arguments);
  };
}();

var getAsyncTraitsByNameAndCollection = /*#__PURE__*/function () {
  var _ref10 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee10(name) {
    var collection,
        language,
        languageTraits,
        traits,
        _args10 = arguments;
    return regeneratorRuntime.wrap(function _callee10$(_context10) {
      while (1) {
        switch (_context10.prev = _context10.next) {
          case 0:
            collection = _args10.length > 1 && _args10[1] !== undefined ? _args10[1] : 'traits_en';
            language = _args10.length > 2 ? _args10[2] : undefined;
            _context10.prev = 2;
            languageTraits = db.collection(collection).where("name", "==", name);
            _context10.next = 6;
            return languageTraits.get();

          case 6:
            traits = _context10.sent;
            _context10.next = 9;
            return traits;

          case 9:
            return _context10.abrupt("return", _context10.sent);

          case 12:
            _context10.prev = 12;
            _context10.t0 = _context10["catch"](2);

          case 14:
          case "end":
            return _context10.stop();
        }
      }
    }, _callee10, this, [[2, 12]]);
  }));

  return function getAsyncTraitsByNameAndCollection(_x12) {
    return _ref10.apply(this, arguments);
  };
}();

var getTraitsBySpeciesName = /*#__PURE__*/function () {
  var _ref11 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee11(name) {
    var language,
        traits,
        querySnapshot,
        _args11 = arguments;
    return regeneratorRuntime.wrap(function _callee11$(_context11) {
      while (1) {
        switch (_context11.prev = _context11.next) {
          case 0:
            language = _args11.length > 1 && _args11[1] !== undefined ? _args11[1] : 'en';
            _context11.next = 3;
            return getAsyncTraitsByNameAndCollection(name, 'traits_en', language);

          case 3:
            querySnapshot = _context11.sent;

            if (!(!querySnapshot || !querySnapshot.docs)) {
              _context11.next = 6;
              break;
            }

            return _context11.abrupt("return", new Promise(function (resolve) {
              return resolve({});
            }));

          case 6:
            if (querySnapshot.docs.length > 0) {
              querySnapshot.forEach(function (doc) {
                traits = doc.data();
              });
            }

            _context11.next = 9;
            return traits;

          case 9:
            return _context11.abrupt("return", _context11.sent);

          case 10:
          case "end":
            return _context11.stop();
        }
      }
    }, _callee11, this);
  }));

  return function getTraitsBySpeciesName(_x13) {
    return _ref11.apply(this, arguments);
  };
}();

var getTraitsByTaxonName = /*#__PURE__*/function () {
  var _ref12 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee12(name) {
    var language,
        traits,
        querySnapshot,
        _args12 = arguments;
    return regeneratorRuntime.wrap(function _callee12$(_context12) {
      while (1) {
        switch (_context12.prev = _context12.next) {
          case 0:
            language = _args12.length > 1 && _args12[1] !== undefined ? _args12[1] : 'en';
            _context12.next = 3;
            return getAsyncTraitsByNameAndCollection(name, 'taxa_en', language);

          case 3:
            querySnapshot = _context12.sent;

            if (!(!querySnapshot || !querySnapshot.docs)) {
              _context12.next = 6;
              break;
            }

            return _context12.abrupt("return", new Promise(function (resolve) {
              return resolve({});
            }));

          case 6:
            if (querySnapshot.docs.length > 0) {
              querySnapshot.forEach(function (doc) {
                traits = doc.data();
              });
            }

            _context12.next = 9;
            return traits;

          case 9:
            return _context12.abrupt("return", _context12.sent);

          case 10:
          case "end":
            return _context12.stop();
        }
      }
    }, _callee12, this);
  }));

  return function getTraitsByTaxonName(_x14) {
    return _ref12.apply(this, arguments);
  };
}();

var getBirdsong = /*#__PURE__*/function () {
  var _ref13 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee13(xcID) {
    var storage, storageRef, url;
    return regeneratorRuntime.wrap(function _callee13$(_context13) {
      while (1) {
        switch (_context13.prev = _context13.next) {
          case 0:
            storage = firebase_app__WEBPACK_IMPORTED_MODULE_2___default().storage();
            storageRef = storage.ref();
            _context13.next = 4;
            return storageRef.child("birdsong/".concat(xcID, ".mp3")).getDownloadURL();

          case 4:
            url = _context13.sent;
            return _context13.abrupt("return", url);

          case 6:
          case "end":
            return _context13.stop();
        }
      }
    }, _callee13, this);
  }));

  return function getBirdsong(_x15) {
    return _ref13.apply(this, arguments);
  };
}();

var addSpecies = /*#__PURE__*/function () {
  var _ref14 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee14(species) {
    var docRef;
    return regeneratorRuntime.wrap(function _callee14$(_context14) {
      while (1) {
        switch (_context14.prev = _context14.next) {
          case 0:
            if (species.images) {
              species.images = species.images.map(function (image) {
                return {
                  license: image.license || '',
                  photographer: image.photographer || '',
                  rightsHolder: image.rightsHolder || '',
                  source: image.source || '',
                  title: image.title || '',
                  url: image.url || ''
                };
              });
            }

            _context14.prev = 1;
            _context14.next = 4;
            return db.collection('species').add(species);

          case 4:
            docRef = _context14.sent;
            _context14.next = 9;
            break;

          case 7:
            _context14.prev = 7;
            _context14.t0 = _context14["catch"](1);

          case 9:
            return _context14.abrupt("return", docRef);

          case 10:
          case "end":
            return _context14.stop();
        }
      }
    }, _callee14, this, [[1, 7]]);
  }));

  return function addSpecies(_x16) {
    return _ref14.apply(this, arguments);
  };
}();

var updateSpecies = /*#__PURE__*/function () {
  var _ref15 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee15(species) {
    var speciesDocRef, querySnapshot;
    return regeneratorRuntime.wrap(function _callee15$(_context15) {
      while (1) {
        switch (_context15.prev = _context15.next) {
          case 0:
            if (species.images) {
              species.images = species.images.map(function (image) {
                var updatedSpecies = {
                  license: image.license || '',
                  photographer: image.photographer || '',
                  rightsHolder: image.rightsHolder || '',
                  source: image.source || '',
                  title: image.title || '',
                  url: image.url || ''
                };

                if (image.starred) {
                  updatedSpecies.starred = image.starred;
                }

                if (image.provider) {
                  updatedSpecies.provider = image.provider;
                }

                return updatedSpecies;
              });
            }

            _context15.next = 3;
            return db.collection("species").where("name", "==", species.name).get();

          case 3:
            querySnapshot = _context15.sent;
            querySnapshot.forEach(function (doc) {
              speciesDocRef = doc.ref;
            });
            _context15.next = 7;
            return speciesDocRef.update(species);

          case 7:
            return _context15.abrupt("return", _context15.sent);

          case 8:
          case "end":
            return _context15.stop();
        }
      }
    }, _callee15, this);
  }));

  return function updateSpecies(_x17) {
    return _ref15.apply(this, arguments);
  };
}();

var updateSpeciesNames = /*#__PURE__*/function () {
  var _ref16 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee16(species, names) {
    var speciesDocRef, querySnapshot;
    return regeneratorRuntime.wrap(function _callee16$(_context16) {
      while (1) {
        switch (_context16.prev = _context16.next) {
          case 0:
            _context16.next = 2;
            return db.collection("species").where("name", "==", species.name).get();

          case 2:
            querySnapshot = _context16.sent;
            querySnapshot.forEach(function (doc) {
              speciesDocRef = doc.ref;
            });
            _context16.next = 6;
            return speciesDocRef.update({
              names: names
            });

          case 6:
            return _context16.abrupt("return", _context16.sent);

          case 7:
          case "end":
            return _context16.stop();
        }
      }
    }, _callee16, this);
  }));

  return function updateSpeciesNames(_x18, _x19) {
    return _ref16.apply(this, arguments);
  };
}();

var deleteSpeciesByName = /*#__PURE__*/function () {
  var _ref17 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee17(name) {
    var speciesRef;
    return regeneratorRuntime.wrap(function _callee17$(_context17) {
      while (1) {
        switch (_context17.prev = _context17.next) {
          case 0:
            speciesRef = db.collection("species").where('name', '==', name);
            speciesRef.get().then(function (querySnapshot) {
              querySnapshot.forEach(function (doc) {
                doc.ref["delete"]();
              });
            });

          case 2:
          case "end":
            return _context17.stop();
        }
      }
    }, _callee17, this);
  }));

  return function deleteSpeciesByName(_x20) {
    return _ref17.apply(this, arguments);
  };
}();

var addTraits = /*#__PURE__*/function () {
  var _ref18 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee18(name, trait) {
    var collection,
        speciesTraitsRef,
        querySnapshot,
        _args18 = arguments;
    return regeneratorRuntime.wrap(function _callee18$(_context18) {
      while (1) {
        switch (_context18.prev = _context18.next) {
          case 0:
            collection = _args18.length > 2 && _args18[2] !== undefined ? _args18[2] : 'traits_en';
            _context18.prev = 1;
            _context18.next = 4;
            return db.collection(collection).where("name", "==", name).get();

          case 4:
            querySnapshot = _context18.sent;

            if (!querySnapshot.empty) {
              _context18.next = 12;
              break;
            }

            trait.name = name;
            _context18.next = 9;
            return db.collection(collection).add(trait);

          case 9:
            return _context18.abrupt("return", _context18.sent);

          case 12:
            querySnapshot.forEach(function (doc) {
              speciesTraitsRef = doc.ref;
            });
            _context18.next = 15;
            return speciesTraitsRef.update(trait);

          case 15:
            return _context18.abrupt("return", 'Update successful');

          case 16:
            _context18.next = 21;
            break;

          case 18:
            _context18.prev = 18;
            _context18.t0 = _context18["catch"](1);
            return _context18.abrupt("return", "Update failed. Error ".concat(_context18.t0.message, "."));

          case 21:
          case "end":
            return _context18.stop();
        }
      }
    }, _callee18, this, [[1, 18]]);
  }));

  return function addTraits(_x21, _x22) {
    return _ref18.apply(this, arguments);
  };
}();

var addSpeciesRelationship = /*#__PURE__*/function () {
  var _ref19 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee21(type, traits) {
    var batch, readyBatch;
    return regeneratorRuntime.wrap(function _callee21$(_context21) {
      while (1) {
        switch (_context21.prev = _context21.next) {
          case 0:
            _context21.prev = 0;
            batch = db.batch();

            readyBatch = /*#__PURE__*/function () {
              var _ref20 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee20() {
                return regeneratorRuntime.wrap(function _callee20$(_context20) {
                  while (1) {
                    switch (_context20.prev = _context20.next) {
                      case 0:
                        return _context20.abrupt("return", Promise.all(traits.map( /*#__PURE__*/function () {
                          var _ref21 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee19(trait) {
                            var speciesTraitsRef, querySnapshot;
                            return regeneratorRuntime.wrap(function _callee19$(_context19) {
                              while (1) {
                                switch (_context19.prev = _context19.next) {
                                  case 0:
                                    _context19.next = 2;
                                    return db.collection("traits_en").where("name", "==", trait.name).get();

                                  case 2:
                                    querySnapshot = _context19.sent;

                                    if (!querySnapshot.empty) {
                                      _context19.next = 10;
                                      break;
                                    }

                                    trait.name = name;
                                    _context19.next = 7;
                                    return db.collection("traits_en").add(trait);

                                  case 7:
                                    speciesTraitsRef = _context19.sent;
                                    _context19.next = 11;
                                    break;

                                  case 10:
                                    querySnapshot.forEach(function (doc) {
                                      speciesTraitsRef = doc.ref;
                                    });

                                  case 11:
                                    speciesTraitsRef.update(_defineProperty({}, type, firebase_app__WEBPACK_IMPORTED_MODULE_2___default().firestore.FieldValue.arrayUnion(trait.update)));

                                  case 12:
                                  case "end":
                                    return _context19.stop();
                                }
                              }
                            }, _callee19, this);
                          }));

                          return function (_x25) {
                            return _ref21.apply(this, arguments);
                          };
                        }())));

                      case 1:
                      case "end":
                        return _context20.stop();
                    }
                  }
                }, _callee20, this);
              }));

              return function readyBatch() {
                return _ref20.apply(this, arguments);
              };
            }();

            _context21.next = 5;
            return readyBatch();

          case 5:
            _context21.next = 7;
            return batch.commit();

          case 7:
            return _context21.abrupt("return", 'Relationship added.');

          case 10:
            _context21.prev = 10;
            _context21.t0 = _context21["catch"](0);
            return _context21.abrupt("return", _context21.t0.message);

          case 13:
          case "end":
            return _context21.stop();
        }
      }
    }, _callee21, this, [[0, 10]]);
  }));

  return function addSpeciesRelationship(_x23, _x24) {
    return _ref19.apply(this, arguments);
  };
}();

var addPhotos = /*#__PURE__*/function () {
  var _ref22 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee22(name, photos) {
    var speciesDocRef, querySnapshot, _firebase$firestore$F;

    return regeneratorRuntime.wrap(function _callee22$(_context22) {
      while (1) {
        switch (_context22.prev = _context22.next) {
          case 0:
            _context22.next = 2;
            return db.collection("species").where("name", "==", name).get();

          case 2:
            querySnapshot = _context22.sent;
            querySnapshot.forEach(function (doc) {
              speciesDocRef = doc.ref;
            });
            _context22.prev = 4;
            return _context22.abrupt("return", speciesDocRef.update({
              images: (_firebase$firestore$F = (firebase_app__WEBPACK_IMPORTED_MODULE_2___default().firestore.FieldValue)).arrayUnion.apply(_firebase$firestore$F, _toConsumableArray(photos))
            }));

          case 8:
            _context22.prev = 8;
            _context22.t0 = _context22["catch"](4);
            return _context22.abrupt("return", _context22.t0.message);

          case 11:
          case "end":
            return _context22.stop();
        }
      }
    }, _callee22, this, [[4, 8]]);
  }));

  return function addPhotos(_x26, _x27) {
    return _ref22.apply(this, arguments);
  };
}();

var deleteSpeciesTraitField = /*#__PURE__*/function () {
  var _ref23 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee23(name, field) {
    var querySnapshot, speciesTraitsRef, removeField;
    return regeneratorRuntime.wrap(function _callee23$(_context23) {
      while (1) {
        switch (_context23.prev = _context23.next) {
          case 0:
            _context23.prev = 0;
            _context23.prev = 1;
            _context23.next = 4;
            return db.collection("traits_en").where("name", "==", name).get();

          case 4:
            querySnapshot = _context23.sent;
            querySnapshot.forEach(function (doc) {
              speciesTraitsRef = doc.ref;
            });
            _context23.next = 10;
            break;

          case 8:
            _context23.prev = 8;
            _context23.t0 = _context23["catch"](1);

          case 10:
            removeField = speciesTraitsRef.update(_defineProperty({}, field, firebase_app__WEBPACK_IMPORTED_MODULE_2___default().firestore.FieldValue.delete()));
            return _context23.abrupt("return", removeField);

          case 14:
            _context23.prev = 14;
            _context23.t1 = _context23["catch"](0);

          case 16:
          case "end":
            return _context23.stop();
        }
      }
    }, _callee23, this, [[0, 14], [1, 8]]);
  }));

  return function deleteSpeciesTraitField(_x28, _x29) {
    return _ref23.apply(this, arguments);
  };
}();

var getRandomSpecies = /*#__PURE__*/function () {
  var _ref24 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee24(number) {
    var querySnapshot, docs, species, random, operator;
    return regeneratorRuntime.wrap(function _callee24$(_context24) {
      while (1) {
        switch (_context24.prev = _context24.next) {
          case 0:
            docs = [];
            species = db.collection("species");
            random = utils_utils__WEBPACK_IMPORTED_MODULE_0__.utils.getRandomInt(2);
            operator = random === 0 ? '>=' : '<=';
            _context24.next = 6;
            return species.where(firebase_app__WEBPACK_IMPORTED_MODULE_2___default().firestore.FieldPath.documentId(), operator, getRandomId()).limit(number).get();

          case 6:
            querySnapshot = _context24.sent;
            querySnapshot.forEach(function (doc) {
              docs.push(doc.data());
            });
            return _context24.abrupt("return", docs);

          case 9:
          case "end":
            return _context24.stop();
        }
      }
    }, _callee24, this);
  }));

  return function getRandomSpecies(_x30) {
    return _ref24.apply(this, arguments);
  };
}();

var getDefinition = function getDefinition(term, glossary, required) {
  var terms = term.split(',');
  var definitions = [];

  var _iterator = _createForOfIteratorHelper(terms),
      _step;

  try {
    var _loop = function _loop() {
      var term = _step.value;
      var definition = glossary.find(function (definition) {
        return definition.term.toLowerCase() === term.trim().toLowerCase() || definition.alt && definition.alt.toLowerCase() === term.trim().toLowerCase();
      });
      definitions.push(definition);
    };

    for (_iterator.s(); !(_step = _iterator.n()).done;) {
      _loop();
    }
  } catch (err) {
    _iterator.e(err);
  } finally {
    _iterator.f();
  }

  ;
  return definitions.filter(function (definition) {
    return definition;
  });
};

var getTraitDefinitions = function getTraitDefinitions(glossary, required, trait) {
  var traits = glossary.filter(function (entry) {
    return entry.trait;
  }).filter(function (entry) {
    return entry.trait.toLowerCase() === trait.toLowerCase();
  });
  return new Promise(function (resolve) {
    return resolve(traits);
  });
};

var addTaxon = /*#__PURE__*/function () {
  var _ref25 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee25(props) {
    var language, taxon, docRef;
    return regeneratorRuntime.wrap(function _callee25$(_context25) {
      while (1) {
        switch (_context25.prev = _context25.next) {
          case 0:
            language = props.language, taxon = props.taxon;
            _context25.prev = 1;
            _context25.next = 4;
            return db.collection("taxa_en").add(taxon);

          case 4:
            docRef = _context25.sent;
            return _context25.abrupt("return", 'Taxon saved.');

          case 8:
            _context25.prev = 8;
            _context25.t0 = _context25["catch"](1);

          case 10:
            return _context25.abrupt("return", docRef);

          case 11:
          case "end":
            return _context25.stop();
        }
      }
    }, _callee25, this, [[1, 8]]);
  }));

  return function addTaxon(_x31) {
    return _ref25.apply(this, arguments);
  };
}();

var getSpeciesInParallel = /*#__PURE__*/function () {
  var _ref26 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee27(species) {
    return regeneratorRuntime.wrap(function _callee27$(_context27) {
      while (1) {
        switch (_context27.prev = _context27.next) {
          case 0:
            _context27.prev = 0;
            return _context27.abrupt("return", Promise.all(species.map(function (sp) {
              return firestore.getSpeciesByName(sp.name).then( /*#__PURE__*/function () {
                var _ref27 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee26(item) {
                  return regeneratorRuntime.wrap(function _callee26$(_context26) {
                    while (1) {
                      switch (_context26.prev = _context26.next) {
                        case 0:
                          _context26.next = 2;
                          return _objectSpread(_objectSpread({}, item), {}, {
                            description: sp.description || '',
                            time: sp.time || 0,
                            questionIds: sp.questionIds || [],
                            quickId: sp.quickId || ''
                          });

                        case 2:
                          return _context26.abrupt("return", _context26.sent);

                        case 3:
                        case "end":
                          return _context26.stop();
                      }
                    }
                  }, _callee26, this);
                }));

                return function (_x33) {
                  return _ref27.apply(this, arguments);
                };
              }());
            })));

          case 4:
            _context27.prev = 4;
            _context27.t0 = _context27["catch"](0);
            logAPIError(_context27.t0, 'getSpeciesInParallel');

          case 7:
          case "end":
            return _context27.stop();
        }
      }
    }, _callee27, this, [[0, 4]]);
  }));

  return function getSpeciesInParallel(_x32) {
    return _ref26.apply(this, arguments);
  };
}();

var getSpeciesByNameInParallel = /*#__PURE__*/function () {
  var _ref28 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee29(itemNames) {
    return regeneratorRuntime.wrap(function _callee29$(_context29) {
      while (1) {
        switch (_context29.prev = _context29.next) {
          case 0:
            _context29.prev = 0;
            return _context29.abrupt("return", Promise.all(itemNames.map(function (name) {
              return firestore.getSpeciesByName(name).then( /*#__PURE__*/function () {
                var _ref29 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee28(item) {
                  return regeneratorRuntime.wrap(function _callee28$(_context28) {
                    while (1) {
                      switch (_context28.prev = _context28.next) {
                        case 0:
                          _context28.next = 2;
                          return _objectSpread({}, item);

                        case 2:
                          return _context28.abrupt("return", _context28.sent);

                        case 3:
                        case "end":
                          return _context28.stop();
                      }
                    }
                  }, _callee28, this);
                }));

                return function (_x35) {
                  return _ref29.apply(this, arguments);
                };
              }());
            })));

          case 4:
            _context29.prev = 4;
            _context29.t0 = _context29["catch"](0);

          case 6:
          case "end":
            return _context29.stop();
        }
      }
    }, _callee29, this, [[0, 4]]);
  }));

  return function getSpeciesByNameInParallel(_x34) {
    return _ref28.apply(this, arguments);
  };
}();

var addCollection = /*#__PURE__*/function () {
  var _ref30 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee30(collection, user) {
    var collectionRef, docRef;
    return regeneratorRuntime.wrap(function _callee30$(_context30) {
      while (1) {
        switch (_context30.prev = _context30.next) {
          case 0:
            if (user) {
              _context30.next = 2;
              break;
            }

            return _context30.abrupt("return");

          case 2:
            _context30.next = 4;
            return updateCollection(collection);

          case 4:
            collectionRef = _context30.sent;

            if (!collectionRef) {
              _context30.next = 7;
              break;
            }

            return _context30.abrupt("return");

          case 7:
            collection.user = user;
            docRef = null;
            _context30.prev = 9;
            _context30.next = 12;
            return db.collection('collections').add(collection);

          case 12:
            docRef = _context30.sent;
            _context30.next = 18;
            break;

          case 15:
            _context30.prev = 15;
            _context30.t0 = _context30["catch"](9); // logAPIError(e, 'addCollection');

            console.log('addCollection:', _context30.t0);

          case 18:
            return _context30.abrupt("return", docRef);

          case 19:
          case "end":
            return _context30.stop();
        }
      }
    }, _callee30, this, [[9, 15]]);
  }));

  return function addCollection(_x36, _x37) {
    return _ref30.apply(this, arguments);
  };
}();

var updateCollection = /*#__PURE__*/function () {
  var _ref31 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee31(collection) {
    var docRef, querySnapshot;
    return regeneratorRuntime.wrap(function _callee31$(_context31) {
      while (1) {
        switch (_context31.prev = _context31.next) {
          case 0:
            _context31.prev = 0;
            collection.items = []; // we don't want to update items as we have the info we need in species; the rest we get at runtime

            docRef = null;
            _context31.next = 5;
            return db.collection("collections").where("name", "==", collection.name).get();

          case 5:
            querySnapshot = _context31.sent;
            querySnapshot.forEach(function (doc) {
              docRef = doc.ref;
            });

            if (!docRef) {
              _context31.next = 10;
              break;
            }

            _context31.next = 10;
            return docRef.update(collection);

          case 10:
            return _context31.abrupt("return", docRef);

          case 13:
            _context31.prev = 13;
            _context31.t0 = _context31["catch"](0);
            return _context31.abrupt("return", {
              message: 'Failure',
              details: _context31.t0.message,
              success: false
            });

          case 16:
          case "end":
            return _context31.stop();
        }
      }
    }, _callee31, this, [[0, 13]]);
  }));

  return function updateCollection(_x38) {
    return _ref31.apply(this, arguments);
  };
}();

var getCollectionsWhere = /*#__PURE__*/function () {
  var _ref32 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee32(props) {
    var key, operator, value, limit, collectionRef, querySnapshot, docs;
    return regeneratorRuntime.wrap(function _callee32$(_context32) {
      while (1) {
        switch (_context32.prev = _context32.next) {
          case 0:
            key = props.key, operator = props.operator, value = props.value, limit = props.limit;
            collectionRef = limit ? db.collection('collections').where(key, operator, value).limit(limit) : key ? db.collection('collections').where(key, operator, value) : db.collection('collections');
            _context32.next = 4;
            return collectionRef.get();

          case 4:
            querySnapshot = _context32.sent;
            docs = [];
            querySnapshot.forEach(function (doc) {
              docs.push(doc.data());
            });
            return _context32.abrupt("return", docs);

          case 8:
          case "end":
            return _context32.stop();
        }
      }
    }, _callee32, this);
  }));

  return function getCollectionsWhere(_x39) {
    return _ref32.apply(this, arguments);
  };
}();

var getCollections = function getCollections(async) {
  return getCollectionsWhere({});
};

var addQuestion = /*#__PURE__*/function () {
  var _ref33 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee33(question) {
    var docRef;
    return regeneratorRuntime.wrap(function _callee33$(_context33) {
      while (1) {
        switch (_context33.prev = _context33.next) {
          case 0:
            _context33.prev = 0;
            _context33.next = 3;
            return db.collection('questions').add(question);

          case 3:
            docRef = _context33.sent;
            _context33.next = 8;
            break;

          case 6:
            _context33.prev = 6;
            _context33.t0 = _context33["catch"](0);

          case 8:
            return _context33.abrupt("return", docRef);

          case 9:
          case "end":
            return _context33.stop();
        }
      }
    }, _callee33, this, [[0, 6]]);
  }));

  return function addQuestion(_x40) {
    return _ref33.apply(this, arguments);
  };
}();

var getQuestionsWhere = /*#__PURE__*/function () {
  var _ref34 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee34(props) {
    var key, operator, value, collectionRef, querySnapshot, docs;
    return regeneratorRuntime.wrap(function _callee34$(_context34) {
      while (1) {
        switch (_context34.prev = _context34.next) {
          case 0:
            key = props.key, operator = props.operator, value = props.value;
            collectionRef = key ? db.collection("questions").where(key, operator, value) : db.collection("questions");
            _context34.next = 4;
            return collectionRef.get();

          case 4:
            querySnapshot = _context34.sent;
            docs = [];
            querySnapshot.forEach(function (doc) {
              docs.push(doc.data());
            });
            return _context34.abrupt("return", docs);

          case 8:
          case "end":
            return _context34.stop();
        }
      }
    }, _callee34, this);
  }));

  return function getQuestionsWhere(_x41) {
    return _ref34.apply(this, arguments);
  };
}();

var addDefinition = /*#__PURE__*/function () {
  var _ref35 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee35(definition) {
    var querySnapshot, docRef;
    return regeneratorRuntime.wrap(function _callee35$(_context35) {
      while (1) {
        switch (_context35.prev = _context35.next) {
          case 0:
            _context35.next = 2;
            return db.collection("glossary").where("term", "==", definition.term).get();

          case 2:
            querySnapshot = _context35.sent;

            if (!querySnapshot.empty) {
              _context35.next = 15;
              break;
            }

            _context35.prev = 4;
            _context35.next = 7;
            return db.collection('glossary').add(definition);

          case 7:
            docRef = _context35.sent;
            _context35.next = 12;
            break;

          case 10:
            _context35.prev = 10;
            _context35.t0 = _context35["catch"](4);

          case 12:
            return _context35.abrupt("return", docRef);

          case 15:
            throw 'That definition already exists!';

          case 16:
          case "end":
            return _context35.stop();
        }
      }
    }, _callee35, this, [[4, 10]]);
  }));

  return function addDefinition(_x42) {
    return _ref35.apply(this, arguments);
  };
}();

var getDefinitionsWhere = /*#__PURE__*/function () {
  var _ref36 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee36(props) {
    var key, operator, value, collectionRef, querySnapshot, docs;
    return regeneratorRuntime.wrap(function _callee36$(_context36) {
      while (1) {
        switch (_context36.prev = _context36.next) {
          case 0:
            key = props.key, operator = props.operator, value = props.value;
            collectionRef = key ? db.collection("glossary").where(key, operator, value) : db.collection("glossary");
            _context36.next = 4;
            return collectionRef.get();

          case 4:
            querySnapshot = _context36.sent;
            docs = [];
            querySnapshot.forEach(function (doc) {
              docs.push(_objectSpread(_objectSpread({}, doc.data()), {}, {
                id: doc.id
              }));
            });
            return _context36.abrupt("return", docs);

          case 8:
          case "end":
            return _context36.stop();
        }
      }
    }, _callee36, this);
  }));

  return function getDefinitionsWhere(_x43) {
    return _ref36.apply(this, arguments);
  };
}();

var getDefinitionById = /*#__PURE__*/function () {
  var _ref37 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee37(id) {
    return regeneratorRuntime.wrap(function _callee37$(_context37) {
      while (1) {
        switch (_context37.prev = _context37.next) {
          case 0:
            return _context37.abrupt("return", db.collection('glossary').doc(id).get().then(function (data) {
              return _objectSpread(_objectSpread({}, data.data()), {}, {
                id: data.id
              });
            }));

          case 1:
          case "end":
            return _context37.stop();
        }
      }
    }, _callee37, this);
  }));

  return function getDefinitionById(_x44) {
    return _ref37.apply(this, arguments);
  };
}();

var getBatchDefinitionsById = /*#__PURE__*/function () {
  var _ref38 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee40(ids) {
    var terms, batch, readyBatch;
    return regeneratorRuntime.wrap(function _callee40$(_context40) {
      while (1) {
        switch (_context40.prev = _context40.next) {
          case 0:
            terms = [];
            _context40.prev = 1;
            batch = db.batch();

            readyBatch = /*#__PURE__*/function () {
              var _ref39 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee39() {
                return regeneratorRuntime.wrap(function _callee39$(_context39) {
                  while (1) {
                    switch (_context39.prev = _context39.next) {
                      case 0:
                        return _context39.abrupt("return", Promise.all(ids.map( /*#__PURE__*/function () {
                          var _ref40 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee38(id) {
                            var term;
                            return regeneratorRuntime.wrap(function _callee38$(_context38) {
                              while (1) {
                                switch (_context38.prev = _context38.next) {
                                  case 0:
                                    _context38.next = 2;
                                    return getDefinitionById(id);

                                  case 2:
                                    term = _context38.sent;
                                    terms.push(term);

                                  case 4:
                                  case "end":
                                    return _context38.stop();
                                }
                              }
                            }, _callee38, this);
                          }));

                          return function (_x46) {
                            return _ref40.apply(this, arguments);
                          };
                        }())));

                      case 1:
                      case "end":
                        return _context39.stop();
                    }
                  }
                }, _callee39, this);
              }));

              return function readyBatch() {
                return _ref39.apply(this, arguments);
              };
            }();

            _context40.next = 6;
            return readyBatch();

          case 6:
            _context40.next = 8;
            return batch.commit();

          case 8:
            return _context40.abrupt("return", terms);

          case 11:
            _context40.prev = 11;
            _context40.t0 = _context40["catch"](1);

          case 13:
          case "end":
            return _context40.stop();
        }
      }
    }, _callee40, this, [[1, 11]]);
  }));

  return function getBatchDefinitionsById(_x45) {
    return _ref38.apply(this, arguments);
  };
}();

var getDefinitionsByTaxa = function getDefinitionsByTaxa(taxa) {
  return getDefinitionsWhere({
    key: 'taxon',
    operator: 'in',
    value: taxa
  });
};

var updateDefinition = /*#__PURE__*/function () {
  var _ref41 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee41(definition) {
    var docRef, querySnapshot;
    return regeneratorRuntime.wrap(function _callee41$(_context41) {
      while (1) {
        switch (_context41.prev = _context41.next) {
          case 0:
            _context41.next = 2;
            return db.collection("glossary").where("term", "==", definition.term).get();

          case 2:
            querySnapshot = _context41.sent;
            querySnapshot.forEach(function (doc) {
              docRef = doc.ref;
            });
            _context41.next = 6;
            return docRef.update(definition);

          case 6:
            return _context41.abrupt("return", _context41.sent);

          case 7:
          case "end":
            return _context41.stop();
        }
      }
    }, _callee41, this);
  }));

  return function updateDefinition(_x47) {
    return _ref41.apply(this, arguments);
  };
}();

var getUnits = /*#__PURE__*/function () {
  var _ref42 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee42() {
    var props,
        _props$language,
        language,
        key,
        operator,
        value,
        unitsRef,
        querySnapshot,
        docs,
        _args42 = arguments;

    return regeneratorRuntime.wrap(function _callee42$(_context42) {
      while (1) {
        switch (_context42.prev = _context42.next) {
          case 0:
            props = _args42.length > 0 && _args42[0] !== undefined ? _args42[0] : {
              langage: 'en '
            };
            _props$language = props.language, language = _props$language === void 0 ? 'en' : _props$language, key = props.key, operator = props.operator, value = props.value;
            unitsRef = db.collection("units_".concat(language));
            _context42.next = 5;
            return unitsRef.get();

          case 5:
            querySnapshot = _context42.sent;
            docs = [];
            querySnapshot.forEach(function (doc) {
              docs.push(doc.data());
            });
            _context42.next = 10;
            return docs;

          case 10:
            return _context42.abrupt("return", _context42.sent);

          case 11:
          case "end":
            return _context42.stop();
        }
      }
    }, _callee42, this);
  }));

  return function getUnits() {
    return _ref42.apply(this, arguments);
  };
}();

var getEpithets = /*#__PURE__*/function () {
  var _ref43 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee43(props) {
    var _props$language2, language, key, operator, value, epithetssRef, querySnapshot, docs;

    return regeneratorRuntime.wrap(function _callee43$(_context43) {
      while (1) {
        switch (_context43.prev = _context43.next) {
          case 0:
            _props$language2 = props.language, language = _props$language2 === void 0 ? 'en' : _props$language2, key = props.key, operator = props.operator, value = props.value;
            epithetssRef = db.collection("epithets_".concat(language));
            _context43.next = 4;
            return epithetssRef.get();

          case 4:
            querySnapshot = _context43.sent;
            docs = [];
            querySnapshot.forEach(function (doc) {
              console.log(doc.data());
              docs.push(doc.data());
            });
            _context43.next = 9;
            return docs;

          case 9:
            return _context43.abrupt("return", _context43.sent);

          case 10:
          case "end":
            return _context43.stop();
        }
      }
    }, _callee43, this);
  }));

  return function getEpithets(_x48) {
    return _ref43.apply(this, arguments);
  };
}();

var firestore = {
  getSpecies: getSpecies,
  getSpeciesNames: getSpeciesNames,
  getTaxaNames: getTaxaNames,
  getSpeciesByName: getSpeciesByName,
  getSpeciesByIconicTaxon: getSpeciesByIconicTaxon,
  getFamiliesByIconicTaxon: getFamiliesByIconicTaxon,
  getTaxonByName: getTaxonByName,
  getTraitsBySpeciesName: getTraitsBySpeciesName,
  getTraitsByTaxonName: getTraitsByTaxonName,
  getBirdsong: getBirdsong,
  getRandomSpecies: getRandomSpecies,
  getDefinition: getDefinition,
  getSpeciesInParallel: getSpeciesInParallel,
  getSpeciesByNameInParallel: getSpeciesByNameInParallel,
  getCollections: getCollections,
  getCollectionsWhere: getCollectionsWhere,
  getQuestionsWhere: getQuestionsWhere,
  addSpecies: addSpecies,
  addTraits: addTraits,
  addSpeciesRelationship: addSpeciesRelationship,
  addPhotos: addPhotos,
  addTaxon: addTaxon,
  addCollection: addCollection,
  addQuestion: addQuestion,
  addDefinition: addDefinition,
  updateSpecies: updateSpecies,
  updateSpeciesNames: updateSpeciesNames,
  updateCollection: updateCollection,
  updateDefinition: updateDefinition,
  deleteSpeciesByName: deleteSpeciesByName,
  deleteSpeciesTraitField: deleteSpeciesTraitField,
  getTraitDefinitions: getTraitDefinitions,
  getDefinitionsWhere: getDefinitionsWhere,
  getDefinitionsByTaxa: getDefinitionsByTaxa,
  getDefinitionById: getDefinitionById,
  getBatchDefinitionsById: getBatchDefinitionsById,
  getUnits: getUnits,
  getEpithets: getEpithets
};

var getRandomId = function getRandomId() {
  var chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  var autoId = '';

  for (var i = 0; i < 20; i++) {
    autoId += chars.charAt(Math.floor(Math.random() * chars.length));
  }

  return autoId;
};

/***/ }),

/***/ "gEvk":
/*!******************************!*\
  !*** ./src/api/inat/inat.js ***!
  \******************************/
/*! namespace exports */
/*! export getAutocompleteBy [provided] [used] [could be renamed] */
/*! export getHistogram [provided] [used] [could be renamed] */
/*! export getInatPlaceId [provided] [used] [could be renamed] */
/*! export getInatSpecies [provided] [used] [could be renamed] */
/*! export getInatTaxonStats [provided] [used] [could be renamed] */
/*! export listenToInatRequests [provided] [used] [could be renamed] */
/*! other exports [not provided] [unused] */
/*! runtime requirements: __webpack_require__, __webpack_exports__, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "listenToInatRequests": () => /* binding */ listenToInatRequests,
/* harmony export */   "getInatSpecies": () => /* binding */ getInatSpecies,
/* harmony export */   "getInatPlaceId": () => /* binding */ getInatPlaceId,
/* harmony export */   "getInatTaxonStats": () => /* binding */ getInatTaxonStats,
/* harmony export */   "getHistogram": () => /* binding */ getHistogram,
/* harmony export */   "getAutocompleteBy": () => /* binding */ getAutocompleteBy
/* harmony export */ });
/* harmony import */ var ramda__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ramda */ "pWpQ");
/* harmony import */ var ramda__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ramda */ "CvH3");
/* harmony import */ var utils_utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! utils/utils */ "EHpu");
/* harmony import */ var api_firebase_firestore__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! api/firebase/firestore */ "xWjd");
/* harmony import */ var api_snapdragon_iconic_taxa__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! api/snapdragon/iconic-taxa */ "Bv5j");
function ownKeys(object, enumerableOnly) {
  var keys = Object.keys(object);

  if (Object.getOwnPropertySymbols) {
    var symbols = Object.getOwnPropertySymbols(object);
    if (enumerableOnly) symbols = symbols.filter(function (sym) {
      return Object.getOwnPropertyDescriptor(object, sym).enumerable;
    });
    keys.push.apply(keys, symbols);
  }

  return keys;
}

function _objectSpread(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i] != null ? arguments[i] : {};

    if (i % 2) {
      ownKeys(Object(source), true).forEach(function (key) {
        _defineProperty(target, key, source[key]);
      });
    } else if (Object.getOwnPropertyDescriptors) {
      Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
    } else {
      ownKeys(Object(source)).forEach(function (key) {
        Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
      });
    }
  }

  return target;
}

function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
}

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {
  try {
    var info = gen[key](arg);
    var value = info.value;
  } catch (error) {
    reject(error);
    return;
  }

  if (info.done) {
    resolve(value);
  } else {
    Promise.resolve(value).then(_next, _throw);
  }
}

function _asyncToGenerator(fn) {
  return function () {
    var self = this,
        args = arguments;
    return new Promise(function (resolve, reject) {
      var gen = fn.apply(self, args);

      function _next(value) {
        asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);
      }

      function _throw(err) {
        asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);
      }

      _next(undefined);
    });
  };
}





var inatListeners = [];
var RECORDS_PER_PAGE = 200;

var unsubscribe = function unsubscribe(listener) {
  inatListeners = inatListeners.filter(function (l) {
    return l !== listener;
  });
};

var listenToInatRequests = function listenToInatRequests(listener) {
  inatListeners.push(listener);
  return unsubscribe;
};

var getBasePath = function getBasePath(config) {
  var month = config.guide.season.type === 'all_year' ? '' : config.guide.season.observableMonths.map(function (month) {
    return month.index;
  }).join(',');
  var perPage = config.guide.perPage || RECORDS_PER_PAGE;
  var basePath = "https://api.inaturalist.org/v1/observations/species_counts?captive=false&rank=species&per_page=".concat(perPage, "&month=").concat(month);
  return basePath;
};

var getInatSpecies = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5(config) {
    var speciesNames, snapdragonSpeciesNames, iconicTaxaKeys, getIconicTaxa, getUserOrProjectKeyValuePair, getAllInatObservations, loadSpeciesInParallel, getInatObservations, observations;
    return regeneratorRuntime.wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            _context5.next = 2;
            return api_firebase_firestore__WEBPACK_IMPORTED_MODULE_1__.firestore.getSpeciesNames();

          case 2:
            speciesNames = _context5.sent;
            snapdragonSpeciesNames = speciesNames[0].value; //  snapLog('snapdragon species', snapdragonSpeciesNames);

            iconicTaxaKeys = Object.keys(api_snapdragon_iconic_taxa__WEBPACK_IMPORTED_MODULE_2__.iconicTaxa).join(',');

            getIconicTaxa = function getIconicTaxa(config) {
              try {
                var _iconicTaxa = config.guide.iconicTaxa.map(function (taxon) {
                  return taxon.id;
                }) || iconicTaxaKeys; // Create new taxonic group for reptilia, etc?


                if (_iconicTaxa.find(function (taxon) {
                  return taxon === 'mammalia';
                })) {
                  _iconicTaxa.push('reptilia');
                }

                var taxa = _iconicTaxa.map(function (taxon) {
                  if (taxon === 'lepidoptera') taxon = 'insecta';
                  return taxon;
                });

                return taxa;
              } catch (e) {
                logError('Error for getIconicTaxa: ', e);
              }
            };

            getUserOrProjectKeyValuePair = function getUserOrProjectKeyValuePair(config) {
              if (!config.guide.inatId) return '';
              var param = config.guide.inatId.param;
              var id = config.guide.inatId.id;
              var parameter = "&".concat(param, "=").concat(id);
              return id ? parameter : '';
            };

            getAllInatObservations = /*#__PURE__*/function () {
              var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(config, snapdragonSpeciesNames) {
                var snapdragonSpecies, records, keepGoing, page, recordsFromThisRequest, matches, noMoreRecords, recordsCountReached;
                return regeneratorRuntime.wrap(function _callee$(_context) {
                  while (1) {
                    switch (_context.prev = _context.next) {
                      case 0:
                        snapdragonSpecies = [];
                        records = [];
                        keepGoing = true;
                        page = 1;

                      case 4:
                        if (!keepGoing) {
                          _context.next = 30;
                          break;
                        }

                        _context.prev = 5;
                        _context.next = 8;
                        return getInatObservations(config, page);

                      case 8:
                        recordsFromThisRequest = _context.sent;
                        _context.next = 11;
                        return records.push.apply(records, recordsFromThisRequest);

                      case 11:
                        matches = recordsFromThisRequest.filter(function (record) {
                          return (0,ramda__WEBPACK_IMPORTED_MODULE_3__.default)(record.taxon.name, snapdragonSpeciesNames);
                        });
                        _context.next = 14;
                        return snapdragonSpecies.push.apply(snapdragonSpecies, matches);

                      case 14:
                        page = page + 1;
                        noMoreRecords = recordsFromThisRequest.length < RECORDS_PER_PAGE;
                        recordsCountReached = snapdragonSpecies.length >= config.guide.noOfRecords;
                        snapLog('snapdragonSpecies', snapdragonSpecies);
                        snapLog('records', records);

                        if (!(noMoreRecords || recordsCountReached)) {
                          _context.next = 22;
                          break;
                        }

                        keepGoing = false;
                        return _context.abrupt("return", snapdragonSpecies);

                      case 22:
                        _context.next = 28;
                        break;

                      case 24:
                        _context.prev = 24;
                        _context.t0 = _context["catch"](5);
                        logError('getInatObservations', _context.t0);
                        return _context.abrupt("return", snapdragonSpecies);

                      case 28:
                        _context.next = 4;
                        break;

                      case 30:
                      case "end":
                        return _context.stop();
                    }
                  }
                }, _callee, this, [[5, 24]]);
              }));

              return function getAllInatObservations(_x2, _x3) {
                return _ref2.apply(this, arguments);
              };
            }();

            loadSpeciesInParallel = /*#__PURE__*/function () {
              var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(observations) {
                return regeneratorRuntime.wrap(function _callee3$(_context3) {
                  while (1) {
                    switch (_context3.prev = _context3.next) {
                      case 0:
                        _context3.prev = 0;
                        return _context3.abrupt("return", Promise.all(observations.map(function (observation) {
                          return api_firebase_firestore__WEBPACK_IMPORTED_MODULE_1__.firestore.getSpeciesByName(observation.taxon.name).then( /*#__PURE__*/function () {
                            var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(item) {
                              return regeneratorRuntime.wrap(function _callee2$(_context2) {
                                while (1) {
                                  switch (_context2.prev = _context2.next) {
                                    case 0:
                                      _context2.next = 2;
                                      return _objectSpread(_objectSpread({}, item), {}, {
                                        observationCount: observation.taxon.observations_count,
                                        iconicTaxon: observation.taxon.iconic_taxon_name
                                      });

                                    case 2:
                                      return _context2.abrupt("return", _context2.sent);

                                    case 3:
                                    case "end":
                                      return _context2.stop();
                                  }
                                }
                              }, _callee2, this);
                            }));

                            return function (_x5) {
                              return _ref4.apply(this, arguments);
                            };
                          }());
                        })));

                      case 4:
                        _context3.prev = 4;
                        _context3.t0 = _context3["catch"](0);
                        logError('loadSpeciesInParallel: ', _context3.t0);

                      case 7:
                      case "end":
                        return _context3.stop();
                    }
                  }
                }, _callee3, this, [[0, 4]]);
              }));

              return function loadSpeciesInParallel(_x4) {
                return _ref3.apply(this, arguments);
              };
            }();

            getInatObservations = /*#__PURE__*/function () {
              var _ref5 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(config, page) {
                var lat, lng, placeId, radius, inat, _iconicTaxa2, params, url, recordsFromThisRequest, json;

                return regeneratorRuntime.wrap(function _callee4$(_context4) {
                  while (1) {
                    switch (_context4.prev = _context4.next) {
                      case 0:
                        _context4.prev = 0;
                        lat = '', lng = '', placeId = '';
                        radius = config.guide.speciesRange ? parseInt(config.guide.speciesRange) : 10;
                        inat = '';
                        _context4.t0 = config.guide.locationType;
                        _context4.next = _context4.t0 === 'place' ? 7 : _context4.t0 === 'longLat' ? 9 : _context4.t0 === 'inat' ? 12 : 18;
                        break;

                      case 7:
                        placeId = config.guide.place.id;
                        return _context4.abrupt("break", 18);

                      case 9:
                        lat = config.guide.coordinates.lat;
                        lng = config.guide.coordinates["long"];
                        return _context4.abrupt("break", 18);

                      case 12:
                        lat = '';
                        lng = '';
                        placeId = '';
                        radius = '';
                        inat = "&".concat(config.guide.inatId.param, "=").concat(config.guide.inatId.key);
                        return _context4.abrupt("break", 18);

                      case 18:
                        _iconicTaxa2 = getIconicTaxa(config);
                        params = config.guide.guideTpe === 'INAT' ? getUserOrProjectKeyValuePair(config) : '';
                        url = getBasePath(config) + "&page=".concat(page, "&iconic_taxa=").concat(_iconicTaxa2, "&place_id=").concat(placeId, "&lat=").concat(lat, "&lng=").concat(lng, "&radius=").concat(radius).concat(inat).concat(params);
                        snapLog('inat species request url', url);
                        _context4.next = 24;
                        return fetch(url);

                      case 24:
                        recordsFromThisRequest = _context4.sent;
                        snapLog('inat recordsFromThisRequest', recordsFromThisRequest);
                        _context4.next = 28;
                        return recordsFromThisRequest.json();

                      case 28:
                        json = _context4.sent;
                        inatListeners.forEach(function (listener) {
                          return listener({
                            page: json.page,
                            numberOfRequests: Math.ceil(json.total_results / json.RECORDS_per_page)
                          });
                        });

                        if (!json) {
                          _context4.next = 36;
                          break;
                        }

                        _context4.next = 33;
                        return json.results;

                      case 33:
                        _context4.t1 = _context4.sent;
                        _context4.next = 37;
                        break;

                      case 36:
                        _context4.t1 = [];

                      case 37:
                        return _context4.abrupt("return", _context4.t1);

                      case 40:
                        _context4.prev = 40;
                        _context4.t2 = _context4["catch"](0);
                        logError('getInatObservations', _context4.t2);
                        return _context4.abrupt("return", []);

                      case 44:
                      case "end":
                        return _context4.stop();
                    }
                  }
                }, _callee4, this, [[0, 40]]);
              }));

              return function getInatObservations(_x6, _x7) {
                return _ref5.apply(this, arguments);
              };
            }();

            _context5.prev = 10;
            _context5.next = 13;
            return getAllInatObservations(config, snapdragonSpeciesNames);

          case 13:
            observations = _context5.sent;
            observations = observations.filter(function (observation) {
              return (0,ramda__WEBPACK_IMPORTED_MODULE_3__.default)(observation.taxon.name, snapdragonSpeciesNames);
            });
            observations = (0,ramda__WEBPACK_IMPORTED_MODULE_4__.default)(config.guide.noOfRecords, utils_utils__WEBPACK_IMPORTED_MODULE_0__.utils.sortBy(observations.filter(function (item) {
              return item;
            }), 'observationCount', 'desc'));
            _context5.next = 21;
            break;

          case 18:
            _context5.prev = 18;
            _context5.t0 = _context5["catch"](10);
            logError('getAllInatObservations', _context5.t0);

          case 21:
            snapLog('observations', observations);

            if (observations) {
              _context5.next = 24;
              break;
            }

            return _context5.abrupt("return", []);

          case 24:
            _context5.next = 26;
            return loadSpeciesInParallel(observations);

          case 26:
            return _context5.abrupt("return", _context5.sent);

          case 27:
          case "end":
            return _context5.stop();
        }
      }
    }, _callee5, this, [[10, 18]]);
  }));

  return function getInatSpecies(_x) {
    return _ref.apply(this, arguments);
  };
}();
function getInatPlaceId(_x8) {
  return _getInatPlaceId.apply(this, arguments);
}

function _getInatPlaceId() {
  _getInatPlaceId = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee6(place) {
    var url, recordsFromThisRequest, json;
    return regeneratorRuntime.wrap(function _callee6$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            url = "https://api.inaturalist.org/v1/places/autocomplete?q=".concat(place);
            _context6.next = 3;
            return fetch(url);

          case 3:
            recordsFromThisRequest = _context6.sent;
            _context6.next = 6;
            return recordsFromThisRequest.json();

          case 6:
            json = _context6.sent;
            return _context6.abrupt("return", json);

          case 8:
          case "end":
            return _context6.stop();
        }
      }
    }, _callee6, this);
  }));
  return _getInatPlaceId.apply(this, arguments);
}

function getInatTaxonStats(_x9, _x10, _x11) {
  return _getInatTaxonStats.apply(this, arguments);
}

function _getInatTaxonStats() {
  _getInatTaxonStats = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee7(item, config, placeId) {
    var place, taxonName, url, recordsFromThisRequest, json;
    return regeneratorRuntime.wrap(function _callee7$(_context7) {
      while (1) {
        switch (_context7.prev = _context7.next) {
          case 0:
            place = placeId || 'any';
            taxonName = item.name;
            url = "https://api.inaturalist.org/v1/observations/species_counts?&verifiable=true&taxon_name=".concat(taxonName, "&place_id=").concat(place);
            _context7.next = 5;
            return fetch(url);

          case 5:
            recordsFromThisRequest = _context7.sent;
            _context7.next = 8;
            return recordsFromThisRequest.json();

          case 8:
            json = _context7.sent;
            return _context7.abrupt("return", json);

          case 10:
          case "end":
            return _context7.stop();
        }
      }
    }, _callee7, this);
  }));
  return _getInatTaxonStats.apply(this, arguments);
}

function getHistogram(_x12, _x13) {
  return _getHistogram.apply(this, arguments);
}

function _getHistogram() {
  _getHistogram = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee8(item, placeId) {
    var place, taxonName, url, recordsFromThisRequest, json;
    return regeneratorRuntime.wrap(function _callee8$(_context8) {
      while (1) {
        switch (_context8.prev = _context8.next) {
          case 0:
            place = placeId || 'any';
            taxonName = item.name;
            url = "https://api.inaturalist.org/v1/observations/histogram?taxon_name=".concat(taxonName, "&place_id=").concat(place);
            _context8.next = 5;
            return fetch(url);

          case 5:
            recordsFromThisRequest = _context8.sent;
            _context8.next = 8;
            return recordsFromThisRequest.json();

          case 8:
            json = _context8.sent;
            return _context8.abrupt("return", json);

          case 10:
          case "end":
            return _context8.stop();
        }
      }
    }, _callee8, this);
  }));
  return _getHistogram.apply(this, arguments);
}

function getAutocompleteBy(_x14, _x15) {
  return _getAutocompleteBy.apply(this, arguments);
} // https://www.inaturalist.org/observations/danielhartley.json?m1=1&m2=11&iconic_taxa[]=Fungi

function _getAutocompleteBy() {
  _getAutocompleteBy = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee9(q, by) {
    var url, recordsFromThisRequest, json;
    return regeneratorRuntime.wrap(function _callee9$(_context9) {
      while (1) {
        switch (_context9.prev = _context9.next) {
          case 0:
            // currently set up for USERS and PROJECTS but PLACES? Not sure
            // https://api.inaturalist.org/v1/places/autocomplete?q=O%20Parque%20Natural%20da%20Arr%C3%A1bida
            url = "https://api.inaturalist.org/v1/".concat(by, "/autocomplete?q=").concat(q);
            _context9.next = 3;
            return fetch(url);

          case 3:
            recordsFromThisRequest = _context9.sent;
            _context9.next = 6;
            return recordsFromThisRequest.json();

          case 6:
            json = _context9.sent;
            return _context9.abrupt("return", json);

          case 8:
          case "end":
            return _context9.stop();
        }
      }
    }, _callee9, this);
  }));
  return _getAutocompleteBy.apply(this, arguments);
}

/***/ }),

/***/ "Bv5j":
/*!*******************************************!*\
  !*** ./src/api/snapdragon/iconic-taxa.js ***!
  \*******************************************/
/*! namespace exports */
/*! export findRankByIconicTaxon [provided] [used] [could be renamed] */
/*! export iconicTaxa [provided] [used] [could be renamed] */
/*! export matchIcon [provided] [used] [could be renamed] */
/*! export matchRank [provided] [used] [could be renamed] */
/*! export matchTaxon [provided] [used] [could be renamed] */
/*! export matchTaxonKey [provided] [unused] [could be renamed] */
/*! other exports [not provided] [unused] */
/*! runtime requirements: __webpack_require__, __webpack_exports__, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "iconicTaxa": () => /* binding */ iconicTaxa,
/* harmony export */   "matchTaxon": () => /* binding */ matchTaxon,
/* harmony export */   "findRankByIconicTaxon": () => /* binding */ findRankByIconicTaxon,
/* harmony export */   "matchIcon": () => /* binding */ matchIcon,
/* harmony export */   "matchRank": () => /* binding */ matchRank
/* harmony export */ });
/* unused harmony export matchTaxonKey */
/* harmony import */ var ramda__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ramda */ "pWpQ");

var iconicTaxa = {
  // kingdom
  FUNGI: 'Fungi',
  PLANTAE: 'Plants',
  // phlyum
  // MOLLUSCA: 'Mollusks',
  // class
  AVES: 'Birds',
  AMPHIBIA: 'Amphibians',
  REPTILIA: 'Reptilians',
  MAMMALIA: 'Mammals',
  INSECTA: 'Insects',
  // ACTINOPTERYGII: 'Ray-finned fishes',
  ARACHNIDA: 'Arachnids',
  //order
  LEPIDOPTERA: 'Lepidoptera'
};
var matchTaxonKey = function matchTaxonKey(taxonomy, iconicTaxaKeys) {
  var taxon = {
    rank: '',
    value: ''
  };
  if (!taxonomy) return taxon;
  if (taxonomy.order && (0,ramda__WEBPACK_IMPORTED_MODULE_0__.default)(taxonomy.order.toLowerCase(), iconicTaxaKeys)) taxon = {
    rank: 'order',
    value: taxonomy.order.toLowerCase()
  };
  if (taxon.value === '' && taxonomy["class"] && (0,ramda__WEBPACK_IMPORTED_MODULE_0__.default)(taxonomy["class"].toLowerCase(), iconicTaxaKeys)) taxon = {
    rank: 'class',
    value: taxonomy["class"].toLowerCase()
  };
  if (taxon.value === '' && taxonomy.kingdom && (0,ramda__WEBPACK_IMPORTED_MODULE_0__.default)(taxonomy.kingdom.toLowerCase(), iconicTaxaKeys)) taxon = {
    rank: 'kingdom',
    value: taxonomy.kingdom.toLowerCase()
  };
  return taxon;
};
var matchTaxon = function matchTaxon(taxonomy, iconicTaxa) {
  if (!taxonomy) return false;
  var iconicTaxaKeys = Object.keys(iconicTaxa).map(function (key) {
    return key.toLowerCase();
  });
  var taxon = matchTaxonKey(taxonomy, iconicTaxaKeys);
  return taxon;
};
var findRankByIconicTaxon = function findRankByIconicTaxon(taxonomy, iconicTaxon) {
  return Object.keys(taxonomy).find(function (key) {
    return taxonomy[key].toLowerCase() === iconicTaxon.toLowerCase();
  });
};
var matchIcon = function matchIcon(taxonomy, iconicTaxa) {
  if (!taxonomy) return '';
  var rank = matchTaxon(taxonomy, iconicTaxa).value;
  if (!rank) return '';
  return matchRank(rank);
};
var matchRank = function matchRank(rank) {
  var icon;

  switch (rank.toLowerCase()) {
    case 'aves':
      icon = 'fas fa-dove';
      break;

    case 'lepidoptera':
      icon = 'fas fa-barcode';
      break;

    case 'amphibia':
      icon = 'fas fa-frog';
      break;

    case 'mammalia':
    case 'actinopterygii':
      icon = 'fas fa-paw';
      break;

    case 'reptilia':
      icon = 'fas fa-registered';
      break;

    case 'insecta':
    case 'arachnida':
      icon = 'fas fa-bug';
      break;

    case 'fungi':
      icon = './static/icons/mushroom.svg';
      break;

    case 'plantae':
      icon = 'fas fa-leaf';
      break;
  }

  return icon;
};

/***/ }),

/***/ "85yX":
/*!************************!*\
  !*** ./src/geo/geo.js ***!
  \************************/
/*! namespace exports */
/*! export GoogleAutocomplete [provided] [used] [could be renamed] */
/*! export GoogleAutocompleteServerSide [provided] [unused] [could be renamed] */
/*! export GoogleAutocomplete_Original [provided] [unused] [could be renamed] */
/*! export GoogleFindPlace [provided] [unused] [could be renamed] */
/*! export GooglePlaceDetails [provided] [used] [could be renamed] */
/*! export getIPLocation [provided] [used] [could be renamed] */
/*! export getLocation [provided] [unused] [could be renamed] */
/*! export getPlace [provided] [used] [could be renamed] */
/*! export listenToPlaceChange [provided] [unused] [could be renamed] */
/*! other exports [not provided] [unused] */
/*! runtime requirements: __webpack_require__, __webpack_exports__, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "getPlace": () => /* binding */ getPlace,
/* harmony export */   "getIPLocation": () => /* binding */ getIPLocation,
/* harmony export */   "GoogleAutocomplete": () => /* binding */ GoogleAutocomplete,
/* harmony export */   "GooglePlaceDetails": () => /* binding */ GooglePlaceDetails
/* harmony export */ });
/* unused harmony exports getLocation, listenToPlaceChange, GoogleFindPlace, GoogleAutocompleteServerSide, GoogleAutocomplete_Original */
/* harmony import */ var utils_utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! utils/utils */ "EHpu");
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {
  try {
    var info = gen[key](arg);
    var value = info.value;
  } catch (error) {
    reject(error);
    return;
  }

  if (info.done) {
    resolve(value);
  } else {
    Promise.resolve(value).then(_next, _throw);
  }
}

function _asyncToGenerator(fn) {
  return function () {
    var self = this,
        args = arguments;
    return new Promise(function (resolve, reject) {
      var gen = fn.apply(self, args);

      function _next(value) {
        asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);
      }

      function _throw(err) {
        asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);
      }

      _next(undefined);
    });
  };
}


var GOOGLE_ACCESS_KEY = "AIzaSyBOfPqa7imxqZ11enFBvH952B4a0oq5HOY";

var getHTML5Location = function getHTML5Location() {
  return new Promise(function (resolve, reject) {
    function success(position) {
      resolve([position.coords.latitude, position.coords.longitude]);
    }

    function error(e) {
      logError('getHTML5Location', e);
      resolve({
        '0': 0,
        '1': 0
      });
    }

    navigator.geolocation.getCurrentPosition(success, error);
  });
};

var getLocation = function getLocation(config) {
  if (!!config.coordinates && config.coordinates.lat && config.coordinates["long"]) {
    //  snapLog('geolocation config',config);
    return new Promise(function (resolve) {
      resolve(config.coordinates);
    });
  } else {
    //  snapLog('geolocation config', config);
    return getHTML5Location();
  }
};
var listeners = [];

var parseMapBoxPlace = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(json, config) {
    var place, locality, region, country, placePromise, updatedPlace;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return json;

          case 2:
            place = _context.sent;
            locality = place.features.find(function (f) {
              return f.place_type[0] === 'locality';
            });
            region = place.features.find(function (f) {
              return f.place_type[0] === 'region';
            });
            country = place.features.find(function (f) {
              return f.place_type[0] === 'country';
            });
            place.locality = locality ? locality.text : '';
            place.region = region ? region.text : '';
            place.country = country ? country.text : '';
            place.area = place.region || place.country;
            place.shortLocation = "".concat(place.locality, ", ").concat(place.country);
            place.longLocation = "".concat(place.locality, ", ").concat(place.region, ", ").concat(place.country);
            place.summary = config.isLandscapeMode ? "Species from ".concat(place.longLocation) : "Species from ".concat(place.shortLocation);
            placePromise = new Promise(function (resolve) {
              resolve(place);
            });
            _context.next = 16;
            return placePromise;

          case 16:
            updatedPlace = _context.sent;
            _context.next = 19;
            return updatedPlace;

          case 19:
            return _context.abrupt("return", _context.sent);

          case 20:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, this);
  }));

  return function parseMapBoxPlace(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

var getMapBoxPlace = /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(_long, lat, config) {
    var token, longitude, latitude, language, url, response, json, place;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            token = 'pk.eyJ1IjoiZGFuaGFydGxleSIsImEiOiJjam84Zjd3aGowMDdoM2ttaDAzeDk4bHJ6In0.oEcO6w3DhHUv_mXrFW1clg';
            longitude = _long; // || '-9.163009899999999';

            latitude = lat; // || '38.7155762';  

            language = config.language || 'en';
            url = "https://api.mapbox.com/geocoding/v5/mapbox.places/".concat(longitude, ",").concat(latitude, ".json?language=").concat(language, "&access_token=").concat(token);
            _context2.next = 7;
            return fetch(url);

          case 7:
            response = _context2.sent;
            _context2.next = 10;
            return response.json();

          case 10:
            json = _context2.sent;
            _context2.next = 13;
            return parseMapBoxPlace(json, config);

          case 13:
            place = _context2.sent;
            listeners.forEach(function (listener) {
              return listener(place);
            });
            _context2.next = 17;
            return place;

          case 17:
            return _context2.abrupt("return", _context2.sent);

          case 18:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, this);
  }));

  return function getMapBoxPlace(_x3, _x4, _x5) {
    return _ref2.apply(this, arguments);
  };
}();

var getPlace = /*#__PURE__*/function () {
  var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(config) {
    var force,
        response,
        json,
        coordinates,
        latitude,
        longitude,
        _args3 = arguments;
    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            force = _args3.length > 1 && _args3[1] !== undefined ? _args3[1] : false;

            if (!(!!config.place && !force)) {
              _context3.next = 11;
              break;
            }

            response = new Promise(function (resolve) {
              resolve(config.place);
            });
            _context3.next = 5;
            return response;

          case 5:
            json = _context3.sent;
            _context3.next = 8;
            return json;

          case 8:
            return _context3.abrupt("return", _context3.sent);

          case 11:
            _context3.next = 13;
            return getLocation(config);

          case 13:
            coordinates = _context3.sent;
            latitude = coordinates['0'] || coordinates.lat;
            longitude = coordinates['1'] || coordinates["long"];
            config.coordinates = {
              lat: latitude,
              "long": longitude
            };
            return _context3.abrupt("return", getMapBoxPlace(longitude, latitude, config));

          case 18:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3, this);
  }));

  return function getPlace(_x6) {
    return _ref3.apply(this, arguments);
  };
}();
var listenToPlaceChange = function listenToPlaceChange(listener) {
  listeners.push(listener);
};

var IPCountryLookup = /*#__PURE__*/(/* unused pure expression or super */ null && (function () {
  var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4() {
    var ACCESS_KEY, url, response, json, _yield$json, country_code, country_name;

    return regeneratorRuntime.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            ACCESS_KEY = '69402a39530c7ae8218dfaf69ef78337';
            url = "http://api.ipstack.com/check?access_key=".concat(ACCESS_KEY);
            _context4.prev = 2;
            _context4.next = 5;
            return fetch(url);

          case 5:
            response = _context4.sent;
            _context4.next = 8;
            return response.json();

          case 8:
            json = _context4.sent;
            _context4.next = 11;
            return json;

          case 11:
            _yield$json = _context4.sent;
            country_code = _yield$json.country_code;
            country_name = _yield$json.country_name;
            return _context4.abrupt("return", {
              country_code: country_code,
              country_name: country_name
            });

          case 17:
            _context4.prev = 17;
            _context4.t0 = _context4["catch"](2);
            console.warn("ERROR(".concat(err.code, "): ").concat(err.message));

          case 20:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4, this, [[2, 17]]);
  }));

  return function IPCountryLookup() {
    return _ref4.apply(this, arguments);
  };
}()));

var LocationLookup = /*#__PURE__*/function () {
  var _ref5 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5(ip) {
    var ACCESS_KEY, url, response, json, _yield$json2, city, state_prov, country_name, latitude, longitude;

    return regeneratorRuntime.wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            ACCESS_KEY = 'a8563e7b75654ae8b016dc52719dee3b';
            url = "https://api.ipgeolocation.io/ipgeo?apiKey=".concat(ACCESS_KEY, "&ip=").concat(ip, "&fields=city,state_prov,country_name,latitude,longitude&output=json");
            _context5.next = 4;
            return fetch(url);

          case 4:
            response = _context5.sent;
            _context5.next = 7;
            return response.json();

          case 7:
            json = _context5.sent;
            _context5.next = 10;
            return json;

          case 10:
            _yield$json2 = _context5.sent;
            city = _yield$json2.city;
            state_prov = _yield$json2.state_prov;
            country_name = _yield$json2.country_name;
            latitude = _yield$json2.latitude;
            longitude = _yield$json2.longitude;
            return _context5.abrupt("return", {
              city: city,
              state_prov: state_prov,
              country_name: country_name,
              latitude: latitude,
              longitude: longitude
            });

          case 17:
          case "end":
            return _context5.stop();
        }
      }
    }, _callee5, this);
  }));

  return function LocationLookup(_x7) {
    return _ref5.apply(this, arguments);
  };
}();

var IPLookup = /*#__PURE__*/function () {
  var _ref6 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee6() {
    var url, response, json, _yield$json3, ip;

    return regeneratorRuntime.wrap(function _callee6$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            url = 'https://api.ipgeolocation.io/getip';
            _context6.next = 3;
            return fetch(url);

          case 3:
            response = _context6.sent;
            _context6.next = 6;
            return response.json();

          case 6:
            json = _context6.sent;
            _context6.next = 9;
            return json;

          case 9:
            _yield$json3 = _context6.sent;
            ip = _yield$json3.ip;
            return _context6.abrupt("return", ip);

          case 12:
          case "end":
            return _context6.stop();
        }
      }
    }, _callee6, this);
  }));

  return function IPLookup() {
    return _ref6.apply(this, arguments);
  };
}();

var getIPLocation = /*#__PURE__*/function () {
  var _ref7 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee7(config) {
    var force,
        response,
        json,
        ip,
        _yield$LocationLookup,
        city,
        state_prov,
        country_name,
        latitude,
        longitude,
        _args7 = arguments;

    return regeneratorRuntime.wrap(function _callee7$(_context7) {
      while (1) {
        switch (_context7.prev = _context7.next) {
          case 0:
            force = _args7.length > 1 && _args7[1] !== undefined ? _args7[1] : false;

            if (!(!!config.ipLocation && !force)) {
              _context7.next = 11;
              break;
            }

            response = new Promise(function (resolve) {
              resolve(config.ipLocation);
            });
            _context7.next = 5;
            return response;

          case 5:
            json = _context7.sent;
            _context7.next = 8;
            return json;

          case 8:
            return _context7.abrupt("return", _context7.sent);

          case 11:
            _context7.next = 13;
            return IPLookup();

          case 13:
            ip = _context7.sent;
            _context7.next = 16;
            return LocationLookup(ip);

          case 16:
            _yield$LocationLookup = _context7.sent;
            city = _yield$LocationLookup.city;
            state_prov = _yield$LocationLookup.state_prov;
            country_name = _yield$LocationLookup.country_name;
            latitude = _yield$LocationLookup.latitude;
            longitude = _yield$LocationLookup.longitude;
            return _context7.abrupt("return", {
              city: city,
              state_prov: state_prov,
              country_name: country_name,
              latitude: latitude,
              longitude: longitude
            });

          case 23:
          case "end":
            return _context7.stop();
        }
      }
    }, _callee7, this);
  }));

  return function getIPLocation(_x8) {
    return _ref7.apply(this, arguments);
  };
}();
function GoogleFindPlace(_x9) {
  return _GoogleFindPlace.apply(this, arguments);
}

function _GoogleFindPlace() {
  _GoogleFindPlace = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee8(place) {
    var url, response, json, _yield$json4, candidates;

    return regeneratorRuntime.wrap(function _callee8$(_context8) {
      while (1) {
        switch (_context8.prev = _context8.next) {
          case 0:
            // https://developers.google.com/places/web-service/search
            url = "https://maps.googleapis.com/maps/api/place/findplacefromtext/json?input=".concat(place, "&inputtype=textquery&key=").concat(GOOGLE_ACCESS_KEY, "&fields=name");
            _context8.next = 3;
            return fetch(url);

          case 3:
            response = _context8.sent;
            _context8.next = 6;
            return response.json();

          case 6:
            json = _context8.sent;
            _context8.next = 9;
            return json;

          case 9:
            _yield$json4 = _context8.sent;
            candidates = _yield$json4.candidates;
            return _context8.abrupt("return", candidates);

          case 12:
          case "end":
            return _context8.stop();
        }
      }
    }, _callee8, this);
  }));
  return _GoogleFindPlace.apply(this, arguments);
}

var service;
var requireNewSession = true;
var isScriptReady = false;
var SESSION_TOKEN;
var current_term = '';
function GoogleAutocompleteServerSide(_x10) {
  return _GoogleAutocompleteServerSide.apply(this, arguments);
}

function _GoogleAutocompleteServerSide() {
  _GoogleAutocompleteServerSide = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee9(place) {
    var url, response, json, _yield$json5, predictions;

    return regeneratorRuntime.wrap(function _callee9$(_context9) {
      while (1) {
        switch (_context9.prev = _context9.next) {
          case 0:
            // https://developers.google.com/places/web-service/search
            url = "https://maps.googleapis.com/maps/api/place/autocomplete/json?input=".concat(place, "&inputtype=textquery&key=").concat(GOOGLE_ACCESS_KEY, "&fields=name");
            _context9.next = 3;
            return fetch(url);

          case 3:
            response = _context9.sent;
            _context9.next = 6;
            return response.json();

          case 6:
            json = _context9.sent;
            _context9.next = 9;
            return json;

          case 9:
            _yield$json5 = _context9.sent;
            predictions = _yield$json5.predictions;
            return _context9.abrupt("return", predictions);

          case 12:
          case "end":
            return _context9.stop();
        }
      }
    }, _callee9, this);
  }));
  return _GoogleAutocompleteServerSide.apply(this, arguments);
}

var createScriptRequest = function createScriptRequest(src, callback) {
  requireNewSession = false;
  var script = document.createElement("script");
  script.type = "text/javascript";
  script.src = src;
  document.body.appendChild(script);
  script.addEventListener("load", function () {
    isScriptReady = true;
    callback();
  });
};

var GoogleAutocomplete_Original = function GoogleAutocomplete_Original(place, callback) {
  var getPredictions = function getPredictions() {
    if (!isScriptReady) return;

    var displaySuggestions = function displaySuggestions(predictions, status) {
      if (status != google.maps.places.PlacesServiceStatus.OK) {
        alert(status);
        return;
      }

      callback(predictions);
    };

    if (!service) {
      service = new google.maps.places.AutocompleteService();
    }

    service.getPlacePredictions({
      input: place
    }, displaySuggestions);
  };

  if (requireNewSession) {
    var _SESSION_TOKEN = utils.createSessionToken();

    var src = "https://maps.googleapis.com/maps/api/js?key=".concat(GOOGLE_ACCESS_KEY, "&sessiontoken=").concat(_SESSION_TOKEN, "&libraries=places");
    createScriptRequest(src, function () {
      getPredictions();
    });
  } else {
    getPredictions();
  }
};
var GoogleAutocomplete = function GoogleAutocomplete(place, callback) {
  var getPredictions = function getPredictions(SESSION_TOKEN) {
    if (!service) {
      service = new google.maps.places.AutocompleteService();
    }

    service.getPlacePredictions({
      input: place // sessionToken: SESSION_TOKEN

    }, callback);
  };

  if (requireNewSession) {
    SESSION_TOKEN = new google.maps.places.AutocompleteSessionToken();
    getPredictions(SESSION_TOKEN);
    current_term = place;
    requireNewSession = false; //or on expires/error, get a new one
  } else {
    if (place !== current_term) {
      getPredictions(SESSION_TOKEN);
    }

    current_term = place;
  }
};
var GooglePlaceDetails = function GooglePlaceDetails(placeId, callback) {
  var request = {
    placeId: placeId // sessionToken: SESSION_TOKEN

  };
  var service = new google.maps.Geocoder();
  service.geocode(request, callback);
  requireNewSession = true;
};

/***/ }),

/***/ "NKFH":
/*!*******************************************!*\
  !*** ./src/redux/actions/action-types.js ***!
  \*******************************************/
/*! namespace exports */
/*! export types [provided] [used] [could be renamed] */
/*! other exports [not provided] [unused] */
/*! runtime requirements: __webpack_exports__, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "types": () => /* binding */ types
/* harmony export */ });
var UPDATE_CONFIG = '[UPDATE_CONFIG] change to config';
var STOP_START_LESSON = '[STOP_START_LESSON] Pause or play current lesson';
var CHANGE_LESSON_PLANS = '[CHANGE_LESSON_PLANS] Edit the set of lesson plans';
var CHANGE_LESSON_PLAN = '[CHANGE_LESSON_PLAN] Edit the original lesson plan';
var SELECT_COLLECTION = '[SELECT_COLLECTION] Update the current selected collection';
var NEXT_ROUND = '[NEXT_ROUND] Go to next round';
var NEXT_LESSON = '[NEXT_LESSON] Get (new) lesson plan';
var NEXT_LAYOUT = '[NEXT_LAYOUT] Render next layout';
var NEXT_ITEM = '[NEXT_ITEM] Get next item';
var SAVE_USER_PROGRESS = '[SAVE_USER_PROGRESS] New collection';
var UPDATE_COLLECTION = '[UPDATE_COLLECTION] Change collection';
var UPDATE_COLLECTIONS = '[UPDATE_COLLECTIONS] Update collections list';
var RESET_COLLECTION = '[RESET_COLLECTION] Reset collection to initial state';
var UPDATE_SCORE = '[UPDATE_SCORE] Check user answer and update running score';
var UPDATE_TRAIT_SCORE = '[UPDATE_TRAIT_SCORE] Check user answer and update running score';
var END_REVISION = '[END_REVISION] Revision complete';
var UPDATE_HISTORY = '[UPDATE_HISTORY] Copy round score to history';
var UPDATE_COLLECTION_ITEMS = '[UPDATE_COLLECTION_ITEMS] Change collection items';
var NEXT_LEVEL = '[NEXT_LEVEL] Go to next level';
var UPDATE_LANGUAGE = '[UPDATE_LANGUAGE] Update the current language';
var UPDATE_UNITS = '[UPDATE_UNITS] Update units by config language';
var UPDATE_USER = '[UPDATE_USER] Update user';
var UPDATE_LESSON = '[UPDATE_LESSON] Create new lesson';
var SAVE_LESSON = '[SAVE_LESSON] Add lesson to saved lessons';
var REMOVE_LESSON = '[REMOVE_LESSON] Remove lesson from saved lessons on restarting lesson';
var UPDATE_VIDEO_PLAYER = '[UPDATE_VIDEO_PLAYER] Update video player state';
var UPDATE_QUICKFIRE = '[UPDATE_QUICKFIRE] Update quick-fire';
var CREATE_QUICKFIRE = '[CREATE_QUICKFIRE] Add quick-fire';
var CREATE_GLOSSARY = '[CREATE_GLOSSARY] Add glossary';
var CLICK_EVENT = '[CLICK_EVENT] User triggered event';
var UPDATE_DECK = '[UPDATE_DECK] Update deck';
var UPDATE_DECKS = '[UPDATE_DECKS] Update decks';
var NEXT_DECK = '[NEXT_DECK] Get next deck';
var NEXT_CARD = '[NEXT_CARD] Get next card';
var UPDATE_DECK_STATE = '[UPDATE_DECK_STATE] Update deck state';
var UPDATE_DECK_SCORE = '[UPDATE_DECK_SCORE] Update deck score';
var UPDATE_DECK_SCORE_HISTORY = '[UPDATE_DECK_SCORE_HISTORY] Update deck score history';
var UPDATE_DECK_SETTINGS = '[UPDATE_DECK_SETTINGS] Update deck settings';
var CLEAR_DECK_SCORE_HISTORY = '[CLEAR_DECK_SCORE_HISTORY] clear deck score history';
var types = {
  CHANGE_LESSON_PLANS: CHANGE_LESSON_PLANS,
  CHANGE_LESSON_PLAN: CHANGE_LESSON_PLAN,
  NEXT_LESSON: NEXT_LESSON,
  NEXT_LAYOUT: NEXT_LAYOUT,
  NEXT_ITEM: NEXT_ITEM,
  UPDATE_SCORE: UPDATE_SCORE,
  UPDATE_TRAIT_SCORE: UPDATE_TRAIT_SCORE,
  END_REVISION: END_REVISION,
  UPDATE_HISTORY: UPDATE_HISTORY,
  SAVE_USER_PROGRESS: SAVE_USER_PROGRESS,
  UPDATE_COLLECTION: UPDATE_COLLECTION,
  UPDATE_COLLECTION_ITEMS: UPDATE_COLLECTION_ITEMS,
  UPDATE_COLLECTIONS: UPDATE_COLLECTIONS,
  RESET_COLLECTION: RESET_COLLECTION,
  NEXT_ROUND: NEXT_ROUND,
  NEXT_LEVEL: NEXT_LEVEL,
  UPDATE_CONFIG: UPDATE_CONFIG,
  STOP_START_LESSON: STOP_START_LESSON,
  SELECT_COLLECTION: SELECT_COLLECTION,
  UPDATE_LANGUAGE: UPDATE_LANGUAGE,
  UPDATE_UNITS: UPDATE_UNITS,
  UPDATE_LESSON: UPDATE_LESSON,
  SAVE_LESSON: SAVE_LESSON,
  REMOVE_LESSON: REMOVE_LESSON,
  UPDATE_VIDEO_PLAYER: UPDATE_VIDEO_PLAYER,
  UPDATE_USER: UPDATE_USER,
  CREATE_QUICKFIRE: CREATE_QUICKFIRE,
  UPDATE_QUICKFIRE: UPDATE_QUICKFIRE,
  CREATE_GLOSSARY: CREATE_GLOSSARY,
  CLICK_EVENT: CLICK_EVENT,
  UPDATE_DECKS: UPDATE_DECKS,
  UPDATE_DECK: UPDATE_DECK,
  NEXT_DECK: NEXT_DECK,
  NEXT_CARD: NEXT_CARD,
  UPDATE_DECK_STATE: UPDATE_DECK_STATE,
  UPDATE_DECK_SCORE: UPDATE_DECK_SCORE,
  UPDATE_DECK_SCORE_HISTORY: UPDATE_DECK_SCORE_HISTORY,
  UPDATE_DECK_SETTINGS: UPDATE_DECK_SETTINGS,
  CLEAR_DECK_SCORE_HISTORY: CLEAR_DECK_SCORE_HISTORY
};

/***/ }),

/***/ "l/cg":
/*!****************************************!*\
  !*** ./src/redux/middleware/logger.js ***!
  \****************************************/
/*! namespace exports */
/*! export logger [provided] [used] [could be renamed] */
/*! other exports [not provided] [unused] */
/*! runtime requirements: __webpack_exports__, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "logger": () => /* binding */ logger
/* harmony export */ });
var logger = function logger(store) {
  return function (next) {
    return function (action) {
      // console.log('NEXT: ', next);
      // console.group(action.type)
      // console.info('dispatching', action)
      var result = next(action); // console.log('next state', store.getState())
      // console.groupEnd(action.type)
      // console.clear();
      // console.log(`^^^ ${action.type}`);

      return result;
    };
  };
};

/***/ }),

/***/ "C2Nx":
/*!**************************************************!*\
  !*** ./src/redux/middleware/timeoutScheduler.js ***!
  \**************************************************/
/*! namespace exports */
/*! export timeoutScheduler [provided] [unused] [could be renamed] */
/*! other exports [not provided] [unused] */
/*! runtime requirements: __webpack_exports__, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* unused harmony export timeoutScheduler */
/**
 * Schedules actions with { meta: { delay: N } } to be delayed by N milliseconds.
 * Makes `dispatch` return a function to cancel the timeout in this case.
 */
var timeoutScheduler = function timeoutScheduler(store) {
  return function (next) {
    return function (action) {
      if (!action.meta || !action.meta.delay) {
        return next(action);
      }

      if (store.getState().item === null) return next(action);
      var timeoutId = setTimeout(function () {
        next(action);
      }, action.meta.delay);
      return function cancel() {
        clearTimeout(timeoutId);
      };
    };
  };
};

/***/ }),

/***/ "4/zu":
/*!**********************************************!*\
  !*** ./src/redux/reducers/config-reducer.js ***!
  \**********************************************/
/*! namespace exports */
/*! export config [provided] [used] [could be renamed] */
/*! export units [provided] [used] [could be renamed] */
/*! export user [provided] [used] [could be renamed] */
/*! export userAction [provided] [used] [could be renamed] */
/*! other exports [not provided] [unused] */
/*! runtime requirements: __webpack_require__, __webpack_exports__, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "config": () => /* binding */ config,
/* harmony export */   "units": () => /* binding */ units,
/* harmony export */   "user": () => /* binding */ user,
/* harmony export */   "userAction": () => /* binding */ userAction
/* harmony export */ });
/* harmony import */ var redux_actions_action_types__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! redux/actions/action-types */ "NKFH");
/* harmony import */ var snapdragon_config_lesson_config__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! snapdragon-config/lesson-config */ "EpxB");
function ownKeys(object, enumerableOnly) {
  var keys = Object.keys(object);

  if (Object.getOwnPropertySymbols) {
    var symbols = Object.getOwnPropertySymbols(object);
    if (enumerableOnly) symbols = symbols.filter(function (sym) {
      return Object.getOwnPropertyDescriptor(object, sym).enumerable;
    });
    keys.push.apply(keys, symbols);
  }

  return keys;
}

function _objectSpread(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i] != null ? arguments[i] : {};

    if (i % 2) {
      ownKeys(Object(source), true).forEach(function (key) {
        _defineProperty(target, key, source[key]);
      });
    } else if (Object.getOwnPropertyDescriptors) {
      Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
    } else {
      ownKeys(Object(source)).forEach(function (key) {
        Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
      });
    }
  }

  return target;
}

function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
}



var config = function config() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : snapdragon_config_lesson_config__WEBPACK_IMPORTED_MODULE_1__.config;
  var action = arguments.length > 1 ? arguments[1] : undefined;

  switch (action.type) {
    case redux_actions_action_types__WEBPACK_IMPORTED_MODULE_0__.types.UPDATE_COLLECTION:
      return _objectSpread(_objectSpread(_objectSpread({}, action.data.config), {
        coordinates: state.coordinates
      }), {
        place: state.place
      });

    case redux_actions_action_types__WEBPACK_IMPORTED_MODULE_0__.types.UPDATE_CONFIG:
      return _objectSpread(_objectSpread({}, state), action.data);

    case redux_actions_action_types__WEBPACK_IMPORTED_MODULE_0__.types.UPDATE_LANGUAGE:
      return _objectSpread(_objectSpread({}, state), {
        language: action.data.lang
      });

    case redux_actions_action_types__WEBPACK_IMPORTED_MODULE_0__.types.SAVE_USER_PROGRESS:
      return _objectSpread(_objectSpread({}, state), action.data.lesson.config);

    default:
      return state;
  }
};
var units = function units() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var action = arguments.length > 1 ? arguments[1] : undefined;

  switch (action.type) {
    case redux_actions_action_types__WEBPACK_IMPORTED_MODULE_0__.types.UPDATE_UNITS:
      return action.data;

    default:
      return state;
  }
};
var user = function user() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
  var action = arguments.length > 1 ? arguments[1] : undefined;

  switch (action.type) {
    case redux_actions_action_types__WEBPACK_IMPORTED_MODULE_0__.types.UPDATE_USER:
      return action.data;

    default:
      return state;
  }
};
var userAction = function userAction() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
  var action = arguments.length > 1 ? arguments[1] : undefined;

  switch (action.type) {
    case redux_actions_action_types__WEBPACK_IMPORTED_MODULE_0__.types.CLICK_EVENT:
      return action.data;

    default:
      return state;
  }
};

/***/ }),

/***/ "PNxz":
/*!*********************************************!*\
  !*** ./src/redux/reducers/deck-reducers.js ***!
  \*********************************************/
/*! namespace exports */
/*! export deck [provided] [used] [could be renamed] */
/*! export deckScore [provided] [used] [could be renamed] */
/*! export deckScoreHistory [provided] [used] [could be renamed] */
/*! export deckSettings [provided] [used] [could be renamed] */
/*! export deckState [provided] [used] [could be renamed] */
/*! export decks [provided] [used] [could be renamed] */
/*! other exports [not provided] [unused] */
/*! runtime requirements: __webpack_require__, __webpack_exports__, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "decks": () => /* binding */ decks,
/* harmony export */   "deck": () => /* binding */ deck,
/* harmony export */   "deckState": () => /* binding */ deckState,
/* harmony export */   "deckScore": () => /* binding */ deckScore,
/* harmony export */   "deckScoreHistory": () => /* binding */ deckScoreHistory,
/* harmony export */   "deckSettings": () => /* binding */ deckSettings
/* harmony export */ });
/* harmony import */ var ui_helpers_enum_helper__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ui/helpers/enum-helper */ "DXx0");
/* harmony import */ var ramda__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ramda */ "kGug");
/* harmony import */ var redux_actions_action_types__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! redux/actions/action-types */ "NKFH");
function ownKeys(object, enumerableOnly) {
  var keys = Object.keys(object);

  if (Object.getOwnPropertySymbols) {
    var symbols = Object.getOwnPropertySymbols(object);
    if (enumerableOnly) symbols = symbols.filter(function (sym) {
      return Object.getOwnPropertyDescriptor(object, sym).enumerable;
    });
    keys.push.apply(keys, symbols);
  }

  return keys;
}

function _objectSpread(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i] != null ? arguments[i] : {};

    if (i % 2) {
      ownKeys(Object(source), true).forEach(function (key) {
        _defineProperty(target, key, source[key]);
      });
    } else if (Object.getOwnPropertyDescriptors) {
      Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
    } else {
      ownKeys(Object(source)).forEach(function (key) {
        Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
      });
    }
  }

  return target;
}

function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
}




var decks = function decks() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [{
    name: 'random change',
    count: 0
  }];
  var action = arguments.length > 1 ? arguments[1] : undefined;

  switch (action.type) {
    case redux_actions_action_types__WEBPACK_IMPORTED_MODULE_1__.types.UPDATE_DECKS:
      return action.data;

    case redux_actions_action_types__WEBPACK_IMPORTED_MODULE_1__.types.NEXT_DECK:
      return state;

    default:
      return state;
  }
};
var deck = function deck() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var action = arguments.length > 1 ? arguments[1] : undefined;

  switch (action.type) {
    case redux_actions_action_types__WEBPACK_IMPORTED_MODULE_1__.types.UPDATE_DECK:
      return action.data;

    case redux_actions_action_types__WEBPACK_IMPORTED_MODULE_1__.types.NEXT_CARD:
      var _deck = (0,ramda__WEBPACK_IMPORTED_MODULE_2__.default)(state);

      var currentCard = _deck.cards.find(function (c) {
        return c.isCurrent;
      });

      if (currentCard) delete currentCard.isCurrent;
      _deck.cards[action.data.index].isCurrent = true;
      return _deck;

    default:
      return state;
  }
};
var deckState = function deckState() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : ui_helpers_enum_helper__WEBPACK_IMPORTED_MODULE_0__.enums.deckState.BEGIN;
  var action = arguments.length > 1 ? arguments[1] : undefined;

  switch (action.type) {
    case 'persist/REHYDRATE':
      {
        return {};
      }

    case redux_actions_action_types__WEBPACK_IMPORTED_MODULE_1__.types.UPDATE_DECK_STATE:
      return action.data;

    case redux_actions_action_types__WEBPACK_IMPORTED_MODULE_1__.types.NEXT_CARD:
      return ui_helpers_enum_helper__WEBPACK_IMPORTED_MODULE_0__.enums.deckState.SCORE;

    case redux_actions_action_types__WEBPACK_IMPORTED_MODULE_1__.types.UPDATE_DECK_SCORE_HISTORY:
      return ui_helpers_enum_helper__WEBPACK_IMPORTED_MODULE_0__.enums.deckState.END;

    default:
      return state;
  }
};
var deckScore = function deckScore() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {
    total: 0,
    correct: 0,
    incorrect: 0
  };
  var action = arguments.length > 1 ? arguments[1] : undefined;

  switch (action.type) {
    case redux_actions_action_types__WEBPACK_IMPORTED_MODULE_1__.types.UPDATE_DECK_SCORE:
      return action.data;

    case redux_actions_action_types__WEBPACK_IMPORTED_MODULE_1__.types.UPDATE_DECK_STATE:
      console.log(action.data); //enums.deckState.BEGIN

      return {
        total: 0,
        correct: 0,
        incorrect: 0
      };

    default:
      return state;
  }
};
var deckScoreHistory = function deckScoreHistory() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {
    total: 0,
    correct: 0,
    incorrect: 0
  };
  var action = arguments.length > 1 ? arguments[1] : undefined;

  switch (action.type) {
    case redux_actions_action_types__WEBPACK_IMPORTED_MODULE_1__.types.UPDATE_DECK_SCORE_HISTORY:
      var score = action.data;
      return {
        total: state.total + score.total,
        correct: state.correct + score.correct,
        incorrect: state.incorrect + score.incorrect
      };

    case redux_actions_action_types__WEBPACK_IMPORTED_MODULE_1__.types.CLEAR_DECK_SCORE_HISTORY:
      return {
        total: 0,
        correct: 0,
        incorrect: 0
      };

    default:
      return state;
  }
};
var deckSettings = function deckSettings() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {
    name: 'vernacular',
    language: 'en'
  };
  var action = arguments.length > 1 ? arguments[1] : undefined;

  switch (action.type) {
    case redux_actions_action_types__WEBPACK_IMPORTED_MODULE_1__.types.UPDATE_DECK_SETTINGS:
      var name = action.data.name || state.name;
      var language = action.data.language || state.language;
      return _objectSpread(_objectSpread({}, state), {}, {
        name: name,
        language: language
      });

    default:
      return state;
  }
};

/***/ }),

/***/ "+Q6R":
/*!********************************************************************!*\
  !*** ./src/redux/reducers/initial-state/initial-progress-state.js ***!
  \********************************************************************/
/*! namespace exports */
/*! export progressState [provided] [used] [could be renamed] */
/*! other exports [not provided] [unused] */
/*! runtime requirements: __webpack_exports__, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "progressState": () => /* binding */ progressState
/* harmony export */ });
var resetScore = function resetScore() {
  var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
      _ref$total = _ref.total,
      total = _ref$total === void 0 ? 0 : _ref$total,
      _ref$correct = _ref.correct,
      correct = _ref$correct === void 0 ? 0 : _ref$correct,
      _ref$taxon = _ref.taxon,
      taxon = _ref$taxon === void 0 ? '' : _ref$taxon,
      _ref$binomial = _ref.binomial,
      binomial = _ref$binomial === void 0 ? '' : _ref$binomial,
      _ref$answer = _ref.answer,
      answer = _ref$answer === void 0 ? '' : _ref$answer,
      _ref$success = _ref.success,
      success = _ref$success === void 0 ? false : _ref$success,
      _ref$incorrect = _ref.incorrect,
      incorrect = _ref$incorrect === void 0 ? 0 : _ref$incorrect,
      _ref$question = _ref.question,
      question = _ref$question === void 0 ? '' : _ref$question,
      _ref$fails = _ref.fails,
      fails = _ref$fails === void 0 ? [] : _ref$fails,
      _ref$passes = _ref.passes,
      passes = _ref$passes === void 0 ? [] : _ref$passes,
      _ref$answers = _ref.answers,
      answers = _ref$answers === void 0 ? [] : _ref$answers,
      _ref$statement = _ref.statement,
      statement = _ref$statement === void 0 ? '' : _ref$statement,
      _ref$mode = _ref.mode,
      mode = _ref$mode === void 0 ? '' : _ref$mode,
      _ref$totalPassPoints = _ref.totalPassPoints,
      totalPassPoints = _ref$totalPassPoints === void 0 ? 0 : _ref$totalPassPoints,
      _ref$totalPoints = _ref.totalPoints,
      totalPoints = _ref$totalPoints === void 0 ? 0 : _ref$totalPoints;

  return {
    total: total,
    correct: correct,
    taxon: taxon,
    binomial: binomial,
    answer: answer,
    success: success,
    incorrect: incorrect,
    question: question,
    fails: fails,
    passes: passes,
    answers: answers,
    statement: statement,
    mode: mode,
    totalPassPoints: totalPassPoints,
    totalPoints: totalPoints
  };
};

var progressState = {
  score: resetScore(),
  resetScore: resetScore
};

/***/ }),

/***/ "U0OL":
/*!***********************************************!*\
  !*** ./src/redux/reducers/layout-reducers.js ***!
  \***********************************************/
/*! namespace exports */
/*! export layout [provided] [used] [could be renamed] */
/*! export lessonPlan [provided] [used] [could be renamed] */
/*! export lessonPlans [provided] [used] [could be renamed] */
/*! other exports [not provided] [unused] */
/*! runtime requirements: __webpack_require__, __webpack_exports__, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "lessonPlans": () => /* binding */ lessonPlans,
/* harmony export */   "lessonPlan": () => /* binding */ lessonPlan,
/* harmony export */   "layout": () => /* binding */ layout
/* harmony export */ });
/* harmony import */ var redux_actions_action_types__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! redux/actions/action-types */ "NKFH");

var lessonPlans = function lessonPlans() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
  var action = arguments.length > 1 ? arguments[1] : undefined;

  switch (action.type) {
    case redux_actions_action_types__WEBPACK_IMPORTED_MODULE_0__.types.CHANGE_LESSON_PLANS:
      return action.data;

    default:
      return state;
  }
};
var lessonPlan = function lessonPlan() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
  var action = arguments.length > 1 ? arguments[1] : undefined;

  switch (action.type) {
    case redux_actions_action_types__WEBPACK_IMPORTED_MODULE_0__.types.CHANGE_LESSON_PLAN:
      return action.data || state;

    case redux_actions_action_types__WEBPACK_IMPORTED_MODULE_0__.types.NEXT_LESSON:
      return action.data.lessonPlan || state;

    case redux_actions_action_types__WEBPACK_IMPORTED_MODULE_0__.types.SAVE_USER_PROGRESS:
      return action.data.lesson.lessonPlan || state;

    default:
      return state;
  }
};
var layout = function layout() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
  var action = arguments.length > 1 ? arguments[1] : undefined;

  switch (action.type) {
    case redux_actions_action_types__WEBPACK_IMPORTED_MODULE_0__.types.NEXT_LAYOUT:
      if (state) {
        if (action.data.screens.length > 1) {
          // sometimes BUG here
          return action.data;
        } else {
          return action.data;
        }
      } else {
        return action.data;
      }

    case redux_actions_action_types__WEBPACK_IMPORTED_MODULE_0__.types.SAVE_USER_PROGRESS:
      return action.data.lesson.layout || state;

    default:
      return state;
  }
};

/***/ }),

/***/ "srSX":
/*!***********************************************!*\
  !*** ./src/redux/reducers/lesson-reducers.js ***!
  \***********************************************/
/*! namespace exports */
/*! export lesson [provided] [used] [could be renamed] */
/*! export lessons [provided] [used] [could be renamed] */
/*! other exports [not provided] [unused] */
/*! runtime requirements: __webpack_require__, __webpack_exports__, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "lesson": () => /* binding */ lesson,
/* harmony export */   "lessons": () => /* binding */ lessons
/* harmony export */ });
/* harmony import */ var ramda__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ramda */ "pWpQ");
/* harmony import */ var redux_actions_action_types__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! redux/actions/action-types */ "NKFH");
function _toConsumableArray(arr) {
  return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread();
}

function _nonIterableSpread() {
  throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}

function _unsupportedIterableToArray(o, minLen) {
  if (!o) return;
  if (typeof o === "string") return _arrayLikeToArray(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor) n = o.constructor.name;
  if (n === "Map" || n === "Set") return Array.from(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
}

function _iterableToArray(iter) {
  if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter);
}

function _arrayWithoutHoles(arr) {
  if (Array.isArray(arr)) return _arrayLikeToArray(arr);
}

function _arrayLikeToArray(arr, len) {
  if (len == null || len > arr.length) len = arr.length;

  for (var i = 0, arr2 = new Array(len); i < len; i++) {
    arr2[i] = arr[i];
  }

  return arr2;
}

function ownKeys(object, enumerableOnly) {
  var keys = Object.keys(object);

  if (Object.getOwnPropertySymbols) {
    var symbols = Object.getOwnPropertySymbols(object);
    if (enumerableOnly) symbols = symbols.filter(function (sym) {
      return Object.getOwnPropertyDescriptor(object, sym).enumerable;
    });
    keys.push.apply(keys, symbols);
  }

  return keys;
}

function _objectSpread(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i] != null ? arguments[i] : {};

    if (i % 2) {
      ownKeys(Object(source), true).forEach(function (key) {
        _defineProperty(target, key, source[key]);
      });
    } else if (Object.getOwnPropertyDescriptors) {
      Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
    } else {
      ownKeys(Object(source)).forEach(function (key) {
        Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
      });
    }
  }

  return target;
}

function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
}



var initialState = {
  currentRound: 1,
  rounds: 0,
  isNextRound: true
};
var lesson = function lesson() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initialState;
  var action = arguments.length > 1 ? arguments[1] : undefined;

  switch (action.type) {
    case 'persist/REHYDRATE':
      return state;

    case redux_actions_action_types__WEBPACK_IMPORTED_MODULE_0__.types.UPDATE_LESSON:
      {
        return _objectSpread(_objectSpread({}, state), action.data);
      }

    case redux_actions_action_types__WEBPACK_IMPORTED_MODULE_0__.types.NEXT_LAYOUT:
      {
        return _objectSpread(_objectSpread({}, state), {}, {
          layoutName: action.data.name
        });
      }

    case redux_actions_action_types__WEBPACK_IMPORTED_MODULE_0__.types.NEXT_ITEM:
      {
        var layoutCounter,
            isNextRound,
            isLevelComplete,
            isLessonComplete = false;
        ;
        layoutCounter = state.layoutCounter ? state.layoutCounter + 1 : 1;
        layoutCounter = layoutCounter > state.layoutCount ? state.layoutCount : layoutCounter;
        isNextRound = layoutCounter === state.layoutCount;

        if (state.layoutName && state.layoutName === 'summary') {
          isNextRound = true;
        }

        isLevelComplete = state.rounds === 0 ? false : state.currentRound === state.rounds;

        if (state.level && state.level.id && state.levels) {
          isLessonComplete = isLevelComplete && state.levels[state.levels.length - 1].id === state.level.id;
        }

        return _objectSpread(_objectSpread({}, state), {}, {
          layoutCounter: layoutCounter,
          isNextRound: isNextRound,
          isLevelComplete: isLevelComplete,
          isLessonComplete: isLessonComplete
        });
      }

    case redux_actions_action_types__WEBPACK_IMPORTED_MODULE_0__.types.NEXT_ROUND:
      {
        var currentRound = action.data.lesson.currentRound;

        var _isLessonComplete = state.rounds === 0 ? false : currentRound === state.rounds;

        var _layoutCounter = state.layoutCounter;
        var level = state.level;
        return _objectSpread(_objectSpread({}, state), {}, {
          currentRound: currentRound,
          layoutCounter: _layoutCounter,
          level: level,
          isLessonComplete: _isLessonComplete
        });
      }

    case redux_actions_action_types__WEBPACK_IMPORTED_MODULE_0__.types.NEXT_LESSON:
      {
        var _isNextRound = !!state.layoutCount ? state.layoutCounter === state.layoutCount : false;

        var _layoutCounter2 = 0;
        var layoutCount = action.data.lesson.layoutCount;
        return _objectSpread(_objectSpread(_objectSpread({}, state), action.data.lesson), {}, {
          isNextRound: _isNextRound,
          layoutCounter: _layoutCounter2,
          layoutCount: layoutCount
        });
      }

    case redux_actions_action_types__WEBPACK_IMPORTED_MODULE_0__.types.NEXT_LEVEL:
      {
        return _objectSpread(_objectSpread({}, state), {}, {
          currentRound: 1
        });
      }

    case redux_actions_action_types__WEBPACK_IMPORTED_MODULE_0__.types.UPDATE_COLLECTION:
      {
        if (action.data.config.mode === 'learn-again') {
          var _isNextRound2 = true;
          var _isLevelComplete = true;
          return _objectSpread(_objectSpread({}, state), {}, {
            currentRound: 1,
            isNextRound: _isNextRound2,
            isLevelComplete: _isLevelComplete
          });
        } else {
          return state;
        }
      }

    case redux_actions_action_types__WEBPACK_IMPORTED_MODULE_0__.types.SAVE_USER_PROGRESS:
      return _objectSpread(_objectSpread(_objectSpread({}, state), action.data.lesson.lesson), {}, {
        isNextRound: true
      });

    default:
      {
        return state;
      }
  }
};
var lessons = function lessons() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
  var action = arguments.length > 1 ? arguments[1] : undefined;

  switch (action.type) {
    case redux_actions_action_types__WEBPACK_IMPORTED_MODULE_0__.types.SAVE_LESSON:
      var savedLessonNames = state.map(function (lesson) {
        return lesson.name;
      });

      if ((0,ramda__WEBPACK_IMPORTED_MODULE_1__.default)(action.data.collection.name, savedLessonNames)) {
        var _lessons = state.filter(function (lesson) {
          return lesson.name !== action.data.collection.name;
        });

        _lessons.push(action.data);

        return _lessons;
      } else {
        return [].concat(_toConsumableArray(state), [action.data]);
      }

    case redux_actions_action_types__WEBPACK_IMPORTED_MODULE_0__.types.REMOVE_LESSON:
      {
        return state.filter(function (lesson) {
          return lesson.name !== action.data.name;
        });
      }

    default:
      return state;
  }
};

/***/ }),

/***/ "ViYo":
/*!*************************************************!*\
  !*** ./src/redux/reducers/progress-reducers.js ***!
  \*************************************************/
/*! namespace exports */
/*! export counter [provided] [used] [could be renamed] */
/*! export history [provided] [used] [could be renamed] */
/*! export score [provided] [used] [could be renamed] */
/*! export videoPlayer [provided] [used] [could be renamed] */
/*! other exports [not provided] [unused] */
/*! runtime requirements: __webpack_require__, __webpack_exports__, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "counter": () => /* binding */ counter,
/* harmony export */   "score": () => /* binding */ score,
/* harmony export */   "history": () => /* binding */ history,
/* harmony export */   "videoPlayer": () => /* binding */ videoPlayer
/* harmony export */ });
/* harmony import */ var ramda__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ramda */ "kGug");
/* harmony import */ var redux_actions_action_types__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! redux/actions/action-types */ "NKFH");
/* harmony import */ var redux_reducers_initial_state_initial_progress_state__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! redux/reducers/initial-state/initial-progress-state */ "+Q6R");
function _toConsumableArray(arr) {
  return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread();
}

function _nonIterableSpread() {
  throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}

function _unsupportedIterableToArray(o, minLen) {
  if (!o) return;
  if (typeof o === "string") return _arrayLikeToArray(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor) n = o.constructor.name;
  if (n === "Map" || n === "Set") return Array.from(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
}

function _iterableToArray(iter) {
  if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter);
}

function _arrayWithoutHoles(arr) {
  if (Array.isArray(arr)) return _arrayLikeToArray(arr);
}

function _arrayLikeToArray(arr, len) {
  if (len == null || len > arr.length) len = arr.length;

  for (var i = 0, arr2 = new Array(len); i < len; i++) {
    arr2[i] = arr[i];
  }

  return arr2;
}

function ownKeys(object, enumerableOnly) {
  var keys = Object.keys(object);

  if (Object.getOwnPropertySymbols) {
    var symbols = Object.getOwnPropertySymbols(object);
    if (enumerableOnly) symbols = symbols.filter(function (sym) {
      return Object.getOwnPropertyDescriptor(object, sym).enumerable;
    });
    keys.push.apply(keys, symbols);
  }

  return keys;
}

function _objectSpread(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i] != null ? arguments[i] : {};

    if (i % 2) {
      ownKeys(Object(source), true).forEach(function (key) {
        _defineProperty(target, key, source[key]);
      });
    } else if (Object.getOwnPropertyDescriptors) {
      Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
    } else {
      ownKeys(Object(source)).forEach(function (key) {
        Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
      });
    }
  }

  return target;
}

function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
}




var counter = function counter() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
  var action = arguments.length > 1 ? arguments[1] : undefined;

  switch (action.type) {
    case 'persist/REHYDRATE':
      return action.payload ? _objectSpread(_objectSpread({}, action.payload.counter), {}, {
        isLessonRehydrated: true,
        isLessonPaused: true
      }) : state;

    case redux_actions_action_types__WEBPACK_IMPORTED_MODULE_0__.types.RESET_COLLECTION:
      return _objectSpread(_objectSpread({}, state), {}, {
        isLessonSelected: false,
        isLessonPaused: false
      });

    case redux_actions_action_types__WEBPACK_IMPORTED_MODULE_0__.types.UPDATE_COLLECTION:
      return _objectSpread(_objectSpread({}, state), {}, {
        isLessonRehydrated: false
      });

    case redux_actions_action_types__WEBPACK_IMPORTED_MODULE_0__.types.NEXT_ROUND:
      return {
        index: 0
      };

    case redux_actions_action_types__WEBPACK_IMPORTED_MODULE_0__.types.NEXT_LESSON:
      return {
        index: 0
      };

    case redux_actions_action_types__WEBPACK_IMPORTED_MODULE_0__.types.NEXT_LEVEL:
      return _objectSpread(_objectSpread({}, state), {}, {
        index: action.data.index
      });

    case redux_actions_action_types__WEBPACK_IMPORTED_MODULE_0__.types.STOP_START_LESSON:
      var index = state && state.index || 0;
      return _objectSpread(_objectSpread({}, action.data), {}, {
        index: index
      });

    case redux_actions_action_types__WEBPACK_IMPORTED_MODULE_0__.types.UPDATE_SCORE:
    case redux_actions_action_types__WEBPACK_IMPORTED_MODULE_0__.types.END_REVISION:
      var i = state.index + 1 <= action.data.layoutCount ? state.index + 1 : state.index;
      return {
        index: i
      };

    case redux_actions_action_types__WEBPACK_IMPORTED_MODULE_0__.types.SAVE_USER_PROGRESS:
      return _objectSpread(_objectSpread(_objectSpread({}, state), action.data.lesson.counter), {}, {
        isLessonPaused: !!action.data.lesson.counter.isCustomLessonPausedOverride,
        userAction: action.data.userAction
      });

    default:
      return state;
  }
};
var score = function score() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : redux_reducers_initial_state_initial_progress_state__WEBPACK_IMPORTED_MODULE_1__.progressState.score;
  var action = arguments.length > 1 ? arguments[1] : undefined;

  switch (action.type) {
    case redux_actions_action_types__WEBPACK_IMPORTED_MODULE_0__.types.UPDATE_SCORE:
      {
        var _score = _objectSpread(_objectSpread(_objectSpread({}, state), action.data), {}, {
          statement: action.data.statement || ''
        });

        _score.totalPoints = _score.totalPoints || 0;
        _score.totalPassPoints = _score.totalPassPoints || 0;
        _score.totalFailPoints = _score.totalFailPoints || 0;
        _score.totalPoints += _score.points ? _score.points : 0;
        _score.total++;

        if (_score.success) {
          _score.totalPassPoints += _score.points ? _score.points : 0;
          _score.correct++;

          _score.passes.push({
            itemId: _score.itemId,
            taxon: _score.taxon,
            binomial: _score.binomial,
            question: _score.question,
            statement: _score.statement || '',
            answer: _score.answer,
            answers: _score.answers,
            index: _score.total - 1,
            success: _score.success,
            questionText: _score.questionText
          });
        } else {
          _score.incorrect++;
          _score.totalFailPoints += _score.points ? _score.points : 0;

          _score.fails.push({
            itemId: _score.itemId,
            taxon: _score.taxon,
            binomial: _score.binomial,
            question: _score.question,
            statement: _score.statement || '',
            answer: _score.answer,
            answers: _score.answers,
            index: _score.total - 1,
            success: _score.success,
            questionText: _score.questionText
          });
        }

        _score.questionTotal = _score.passes.length + _score.fails.length;
        _score.passesTotals = (0,ramda__WEBPACK_IMPORTED_MODULE_2__.default)(state.passesTotals) || {};
        _score.failsTotals = (0,ramda__WEBPACK_IMPORTED_MODULE_2__.default)(state.failsTotals) || {};

        if (_score.success) {
          _score.passesTotals[_score.itemId] = _score.passesTotals[_score.itemId] ? _score.passesTotals[_score.itemId] + 1 : 1;

          if (!_score.failsTotals[_score.itemId]) {
            _score.failsTotals[_score.itemId] = 0;
          }
        } else {
          _score.failsTotals[_score.itemId] = _score.failsTotals[_score.itemId] ? _score.failsTotals[_score.itemId] + 1 : 1;

          if (!_score.passesTotals[_score.itemId]) {
            _score.passesTotals[_score.itemId] = 0;
          }
        }

        return _objectSpread(_objectSpread({}, state), _score);
      }

    case redux_actions_action_types__WEBPACK_IMPORTED_MODULE_0__.types.SELECT_COLLECTION:
      return (0,ramda__WEBPACK_IMPORTED_MODULE_2__.default)(redux_reducers_initial_state_initial_progress_state__WEBPACK_IMPORTED_MODULE_1__.progressState.score);

    case redux_actions_action_types__WEBPACK_IMPORTED_MODULE_0__.types.NEXT_ROUND:
    case redux_actions_action_types__WEBPACK_IMPORTED_MODULE_0__.types.NEXT_LEVEL:
    case redux_actions_action_types__WEBPACK_IMPORTED_MODULE_0__.types.UPDATE_COLLECTION:
      return _objectSpread(_objectSpread({}, redux_reducers_initial_state_initial_progress_state__WEBPACK_IMPORTED_MODULE_1__.progressState.score), {
        fails: [],
        passes: []
      });

    case redux_actions_action_types__WEBPACK_IMPORTED_MODULE_0__.types.UPDATE_TRAIT_SCORE:
      {
        var bonusScores = state.bonusScores || [];
        bonusScores.push({
          id: action.data.itemId,
          name: action.data.binomial,
          success: action.data.success,
          guid: action.data.guid
        });
        return _objectSpread(_objectSpread({}, state), {}, {
          bonusScores: bonusScores
        });
      }

    case redux_actions_action_types__WEBPACK_IMPORTED_MODULE_0__.types.SAVE_USER_PROGRESS:
      return action.data.lesson.score;

    case redux_actions_action_types__WEBPACK_IMPORTED_MODULE_0__.types.NEXT_LESSON:
      {
        return _objectSpread(_objectSpread({}, state), {}, {
          mode: 'learn'
        });
      }

    default:
      return state;
  }
};
var history = function history() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
  var action = arguments.length > 1 ? arguments[1] : undefined;

  switch (action.type) {
    case redux_actions_action_types__WEBPACK_IMPORTED_MODULE_0__.types.UPDATE_HISTORY:
      {
        var _history = {
          scores: []
        };
        _history.scores = state === null ? [action.data] : state.scores[state.scores.length - 1].question === action.data.question ? _toConsumableArray(state.scores) : [].concat(_toConsumableArray(state.scores), [action.data]);
        var historyCorrect = 0;
        var historyTotal = 0;

        _history.scores.forEach(function (score) {
          historyCorrect += score.correct;
          historyTotal += score.total;
        });

        _history.correct = historyCorrect;
        _history.total = historyTotal;
        _history.incorrect = _history.total - _history.correct;
        return _history;
      }

    case redux_actions_action_types__WEBPACK_IMPORTED_MODULE_0__.types.SELECT_COLLECTION:
      return null;

    case redux_actions_action_types__WEBPACK_IMPORTED_MODULE_0__.types.SAVE_USER_PROGRESS:
      return action.data.lesson.history;

    default:
      return state;
  }
};
var videoPlayer = function videoPlayer() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
  var action = arguments.length > 1 ? arguments[1] : undefined;

  switch (action.type) {
    case redux_actions_action_types__WEBPACK_IMPORTED_MODULE_0__.types.UPDATE_VIDEO_PLAYER:
      return action.data;

    default:
      return state;
  }
};

/***/ }),

/***/ "OWYW":
/*!***************************************************!*\
  !*** ./src/redux/reducers/quick-fire-reducers.js ***!
  \***************************************************/
/*! namespace exports */
/*! export glossary [provided] [used] [could be renamed] */
/*! export quickFire [provided] [used] [could be renamed] */
/*! other exports [not provided] [unused] */
/*! runtime requirements: __webpack_require__, __webpack_exports__, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "quickFire": () => /* binding */ quickFire,
/* harmony export */   "glossary": () => /* binding */ glossary
/* harmony export */ });
/* harmony import */ var redux_actions_action_types__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! redux/actions/action-types */ "NKFH");


var cleanAndReturnIncomingState = function cleanAndReturnIncomingState(state) {
  var quickFire = state;
  if (quickFire.onClickFiltersLinkListeners) delete quickFire.onClickFiltersLinkListeners;
  if (quickFire.onClickGlossaryLinkListeners) delete quickFire.onClickGlossaryLinkListeners;
  return quickFire;
};

var quickFire = function quickFire() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
  var action = arguments.length > 1 ? arguments[1] : undefined;

  switch (action.type) {
    case redux_actions_action_types__WEBPACK_IMPORTED_MODULE_0__.types.CREATE_QUICKFIRE:
      return cleanAndReturnIncomingState(action.data);

    case redux_actions_action_types__WEBPACK_IMPORTED_MODULE_0__.types.UPDATE_QUICKFIRE:
      return cleanAndReturnIncomingState(action.data);

    default:
      return state;
  }
};
var glossary = function glossary() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
  var action = arguments.length > 1 ? arguments[1] : undefined;

  switch (action.type) {
    case redux_actions_action_types__WEBPACK_IMPORTED_MODULE_0__.types.CREATE_GLOSSARY:
      return action.data;

    default:
      return state;
  }
};

/***/ }),

/***/ "xLZK":
/*!************************************************!*\
  !*** ./src/redux/reducers/species-reducers.js ***!
  \************************************************/
/*! namespace exports */
/*! export bonusLayout [provided] [used] [could be renamed] */
/*! export collection [provided] [used] [could be renamed] */
/*! export collections [provided] [used] [could be renamed] */
/*! other exports [not provided] [unused] */
/*! runtime requirements: __webpack_require__, __webpack_exports__, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "collections": () => /* binding */ collections,
/* harmony export */   "collection": () => /* binding */ collection,
/* harmony export */   "bonusLayout": () => /* binding */ bonusLayout
/* harmony export */ });
/* harmony import */ var ramda__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ramda */ "pWpQ");
/* harmony import */ var ramda__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ramda */ "kGug");
/* harmony import */ var redux_actions_action_types__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! redux/actions/action-types */ "NKFH");
function ownKeys(object, enumerableOnly) {
  var keys = Object.keys(object);

  if (Object.getOwnPropertySymbols) {
    var symbols = Object.getOwnPropertySymbols(object);
    if (enumerableOnly) symbols = symbols.filter(function (sym) {
      return Object.getOwnPropertyDescriptor(object, sym).enumerable;
    });
    keys.push.apply(keys, symbols);
  }

  return keys;
}

function _objectSpread(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i] != null ? arguments[i] : {};

    if (i % 2) {
      ownKeys(Object(source), true).forEach(function (key) {
        _defineProperty(target, key, source[key]);
      });
    } else if (Object.getOwnPropertyDescriptors) {
      Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
    } else {
      ownKeys(Object(source)).forEach(function (key) {
        Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
      });
    }
  }

  return target;
}

function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
}

function _toConsumableArray(arr) {
  return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread();
}

function _nonIterableSpread() {
  throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}

function _unsupportedIterableToArray(o, minLen) {
  if (!o) return;
  if (typeof o === "string") return _arrayLikeToArray(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor) n = o.constructor.name;
  if (n === "Map" || n === "Set") return Array.from(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
}

function _iterableToArray(iter) {
  if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter);
}

function _arrayWithoutHoles(arr) {
  if (Array.isArray(arr)) return _arrayLikeToArray(arr);
}

function _arrayLikeToArray(arr, len) {
  if (len == null || len > arr.length) len = arr.length;

  for (var i = 0, arr2 = new Array(len); i < len; i++) {
    arr2[i] = arr[i];
  }

  return arr2;
}



var collections = function collections() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
  var action = arguments.length > 1 ? arguments[1] : undefined;

  switch (action.type) {
    case redux_actions_action_types__WEBPACK_IMPORTED_MODULE_0__.types.SELECT_COLLECTION:
      var cols = _toConsumableArray(state);

      cols.forEach(function (col) {
        if (col.id === action.data.id) {
          col.selected = true;
        } else {
          col.selected = false;
        }
      });
      return cols;

    case redux_actions_action_types__WEBPACK_IMPORTED_MODULE_0__.types.UPDATE_COLLECTIONS:
      {
        return state ? [].concat(_toConsumableArray(state), _toConsumableArray(action.data)) : action.data;
      }

    case redux_actions_action_types__WEBPACK_IMPORTED_MODULE_0__.types.UPDATE_COLLECTION:
      {
        var _collections = _toConsumableArray(state);

        _collections.forEach(function (collection) {
          if (collection.id === action.data.collection.id) {
            collection = action.data.collection;
          }
        });

        return _collections;
      }

    case redux_actions_action_types__WEBPACK_IMPORTED_MODULE_0__.types.SAVE_USER_PROGRESS:
      {
        action.data.lesson.collection.isActive = true;
        var isCollectionUpdate = (0,ramda__WEBPACK_IMPORTED_MODULE_1__.default)(action.data.lesson.collection.id, state.map(function (collection) {
          return collection.id;
        }));

        if (isCollectionUpdate) {
          return [].concat(_toConsumableArray(state.filter(function (collection) {
            return collection.id !== action.data.lesson.collection.id;
          })), [action.data.lesson.collection]);
        } else {
          return [].concat(_toConsumableArray(state), [action.data.lesson.collection]);
        }
      }

    default:
      return state;
  }
};
var collection = function collection() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {
    id: 0
  };
  var action = arguments.length > 1 ? arguments[1] : undefined;

  var getNextRound = function getNextRound(action, state) {
    var lesson = action.data.lesson;
    var itemIndex = lesson.moduleSize * (lesson.currentRound - 1);
    var nextItem = state.items[itemIndex];

    if (lesson.isLevelComplete) {
      itemIndex = 0;
      nextItem = state.items[itemIndex];
    }

    return {
      itemIndex: itemIndex,
      nextItem: nextItem
    };
  };

  var updateCollection = function updateCollection(state, action) {
    var collection = _objectSpread(_objectSpread({}, state), action.data.collection);

    if (state.id && state.id === action.data.collection.id) {
      collection.itemIndex = state.itemIndex;
    }

    var nextItem = collection.items[collection.itemIndex];

    if (action.data.config.mode === 'review') {
      collection.allItems = action.data.collection.allItems;
    }

    if (action.data.config.mode === 'learn-again') {
      collection.itemIndex = 0;
      collection.nextItem = collection.items[collection.itemIndex];
    }

    return {
      collection: collection,
      nextItem: nextItem
    };
  };

  switch (action.type) {
    case 'persist/REHYDRATE':
      {
        return state;
      }

    case redux_actions_action_types__WEBPACK_IMPORTED_MODULE_0__.types.SELECT_COLLECTION:
      {
        return action.data;
      }

    case redux_actions_action_types__WEBPACK_IMPORTED_MODULE_0__.types.UPDATE_COLLECTION_ITEMS:
      {
        var _collection = (0,ramda__WEBPACK_IMPORTED_MODULE_2__.default)(state);

        _collection.items = action.data.filter(function (item) {
          return !item.isDeselected;
        });
        return _collection;
      }

    case redux_actions_action_types__WEBPACK_IMPORTED_MODULE_0__.types.SAVE_USER_PROGRESS:
      {
        return _objectSpread(_objectSpread({}, action.data.lesson.collection), {}, {
          nextItem: action.data.lesson.collection.items[action.data.lesson.collection.itemIndex]
        });
      }

    case redux_actions_action_types__WEBPACK_IMPORTED_MODULE_0__.types.RESET_COLLECTION:
      {
        return action.data.collection;
      }

    case redux_actions_action_types__WEBPACK_IMPORTED_MODULE_0__.types.UPDATE_COLLECTION:
      {
        var _updateCollection = updateCollection(state, action),
            _collection2 = _updateCollection.collection,
            nextItem = _updateCollection.nextItem;

        return _objectSpread(_objectSpread(_objectSpread({}, state), _collection2), {}, {
          nextItem: nextItem
        });
      }

    case redux_actions_action_types__WEBPACK_IMPORTED_MODULE_0__.types.NEXT_LAYOUT:
      {
        var layout = action.data;
        return layout.bonus ? state : state;
      }

    case redux_actions_action_types__WEBPACK_IMPORTED_MODULE_0__.types.NEXT_ITEM:
      {
        var itemIndex = action.data;
        var _nextItem = state.items[itemIndex];
        return _objectSpread(_objectSpread({}, state), {}, {
          itemIndex: itemIndex,
          nextItem: _nextItem
        });
      }

    case redux_actions_action_types__WEBPACK_IMPORTED_MODULE_0__.types.NEXT_ROUND:
      {
        var _getNextRound = getNextRound(action, state),
            _itemIndex = _getNextRound.itemIndex,
            _nextItem2 = _getNextRound.nextItem;

        return _objectSpread(_objectSpread({}, state), {}, {
          itemIndex: _itemIndex,
          nextItem: _nextItem2
        });
      }

    case redux_actions_action_types__WEBPACK_IMPORTED_MODULE_0__.types.NEXT_LESSON:
      {
        var _collection3 = _objectSpread(_objectSpread({}, state), action.data.collection);

        return _objectSpread(_objectSpread({}, state), _collection3);
      }

    case redux_actions_action_types__WEBPACK_IMPORTED_MODULE_0__.types.NEXT_LEVEL:
      {
        return state;
      }

    default:
      {
        return state;
      }
  }
};
var bonusLayout = function bonusLayout() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
  var action = arguments.length > 1 ? arguments[1] : undefined;

  switch (action.type) {
    case 'persist/REHYDRATE':
      {
        return state;
      }

    case redux_actions_action_types__WEBPACK_IMPORTED_MODULE_0__.types.NEXT_LAYOUT:
      {
        var layout = action.data;

        if (layout.bonus) {
          state = layout;
        }

        return state;
      }

    case redux_actions_action_types__WEBPACK_IMPORTED_MODULE_0__.types.SAVE_USER_PROGRESS:
      return _objectSpread(_objectSpread({}, state), action.data.lesson.bonusLayout);

    default:
      {
        return state;
      }
  }
};

/***/ }),

/***/ "J8+u":
/*!****************************!*\
  !*** ./src/redux/store.js ***!
  \****************************/
/*! namespace exports */
/*! export persistor [provided] [used] [could be renamed] */
/*! export rootReducer [provided] [unused] [could be renamed] */
/*! export store [provided] [used] [could be renamed] */
/*! other exports [not provided] [unused] */
/*! runtime requirements: __webpack_require__, __webpack_exports__, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "store": () => /* binding */ store,
/* harmony export */   "persistor": () => /* binding */ persistor
/* harmony export */ });
/* unused harmony export rootReducer */
/* harmony import */ var redux__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! redux */ "vHZO");
/* harmony import */ var redux_persist__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! redux-persist */ "jEsT");
/* harmony import */ var redux_thunk__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! redux-thunk */ "6eqC");
/* harmony import */ var redux_persist_lib_storage__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! redux-persist/lib/storage */ "d4RP");
/* harmony import */ var redux_middleware_logger__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! redux/middleware/logger */ "l/cg");
/* harmony import */ var redux_middleware_timeoutScheduler__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! redux/middleware/timeoutScheduler */ "C2Nx");
/* harmony import */ var redux_reducers_config_reducer__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! redux/reducers/config-reducer */ "4/zu");
/* harmony import */ var redux_reducers_species_reducers__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! redux/reducers/species-reducers */ "xLZK");
/* harmony import */ var redux_reducers_progress_reducers__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! redux/reducers/progress-reducers */ "ViYo");
/* harmony import */ var redux_reducers_layout_reducers__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! redux/reducers/layout-reducers */ "U0OL");
/* harmony import */ var redux_reducers_lesson_reducers__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! redux/reducers/lesson-reducers */ "srSX");
/* harmony import */ var redux_reducers_quick_fire_reducers__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! redux/reducers/quick-fire-reducers */ "OWYW");
/* harmony import */ var redux_reducers_deck_reducers__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! redux/reducers/deck-reducers */ "PNxz");
/* harmony import */ var redux_persist_lib_stateReconciler_hardSet__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! redux-persist/lib/stateReconciler/hardSet */ "GpCB");



 // defaults to localStorage for web and AsyncStorage for react-native











var reducer = (0,redux__WEBPACK_IMPORTED_MODULE_13__.combineReducers)({
  counter: redux_reducers_progress_reducers__WEBPACK_IMPORTED_MODULE_7__.counter,
  lessonPlans: redux_reducers_layout_reducers__WEBPACK_IMPORTED_MODULE_8__.lessonPlans,
  lessonPlan: redux_reducers_layout_reducers__WEBPACK_IMPORTED_MODULE_8__.lessonPlan,
  layout: redux_reducers_layout_reducers__WEBPACK_IMPORTED_MODULE_8__.layout,
  config: redux_reducers_config_reducer__WEBPACK_IMPORTED_MODULE_5__.config,
  lessons: redux_reducers_lesson_reducers__WEBPACK_IMPORTED_MODULE_9__.lessons,
  lesson: redux_reducers_lesson_reducers__WEBPACK_IMPORTED_MODULE_9__.lesson,
  collection: redux_reducers_species_reducers__WEBPACK_IMPORTED_MODULE_6__.collection,
  score: redux_reducers_progress_reducers__WEBPACK_IMPORTED_MODULE_7__.score,
  collections: redux_reducers_species_reducers__WEBPACK_IMPORTED_MODULE_6__.collections,
  history: redux_reducers_progress_reducers__WEBPACK_IMPORTED_MODULE_7__.history,
  videoPlayer: redux_reducers_progress_reducers__WEBPACK_IMPORTED_MODULE_7__.videoPlayer,
  units: redux_reducers_config_reducer__WEBPACK_IMPORTED_MODULE_5__.units,
  bonusLayout: redux_reducers_species_reducers__WEBPACK_IMPORTED_MODULE_6__.bonusLayout,
  user: redux_reducers_config_reducer__WEBPACK_IMPORTED_MODULE_5__.user,
  quickFire: redux_reducers_quick_fire_reducers__WEBPACK_IMPORTED_MODULE_10__.quickFire,
  glossary: redux_reducers_quick_fire_reducers__WEBPACK_IMPORTED_MODULE_10__.glossary,
  userAction: redux_reducers_config_reducer__WEBPACK_IMPORTED_MODULE_5__.userAction,
  decks: redux_reducers_deck_reducers__WEBPACK_IMPORTED_MODULE_11__.decks,
  deck: redux_reducers_deck_reducers__WEBPACK_IMPORTED_MODULE_11__.deck,
  deckState: redux_reducers_deck_reducers__WEBPACK_IMPORTED_MODULE_11__.deckState,
  deckScore: redux_reducers_deck_reducers__WEBPACK_IMPORTED_MODULE_11__.deckScore,
  deckSettings: redux_reducers_deck_reducers__WEBPACK_IMPORTED_MODULE_11__.deckSettings,
  deckScoreHistory: redux_reducers_deck_reducers__WEBPACK_IMPORTED_MODULE_11__.deckScoreHistory
});
var persistConfig = {
  key: 'root',
  storage: redux_persist_lib_storage__WEBPACK_IMPORTED_MODULE_2__.default //   stateReconciler: hardSet
  //   blacklist: ['config']

};
var persistedReducer = (0,redux_persist__WEBPACK_IMPORTED_MODULE_0__.persistReducer)(persistConfig, reducer);
var composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || redux__WEBPACK_IMPORTED_MODULE_13__.compose;
var store = (0,redux__WEBPACK_IMPORTED_MODULE_13__.createStore)(persistedReducer, composeEnhancers((0,redux__WEBPACK_IMPORTED_MODULE_13__.applyMiddleware)(redux_middleware_logger__WEBPACK_IMPORTED_MODULE_3__.logger, redux_thunk__WEBPACK_IMPORTED_MODULE_1__.default)));
var persistor = (0,redux_persist__WEBPACK_IMPORTED_MODULE_0__.persistStore)(store);
var rootReducer = function rootReducer(state, action) {
  // For this use case we can use purge instead:
  // https://stackoverflow.com/questions/35622588/how-to-reset-the-state-of-a-redux-store/35641992#35641992
  if (action.type === 'INITIALISE_STATE') {
    state = undefined;
  }

  return reducer(state, action);
};

/***/ }),

/***/ "EpxB":
/*!************************************************!*\
  !*** ./src/snapdragon-config/lesson-config.js ***!
  \************************************************/
/*! namespace exports */
/*! export config [provided] [used] [could be renamed] */
/*! other exports [not provided] [unused] */
/*! runtime requirements: __webpack_require__, __webpack_exports__, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "config": () => /* binding */ config
/* harmony export */ });
/* harmony import */ var ui_helpers_enum_helper__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ui/helpers/enum-helper */ "DXx0");

var config = {
  language: 'en',
  moduleSize: 4,
  callbackTime: 1500,
  callbackDelay: 1500,
  excludeRevision: false,
  isPortraitMode: false,
  isLandscapeMode: true,
  collection: {
    id: 0
  },
  mode: 'learn',
  languages: [{
    name: 'Deutsche',
    lang: 'de'
  }, {
    name: 'English',
    lang: 'en'
  }, {
    name: 'Español',
    lang: 'es'
  }, {
    name: 'Français',
    lang: 'fr'
  }, {
    name: 'Italiano',
    lang: 'it'
  }, {
    name: 'Português',
    lang: 'pt'
  }],
  guide: {
    iconicTaxa: null,
    locationLongLat: '',
    locationPlace: '',
    locationType: null,
    place: {
      id: 1,
      name: ''
    },
    speciesRange: 10,
    inatId: {
      key: '',
      type: '',
      param: 'user_id'
    },
    season: {},
    perPage: 200,
    noOfRecords: 10,
    guideMode: ui_helpers_enum_helper__WEBPACK_IMPORTED_MODULE_0__.enums.guideMode.STATIC.name
  }
};

/***/ }),

/***/ "85sm":
/*!*****************************************************!*\
  !*** ./src/ui/create-guide-modal/species-editor.js ***!
  \*****************************************************/
/*! namespace exports */
/*! export addListenerToAddedSpecies [provided] [used] [could be renamed] */
/*! export speciesEditor [provided] [used] [could be renamed] */
/*! other exports [not provided] [unused] */
/*! runtime requirements: __webpack_require__, __webpack_require__.n, __webpack_exports__, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "addListenerToAddedSpecies": () => /* binding */ addListenerToAddedSpecies,
/* harmony export */   "speciesEditor": () => /* binding */ speciesEditor
/* harmony export */ });
/* harmony import */ var ramda__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ramda */ "pWpQ");
/* harmony import */ var autocompleter__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! autocompleter */ "B89K");
/* harmony import */ var autocompleter__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(autocompleter__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var api_firebase_firestore__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! api/firebase/firestore */ "xWjd");
/* harmony import */ var ui_helpers_templating__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ui/helpers/templating */ "xNSC");
/* harmony import */ var ui_create_guide_modal_species_editor_template_html__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ui/create-guide-modal/species-editor-template.html */ "FbdU");
/* harmony import */ var ui_create_guide_modal_species_editor_template_html__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(ui_create_guide_modal_species_editor_template_html__WEBPACK_IMPORTED_MODULE_3__);
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {
  try {
    var info = gen[key](arg);
    var value = info.value;
  } catch (error) {
    reject(error);
    return;
  }

  if (info.done) {
    resolve(value);
  } else {
    Promise.resolve(value).then(_next, _throw);
  }
}

function _asyncToGenerator(fn) {
  return function () {
    var self = this,
        args = arguments;
    return new Promise(function (resolve, reject) {
      var gen = fn.apply(self, args);

      function _next(value) {
        asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);
      }

      function _throw(err) {
        asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);
      }

      _next(undefined);
    });
  };
}






var listenersToAddedSpecies = [];
var addListenerToAddedSpecies = function addListenerToAddedSpecies(listener) {
  listenersToAddedSpecies.pop();
  listenersToAddedSpecies.push(listener);
};
var speciesEditor = function speciesEditor(container, selectedSpeciesDisplay, selectedSpecies, savedSpeciesNames, addedSpecies) {
  var template = document.createElement('template');
  template.innerHTML = (ui_create_guide_modal_species_editor_template_html__WEBPACK_IMPORTED_MODULE_3___default());
  selectedSpeciesDisplay.innerHTML = '';
  (0,ui_helpers_templating__WEBPACK_IMPORTED_MODULE_2__.renderTemplate)({
    addedSpecies: addedSpecies
  }, template.content, selectedSpeciesDisplay);
  var input = container.querySelector("#input-species");
  setTimeout(function () {
    input.focus();
  }, 500);

  var addSpeciesToList = function addSpeciesToList(species) {
    if ((0,ramda__WEBPACK_IMPORTED_MODULE_4__.default)(species, selectedSpecies)) return;
    selectedSpecies.push(species);
    addedSpecies.push(species);
    speciesNames = speciesNames.filter(function (name) {
      return name.value !== input.value;
    });
    input.value = '';
    listenersToAddedSpecies.forEach(function (listener) {
      return listener(species);
    });
    setTimeout(function () {
      speciesEditor(container, selectedSpeciesDisplay, selectedSpecies, speciesNames, addedSpecies);
    }, 200);
  };

  var speciesNames = savedSpeciesNames || [];

  var init = /*#__PURE__*/function () {
    var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              if (!(speciesNames.length === 0)) {
                _context.next = 5;
                break;
              }

              _context.next = 3;
              return api_firebase_firestore__WEBPACK_IMPORTED_MODULE_1__.firestore.getSpeciesNames();

            case 3:
              speciesNames = _context.sent;
              speciesNames = speciesNames[0].value.map(function (name) {
                return {
                  label: name,
                  value: name
                };
              });

            case 5:
              autocompleter__WEBPACK_IMPORTED_MODULE_0___default()({
                input: input,
                fetch: function fetch(text, update) {
                  text = text.toLowerCase();
                  var suggestions = speciesNames.filter(function (n) {
                    return n.value.toLowerCase().startsWith(text) && !(0,ramda__WEBPACK_IMPORTED_MODULE_4__.default)(n.value, selectedSpecies);
                  });
                  update(suggestions);
                },
                onSelect: function onSelect(item) {
                  input.value = item.label;
                  addSpeciesToList(input.value);
                },
                minLength: 3,
                debounceWaitMs: 200,
                className: 'autocomplete-options-container'
              });
              input.addEventListener('change', function (event) {
                setTimeout(function () {
                  var highlightedText = document.querySelector('.selected');

                  if (highlightedText) {
                    input.value = highlightedText.innerText;
                    addSpeciesToList(input.value);
                  }
                }, 100);
              });

            case 7:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, this);
    }));

    return function init() {
      return _ref.apply(this, arguments);
    };
  }();

  init();
  container.querySelectorAll('li input').forEach(function (checkBox) {
    checkBox.addEventListener('change', function (event) {
      var removedSpecies = event.target.id;
      speciesNames.push({
        label: removedSpecies,
        value: removedSpecies
      });
      selectedSpecies = selectedSpecies.filter(function (species) {
        return species !== removedSpecies;
      });
      speciesEditor(container, selectedSpeciesDisplay, selectedSpecies, speciesNames);
    });
  });
};

/***/ }),

/***/ "6sgU":
/*!**************************************************************!*\
  !*** ./src/ui/create-guide-modal/species-in-guide-editor.js ***!
  \**************************************************************/
/*! namespace exports */
/*! export speciesInGuideEditor [provided] [used] [could be renamed] */
/*! other exports [not provided] [unused] */
/*! runtime requirements: __webpack_require__, __webpack_require__.n, __webpack_require__.e, __webpack_exports__, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "speciesInGuideEditor": () => /* binding */ speciesInGuideEditor
/* harmony export */ });
/* harmony import */ var ramda__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ramda */ "pWpQ");
/* harmony import */ var autocompleter__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! autocompleter */ "B89K");
/* harmony import */ var autocompleter__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(autocompleter__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var ui_helpers_enum_helper__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ui/helpers/enum-helper */ "DXx0");
/* harmony import */ var redux_store__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! redux/store */ "J8+u");
/* harmony import */ var api_firebase_firestore__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! api/firebase/firestore */ "xWjd");
/* harmony import */ var ui_helpers_templating__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ui/helpers/templating */ "xNSC");
/* harmony import */ var ui_create_guide_modal_species_in_guide_editor_template_html__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ui/create-guide-modal/species-in-guide-editor-template.html */ "FSGx");
/* harmony import */ var ui_create_guide_modal_species_in_guide_editor_template_html__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(ui_create_guide_modal_species_in_guide_editor_template_html__WEBPACK_IMPORTED_MODULE_5__);
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {
  try {
    var info = gen[key](arg);
    var value = info.value;
  } catch (error) {
    reject(error);
    return;
  }

  if (info.done) {
    resolve(value);
  } else {
    Promise.resolve(value).then(_next, _throw);
  }
}

function _asyncToGenerator(fn) {
  return function () {
    var self = this,
        args = arguments;
    return new Promise(function (resolve, reject) {
      var gen = fn.apply(self, args);

      function _next(value) {
        asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);
      }

      function _throw(err) {
        asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);
      }

      _next(undefined);
    });
  };
}

function _toConsumableArray(arr) {
  return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread();
}

function _nonIterableSpread() {
  throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}

function _unsupportedIterableToArray(o, minLen) {
  if (!o) return;
  if (typeof o === "string") return _arrayLikeToArray(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor) n = o.constructor.name;
  if (n === "Map" || n === "Set") return Array.from(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
}

function _iterableToArray(iter) {
  if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter);
}

function _arrayWithoutHoles(arr) {
  if (Array.isArray(arr)) return _arrayLikeToArray(arr);
}

function _arrayLikeToArray(arr, len) {
  if (len == null || len > arr.length) len = arr.length;

  for (var i = 0, arr2 = new Array(len); i < len; i++) {
    arr2[i] = arr[i];
  }

  return arr2;
}








var speciesInGuideEditor = function speciesInGuideEditor(config, modal, selectedSpeciesDisplay, createGuide, selectedSpecies, savedSpeciesNames) {
  var spinner = modal.querySelector('.js-species-search');
  if (spinner) spinner.classList.add('hide-important');
  var template = document.createElement('template');
  template.innerHTML = (ui_create_guide_modal_species_in_guide_editor_template_html__WEBPACK_IMPORTED_MODULE_5___default());
  selectedSpeciesDisplay.innerHTML = '';
  (0,ui_helpers_templating__WEBPACK_IMPORTED_MODULE_4__.renderTemplate)({
    selectedSpecies: selectedSpecies
  }, template.content, selectedSpeciesDisplay);

  var getTaxa = function getTaxa(taxa, config, selectedSpecies) {
    if (taxa) {
      if (config.guide.iconicTaxa) {
        taxa.innerHTML = config.guide.iconicTaxa.map(function (i) {
          return i.common;
        }).join(', ');
      } else {
        taxa.innerHTML = _toConsumableArray(new Set(selectedSpecies.map(function (ss) {
          return ss.iconicTaxon;
        }))).join(', ');
      }
    }
  };

  var speciesCount = modal.querySelector('.js-lesson-taxa-count');

  if (speciesCount) {
    speciesCount.innerHTML = speciesCount === 1 ? "There is ".concat(selectedSpecies.length, " species in this lesson.") : "There are ".concat(selectedSpecies.length, " species in this lesson.");
    ;
  }

  var taxa = modal.querySelector('.js-lesson-taxa');
  getTaxa(taxa, config, selectedSpecies);
  var input = modal.querySelector("#input-species");

  if (config.isLandscapeMode) {
    setTimeout(function () {
      input.focus();
    }, 500);
  }

  var addSpeciesToList = /*#__PURE__*/function () {
    var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(species) {
      var _store$getState, collection;

      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              if (!(0,ramda__WEBPACK_IMPORTED_MODULE_6__.default)(species.name, selectedSpecies.map(function (ss) {
                return ss.name;
              }))) {
                _context.next = 2;
                break;
              }

              return _context.abrupt("return");

            case 2:
              selectedSpecies.push(species);
              config.guide.species = selectedSpecies;
              config.guide.iconicTaxa = _toConsumableArray(new Set(selectedSpecies.map(function (ss) {
                return ss.iconicTaxon;
              })));
              createGuide.setConfig(config);
              speciesNames = speciesNames.filter(function (name) {
                return name.value !== input.value;
              });
              input.value = '';
              _store$getState = redux_store__WEBPACK_IMPORTED_MODULE_2__.store.getState(), collection = _store$getState.collection;

              if (collection.items) {
                // existing collection, to which we want to add species
                Promise.all(/*! import() */[__webpack_require__.e("vendors"), __webpack_require__.e("src_ui_screens_lists_lesson-state-handler_js")]).then(__webpack_require__.bind(__webpack_require__, /*! ui/screens/lists/lesson-state-handler */ "MC3F")).then(function (module) {
                  module.lessonStateHandler.changeRequest({
                    requestType: ui_helpers_enum_helper__WEBPACK_IMPORTED_MODULE_1__.enums.lessonState.ADD_SPECIES_TO_COLLECTION,
                    requestArgs: {
                      config: config,
                      collection: collection
                    }
                  });
                });
              }

              setTimeout(function () {
                speciesInGuideEditor(config, modal, selectedSpeciesDisplay, createGuide, selectedSpecies, speciesNames);
              }, 250);

            case 11:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, this);
    }));

    return function addSpeciesToList(_x) {
      return _ref.apply(this, arguments);
    };
  }();

  var speciesNames = savedSpeciesNames || [];

  var init = /*#__PURE__*/function () {
    var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4() {
      return regeneratorRuntime.wrap(function _callee4$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              if (!(speciesNames.length === 0)) {
                _context4.next = 5;
                break;
              }

              _context4.next = 3;
              return api_firebase_firestore__WEBPACK_IMPORTED_MODULE_3__.firestore.getSpeciesNames();

            case 3:
              speciesNames = _context4.sent;
              speciesNames = speciesNames[0].value.map(function (name) {
                return {
                  label: name,
                  value: name
                };
              });

            case 5:
              autocompleter__WEBPACK_IMPORTED_MODULE_0___default()({
                input: input,
                fetch: function fetch(text, update) {
                  text = text.toLowerCase();
                  var suggestions = speciesNames.filter(function (n) {
                    return n.value.toLowerCase().startsWith(text) && !(0,ramda__WEBPACK_IMPORTED_MODULE_6__.default)(n.value, selectedSpecies.map(function (ss) {
                      return ss.name;
                    }));
                  });
                  update(suggestions);
                },
                onSelect: function () {
                  var _onSelect = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(item) {
                    var species;
                    return regeneratorRuntime.wrap(function _callee2$(_context2) {
                      while (1) {
                        switch (_context2.prev = _context2.next) {
                          case 0:
                            input.value = item.label;
                            _context2.next = 3;
                            return api_firebase_firestore__WEBPACK_IMPORTED_MODULE_3__.firestore.getSpeciesByName(item.label);

                          case 3:
                            species = _context2.sent;
                            addSpeciesToList(species);

                          case 5:
                          case "end":
                            return _context2.stop();
                        }
                      }
                    }, _callee2, this);
                  }));

                  function onSelect(_x2) {
                    return _onSelect.apply(this, arguments);
                  }

                  return onSelect;
                }(),
                minLength: 3,
                debounceWaitMs: 200,
                className: 'autocomplete-options-container'
              });
              input.addEventListener('change', function (event) {
                setTimeout( /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3() {
                  var highlightedText, species;
                  return regeneratorRuntime.wrap(function _callee3$(_context3) {
                    while (1) {
                      switch (_context3.prev = _context3.next) {
                        case 0:
                          highlightedText = document.querySelector('.selected');

                          if (!highlightedText) {
                            _context3.next = 7;
                            break;
                          }

                          input.value = highlightedText.innerText;
                          _context3.next = 5;
                          return api_firebase_firestore__WEBPACK_IMPORTED_MODULE_3__.firestore.getSpeciesByName(input.value);

                        case 5:
                          species = _context3.sent;
                          addSpeciesToList(species);

                        case 7:
                        case "end":
                          return _context3.stop();
                      }
                    }
                  }, _callee3, this);
                })), 100);
              });

            case 7:
            case "end":
              return _context4.stop();
          }
        }
      }, _callee4, this);
    }));

    return function init() {
      return _ref2.apply(this, arguments);
    };
  }();

  init();
  modal.querySelectorAll('li input').forEach(function (checkBox) {
    checkBox.addEventListener('change', function (event) {
      var removedSpecies = event.target.id;
      speciesNames.push({
        label: removedSpecies,
        value: removedSpecies
      });
      selectedSpecies = selectedSpecies.filter(function (species) {
        return species.name !== removedSpecies;
      });
      config.guide.species = selectedSpecies;
      config.guide.iconicTaxa = _toConsumableArray(new Set(selectedSpecies.map(function (ss) {
        return ss.iconicTaxon;
      })));
      createGuide.setConfig(config);
      speciesInGuideEditor(config, modal, selectedSpeciesDisplay, createGuide, selectedSpecies, speciesNames);
    });
  });
};

/***/ }),

/***/ "HkuV":
/*!*****************************************************!*\
  !*** ./src/ui/create-guide-modal/species-picker.js ***!
  \*****************************************************/
/*! namespace exports */
/*! export renderSpeciesPicker [provided] [used] [could be renamed] */
/*! other exports [not provided] [unused] */
/*! runtime requirements: __webpack_require__, __webpack_require__.n, __webpack_exports__, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "renderSpeciesPicker": () => /* binding */ renderSpeciesPicker
/* harmony export */ });
/* harmony import */ var ui_helpers_templating__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ui/helpers/templating */ "xNSC");
/* harmony import */ var ui_create_guide_modal_species_in_guide_editor__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ui/create-guide-modal/species-in-guide-editor */ "6sgU");
/* harmony import */ var ui_create_guide_modal_species_editor__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ui/create-guide-modal/species-editor */ "85sm");
/* harmony import */ var ui_helpers_enum_helper__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ui/helpers/enum-helper */ "DXx0");
/* harmony import */ var ui_create_guide_modal_species_picker_template_html__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ui/create-guide-modal/species-picker-template.html */ "O56p");
/* harmony import */ var ui_create_guide_modal_species_picker_template_html__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(ui_create_guide_modal_species_picker_template_html__WEBPACK_IMPORTED_MODULE_4__);





var renderSpeciesPicker = function renderSpeciesPicker(props, parent) {
  var config = props.config,
      container = props.container,
      selectedSpecies = props.selectedSpecies;
  var template = document.createElement('template');
  template.innerHTML = (ui_create_guide_modal_species_picker_template_html__WEBPACK_IMPORTED_MODULE_4___default());
  parent.innerHTML = '';
  (0,ui_helpers_templating__WEBPACK_IMPORTED_MODULE_0__.renderTemplate)({}, template.content, parent);
  var selectedSpeciesDisplay = parent.querySelector('.js-selected-species-container');
  selectedSpeciesDisplay.innerHTML = '';

  if (config) {
    // web 
    config.guide.guideMode = ui_helpers_enum_helper__WEBPACK_IMPORTED_MODULE_3__.enums.guideMode.STATIC.name;
    (0,ui_create_guide_modal_species_in_guide_editor__WEBPACK_IMPORTED_MODULE_1__.speciesInGuideEditor)(config, container, selectedSpeciesDisplay, props, config.guide.species || []);
  } else {
    // admin
    (0,ui_create_guide_modal_species_editor__WEBPACK_IMPORTED_MODULE_2__.speciesEditor)(parent, selectedSpeciesDisplay, selectedSpecies, [], []);
  }
};

/***/ }),

/***/ "Cz4z":
/*!**********************************************!*\
  !*** ./src/ui/helpers/collection-handler.js ***!
  \**********************************************/
/*! namespace exports */
/*! export collectionHandler [provided] [used] [could be renamed] */
/*! other exports [not provided] [unused] */
/*! runtime requirements: __webpack_require__, __webpack_exports__, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "collectionHandler": () => /* binding */ collectionHandler
/* harmony export */ });
/* harmony import */ var ramda__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ramda */ "pWpQ");
/* harmony import */ var utils_utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! utils/utils */ "EHpu");
/* harmony import */ var ui_helpers_data_checking__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ui/helpers/data-checking */ "XTkL");
/* harmony import */ var api_inat_inat__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! api/inat/inat */ "gEvk");
/* harmony import */ var geo_geo__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! geo/geo */ "85yX");
/* harmony import */ var api_firebase_firestore__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! api/firebase/firestore */ "xWjd");
/* harmony import */ var ui_helpers_enum_helper__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ui/helpers/enum-helper */ "DXx0");
function _toConsumableArray(arr) {
  return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread();
}

function _nonIterableSpread() {
  throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}

function _unsupportedIterableToArray(o, minLen) {
  if (!o) return;
  if (typeof o === "string") return _arrayLikeToArray(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor) n = o.constructor.name;
  if (n === "Map" || n === "Set") return Array.from(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
}

function _iterableToArray(iter) {
  if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter);
}

function _arrayWithoutHoles(arr) {
  if (Array.isArray(arr)) return _arrayLikeToArray(arr);
}

function _arrayLikeToArray(arr, len) {
  if (len == null || len > arr.length) len = arr.length;

  for (var i = 0, arr2 = new Array(len); i < len; i++) {
    arr2[i] = arr[i];
  }

  return arr2;
}

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {
  try {
    var info = gen[key](arg);
    var value = info.value;
  } catch (error) {
    reject(error);
    return;
  }

  if (info.done) {
    resolve(value);
  } else {
    Promise.resolve(value).then(_next, _throw);
  }
}

function _asyncToGenerator(fn) {
  return function () {
    var self = this,
        args = arguments;
    return new Promise(function (resolve, reject) {
      var gen = fn.apply(self, args);

      function _next(value) {
        asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);
      }

      function _throw(err) {
        asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);
      }

      _next(undefined);
    });
  };
}









var getItems = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(collection, config) {
    var items, place;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            items = [];
            _context.t0 = config.guide.guideMode;
            _context.next = _context.t0 === ui_helpers_enum_helper__WEBPACK_IMPORTED_MODULE_5__.enums.guideMode.DYNAMIC.name ? 4 : _context.t0 === ui_helpers_enum_helper__WEBPACK_IMPORTED_MODULE_5__.enums.guideMode.STATIC.name ? 18 : 22;
            break;

          case 4:
            _context.t1 = config.guide.guideType;
            _context.next = _context.t1 === ui_helpers_enum_helper__WEBPACK_IMPORTED_MODULE_5__.enums.guideType.LOCATION.name ? 7 : _context.t1 === ui_helpers_enum_helper__WEBPACK_IMPORTED_MODULE_5__.enums.guideType.INAT.name ? 14 : 17;
            break;

          case 7:
            _context.next = 9;
            return (0,geo_geo__WEBPACK_IMPORTED_MODULE_3__.getPlace)(config, true);

          case 9:
            place = _context.sent;
            config.guide.coordinates = {
              "long": place.query[0],
              lat: place.query[1]
            };
            _context.next = 13;
            return (0,api_inat_inat__WEBPACK_IMPORTED_MODULE_2__.getInatSpecies)(config);

          case 13:
            items = _context.sent;

          case 14:
            _context.next = 16;
            return (0,api_inat_inat__WEBPACK_IMPORTED_MODULE_2__.getInatSpecies)(config);

          case 16:
            items = _context.sent;

          case 17:
            return _context.abrupt("break", 22);

          case 18:
            _context.next = 20;
            return getSpeciesDetailsInParallel(collection.species);

          case 20:
            items = _context.sent;
            return _context.abrupt("break", 22);

          case 22:
            return _context.abrupt("return", items);

          case 23:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, this);
  }));

  return function getItems(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

var loadCollection = /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(collection, config) {
    var collectionIsUnchanged, insecta, lepidoptera, noninsecta, loadedCollection;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            config.collection = {
              id: collection.id
            };
            config.language = collection.language || 'en';
            collectionIsUnchanged = collection.items && collection.items.length > 0 && config.collection.id === collection.id && (!collection.speciesRange || collection.speciesRange === config.guide.speciesRange); // snapLog('collectionIsUnchanged: ', collectionIsUnchanged);

            if (!collectionIsUnchanged) {
              _context2.next = 5;
              break;
            }

            return _context2.abrupt("return", collection);

          case 5:
            _context2.next = 7;
            return getItems(collection, config);

          case 7:
            collection.items = _context2.sent;
            collection.items = utils_utils__WEBPACK_IMPORTED_MODULE_0__.utils.shuffleArray(collection.items.filter(function (item) {
              return item.taxonomy;
            }));

            if (!collection.nextItem) {
              _context2.next = 11;
              break;
            }

            return _context2.abrupt("return");

          case 11:
            // after refreshing or returning to the page (using rehydrated collection)
            if ((0,ramda__WEBPACK_IMPORTED_MODULE_6__.default)('lepidoptera', collection.iconicTaxa.map(function (taxon) {
              return taxon.id;
            })) && !(0,ramda__WEBPACK_IMPORTED_MODULE_6__.default)('insecta', collection.iconicTaxa.map(function (taxon) {
              return taxon.id;
            }))) {
              insecta = collection.items.filter(function (i) {
                return i.taxonomy["class"].toLowerCase() === 'insecta';
              });
              lepidoptera = insecta.filter(function (i) {
                return i.taxonomy.order.toLowerCase() === 'lepidoptera';
              });
              noninsecta = collection.items.filter(function (i) {
                return i.taxonomy["class"].toLowerCase() !== 'insecta';
              });
              collection.items = [].concat(_toConsumableArray(lepidoptera), _toConsumableArray(noninsecta));
            }

            _context2.t0 = config.guide.guideMode;
            _context2.next = _context2.t0 === ui_helpers_enum_helper__WEBPACK_IMPORTED_MODULE_5__.enums.guideMode.DYNAMIC.name ? 15 : 17;
            break;

          case 15:
            collection.speciesRange = config.guide.speciesRange;
            return _context2.abrupt("break", 17);

          case 17:
            _context2.next = 19;
            return loadCollectionItemProperties(collection, config);

          case 19:
            loadedCollection = _context2.sent;
            return _context2.abrupt("return", loadedCollection);

          case 21:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, this);
  }));

  return function loadCollection(_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}();

var loadCollectionItemProperties = /*#__PURE__*/function () {
  var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee11(collection, config) {
    var families, orders, genera, familyTaxa, orderTaxa, genusTaxa, taxa, getGenusTaxa, getFamilyTaxa, getOrderTaxa, getFamilyNames, findRank, loadTraitsInParallel;
    return regeneratorRuntime.wrap(function _callee11$(_context11) {
      while (1) {
        switch (_context11.prev = _context11.next) {
          case 0:
            _context11.t0 = config.guide.guideMode;
            _context11.next = _context11.t0 === ui_helpers_enum_helper__WEBPACK_IMPORTED_MODULE_5__.enums.guideMode.DYNAMIC.name ? 3 : _context11.t0 === ui_helpers_enum_helper__WEBPACK_IMPORTED_MODULE_5__.enums.guideMode.STATIC.name ? 5 : 8;
            break;

          case 3:
            collection.items = utils_utils__WEBPACK_IMPORTED_MODULE_0__.utils.sortBy(collection.items.filter(function (item) {
              return item;
            }), 'observationCount', 'desc');
            return _context11.abrupt("break", 8);

          case 5:
            collection.items.forEach(function (sp) {
              if (sp.time) {
                sp.firstTime = sp.time[0];
              }
            });
            collection.items = utils_utils__WEBPACK_IMPORTED_MODULE_0__.utils.sortBy(collection.items, 'firstTime', 'asc');
            return _context11.abrupt("break", 8);

          case 8:
            // snapLog('loadCollectionItemProperties', collection);
            families = _toConsumableArray(new Set(collection.items.map(function (i) {
              return i.taxonomy.family;
            })));
            orders = _toConsumableArray(new Set(collection.items.map(function (i) {
              return i.taxonomy.order;
            })));
            genera = _toConsumableArray(new Set(collection.items.map(function (i) {
              return i.taxonomy.genus;
            }).filter(function (g) {
              return g;
            })));
            familyTaxa = [], orderTaxa = [], genusTaxa = [];
            _context11.next = 14;
            return api_firebase_firestore__WEBPACK_IMPORTED_MODULE_4__.firestore.getTaxaNames();

          case 14:
            taxa = _context11.sent;
            taxa = taxa[0].value;

            getGenusTaxa = /*#__PURE__*/function () {
              var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(genera) {
                return regeneratorRuntime.wrap(function _callee4$(_context4) {
                  while (1) {
                    switch (_context4.prev = _context4.next) {
                      case 0:
                        return _context4.abrupt("return", Promise.all(genera.map( /*#__PURE__*/function () {
                          var _ref5 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(genus) {
                            var genusTaxon;
                            return regeneratorRuntime.wrap(function _callee3$(_context3) {
                              while (1) {
                                switch (_context3.prev = _context3.next) {
                                  case 0:
                                    _context3.next = 2;
                                    return api_firebase_firestore__WEBPACK_IMPORTED_MODULE_4__.firestore.getTaxonByName(config, genus);

                                  case 2:
                                    genusTaxon = _context3.sent;
                                    if (Object.entries(genusTaxon).length > 0 && genusTaxon.constructor === Object) genusTaxa.push(genusTaxon);
                                    return _context3.abrupt("return", genusTaxa);

                                  case 5:
                                  case "end":
                                    return _context3.stop();
                                }
                              }
                            }, _callee3, this);
                          }));

                          return function (_x8) {
                            return _ref5.apply(this, arguments);
                          };
                        }())));

                      case 1:
                      case "end":
                        return _context4.stop();
                    }
                  }
                }, _callee4, this);
              }));

              return function getGenusTaxa(_x7) {
                return _ref4.apply(this, arguments);
              };
            }();

            _context11.next = 19;
            return getGenusTaxa(genera);

          case 19:
            getFamilyTaxa = /*#__PURE__*/function () {
              var _ref6 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee6(families) {
                return regeneratorRuntime.wrap(function _callee6$(_context6) {
                  while (1) {
                    switch (_context6.prev = _context6.next) {
                      case 0:
                        return _context6.abrupt("return", Promise.all(families.map( /*#__PURE__*/function () {
                          var _ref7 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5(family) {
                            var familyTaxon;
                            return regeneratorRuntime.wrap(function _callee5$(_context5) {
                              while (1) {
                                switch (_context5.prev = _context5.next) {
                                  case 0:
                                    _context5.next = 2;
                                    return api_firebase_firestore__WEBPACK_IMPORTED_MODULE_4__.firestore.getTaxonByName(config, family);

                                  case 2:
                                    familyTaxon = _context5.sent;
                                    if (Object.entries(familyTaxon).length > 0 && familyTaxon.constructor === Object) familyTaxa.push(familyTaxon);
                                    return _context5.abrupt("return", familyTaxa);

                                  case 5:
                                  case "end":
                                    return _context5.stop();
                                }
                              }
                            }, _callee5, this);
                          }));

                          return function (_x10) {
                            return _ref7.apply(this, arguments);
                          };
                        }())));

                      case 1:
                      case "end":
                        return _context6.stop();
                    }
                  }
                }, _callee6, this);
              }));

              return function getFamilyTaxa(_x9) {
                return _ref6.apply(this, arguments);
              };
            }();

            _context11.next = 22;
            return getFamilyTaxa(families);

          case 22:
            getOrderTaxa = /*#__PURE__*/function () {
              var _ref8 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee8(orders) {
                return regeneratorRuntime.wrap(function _callee8$(_context8) {
                  while (1) {
                    switch (_context8.prev = _context8.next) {
                      case 0:
                        return _context8.abrupt("return", Promise.all(orders.map( /*#__PURE__*/function () {
                          var _ref9 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee7(order) {
                            var orderTaxon;
                            return regeneratorRuntime.wrap(function _callee7$(_context7) {
                              while (1) {
                                switch (_context7.prev = _context7.next) {
                                  case 0:
                                    _context7.next = 2;
                                    return api_firebase_firestore__WEBPACK_IMPORTED_MODULE_4__.firestore.getTaxonByName(config, order);

                                  case 2:
                                    orderTaxon = _context7.sent;
                                    if (Object.entries(orderTaxon).length > 0 && orderTaxon.constructor === Object) orderTaxa.push(orderTaxon);
                                    return _context7.abrupt("return", orderTaxa);

                                  case 5:
                                  case "end":
                                    return _context7.stop();
                                }
                              }
                            }, _callee7, this);
                          }));

                          return function (_x12) {
                            return _ref9.apply(this, arguments);
                          };
                        }())));

                      case 1:
                      case "end":
                        return _context8.stop();
                    }
                  }
                }, _callee8, this);
              }));

              return function getOrderTaxa(_x11) {
                return _ref8.apply(this, arguments);
              };
            }();

            _context11.next = 25;
            return getOrderTaxa(orders);

          case 25:
            getFamilyNames = function getFamilyNames(item) {
              if (item.family && item.family.names) {
                return item.family.names[0].names ? item.family.names[0].names : item.family.names;
              } else {
                return '';
              }
            };

            findRank = function findRank(taxa, item, rank) {
              var taxonRank = item.taxonomy[rank.name.toLowerCase()];
              var taxon = taxa.length > 0 ? taxa.find(function (taxon) {
                return taxon.name === taxonRank;
              }) : null;
              return taxon || '';
            };

            collection.items.forEach( /*#__PURE__*/function () {
              var _ref10 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee9(item, index) {
                var names;
                return regeneratorRuntime.wrap(function _callee9$(_context9) {
                  while (1) {
                    switch (_context9.prev = _context9.next) {
                      case 0:
                        names = item.name.split(' ');
                        item.taxonomy.genus = names[0];
                        item.taxonomy.species = names[1];
                        item.genus = findRank(genusTaxa, item, ui_helpers_enum_helper__WEBPACK_IMPORTED_MODULE_5__.enums.taxon.GENUS);
                        item.family = findRank(familyTaxa, item, ui_helpers_enum_helper__WEBPACK_IMPORTED_MODULE_5__.enums.taxon.FAMILY);

                        if (item.family) {
                          item.family.names = getFamilyNames(item);
                          item.family.vernacularName = item.family.names[0];
                        }

                        item.order = findRank(orderTaxa, item, ui_helpers_enum_helper__WEBPACK_IMPORTED_MODULE_5__.enums.taxon.ORDER);
                        item.snapIndex = index + 1;
                        item.id = item.eolId;
                        item.vernacularNames = ui_helpers_data_checking__WEBPACK_IMPORTED_MODULE_1__.itemProperties.getVernacularNames(item, config);
                        item.vernacularName = ui_helpers_data_checking__WEBPACK_IMPORTED_MODULE_1__.itemProperties.getVernacularName(item, config);
                        item.name = names.slice(0, 2).join(' ');
                        item.questionIds = item.questionIds || [];

                      case 13:
                      case "end":
                        return _context9.stop();
                    }
                  }
                }, _callee9, this);
              }));

              return function (_x13, _x14) {
                return _ref10.apply(this, arguments);
              };
            }());

            loadTraitsInParallel = function loadTraitsInParallel(items) {
              return Promise.all(items.map( /*#__PURE__*/function () {
                var _ref11 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee10(item) {
                  var itemTraits;
                  return regeneratorRuntime.wrap(function _callee10$(_context10) {
                    while (1) {
                      switch (_context10.prev = _context10.next) {
                        case 0:
                          _context10.next = 2;
                          return api_firebase_firestore__WEBPACK_IMPORTED_MODULE_4__.firestore.getTraitsBySpeciesName(item.name);

                        case 2:
                          itemTraits = _context10.sent;
                          item.traits = itemTraits || {};
                          return _context10.abrupt("return", item);

                        case 5:
                        case "end":
                          return _context10.stop();
                      }
                    }
                  }, _callee10, this);
                }));

                return function (_x15) {
                  return _ref11.apply(this, arguments);
                };
              }()));
            };

            _context11.next = 31;
            return loadTraitsInParallel(collection.items);

          case 31:
            collection.itemIndex = 0;
            collection.glossary = [].concat(_toConsumableArray(Array.from(new Set(collection.items.map(function (item) {
              return item.iconicTaxon;
            })))), ['common']);
            _context11.next = 35;
            return collection;

          case 35:
            return _context11.abrupt("return", _context11.sent);

          case 36:
          case "end":
            return _context11.stop();
        }
      }
    }, _callee11, this);
  }));

  return function loadCollectionItemProperties(_x5, _x6) {
    return _ref3.apply(this, arguments);
  };
}();

var getSpeciesDetailsInParallel = /*#__PURE__*/function () {
  var _ref12 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee12(species) {
    return regeneratorRuntime.wrap(function _callee12$(_context12) {
      while (1) {
        switch (_context12.prev = _context12.next) {
          case 0:
            _context12.next = 2;
            return api_firebase_firestore__WEBPACK_IMPORTED_MODULE_4__.firestore.getSpeciesInParallel(species);

          case 2:
            return _context12.abrupt("return", _context12.sent);

          case 3:
          case "end":
            return _context12.stop();
        }
      }
    }, _callee12, this);
  }));

  return function getSpeciesDetailsInParallel(_x16) {
    return _ref12.apply(this, arguments);
  };
}();

var collectionHandler = {
  loadCollection: loadCollection,
  loadCollectionItemProperties: loadCollectionItemProperties,
  getSpeciesDetailsInParallel: getSpeciesDetailsInParallel
};

/***/ }),

/***/ "XTkL":
/*!*****************************************!*\
  !*** ./src/ui/helpers/data-checking.js ***!
  \*****************************************/
/*! namespace exports */
/*! export itemProperties [provided] [used] [could be renamed] */
/*! other exports [not provided] [unused] */
/*! runtime requirements: __webpack_require__, __webpack_exports__, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "itemProperties": () => /* binding */ itemProperties
/* harmony export */ });
/* harmony import */ var ramda__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ramda */ "CvH3");
/* harmony import */ var utils_utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! utils/utils */ "EHpu");
function _slicedToArray(arr, i) {
  return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();
}

function _nonIterableRest() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}

function _unsupportedIterableToArray(o, minLen) {
  if (!o) return;
  if (typeof o === "string") return _arrayLikeToArray(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor) n = o.constructor.name;
  if (n === "Map" || n === "Set") return Array.from(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
}

function _arrayLikeToArray(arr, len) {
  if (len == null || len > arr.length) len = arr.length;

  for (var i = 0, arr2 = new Array(len); i < len; i++) {
    arr2[i] = arr[i];
  }

  return arr2;
}

function _iterableToArrayLimit(arr, i) {
  if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return;
  var _arr = [];
  var _n = true;
  var _d = false;
  var _e = undefined;

  try {
    for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
      _arr.push(_s.value);

      if (i && _arr.length === i) break;
    }
  } catch (err) {
    _d = true;
    _e = err;
  } finally {
    try {
      if (!_n && _i["return"] != null) _i["return"]();
    } finally {
      if (_d) throw _e;
    }
  }

  return _arr;
}

function _arrayWithHoles(arr) {
  if (Array.isArray(arr)) return arr;
}




var getVernacularName = function getVernacularName(item, config) {
  var useShortForm = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
  var namePart = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 'vernacularName';

  try {
    var shortForm;

    if (useShortForm) {
      var englishShortForm = item.names.find(function (name) {
        return name.language === 'en' && name.shortForm;
      });
      englishShortForm = englishShortForm ? englishShortForm.shortForm : undefined;
      var languageSortForm = item.names.find(function (name) {
        return name.language === config.language && name.shortForm;
      });
      languageSortForm = languageSortForm ? languageSortForm.shortForm : undefined;
      shortForm = languageSortForm || englishShortForm;
    }

    if (shortForm) return shortForm;
    var englishNames = item.names.filter(function (name) {
      return name.language === 'en';
    });
    var english = englishNames.length > 0 ? englishNames[0][namePart] : 'Unknown';
    var names = item.names.filter(function (name) {
      return name.language === config.language;
    });
    var name = names.length > 0 ? names[0][namePart] : english;
    var capitalisedNames = name.split(' ');
    var capitalisedName;

    if (config.language === 'fr') {
      capitalisedName = utils_utils__WEBPACK_IMPORTED_MODULE_0__.utils.capitaliseFirst(capitalisedNames.join(' '));
    } else {
      capitalisedName = capitalisedNames.map(function (name) {
        return utils_utils__WEBPACK_IMPORTED_MODULE_0__.utils.capitaliseFirst(name);
      }).join(' ');
    }

    return capitalisedName;
  } catch (e) {
    console.error('Failing getting vernacular name for: ', item, 'error: ', e.message);
    return '';
  }
};

var getGenusName = function getGenusName(binomial) {
  return binomial.split(' ')[0];
};

var getSpeciesName = function getSpeciesName(binomial) {
  return binomial.split(' ')[1];
};

var getTaxonProp = function getTaxonProp(taxon, language, prop) {
  if (!taxon[prop]) return '';
  var propValue = taxon[prop].find(function (p) {
    return p.language === language;
  }) ? taxon[prop].find(function (p) {
    return p.language === language;
  }) : taxon[prop].find(function (p) {
    return p.language === 'en';
  });
  return propValue || '';
};

var getNestedTaxonProp = function getNestedTaxonProp(taxon, language, prop1, prop2, index) {
  if (!taxon || !taxon[prop1]) return '';
  var prop1Value = taxon[prop1].find(function (name) {
    return name.language === language;
  }) ? taxon[prop1].find(function (name) {
    return name.language === language;
  }) : taxon[prop1].find(function (name) {
    return name.language === 'en';
  });
  if (!prop1Value) return '';
  var prop2Value = prop1Value[prop2];
  if (!prop2Value) return '';
  var output = index ? prop2Value[index] : prop2Value;
  return output;
};

var trimLatinName = function trimLatinName(name) {
  var binomial = name;

  if (name.indexOf('.') < 0) {
    binomial = name.split(' ').map(function (n, i) {
      return i === 0 ? n.slice(0, 1).trim() + '.' : n.trim();
    }).join(' ');
  }

  return binomial;
};

var familyVernacularNames = function familyVernacularNames(name, language, taxa) {
  if (name === '') return;
  var taxon = taxa.find(function (taxon) {
    return taxon.name.toUpperCase() === name.toUpperCase();
  });
  if (!taxon) return;
  return taxon.names.find(function (name) {
    return name.language === language;
  }).names;
};

var getTrait = function getTrait(item, name, formatter) {
  if (!item.traits) return '';
  var trait;

  for (var _i = 0, _Object$entries = Object.entries(item.traits); _i < _Object$entries.length; _i++) {
    var _Object$entries$_i = _slicedToArray(_Object$entries[_i], 2),
        key = _Object$entries$_i[0],
        obj = _Object$entries$_i[1];

    if (key === name) {
      trait = obj.value;
    }
  }

  if (!trait) return '';
  if (!formatter) return trait;
  return formatter(trait);
};

var reducer = function reducer(acc, curr) {
  return acc + curr;
};

var getActiveTrait = function getActiveTrait(item, options) {
  var traitValues = options.map(function (option) {
    var traitName = option.name;
    var formatter = option.formatter;
    return getTrait(item, traitName, formatter);
  });
  return traitValues.reduce(reducer, '');
};

var vernacularNamesForItems = function vernacularNamesForItems(items, config) {
  var itemNames = items.map(function (item) {
    return item.names;
  });
  var vernaculars = itemNames.map(function (itemNames) {
    return itemNames.filter(function (name) {
      return name.language === config.language || name.language === 'en';
    });
  });
  if (vernaculars.length === 0) return [];
  vernaculars = vernaculars.map(function (vernacular) {
    var name = vernacular.find(function (v) {
      return v.language === config.language;
    });
    if (!name) name = vernacular.find(function (v) {
      return v.language === 'en';
    });
    if (!name) return '';
    return utils_utils__WEBPACK_IMPORTED_MODULE_0__.utils.capitaliseFirst(name.vernacularName);
  }).filter(function (v) {
    return v !== '';
  });
  return vernaculars;
};

var getVernacularNames = function getVernacularNames(item, config) {
  try {
    var names = item.names.filter(function (name) {
      return name.language === config.language;
    }).map(function (name) {
      return utils_utils__WEBPACK_IMPORTED_MODULE_0__.utils.capitaliseFirst(name.vernacularName);
    });
    return names;
  } catch (e) {
    console.error('Failing getting vernacular names for: ', item);
    return '';
  }
};

var answersFromList = function answersFromList(list, toInclude, number) {
  var answers = (0,ramda__WEBPACK_IMPORTED_MODULE_1__.default)(number - 1, list.filter(function (item) {
    return item !== toInclude;
  }));
  answers.push(toInclude);
  return utils_utils__WEBPACK_IMPORTED_MODULE_0__.utils.shuffleArray(answers);
};

var statsReducer = function statsReducer(obj, elem) {
  obj[elem] = obj[elem] || 0;
  obj[elem]++;
  return obj;
};

var getFamilyStats = function getFamilyStats(items) {
  return items.map(function (item) {
    return item.taxonomy.family;
  }).reduce(statsReducer, {});
};

var getFileNameFromImageUrl = function getFileNameFromImageUrl(url) {
  var pattern = /[\w:]+\.(jpe?g|png|gif|svg)/i;
  var filename = pattern.exec(url)[0];
  return filename;
};

var getRootTraitValue = function getRootTraitValue(traitValue) {
  var drop = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'end';
  var pattern = /[A-Z]+[^A-Z]*|[^A-Z]+/g;
  var parts = traitValue.match(pattern);
  var dropStarters = ['colour', 'shape'];
  dropStarters.forEach(function (starter) {
    if (traitValue.toLowerCase().indexOf(starter) > -1) {
      drop = 'start';
    }
  });
  var rootTraitValue = '';

  if (drop === 'start') {
    parts.forEach(function (part, index) {
      if (index === parts.length - 1) {
        rootTraitValue += part;
      }
    });
    rootTraitValue = rootTraitValue.charAt(0).toLowerCase() + rootTraitValue.slice(1);
  } else {
    parts.forEach(function (part, index) {
      if (index < parts.length - 1) {
        rootTraitValue += part;
      }
    });
  }

  return rootTraitValue;
};

var getImageRightsUrl = function getImageRightsUrl(url) {
  var filename = getFileNameFromImageUrl(url);
  var template = "https://en.wikipedia.org/w/api.php?action=query&prop=imageinfo&iiprop=extmetadata&titles=File:".concat(filename, "&format=json");
  return template;
};

var itemProperties = {
  getVernacularName: getVernacularName,
  getGenusName: getGenusName,
  getSpeciesName: getSpeciesName,
  getTaxonProp: getTaxonProp,
  getNestedTaxonProp: getNestedTaxonProp,
  trimLatinName: trimLatinName,
  familyVernacularNames: familyVernacularNames,
  getTrait: getTrait,
  getActiveTrait: getActiveTrait,
  vernacularNamesForItems: vernacularNamesForItems,
  getVernacularNames: getVernacularNames,
  answersFromList: answersFromList,
  getFamilyStats: getFamilyStats,
  getFileNameFromImageUrl: getFileNameFromImageUrl,
  getImageRightsUrl: getImageRightsUrl,
  getRootTraitValue: getRootTraitValue
};

/***/ }),

/***/ "DXx0":
/*!***************************************!*\
  !*** ./src/ui/helpers/enum-helper.js ***!
  \***************************************/
/*! namespace exports */
/*! export enums [provided] [used] [could be renamed] */
/*! other exports [not provided] [unused] */
/*! runtime requirements: __webpack_require__, __webpack_exports__, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "enums": () => /* binding */ enums
/* harmony export */ });
/* harmony import */ var enumify__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! enumify */ "RjFl");
function _typeof(obj) {
  "@babel/helpers - typeof";

  if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
    _typeof = function _typeof(obj) {
      return typeof obj;
    };
  } else {
    _typeof = function _typeof(obj) {
      return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
    };
  }

  return _typeof(obj);
}

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

function _inherits(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function");
  }

  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      writable: true,
      configurable: true
    }
  });
  if (superClass) _setPrototypeOf(subClass, superClass);
}

function _setPrototypeOf(o, p) {
  _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
    o.__proto__ = p;
    return o;
  };

  return _setPrototypeOf(o, p);
}

function _createSuper(Derived) {
  var hasNativeReflectConstruct = _isNativeReflectConstruct();

  return function _createSuperInternal() {
    var Super = _getPrototypeOf(Derived),
        result;

    if (hasNativeReflectConstruct) {
      var NewTarget = _getPrototypeOf(this).constructor;

      result = Reflect.construct(Super, arguments, NewTarget);
    } else {
      result = Super.apply(this, arguments);
    }

    return _possibleConstructorReturn(this, result);
  };
}

function _possibleConstructorReturn(self, call) {
  if (call && (_typeof(call) === "object" || typeof call === "function")) {
    return call;
  }

  return _assertThisInitialized(self);
}

function _assertThisInitialized(self) {
  if (self === void 0) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return self;
}

function _isNativeReflectConstruct() {
  if (typeof Reflect === "undefined" || !Reflect.construct) return false;
  if (Reflect.construct.sham) return false;
  if (typeof Proxy === "function") return true;

  try {
    Date.prototype.toString.call(Reflect.construct(Date, [], function () {}));
    return true;
  } catch (e) {
    return false;
  }
}

function _getPrototypeOf(o) {
  _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {
    return o.__proto__ || Object.getPrototypeOf(o);
  };
  return _getPrototypeOf(o);
}



var lessonState = /*#__PURE__*/function (_Enum) {
  _inherits(lessonState, _Enum);

  var _super = _createSuper(lessonState);

  function lessonState() {
    _classCallCheck(this, lessonState);

    return _super.apply(this, arguments);
  }

  return lessonState;
}(enumify__WEBPACK_IMPORTED_MODULE_0__.Enum);

;
lessonState.initEnum(['CREATE_LESSON', 'BEGIN_LESSON', 'BEGIN_OR_RESUME_LESSON', 'PAUSE_LESSON', 'RESUME_LESSON', 'NEXT_ROUND', 'BEGIN_INTRO', 'REVIEW_SUMMARY', 'UPDATE_COLLECTION', // required? use set active collection
'GET_LESSON_STATE', 'ADD_SPECIES_TO_COLLECTION', 'SAVE_LESSON_PROGRESS', 'RENDER_SPECIES_LIST']);

var navigation = /*#__PURE__*/function (_Enum2) {
  _inherits(navigation, _Enum2);

  var _super2 = _createSuper(navigation);

  function navigation() {
    _classCallCheck(this, navigation);

    return _super2.apply(this, arguments);
  }

  return navigation;
}(enumify__WEBPACK_IMPORTED_MODULE_0__.Enum);

;
navigation.initEnum(['LANDSCAPE_HOME', 'SETTINGS', 'LESSONS', 'LESSON', 'GLOSSARY', 'EMAIL', 'INFO', 'LOGIN', 'LANGUAGE', 'QUIZ']);

var taxon = /*#__PURE__*/function (_Enum3) {
  _inherits(taxon, _Enum3);

  var _super3 = _createSuper(taxon);

  function taxon() {
    _classCallCheck(this, taxon);

    return _super3.apply(this, arguments);
  }

  return taxon;
}(enumify__WEBPACK_IMPORTED_MODULE_0__.Enum);

;
taxon.initEnum(['KINGDOM', 'PHYLUM', 'ORDER', 'FAMILY', 'GENUS', 'SPECIES']);

var guideType = /*#__PURE__*/function (_Enum4) {
  _inherits(guideType, _Enum4);

  var _super4 = _createSuper(guideType);

  function guideType() {
    _classCallCheck(this, guideType);

    return _super4.apply(this, arguments);
  }

  return guideType;
}(enumify__WEBPACK_IMPORTED_MODULE_0__.Enum);

;
guideType.initEnum(['LOCATION', 'INAT', 'PICKER']);

var guideMode = /*#__PURE__*/function (_Enum5) {
  _inherits(guideMode, _Enum5);

  var _super5 = _createSuper(guideMode);

  function guideMode() {
    _classCallCheck(this, guideMode);

    return _super5.apply(this, arguments);
  }

  return guideMode;
}(enumify__WEBPACK_IMPORTED_MODULE_0__.Enum);

;
guideMode.initEnum(['STATIC', 'DYNAMIC']);

var nextStep = /*#__PURE__*/function (_Enum6) {
  _inherits(nextStep, _Enum6);

  var _super6 = _createSuper(nextStep);

  function nextStep() {
    _classCallCheck(this, nextStep);

    return _super6.apply(this, arguments);
  }

  return nextStep;
}(enumify__WEBPACK_IMPORTED_MODULE_0__.Enum);

;
nextStep.initEnum(['NEXT_ITEM', 'NEXT_LAYOUT', 'NEXT_LESSON', 'NEXT_ROUND']);

var quickFireType = /*#__PURE__*/function (_Enum7) {
  _inherits(quickFireType, _Enum7);

  var _super7 = _createSuper(quickFireType);

  function quickFireType() {
    _classCallCheck(this, quickFireType);

    return _super7.apply(this, arguments);
  }

  return quickFireType;
}(enumify__WEBPACK_IMPORTED_MODULE_0__.Enum);

;
quickFireType.initEnum(['DEFINITION', 'REVERSE_DEFINITION', 'TEXT_ENTRY']);

var quickFireStep = /*#__PURE__*/function (_Enum8) {
  _inherits(quickFireStep, _Enum8);

  var _super8 = _createSuper(quickFireStep);

  function quickFireStep() {
    _classCallCheck(this, quickFireStep);

    return _super8.apply(this, arguments);
  }

  return quickFireStep;
}(enumify__WEBPACK_IMPORTED_MODULE_0__.Enum);

;
quickFireStep.initEnum(['GLOSSARY', 'FILTERS', 'QUESTIONS']);

var userEvent = /*#__PURE__*/function (_Enum9) {
  _inherits(userEvent, _Enum9);

  var _super9 = _createSuper(userEvent);

  function userEvent() {
    _classCallCheck(this, userEvent);

    return _super9.apply(this, arguments);
  }

  return userEvent;
}(enumify__WEBPACK_IMPORTED_MODULE_0__.Enum);

;
userEvent.initEnum(['DEFAULT', 'START_LESSON', 'START_LESSON_REVIEW', 'START_TERM_REVIEW', 'EDIT_LESSON', 'TOGGLE_SPECIES_LIST', 'PLAY_LESSON_VIDEO', 'RETURN_LESSONS']);

var deckState = /*#__PURE__*/function (_Enum10) {
  _inherits(deckState, _Enum10);

  var _super10 = _createSuper(deckState);

  function deckState() {
    _classCallCheck(this, deckState);

    return _super10.apply(this, arguments);
  }

  return deckState;
}(enumify__WEBPACK_IMPORTED_MODULE_0__.Enum);

;
deckState.initEnum(['BEGIN', 'SCORE', 'END']);
var enums = {
  lessonState: lessonState,
  navigation: navigation,
  taxon: taxon,
  guideType: guideType,
  guideMode: guideMode,
  nextStep: nextStep,
  quickFireType: quickFireType,
  quickFireStep: quickFireStep,
  userEvent: userEvent,
  deckState: deckState
};

/***/ }),

/***/ "XBIT":
/*!*******************************************!*\
  !*** ./src/ui/helpers/logging-handler.js ***!
  \*******************************************/
/*! namespace exports */
/*! export logAPIError [provided] [used] [could be renamed] */
/*! export logError [provided] [used] [could be renamed] */
/*! export snapLog [provided] [used] [could be renamed] */
/*! other exports [not provided] [unused] */
/*! runtime requirements: __webpack_exports__, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "snapLog": () => /* binding */ snapLog,
/* harmony export */   "logError": () => /* binding */ logError,
/* harmony export */   "logAPIError": () => /* binding */ logAPIError
/* harmony export */ });
// https://developer.mozilla.org/en-US/docs/Web/API/console#Outputting_text_to_the_console
// import { object } from "firebase-functions/lib/providers/storage";
var snapLog = function snapLog(msg, obj) {
  // console.log('SECRET_KEY: ', process.env.SECRET_KEY);
  // console.log('process.env.NODE_ENV: ', process.env.NODE_ENV);
  var css = 'background: #222; color: #bada55; padding: 5px; margin-right: 5px;';
  if (Array.isArray(obj)) obj = {
    obj: obj
  };
  obj ? console.log("%c".concat(msg, " %o"), css, obj) : console.log("%c".concat(msg, ": ").concat(obj), css);
};
var logError = function logError(source, e) {
  var css = 'background: #222; color: #fff; padding: 5px; margin-right: 5px;';
  var output;
  if (Array.isArray(source)) source = {
    source: source
  }; // if(source === typeof(object)) {
  //   output = `%cError: ${e.message} at %o`;
  //   console.log(output, source, css);
  // } else {
  //   output = `%cError: ${e.message} at ${source}`;
  //   console.log(output, css);
  // }
};
var logAPIError = function logAPIError(call, e) {
  var source = "Firebase ".concat(call, " error");
  logError(source, e);
};

/***/ }),

/***/ "xNSC":
/*!**************************************!*\
  !*** ./src/ui/helpers/templating.js ***!
  \**************************************/
/*! namespace exports */
/*! export renderTemplate [provided] [used] [could be renamed] */
/*! other exports [not provided] [unused] */
/*! runtime requirements: __webpack_exports__, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "renderTemplate": () => /* binding */ renderTemplate
/* harmony export */ });
// https://github.com/jcgregorio/stamp/wiki
var Stamp = Stamp || {};

(function (ns) {
  ns.Context = function () {};

  ns.Context.prototype["import"] = function (id) {
    return document.importNode(this.doc.querySelector('#' + id).content, true);
  };

  var re = /{{\s([\w\.\^]+)\s}}/g;

  function filterState(address, state) {
    var mystate = state;

    for (var i = 0, len = address.length; i < len; i++) {
      var a = address[i];

      if (a in mystate) {
        mystate = mystate[a];
      } else if (mystate.hasAttribute && mystate.hasAttribute(a)) {
        mystate = mystate.getAttribute(a);
      } else {
        throw a + " is not a valid property of " + JSON.stringify(mystate);
      }
    }

    return mystate;
  }

  function ssplice(str, index, count, add) {
    return str.slice(0, index) + add + str.slice(index + count);
  }

  var match;

  function addressOf(s) {
    if ((match = re.exec(s)) != null) {
      return match[1].split(".");
    } else {
      return null;
    }
  }

  function expandString(s, state) {
    var match;
    var matches = [];
    re.exec("");

    while ((match = re.exec(s)) != null) {
      matches.push(match);
    }

    for (var i = matches.length - 1; i >= 0; i--) {
      match = matches[i];
      var address = match[1].split(".");
      var m = filterState(address, state);
      s = ssplice(s, match.index, match[0].length, m);
    }

    if (matches.length) {
      return s;
    }

    return null;
  }

  function cloneAllNodes(a) {
    var clones = [];

    for (var i = 0, len = a.length; i < len; i++) {
      if (a[i].nodeName == "TEMPLATE") {
        clones.push(a[i].content.cloneNode(true));
      } else {
        clones.push(a[i].cloneNode(true));
      }
    }

    return clones;
  }

  function appendChildren(ele, nodes) {
    for (var i = 0, len = nodes.length; i < len; i++) {
      ele.appendChild(nodes[i]);
    }
  }

  function removeChildren(ele) {
    ele.innerHTML = "";
  }

  function replaceChildren(ele, nodes) {
    ele.innerHTML = "";
    appendChildren(ele, nodes);
  }

  function expand(ele, state) {
    if (ele.nodeName === "#text") {
      m = expandString(ele.textContent, state);

      if (m != null) {
        ele.textContent = m;
      }

      return ele;
    }

    if (!Array.isArray(ele)) {
      ele = [ele];
    }

    for (var j = 0, len = ele.length; j < len; j++) {
      var e = ele[j];
      var processChildren = true;

      if (e.nodeName === "#text") {
        m = expandString(e.textContent, state);

        if (m != null) {
          e.textContent = m;
        }
      } else {
        if (e.attributes != undefined) {
          for (var i = e.attributes.length - 1; i >= 0; i--) {
            var attr = e.attributes[i];

            if (attr.name.indexOf('data-repeat') === 0) {
              processChildren = false;
              var parts = attr.name.split('-');

              if (parts.length !== 3 && parts.length !== 4) {
                throw "Repeat format is data-repeat-<name>[-<iterName>]. Got " + attr.name;
              }

              var name = parts[2];
              var iterName = parts[3];
              var tpl = [];

              while (e.firstChild) {
                tpl.push(e.removeChild(e.firstChild));
              }

              var address = [attr.value];

              if (attr.value.indexOf("}}") !== -1) {
                address = addressOf(attr.value);
              }

              if (address === null) {
                throw attr.value + " doesn't contain an address.";
              }

              var childState = filterState(address, state);
              var instanceState = {
                "^": state
              };

              if (Object.prototype.toString.call(childState) === '[object Array]') {
                iterName = iterName || "i";

                for (var k = 0; k < childState.length; k++) {
                  var cl = cloneAllNodes(tpl);
                  instanceState[name] = childState[k];
                  instanceState[iterName] = k;
                  expand(cl, instanceState);
                  appendChildren(e, cl);
                }
              } else {
                iterName = iterName || "key";
                var keys = Object.keys(childState).sort();

                for (var m = 0; m < keys.length; m++) {
                  var key = keys[m];
                  var cl = cloneAllNodes(tpl);
                  instanceState[name] = childState[key];
                  instanceState[iterName] = key;
                  expand(cl, instanceState);
                  appendChildren(e, cl);
                }
              }

              e.removeAttribute(attr.name);
            } else {
              m = expandString(attr.value, state);

              if (m != null) {
                var name = attr.name;

                if (name.charAt(name.length - 1) == "-") {
                  e.removeAttribute(attr.name);
                  e.setAttribute(attr.name.slice(0, -1), m);
                } else {
                  attr.value = m;
                }
              }
            }
          }
        }
      }

      if (processChildren) {
        var childEle = e.firstChild;

        while (childEle != null) {
          var nextSibling = childEle.nextSibling;

          if (childEle.nodeName == "TEMPLATE") {
            var replacement = expand(childEle.content.cloneNode(true), state);

            while (replacement[0].childNodes.length > 0) {
              e.insertBefore(replacement[0].firstChild, childEle);
            }

            e.removeChild(childEle);
          } else {
            expand(childEle, state);
          }

          childEle = nextSibling;
        }
      }
    }

    return ele;
  }

  ;

  function expandInto(target, ele, state) {
    replaceChildren(target, expand(ele, state));
  }

  ns.appendChildren = appendChildren;
  ns.expand = expand;
  ns.expandInto = expandInto;
})(Stamp);

var renderTemplate = function renderTemplate(context, content, parent, clone) {
  var contentClone = clone || document.importNode(content, true);
  var ctx = new Stamp.Context();
  var expanded = Stamp.expand(contentClone, context);
  Stamp.appendChildren(parent, expanded);
};

/***/ }),

/***/ "EHpu":
/*!****************************!*\
  !*** ./src/utils/utils.js ***!
  \****************************/
/*! namespace exports */
/*! export utils [provided] [used] [could be renamed] */
/*! other exports [not provided] [unused] */
/*! runtime requirements: __webpack_exports__, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "utils": () => /* binding */ utils
/* harmony export */ });
function _typeof(obj) {
  "@babel/helpers - typeof";

  if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
    _typeof = function _typeof(obj) {
      return typeof obj;
    };
  } else {
    _typeof = function _typeof(obj) {
      return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
    };
  }

  return _typeof(obj);
}

function _toConsumableArray(arr) {
  return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread();
}

function _nonIterableSpread() {
  throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}

function _unsupportedIterableToArray(o, minLen) {
  if (!o) return;
  if (typeof o === "string") return _arrayLikeToArray(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor) n = o.constructor.name;
  if (n === "Map" || n === "Set") return Array.from(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
}

function _iterableToArray(iter) {
  if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter);
}

function _arrayWithoutHoles(arr) {
  if (Array.isArray(arr)) return _arrayLikeToArray(arr);
}

function _arrayLikeToArray(arr, len) {
  if (len == null || len > arr.length) len = arr.length;

  for (var i = 0, arr2 = new Array(len); i < len; i++) {
    arr2[i] = arr[i];
  }

  return arr2;
}

Array.prototype.concatAll = function () {
  var results = [];
  this.forEach(function (subArray) {
    subArray.forEach(function (element) {
      results.push(element);
    });
  });
  return results;
};

var encodeQuery = function encodeQuery(q) {
  if (q === undefined) return q;
  if (Number.isInteger(q)) return q;
  return encodeURIComponent(q.trim());
};

var timer = function timer(sink, delay) {
  var id = null;
  Bacon.fromBinder(function () {
    id = setInterval(function () {
      sink();
    }, delay);
  }).onValue(function (element) {//
  });
  return id;
};

function intervalTimer(sink, delay) {
  var timerId;

  this.pause = function () {
    window.clearInterval(timerId);
  };

  this.resume = function () {
    window.clearInterval(timerId);
    timerId = timer(sink, delay);
  };

  this.getId = function () {
    return timerId;
  };

  this.resume();
  return this;
}

;

var shuffleArray = function shuffleArray(array) {
  // Check against https://bost.ocks.org/mike/shuffle/ Fisher–Yates Shuffle
  if (!array || array.length === 0) return;
  var currentIndex = array.length,
      temporaryValue,
      randomIndex; // While there remain elements to shuffle...

  while (0 !== currentIndex) {
    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1; // And swap it with the current element.

    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return _toConsumableArray(array); // return (arr
  //   .map(a => [Math.random(), a])
  //   .sort((a, b) => a[0] - b[0])
  //   .map(a => a[1]))
};

var randomiseSelection = function randomiseSelection(source, required) {
  var zeroBased = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

  var r = function r(selection) {
    var arr = shuffleArray(source);
    selection = selection.concat(arr.map(function (item, index) {
      if (index + selection.length < required) {
        return zeroBased ? --item : item;
      }
    })).filter(function (item) {
      return item !== undefined;
    });
    return selection.length < required ? r(selection) : selection;
  };

  return r([]);
};

var onlyUnique = function onlyUnique(value, index, self) {
  return self.indexOf(value) === index;
};

var sortBy = function sortBy(arr, prop) {
  var dir = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'asc';
  return dir === 'asc' ? arr.sort(function (a, b) {
    return parseFloat(a[prop]) - parseFloat(b[prop]);
  }) : arr.sort(function (a, b) {
    return parseFloat(b[prop]) - parseFloat(a[prop]);
  });
};

var sortAlphabeticallyBy = function sortAlphabeticallyBy(arr, prop) {
  arr.sort(function (a, b) {
    if (a[prop] < b[prop]) return -1;
    if (a[prop] > b[prop]) return 1;
    return 0;
  });
  return arr;
};

var calcItemIndex = function calcItemIndex(offSet, moduleSize, index) {
  var itemIndex = (offSet + index) % moduleSize === 0 ? offSet : offSet + (offSet + index) % moduleSize;
  return itemIndex;
};

var capitaliseFirst = function capitaliseFirst(str) {
  var text = str.substr(0, 1).toUpperCase() + str.substr(1).toLowerCase();
  return text;
};

var capitaliseAll = function capitaliseAll(str) {
  var text = str.toLowerCase().split(' ').map(function (s) {
    return s.charAt(0).toUpperCase() + s.substring(1);
  }).join(' ');
  return text;
};

var getCellValue = function getCellValue(tr, idx, headerSortIndex, wide) {
  var children = tr.children;

  if (!wide) {
    children = _toConsumableArray(tr.children).filter(function (child) {
      return _toConsumableArray(child.classList).join('').indexOf('wide-screen') === -1;
    });
  }

  var valueToSortOn = children[idx].dataset.snapIndex || children[idx].querySelector('button') && children[idx].querySelector('button').dataset.vernacularName || children[idx].querySelector('button') && children[idx].querySelector('button').dataset.name || children[idx].children[headerSortIndex].innerText || children[idx].innerText || children[idx].classList[0] || children[idx].textContent;
  return valueToSortOn;
};

var comparer = function comparer(idx, asc, headerSortIndex, wide) {
  return function (a, b) {
    return function (v1, v2) {
      var isNumericallyComparible = v1 !== '' && v2 !== '' && !isNaN(v1) && !isNaN(v2);
      return isNumericallyComparible ? v1 - v2 : v1.toString().localeCompare(v2.toString());
    }(getCellValue(asc ? a : b, idx, headerSortIndex, wide), getCellValue(asc ? b : a, idx, headerSortIndex, wide));
  };
}; // https://stackoverflow.com/questions/14267781/sorting-html-table-with-javascript/14268260


var makeSortable = function makeSortable(document, callback, wide) {
  Array.from(document.querySelectorAll('th > span')).forEach(function (sp) {
    sp.addEventListener('click', function () {
      var headerSortIndex = this.innerText.toUpperCase() === 'ORDER' ? 1 : 0;
      var names = [];
      var th = this.parentElement;
      if (th.classList[0] === 'not-sortable') return;
      var table = th.closest('table');
      var tbody = table.querySelector('tbody');
      var footer = table.querySelector('tfoot');
      snapLog('Array.from(tbody.querySelectorAll("tr")): ', Array.from(tbody.querySelectorAll('tr')));
      Array.from(tbody.querySelectorAll('tr')).sort(comparer(Array.from(th.parentNode.children).indexOf(th), this.asc = !this.asc, headerSortIndex, wide)).forEach(function (tr) {
        if (tr !== footer) {
          tbody.appendChild(tr);
          names.push(tr.cells[0].id);
        }
      });
      callback(names);
    });
  });
};

var flatten = function flatten(array) {
  var flattenedArray = array.reduce(function (accumulator, currentValue) {
    return accumulator.concat(currentValue);
  }, []);
  return flattenedArray;
};

var getObservableMonths = function getObservableMonths(date) {
  var span = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 3;

  var daysAway = function daysAway(when, days) {
    var dateFromDays = date;
    var direction = when === 'future' ? 1 : -1;
    dateFromDays.setDate(dateFromDays.getDate() + direction * days);
    return dateFromDays;
  };

  var startMonth = daysAway('past', 30).getMonth();
  var thisMonth = date.getMonth() + 1;
  var endMonth = daysAway('future', 30).getMonth() + 1;

  var getMonthName = function getMonthName(month) {
    var exampleDate = new Date(2000, month, 1);
    var name = exampleDate.toLocaleString('en-uk', {
      month: 'long'
    });
    return name;
  };

  var months = [{
    index: startMonth,
    name: getMonthName(startMonth)
  }, {
    index: thisMonth,
    name: getMonthName(thisMonth)
  }, {
    index: endMonth,
    name: getMonthName(endMonth)
  }];
  return months;
};

var getRandomInt = function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
};

var createSessionToken = function createSessionToken() {
  // uuidv4
  // https://stackoverflow.com/questions/105034/create-guid-uuid-in-javascript#answer-2117523
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    var r = Math.random() * 16 | 0,
        v = c == 'x' ? r : r & 0x3 | 0x8;
    return v.toString(16);
  });
};

var getRandomObjectProperty = function getRandomObjectProperty(obj) {
  if (Object.keys(obj).length === 0 && obj.constructor === Object) return {};
  var keys = Object.keys(obj);
  var index = Math.floor(Math.random() * keys.length);
  var key = keys[index];
  return {
    key: key,
    value: obj[key]
  };
};

var toCamelCase = function toCamelCase(sentenceCase) {
  if (sentenceCase === undefined) return '';
  var out = "";
  sentenceCase.split(" ").forEach(function (el, idx) {
    var add = el.toLowerCase();
    out += idx === 0 ? add : add[0].toUpperCase() + add.slice(1);
  });
  return out;
};

var fromCamelCase = function fromCamelCase(str) {
  if (str === undefined) return '';
  return str.replace(/([a-z])([A-Z])/g, '$1 $2').toLowerCase();
};

var parseToLowerCase = function parseToLowerCase(value) {
  if (value === undefined || value === null) return '';else if (_typeof(value) === 'object') return value;else return !!value ? value.toLowerCase() : '';
};

var hasClass = function hasClass(elem, className) {
  if (!elem) return false;

  var classArray = _toConsumableArray(elem.classList);

  var isTrue = classArray.find(function (c) {
    return c === className;
  });
  return !!isTrue;
};

var toggleClass = function toggleClass(elem, className) {
  if (!elem) return;
  hasClass(elem, className) ? elem.classList.remove(className) : elem.classList.add(className);
};

var removeClass = function removeClass(elem, className) {
  if (hasClass(elem, className)) {
    elem.classList.forEach(function (c) {
      if (c === className) {
        elem.classList.remove(c);
      }
    });
  }
};

var convertTraitKeyToUnitKey = function convertTraitKeyToUnitKey(traitKey) {
  var conversion = traitKey.replace('_', ' ');
  return toCamelCase(conversion);
};

var utils = {
  encodeQuery: encodeQuery,
  timer: timer,
  shuffleArray: shuffleArray,
  randomiseSelection: randomiseSelection,
  onlyUnique: onlyUnique,
  sortBy: sortBy,
  sortAlphabeticallyBy: sortAlphabeticallyBy,
  calcItemIndex: calcItemIndex,
  capitaliseFirst: capitaliseFirst,
  capitaliseAll: capitaliseAll,
  makeSortable: makeSortable,
  flatten: flatten,
  getObservableMonths: getObservableMonths,
  getRandomInt: getRandomInt,
  createSessionToken: createSessionToken,
  getRandomObjectProperty: getRandomObjectProperty,
  toCamelCase: toCamelCase,
  fromCamelCase: fromCamelCase,
  parseToLowerCase: parseToLowerCase,
  hasClass: hasClass,
  removeClass: removeClass,
  toggleClass: toggleClass,
  convertTraitKeyToUnitKey: convertTraitKeyToUnitKey
};

/***/ }),

/***/ "iz/u":
/*!**************************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./node_modules/sass-loader/dist/cjs.js!./src/admin/css/admin.css ***!
  \**************************************************************************************************************/
/*! unknown exports (runtime-defined) */
/*! exports [maybe provided (runtime-defined)] [maybe used (runtime-defined)] */
/*! runtime requirements: __webpack_exports__, module, __webpack_require__, module.id */
/***/ ((module, exports, __webpack_require__) => {

// Imports
var ___CSS_LOADER_API_IMPORT___ = __webpack_require__(/*! ../../../node_modules/css-loader/dist/runtime/api.js */ "QjQd");
exports = ___CSS_LOADER_API_IMPORT___(false);
// Module
exports.push([module.id, ".sub.container {\n  width: 100%;\n  margin: 2rem 0 0 0 !important;\n  padding: 0; }\n\n.input-field {\n  margin-top: 0;\n  padding: 0 1rem 0 !important;\n  font-size: .9rem;\n  margin-bottom: .5rem; }\n\n.input {\n  border-bottom: 1px solid #63855f !important; }\n\n.dropdown-content li > a, .dropdown-content li > span {\n  color: #576163; }\n\n.images {\n  display: grid;\n  grid-template-columns: 1fr 1fr 1fr 1fr 1fr;\n  min-height: 80vh; }\n\n.hide-important, .hide-empty {\n  display: none !important; }\n\n.input-field.col label {\n  left: 0; }\n\n.trait-key .input-field.col label {\n  left: .25rem; }\n\n.autocomplete-options-container {\n  z-index: 9999;\n  position: absolute;\n  padding: 0 .25rem;\n  color: #323232;\n  background-color: #fafafa;\n  letter-spacing: .04rem;\n  border: .05rem solid lightgray;\n  text-align: left;\n  overflow-y: scroll; }\n\n.autocomplete-options-container {\n  width: initial; }\n\n.autocomplete-options-container > div {\n  padding: .25rem; }\n\n.autocomplete-options-container .selected {\n  color: white;\n  background-color: rgba(0, 0, 0, 0.8); }\n\n.async-progress {\n  font-size: .9rem;\n  padding: 1rem 0 !important;\n  line-height: 1.15rem; }\n\n.trait-repeater {\n  display: grid;\n  grid-gap: 2rem;\n  grid-template-columns: 1fr 1fr 1fr 1fr; }\n\n.trait-repeater li {\n  width: 100%;\n  padding: 0 .75rem; }\n\ninput[type=text]:not(.browser-default)[readonly=\"readonly\"] {\n  border: none; }\n\nsvg {\n  pointer-events: none; }\n\n.chkSafety, .chkStar {\n  margin: 0 0 0 1rem; }\n\ninput[type=text]:not(.browser-default)[readonly=\"readonly\"] + label {\n  color: rgba(0, 0, 0, 0.7); }\n\ninput[type=text]:not(.browser-default)[readonly=\"readonly\"] {\n  color: rgba(0, 0, 0, 0.6); }\n\n/* to move/copy */\n.relationship-card .cols {\n  display: flex; }\n\n.relationship-card .cols > div:nth-child(1) {\n  margin: 0 1rem 0 0; }\n\nbutton svg {\n  font-size: .8rem; }\n\n.alert {\n  color: rgba(183, 12, 21, 0.8);\n  font-size: .8rem; }\n\n.row-centered {\n  display: flex !important;\n  align-items: center; }\n\n.feedback {\n  margin: 0 0 0 .5rem;\n  font-style: italic; }\n\n.input-field > input {\n  font-size: .9rem !important; }\n\n.input-field > label {\n  font-size: .9rem !important; }\n\n.input-field input[type=text]:focus {\n  border-bottom: 1px solid #000;\n  box-shadow: 0 1px 0 0 #000; }\n\ntextarea {\n  height: initial;\n  width: initial;\n  margin: 1rem 0 0 0;\n  padding: 0 .25rem; }\n\n/* Move to common fieldset */\n.side-by-side {\n  display: flex;\n  align-items: center; }\n\n.side-by-side > div:nth-child(1) {\n  margin-left: .5rem; }\n\nli svg {\n  font-size: .8rem; }\n\n.btn {\n  font-size: .9rem;\n  color: var(--snap-text-light);\n  background-color: var(--snap-collection);\n  text-transform: initial; }\n\n.btn:hover, .btn-large:hover, .btn-small:hover {\n  background-color: var(--snap-collection-light); }\n\nli a > i, li a > span {\n  pointer-events: none; }\n\n.collection-species {\n  margin: 0 1rem; }\n\n.collection-details {\n  background-color: var(--snap-block-light);\n  margin: 0 0 1rem -.5rem;\n  padding: .5rem; }\n\n.collection-details > div > span:nth-child(1) {\n  margin-right: .5rem; }\n\n.row {\n  margin: 0;\n  margin-bottom: 1rem; }\n\n.collection-container > .row {\n  margin: 0; }\n\nli.custom-control, li label {\n  width: 12rem;\n  width: fit-content;\n  font-size: .9rem; }\n\n.custom-control-label .underline-link {\n  text-transform: initial; }\n\nnav ul a {\n  padding: 0 .5rem;\n  display: initial; }\n\n#nav-mobile {\n  display: flex;\n  justify-content: space-evenly;\n  padding: 0; }\n\n.has-character-counter {\n  font-size: .9rem !important; }\n\n.edit-collection-species {\n  display: grid;\n  grid-template-columns: 16rem 1fr; }\n\n#input-collection {\n  font-size: .9rem; }\n\n.admin.container .modal {\n  bottom: initial;\n  width: 400px; }\n\n.selected-species-container > input {\n  width: 17rem; }\n\n.tabs {\n  margin: 0 0 2rem -.5rem; }\n\n.tabs, .tabs .tab {\n  line-height: 32px;\n  height: 32px; }\n\n.tabs .tab {\n  text-transform: initial; }\n\n.tabs .tab a {\n  color: var(--snap-text-dark-medium-dark);\n  background-color: var(--snap-block-light); }\n\n.tabs .tab a:hover, .tabs .tab a.active {\n  color: var(--snap-text-dark-medium-dark);\n  background-color: #fdf0f1; }\n\n.tabs .indicator {\n  height: 0; }\n\n.disabled svg {\n  pointer-events: none;\n  color: var(--snap-text-light); }\n\n.dropdown-content {\n  top: 4.5rem !important; }\n\nnav ul li {\n  text-align: center;\n  width: 150px; }\n\n@media (min-width: 1200px) {\n  .container {\n    max-width: 1400px; } }\n\n/* clashes between materialise versions */\n.MuiInput-underline:before, .MuiInput-underline:after {\n  border-bottom: none !important;\n  box-shadow: none !important; }\n", ""]);
// Exports
module.exports = exports;


/***/ }),

/***/ "mXK8":
/*!**********************************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./node_modules/sass-loader/dist/cjs.js!./src/admin/scss/materialize.scss ***!
  \**********************************************************************************************************************/
/*! unknown exports (runtime-defined) */
/*! exports [maybe provided (runtime-defined)] [maybe used (runtime-defined)] */
/*! runtime requirements: __webpack_exports__, module, __webpack_require__, module.id */
/***/ ((module, exports, __webpack_require__) => {

// Imports
var ___CSS_LOADER_API_IMPORT___ = __webpack_require__(/*! ../../../node_modules/css-loader/dist/runtime/api.js */ "QjQd");
exports = ___CSS_LOADER_API_IMPORT___(false);
// Module
exports.push([module.id, ".snapdragon-green {\n  background-color: #b3c5ae !important; }\n\n.snapdragon-green-text {\n  color: #b3c5ae !important; }\n\n.snapdragon-blue {\n  background-color: #b9c8cc !important; }\n\n.snapdragon-blue-text {\n  color: #b9c8cc !important; }\n\n.materialize-red {\n  background-color: #e51c23 !important; }\n\n.materialize-red-text {\n  color: #e51c23 !important; }\n\n.materialize-red.lighten-5 {\n  background-color: #fdeaeb !important; }\n\n.materialize-red-text.text-lighten-5 {\n  color: #fdeaeb !important; }\n\n.materialize-red.lighten-4 {\n  background-color: #f8c1c3 !important; }\n\n.materialize-red-text.text-lighten-4 {\n  color: #f8c1c3 !important; }\n\n.materialize-red.lighten-3 {\n  background-color: #f3989b !important; }\n\n.materialize-red-text.text-lighten-3 {\n  color: #f3989b !important; }\n\n.materialize-red.lighten-2 {\n  background-color: #ee6e73 !important; }\n\n.materialize-red-text.text-lighten-2 {\n  color: #ee6e73 !important; }\n\n.materialize-red.lighten-1 {\n  background-color: #ea454b !important; }\n\n.materialize-red-text.text-lighten-1 {\n  color: #ea454b !important; }\n\n.materialize-red.darken-1 {\n  background-color: #d0181e !important; }\n\n.materialize-red-text.text-darken-1 {\n  color: #d0181e !important; }\n\n.materialize-red.darken-2 {\n  background-color: #b9151b !important; }\n\n.materialize-red-text.text-darken-2 {\n  color: #b9151b !important; }\n\n.materialize-red.darken-3 {\n  background-color: #a21318 !important; }\n\n.materialize-red-text.text-darken-3 {\n  color: #a21318 !important; }\n\n.materialize-red.darken-4 {\n  background-color: #8b1014 !important; }\n\n.materialize-red-text.text-darken-4 {\n  color: #8b1014 !important; }\n\n.red {\n  background-color: #F44336 !important; }\n\n.red-text {\n  color: #F44336 !important; }\n\n.red.lighten-5 {\n  background-color: #FFEBEE !important; }\n\n.red-text.text-lighten-5 {\n  color: #FFEBEE !important; }\n\n.red.lighten-4 {\n  background-color: #FFCDD2 !important; }\n\n.red-text.text-lighten-4 {\n  color: #FFCDD2 !important; }\n\n.red.lighten-3 {\n  background-color: #EF9A9A !important; }\n\n.red-text.text-lighten-3 {\n  color: #EF9A9A !important; }\n\n.red.lighten-2 {\n  background-color: #E57373 !important; }\n\n.red-text.text-lighten-2 {\n  color: #E57373 !important; }\n\n.red.lighten-1 {\n  background-color: #EF5350 !important; }\n\n.red-text.text-lighten-1 {\n  color: #EF5350 !important; }\n\n.red.darken-1 {\n  background-color: #E53935 !important; }\n\n.red-text.text-darken-1 {\n  color: #E53935 !important; }\n\n.red.darken-2 {\n  background-color: #D32F2F !important; }\n\n.red-text.text-darken-2 {\n  color: #D32F2F !important; }\n\n.red.darken-3 {\n  background-color: #C62828 !important; }\n\n.red-text.text-darken-3 {\n  color: #C62828 !important; }\n\n.red.darken-4 {\n  background-color: #B71C1C !important; }\n\n.red-text.text-darken-4 {\n  color: #B71C1C !important; }\n\n.red.accent-1 {\n  background-color: #FF8A80 !important; }\n\n.red-text.text-accent-1 {\n  color: #FF8A80 !important; }\n\n.red.accent-2 {\n  background-color: #FF5252 !important; }\n\n.red-text.text-accent-2 {\n  color: #FF5252 !important; }\n\n.red.accent-3 {\n  background-color: #FF1744 !important; }\n\n.red-text.text-accent-3 {\n  color: #FF1744 !important; }\n\n.red.accent-4 {\n  background-color: #D50000 !important; }\n\n.red-text.text-accent-4 {\n  color: #D50000 !important; }\n\n.pink {\n  background-color: #e91e63 !important; }\n\n.pink-text {\n  color: #e91e63 !important; }\n\n.pink.lighten-5 {\n  background-color: #fce4ec !important; }\n\n.pink-text.text-lighten-5 {\n  color: #fce4ec !important; }\n\n.pink.lighten-4 {\n  background-color: #f8bbd0 !important; }\n\n.pink-text.text-lighten-4 {\n  color: #f8bbd0 !important; }\n\n.pink.lighten-3 {\n  background-color: #f48fb1 !important; }\n\n.pink-text.text-lighten-3 {\n  color: #f48fb1 !important; }\n\n.pink.lighten-2 {\n  background-color: #f06292 !important; }\n\n.pink-text.text-lighten-2 {\n  color: #f06292 !important; }\n\n.pink.lighten-1 {\n  background-color: #ec407a !important; }\n\n.pink-text.text-lighten-1 {\n  color: #ec407a !important; }\n\n.pink.darken-1 {\n  background-color: #d81b60 !important; }\n\n.pink-text.text-darken-1 {\n  color: #d81b60 !important; }\n\n.pink.darken-2 {\n  background-color: #c2185b !important; }\n\n.pink-text.text-darken-2 {\n  color: #c2185b !important; }\n\n.pink.darken-3 {\n  background-color: #ad1457 !important; }\n\n.pink-text.text-darken-3 {\n  color: #ad1457 !important; }\n\n.pink.darken-4 {\n  background-color: #880e4f !important; }\n\n.pink-text.text-darken-4 {\n  color: #880e4f !important; }\n\n.pink.accent-1 {\n  background-color: #ff80ab !important; }\n\n.pink-text.text-accent-1 {\n  color: #ff80ab !important; }\n\n.pink.accent-2 {\n  background-color: #ff4081 !important; }\n\n.pink-text.text-accent-2 {\n  color: #ff4081 !important; }\n\n.pink.accent-3 {\n  background-color: #f50057 !important; }\n\n.pink-text.text-accent-3 {\n  color: #f50057 !important; }\n\n.pink.accent-4 {\n  background-color: #c51162 !important; }\n\n.pink-text.text-accent-4 {\n  color: #c51162 !important; }\n\n.purple {\n  background-color: #9c27b0 !important; }\n\n.purple-text {\n  color: #9c27b0 !important; }\n\n.purple.lighten-5 {\n  background-color: #f3e5f5 !important; }\n\n.purple-text.text-lighten-5 {\n  color: #f3e5f5 !important; }\n\n.purple.lighten-4 {\n  background-color: #e1bee7 !important; }\n\n.purple-text.text-lighten-4 {\n  color: #e1bee7 !important; }\n\n.purple.lighten-3 {\n  background-color: #ce93d8 !important; }\n\n.purple-text.text-lighten-3 {\n  color: #ce93d8 !important; }\n\n.purple.lighten-2 {\n  background-color: #ba68c8 !important; }\n\n.purple-text.text-lighten-2 {\n  color: #ba68c8 !important; }\n\n.purple.lighten-1 {\n  background-color: #ab47bc !important; }\n\n.purple-text.text-lighten-1 {\n  color: #ab47bc !important; }\n\n.purple.darken-1 {\n  background-color: #8e24aa !important; }\n\n.purple-text.text-darken-1 {\n  color: #8e24aa !important; }\n\n.purple.darken-2 {\n  background-color: #7b1fa2 !important; }\n\n.purple-text.text-darken-2 {\n  color: #7b1fa2 !important; }\n\n.purple.darken-3 {\n  background-color: #6a1b9a !important; }\n\n.purple-text.text-darken-3 {\n  color: #6a1b9a !important; }\n\n.purple.darken-4 {\n  background-color: #4a148c !important; }\n\n.purple-text.text-darken-4 {\n  color: #4a148c !important; }\n\n.purple.accent-1 {\n  background-color: #ea80fc !important; }\n\n.purple-text.text-accent-1 {\n  color: #ea80fc !important; }\n\n.purple.accent-2 {\n  background-color: #e040fb !important; }\n\n.purple-text.text-accent-2 {\n  color: #e040fb !important; }\n\n.purple.accent-3 {\n  background-color: #d500f9 !important; }\n\n.purple-text.text-accent-3 {\n  color: #d500f9 !important; }\n\n.purple.accent-4 {\n  background-color: #aa00ff !important; }\n\n.purple-text.text-accent-4 {\n  color: #aa00ff !important; }\n\n.deep-purple {\n  background-color: #673ab7 !important; }\n\n.deep-purple-text {\n  color: #673ab7 !important; }\n\n.deep-purple.lighten-5 {\n  background-color: #ede7f6 !important; }\n\n.deep-purple-text.text-lighten-5 {\n  color: #ede7f6 !important; }\n\n.deep-purple.lighten-4 {\n  background-color: #d1c4e9 !important; }\n\n.deep-purple-text.text-lighten-4 {\n  color: #d1c4e9 !important; }\n\n.deep-purple.lighten-3 {\n  background-color: #b39ddb !important; }\n\n.deep-purple-text.text-lighten-3 {\n  color: #b39ddb !important; }\n\n.deep-purple.lighten-2 {\n  background-color: #9575cd !important; }\n\n.deep-purple-text.text-lighten-2 {\n  color: #9575cd !important; }\n\n.deep-purple.lighten-1 {\n  background-color: #7e57c2 !important; }\n\n.deep-purple-text.text-lighten-1 {\n  color: #7e57c2 !important; }\n\n.deep-purple.darken-1 {\n  background-color: #5e35b1 !important; }\n\n.deep-purple-text.text-darken-1 {\n  color: #5e35b1 !important; }\n\n.deep-purple.darken-2 {\n  background-color: #512da8 !important; }\n\n.deep-purple-text.text-darken-2 {\n  color: #512da8 !important; }\n\n.deep-purple.darken-3 {\n  background-color: #4527a0 !important; }\n\n.deep-purple-text.text-darken-3 {\n  color: #4527a0 !important; }\n\n.deep-purple.darken-4 {\n  background-color: #311b92 !important; }\n\n.deep-purple-text.text-darken-4 {\n  color: #311b92 !important; }\n\n.deep-purple.accent-1 {\n  background-color: #b388ff !important; }\n\n.deep-purple-text.text-accent-1 {\n  color: #b388ff !important; }\n\n.deep-purple.accent-2 {\n  background-color: #7c4dff !important; }\n\n.deep-purple-text.text-accent-2 {\n  color: #7c4dff !important; }\n\n.deep-purple.accent-3 {\n  background-color: #651fff !important; }\n\n.deep-purple-text.text-accent-3 {\n  color: #651fff !important; }\n\n.deep-purple.accent-4 {\n  background-color: #6200ea !important; }\n\n.deep-purple-text.text-accent-4 {\n  color: #6200ea !important; }\n\n.indigo {\n  background-color: #3f51b5 !important; }\n\n.indigo-text {\n  color: #3f51b5 !important; }\n\n.indigo.lighten-5 {\n  background-color: #e8eaf6 !important; }\n\n.indigo-text.text-lighten-5 {\n  color: #e8eaf6 !important; }\n\n.indigo.lighten-4 {\n  background-color: #c5cae9 !important; }\n\n.indigo-text.text-lighten-4 {\n  color: #c5cae9 !important; }\n\n.indigo.lighten-3 {\n  background-color: #9fa8da !important; }\n\n.indigo-text.text-lighten-3 {\n  color: #9fa8da !important; }\n\n.indigo.lighten-2 {\n  background-color: #7986cb !important; }\n\n.indigo-text.text-lighten-2 {\n  color: #7986cb !important; }\n\n.indigo.lighten-1 {\n  background-color: #5c6bc0 !important; }\n\n.indigo-text.text-lighten-1 {\n  color: #5c6bc0 !important; }\n\n.indigo.darken-1 {\n  background-color: #3949ab !important; }\n\n.indigo-text.text-darken-1 {\n  color: #3949ab !important; }\n\n.indigo.darken-2 {\n  background-color: #303f9f !important; }\n\n.indigo-text.text-darken-2 {\n  color: #303f9f !important; }\n\n.indigo.darken-3 {\n  background-color: #283593 !important; }\n\n.indigo-text.text-darken-3 {\n  color: #283593 !important; }\n\n.indigo.darken-4 {\n  background-color: #1a237e !important; }\n\n.indigo-text.text-darken-4 {\n  color: #1a237e !important; }\n\n.indigo.accent-1 {\n  background-color: #8c9eff !important; }\n\n.indigo-text.text-accent-1 {\n  color: #8c9eff !important; }\n\n.indigo.accent-2 {\n  background-color: #536dfe !important; }\n\n.indigo-text.text-accent-2 {\n  color: #536dfe !important; }\n\n.indigo.accent-3 {\n  background-color: #3d5afe !important; }\n\n.indigo-text.text-accent-3 {\n  color: #3d5afe !important; }\n\n.indigo.accent-4 {\n  background-color: #304ffe !important; }\n\n.indigo-text.text-accent-4 {\n  color: #304ffe !important; }\n\n.blue {\n  background-color: #2196F3 !important; }\n\n.blue-text {\n  color: #2196F3 !important; }\n\n.blue.lighten-5 {\n  background-color: #E3F2FD !important; }\n\n.blue-text.text-lighten-5 {\n  color: #E3F2FD !important; }\n\n.blue.lighten-4 {\n  background-color: #BBDEFB !important; }\n\n.blue-text.text-lighten-4 {\n  color: #BBDEFB !important; }\n\n.blue.lighten-3 {\n  background-color: #90CAF9 !important; }\n\n.blue-text.text-lighten-3 {\n  color: #90CAF9 !important; }\n\n.blue.lighten-2 {\n  background-color: #64B5F6 !important; }\n\n.blue-text.text-lighten-2 {\n  color: #64B5F6 !important; }\n\n.blue.lighten-1 {\n  background-color: #42A5F5 !important; }\n\n.blue-text.text-lighten-1 {\n  color: #42A5F5 !important; }\n\n.blue.darken-1 {\n  background-color: #1E88E5 !important; }\n\n.blue-text.text-darken-1 {\n  color: #1E88E5 !important; }\n\n.blue.darken-2 {\n  background-color: #1976D2 !important; }\n\n.blue-text.text-darken-2 {\n  color: #1976D2 !important; }\n\n.blue.darken-3 {\n  background-color: #1565C0 !important; }\n\n.blue-text.text-darken-3 {\n  color: #1565C0 !important; }\n\n.blue.darken-4 {\n  background-color: #0D47A1 !important; }\n\n.blue-text.text-darken-4 {\n  color: #0D47A1 !important; }\n\n.blue.accent-1 {\n  background-color: #82B1FF !important; }\n\n.blue-text.text-accent-1 {\n  color: #82B1FF !important; }\n\n.blue.accent-2 {\n  background-color: #448AFF !important; }\n\n.blue-text.text-accent-2 {\n  color: #448AFF !important; }\n\n.blue.accent-3 {\n  background-color: #2979FF !important; }\n\n.blue-text.text-accent-3 {\n  color: #2979FF !important; }\n\n.blue.accent-4 {\n  background-color: #2962FF !important; }\n\n.blue-text.text-accent-4 {\n  color: #2962FF !important; }\n\n.light-blue {\n  background-color: #03a9f4 !important; }\n\n.light-blue-text {\n  color: #03a9f4 !important; }\n\n.light-blue.lighten-5 {\n  background-color: #e1f5fe !important; }\n\n.light-blue-text.text-lighten-5 {\n  color: #e1f5fe !important; }\n\n.light-blue.lighten-4 {\n  background-color: #b3e5fc !important; }\n\n.light-blue-text.text-lighten-4 {\n  color: #b3e5fc !important; }\n\n.light-blue.lighten-3 {\n  background-color: #81d4fa !important; }\n\n.light-blue-text.text-lighten-3 {\n  color: #81d4fa !important; }\n\n.light-blue.lighten-2 {\n  background-color: #4fc3f7 !important; }\n\n.light-blue-text.text-lighten-2 {\n  color: #4fc3f7 !important; }\n\n.light-blue.lighten-1 {\n  background-color: #29b6f6 !important; }\n\n.light-blue-text.text-lighten-1 {\n  color: #29b6f6 !important; }\n\n.light-blue.darken-1 {\n  background-color: #039be5 !important; }\n\n.light-blue-text.text-darken-1 {\n  color: #039be5 !important; }\n\n.light-blue.darken-2 {\n  background-color: #0288d1 !important; }\n\n.light-blue-text.text-darken-2 {\n  color: #0288d1 !important; }\n\n.light-blue.darken-3 {\n  background-color: #0277bd !important; }\n\n.light-blue-text.text-darken-3 {\n  color: #0277bd !important; }\n\n.light-blue.darken-4 {\n  background-color: #01579b !important; }\n\n.light-blue-text.text-darken-4 {\n  color: #01579b !important; }\n\n.light-blue.accent-1 {\n  background-color: #80d8ff !important; }\n\n.light-blue-text.text-accent-1 {\n  color: #80d8ff !important; }\n\n.light-blue.accent-2 {\n  background-color: #40c4ff !important; }\n\n.light-blue-text.text-accent-2 {\n  color: #40c4ff !important; }\n\n.light-blue.accent-3 {\n  background-color: #00b0ff !important; }\n\n.light-blue-text.text-accent-3 {\n  color: #00b0ff !important; }\n\n.light-blue.accent-4 {\n  background-color: #0091ea !important; }\n\n.light-blue-text.text-accent-4 {\n  color: #0091ea !important; }\n\n.cyan {\n  background-color: #00bcd4 !important; }\n\n.cyan-text {\n  color: #00bcd4 !important; }\n\n.cyan.lighten-5 {\n  background-color: #e0f7fa !important; }\n\n.cyan-text.text-lighten-5 {\n  color: #e0f7fa !important; }\n\n.cyan.lighten-4 {\n  background-color: #b2ebf2 !important; }\n\n.cyan-text.text-lighten-4 {\n  color: #b2ebf2 !important; }\n\n.cyan.lighten-3 {\n  background-color: #80deea !important; }\n\n.cyan-text.text-lighten-3 {\n  color: #80deea !important; }\n\n.cyan.lighten-2 {\n  background-color: #4dd0e1 !important; }\n\n.cyan-text.text-lighten-2 {\n  color: #4dd0e1 !important; }\n\n.cyan.lighten-1 {\n  background-color: #26c6da !important; }\n\n.cyan-text.text-lighten-1 {\n  color: #26c6da !important; }\n\n.cyan.darken-1 {\n  background-color: #00acc1 !important; }\n\n.cyan-text.text-darken-1 {\n  color: #00acc1 !important; }\n\n.cyan.darken-2 {\n  background-color: #0097a7 !important; }\n\n.cyan-text.text-darken-2 {\n  color: #0097a7 !important; }\n\n.cyan.darken-3 {\n  background-color: #00838f !important; }\n\n.cyan-text.text-darken-3 {\n  color: #00838f !important; }\n\n.cyan.darken-4 {\n  background-color: #006064 !important; }\n\n.cyan-text.text-darken-4 {\n  color: #006064 !important; }\n\n.cyan.accent-1 {\n  background-color: #84ffff !important; }\n\n.cyan-text.text-accent-1 {\n  color: #84ffff !important; }\n\n.cyan.accent-2 {\n  background-color: #18ffff !important; }\n\n.cyan-text.text-accent-2 {\n  color: #18ffff !important; }\n\n.cyan.accent-3 {\n  background-color: #00e5ff !important; }\n\n.cyan-text.text-accent-3 {\n  color: #00e5ff !important; }\n\n.cyan.accent-4 {\n  background-color: #00b8d4 !important; }\n\n.cyan-text.text-accent-4 {\n  color: #00b8d4 !important; }\n\n.teal {\n  background-color: #009688 !important; }\n\n.teal-text {\n  color: #009688 !important; }\n\n.teal.lighten-5 {\n  background-color: #e0f2f1 !important; }\n\n.teal-text.text-lighten-5 {\n  color: #e0f2f1 !important; }\n\n.teal.lighten-4 {\n  background-color: #b2dfdb !important; }\n\n.teal-text.text-lighten-4 {\n  color: #b2dfdb !important; }\n\n.teal.lighten-3 {\n  background-color: #80cbc4 !important; }\n\n.teal-text.text-lighten-3 {\n  color: #80cbc4 !important; }\n\n.teal.lighten-2 {\n  background-color: #4db6ac !important; }\n\n.teal-text.text-lighten-2 {\n  color: #4db6ac !important; }\n\n.teal.lighten-1 {\n  background-color: #26a69a !important; }\n\n.teal-text.text-lighten-1 {\n  color: #26a69a !important; }\n\n.teal.darken-1 {\n  background-color: #00897b !important; }\n\n.teal-text.text-darken-1 {\n  color: #00897b !important; }\n\n.teal.darken-2 {\n  background-color: #00796b !important; }\n\n.teal-text.text-darken-2 {\n  color: #00796b !important; }\n\n.teal.darken-3 {\n  background-color: #00695c !important; }\n\n.teal-text.text-darken-3 {\n  color: #00695c !important; }\n\n.teal.darken-4 {\n  background-color: #004d40 !important; }\n\n.teal-text.text-darken-4 {\n  color: #004d40 !important; }\n\n.teal.accent-1 {\n  background-color: #a7ffeb !important; }\n\n.teal-text.text-accent-1 {\n  color: #a7ffeb !important; }\n\n.teal.accent-2 {\n  background-color: #64ffda !important; }\n\n.teal-text.text-accent-2 {\n  color: #64ffda !important; }\n\n.teal.accent-3 {\n  background-color: #1de9b6 !important; }\n\n.teal-text.text-accent-3 {\n  color: #1de9b6 !important; }\n\n.teal.accent-4 {\n  background-color: #00bfa5 !important; }\n\n.teal-text.text-accent-4 {\n  color: #00bfa5 !important; }\n\n.green {\n  background-color: #4CAF50 !important; }\n\n.green-text {\n  color: #4CAF50 !important; }\n\n.green.lighten-5 {\n  background-color: #E8F5E9 !important; }\n\n.green-text.text-lighten-5 {\n  color: #E8F5E9 !important; }\n\n.green.lighten-4 {\n  background-color: #C8E6C9 !important; }\n\n.green-text.text-lighten-4 {\n  color: #C8E6C9 !important; }\n\n.green.lighten-3 {\n  background-color: #A5D6A7 !important; }\n\n.green-text.text-lighten-3 {\n  color: #A5D6A7 !important; }\n\n.green.lighten-2 {\n  background-color: #81C784 !important; }\n\n.green-text.text-lighten-2 {\n  color: #81C784 !important; }\n\n.green.lighten-1 {\n  background-color: #66BB6A !important; }\n\n.green-text.text-lighten-1 {\n  color: #66BB6A !important; }\n\n.green.darken-1 {\n  background-color: #43A047 !important; }\n\n.green-text.text-darken-1 {\n  color: #43A047 !important; }\n\n.green.darken-2 {\n  background-color: #388E3C !important; }\n\n.green-text.text-darken-2 {\n  color: #388E3C !important; }\n\n.green.darken-3 {\n  background-color: #2E7D32 !important; }\n\n.green-text.text-darken-3 {\n  color: #2E7D32 !important; }\n\n.green.darken-4 {\n  background-color: #1B5E20 !important; }\n\n.green-text.text-darken-4 {\n  color: #1B5E20 !important; }\n\n.green.accent-1 {\n  background-color: #B9F6CA !important; }\n\n.green-text.text-accent-1 {\n  color: #B9F6CA !important; }\n\n.green.accent-2 {\n  background-color: #69F0AE !important; }\n\n.green-text.text-accent-2 {\n  color: #69F0AE !important; }\n\n.green.accent-3 {\n  background-color: #00E676 !important; }\n\n.green-text.text-accent-3 {\n  color: #00E676 !important; }\n\n.green.accent-4 {\n  background-color: #00C853 !important; }\n\n.green-text.text-accent-4 {\n  color: #00C853 !important; }\n\n.light-green {\n  background-color: #8bc34a !important; }\n\n.light-green-text {\n  color: #8bc34a !important; }\n\n.light-green.lighten-5 {\n  background-color: #f1f8e9 !important; }\n\n.light-green-text.text-lighten-5 {\n  color: #f1f8e9 !important; }\n\n.light-green.lighten-4 {\n  background-color: #dcedc8 !important; }\n\n.light-green-text.text-lighten-4 {\n  color: #dcedc8 !important; }\n\n.light-green.lighten-3 {\n  background-color: #c5e1a5 !important; }\n\n.light-green-text.text-lighten-3 {\n  color: #c5e1a5 !important; }\n\n.light-green.lighten-2 {\n  background-color: #aed581 !important; }\n\n.light-green-text.text-lighten-2 {\n  color: #aed581 !important; }\n\n.light-green.lighten-1 {\n  background-color: #9ccc65 !important; }\n\n.light-green-text.text-lighten-1 {\n  color: #9ccc65 !important; }\n\n.light-green.darken-1 {\n  background-color: #7cb342 !important; }\n\n.light-green-text.text-darken-1 {\n  color: #7cb342 !important; }\n\n.light-green.darken-2 {\n  background-color: #689f38 !important; }\n\n.light-green-text.text-darken-2 {\n  color: #689f38 !important; }\n\n.light-green.darken-3 {\n  background-color: #558b2f !important; }\n\n.light-green-text.text-darken-3 {\n  color: #558b2f !important; }\n\n.light-green.darken-4 {\n  background-color: #33691e !important; }\n\n.light-green-text.text-darken-4 {\n  color: #33691e !important; }\n\n.light-green.accent-1 {\n  background-color: #ccff90 !important; }\n\n.light-green-text.text-accent-1 {\n  color: #ccff90 !important; }\n\n.light-green.accent-2 {\n  background-color: #b2ff59 !important; }\n\n.light-green-text.text-accent-2 {\n  color: #b2ff59 !important; }\n\n.light-green.accent-3 {\n  background-color: #76ff03 !important; }\n\n.light-green-text.text-accent-3 {\n  color: #76ff03 !important; }\n\n.light-green.accent-4 {\n  background-color: #64dd17 !important; }\n\n.light-green-text.text-accent-4 {\n  color: #64dd17 !important; }\n\n.lime {\n  background-color: #cddc39 !important; }\n\n.lime-text {\n  color: #cddc39 !important; }\n\n.lime.lighten-5 {\n  background-color: #f9fbe7 !important; }\n\n.lime-text.text-lighten-5 {\n  color: #f9fbe7 !important; }\n\n.lime.lighten-4 {\n  background-color: #f0f4c3 !important; }\n\n.lime-text.text-lighten-4 {\n  color: #f0f4c3 !important; }\n\n.lime.lighten-3 {\n  background-color: #e6ee9c !important; }\n\n.lime-text.text-lighten-3 {\n  color: #e6ee9c !important; }\n\n.lime.lighten-2 {\n  background-color: #dce775 !important; }\n\n.lime-text.text-lighten-2 {\n  color: #dce775 !important; }\n\n.lime.lighten-1 {\n  background-color: #d4e157 !important; }\n\n.lime-text.text-lighten-1 {\n  color: #d4e157 !important; }\n\n.lime.darken-1 {\n  background-color: #c0ca33 !important; }\n\n.lime-text.text-darken-1 {\n  color: #c0ca33 !important; }\n\n.lime.darken-2 {\n  background-color: #afb42b !important; }\n\n.lime-text.text-darken-2 {\n  color: #afb42b !important; }\n\n.lime.darken-3 {\n  background-color: #9e9d24 !important; }\n\n.lime-text.text-darken-3 {\n  color: #9e9d24 !important; }\n\n.lime.darken-4 {\n  background-color: #827717 !important; }\n\n.lime-text.text-darken-4 {\n  color: #827717 !important; }\n\n.lime.accent-1 {\n  background-color: #f4ff81 !important; }\n\n.lime-text.text-accent-1 {\n  color: #f4ff81 !important; }\n\n.lime.accent-2 {\n  background-color: #eeff41 !important; }\n\n.lime-text.text-accent-2 {\n  color: #eeff41 !important; }\n\n.lime.accent-3 {\n  background-color: #c6ff00 !important; }\n\n.lime-text.text-accent-3 {\n  color: #c6ff00 !important; }\n\n.lime.accent-4 {\n  background-color: #aeea00 !important; }\n\n.lime-text.text-accent-4 {\n  color: #aeea00 !important; }\n\n.yellow {\n  background-color: #ffeb3b !important; }\n\n.yellow-text {\n  color: #ffeb3b !important; }\n\n.yellow.lighten-5 {\n  background-color: #fffde7 !important; }\n\n.yellow-text.text-lighten-5 {\n  color: #fffde7 !important; }\n\n.yellow.lighten-4 {\n  background-color: #fff9c4 !important; }\n\n.yellow-text.text-lighten-4 {\n  color: #fff9c4 !important; }\n\n.yellow.lighten-3 {\n  background-color: #fff59d !important; }\n\n.yellow-text.text-lighten-3 {\n  color: #fff59d !important; }\n\n.yellow.lighten-2 {\n  background-color: #fff176 !important; }\n\n.yellow-text.text-lighten-2 {\n  color: #fff176 !important; }\n\n.yellow.lighten-1 {\n  background-color: #ffee58 !important; }\n\n.yellow-text.text-lighten-1 {\n  color: #ffee58 !important; }\n\n.yellow.darken-1 {\n  background-color: #fdd835 !important; }\n\n.yellow-text.text-darken-1 {\n  color: #fdd835 !important; }\n\n.yellow.darken-2 {\n  background-color: #fbc02d !important; }\n\n.yellow-text.text-darken-2 {\n  color: #fbc02d !important; }\n\n.yellow.darken-3 {\n  background-color: #f9a825 !important; }\n\n.yellow-text.text-darken-3 {\n  color: #f9a825 !important; }\n\n.yellow.darken-4 {\n  background-color: #f57f17 !important; }\n\n.yellow-text.text-darken-4 {\n  color: #f57f17 !important; }\n\n.yellow.accent-1 {\n  background-color: #ffff8d !important; }\n\n.yellow-text.text-accent-1 {\n  color: #ffff8d !important; }\n\n.yellow.accent-2 {\n  background-color: #ffff00 !important; }\n\n.yellow-text.text-accent-2 {\n  color: #ffff00 !important; }\n\n.yellow.accent-3 {\n  background-color: #ffea00 !important; }\n\n.yellow-text.text-accent-3 {\n  color: #ffea00 !important; }\n\n.yellow.accent-4 {\n  background-color: #ffd600 !important; }\n\n.yellow-text.text-accent-4 {\n  color: #ffd600 !important; }\n\n.amber {\n  background-color: #ffc107 !important; }\n\n.amber-text {\n  color: #ffc107 !important; }\n\n.amber.lighten-5 {\n  background-color: #fff8e1 !important; }\n\n.amber-text.text-lighten-5 {\n  color: #fff8e1 !important; }\n\n.amber.lighten-4 {\n  background-color: #ffecb3 !important; }\n\n.amber-text.text-lighten-4 {\n  color: #ffecb3 !important; }\n\n.amber.lighten-3 {\n  background-color: #ffe082 !important; }\n\n.amber-text.text-lighten-3 {\n  color: #ffe082 !important; }\n\n.amber.lighten-2 {\n  background-color: #ffd54f !important; }\n\n.amber-text.text-lighten-2 {\n  color: #ffd54f !important; }\n\n.amber.lighten-1 {\n  background-color: #ffca28 !important; }\n\n.amber-text.text-lighten-1 {\n  color: #ffca28 !important; }\n\n.amber.darken-1 {\n  background-color: #ffb300 !important; }\n\n.amber-text.text-darken-1 {\n  color: #ffb300 !important; }\n\n.amber.darken-2 {\n  background-color: #ffa000 !important; }\n\n.amber-text.text-darken-2 {\n  color: #ffa000 !important; }\n\n.amber.darken-3 {\n  background-color: #ff8f00 !important; }\n\n.amber-text.text-darken-3 {\n  color: #ff8f00 !important; }\n\n.amber.darken-4 {\n  background-color: #ff6f00 !important; }\n\n.amber-text.text-darken-4 {\n  color: #ff6f00 !important; }\n\n.amber.accent-1 {\n  background-color: #ffe57f !important; }\n\n.amber-text.text-accent-1 {\n  color: #ffe57f !important; }\n\n.amber.accent-2 {\n  background-color: #ffd740 !important; }\n\n.amber-text.text-accent-2 {\n  color: #ffd740 !important; }\n\n.amber.accent-3 {\n  background-color: #ffc400 !important; }\n\n.amber-text.text-accent-3 {\n  color: #ffc400 !important; }\n\n.amber.accent-4 {\n  background-color: #ffab00 !important; }\n\n.amber-text.text-accent-4 {\n  color: #ffab00 !important; }\n\n.orange {\n  background-color: #ff9800 !important; }\n\n.orange-text {\n  color: #ff9800 !important; }\n\n.orange.lighten-5 {\n  background-color: #fff3e0 !important; }\n\n.orange-text.text-lighten-5 {\n  color: #fff3e0 !important; }\n\n.orange.lighten-4 {\n  background-color: #ffe0b2 !important; }\n\n.orange-text.text-lighten-4 {\n  color: #ffe0b2 !important; }\n\n.orange.lighten-3 {\n  background-color: #ffcc80 !important; }\n\n.orange-text.text-lighten-3 {\n  color: #ffcc80 !important; }\n\n.orange.lighten-2 {\n  background-color: #ffb74d !important; }\n\n.orange-text.text-lighten-2 {\n  color: #ffb74d !important; }\n\n.orange.lighten-1 {\n  background-color: #ffa726 !important; }\n\n.orange-text.text-lighten-1 {\n  color: #ffa726 !important; }\n\n.orange.darken-1 {\n  background-color: #fb8c00 !important; }\n\n.orange-text.text-darken-1 {\n  color: #fb8c00 !important; }\n\n.orange.darken-2 {\n  background-color: #f57c00 !important; }\n\n.orange-text.text-darken-2 {\n  color: #f57c00 !important; }\n\n.orange.darken-3 {\n  background-color: #ef6c00 !important; }\n\n.orange-text.text-darken-3 {\n  color: #ef6c00 !important; }\n\n.orange.darken-4 {\n  background-color: #e65100 !important; }\n\n.orange-text.text-darken-4 {\n  color: #e65100 !important; }\n\n.orange.accent-1 {\n  background-color: #ffd180 !important; }\n\n.orange-text.text-accent-1 {\n  color: #ffd180 !important; }\n\n.orange.accent-2 {\n  background-color: #ffab40 !important; }\n\n.orange-text.text-accent-2 {\n  color: #ffab40 !important; }\n\n.orange.accent-3 {\n  background-color: #ff9100 !important; }\n\n.orange-text.text-accent-3 {\n  color: #ff9100 !important; }\n\n.orange.accent-4 {\n  background-color: #ff6d00 !important; }\n\n.orange-text.text-accent-4 {\n  color: #ff6d00 !important; }\n\n.deep-orange {\n  background-color: #ff5722 !important; }\n\n.deep-orange-text {\n  color: #ff5722 !important; }\n\n.deep-orange.lighten-5 {\n  background-color: #fbe9e7 !important; }\n\n.deep-orange-text.text-lighten-5 {\n  color: #fbe9e7 !important; }\n\n.deep-orange.lighten-4 {\n  background-color: #ffccbc !important; }\n\n.deep-orange-text.text-lighten-4 {\n  color: #ffccbc !important; }\n\n.deep-orange.lighten-3 {\n  background-color: #ffab91 !important; }\n\n.deep-orange-text.text-lighten-3 {\n  color: #ffab91 !important; }\n\n.deep-orange.lighten-2 {\n  background-color: #ff8a65 !important; }\n\n.deep-orange-text.text-lighten-2 {\n  color: #ff8a65 !important; }\n\n.deep-orange.lighten-1 {\n  background-color: #ff7043 !important; }\n\n.deep-orange-text.text-lighten-1 {\n  color: #ff7043 !important; }\n\n.deep-orange.darken-1 {\n  background-color: #f4511e !important; }\n\n.deep-orange-text.text-darken-1 {\n  color: #f4511e !important; }\n\n.deep-orange.darken-2 {\n  background-color: #e64a19 !important; }\n\n.deep-orange-text.text-darken-2 {\n  color: #e64a19 !important; }\n\n.deep-orange.darken-3 {\n  background-color: #d84315 !important; }\n\n.deep-orange-text.text-darken-3 {\n  color: #d84315 !important; }\n\n.deep-orange.darken-4 {\n  background-color: #bf360c !important; }\n\n.deep-orange-text.text-darken-4 {\n  color: #bf360c !important; }\n\n.deep-orange.accent-1 {\n  background-color: #ff9e80 !important; }\n\n.deep-orange-text.text-accent-1 {\n  color: #ff9e80 !important; }\n\n.deep-orange.accent-2 {\n  background-color: #ff6e40 !important; }\n\n.deep-orange-text.text-accent-2 {\n  color: #ff6e40 !important; }\n\n.deep-orange.accent-3 {\n  background-color: #ff3d00 !important; }\n\n.deep-orange-text.text-accent-3 {\n  color: #ff3d00 !important; }\n\n.deep-orange.accent-4 {\n  background-color: #dd2c00 !important; }\n\n.deep-orange-text.text-accent-4 {\n  color: #dd2c00 !important; }\n\n.brown {\n  background-color: #795548 !important; }\n\n.brown-text {\n  color: #795548 !important; }\n\n.brown.lighten-5 {\n  background-color: #efebe9 !important; }\n\n.brown-text.text-lighten-5 {\n  color: #efebe9 !important; }\n\n.brown.lighten-4 {\n  background-color: #d7ccc8 !important; }\n\n.brown-text.text-lighten-4 {\n  color: #d7ccc8 !important; }\n\n.brown.lighten-3 {\n  background-color: #bcaaa4 !important; }\n\n.brown-text.text-lighten-3 {\n  color: #bcaaa4 !important; }\n\n.brown.lighten-2 {\n  background-color: #a1887f !important; }\n\n.brown-text.text-lighten-2 {\n  color: #a1887f !important; }\n\n.brown.lighten-1 {\n  background-color: #8d6e63 !important; }\n\n.brown-text.text-lighten-1 {\n  color: #8d6e63 !important; }\n\n.brown.darken-1 {\n  background-color: #6d4c41 !important; }\n\n.brown-text.text-darken-1 {\n  color: #6d4c41 !important; }\n\n.brown.darken-2 {\n  background-color: #5d4037 !important; }\n\n.brown-text.text-darken-2 {\n  color: #5d4037 !important; }\n\n.brown.darken-3 {\n  background-color: #4e342e !important; }\n\n.brown-text.text-darken-3 {\n  color: #4e342e !important; }\n\n.brown.darken-4 {\n  background-color: #3e2723 !important; }\n\n.brown-text.text-darken-4 {\n  color: #3e2723 !important; }\n\n.blue-grey {\n  background-color: #607d8b !important; }\n\n.blue-grey-text {\n  color: #607d8b !important; }\n\n.blue-grey.lighten-5 {\n  background-color: #eceff1 !important; }\n\n.blue-grey-text.text-lighten-5 {\n  color: #eceff1 !important; }\n\n.blue-grey.lighten-4 {\n  background-color: #cfd8dc !important; }\n\n.blue-grey-text.text-lighten-4 {\n  color: #cfd8dc !important; }\n\n.blue-grey.lighten-3 {\n  background-color: #b0bec5 !important; }\n\n.blue-grey-text.text-lighten-3 {\n  color: #b0bec5 !important; }\n\n.blue-grey.lighten-2 {\n  background-color: #90a4ae !important; }\n\n.blue-grey-text.text-lighten-2 {\n  color: #90a4ae !important; }\n\n.blue-grey.lighten-1 {\n  background-color: #78909c !important; }\n\n.blue-grey-text.text-lighten-1 {\n  color: #78909c !important; }\n\n.blue-grey.darken-1 {\n  background-color: #546e7a !important; }\n\n.blue-grey-text.text-darken-1 {\n  color: #546e7a !important; }\n\n.blue-grey.darken-2 {\n  background-color: #455a64 !important; }\n\n.blue-grey-text.text-darken-2 {\n  color: #455a64 !important; }\n\n.blue-grey.darken-3 {\n  background-color: #37474f !important; }\n\n.blue-grey-text.text-darken-3 {\n  color: #37474f !important; }\n\n.blue-grey.darken-4 {\n  background-color: #263238 !important; }\n\n.blue-grey-text.text-darken-4 {\n  color: #263238 !important; }\n\n.grey {\n  background-color: #9e9e9e !important; }\n\n.grey-text {\n  color: #9e9e9e !important; }\n\n.grey.lighten-5 {\n  background-color: #fafafa !important; }\n\n.grey-text.text-lighten-5 {\n  color: #fafafa !important; }\n\n.grey.lighten-4 {\n  background-color: #f5f5f5 !important; }\n\n.grey-text.text-lighten-4 {\n  color: #f5f5f5 !important; }\n\n.grey.lighten-3 {\n  background-color: #eeeeee !important; }\n\n.grey-text.text-lighten-3 {\n  color: #eeeeee !important; }\n\n.grey.lighten-2 {\n  background-color: #e0e0e0 !important; }\n\n.grey-text.text-lighten-2 {\n  color: #e0e0e0 !important; }\n\n.grey.lighten-1 {\n  background-color: #bdbdbd !important; }\n\n.grey-text.text-lighten-1 {\n  color: #bdbdbd !important; }\n\n.grey.darken-1 {\n  background-color: #757575 !important; }\n\n.grey-text.text-darken-1 {\n  color: #757575 !important; }\n\n.grey.darken-2 {\n  background-color: #616161 !important; }\n\n.grey-text.text-darken-2 {\n  color: #616161 !important; }\n\n.grey.darken-3 {\n  background-color: #424242 !important; }\n\n.grey-text.text-darken-3 {\n  color: #424242 !important; }\n\n.grey.darken-4 {\n  background-color: #212121 !important; }\n\n.grey-text.text-darken-4 {\n  color: #212121 !important; }\n\n.black {\n  background-color: #000000 !important; }\n\n.black-text {\n  color: #000000 !important; }\n\n.white {\n  background-color: #FFFFFF !important; }\n\n.white-text {\n  color: #FFFFFF !important; }\n\n.transparent {\n  background-color: transparent !important; }\n\n.transparent-text {\n  color: transparent !important; }\n\n/*! normalize.css v7.0.0 | MIT License | github.com/necolas/normalize.css */\n/* Document\n   ========================================================================== */\n/**\n * 1. Correct the line height in all browsers.\n * 2. Prevent adjustments of font size after orientation changes in\n *    IE on Windows Phone and in iOS.\n */\nhtml {\n  line-height: 1.15;\n  /* 1 */\n  -ms-text-size-adjust: 100%;\n  /* 2 */\n  -webkit-text-size-adjust: 100%;\n  /* 2 */ }\n\n/* Sections\n   ========================================================================== */\n/**\n * Remove the margin in all browsers (opinionated).\n */\nbody {\n  margin: 0; }\n\n/**\n * Add the correct display in IE 9-.\n */\narticle,\naside,\nfooter,\nheader,\nnav,\nsection {\n  display: block; }\n\n/**\n * Correct the font size and margin on `h1` elements within `section` and\n * `article` contexts in Chrome, Firefox, and Safari.\n */\nh1 {\n  font-size: 2em;\n  margin: 0.67em 0; }\n\n/* Grouping content\n   ========================================================================== */\n/**\n * Add the correct display in IE 9-.\n * 1. Add the correct display in IE.\n */\nfigcaption,\nfigure,\nmain {\n  /* 1 */\n  display: block; }\n\n/**\n * Add the correct margin in IE 8.\n */\nfigure {\n  margin: 1em 40px; }\n\n/**\n * 1. Add the correct box sizing in Firefox.\n * 2. Show the overflow in Edge and IE.\n */\nhr {\n  box-sizing: content-box;\n  /* 1 */\n  height: 0;\n  /* 1 */\n  overflow: visible;\n  /* 2 */ }\n\n/**\n * 1. Correct the inheritance and scaling of font size in all browsers.\n * 2. Correct the odd `em` font sizing in all browsers.\n */\npre {\n  font-family: monospace, monospace;\n  /* 1 */\n  font-size: 1em;\n  /* 2 */ }\n\n/* Text-level semantics\n   ========================================================================== */\n/**\n * 1. Remove the gray background on active links in IE 10.\n * 2. Remove gaps in links underline in iOS 8+ and Safari 8+.\n */\na {\n  background-color: transparent;\n  /* 1 */\n  -webkit-text-decoration-skip: objects;\n  /* 2 */ }\n\n/**\n * 1. Remove the bottom border in Chrome 57- and Firefox 39-.\n * 2. Add the correct text decoration in Chrome, Edge, IE, Opera, and Safari.\n */\nabbr[title] {\n  border-bottom: none;\n  /* 1 */\n  text-decoration: underline;\n  /* 2 */\n  text-decoration: underline dotted;\n  /* 2 */ }\n\n/**\n * Prevent the duplicate application of `bolder` by the next rule in Safari 6.\n */\nb,\nstrong {\n  font-weight: inherit; }\n\n/**\n * Add the correct font weight in Chrome, Edge, and Safari.\n */\nb,\nstrong {\n  font-weight: bolder; }\n\n/**\n * 1. Correct the inheritance and scaling of font size in all browsers.\n * 2. Correct the odd `em` font sizing in all browsers.\n */\ncode,\nkbd,\nsamp {\n  font-family: monospace, monospace;\n  /* 1 */\n  font-size: 1em;\n  /* 2 */ }\n\n/**\n * Add the correct font style in Android 4.3-.\n */\ndfn {\n  font-style: italic; }\n\n/**\n * Add the correct background and color in IE 9-.\n */\nmark {\n  background-color: #ff0;\n  color: #000; }\n\n/**\n * Add the correct font size in all browsers.\n */\nsmall {\n  font-size: 80%; }\n\n/**\n * Prevent `sub` and `sup` elements from affecting the line height in\n * all browsers.\n */\nsub,\nsup {\n  font-size: 75%;\n  line-height: 0;\n  position: relative;\n  vertical-align: baseline; }\n\nsub {\n  bottom: -0.25em; }\n\nsup {\n  top: -0.5em; }\n\n/* Embedded content\n   ========================================================================== */\n/**\n * Add the correct display in IE 9-.\n */\naudio,\nvideo {\n  display: inline-block; }\n\n/**\n * Add the correct display in iOS 4-7.\n */\naudio:not([controls]) {\n  display: none;\n  height: 0; }\n\n/**\n * Remove the border on images inside links in IE 10-.\n */\nimg {\n  border-style: none; }\n\n/**\n * Hide the overflow in IE.\n */\nsvg:not(:root) {\n  overflow: hidden; }\n\n/* Forms\n   ========================================================================== */\n/**\n * 1. Change the font styles in all browsers (opinionated).\n * 2. Remove the margin in Firefox and Safari.\n */\nbutton,\ninput,\noptgroup,\nselect,\ntextarea {\n  font-family: sans-serif;\n  /* 1 */\n  font-size: 100%;\n  /* 1 */\n  line-height: 1.15;\n  /* 1 */\n  margin: 0;\n  /* 2 */ }\n\n/**\n * Show the overflow in IE.\n * 1. Show the overflow in Edge.\n */\nbutton,\ninput {\n  /* 1 */\n  overflow: visible; }\n\n/**\n * Remove the inheritance of text transform in Edge, Firefox, and IE.\n * 1. Remove the inheritance of text transform in Firefox.\n */\nbutton,\nselect {\n  /* 1 */\n  text-transform: none; }\n\n/**\n * 1. Prevent a WebKit bug where (2) destroys native `audio` and `video`\n *    controls in Android 4.\n * 2. Correct the inability to style clickable types in iOS and Safari.\n */\nbutton,\nhtml [type=\"button\"],\n[type=\"reset\"],\n[type=\"submit\"] {\n  -webkit-appearance: button;\n  /* 2 */ }\n\n/**\n * Remove the inner border and padding in Firefox.\n */\nbutton::-moz-focus-inner,\n[type=\"button\"]::-moz-focus-inner,\n[type=\"reset\"]::-moz-focus-inner,\n[type=\"submit\"]::-moz-focus-inner {\n  border-style: none;\n  padding: 0; }\n\n/**\n * Restore the focus styles unset by the previous rule.\n */\nbutton:-moz-focusring,\n[type=\"button\"]:-moz-focusring,\n[type=\"reset\"]:-moz-focusring,\n[type=\"submit\"]:-moz-focusring {\n  outline: 1px dotted ButtonText; }\n\n/**\n * Correct the padding in Firefox.\n */\nfieldset {\n  padding: 0.35em 0.75em 0.625em; }\n\n/**\n * 1. Correct the text wrapping in Edge and IE.\n * 2. Correct the color inheritance from `fieldset` elements in IE.\n * 3. Remove the padding so developers are not caught out when they zero out\n *    `fieldset` elements in all browsers.\n */\nlegend {\n  box-sizing: border-box;\n  /* 1 */\n  color: inherit;\n  /* 2 */\n  display: table;\n  /* 1 */\n  max-width: 100%;\n  /* 1 */\n  padding: 0;\n  /* 3 */\n  white-space: normal;\n  /* 1 */ }\n\n/**\n * 1. Add the correct display in IE 9-.\n * 2. Add the correct vertical alignment in Chrome, Firefox, and Opera.\n */\nprogress {\n  display: inline-block;\n  /* 1 */\n  vertical-align: baseline;\n  /* 2 */ }\n\n/**\n * Remove the default vertical scrollbar in IE.\n */\ntextarea {\n  overflow: auto; }\n\n/**\n * 1. Add the correct box sizing in IE 10-.\n * 2. Remove the padding in IE 10-.\n */\n[type=\"checkbox\"],\n[type=\"radio\"] {\n  box-sizing: border-box;\n  /* 1 */\n  padding: 0;\n  /* 2 */ }\n\n/**\n * Correct the cursor style of increment and decrement buttons in Chrome.\n */\n[type=\"number\"]::-webkit-inner-spin-button,\n[type=\"number\"]::-webkit-outer-spin-button {\n  height: auto; }\n\n/**\n * 1. Correct the odd appearance in Chrome and Safari.\n * 2. Correct the outline style in Safari.\n */\n[type=\"search\"] {\n  -webkit-appearance: textfield;\n  /* 1 */\n  outline-offset: -2px;\n  /* 2 */ }\n\n/**\n * Remove the inner padding and cancel buttons in Chrome and Safari on macOS.\n */\n[type=\"search\"]::-webkit-search-cancel-button,\n[type=\"search\"]::-webkit-search-decoration {\n  -webkit-appearance: none; }\n\n/**\n * 1. Correct the inability to style clickable types in iOS and Safari.\n * 2. Change font properties to `inherit` in Safari.\n */\n::-webkit-file-upload-button {\n  -webkit-appearance: button;\n  /* 1 */\n  font: inherit;\n  /* 2 */ }\n\n/* Interactive\n   ========================================================================== */\n/*\n * Add the correct display in IE 9-.\n * 1. Add the correct display in Edge, IE, and Firefox.\n */\ndetails,\nmenu {\n  display: block; }\n\n/*\n * Add the correct display in all browsers.\n */\nsummary {\n  display: list-item; }\n\n/* Scripting\n   ========================================================================== */\n/**\n * Add the correct display in IE 9-.\n */\ncanvas {\n  display: inline-block; }\n\n/**\n * Add the correct display in IE.\n */\ntemplate {\n  display: none; }\n\n/* Hidden\n   ========================================================================== */\n/**\n * Add the correct display in IE 10-.\n */\n[hidden] {\n  display: none; }\n\nhtml {\n  box-sizing: border-box; }\n\n*, *:before, *:after {\n  box-sizing: inherit; }\n\nbutton,\ninput,\noptgroup,\nselect,\ntextarea {\n  font-family: -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, Oxygen-Sans, Ubuntu, Cantarell, \"Helvetica Neue\", sans-serif; }\n\nul:not(.browser-default) {\n  padding-left: 0;\n  list-style-type: none; }\n  ul:not(.browser-default) > li {\n    list-style-type: none; }\n\na {\n  color: #039be5;\n  text-decoration: none;\n  -webkit-tap-highlight-color: transparent; }\n\n.valign-wrapper {\n  display: flex;\n  align-items: center; }\n\n.clearfix {\n  clear: both; }\n\n.z-depth-0 {\n  box-shadow: none !important; }\n\n/* 2dp elevation modified*/\n.z-depth-1, nav, .card-panel, .card, .toast, .dropdown-content, .collapsible {\n  box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 3px 1px -2px rgba(0, 0, 0, 0.12), 0 1px 5px 0 rgba(0, 0, 0, 0.2); }\n\n.z-depth-1-half {\n  box-shadow: 0 3px 3px 0 rgba(0, 0, 0, 0.14), 0 1px 7px 0 rgba(0, 0, 0, 0.12), 0 3px 1px -1px rgba(0, 0, 0, 0.2); }\n\n/* 6dp elevation modified*/\n.z-depth-2 {\n  box-shadow: 0 4px 5px 0 rgba(0, 0, 0, 0.14), 0 1px 10px 0 rgba(0, 0, 0, 0.12), 0 2px 4px -1px rgba(0, 0, 0, 0.3); }\n\n/* 12dp elevation modified*/\n.z-depth-3 {\n  box-shadow: 0 8px 17px 2px rgba(0, 0, 0, 0.14), 0 3px 14px 2px rgba(0, 0, 0, 0.12), 0 5px 5px -3px rgba(0, 0, 0, 0.2); }\n\n/* 16dp elevation */\n.z-depth-4 {\n  box-shadow: 0 16px 24px 2px rgba(0, 0, 0, 0.14), 0 6px 30px 5px rgba(0, 0, 0, 0.12), 0 8px 10px -7px rgba(0, 0, 0, 0.2); }\n\n/* 24dp elevation */\n.z-depth-5, .modal {\n  box-shadow: 0 24px 38px 3px rgba(0, 0, 0, 0.14), 0 9px 46px 8px rgba(0, 0, 0, 0.12), 0 11px 15px -7px rgba(0, 0, 0, 0.2); }\n\n.hoverable {\n  transition: box-shadow .25s; }\n  .hoverable:hover {\n    box-shadow: 0 8px 17px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19); }\n\n.divider {\n  height: 1px;\n  overflow: hidden;\n  background-color: #e0e0e0; }\n\nblockquote {\n  margin: 20px 0;\n  padding-left: 1.5rem;\n  border-left: 5px solid #b3c5ae; }\n\ni {\n  line-height: inherit; }\n  i.left {\n    float: left;\n    margin-right: 15px; }\n  i.right {\n    float: right;\n    margin-left: 15px; }\n  i.tiny {\n    font-size: 1rem; }\n  i.small {\n    font-size: 2rem; }\n  i.medium {\n    font-size: 4rem; }\n  i.large {\n    font-size: 6rem; }\n\nimg.responsive-img,\nvideo.responsive-video {\n  max-width: 100%;\n  height: auto; }\n\n.pagination li {\n  display: inline-block;\n  border-radius: 2px;\n  text-align: center;\n  vertical-align: top;\n  height: 30px; }\n  .pagination li a {\n    color: #444;\n    display: inline-block;\n    font-size: 1.2rem;\n    padding: 0 10px;\n    line-height: 30px; }\n  .pagination li.active a {\n    color: #fff; }\n  .pagination li.active {\n    background-color: #b3c5ae; }\n  .pagination li.disabled a {\n    cursor: default;\n    color: #999; }\n  .pagination li i {\n    font-size: 2rem; }\n\n.pagination li.pages ul li {\n  display: inline-block;\n  float: none; }\n\n@media only screen and (max-width: 992px) {\n  .pagination {\n    width: 100%; }\n    .pagination li.prev,\n    .pagination li.next {\n      width: 10%; }\n    .pagination li.pages {\n      width: 80%;\n      overflow: hidden;\n      white-space: nowrap; } }\n\n.breadcrumb {\n  font-size: 18px;\n  color: rgba(255, 255, 255, 0.7); }\n  .breadcrumb i,\n  .breadcrumb [class^=\"mdi-\"], .breadcrumb [class*=\"mdi-\"],\n  .breadcrumb i.material-icons {\n    display: inline-block;\n    float: left;\n    font-size: 24px; }\n  .breadcrumb:before {\n    content: '\\E5CC';\n    color: rgba(255, 255, 255, 0.7);\n    vertical-align: top;\n    display: inline-block;\n    font-family: 'Material Icons';\n    font-weight: normal;\n    font-style: normal;\n    font-size: 25px;\n    margin: 0 10px 0 8px;\n    -webkit-font-smoothing: antialiased; }\n  .breadcrumb:first-child:before {\n    display: none; }\n  .breadcrumb:last-child {\n    color: #fff; }\n\n.parallax-container {\n  position: relative;\n  overflow: hidden;\n  height: 500px; }\n  .parallax-container .parallax {\n    position: absolute;\n    top: 0;\n    left: 0;\n    right: 0;\n    bottom: 0;\n    z-index: -1; }\n    .parallax-container .parallax img {\n      opacity: 0;\n      position: absolute;\n      left: 50%;\n      bottom: 0;\n      min-width: 100%;\n      min-height: 100%;\n      transform: translate3d(0, 0, 0);\n      transform: translateX(-50%); }\n\n.pin-top, .pin-bottom {\n  position: relative; }\n\n.pinned {\n  position: fixed !important; }\n\n/*********************\n  Transition Classes\n**********************/\nul.staggered-list li {\n  opacity: 0; }\n\n.fade-in {\n  opacity: 0;\n  transform-origin: 0 50%; }\n\n/*********************\n  Media Query Classes\n**********************/\n@media only screen and (max-width: 600px) {\n  .hide-on-small-only, .hide-on-small-and-down {\n    display: none !important; } }\n\n@media only screen and (max-width: 992px) {\n  .hide-on-med-and-down {\n    display: none !important; } }\n\n@media only screen and (min-width: 601px) {\n  .hide-on-med-and-up {\n    display: none !important; } }\n\n@media only screen and (min-width: 600px) and (max-width: 992px) {\n  .hide-on-med-only {\n    display: none !important; } }\n\n@media only screen and (min-width: 993px) {\n  .hide-on-large-only {\n    display: none !important; } }\n\n@media only screen and (min-width: 1201px) {\n  .hide-on-extra-large-only {\n    display: none !important; } }\n\n@media only screen and (min-width: 1201px) {\n  .show-on-extra-large {\n    display: block !important; } }\n\n@media only screen and (min-width: 993px) {\n  .show-on-large {\n    display: block !important; } }\n\n@media only screen and (min-width: 600px) and (max-width: 992px) {\n  .show-on-medium {\n    display: block !important; } }\n\n@media only screen and (max-width: 600px) {\n  .show-on-small {\n    display: block !important; } }\n\n@media only screen and (min-width: 601px) {\n  .show-on-medium-and-up {\n    display: block !important; } }\n\n@media only screen and (max-width: 992px) {\n  .show-on-medium-and-down {\n    display: block !important; } }\n\n@media only screen and (max-width: 600px) {\n  .center-on-small-only {\n    text-align: center; } }\n\n.page-footer {\n  padding-top: 20px;\n  color: #fff;\n  background-color: #b3c5ae; }\n  .page-footer .footer-copyright {\n    overflow: hidden;\n    min-height: 50px;\n    display: flex;\n    align-items: center;\n    justify-content: space-between;\n    padding: 10px 0px;\n    color: rgba(255, 255, 255, 0.8);\n    background-color: rgba(51, 51, 51, 0.08); }\n\ntable, th, td {\n  border: none; }\n\ntable {\n  width: 100%;\n  display: table;\n  border-collapse: collapse;\n  border-spacing: 0; }\n  table.striped tr {\n    border-bottom: none; }\n  table.striped > tbody > tr:nth-child(odd) {\n    background-color: rgba(242, 242, 242, 0.5); }\n  table.striped > tbody > tr > td {\n    border-radius: 0; }\n  table.highlight > tbody > tr {\n    transition: background-color .25s ease; }\n    table.highlight > tbody > tr:hover {\n      background-color: rgba(242, 242, 242, 0.5); }\n  table.centered thead tr th, table.centered tbody tr td {\n    text-align: center; }\n\ntr {\n  border-bottom: 1px solid rgba(0, 0, 0, 0.12); }\n\ntd, th {\n  padding: 15px 5px;\n  display: table-cell;\n  text-align: left;\n  vertical-align: middle;\n  border-radius: 2px; }\n\n@media only screen and (max-width: 992px) {\n  table.responsive-table {\n    width: 100%;\n    border-collapse: collapse;\n    border-spacing: 0;\n    display: block;\n    position: relative;\n    /* sort out borders */ }\n    table.responsive-table td:empty:before {\n      content: '\\00a0'; }\n    table.responsive-table th,\n    table.responsive-table td {\n      margin: 0;\n      vertical-align: top; }\n    table.responsive-table th {\n      text-align: left; }\n    table.responsive-table thead {\n      display: block;\n      float: left; }\n      table.responsive-table thead tr {\n        display: block;\n        padding: 0 10px 0 0; }\n        table.responsive-table thead tr th::before {\n          content: \"\\00a0\"; }\n    table.responsive-table tbody {\n      display: block;\n      width: auto;\n      position: relative;\n      overflow-x: auto;\n      white-space: nowrap; }\n      table.responsive-table tbody tr {\n        display: inline-block;\n        vertical-align: top; }\n    table.responsive-table th {\n      display: block;\n      text-align: right; }\n    table.responsive-table td {\n      display: block;\n      min-height: 1.25em;\n      text-align: left; }\n    table.responsive-table tr {\n      border-bottom: none;\n      padding: 0 10px; }\n    table.responsive-table thead {\n      border: 0;\n      border-right: 1px solid rgba(0, 0, 0, 0.12); } }\n\n.collection {\n  margin: 0.5rem 0 1rem 0;\n  border: 1px solid #e0e0e0;\n  border-radius: 2px;\n  overflow: hidden;\n  position: relative; }\n  .collection .collection-item {\n    background-color: #fff;\n    line-height: 1.5rem;\n    padding: 10px 20px;\n    margin: 0;\n    border-bottom: 1px solid #e0e0e0; }\n    .collection .collection-item.avatar {\n      min-height: 84px;\n      padding-left: 72px;\n      position: relative; }\n      .collection .collection-item.avatar:not(.circle-clipper) > .circle,\n      .collection .collection-item.avatar :not(.circle-clipper) > .circle {\n        position: absolute;\n        width: 42px;\n        height: 42px;\n        overflow: hidden;\n        left: 15px;\n        display: inline-block;\n        vertical-align: middle; }\n      .collection .collection-item.avatar i.circle {\n        font-size: 18px;\n        line-height: 42px;\n        color: #fff;\n        background-color: #999;\n        text-align: center; }\n      .collection .collection-item.avatar .title {\n        font-size: 16px; }\n      .collection .collection-item.avatar p {\n        margin: 0; }\n      .collection .collection-item.avatar .secondary-content {\n        position: absolute;\n        top: 16px;\n        right: 16px; }\n    .collection .collection-item:last-child {\n      border-bottom: none; }\n    .collection .collection-item.active {\n      background-color: #b9c8cc;\n      color: white; }\n      .collection .collection-item.active .secondary-content {\n        color: #fff; }\n  .collection a.collection-item {\n    display: block;\n    transition: .25s;\n    color: #b9c8cc; }\n    .collection a.collection-item:not(.active):hover {\n      background-color: #ddd; }\n  .collection.with-header .collection-header {\n    background-color: #fff;\n    border-bottom: 1px solid #e0e0e0;\n    padding: 10px 20px; }\n  .collection.with-header .collection-item {\n    padding-left: 30px; }\n  .collection.with-header .collection-item.avatar {\n    padding-left: 72px; }\n\n.secondary-content {\n  float: right;\n  color: #b9c8cc; }\n\n.collapsible .collection {\n  margin: 0;\n  border: none; }\n\n.video-container {\n  position: relative;\n  padding-bottom: 56.25%;\n  height: 0;\n  overflow: hidden; }\n  .video-container iframe, .video-container object, .video-container embed {\n    position: absolute;\n    top: 0;\n    left: 0;\n    width: 100%;\n    height: 100%; }\n\n.progress {\n  position: relative;\n  height: 4px;\n  display: block;\n  width: 100%;\n  background-color: white;\n  border-radius: 2px;\n  margin: 0.5rem 0 1rem 0;\n  overflow: hidden; }\n  .progress .determinate {\n    position: absolute;\n    top: 0;\n    left: 0;\n    bottom: 0;\n    background-color: #b9c8cc;\n    transition: width .3s linear; }\n  .progress .indeterminate {\n    background-color: #b9c8cc; }\n    .progress .indeterminate:before {\n      content: '';\n      position: absolute;\n      background-color: inherit;\n      top: 0;\n      left: 0;\n      bottom: 0;\n      will-change: left, right;\n      animation: indeterminate 2.1s cubic-bezier(0.65, 0.815, 0.735, 0.395) infinite; }\n    .progress .indeterminate:after {\n      content: '';\n      position: absolute;\n      background-color: inherit;\n      top: 0;\n      left: 0;\n      bottom: 0;\n      will-change: left, right;\n      animation: indeterminate-short 2.1s cubic-bezier(0.165, 0.84, 0.44, 1) infinite;\n      animation-delay: 1.15s; }\n\n@keyframes indeterminate {\n  0% {\n    left: -35%;\n    right: 100%; }\n  60% {\n    left: 100%;\n    right: -90%; }\n  100% {\n    left: 100%;\n    right: -90%; } }\n\n@keyframes indeterminate-short {\n  0% {\n    left: -200%;\n    right: 100%; }\n  60% {\n    left: 107%;\n    right: -8%; }\n  100% {\n    left: 107%;\n    right: -8%; } }\n\n/*******************\n  Utility Classes\n*******************/\n.hide {\n  display: none !important; }\n\n.left-align {\n  text-align: left; }\n\n.right-align {\n  text-align: right; }\n\n.center, .center-align {\n  text-align: center; }\n\n.left {\n  float: left !important; }\n\n.right {\n  float: right !important; }\n\n.no-select, input[type=range],\ninput[type=range] + .thumb {\n  user-select: none; }\n\n.circle {\n  border-radius: 50%; }\n\n.center-block {\n  display: block;\n  margin-left: auto;\n  margin-right: auto; }\n\n.truncate {\n  display: block;\n  white-space: nowrap;\n  overflow: hidden;\n  text-overflow: ellipsis; }\n\n.no-padding {\n  padding: 0 !important; }\n\nspan.badge {\n  min-width: 3rem;\n  padding: 0 6px;\n  margin-left: 14px;\n  text-align: center;\n  font-size: 1rem;\n  line-height: 22px;\n  height: 22px;\n  color: #757575;\n  float: right;\n  box-sizing: border-box; }\n  span.badge.new {\n    font-weight: 300;\n    font-size: 0.8rem;\n    color: #fff;\n    background-color: #b9c8cc;\n    border-radius: 2px; }\n  span.badge.new:after {\n    content: \" new\"; }\n  span.badge[data-badge-caption]::after {\n    content: \" \" attr(data-badge-caption); }\n\nnav ul a span.badge {\n  display: inline-block;\n  float: none;\n  margin-left: 4px;\n  line-height: 22px;\n  height: 22px;\n  -webkit-font-smoothing: auto; }\n\n.collection-item span.badge {\n  margin-top: calc(0.75rem - 11px); }\n\n.collapsible span.badge {\n  margin-left: auto; }\n\n.sidenav span.badge {\n  margin-top: calc(24px - 11px); }\n\ntable span.badge {\n  display: inline-block;\n  float: none;\n  margin-left: auto; }\n\nnav {\n  color: #fff;\n  background-color: #b3c5ae;\n  width: 100%;\n  height: 56px;\n  line-height: 56px; }\n  nav.nav-extended {\n    height: auto; }\n    nav.nav-extended .nav-wrapper {\n      min-height: 56px;\n      height: auto; }\n    nav.nav-extended .nav-content {\n      position: relative;\n      line-height: normal; }\n  nav a {\n    color: #fff; }\n  nav i,\n  nav [class^=\"mdi-\"], nav [class*=\"mdi-\"],\n  nav i.material-icons {\n    display: block;\n    font-size: 24px;\n    height: 56px;\n    line-height: 56px; }\n  nav .nav-wrapper {\n    position: relative;\n    height: 100%; }\n  @media only screen and (min-width: 993px) {\n    nav a.sidenav-trigger {\n      display: none; } }\n  nav .sidenav-trigger {\n    float: left;\n    position: relative;\n    z-index: 1;\n    height: 56px;\n    margin: 0 18px; }\n    nav .sidenav-trigger i {\n      height: 56px;\n      line-height: 56px; }\n  nav .brand-logo {\n    position: absolute;\n    color: #fff;\n    display: inline-block;\n    font-size: 2.1rem;\n    padding: 0; }\n    nav .brand-logo.center {\n      left: 50%;\n      transform: translateX(-50%); }\n    @media only screen and (max-width: 992px) {\n      nav .brand-logo {\n        left: 50%;\n        transform: translateX(-50%); }\n        nav .brand-logo.left, nav .brand-logo.right {\n          padding: 0;\n          transform: none; }\n        nav .brand-logo.left {\n          left: 0.5rem; }\n        nav .brand-logo.right {\n          right: 0.5rem;\n          left: auto; } }\n    nav .brand-logo.right {\n      right: 0.5rem;\n      padding: 0; }\n    nav .brand-logo i,\n    nav .brand-logo [class^=\"mdi-\"], nav .brand-logo [class*=\"mdi-\"],\n    nav .brand-logo i.material-icons {\n      float: left;\n      margin-right: 15px; }\n  nav .nav-title {\n    display: inline-block;\n    font-size: 32px;\n    padding: 28px 0; }\n  nav ul {\n    margin: 0; }\n    nav ul li {\n      transition: background-color .3s;\n      float: left;\n      padding: 0; }\n      nav ul li.active {\n        background-color: rgba(0, 0, 0, 0.1); }\n    nav ul a {\n      transition: background-color .3s;\n      font-size: 1rem;\n      color: #fff;\n      display: block;\n      padding: 0 15px;\n      cursor: pointer; }\n      nav ul a.btn, nav ul a.btn-large, nav ul a.btn-flat, nav ul a.btn-floating {\n        margin-top: -2px;\n        margin-left: 15px;\n        margin-right: 15px; }\n        nav ul a.btn > .material-icons, nav ul a.btn-large > .material-icons, nav ul a.btn-flat > .material-icons, nav ul a.btn-floating > .material-icons {\n          height: inherit;\n          line-height: inherit; }\n      nav ul a:hover {\n        background-color: rgba(0, 0, 0, 0.1); }\n    nav ul.left {\n      float: left; }\n  nav form {\n    height: 100%; }\n  nav .input-field {\n    margin: 0;\n    height: 100%; }\n    nav .input-field input {\n      height: 100%;\n      font-size: 1.2rem;\n      border: none;\n      padding-left: 2rem; }\n      nav .input-field input:focus, nav .input-field input[type=text]:valid, nav .input-field input[type=password]:valid, nav .input-field input[type=email]:valid, nav .input-field input[type=url]:valid, nav .input-field input[type=date]:valid {\n        border: none;\n        box-shadow: none; }\n    nav .input-field label {\n      top: 0;\n      left: 0; }\n      nav .input-field label i {\n        color: rgba(255, 255, 255, 0.7);\n        transition: color .3s; }\n      nav .input-field label.active i {\n        color: #fff; }\n\n.navbar-fixed {\n  position: relative;\n  height: 56px;\n  z-index: 997; }\n  .navbar-fixed nav {\n    position: fixed; }\n\n@media only screen and (min-width: 601px) {\n  nav.nav-extended .nav-wrapper {\n    min-height: 64px; }\n  nav, nav .nav-wrapper i, nav a.sidenav-trigger, nav a.sidenav-trigger i {\n    height: 64px;\n    line-height: 64px; }\n  .navbar-fixed {\n    height: 64px; } }\n\n.scale-transition {\n  transition: transform 0.3s cubic-bezier(0.53, 0.01, 0.36, 1.63) !important; }\n  .scale-transition.scale-out {\n    transform: scale(0);\n    transition: transform .2s !important; }\n  .scale-transition.scale-in {\n    transform: scale(1); }\n\n.card-panel {\n  transition: box-shadow .25s;\n  padding: 24px;\n  margin: 0.5rem 0 1rem 0;\n  border-radius: 2px;\n  background-color: #fff; }\n\n.card {\n  position: relative;\n  margin: 0.5rem 0 1rem 0;\n  background-color: #fff;\n  transition: box-shadow .25s;\n  border-radius: 2px; }\n  .card .card-title {\n    font-size: 24px;\n    font-weight: 300; }\n    .card .card-title.activator {\n      cursor: pointer; }\n  .card.small, .card.medium, .card.large {\n    position: relative; }\n    .card.small .card-image, .card.medium .card-image, .card.large .card-image {\n      max-height: 60%;\n      overflow: hidden; }\n    .card.small .card-image + .card-content, .card.medium .card-image + .card-content, .card.large .card-image + .card-content {\n      max-height: 40%; }\n    .card.small .card-content, .card.medium .card-content, .card.large .card-content {\n      max-height: 100%;\n      overflow: hidden; }\n    .card.small .card-action, .card.medium .card-action, .card.large .card-action {\n      position: absolute;\n      bottom: 0;\n      left: 0;\n      right: 0; }\n  .card.small {\n    height: 300px; }\n  .card.medium {\n    height: 400px; }\n  .card.large {\n    height: 500px; }\n  .card.horizontal {\n    display: flex; }\n    .card.horizontal.small .card-image, .card.horizontal.medium .card-image, .card.horizontal.large .card-image {\n      height: 100%;\n      max-height: none;\n      overflow: visible; }\n      .card.horizontal.small .card-image img, .card.horizontal.medium .card-image img, .card.horizontal.large .card-image img {\n        height: 100%; }\n    .card.horizontal .card-image {\n      max-width: 50%; }\n      .card.horizontal .card-image img {\n        border-radius: 2px 0 0 2px;\n        max-width: 100%;\n        width: auto; }\n    .card.horizontal .card-stacked {\n      display: flex;\n      flex-direction: column;\n      flex: 1;\n      position: relative; }\n      .card.horizontal .card-stacked .card-content {\n        flex-grow: 1; }\n  .card.sticky-action .card-action {\n    z-index: 2; }\n  .card.sticky-action .card-reveal {\n    z-index: 1;\n    padding-bottom: 64px; }\n  .card .card-image {\n    position: relative; }\n    .card .card-image img {\n      display: block;\n      border-radius: 2px 2px 0 0;\n      position: relative;\n      left: 0;\n      right: 0;\n      top: 0;\n      bottom: 0;\n      width: 100%; }\n    .card .card-image .card-title {\n      color: #fff;\n      position: absolute;\n      bottom: 0;\n      left: 0;\n      max-width: 100%;\n      padding: 24px; }\n  .card .card-content {\n    padding: 24px;\n    border-radius: 0 0 2px 2px; }\n    .card .card-content p {\n      margin: 0; }\n    .card .card-content .card-title {\n      display: block;\n      line-height: 32px;\n      margin-bottom: 8px; }\n      .card .card-content .card-title i {\n        line-height: 32px; }\n  .card .card-action {\n    background-color: inherit;\n    border-top: 1px solid rgba(160, 160, 160, 0.2);\n    position: relative;\n    padding: 16px 24px; }\n    .card .card-action:last-child {\n      border-radius: 0 0 2px 2px; }\n    .card .card-action a:not(.btn):not(.btn-large):not(.btn-floating) {\n      color: #ffab40;\n      margin-right: 24px;\n      transition: color .3s ease;\n      text-transform: uppercase; }\n      .card .card-action a:not(.btn):not(.btn-large):not(.btn-floating):hover {\n        color: #ffd8a6; }\n  .card .card-reveal {\n    padding: 24px;\n    position: absolute;\n    background-color: #fff;\n    width: 100%;\n    overflow-y: auto;\n    left: 0;\n    top: 100%;\n    height: 100%;\n    z-index: 3;\n    display: none; }\n    .card .card-reveal .card-title {\n      cursor: pointer;\n      display: block; }\n\n#toast-container {\n  display: block;\n  position: fixed;\n  z-index: 10000; }\n  @media only screen and (max-width: 600px) {\n    #toast-container {\n      min-width: 100%;\n      bottom: 0%; } }\n  @media only screen and (min-width: 601px) and (max-width: 992px) {\n    #toast-container {\n      left: 5%;\n      bottom: 7%;\n      max-width: 90%; } }\n  @media only screen and (min-width: 993px) {\n    #toast-container {\n      top: 10%;\n      right: 7%;\n      max-width: 86%; } }\n\n.toast {\n  border-radius: 2px;\n  top: 35px;\n  width: auto;\n  margin-top: 10px;\n  position: relative;\n  max-width: 100%;\n  height: auto;\n  min-height: 48px;\n  line-height: 1.5em;\n  background-color: #323232;\n  padding: 10px 25px;\n  font-size: 1.1rem;\n  font-weight: 300;\n  color: #fff;\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  cursor: default; }\n  .toast .toast-action {\n    color: #eeff41;\n    font-weight: 500;\n    margin-right: -25px;\n    margin-left: 3rem; }\n  .toast.rounded {\n    border-radius: 24px; }\n  @media only screen and (max-width: 600px) {\n    .toast {\n      width: 100%;\n      border-radius: 0; } }\n\n.tabs {\n  position: relative;\n  overflow-x: auto;\n  overflow-y: hidden;\n  height: 48px;\n  width: 100%;\n  background-color: #fff;\n  margin: 0 auto;\n  white-space: nowrap; }\n  .tabs.tabs-transparent {\n    background-color: transparent; }\n    .tabs.tabs-transparent .tab a,\n    .tabs.tabs-transparent .tab.disabled a,\n    .tabs.tabs-transparent .tab.disabled a:hover {\n      color: rgba(255, 255, 255, 0.7); }\n    .tabs.tabs-transparent .tab a:hover,\n    .tabs.tabs-transparent .tab a.active {\n      color: #fff; }\n    .tabs.tabs-transparent .indicator {\n      background-color: #fff; }\n  .tabs.tabs-fixed-width {\n    display: flex; }\n    .tabs.tabs-fixed-width .tab {\n      flex-grow: 1; }\n  .tabs .tab {\n    display: inline-block;\n    text-align: center;\n    line-height: 48px;\n    height: 48px;\n    padding: 0;\n    margin: 0;\n    text-transform: uppercase; }\n    .tabs .tab a {\n      color: rgba(179, 197, 174, 0.7);\n      display: block;\n      width: 100%;\n      height: 100%;\n      padding: 0 24px;\n      font-size: 14px;\n      text-overflow: ellipsis;\n      overflow: hidden;\n      transition: color .28s ease, background-color .28s ease; }\n      .tabs .tab a:focus, .tabs .tab a:focus.active {\n        background-color: rgba(221, 229, 219, 0.2);\n        outline: none; }\n      .tabs .tab a:hover, .tabs .tab a.active {\n        background-color: transparent;\n        color: #b3c5ae; }\n    .tabs .tab.disabled a,\n    .tabs .tab.disabled a:hover {\n      color: rgba(179, 197, 174, 0.4);\n      cursor: default; }\n  .tabs .indicator {\n    position: absolute;\n    bottom: 0;\n    height: 2px;\n    background-color: #dde5db;\n    will-change: left, right; }\n\n@media only screen and (max-width: 992px) {\n  .tabs {\n    display: flex; }\n    .tabs .tab {\n      flex-grow: 1; }\n      .tabs .tab a {\n        padding: 0 12px; } }\n\n.material-tooltip {\n  padding: 10px 8px;\n  font-size: 1rem;\n  z-index: 2000;\n  background-color: transparent;\n  border-radius: 2px;\n  color: #fff;\n  min-height: 36px;\n  line-height: 120%;\n  opacity: 0;\n  position: absolute;\n  text-align: center;\n  max-width: calc(100% - 4px);\n  overflow: hidden;\n  left: 0;\n  top: 0;\n  pointer-events: none;\n  visibility: hidden;\n  background-color: #323232; }\n\n.backdrop {\n  position: absolute;\n  opacity: 0;\n  height: 7px;\n  width: 14px;\n  border-radius: 0 0 50% 50%;\n  background-color: #323232;\n  z-index: -1;\n  transform-origin: 50% 0%;\n  visibility: hidden; }\n\n.dropdown-content {\n  background-color: #fff;\n  margin: 0;\n  display: none;\n  min-width: 100px;\n  overflow-y: auto;\n  opacity: 0;\n  position: absolute;\n  left: 0;\n  top: 0;\n  z-index: 9999;\n  transform-origin: 0 0; }\n  .dropdown-content:focus {\n    outline: 0; }\n  .dropdown-content li {\n    clear: both;\n    color: rgba(0, 0, 0, 0.87);\n    cursor: pointer;\n    min-height: 50px;\n    line-height: 1.5rem;\n    width: 100%;\n    text-align: left; }\n    .dropdown-content li:hover, .dropdown-content li.active {\n      background-color: #eee; }\n    .dropdown-content li:focus {\n      outline: none; }\n    .dropdown-content li.divider {\n      min-height: 0;\n      height: 1px; }\n    .dropdown-content li > a, .dropdown-content li > span {\n      font-size: 16px;\n      color: #b9c8cc;\n      display: block;\n      line-height: 22px;\n      padding: 14px 16px; }\n    .dropdown-content li > span > label {\n      top: 1px;\n      left: 0;\n      height: 18px; }\n    .dropdown-content li > a > i {\n      height: inherit;\n      line-height: inherit;\n      float: left;\n      margin: 0 24px 0 0;\n      width: 24px; }\n\nbody.keyboard-focused .dropdown-content li:focus {\n  background-color: #dadada; }\n\n.input-field.col .dropdown-content [type=\"checkbox\"] + label {\n  top: 1px;\n  left: 0;\n  height: 18px;\n  transform: none; }\n\n.dropdown-trigger {\n  cursor: pointer; }\n\n.modal {\n  display: none;\n  position: fixed;\n  left: 0;\n  right: 0;\n  background-color: #fafafa;\n  padding: 0;\n  max-height: 70%;\n  width: 55%;\n  margin: auto;\n  overflow-y: auto;\n  border-radius: 2px;\n  will-change: top, opacity; }\n  .modal:focus {\n    outline: none; }\n  @media only screen and (max-width: 992px) {\n    .modal {\n      width: 80%; } }\n  .modal h1, .modal h2, .modal h3, .modal h4 {\n    margin-top: 0; }\n  .modal .modal-content {\n    padding: 24px; }\n  .modal .modal-close {\n    cursor: pointer; }\n  .modal .modal-footer {\n    border-radius: 0 0 2px 2px;\n    background-color: #fafafa;\n    padding: 4px 6px;\n    height: 56px;\n    width: 100%;\n    text-align: right; }\n    .modal .modal-footer .btn, .modal .modal-footer .btn-flat {\n      margin: 6px 0; }\n\n.modal-overlay {\n  position: fixed;\n  z-index: 999;\n  top: -25%;\n  left: 0;\n  bottom: 0;\n  right: 0;\n  height: 125%;\n  width: 100%;\n  background: #000;\n  display: none;\n  will-change: opacity; }\n\n.modal.modal-fixed-footer {\n  padding: 0;\n  height: 70%; }\n  .modal.modal-fixed-footer .modal-content {\n    position: absolute;\n    height: calc(100% - 56px);\n    max-height: 100%;\n    width: 100%;\n    overflow-y: auto; }\n  .modal.modal-fixed-footer .modal-footer {\n    border-top: 1px solid rgba(0, 0, 0, 0.1);\n    position: absolute;\n    bottom: 0; }\n\n.modal.bottom-sheet {\n  top: auto;\n  bottom: -100%;\n  margin: 0;\n  width: 100%;\n  max-height: 45%;\n  border-radius: 0;\n  will-change: bottom, opacity; }\n\n.collapsible {\n  border-top: 1px solid #ddd;\n  border-right: 1px solid #ddd;\n  border-left: 1px solid #ddd;\n  margin: 0.5rem 0 1rem 0; }\n\n.collapsible-header {\n  display: flex;\n  cursor: pointer;\n  -webkit-tap-highlight-color: transparent;\n  line-height: 1.5;\n  padding: 1rem;\n  background-color: #fff;\n  border-bottom: 1px solid #ddd; }\n  .collapsible-header:focus {\n    outline: 0; }\n  .collapsible-header i {\n    width: 2rem;\n    font-size: 1.6rem;\n    display: inline-block;\n    text-align: center;\n    margin-right: 1rem; }\n\n.keyboard-focused .collapsible-header:focus {\n  background-color: #eee; }\n\n.collapsible-body {\n  display: none;\n  border-bottom: 1px solid #ddd;\n  box-sizing: border-box;\n  padding: 2rem; }\n\n.sidenav .collapsible,\n.sidenav.fixed .collapsible {\n  border: none;\n  box-shadow: none; }\n  .sidenav .collapsible li,\n  .sidenav.fixed .collapsible li {\n    padding: 0; }\n\n.sidenav .collapsible-header,\n.sidenav.fixed .collapsible-header {\n  background-color: transparent;\n  border: none;\n  line-height: inherit;\n  height: inherit;\n  padding: 0 16px; }\n  .sidenav .collapsible-header:hover,\n  .sidenav.fixed .collapsible-header:hover {\n    background-color: rgba(0, 0, 0, 0.05); }\n  .sidenav .collapsible-header i,\n  .sidenav.fixed .collapsible-header i {\n    line-height: inherit; }\n\n.sidenav .collapsible-body,\n.sidenav.fixed .collapsible-body {\n  border: 0;\n  background-color: #fff; }\n  .sidenav .collapsible-body li a,\n  .sidenav.fixed .collapsible-body li a {\n    padding: 0 23.5px 0 31px; }\n\n.collapsible.popout {\n  border: none;\n  box-shadow: none; }\n  .collapsible.popout > li {\n    box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.16), 0 2px 10px 0 rgba(0, 0, 0, 0.12);\n    margin: 0 24px;\n    transition: margin 0.35s cubic-bezier(0.25, 0.46, 0.45, 0.94); }\n  .collapsible.popout > li.active {\n    box-shadow: 0 5px 11px 0 rgba(0, 0, 0, 0.18), 0 4px 15px 0 rgba(0, 0, 0, 0.15);\n    margin: 16px 0; }\n\n.chip {\n  display: inline-block;\n  height: 32px;\n  font-size: 13px;\n  font-weight: 500;\n  color: rgba(0, 0, 0, 0.6);\n  line-height: 32px;\n  padding: 0 12px;\n  border-radius: 16px;\n  background-color: #e4e4e4;\n  margin-bottom: 5px;\n  margin-right: 5px; }\n  .chip:focus {\n    outline: none;\n    background-color: #10421c;\n    color: #fff; }\n  .chip > img {\n    float: left;\n    margin: 0 8px 0 -12px;\n    height: 32px;\n    width: 32px;\n    border-radius: 50%; }\n  .chip .close {\n    cursor: pointer;\n    float: right;\n    font-size: 16px;\n    line-height: 32px;\n    padding-left: 8px; }\n\n.chips {\n  border: none;\n  border-bottom: 1px solid #9e9e9e;\n  box-shadow: none;\n  margin: 0 0 8px 0;\n  min-height: 45px;\n  outline: none;\n  transition: all .3s; }\n  .chips.focus {\n    border-bottom: 1px solid #10421c;\n    box-shadow: 0 1px 0 0 #10421c; }\n  .chips:hover {\n    cursor: text; }\n  .chips .input {\n    background: none;\n    border: 0;\n    color: rgba(0, 0, 0, 0.6);\n    display: inline-block;\n    font-size: 16px;\n    height: 2.6rem;\n    line-height: 32px;\n    outline: 0;\n    margin: 0;\n    padding: 0 !important;\n    width: 120px !important; }\n  .chips .input:focus {\n    border: 0 !important;\n    box-shadow: none !important; }\n  .chips .autocomplete-content {\n    margin-top: 0;\n    margin-bottom: 0; }\n\n.prefix ~ .chips {\n  margin-left: 3rem;\n  width: 92%;\n  width: calc(100% - 3rem); }\n\n.chips:empty ~ label {\n  font-size: 0.8rem;\n  transform: translateY(-140%); }\n\n.materialboxed {\n  display: block;\n  cursor: zoom-in;\n  position: relative;\n  transition: opacity .4s;\n  -webkit-backface-visibility: hidden; }\n  .materialboxed:hover:not(.active) {\n    opacity: .8; }\n  .materialboxed.active {\n    cursor: zoom-out; }\n\n#materialbox-overlay {\n  position: fixed;\n  top: 0;\n  right: 0;\n  bottom: 0;\n  left: 0;\n  background-color: #292929;\n  z-index: 1000;\n  will-change: opacity; }\n\n.materialbox-caption {\n  position: fixed;\n  display: none;\n  color: #fff;\n  line-height: 50px;\n  bottom: 0;\n  left: 0;\n  width: 100%;\n  text-align: center;\n  padding: 0% 15%;\n  height: 50px;\n  z-index: 1000;\n  -webkit-font-smoothing: antialiased; }\n\nselect:focus {\n  outline: 1px solid white; }\n\nbutton:focus {\n  outline: none;\n  background-color: #c5d1d5; }\n\nlabel {\n  font-size: 0.8rem;\n  color: #9e9e9e; }\n\n/* Text Inputs + Textarea\n   ========================================================================== */\n/* Style Placeholders */\n::placeholder {\n  color: #d1d1d1; }\n\n/* Text inputs */\ninput:not([type]),\ninput[type=text]:not(.browser-default),\ninput[type=password]:not(.browser-default),\ninput[type=email]:not(.browser-default),\ninput[type=url]:not(.browser-default),\ninput[type=time]:not(.browser-default),\ninput[type=date]:not(.browser-default),\ninput[type=datetime]:not(.browser-default),\ninput[type=datetime-local]:not(.browser-default),\ninput[type=tel]:not(.browser-default),\ninput[type=number]:not(.browser-default),\ninput[type=search]:not(.browser-default),\ntextarea.materialize-textarea {\n  background-color: transparent;\n  border: none;\n  border-bottom: 1px solid #9e9e9e;\n  border-radius: 0;\n  outline: none;\n  height: 2.6rem;\n  width: 100%;\n  font-size: 16px;\n  margin: 0 0 8px 0;\n  padding: 0;\n  box-shadow: none;\n  box-sizing: content-box;\n  transition: box-shadow .3s, border .3s; }\n  input:not([type]):disabled, input:not([type])[readonly=\"readonly\"],\n  input[type=text]:not(.browser-default):disabled,\n  input[type=text]:not(.browser-default)[readonly=\"readonly\"],\n  input[type=password]:not(.browser-default):disabled,\n  input[type=password]:not(.browser-default)[readonly=\"readonly\"],\n  input[type=email]:not(.browser-default):disabled,\n  input[type=email]:not(.browser-default)[readonly=\"readonly\"],\n  input[type=url]:not(.browser-default):disabled,\n  input[type=url]:not(.browser-default)[readonly=\"readonly\"],\n  input[type=time]:not(.browser-default):disabled,\n  input[type=time]:not(.browser-default)[readonly=\"readonly\"],\n  input[type=date]:not(.browser-default):disabled,\n  input[type=date]:not(.browser-default)[readonly=\"readonly\"],\n  input[type=datetime]:not(.browser-default):disabled,\n  input[type=datetime]:not(.browser-default)[readonly=\"readonly\"],\n  input[type=datetime-local]:not(.browser-default):disabled,\n  input[type=datetime-local]:not(.browser-default)[readonly=\"readonly\"],\n  input[type=tel]:not(.browser-default):disabled,\n  input[type=tel]:not(.browser-default)[readonly=\"readonly\"],\n  input[type=number]:not(.browser-default):disabled,\n  input[type=number]:not(.browser-default)[readonly=\"readonly\"],\n  input[type=search]:not(.browser-default):disabled,\n  input[type=search]:not(.browser-default)[readonly=\"readonly\"],\n  textarea.materialize-textarea:disabled,\n  textarea.materialize-textarea[readonly=\"readonly\"] {\n    color: rgba(0, 0, 0, 0.42);\n    border-bottom: 1px dotted rgba(0, 0, 0, 0.42); }\n  input:not([type]):disabled + label,\n  input:not([type])[readonly=\"readonly\"] + label,\n  input[type=text]:not(.browser-default):disabled + label,\n  input[type=text]:not(.browser-default)[readonly=\"readonly\"] + label,\n  input[type=password]:not(.browser-default):disabled + label,\n  input[type=password]:not(.browser-default)[readonly=\"readonly\"] + label,\n  input[type=email]:not(.browser-default):disabled + label,\n  input[type=email]:not(.browser-default)[readonly=\"readonly\"] + label,\n  input[type=url]:not(.browser-default):disabled + label,\n  input[type=url]:not(.browser-default)[readonly=\"readonly\"] + label,\n  input[type=time]:not(.browser-default):disabled + label,\n  input[type=time]:not(.browser-default)[readonly=\"readonly\"] + label,\n  input[type=date]:not(.browser-default):disabled + label,\n  input[type=date]:not(.browser-default)[readonly=\"readonly\"] + label,\n  input[type=datetime]:not(.browser-default):disabled + label,\n  input[type=datetime]:not(.browser-default)[readonly=\"readonly\"] + label,\n  input[type=datetime-local]:not(.browser-default):disabled + label,\n  input[type=datetime-local]:not(.browser-default)[readonly=\"readonly\"] + label,\n  input[type=tel]:not(.browser-default):disabled + label,\n  input[type=tel]:not(.browser-default)[readonly=\"readonly\"] + label,\n  input[type=number]:not(.browser-default):disabled + label,\n  input[type=number]:not(.browser-default)[readonly=\"readonly\"] + label,\n  input[type=search]:not(.browser-default):disabled + label,\n  input[type=search]:not(.browser-default)[readonly=\"readonly\"] + label,\n  textarea.materialize-textarea:disabled + label,\n  textarea.materialize-textarea[readonly=\"readonly\"] + label {\n    color: rgba(0, 0, 0, 0.42); }\n  input:not([type]):focus:not([readonly]),\n  input[type=text]:not(.browser-default):focus:not([readonly]),\n  input[type=password]:not(.browser-default):focus:not([readonly]),\n  input[type=email]:not(.browser-default):focus:not([readonly]),\n  input[type=url]:not(.browser-default):focus:not([readonly]),\n  input[type=time]:not(.browser-default):focus:not([readonly]),\n  input[type=date]:not(.browser-default):focus:not([readonly]),\n  input[type=datetime]:not(.browser-default):focus:not([readonly]),\n  input[type=datetime-local]:not(.browser-default):focus:not([readonly]),\n  input[type=tel]:not(.browser-default):focus:not([readonly]),\n  input[type=number]:not(.browser-default):focus:not([readonly]),\n  input[type=search]:not(.browser-default):focus:not([readonly]),\n  textarea.materialize-textarea:focus:not([readonly]) {\n    border-bottom: 1px solid #b9c8cc;\n    box-shadow: 0 1px 0 0 #b9c8cc; }\n  input:not([type]):focus:not([readonly]) + label,\n  input[type=text]:not(.browser-default):focus:not([readonly]) + label,\n  input[type=password]:not(.browser-default):focus:not([readonly]) + label,\n  input[type=email]:not(.browser-default):focus:not([readonly]) + label,\n  input[type=url]:not(.browser-default):focus:not([readonly]) + label,\n  input[type=time]:not(.browser-default):focus:not([readonly]) + label,\n  input[type=date]:not(.browser-default):focus:not([readonly]) + label,\n  input[type=datetime]:not(.browser-default):focus:not([readonly]) + label,\n  input[type=datetime-local]:not(.browser-default):focus:not([readonly]) + label,\n  input[type=tel]:not(.browser-default):focus:not([readonly]) + label,\n  input[type=number]:not(.browser-default):focus:not([readonly]) + label,\n  input[type=search]:not(.browser-default):focus:not([readonly]) + label,\n  textarea.materialize-textarea:focus:not([readonly]) + label {\n    color: #b9c8cc; }\n  input:not([type]):focus.valid ~ label,\n  input[type=text]:not(.browser-default):focus.valid ~ label,\n  input[type=password]:not(.browser-default):focus.valid ~ label,\n  input[type=email]:not(.browser-default):focus.valid ~ label,\n  input[type=url]:not(.browser-default):focus.valid ~ label,\n  input[type=time]:not(.browser-default):focus.valid ~ label,\n  input[type=date]:not(.browser-default):focus.valid ~ label,\n  input[type=datetime]:not(.browser-default):focus.valid ~ label,\n  input[type=datetime-local]:not(.browser-default):focus.valid ~ label,\n  input[type=tel]:not(.browser-default):focus.valid ~ label,\n  input[type=number]:not(.browser-default):focus.valid ~ label,\n  input[type=search]:not(.browser-default):focus.valid ~ label,\n  textarea.materialize-textarea:focus.valid ~ label {\n    color: #4CAF50; }\n  input:not([type]):focus.invalid ~ label,\n  input[type=text]:not(.browser-default):focus.invalid ~ label,\n  input[type=password]:not(.browser-default):focus.invalid ~ label,\n  input[type=email]:not(.browser-default):focus.invalid ~ label,\n  input[type=url]:not(.browser-default):focus.invalid ~ label,\n  input[type=time]:not(.browser-default):focus.invalid ~ label,\n  input[type=date]:not(.browser-default):focus.invalid ~ label,\n  input[type=datetime]:not(.browser-default):focus.invalid ~ label,\n  input[type=datetime-local]:not(.browser-default):focus.invalid ~ label,\n  input[type=tel]:not(.browser-default):focus.invalid ~ label,\n  input[type=number]:not(.browser-default):focus.invalid ~ label,\n  input[type=search]:not(.browser-default):focus.invalid ~ label,\n  textarea.materialize-textarea:focus.invalid ~ label {\n    color: #F44336; }\n  input:not([type]).validate + label,\n  input[type=text]:not(.browser-default).validate + label,\n  input[type=password]:not(.browser-default).validate + label,\n  input[type=email]:not(.browser-default).validate + label,\n  input[type=url]:not(.browser-default).validate + label,\n  input[type=time]:not(.browser-default).validate + label,\n  input[type=date]:not(.browser-default).validate + label,\n  input[type=datetime]:not(.browser-default).validate + label,\n  input[type=datetime-local]:not(.browser-default).validate + label,\n  input[type=tel]:not(.browser-default).validate + label,\n  input[type=number]:not(.browser-default).validate + label,\n  input[type=search]:not(.browser-default).validate + label,\n  textarea.materialize-textarea.validate + label {\n    width: 100%; }\n\n/* Validation Sass Placeholders */\ninput.valid:not([type]), input.valid:not([type]):focus,\ninput.valid[type=text]:not(.browser-default),\ninput.valid[type=text]:not(.browser-default):focus,\ninput.valid[type=password]:not(.browser-default),\ninput.valid[type=password]:not(.browser-default):focus,\ninput.valid[type=email]:not(.browser-default),\ninput.valid[type=email]:not(.browser-default):focus,\ninput.valid[type=url]:not(.browser-default),\ninput.valid[type=url]:not(.browser-default):focus,\ninput.valid[type=time]:not(.browser-default),\ninput.valid[type=time]:not(.browser-default):focus,\ninput.valid[type=date]:not(.browser-default),\ninput.valid[type=date]:not(.browser-default):focus,\ninput.valid[type=datetime]:not(.browser-default),\ninput.valid[type=datetime]:not(.browser-default):focus,\ninput.valid[type=datetime-local]:not(.browser-default),\ninput.valid[type=datetime-local]:not(.browser-default):focus,\ninput.valid[type=tel]:not(.browser-default),\ninput.valid[type=tel]:not(.browser-default):focus,\ninput.valid[type=number]:not(.browser-default),\ninput.valid[type=number]:not(.browser-default):focus,\ninput.valid[type=search]:not(.browser-default),\ninput.valid[type=search]:not(.browser-default):focus,\ntextarea.materialize-textarea.valid,\ntextarea.materialize-textarea.valid:focus, .select-wrapper.valid > input.select-dropdown {\n  border-bottom: 1px solid #4CAF50;\n  box-shadow: 0 1px 0 0 #4CAF50; }\n\ninput.invalid:not([type]), input.invalid:not([type]):focus,\ninput.invalid[type=text]:not(.browser-default),\ninput.invalid[type=text]:not(.browser-default):focus,\ninput.invalid[type=password]:not(.browser-default),\ninput.invalid[type=password]:not(.browser-default):focus,\ninput.invalid[type=email]:not(.browser-default),\ninput.invalid[type=email]:not(.browser-default):focus,\ninput.invalid[type=url]:not(.browser-default),\ninput.invalid[type=url]:not(.browser-default):focus,\ninput.invalid[type=time]:not(.browser-default),\ninput.invalid[type=time]:not(.browser-default):focus,\ninput.invalid[type=date]:not(.browser-default),\ninput.invalid[type=date]:not(.browser-default):focus,\ninput.invalid[type=datetime]:not(.browser-default),\ninput.invalid[type=datetime]:not(.browser-default):focus,\ninput.invalid[type=datetime-local]:not(.browser-default),\ninput.invalid[type=datetime-local]:not(.browser-default):focus,\ninput.invalid[type=tel]:not(.browser-default),\ninput.invalid[type=tel]:not(.browser-default):focus,\ninput.invalid[type=number]:not(.browser-default),\ninput.invalid[type=number]:not(.browser-default):focus,\ninput.invalid[type=search]:not(.browser-default),\ninput.invalid[type=search]:not(.browser-default):focus,\ntextarea.materialize-textarea.invalid,\ntextarea.materialize-textarea.invalid:focus, .select-wrapper.invalid > input.select-dropdown,\n.select-wrapper.invalid > input.select-dropdown:focus {\n  border-bottom: 1px solid #F44336;\n  box-shadow: 0 1px 0 0 #F44336; }\n\ninput:not([type]).valid ~ .helper-text[data-success],\ninput:not([type]):focus.valid ~ .helper-text[data-success],\ninput:not([type]).invalid ~ .helper-text[data-error],\ninput:not([type]):focus.invalid ~ .helper-text[data-error],\ninput[type=text]:not(.browser-default).valid ~ .helper-text[data-success],\ninput[type=text]:not(.browser-default):focus.valid ~ .helper-text[data-success],\ninput[type=text]:not(.browser-default).invalid ~ .helper-text[data-error],\ninput[type=text]:not(.browser-default):focus.invalid ~ .helper-text[data-error],\ninput[type=password]:not(.browser-default).valid ~ .helper-text[data-success],\ninput[type=password]:not(.browser-default):focus.valid ~ .helper-text[data-success],\ninput[type=password]:not(.browser-default).invalid ~ .helper-text[data-error],\ninput[type=password]:not(.browser-default):focus.invalid ~ .helper-text[data-error],\ninput[type=email]:not(.browser-default).valid ~ .helper-text[data-success],\ninput[type=email]:not(.browser-default):focus.valid ~ .helper-text[data-success],\ninput[type=email]:not(.browser-default).invalid ~ .helper-text[data-error],\ninput[type=email]:not(.browser-default):focus.invalid ~ .helper-text[data-error],\ninput[type=url]:not(.browser-default).valid ~ .helper-text[data-success],\ninput[type=url]:not(.browser-default):focus.valid ~ .helper-text[data-success],\ninput[type=url]:not(.browser-default).invalid ~ .helper-text[data-error],\ninput[type=url]:not(.browser-default):focus.invalid ~ .helper-text[data-error],\ninput[type=time]:not(.browser-default).valid ~ .helper-text[data-success],\ninput[type=time]:not(.browser-default):focus.valid ~ .helper-text[data-success],\ninput[type=time]:not(.browser-default).invalid ~ .helper-text[data-error],\ninput[type=time]:not(.browser-default):focus.invalid ~ .helper-text[data-error],\ninput[type=date]:not(.browser-default).valid ~ .helper-text[data-success],\ninput[type=date]:not(.browser-default):focus.valid ~ .helper-text[data-success],\ninput[type=date]:not(.browser-default).invalid ~ .helper-text[data-error],\ninput[type=date]:not(.browser-default):focus.invalid ~ .helper-text[data-error],\ninput[type=datetime]:not(.browser-default).valid ~ .helper-text[data-success],\ninput[type=datetime]:not(.browser-default):focus.valid ~ .helper-text[data-success],\ninput[type=datetime]:not(.browser-default).invalid ~ .helper-text[data-error],\ninput[type=datetime]:not(.browser-default):focus.invalid ~ .helper-text[data-error],\ninput[type=datetime-local]:not(.browser-default).valid ~ .helper-text[data-success],\ninput[type=datetime-local]:not(.browser-default):focus.valid ~ .helper-text[data-success],\ninput[type=datetime-local]:not(.browser-default).invalid ~ .helper-text[data-error],\ninput[type=datetime-local]:not(.browser-default):focus.invalid ~ .helper-text[data-error],\ninput[type=tel]:not(.browser-default).valid ~ .helper-text[data-success],\ninput[type=tel]:not(.browser-default):focus.valid ~ .helper-text[data-success],\ninput[type=tel]:not(.browser-default).invalid ~ .helper-text[data-error],\ninput[type=tel]:not(.browser-default):focus.invalid ~ .helper-text[data-error],\ninput[type=number]:not(.browser-default).valid ~ .helper-text[data-success],\ninput[type=number]:not(.browser-default):focus.valid ~ .helper-text[data-success],\ninput[type=number]:not(.browser-default).invalid ~ .helper-text[data-error],\ninput[type=number]:not(.browser-default):focus.invalid ~ .helper-text[data-error],\ninput[type=search]:not(.browser-default).valid ~ .helper-text[data-success],\ninput[type=search]:not(.browser-default):focus.valid ~ .helper-text[data-success],\ninput[type=search]:not(.browser-default).invalid ~ .helper-text[data-error],\ninput[type=search]:not(.browser-default):focus.invalid ~ .helper-text[data-error],\ntextarea.materialize-textarea.valid ~ .helper-text[data-success],\ntextarea.materialize-textarea:focus.valid ~ .helper-text[data-success],\ntextarea.materialize-textarea.invalid ~ .helper-text[data-error],\ntextarea.materialize-textarea:focus.invalid ~ .helper-text[data-error], .select-wrapper.valid .helper-text[data-success],\n.select-wrapper.invalid ~ .helper-text[data-error] {\n  color: transparent;\n  user-select: none;\n  pointer-events: none; }\n\ninput:not([type]).valid ~ .helper-text:after,\ninput:not([type]):focus.valid ~ .helper-text:after,\ninput[type=text]:not(.browser-default).valid ~ .helper-text:after,\ninput[type=text]:not(.browser-default):focus.valid ~ .helper-text:after,\ninput[type=password]:not(.browser-default).valid ~ .helper-text:after,\ninput[type=password]:not(.browser-default):focus.valid ~ .helper-text:after,\ninput[type=email]:not(.browser-default).valid ~ .helper-text:after,\ninput[type=email]:not(.browser-default):focus.valid ~ .helper-text:after,\ninput[type=url]:not(.browser-default).valid ~ .helper-text:after,\ninput[type=url]:not(.browser-default):focus.valid ~ .helper-text:after,\ninput[type=time]:not(.browser-default).valid ~ .helper-text:after,\ninput[type=time]:not(.browser-default):focus.valid ~ .helper-text:after,\ninput[type=date]:not(.browser-default).valid ~ .helper-text:after,\ninput[type=date]:not(.browser-default):focus.valid ~ .helper-text:after,\ninput[type=datetime]:not(.browser-default).valid ~ .helper-text:after,\ninput[type=datetime]:not(.browser-default):focus.valid ~ .helper-text:after,\ninput[type=datetime-local]:not(.browser-default).valid ~ .helper-text:after,\ninput[type=datetime-local]:not(.browser-default):focus.valid ~ .helper-text:after,\ninput[type=tel]:not(.browser-default).valid ~ .helper-text:after,\ninput[type=tel]:not(.browser-default):focus.valid ~ .helper-text:after,\ninput[type=number]:not(.browser-default).valid ~ .helper-text:after,\ninput[type=number]:not(.browser-default):focus.valid ~ .helper-text:after,\ninput[type=search]:not(.browser-default).valid ~ .helper-text:after,\ninput[type=search]:not(.browser-default):focus.valid ~ .helper-text:after,\ntextarea.materialize-textarea.valid ~ .helper-text:after,\ntextarea.materialize-textarea:focus.valid ~ .helper-text:after, .select-wrapper.valid ~ .helper-text:after {\n  content: attr(data-success);\n  color: #4CAF50; }\n\ninput:not([type]).invalid ~ .helper-text:after,\ninput:not([type]):focus.invalid ~ .helper-text:after,\ninput[type=text]:not(.browser-default).invalid ~ .helper-text:after,\ninput[type=text]:not(.browser-default):focus.invalid ~ .helper-text:after,\ninput[type=password]:not(.browser-default).invalid ~ .helper-text:after,\ninput[type=password]:not(.browser-default):focus.invalid ~ .helper-text:after,\ninput[type=email]:not(.browser-default).invalid ~ .helper-text:after,\ninput[type=email]:not(.browser-default):focus.invalid ~ .helper-text:after,\ninput[type=url]:not(.browser-default).invalid ~ .helper-text:after,\ninput[type=url]:not(.browser-default):focus.invalid ~ .helper-text:after,\ninput[type=time]:not(.browser-default).invalid ~ .helper-text:after,\ninput[type=time]:not(.browser-default):focus.invalid ~ .helper-text:after,\ninput[type=date]:not(.browser-default).invalid ~ .helper-text:after,\ninput[type=date]:not(.browser-default):focus.invalid ~ .helper-text:after,\ninput[type=datetime]:not(.browser-default).invalid ~ .helper-text:after,\ninput[type=datetime]:not(.browser-default):focus.invalid ~ .helper-text:after,\ninput[type=datetime-local]:not(.browser-default).invalid ~ .helper-text:after,\ninput[type=datetime-local]:not(.browser-default):focus.invalid ~ .helper-text:after,\ninput[type=tel]:not(.browser-default).invalid ~ .helper-text:after,\ninput[type=tel]:not(.browser-default):focus.invalid ~ .helper-text:after,\ninput[type=number]:not(.browser-default).invalid ~ .helper-text:after,\ninput[type=number]:not(.browser-default):focus.invalid ~ .helper-text:after,\ninput[type=search]:not(.browser-default).invalid ~ .helper-text:after,\ninput[type=search]:not(.browser-default):focus.invalid ~ .helper-text:after,\ntextarea.materialize-textarea.invalid ~ .helper-text:after,\ntextarea.materialize-textarea:focus.invalid ~ .helper-text:after, .select-wrapper.invalid ~ .helper-text:after {\n  content: attr(data-error);\n  color: #F44336; }\n\ninput:not([type]) + label:after,\ninput[type=text]:not(.browser-default) + label:after,\ninput[type=password]:not(.browser-default) + label:after,\ninput[type=email]:not(.browser-default) + label:after,\ninput[type=url]:not(.browser-default) + label:after,\ninput[type=time]:not(.browser-default) + label:after,\ninput[type=date]:not(.browser-default) + label:after,\ninput[type=datetime]:not(.browser-default) + label:after,\ninput[type=datetime-local]:not(.browser-default) + label:after,\ninput[type=tel]:not(.browser-default) + label:after,\ninput[type=number]:not(.browser-default) + label:after,\ninput[type=search]:not(.browser-default) + label:after,\ntextarea.materialize-textarea + label:after, .select-wrapper + label:after {\n  display: block;\n  content: \"\";\n  position: absolute;\n  top: 100%;\n  left: 0;\n  opacity: 0;\n  transition: .2s opacity ease-out, .2s color ease-out; }\n\n.input-field {\n  position: relative;\n  margin-top: 1rem;\n  margin-bottom: 1rem; }\n  .input-field.inline {\n    display: inline-block;\n    vertical-align: middle;\n    margin-left: 5px; }\n    .input-field.inline input,\n    .input-field.inline .select-dropdown {\n      margin-bottom: 1rem; }\n  .input-field.col label {\n    left: 0.75rem; }\n  .input-field.col .prefix ~ label,\n  .input-field.col .prefix ~ .validate ~ label {\n    width: calc(100% - 3rem - 1.5rem); }\n  .input-field > label {\n    color: #9e9e9e;\n    position: absolute;\n    top: 0;\n    left: 0;\n    font-size: 1rem;\n    cursor: text;\n    transition: transform .2s ease-out, color .2s ease-out;\n    transform-origin: 0% 100%;\n    text-align: initial;\n    transform: translateY(12px); }\n    .input-field > label:not(.label-icon).active {\n      transform: translateY(-14px) scale(0.8);\n      transform-origin: 0 0; }\n  .input-field > input[type]:-webkit-autofill:not(.browser-default):not([type=\"search\"]) + label,\n  .input-field > input[type=date]:not(.browser-default) + label,\n  .input-field > input[type=time]:not(.browser-default) + label {\n    transform: translateY(-14px) scale(0.8);\n    transform-origin: 0 0; }\n  .input-field .helper-text {\n    position: relative;\n    min-height: 18px;\n    display: block;\n    font-size: 12px;\n    color: rgba(0, 0, 0, 0.54); }\n    .input-field .helper-text::after {\n      opacity: 1;\n      position: absolute;\n      top: 0;\n      left: 0; }\n  .input-field .prefix {\n    position: absolute;\n    width: 2.6rem;\n    font-size: 2rem;\n    transition: color .2s;\n    top: 0.3rem; }\n    .input-field .prefix.active {\n      color: #b9c8cc; }\n  .input-field .prefix ~ input,\n  .input-field .prefix ~ textarea,\n  .input-field .prefix ~ label,\n  .input-field .prefix ~ .validate ~ label,\n  .input-field .prefix ~ .helper-text,\n  .input-field .prefix ~ .autocomplete-content {\n    margin-left: 3rem;\n    width: 92%;\n    width: calc(100% - 3rem); }\n  .input-field .prefix ~ label {\n    margin-left: 3rem; }\n  @media only screen and (max-width: 992px) {\n    .input-field .prefix ~ input {\n      width: 86%;\n      width: calc(100% - 3rem); } }\n  @media only screen and (max-width: 600px) {\n    .input-field .prefix ~ input {\n      width: 80%;\n      width: calc(100% - 3rem); } }\n\n/* Search Field */\n.input-field input[type=search] {\n  display: block;\n  line-height: inherit;\n  transition: .3s background-color; }\n  .nav-wrapper .input-field input[type=search] {\n    height: inherit;\n    padding-left: 4rem;\n    width: calc(100% - 4rem);\n    border: 0;\n    box-shadow: none; }\n  .input-field input[type=search]:focus:not(.browser-default) {\n    background-color: #fff;\n    border: 0;\n    box-shadow: none;\n    color: #444; }\n    .input-field input[type=search]:focus:not(.browser-default) + label i,\n    .input-field input[type=search]:focus:not(.browser-default) ~ .mdi-navigation-close,\n    .input-field input[type=search]:focus:not(.browser-default) ~ .material-icons {\n      color: #444; }\n  .input-field input[type=search] + .label-icon {\n    transform: none;\n    left: 1rem; }\n  .input-field input[type=search] ~ .mdi-navigation-close,\n  .input-field input[type=search] ~ .material-icons {\n    position: absolute;\n    top: 0;\n    right: 1rem;\n    color: transparent;\n    cursor: pointer;\n    font-size: 2rem;\n    transition: .3s color; }\n\n/* Textarea */\ntextarea {\n  width: 100%;\n  height: 2.6rem;\n  background-color: transparent; }\n  textarea.materialize-textarea {\n    line-height: normal;\n    overflow-y: hidden;\n    /* prevents scroll bar flash */\n    padding: .8rem 0 .8rem 0;\n    /* prevents text jump on Enter keypress */\n    resize: none;\n    min-height: 2.6rem;\n    box-sizing: border-box; }\n\n.hiddendiv {\n  visibility: hidden;\n  white-space: pre-wrap;\n  word-wrap: break-word;\n  overflow-wrap: break-word;\n  /* future version of deprecated 'word-wrap' */\n  padding-top: 1.2rem;\n  /* prevents text jump on Enter keypress */\n  position: absolute;\n  top: 0;\n  z-index: -1; }\n\n/* Autocomplete */\n.autocomplete-content li .highlight {\n  color: #444; }\n\n.autocomplete-content li img {\n  height: 40px;\n  width: 40px;\n  margin: 5px 15px; }\n\n/* Character Counter */\n.character-counter {\n  min-height: 18px; }\n\n/* Radio Buttons\n   ========================================================================== */\n[type=\"radio\"]:not(:checked),\n[type=\"radio\"]:checked {\n  position: absolute;\n  opacity: 0;\n  pointer-events: none; }\n\n[type=\"radio\"]:not(:checked) + span,\n[type=\"radio\"]:checked + span {\n  position: relative;\n  padding-left: 35px;\n  cursor: pointer;\n  display: inline-block;\n  height: 25px;\n  line-height: 25px;\n  font-size: 1rem;\n  transition: .28s ease;\n  user-select: none; }\n\n[type=\"radio\"] + span:before,\n[type=\"radio\"] + span:after {\n  content: '';\n  position: absolute;\n  left: 0;\n  top: 0;\n  margin: 4px;\n  width: 16px;\n  height: 16px;\n  z-index: 0;\n  transition: .28s ease; }\n\n/* Unchecked styles */\n[type=\"radio\"]:not(:checked) + span:before,\n[type=\"radio\"]:not(:checked) + span:after,\n[type=\"radio\"]:checked + span:before,\n[type=\"radio\"]:checked + span:after,\n[type=\"radio\"].with-gap:checked + span:before,\n[type=\"radio\"].with-gap:checked + span:after {\n  border-radius: 50%; }\n\n[type=\"radio\"]:not(:checked) + span:before,\n[type=\"radio\"]:not(:checked) + span:after {\n  border: 2px solid #5a5a5a; }\n\n[type=\"radio\"]:not(:checked) + span:after {\n  transform: scale(0); }\n\n/* Checked styles */\n[type=\"radio\"]:checked + span:before {\n  border: 2px solid transparent; }\n\n[type=\"radio\"]:checked + span:after,\n[type=\"radio\"].with-gap:checked + span:before,\n[type=\"radio\"].with-gap:checked + span:after {\n  border: 2px solid #b9c8cc; }\n\n[type=\"radio\"]:checked + span:after,\n[type=\"radio\"].with-gap:checked + span:after {\n  background-color: #b9c8cc; }\n\n[type=\"radio\"]:checked + span:after {\n  transform: scale(1.02); }\n\n/* Radio With gap */\n[type=\"radio\"].with-gap:checked + span:after {\n  transform: scale(0.5); }\n\n/* Focused styles */\n[type=\"radio\"].tabbed:focus + span:before {\n  box-shadow: 0 0 0 10px rgba(0, 0, 0, 0.1); }\n\n/* Disabled Radio With gap */\n[type=\"radio\"].with-gap:disabled:checked + span:before {\n  border: 2px solid rgba(0, 0, 0, 0.42); }\n\n[type=\"radio\"].with-gap:disabled:checked + span:after {\n  border: none;\n  background-color: rgba(0, 0, 0, 0.42); }\n\n/* Disabled style */\n[type=\"radio\"]:disabled:not(:checked) + span:before,\n[type=\"radio\"]:disabled:checked + span:before {\n  background-color: transparent;\n  border-color: rgba(0, 0, 0, 0.42); }\n\n[type=\"radio\"]:disabled + span {\n  color: rgba(0, 0, 0, 0.42); }\n\n[type=\"radio\"]:disabled:not(:checked) + span:before {\n  border-color: rgba(0, 0, 0, 0.42); }\n\n[type=\"radio\"]:disabled:checked + span:after {\n  background-color: rgba(0, 0, 0, 0.42);\n  border-color: #949494; }\n\n/* Checkboxes\n   ========================================================================== */\n/* Remove default checkbox */\n[type=\"checkbox\"]:not(:checked),\n[type=\"checkbox\"]:checked {\n  position: absolute;\n  opacity: 0;\n  pointer-events: none; }\n\n[type=\"checkbox\"] {\n  /* checkbox aspect */ }\n  [type=\"checkbox\"] + span:not(.lever) {\n    position: relative;\n    padding-left: 35px;\n    cursor: pointer;\n    display: inline-block;\n    height: 25px;\n    line-height: 25px;\n    font-size: 1rem;\n    user-select: none; }\n  [type=\"checkbox\"] + span:not(.lever):before,\n  [type=\"checkbox\"]:not(.filled-in) + span:not(.lever):after {\n    content: '';\n    position: absolute;\n    top: 0;\n    left: 0;\n    width: 18px;\n    height: 18px;\n    z-index: 0;\n    border: 2px solid #5a5a5a;\n    border-radius: 1px;\n    margin-top: 3px;\n    transition: .2s; }\n  [type=\"checkbox\"]:not(.filled-in) + span:not(.lever):after {\n    border: 0;\n    transform: scale(0); }\n  [type=\"checkbox\"]:not(:checked):disabled + span:not(.lever):before {\n    border: none;\n    background-color: rgba(0, 0, 0, 0.42); }\n  [type=\"checkbox\"].tabbed:focus + span:not(.lever):after {\n    transform: scale(1);\n    border: 0;\n    border-radius: 50%;\n    box-shadow: 0 0 0 10px rgba(0, 0, 0, 0.1);\n    background-color: rgba(0, 0, 0, 0.1); }\n\n[type=\"checkbox\"]:checked + span:not(.lever):before {\n  top: -4px;\n  left: -5px;\n  width: 12px;\n  height: 22px;\n  border-top: 2px solid transparent;\n  border-left: 2px solid transparent;\n  border-right: 2px solid #b9c8cc;\n  border-bottom: 2px solid #b9c8cc;\n  transform: rotate(40deg);\n  backface-visibility: hidden;\n  transform-origin: 100% 100%; }\n\n[type=\"checkbox\"]:checked:disabled + span:before {\n  border-right: 2px solid rgba(0, 0, 0, 0.42);\n  border-bottom: 2px solid rgba(0, 0, 0, 0.42); }\n\n/* Indeterminate checkbox */\n[type=\"checkbox\"]:indeterminate + span:not(.lever):before {\n  top: -11px;\n  left: -12px;\n  width: 10px;\n  height: 22px;\n  border-top: none;\n  border-left: none;\n  border-right: 2px solid #b9c8cc;\n  border-bottom: none;\n  transform: rotate(90deg);\n  backface-visibility: hidden;\n  transform-origin: 100% 100%; }\n\n[type=\"checkbox\"]:indeterminate:disabled + span:not(.lever):before {\n  border-right: 2px solid rgba(0, 0, 0, 0.42);\n  background-color: transparent; }\n\n[type=\"checkbox\"].filled-in + span:not(.lever):after {\n  border-radius: 2px; }\n\n[type=\"checkbox\"].filled-in + span:not(.lever):before,\n[type=\"checkbox\"].filled-in + span:not(.lever):after {\n  content: '';\n  left: 0;\n  position: absolute;\n  /* .1s delay is for check animation */\n  transition: border .25s, background-color .25s, width .20s .1s, height .20s .1s, top .20s .1s, left .20s .1s;\n  z-index: 1; }\n\n[type=\"checkbox\"].filled-in:not(:checked) + span:not(.lever):before {\n  width: 0;\n  height: 0;\n  border: 3px solid transparent;\n  left: 6px;\n  top: 10px;\n  transform: rotateZ(37deg);\n  transform-origin: 100% 100%; }\n\n[type=\"checkbox\"].filled-in:not(:checked) + span:not(.lever):after {\n  height: 20px;\n  width: 20px;\n  background-color: transparent;\n  border: 2px solid #5a5a5a;\n  top: 0px;\n  z-index: 0; }\n\n[type=\"checkbox\"].filled-in:checked + span:not(.lever):before {\n  top: 0;\n  left: 1px;\n  width: 8px;\n  height: 13px;\n  border-top: 2px solid transparent;\n  border-left: 2px solid transparent;\n  border-right: 2px solid #fff;\n  border-bottom: 2px solid #fff;\n  transform: rotateZ(37deg);\n  transform-origin: 100% 100%; }\n\n[type=\"checkbox\"].filled-in:checked + span:not(.lever):after {\n  top: 0;\n  width: 20px;\n  height: 20px;\n  border: 2px solid #b9c8cc;\n  background-color: #b9c8cc;\n  z-index: 0; }\n\n[type=\"checkbox\"].filled-in.tabbed:focus + span:not(.lever):after {\n  border-radius: 2px;\n  border-color: #5a5a5a;\n  background-color: rgba(0, 0, 0, 0.1); }\n\n[type=\"checkbox\"].filled-in.tabbed:checked:focus + span:not(.lever):after {\n  border-radius: 2px;\n  background-color: #b9c8cc;\n  border-color: #b9c8cc; }\n\n[type=\"checkbox\"].filled-in:disabled:not(:checked) + span:not(.lever):before {\n  background-color: transparent;\n  border: 2px solid transparent; }\n\n[type=\"checkbox\"].filled-in:disabled:not(:checked) + span:not(.lever):after {\n  border-color: transparent;\n  background-color: #949494; }\n\n[type=\"checkbox\"].filled-in:disabled:checked + span:not(.lever):before {\n  background-color: transparent; }\n\n[type=\"checkbox\"].filled-in:disabled:checked + span:not(.lever):after {\n  background-color: #949494;\n  border-color: #949494; }\n\n/* Switch\r\n   ========================================================================== */\n.switch,\n.switch * {\n  -webkit-tap-highlight-color: transparent;\n  user-select: none; }\n\n.switch label {\n  cursor: pointer; }\n\n.switch label input[type=checkbox] {\n  opacity: 0;\n  width: 0;\n  height: 0; }\n  .switch label input[type=checkbox]:checked + .lever {\n    background-color: white; }\n    .switch label input[type=checkbox]:checked + .lever:before, .switch label input[type=checkbox]:checked + .lever:after {\n      left: 18px; }\n    .switch label input[type=checkbox]:checked + .lever:after {\n      background-color: #b9c8cc; }\n\n.switch label .lever {\n  content: \"\";\n  display: inline-block;\n  position: relative;\n  width: 36px;\n  height: 14px;\n  background-color: rgba(0, 0, 0, 0.38);\n  border-radius: 15px;\n  margin-right: 10px;\n  transition: background 0.3s ease;\n  vertical-align: middle;\n  margin: 0 16px; }\n  .switch label .lever:before, .switch label .lever:after {\n    content: \"\";\n    position: absolute;\n    display: inline-block;\n    width: 20px;\n    height: 20px;\n    border-radius: 50%;\n    left: 0;\n    top: -3px;\n    transition: left 0.3s ease, background .3s ease, box-shadow 0.1s ease, transform .1s ease; }\n  .switch label .lever:before {\n    background-color: rgba(185, 200, 204, 0.15); }\n  .switch label .lever:after {\n    background-color: #F1F1F1;\n    box-shadow: 0px 3px 1px -2px rgba(0, 0, 0, 0.2), 0px 2px 2px 0px rgba(0, 0, 0, 0.14), 0px 1px 5px 0px rgba(0, 0, 0, 0.12); }\n\ninput[type=checkbox]:checked:not(:disabled) ~ .lever:active::before,\ninput[type=checkbox]:checked:not(:disabled).tabbed:focus ~ .lever::before {\n  transform: scale(2.4);\n  background-color: rgba(185, 200, 204, 0.15); }\n\ninput[type=checkbox]:not(:disabled) ~ .lever:active:before,\ninput[type=checkbox]:not(:disabled).tabbed:focus ~ .lever::before {\n  transform: scale(2.4);\n  background-color: rgba(0, 0, 0, 0.08); }\n\n.switch input[type=checkbox][disabled] + .lever {\n  cursor: default;\n  background-color: rgba(0, 0, 0, 0.12); }\n\n.switch label input[type=checkbox][disabled] + .lever:after,\n.switch label input[type=checkbox][disabled]:checked + .lever:after {\n  background-color: #949494; }\n\n/* Select Field\n   ========================================================================== */\nselect {\n  display: none; }\n\nselect.browser-default {\n  display: block; }\n\nselect {\n  background-color: rgba(255, 255, 255, 0.9);\n  width: 100%;\n  padding: 5px;\n  border: 1px solid #f2f2f2;\n  border-radius: 2px;\n  height: 2.6rem; }\n\n.select-label {\n  position: absolute; }\n\n.select-wrapper {\n  position: relative; }\n  .select-wrapper.valid + label,\n  .select-wrapper.invalid + label {\n    width: 100%;\n    pointer-events: none; }\n  .select-wrapper input.select-dropdown {\n    position: relative;\n    cursor: pointer;\n    background-color: transparent;\n    border: none;\n    border-bottom: 1px solid #9e9e9e;\n    outline: none;\n    height: 2.6rem;\n    line-height: 2.6rem;\n    width: 100%;\n    font-size: 16px;\n    margin: 0 0 8px 0;\n    padding: 0;\n    display: block;\n    user-select: none;\n    z-index: 1; }\n    .select-wrapper input.select-dropdown:focus {\n      border-bottom: 1px solid #b9c8cc; }\n  .select-wrapper .caret {\n    position: absolute;\n    right: 0;\n    top: 0;\n    bottom: 0;\n    margin: auto 0;\n    z-index: 0;\n    fill: rgba(0, 0, 0, 0.87); }\n  .select-wrapper + label {\n    position: absolute;\n    top: -26px;\n    font-size: 0.8rem; }\n\nselect:disabled {\n  color: rgba(0, 0, 0, 0.42); }\n\n.select-wrapper.disabled + label {\n  color: rgba(0, 0, 0, 0.42); }\n\n.select-wrapper.disabled .caret {\n  fill: rgba(0, 0, 0, 0.42); }\n\n.select-wrapper input.select-dropdown:disabled {\n  color: rgba(0, 0, 0, 0.42);\n  cursor: default;\n  user-select: none; }\n\n.select-wrapper i {\n  color: rgba(0, 0, 0, 0.3); }\n\n.select-dropdown li.disabled,\n.select-dropdown li.disabled > span,\n.select-dropdown li.optgroup {\n  color: rgba(0, 0, 0, 0.3);\n  background-color: transparent; }\n\nbody.keyboard-focused .select-dropdown.dropdown-content li:focus {\n  background-color: rgba(0, 0, 0, 0.08); }\n\n.select-dropdown.dropdown-content li:hover {\n  background-color: rgba(0, 0, 0, 0.08); }\n\n.select-dropdown.dropdown-content li.selected {\n  background-color: rgba(0, 0, 0, 0.03); }\n\n.prefix ~ .select-wrapper {\n  margin-left: 3rem;\n  width: 92%;\n  width: calc(100% - 3rem); }\n\n.prefix ~ label {\n  margin-left: 3rem; }\n\n.select-dropdown li img {\n  height: 40px;\n  width: 40px;\n  margin: 5px 15px;\n  float: right; }\n\n.select-dropdown li.optgroup {\n  border-top: 1px solid #eee; }\n  .select-dropdown li.optgroup.selected > span {\n    color: rgba(0, 0, 0, 0.7); }\n  .select-dropdown li.optgroup > span {\n    color: rgba(0, 0, 0, 0.4); }\n  .select-dropdown li.optgroup ~ li.optgroup-option {\n    padding-left: 1rem; }\n\n/* File Input\r\n   ========================================================================== */\n.file-field {\n  position: relative; }\n  .file-field .file-path-wrapper {\n    overflow: hidden;\n    padding-left: 10px; }\n  .file-field input.file-path {\n    width: 100%; }\n  .file-field .btn {\n    float: left;\n    height: 2.6rem;\n    line-height: 2.6rem; }\n  .file-field span {\n    cursor: pointer; }\n  .file-field input[type=file] {\n    position: absolute;\n    top: 0;\n    right: 0;\n    left: 0;\n    bottom: 0;\n    width: 100%;\n    margin: 0;\n    padding: 0;\n    font-size: 20px;\n    cursor: pointer;\n    opacity: 0;\n    filter: alpha(opacity=0); }\n    .file-field input[type=file]::-webkit-file-upload-button {\n      display: none; }\n\n/* Range\n   ========================================================================== */\n.range-field {\n  position: relative; }\n\ninput[type=range],\ninput[type=range] + .thumb {\n  cursor: pointer; }\n\ninput[type=range] {\n  position: relative;\n  background-color: transparent;\n  border: none;\n  outline: none;\n  width: 100%;\n  margin: 15px 0;\n  padding: 0; }\n  input[type=range]:focus {\n    outline: none; }\n\ninput[type=range] + .thumb {\n  position: absolute;\n  top: 10px;\n  left: 0;\n  border: none;\n  height: 0;\n  width: 0;\n  border-radius: 50%;\n  background-color: #b9c8cc;\n  margin-left: 7px;\n  transform-origin: 50% 50%;\n  transform: rotate(-45deg); }\n  input[type=range] + .thumb .value {\n    display: block;\n    width: 30px;\n    text-align: center;\n    color: #b9c8cc;\n    font-size: 0;\n    transform: rotate(45deg); }\n  input[type=range] + .thumb.active {\n    border-radius: 50% 50% 50% 0; }\n    input[type=range] + .thumb.active .value {\n      color: #fff;\n      margin-left: -1px;\n      margin-top: 8px;\n      font-size: 10px; }\n\ninput[type=range] {\n  -webkit-appearance: none; }\n\ninput[type=range]::-webkit-slider-runnable-track {\n  height: 3px;\n  background: #c2c0c2;\n  border: none; }\n\ninput[type=range]::-webkit-slider-thumb {\n  border: none;\n  height: 14px;\n  width: 14px;\n  border-radius: 50%;\n  background: #b9c8cc;\n  transition: box-shadow .3s;\n  -webkit-appearance: none;\n  background-color: #b9c8cc;\n  transform-origin: 50% 50%;\n  margin: -5px 0 0 0; }\n\n.keyboard-focused input[type=range]:focus:not(.active)::-webkit-slider-thumb {\n  box-shadow: 0 0 0 10px rgba(185, 200, 204, 0.26); }\n\ninput[type=range] {\n  /* fix for FF unable to apply focus style bug  */\n  border: 1px solid white;\n  /*required for proper track sizing in FF*/ }\n\ninput[type=range]::-moz-range-track {\n  height: 3px;\n  background: #c2c0c2;\n  border: none; }\n\ninput[type=range]::-moz-focus-inner {\n  border: 0; }\n\ninput[type=range]::-moz-range-thumb {\n  border: none;\n  height: 14px;\n  width: 14px;\n  border-radius: 50%;\n  background: #b9c8cc;\n  transition: box-shadow .3s;\n  margin-top: -5px; }\n\ninput[type=range]:-moz-focusring {\n  outline: 1px solid #fff;\n  outline-offset: -1px; }\n\n.keyboard-focused input[type=range]:focus:not(.active)::-moz-range-thumb {\n  box-shadow: 0 0 0 10px rgba(185, 200, 204, 0.26); }\n\ninput[type=range]::-ms-track {\n  height: 3px;\n  background: transparent;\n  border-color: transparent;\n  border-width: 6px 0;\n  /*remove default tick marks*/\n  color: transparent; }\n\ninput[type=range]::-ms-fill-lower {\n  background: #777; }\n\ninput[type=range]::-ms-fill-upper {\n  background: #ddd; }\n\ninput[type=range]::-ms-thumb {\n  border: none;\n  height: 14px;\n  width: 14px;\n  border-radius: 50%;\n  background: #b9c8cc;\n  transition: box-shadow .3s; }\n\n.keyboard-focused input[type=range]:focus:not(.active)::-ms-thumb {\n  box-shadow: 0 0 0 10px rgba(185, 200, 204, 0.26); }\n", ""]);
// Exports
module.exports = exports;


/***/ }),

/***/ "WkL7":
/*!************************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./node_modules/sass-loader/dist/cjs.js!./src/ui/css/common.css ***!
  \************************************************************************************************************/
/*! unknown exports (runtime-defined) */
/*! exports [maybe provided (runtime-defined)] [maybe used (runtime-defined)] */
/*! runtime requirements: __webpack_exports__, module, __webpack_require__, module.id */
/***/ ((module, exports, __webpack_require__) => {

// Imports
var ___CSS_LOADER_API_IMPORT___ = __webpack_require__(/*! ../../../node_modules/css-loader/dist/runtime/api.js */ "QjQd");
exports = ___CSS_LOADER_API_IMPORT___(false);
// Module
exports.push([module.id, "a {\n  color: var(--snap-youtube-green);\n  text-decoration: none !important; }\n\nh1 {\n  font-size: .9rem; }\n\nh2 {\n  font-size: .8rem; }\n\nh3 {\n  font-size: .7rem; }\n\nimg {\n  max-width: 100%;\n  display: block; }\n\nh1, h2, h3, h4, h5, h6 {\n  font-weight: unset;\n  margin: 0 !important; }\n\nfieldset {\n  border: none; }\n\nlabel {\n  margin: 0; }\n\nlegend {\n  margin: 0;\n  width: initial !important; }\n\ncaption {\n  padding: 0;\n  height: 0; }\n\ndt {\n  font-weight: 500; }\n\nsvg {\n  pointer-events: none; }\n\nfigure {\n  pointer-events: all; }\n\n.flex {\n  display: flex; }\n\n.flexnowrap {\n  flex-wrap: nowrap; }\n\n.relative {\n  position: relative; }\n\n.absolute {\n  position: absolute; }\n\n.standard-block {\n  height: var(--vhStandardBlock, 10vh); }\n\n.double-standard-block {\n  height: var(--vhDoubleStandardBlock, 20vh); }\n\n.half-standard-block {\n  height: var(--vhHalfStandardBlock, 5vh); }\n\n.one-and-half-standard-block {\n  height: var(--vhOneAndHalfStandardBlock, 15vh); }\n\n.centred-block {\n  display: flex;\n  align-items: center;\n  width: -moz-available;\n  width: -webkit-fill-available; }\n\n.bottom-aligned {\n  display: flex;\n  align-items: flex-end; }\n\n.double-centred-block {\n  display: flex;\n  align-items: center;\n  justify-content: center; }\n\n.vertical-centred-block {\n  display: flex;\n  flex-direction: column;\n  justify-content: center; }\n\n.vertical-evenly-spaced-block {\n  display: flex;\n  flex-direction: column;\n  justify-content: space-evenly; }\n\n.horizontal-evenly-spaced-block {\n  display: flex;\n  flex-direction: row;\n  justify-content: space-evenly; }\n\n.margin-all {\n  margin: .5rem !important; }\n\n.margin-top {\n  margin-top: .5rem !important; }\n\n.margin-right {\n  margin-right: .5rem !important; }\n\n.half-margin-right {\n  margin-right: .25rem !important; }\n\n.double-margin-right {\n  margin-right: 1rem !important; }\n\n.margin-bottom {\n  margin-bottom: .5rem !important; }\n\n.margin-left {\n  margin-left: .5rem !important; }\n\n.half-margin-left {\n  margin-left: .25rem !important; }\n\n.padding {\n  padding: .5rem; }\n\n.half-padding {\n  padding: .25rem; }\n\n.padding-top {\n  padding-top: .5rem; }\n\n.padding-right {\n  padding-right: .5rem; }\n\n.padding-bottom {\n  padding-bottom: .5rem; }\n\n.padding-left {\n  padding-left: .5rem; }\n\n.custom-checkbox input {\n  margin: 0 0.5rem 0 0; }\n\n.show {\n  display: inline; }\n\n.hide {\n  display: none; }\n\n.hide-important {\n  display: none !important; }\n\n.visually-hidden:not(:focus):not(:active) {\n  position: absolute !important;\n  height: 1px;\n  width: 1px;\n  overflow: hidden;\n  clip: rect(1px 1px 1px 1px);\n  /* IE6, IE7 */\n  clip: rect(1px, 1px, 1px, 1px);\n  white-space: nowrap;\n  /* added line */ }\n\n.underline-link {\n  color: var(--snap-link);\n  cursor: pointer;\n  display: inline-block;\n  line-height: 1.8;\n  border-bottom: 1px solid var(--snap-link); }\n\n.underline-link:hover, .underline-link:focus {\n  color: var(--snap-link-hover); }\n\n.underline-link:focus {\n  outline: 1px solid var(--snap-border-medium); }\n\n.full-width {\n  width: 100%; }\n\n.cursor-pointer {\n  cursor: pointer; }\n\n.border-top {\n  border-bottom: 1px solid var(--snap-border-light); }\n\n.border-right {\n  border-right: 1px solid var(--snap-border-light); }\n\n.border-bottom {\n  border-bottom: 1px solid var(--snap-border-light); }\n\n.border-left {\n  border-left: 1px solid var(--snap-border-light); }\n\n.justify-space-between {\n  justify-content: space-between; }\n\n.justify-end {\n  justify-content: flex-end; }\n\n.small-text {\n  font-size: .8rem !important; }\n\n.smaller-text {\n  font-size: .7rem !important; }\n\n.extra-small-text {\n  font-size: .6rem !important; }\n\n.large-text {\n  font-size: 1.2rem !important; }\n\n.extra-large-text {\n  font-size: 1.5rem !important; }\n\n.capitalise {\n  text-transform: capitalize; }\n\n.uppercase {\n  text-transform: uppercase; }\n\n.line-through {\n  text-decoration: line-through; }\n\n.modal-background-relief {\n  background-color: var(--snap-species-highlight-background); }\n\n.modal-background-relief-emphasis {\n  border: 1px solid var(--snap-success) !important; }\n\n.border-light {\n  border: 1px solid var(--snap-success-light) !important; }\n\n.border-medium {\n  border: 1px solid var(--snap-border-medium); }\n\n.vertical-block {\n  display: flex;\n  flex-direction: column; }\n\n.emphasis {\n  font-weight: bold;\n  letter-spacing: .03rem; }\n\n.absolute-bottom {\n  position: absolute;\n  bottom: .5rem; }\n\n.answer-response {\n  margin: 0 0 0 .25rem; }\n\n.col-count-2 {\n  column-count: 2; }\n\n.col-count-3 {\n  column-count: 3; }\n\n.col-count-4 {\n  column-count: 4; }\n\n.col-count-5 {\n  column-count: 5; }\n\n.col-count-6 {\n  column-count: 6; }\n\n.nowrap {\n  white-space: nowrap; }\n\n.snap-inactive {\n  color: var(--snap-inactive) !important;\n  pointer-events: none !important; }\n\n.black-text {\n  color: var(--snap-text-black); }\n\n/* If set to display inline, would width automatically be determined by the text they contain? each span vs div */\n.fit-width {\n  width: intrinsic;\n  /* Safari/WebKit uses a non-standard name */\n  width: -moz-max-content;\n  /* Firefox/Gecko */\n  width: -webkit-max-content;\n  /* Chrome */ }\n\n.sr-only {\n  position: absolute;\n  width: 1px;\n  height: 1px;\n  padding: 0;\n  margin: -1px;\n  overflow: hidden;\n  clip: rect(0, 0, 0, 0);\n  border: 0; }\n\n.super {\n  vertical-align: super;\n  font-size: .8em; }\n\n.list-group-item {\n  font-size: .8rem;\n  padding: .25rem .5rem; }\n\n.snap-btn {\n  background-color: var(--snap-list-header-background);\n  color: var(--snap-text-black);\n  letter-spacing: .05rem;\n  border: 1px solid var(--snap-border-light);\n  padding: .25rem .75rem; }\n\n.snap-btn:hover, .snap-btn:focus {\n  opacity: 1;\n  border: 1px solid var(--snap-border-lightest);\n  outline: none; }\n\n.snap-btn:focus:not(:focus-visible), .snap-icon-btn:focus:not(:focus-visible) {\n  border: 1px solid var(--snap-active);\n  outline: none; }\n\n.dropdown .snap-btn:hover, .dropdown .snap-btn:focus {\n  border: 1px solid var(--snap-border-light); }\n\n.snap-icon-btn {\n  color: var(--snap-text-dark);\n  background-color: transparent;\n  border: 1px solid transparent;\n  margin: 0 .5rem;\n  padding: 0 1px; }\n\n.nav-icons .snap-icon-btn, .nav-icons a {\n  margin: 0;\n  padding: 0; }\n\n.block.snap-icon-btn:focus, .block.snap-icon-btn:hover {\n  background-color: var(--snap-btn-hover);\n  outline: 1px solid var(--snap-border-lightest); }\n\n.strip:focus-within {\n  background-color: var(--snap-btn-hover); }\n\n.snap-link-btn, .snap-no-link-btn {\n  color: var(--snap-text-dark);\n  background-color: transparent;\n  border: none;\n  font-size: .7rem;\n  width: intrinsic;\n  /* Safari/WebKit uses a non-standard name */\n  width: -moz-max-content;\n  /* Firefox/Gecko */\n  width: -webkit-max-content;\n  /* Chrome */ }\n\n.snap-link-btn {\n  color: var(--snap-collection-active); }\n\n.snap-no-link-btn {\n  pointer-events: none; }\n\n.snap-action-btn {\n  background-color: var(--snap-tertiary-background);\n  color: var(--snap-text-light);\n  letter-spacing: .05rem;\n  border: 1px solid var(--snap-non-taxa) !important;\n  padding: .5rem .75rem; }\n\n.snap-action-btn:focus {\n  outline: 1px solid var(--snap-border-medium);\n  color: var(--snap-text-black); }\n\n.snap-action-btn.snap-success {\n  color: var(--snap-text-light) !important;\n  background-color: var(--snap-success) !important;\n  border: 0.05rem solid var(--snap-success); }\n\n.snap-action-btn.snap-alert {\n  color: var(--snap-text-light) !important;\n  background-color: var(--snap-alert) !important;\n  border: 0.05rem solid var(--snap-alert); }\n", ""]);
// Exports
module.exports = exports;


/***/ }),

/***/ "bbET":
/*!************************************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./node_modules/sass-loader/dist/cjs.js!./src/ui/css/snapdragon-colours.css ***!
  \************************************************************************************************************************/
/*! unknown exports (runtime-defined) */
/*! exports [maybe provided (runtime-defined)] [maybe used (runtime-defined)] */
/*! runtime requirements: __webpack_exports__, module, __webpack_require__, module.id */
/***/ ((module, exports, __webpack_require__) => {

// Imports
var ___CSS_LOADER_API_IMPORT___ = __webpack_require__(/*! ../../../node_modules/css-loader/dist/runtime/api.js */ "QjQd");
exports = ___CSS_LOADER_API_IMPORT___(false);
// Module
exports.push([module.id, ":root {\n  --snap-lesson-row-blue: rgb(218, 230, 237);\n  --snap-lesson-row-green: rgb(216, 223, 210);\n  --snap-dd-non-taxa-bg-intial: rgb(197, 193, 175);\n  --snap-dd-non-taxa-bg-hover: rgb(229, 227, 220);\n  --snap-dd-non-taxa-bg-active: rgb(229, 227, 220);\n  --snap-text-black: rgb(30,30,30);\n  --snap-text-dark: rgb(60, 60, 60);\n  --snap-text-dark-medium-dark: rgb(50, 50, 50);\n  --snap-text-medium-dark: rgb(65, 65, 65);\n  --snap-text-medium-dark-hover: rgb(108, 114, 120);\n  --snap-text-medium-light:rgb(73, 80, 87);\n  --snap-text-light:rgb(245, 245, 245);\n  --snap-text-green: rgb(16, 66, 28);\n  --snap-portrait: rgb(179, 197, 174);\n  --snap-landscape: rgb(185, 200, 204);\n  --snap-collection: rgb(87, 97, 99);\n  --snap-collection-active: rgb(95, 125, 89);\n  --snap-collection-light: rgb(117, 126, 126);\n  --snap-collection-faint: rgb(240, 242, 235);\n  --snap-non-taxa: rgb(165, 159, 131);\n  --snap-active: rgb(246, 157, 53);\n  --snap-alert: rgb(197, 59, 67);\n  --snap-alert-medium: rgb(225, 155, 155);\n  --snap-alert-light: rgb(241, 229, 225);\n  --snap-inactive: rgba(7, 2, 2, 0.4);\n  --snap-success: rgb(84, 137, 84);\n  --snap-success-medium: rgb(169, 196, 163);\n  --snap-success-light: rgb(216, 225, 208);\n  --snap-link-hover: rgb(54, 69, 82);\n  --snap-link: rgb(20, 125, 156);\n  --snap-progress-bg: rgb(168, 168, 168);\n  --snap-progress-bar: rgb(255, 255, 255);\n  --snap-block-light: rgb(245, 245, 245);\n  --snap-main-background: rgb(244, 244, 244);\n  --snap-content-background: rgb(255, 255, 243);\n  --snap-content-background-relief: rgb(251, 251, 247);\n  --snap-header-background: rgb(213, 213, 210);\n  --snap-list-header-background: rgb(252, 251, 246);\n  --snap-row-background: rgb(240, 239, 233);\n  --snap-taxon-card-background: rgba(52, 105, 23,.1);\n  --snap-species-highlight-background: rgb(249, 248, 238);\n  --snap-species-header-background: rgb(226, 222, 180);\n  --snap-species-header-dark-background: rgb(146, 139, 56);\n  --snap-btn-auxillary: rgb(96, 117, 90);\n  --snap-btn-hover: rgb(240, 240, 240);\n  --snap-btn-dropdown: rgb(252, 193, 186);\n  --snap-btn-dropdown-options: rgb(254, 240, 229);\n  --snap-btn-blue: rgb(54, 69, 82);\n  --snap-snap-action-btn: rgb(245, 245, 245);\n  --snap-tertiary-background: rgb(95, 125, 89);\n  --snap-btn-filter-on: rgb(214, 208, 213);\n  --snap-btn-filter-off: rgb(235, 231, 228);\n  --snap-border-light: rgb(175,175,175);\n  --snap-border-medium: rgb(211, 211, 211);\n  --snap-border-lightest: rgb(225,225,225);\n  --snap-iconic-icon-header: rgb(193, 186, 112);\n  --snap-inat: rgb(127, 151, 122);\n  --snap-youtube-green: rgb(52, 105, 23);\n  --snap-button-light: #576163;\n  --snap-button-main: #3c4345;\n  --snap-button-dark: #788082; }\n", ""]);
// Exports
module.exports = exports;


/***/ }),

/***/ "Qvir":
/*!***************************************************!*\
  !*** ./src/admin/screens/add-taxon-template.html ***!
  \***************************************************/
/*! unknown exports (runtime-defined) */
/*! exports [maybe provided (runtime-defined)] [maybe used (runtime-defined)] */
/*! runtime requirements: module */
/***/ ((module) => {

// Module
var code = "<div class=\"sub container\">\n    <div class=\"row\">\n        <div class=\"input-field col\">\n            <input id=\"input-taxon-rank\" type=\"text\" placeholder=\"Start typing taxon rank\" spellcheck=\"false\">            \n            <label for=\"input-taxon-rank\">Rank</label>\n        </div>\n        <div class=\"autocomplete-options-container hide-empty\" id=\"snapdragon-taxon-autocomplete\"></div>\n    </div>\n    <div class=\"row\">\n        <div class=\"input-field col\">\n            <input id=\"input-taxon-latin-name\" type=\"text\" placeholder=\"Enter taxon latin name\" spellcheck=\"false\">            \n            <label for=\"input-taxon-latin-name\">Latin name</label>\n        </div>\n        <div class=\"input-field col\">\n            <input id=\"input-taxon-vernacular-name\" type=\"text\" placeholder=\"Enter taxon common name\" spellcheck=\"false\">            \n            <label for=\"input-taxon-vernacular-name\">Vernacular name</label>\n        </div>\n        <div class=\"input-field col\">\n            <input id=\"input-genera-count\" type=\"text\" placeholder=\"Enter number of genera\" spellcheck=\"false\">            \n            <label for=\"input-genera-count\">Genera Count</label>\n        </div>\n        <div class=\"input-field col\">\n            <input id=\"input-species-count\" type=\"text\" placeholder=\"Enter number of species\" spellcheck=\"false\">            \n            <label for=\"input-species-count\">Species Count</label>\n        </div>\n    </div>\n    <div class=\"row\">\n        <div class=\"input-field col s12\">\n            <input id=\"input-taxon-summary\" type=\"text\" placeholder=\"Enter taxon summary\" spellcheck=\"false\">            \n            <label for=\"input-taxon-summary\">Summary</label>\n        </div>\n    </div>\n    <div class=\"row\">\n        <div class=\"input-field col s12\">\n            <input id=\"input-taxon-identification\" type=\"text\" placeholder=\"Enter taxon identification\" spellcheck=\"false\">            \n            <label for=\"input-taxon-identification\">Identification</label>\n        </div>\n    </div>\n    <div id=\"snapInput\"></div>\n\n\n    <div>\n        <button class=\"btnAddTaxon btn\">Add taxon</button>\n    </div>\n\n    <div class=\"half-standard-block centred-block hide feedback js-saved\">Taxon saved</div>\n        \n</div>";
// Exports
module.exports = code;

/***/ }),

/***/ "VNJ0":
/*!**************************************************!*\
  !*** ./src/admin/screens/add-term-template.html ***!
  \**************************************************/
/*! unknown exports (runtime-defined) */
/*! exports [maybe provided (runtime-defined)] [maybe used (runtime-defined)] */
/*! runtime requirements: module */
/***/ ((module) => {

// Module
var code = "<div class=\"sub container\"> \n    <div class=\"js-term-form\"></div>        \n</div>";
// Exports
module.exports = code;

/***/ }),

/***/ "5VIV":
/*!***************************************************!*\
  !*** ./src/admin/screens/add-trait-template.html ***!
  \***************************************************/
/*! unknown exports (runtime-defined) */
/*! exports [maybe provided (runtime-defined)] [maybe used (runtime-defined)] */
/*! runtime requirements: module */
/***/ ((module) => {

// Module
var code = "<div class=\"sub container\">\n    <div class=\"row\">\n        <div class=\"input-field col s2\">\n            <input id=\"input-trait-key\" type=\"text\" placeholder=\"Start typing trait name\" spellcheck=\"false\">            \n            <label for=\"input-trait-key\">Trait key</label>\n        </div>\n        <div class=\"autocomplete-options-container hide-empty\" id=\"snapdragon-trait-value-autocomplete\"></div>\n        \n        <div class=\"input-field col s2\">\n            <input id=\"input-trait-value\" type=\"text\" placeholder=\"Start typing trait value\">            \n            <label for=\"input-trait-value\">Trait value</label>\n        </div>\n        <div class=\"autocomplete-options-container hide-empty\" id=\"snapdragon-trait-value-autocomplete\"></div>\n\n        <div class=\"input-field col s2 hide\">\n            <input id=\"input-unit-value\" type=\"text\" placeholder=\"Start typing unit value\">            \n            <label for=\"input-unit-value\">Unit value</label>\n        </div>\n        <div class=\"autocomplete-options-container hide-empty\" id=\"snapdragon-tratit-unit-autocomplete\"></div>\n\n        <div class=\"hide feedback js-saved\">Trait saved</div>\n    </div>\n</div>";
// Exports
module.exports = code;

/***/ }),

/***/ "ThuB":
/*!***********************************************************!*\
  !*** ./src/admin/screens/add-traits-fields-template.html ***!
  \***********************************************************/
/*! unknown exports (runtime-defined) */
/*! exports [maybe provided (runtime-defined)] [maybe used (runtime-defined)] */
/*! runtime requirements: module */
/***/ ((module) => {

// Module
var code = "<ul class=\"trait-repeater\" data-repeat-field=\"{{ fields }}\">\n    <li>\n        <div class=\"input-field\">\n            <input type=\"text\" class='trait-value' value=\"{{ field.value }}\" data-field=\"{{ field.key }}\" readonly=\"readonly\" />\n            <label class='trait-key'>{{ field.key }} {{ field.unit }}</label>            \n            <button class=\"snap-icon-btn\" id=\"{{ field.key }}\"><i class=\"fas fa-trash\"></i></button>\n        </div>\n    </li>    \n</ul>\n\n<ul class=\"\" data-repeat-relationship=\"{{ relationships }}\">\n    <li>\n        <div class=\"relationship-card\">\n            <div class=\"cols\">\n                <div>Relationship</div><div>{{ relationship.type }}</div>\n            </div>\n            <div class=\"cols\">\n                <div>{{ relationship.speciesA }}</div><div>{{ relationship.speciesARole }}</div>\n            </div>\n            <div class=\"cols\">\n                <div>{{ relationship.speciesB }}</div><div>{{ relationship.speciesBRole }}</div>\n            </div>\n            <div>{{ relationship.description }}</div>\n            <i id=\"{{ relationship.key }}\" class=\"fas fa-trash\"></i>\n        </div>        \n    </li>\n</ul>";
// Exports
module.exports = code;

/***/ }),

/***/ "uoS6":
/*!****************************************************!*\
  !*** ./src/admin/screens/add-traits-template.html ***!
  \****************************************************/
/*! unknown exports (runtime-defined) */
/*! exports [maybe provided (runtime-defined)] [maybe used (runtime-defined)] */
/*! runtime requirements: module */
/***/ ((module) => {

// Module
var code = "<div class=\"sub container\">\n    <div class=\"row\">\n        <div class=\"input-field col s3\">\n            <input id=\"input-species-for-traits\" class=\"autocomplete\" type=\"text\" placeholder=\"Start typing a latin species name\" autofocus spellcheck=\"false\">\n            <label for=\"input-species-for-traits\">Snapdragon species picker</label>\n        </div>\n        <div class=\"input-field col s3\">\n            <input id=\"input-taxon-for-traits\" class=\"autocomplete\" type=\"text\" placeholder=\"Start typing a latin taxon name\" spellcheck=\"false\">\n            <label for=\"input-taxon-for-traits\">Snapdragon taxon picker</label>\n        </div>\n    </div>\n\n    <div class=\"js-add-trait\"></div>\n    <div class=\"row js-traits\"></div>\n</div>";
// Exports
module.exports = code;

/***/ }),

/***/ "38Xl":
/*!**************************************************************************!*\
  !*** ./src/admin/screens/collection/edit-collection-props-template.html ***!
  \**************************************************************************/
/*! unknown exports (runtime-defined) */
/*! exports [maybe provided (runtime-defined)] [maybe used (runtime-defined)] */
/*! runtime requirements: module */
/***/ ((module) => {

// Module
var code = "<div class=\"row\">\n  <div class=\"input-field col s2\">\n      <input id=\"input-collection-title\" type=\"text\" placeholder=\"Enter the lesson title\" spellcheck=\"false\">            \n      <label class=\"active\" for=\"input-collection-title\">Title</label>\n  </div>\n  <div class=\"input-field col s2\">\n      <input id=\"input-collection-id\" type=\"text\" placeholder=\"Enter Youtube ID\" spellcheck=\"false\">            \n      <label class=\"active\" for=\"input-collection-id\">ID</label>\n  </div>\n  <div class=\"input-field col s2\">\n      <input id=\"input-collection-owner\" type=\"text\" placeholder=\"Enter owner's name\" spellcheck=\"false\">            \n      <label class=\"active\" for=\"input-collection-owner\">Owner</label>\n  </div>\n</div>\n<div class=\"row\">\n  <div class=\"input-field col s12\">\n      <textarea rows=\"10\" cols=\"100\" id=\"textarea-intro\" class=\"validate\" wrap=\"hard\"></textarea>\n      <label class=\"active\" for=\"textarea-intro\">Introduction</label>            \n  </div>\n</div>\n<div class=\"row\">\n  <div class=\"input-field col s2\">\n      <input id=\"input-collection-location\" type=\"text\" placeholder=\"Enter the lesson location\" spellcheck=\"false\">            \n      <label class=\"active\" for=\"input-collection-location\">Location</label>\n  </div>\n  <div class=\"input-field col s2\">\n      <input id=\"input-collection-presenter\" type=\"text\" placeholder=\"Enter the presenter's name\" spellcheck=\"false\">            \n      <label class=\"active\" for=\"input-collection-presenter\">Presenter</label>\n  </div>\n  <div class=\"input-field col s2\">\n      <input id=\"input-collection-src\" type=\"text\" placeholder=\"Enter the thumb url\" spellcheck=\"false\">            \n      <label class=\"active\" for=\"input-collection-src\">Thumb url</label>\n  </div>\n</div>\n<div class=\"row\">\n  <button class=\"btnUpdateCollection btn\">Update collection</button>\n</div>";
// Exports
module.exports = code;

/***/ }),

/***/ "+EoT":
/*!******************************************************************************!*\
  !*** ./src/admin/screens/collection/edit-collection-questions-template.html ***!
  \******************************************************************************/
/*! unknown exports (runtime-defined) */
/*! exports [maybe provided (runtime-defined)] [maybe used (runtime-defined)] */
/*! runtime requirements: module */
/***/ ((module) => {

// Module
var code = "<div class=\"sub container collection-container\">\n    <div class=\"row\">\n        <div class=\"input-field col s2\">\n            <input id=\"input-collection\" class=\"autocomplete\" type=\"text\" placeholder=\"Start typing a collection name\" autofocus spellcheck=\"false\">\n            <label for=\"input-collection\" class=\"active\">Snapdragon collection finder</label>            \n        </div>\n    </div>\n</div>\n\n<div class=\"edit-collection-species\">\n    <div class=\"collection-species js-collection-species\"></div>\n    <div id=\"js-collection-options\"></div>\n</div>";
// Exports
module.exports = code;

/***/ }),

/***/ "qs3Y":
/*!********************************************************************!*\
  !*** ./src/admin/screens/collection/edit-collection-template.html ***!
  \********************************************************************/
/*! unknown exports (runtime-defined) */
/*! exports [maybe provided (runtime-defined)] [maybe used (runtime-defined)] */
/*! runtime requirements: module */
/***/ ((module) => {

// Module
var code = "<div class=\"sub container collection-container margin-top\">\n    <div class=\"row\">\n        <div class=\"input-field col s2\">\n            <input id=\"input-collection\" class=\"autocomplete\" type=\"text\" placeholder=\"Start typing a collection name\" autofocus spellcheck=\"false\">\n            <label for=\"input-collection\" class=\"active\">Snapdragon collection finder</label>            \n        </div>\n    </div>\n</div>\n\n<div class=\"edit-collection-species\">\n    <div class=\"collection-species js-collection-species\"></div>\n    <div id=\"js-collection-options\"></div>\n</div>";
// Exports
module.exports = code;

/***/ }),

/***/ "3F24":
/*!**************************************************************************!*\
  !*** ./src/admin/screens/collection/edit-collection-terms-template.html ***!
  \**************************************************************************/
/*! unknown exports (runtime-defined) */
/*! exports [maybe provided (runtime-defined)] [maybe used (runtime-defined)] */
/*! runtime requirements: module */
/***/ ((module) => {

// Module
var code = "<div class=\"sub container collection-container\">\n    <div class=\"row\">\n        <div class=\"input-field col s2\">\n            <input id=\"input-collection\" class=\"autocomplete\" type=\"text\" placeholder=\"Start typing a collection name\" autofocus spellcheck=\"false\">\n            <label for=\"input-collection\" class=\"active\">Snapdragon collection finder</label>            \n        </div>\n    </div>\n\n    <div class=\"margin-left\">\n        <div class=\"margin-bottom\">Terms associated with this collection:</div>\n        <div class=\"js-collection-terms margin-left\"></div>\n    </div>\n\n    <br>\n    <br>    \n\n    <div class=\"row\">\n        <div class=\"input-field col s2 js-term-picker\">\n            <input id=\"input-term\" type=\"text\" placeholder=\"Start typing term\" spellcheck=\"false\">            \n            <label for=\"input-term\" class=\"active\">Find term</label>\n        </div>\n        <div class=\"autocomplete-options-container hide-empty\" id=\"snapdragon-term-autocomplete\"></div>\n    </div>\n\n    <div class=\"js-btn-add\">\n        <button class=\"btnAddTermToCollection btn\">Add term to collection</button>\n    </div>\n\n    <div class=\"margin-top hide feedback js-saved\">Term saved</div>\n\n</div>";
// Exports
module.exports = code;

/***/ }),

/***/ "n9OE":
/*!***********************************************************************!*\
  !*** ./src/admin/screens/collection/species-collection-template.html ***!
  \***********************************************************************/
/*! unknown exports (runtime-defined) */
/*! exports [maybe provided (runtime-defined)] [maybe used (runtime-defined)] */
/*! runtime requirements: module */
/***/ ((module) => {

// Module
var code = "<div class=\"collection-details\">\n\n    <li class=\"custom-control custom-checkbox\">\n        <input id=\"isActiveChkBox\" type=\"checkbox\" class=\"custom-control-input\" data-is-active=\"{{ collection.isActive }}\" value=\"{{ collection.isActive }}\">\n        <label class=\"custom-control-label\" for=\"isActive\">\n            <span class=\"cursor-pointer\">\n                <span id=\"isActive\">Active</span>\n            </span>\n        </label>\n    </li>\n\n    <li class=\"custom-control custom-checkbox\">\n        <input id=\"isPrivateChkBox\" type=\"checkbox\" class=\"custom-control-input\" data-is-active=\"{{ collection.isPrivate }}\" value=\"{{ collection.isPrivate }}\">\n        <label class=\"custom-control-label\" for=\"isPrivate\">\n            <span class=\"cursor-pointer\">\n                <span id=\"isPrivate\">Private</span>\n            </span>\n        </label>\n    </li>\n\n</div>\n\n<div>\n    <li class=\"margin-top margin-bottom custom-control custom-checkbox\">\n        <a href=\"#\" class=\"grey-text js-add-species\">\n            <i class=\"fas fa-plus\" aria-hidden=\"true\"></i>\n            <span>Species</span>\n        </a>\n    </li>\n</div>\n\n<ul class=\"js-collection-items\" data-repeat-species=\"{{ items }}\">\n    <li class=\"custom-control custom-checkbox\">\n        <input id=\"{{ species.name }}\" type=\"checkbox\" class=\"custom-control-input\" data-is-active=\"{{ species.isActive }}\">\n        <label class=\"custom-control-label cursor-pointer\" for=\"{{ species.name }}\">{{ species.name }}</label>\n        <i name=\"{{ species.name }}\" class=\"{{ ^.hasOptions }} fas fa-marker margin-left\"></i>\n    </li>\n</ul>";
// Exports
module.exports = code;

/***/ }),

/***/ "HKtk":
/*!*****************************************************************!*\
  !*** ./src/admin/screens/collection/species-item-template.html ***!
  \*****************************************************************/
/*! unknown exports (runtime-defined) */
/*! exports [maybe provided (runtime-defined)] [maybe used (runtime-defined)] */
/*! runtime requirements: module */
/***/ ((module) => {

// Module
var code = "<li class=\"custom-control custom-checkbox\">\n    <input type=\"checkbox\" class=\"custom-control-input\" data-is-active=\"{{ isActive }}\" checked>\n    <label class=\"custom-control-label cursor-pointer\" for=\"{{ species.name }}\">{{ species.name }}</label>\n    <i name=\"{{ species.name }}\" class=\"{{ hasOptions }} fas fa-marker margin-left\"></i>\n</li>";
// Exports
module.exports = code;

/***/ }),

/***/ "Iv74":
/*!*********************************************************************!*\
  !*** ./src/admin/screens/collection/terms-collection-template.html ***!
  \*********************************************************************/
/*! unknown exports (runtime-defined) */
/*! exports [maybe provided (runtime-defined)] [maybe used (runtime-defined)] */
/*! runtime requirements: module */
/***/ ((module) => {

// Module
var code = "<ul class=\"js-terms-list small-text col-count-6\" data-repeat-definition=\"{{ definitions }}\">\n    <li>\n        <div class=\"centred-block\">\n            <span>{{ definition.term }}</span>\n            <i id=\"{{ definition.id }}\" class=\"margin-left fas fa-trash\"></i>\n        </div>\n    </li>    \n</ul>";
// Exports
module.exports = code;

/***/ }),

/***/ "nS2Y":
/*!****************************************************************!*\
  !*** ./src/admin/screens/questions/add-question-template.html ***!
  \****************************************************************/
/*! unknown exports (runtime-defined) */
/*! exports [maybe provided (runtime-defined)] [maybe used (runtime-defined)] */
/*! runtime requirements: module */
/***/ ((module) => {

// Module
var code = "<ul class=\"collapsible\" data-repeat-question=\"{{ questions }}\">\n  <li>\n    <div class=\"collapsible-header\">{{ question.question }}</div>\n    <div class=\"collapsible-body\">\n        <ul>\n            <li>{{ question.provider }}</li>\n            <li>{{ question.iconicTaxon }}</li>\n            <li>{{ question.rank }}</li>\n            <li>{{ question.taxon }}</li>\n            <li>{{ question.statement }}</li>\n            <li>{{ question.answer }}</li>\n            <li>{{ question.answers }}</li>\n        </ul>\n      </div>\n  </li>\n</ul>\n</div>";
// Exports
module.exports = code;

/***/ }),

/***/ "NYSd":
/*!*******************************************************************!*\
  !*** ./src/admin/screens/questions/create-question-template.html ***!
  \*******************************************************************/
/*! unknown exports (runtime-defined) */
/*! exports [maybe provided (runtime-defined)] [maybe used (runtime-defined)] */
/*! runtime requirements: module */
/***/ ((module) => {

// Module
var code = "<div style=\"width: 100%;\">\n    <div class=\"sub container horizontal-evenly-spaced-block\">\n        <div class=\"col s4 input-field\">\n            <input class=\"margin-right\" id=\"input-iconic-taxon\" type=\"text\" placeholder=\"Start typing taxa\" spellcheck=\"false\">            \n            <label class=\"active\" for=\"input-iconic-taxon\">Iconic taxon</label>\n        </div>\n        <div class=\"col s4 input-field\">\n            <input class=\"margin-right\" id=\"input-taxon-rank\" type=\"text\" placeholder=\"Start typing rank\" spellcheck=\"false\">            \n            <label class=\"active\" for=\"input-taxon-rank\">Rank</label>\n        </div>\n        <div class=\"col s4 input-field\">\n            <input id=\"input-taxon\" type=\"text\" spellcheck=\"false\">            \n            <label class=\"active\" for=\"input-taxon\">Taxon</label>\n        </div>\n    </div>\n    <div class=\"input-field col s12\">\n        <input class=\"has-character-counter validate\" minLength=\"10\" maxlength=\"150\" id=\"input-statement\" type=\"text\" spellcheck=\"false\" type=\"text\" data-length=\"150\">  \n        <label for=\"input-statement\">Statement</label>\n    </div>\n    <div class=\"input-field col s12\">\n        <input class=\"has-character-counter\" maxlength=\"150\" id=\"input-question\" type=\"text\" spellcheck=\"true\" type=\"text\" data-length=\"150\"> \n        <label for=\"input-question\">Question</label>\n    </div>\n    <div class=\"input-field col s12\">\n        <input class=\"has-character-counter\" maxlength=\"150\" id=\"input-answer\" type=\"text\" spellcheck=\"true\" type=\"text\" data-length=\"150\">  \n        <label for=\"input-answer\">Answer</label>\n    </div>\n    <div class=\"input-field col s12\">\n        <input class=\"has-character-counter\" maxlength=\"150\" id=\"input-answers1\" type=\"text\" spellcheck=\"true\" type=\"text\" data-length=\"150\">\n        <label for=\"input-answers1\">Alternative 1</label>\n    </div>\n    <div class=\"input-field col s12\">\n        <input class=\"has-character-counter\" maxlength=\"150\" id=\"input-answers2\" type=\"text\" spellcheck=\"true\" type=\"text\" data-length=\"150\">\n        <label for=\"input-answers2\">Alternative 2</label>\n    </div>\n    <div class=\"input-field col s12\">\n        <input class=\"has-character-counter\" maxlength=\"150\" id=\"input-answers3\" type=\"text\" spellcheck=\"true\" type=\"text\" data-length=\"150\">\n        <label for=\"input-answers3\">Alternative 3</label>\n    </div>\n</div>\n\n<div>\n    <button class=\"btnCreateQuestion btn\">Add species question</button>\n</div>";
// Exports
module.exports = code;

/***/ }),

/***/ "nsnM":
/*!******************************************************************!*\
  !*** ./src/admin/screens/questions/questions-tabs-template.html ***!
  \******************************************************************/
/*! unknown exports (runtime-defined) */
/*! exports [maybe provided (runtime-defined)] [maybe used (runtime-defined)] */
/*! runtime requirements: module */
/***/ ((module) => {

// Module
var code = "<div class=\"row\">\n  <ul class=\"tabs\">\n    <li class=\"tab\"><a id=\"createQuestionTab\" href=\"#createQuestion\"><i class=\"fas fa-marker margin-right\"></i>Create new question</a></li>\n    <li class=\"tab\"><a id=\"addQuestionTab\" href=\"#addQuestion\"><i class=\"fas fa-search margin-right\"></i>Pick a question</a></li>\n  </ul>\n  <div id=\"createQuestion\" class=\"col s12\"></div>\n  <div id=\"addQuestion\" class=\"col s12\"></div>\n</div>\n\n<div class=\"row js-question-panel\">\n\n</div>";
// Exports
module.exports = code;

/***/ }),

/***/ "3AgI":
/*!********************************************************!*\
  !*** ./src/admin/screens/species/add-id-template.html ***!
  \********************************************************/
/*! unknown exports (runtime-defined) */
/*! exports [maybe provided (runtime-defined)] [maybe used (runtime-defined)] */
/*! runtime requirements: module */
/***/ ((module) => {

// Module
var code = "<div class=\"sub container\">\n    <div class=\"row\">\n        <div class=\"input-field col s3\">\n            <input id=\"input-species-for-traits\" class=\"autocomplete\" type=\"text\" placeholder=\"Start typing a latin species name\" autofocus spellcheck=\"false\">\n            <label for=\"input-species-for-traits\">Snapdragon species picker</label>\n        </div>\n        <div class=\"autocomplete-options-container hide-empty\" id=\"snapdragon-trait-value-autocomplete\"></div>\n    </div>\n    <div class=\"js-id-text\"></div>\n</div>    ";
// Exports
module.exports = code;

/***/ }),

/***/ "CttE":
/*!*************************************************************!*\
  !*** ./src/admin/screens/species/add-id-text-template.html ***!
  \*************************************************************/
/*! unknown exports (runtime-defined) */
/*! exports [maybe provided (runtime-defined)] [maybe used (runtime-defined)] */
/*! runtime requirements: module */
/***/ ((module) => {

// Module
var code = "<div class=\"row\">\n    <div class=\"input-field col s12\">\n        <textarea rows=\"10\" cols=\"100\" id=\"textarea-id\" class=\"validate\" wrap=\"hard\">{{ description }}</textarea>\n        <label for=\"textarea-description\">{{ name }}</label>            \n    </div>\n</div>\n<div class=\"side-by-side\">\n    <button id=\"{{ name }}\" class=\"btnUpdateId btn\">Update Quick ID</button>\n    <div class=\"feedback js-message\"></div>\n</div>";
// Exports
module.exports = code;

/***/ }),

/***/ "4pmo":
/*!***************************************************************!*\
  !*** ./src/admin/screens/species/add-lookalike-template.html ***!
  \***************************************************************/
/*! unknown exports (runtime-defined) */
/*! exports [maybe provided (runtime-defined)] [maybe used (runtime-defined)] */
/*! runtime requirements: module */
/***/ ((module) => {

// Module
var code = "<div class=\"sub container\">\n    <div class=\"row\">Species A:</div>\n    <div class=\"row\">        \n        <div class=\"input-field col s3\">\n            <input id=\"input-species-snapdragon\" type=\"text\" placeholder=\"Start typing latin species name\" autofocus spellcheck=\"false\">            \n            <label for=\"input-species-snapdragon\" class=\"active\">Snapdragon species picker</label>\n        </div>\n    </div>\n    <div class=\"row\">\n        <div class=\"input-field col s8\">\n            <input id=\"input-description-a\" type=\"text\" class=\"validate autocomplete\">\n            <label for=\"input-description-a\" class=\"active\">Description</label>\n        </div>\n    </div>\n    <div class=\"row\">Species B:</div>\n    <div class=\"row\">\n\n        <div class=\"input-field col s3\">\n            <input id=\"input-species-snapdragon-b\" type=\"text\" placeholder=\"Start typing latin species name\" autofocus spellcheck=\"false\">            \n            <label for=\"input-species-snapdragon-b\" class=\"active\">Snapdragon species picker</label>\n        </div>\n\n        <div class=\"input-field col s2\">\n            <input id=\"input-species-eol\" type=\"text\" class=\"validate autocomplete\">\n            <label for=\"input-search-eol\" class=\"active\">Search by latin name</label>\n        </div>\n        <div class=\"async-progress hide col s2\">Looking for matches on EOL…</div>\n    </div>\n    <div class=\"row\">\n        <div class=\"input-field col s8\">\n            <input id=\"input-description-b\" type=\"text\" class=\"validate autocomplete\">\n            <label for=\"input-description-b\" class=\"active\">Description</label>\n        </div>\n    </div>\n    <div class=\"row\">\n        <div class=\"row-centered\">\n            <div>\n                <button class=\"btnAddLookalike btn\">Add lookalike</button> \n            </div>\n            <div class=\"feedback js-message\"></div>\n        </div>\n    </div>\n    <div class=\"js-lookalikes row\">\n\n    </div>\n</div>";
// Exports
module.exports = code;

/***/ }),

/***/ "XgKu":
/*!*********************************************************************!*\
  !*** ./src/admin/screens/species/add-lookalikes-list-template.html ***!
  \*********************************************************************/
/*! unknown exports (runtime-defined) */
/*! exports [maybe provided (runtime-defined)] [maybe used (runtime-defined)] */
/*! runtime requirements: module */
/***/ ((module) => {

// Module
var code = "<div data-repeat-lookalike=\"{{ species }}\">\n    <div class=\"row\">\n        <div class=\"input-field col s12\">\n            <textarea id=\"{{ lookalike.name }}\" rows=\"5\" cols=\"100\" id=\"textarea-description\" class=\"validate\">{{ lookalike.description }}</textarea id=\"{{ lookalike.name }}\">\n            <label for=\"textarea-description\">{{ lookalike.name }}</label>            \n        </div>\n        <button data-name=\"{{ lookalike.name }}\" class=\"btnUpdateLookalike btn\">Update description</button>\n    </div>\n</div>";
// Exports
module.exports = code;

/***/ }),

/***/ "1kgz":
/*!***********************************************************!*\
  !*** ./src/admin/screens/species/add-photos-gallery.html ***!
  \***********************************************************/
/*! unknown exports (runtime-defined) */
/*! exports [maybe provided (runtime-defined)] [maybe used (runtime-defined)] */
/*! runtime requirements: module */
/***/ ((module) => {

// Module
var code = "<div class=\"centred-block\">\n    <button class=\"btnAddAllPhotos btn margin-right margin-bottom\">Add all photos</button>\n    <div class=\"noPhotos\"></div>\n    <button class=\"btnAddSelectedPhotos btn hide margin-bottom\">Add selected photos only</button>\n</div>\n<div>\n    <ul data-repeat-photo=\"{{ photos }}\">\n        <img width=\"260px\" height=\"190px\" style=\"cursor:pointer; object-fit: cover;\" id=\"{{ photo.index }}\" src=\"{{ photo.url }}\" alt=\"\">\n    </ul>\n</div>";
// Exports
module.exports = code;

/***/ }),

/***/ "WzKG":
/*!***************************************************!*\
  !*** ./src/admin/screens/species/add-photos.html ***!
  \***************************************************/
/*! unknown exports (runtime-defined) */
/*! exports [maybe provided (runtime-defined)] [maybe used (runtime-defined)] */
/*! runtime requirements: module */
/***/ ((module) => {

// Module
var code = "<div class=\"sub container\">\n    <div class=\"row\">\n        <label for=\"inat\">\n            <input class=\"source\" name=\"sources\" type=\"radio\" id=\"inat\" />\n            <span>iNaturalist</span>\n        </label>\n        <label for=\"eol\">\n            <input class=\"source\" name=\"sources\" type=\"radio\" checked id=\"eol\" />\n            <span>EOL</span>\n        </label>\n    </div>\n</div>\n\n<div class=\"sub container\">\n    <div class=\"row\">\n        <div class=\"input-field col s3\">\n            <input id=\"input-species-to-update\" type=\"text\" placeholder=\"Start typing latin species name\" autofocus>            \n            <label for=\"input-species-to-update\">Snapdragon species picker</label>\n        </div>\n    </div>\n</div>\n\n<div id=\"photosGallery\" class=\"row\"></div>";
// Exports
module.exports = code;

/***/ }),

/***/ "ocjl":
/*!******************************************************************!*\
  !*** ./src/admin/screens/species/add-relationship-template.html ***!
  \******************************************************************/
/*! unknown exports (runtime-defined) */
/*! exports [maybe provided (runtime-defined)] [maybe used (runtime-defined)] */
/*! runtime requirements: module */
/***/ ((module) => {

// Module
var code = "<div class=\"sub container\">\n    \n    <div class=\"row\">Relationship</div>\n    <div class=\"row\">\n        <div class=\"input-field col s3\">\n            <input id=\"input-relationship-type\" class=\"autocomplete\" type=\"text\" placeholder=\"Start typing symbiosis\" autofocus>            \n            <label for=\"input-relationship-type\">Symbiosis</label>\n        </div>\n    </div>\n\n    <div class=\"row\">Species A:</div>\n    <div class=\"row\">        \n        <div class=\"input-field col s3\">\n            <input id=\"input-species-snapdragon\" class=\"autocomplete\" type=\"text\" spellcheck=\"false\"> \n            <label for=\"input-species-snapdragon\">Snapdragon species picker</label>\n        </div>\n        <div class=\"input-field col s2\">\n            <input id=\"input-role-value-a\" class=\"autocomplete\" type=\"text\">            \n            <label for=\"input-role-value-a\">Species A role</label>\n        </div>\n    </div>\n    <div class=\"row\">Species B:</div>\n    <div class=\"row\">\n\n        <div class=\"input-field col s3\">\n            <input id=\"input-species-snapdragon-b\" type=\"text\" placeholder=\"Start typing latin species name\" autofocus spellcheck=\"false\">            \n            <label for=\"input-species-snapdragon-b\">Snapdragon species picker</label>\n        </div>\n        \n\n        <div class=\"input-field col s3\">\n            <input id=\"input-species-eol\" type=\"text\" class=\"validate autocomplete\">\n            <label for=\"input-search-eol\">Search by latin name</label>\n        </div>\n        <div class=\"async-progress hide col s2\">Looking for matches on EOL…</div>\n        <div class=\"input-field col s2\">\n            <input id=\"input-role-value-b\" class=\"autocomplete\" type=\"text\">            \n            <label for=\"input-role-value-b\">Species B role</label>\n        </div>\n    </div>\n    <div class=\"row\">\n        <div class=\"input-field col s8\">\n            <input id=\"input-description\" type=\"text\" class=\"validate autocomplete\">\n            <label for=\"input-description\">Description</label>\n        </div>\n    </div>\n    <div class=\"row\">\n        <div class=\"row-centered\">\n            <div>\n                <button class=\"btnAddRelationship btn\">Add relationship</button> \n            </div>\n            <div class=\"feedback js-message\"></div>\n        </div>\n    </div>\n    \n</div>";
// Exports
module.exports = code;

/***/ }),

/***/ "jkSi":
/*!*************************************************************!*\
  !*** ./src/admin/screens/species/add-species-template.html ***!
  \*************************************************************/
/*! unknown exports (runtime-defined) */
/*! exports [maybe provided (runtime-defined)] [maybe used (runtime-defined)] */
/*! runtime requirements: module */
/***/ ((module) => {

// Module
var code = "<div>\n    <div class=\"sub container\">\n\n    <div class=\"row\">\n        <div class=\"input-field col s2\">\n            <input id=\"input-search\" type=\"text\" class=\"validate autocomplete\" autofocus>\n            <label for=\"input-search\">Search by latin name</label>\n        </div>\n\n        <div class=\"async-progress hide col s2\">Looking for matches on EOL…</div>\n    </div>\n\n    <div class=\"row\">\n        \n        <div class=\"input-field col s2\">\n            <input id=\"input-species\" type=\"text\" class=\"validate\">\n            <label for=\"input-species\">Or enter EOL ID</label>\n        </div>\n\n        <div class=\"input-field col s2\">\n            <button id=\"btnGetSpeciesById\" class=\"btn\">Search by EOL Ref</button>\n        </div>\n\n    </div>\n\n    <div class=\"row\">\n        <div class=\"input-field\">\n            <select name=\"licences\" id=\"licences\"></select>\n        </div>\n    </div>\n    \n    <div class=\"row\">            \n\n        <div class=\"col s4\">\n            <button class=\"btnAddSpecies btn hide\">Save species and selected images</button>\n            <button class=\"btnAddTraits btn hide\">Add species traits</button>\n        </div>\n        <div class=\"js-saved-images\"></div>\n\n    </div>\n    \n    <div class=\"sub container hide-important js-images-container\">\n\n        <div class=\"row\">\n            <div class=\"col s4\">\n                <label>Available species photos. Click to add a photo.</label>             \n            </div>\n        </div>\n\n        <div class=\"images\" id=\"js-images\"></div>        \n    </div>\n\n</div>";
// Exports
module.exports = code;

/***/ }),

/***/ "F36m":
/*!***************************************************************************!*\
  !*** ./src/admin/screens/species/update-species-names-list-template.html ***!
  \***************************************************************************/
/*! unknown exports (runtime-defined) */
/*! exports [maybe provided (runtime-defined)] [maybe used (runtime-defined)] */
/*! runtime requirements: module */
/***/ ((module) => {

// Module
var code = "<ul class=\"trait-repeater\" data-repeat-name=\"{{ names }}\">\n    <li>\n        <div class=\"input-field\">\n            <input type=\"text\" class='trait-value' value=\"{{ name.vernacularName }}\" readonly=\"readonly\" />\n            <label class='trait-key'>{{ name.language }}</label>\n            <button class=\"snap-icon-btn\" id=\"{{ name.vernacularName }}\"><i class=\"fas fa-trash\"></i></button>            \n        </div>\n    </li>    \n</ul>";
// Exports
module.exports = code;

/***/ }),

/***/ "21uw":
/*!**********************************************************************!*\
  !*** ./src/admin/screens/species/update-species-names-template.html ***!
  \**********************************************************************/
/*! unknown exports (runtime-defined) */
/*! exports [maybe provided (runtime-defined)] [maybe used (runtime-defined)] */
/*! runtime requirements: module */
/***/ ((module) => {

// Module
var code = "<div class=\"sub container\">\n    <div class=\"row\">\n        <div class=\"input-field col s3\">\n            <input id=\"input-species-to-update\" type=\"text\" placeholder=\"Start typing latin species name\" autofocus>            \n            <label for=\"input-species-to-update\" class=\"active\">Snapdragon species picker</label>\n        </div>\n    </div>\n\n    <div class=\"row\">\n        <div class=\"input-field col s2\">\n            <input id=\"input-language-value\" type=\"text\" placeholder=\"Start typing short language name e.g. en, de.\">  \n            <label for=\"input-language-value\" class=\"active\">Language</label>\n        </div>\n        <div class=\"autocomplete-options-container hide-empty\" id=\"snapdragon-language-value-autocomplete\"></div>\n\n        <div class=\"input-field col s2\">\n            <input id=\"input-vernacular-value\" type=\"text\" placeholder=\"Start typing vernacular name\">  \n            <label for=\"input-vernacular-value\" class=\"active\">Vernacular name</label>\n        </div>\n    </div>\n\n    <div class=\"row\">\n        <div id=\"vernacularNames\" class=\"row\"></div>\n    </div>\n</div>";
// Exports
module.exports = code;

/***/ }),

/***/ "OIvu":
/*!****************************************************************!*\
  !*** ./src/admin/screens/species/update-species-template.html ***!
  \****************************************************************/
/*! unknown exports (runtime-defined) */
/*! exports [maybe provided (runtime-defined)] [maybe used (runtime-defined)] */
/*! runtime requirements: module */
/***/ ((module) => {

// Module
var code = "<div class=\"sub container\">\n    <div class=\"row\">\n        <div class=\"input-field col s3\">\n            <input id=\"input-species-to-update\" type=\"text\" placeholder=\"Start typing latin species name\" autofocus>            \n            <label for=\"input-species-to-update\">Snapdragon species picker</label>\n        </div>\n        <div class=\"col s8\">\n            <button class=\"btnRemoveSpecies btn hide\" disabled>Remove species</button>            \n            <span class=\"chkSafety hide\">\n                <label>\n                  <input type=\"checkbox\" />\n                  <span>Do you really want to delete this species?</span>\n                </label>\n            </span>\n        </div>        \n    </div>\n    \n    </div>\n    <div class=\"row\">\n        <div class=\"col s12\">\n            <button class=\"btnGetPhotos btn hide\">Get current photos</button>\n            <button class=\"btnUpdateSpecies btn hide\">Update selected images</button>\n            <span class=\"chkStar hide\">\n                <label>\n                  <input type=\"checkbox\" checked />\n                  <span>Check to 'star' rather than remove image</span>\n                </label>\n            </span>\n        </div>\n    </div>\n    <div class=\"row\">\n        <div class=\"col s12 images\" id=\"js-images\"></div>\n    </div>\n</div>";
// Exports
module.exports = code;

/***/ }),

/***/ "fYQH":
/*!************************************************************************!*\
  !*** ./src/admin/screens/video/create-video-description-template.html ***!
  \************************************************************************/
/*! unknown exports (runtime-defined) */
/*! exports [maybe provided (runtime-defined)] [maybe used (runtime-defined)] */
/*! runtime requirements: module */
/***/ ((module) => {

// Module
var code = "<div>\n    <div class=\"standard-block centred-block justify-space-between\">\n        <div>\n            <label>\n                <input id=\"chk-box-tag\" type=\"checkbox\" />\n                <span>Tag mode</span>\n            </label>\n        </div>\n        <div>\n            <input class=\"margin-right\" id=\"input-name\" type=\"text\" placeholder=\"Start typing tag header\" spellcheck=\"false\">            \n            <label class=\"active\" for=\"input-name\">Name</label>\n        </div>\n        <div>\n            <input class=\"has-character-counter validate\" minLength=\"1\" maxlength=\"50\" id=\"input-time\" type=\"text\" spellcheck=\"false\" type=\"text\" data-length=\"150\">  \n            <label class=\"active\" for=\"input-time\">Time</label>\n        </div>\n        <div>\n            <span class=\"js-audio-metrics\"></span>\n        </div>\n    </div>\n    <div class=\"row flex flexnowrap\">\n        <div class=\"input-field col s8\">\n            <textarea name=\"\" id=\"input-description\" spellcheck=\"true\" cols=\"100\" rows=\"18\"></textarea>\n            <label class=\"active\" for=\"input-description\">Description</label>\n        </div>\n        <div class=\"input-field col s4 margin-top js-tags\"></div>\n    </div>\n\n</div>\n\n<div class=\"margin-top standard-block centred-block\">\n    <button class=\"btnCreateDescription btn\">Add video description</button>\n    <div>\n        <span class=\"hide margin-left js-add-video-message\">Video description added!</span>\n    </div>\n</div>";
// Exports
module.exports = code;

/***/ }),

/***/ "kAQ0":
/*!******************************************************************!*\
  !*** ./src/admin/screens/video/create-video-notes-template.html ***!
  \******************************************************************/
/*! unknown exports (runtime-defined) */
/*! exports [maybe provided (runtime-defined)] [maybe used (runtime-defined)] */
/*! runtime requirements: module */
/***/ ((module) => {

// Module
var code = "<ul data-repeat-note=\"{{ notes }}\" class=\"vertical-centred-block margin-top\">\n    <li>\n        <span id=\"{{ note.tag }}\" class=\"underline-link small\">{{ note.tag }}</span>        \n    </li>\n</ul>";
// Exports
module.exports = code;

/***/ }),

/***/ "FbdU":
/*!****************************************************************!*\
  !*** ./src/ui/create-guide-modal/species-editor-template.html ***!
  \****************************************************************/
/*! unknown exports (runtime-defined) */
/*! exports [maybe provided (runtime-defined)] [maybe used (runtime-defined)] */
/*! runtime requirements: module */
/***/ ((module) => {

// Module
var code = "<div>\n    <input id=\"input-species\" type=\"text\" placeholder=\"Start typing a latin species name\" autofocus>            \n</div>\n\n<div class=\"autocomplete-options-container hide-important\" id=\"snapdragon-species-autocomplete\" style=\"width:unset;\"></div>";
// Exports
module.exports = code;

/***/ }),

/***/ "FSGx":
/*!*************************************************************************!*\
  !*** ./src/ui/create-guide-modal/species-in-guide-editor-template.html ***!
  \*************************************************************************/
/*! unknown exports (runtime-defined) */
/*! exports [maybe provided (runtime-defined)] [maybe used (runtime-defined)] */
/*! runtime requirements: module */
/***/ ((module) => {

// Module
var code = "<div class=\"guide-text-container hide-empty\">\n    <input id=\"input-species\" type=\"text\" placeholder=\"Start typing a latin species name\" autofocus>            \n</div>\n\n<div class=\"autocomplete-options-container hide-important\" id=\"snapdragon-species-autocomplete\" style=\"width:unset;\"></div>\n\n<ul class=\"selected-species js-selected-species\" data-repeat-species=\"{{ selectedSpecies }}\">\n    <li class=\"custom-control custom-checkbox\">\n        <input type=\"checkbox\" class=\"margin-half-right\" id=\"{{ species.name }}\" checked>\n        <label for=\"{{ species.name }}\">{{ species.name }}</label>\n    </li>\n</ul>";
// Exports
module.exports = code;

/***/ }),

/***/ "O56p":
/*!****************************************************************!*\
  !*** ./src/ui/create-guide-modal/species-picker-template.html ***!
  \****************************************************************/
/*! unknown exports (runtime-defined) */
/*! exports [maybe provided (runtime-defined)] [maybe used (runtime-defined)] */
/*! runtime requirements: module */
/***/ ((module) => {

// Module
var code = "<div class=\"selected-species-container\">\n    <div class=\"scrollable open js-selected-species-container\"></div>\n</div>";
// Exports
module.exports = code;

/***/ }),

/***/ "KLni":
/*!*********************************!*\
  !*** ./src/admin/css/admin.css ***!
  \*********************************/
/*! unknown exports (runtime-defined) */
/*! exports [maybe provided (runtime-defined)] [maybe used (runtime-defined)] */
/*! runtime requirements: module, __webpack_require__, module.id */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {


var content = __webpack_require__(/*! !!../../../node_modules/css-loader/dist/cjs.js!../../../node_modules/sass-loader/dist/cjs.js!./admin.css */ "iz/u");

if(typeof content === 'string') content = [[module.id, content, '']];

var transform;
var insertInto;



var options = {"hmr":true}

options.transform = transform
options.insertInto = undefined;

var update = __webpack_require__(/*! !../../../node_modules/style-loader/lib/addStyles.js */ "aET+")(content, options);

if(content.locals) module.exports = content.locals;

if(false) {}

/***/ }),

/***/ "xZ2h":
/*!*****************************************!*\
  !*** ./src/admin/scss/materialize.scss ***!
  \*****************************************/
/*! unknown exports (runtime-defined) */
/*! exports [maybe provided (runtime-defined)] [maybe used (runtime-defined)] */
/*! runtime requirements: module, __webpack_require__, module.id */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {


var content = __webpack_require__(/*! !!../../../node_modules/css-loader/dist/cjs.js!../../../node_modules/sass-loader/dist/cjs.js!./materialize.scss */ "mXK8");

if(typeof content === 'string') content = [[module.id, content, '']];

var transform;
var insertInto;



var options = {"hmr":true}

options.transform = transform
options.insertInto = undefined;

var update = __webpack_require__(/*! !../../../node_modules/style-loader/lib/addStyles.js */ "aET+")(content, options);

if(content.locals) module.exports = content.locals;

if(false) {}

/***/ }),

/***/ "4zPS":
/*!*******************************!*\
  !*** ./src/ui/css/common.css ***!
  \*******************************/
/*! unknown exports (runtime-defined) */
/*! exports [maybe provided (runtime-defined)] [maybe used (runtime-defined)] */
/*! runtime requirements: module, __webpack_require__, module.id */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {


var content = __webpack_require__(/*! !!../../../node_modules/css-loader/dist/cjs.js!../../../node_modules/sass-loader/dist/cjs.js!./common.css */ "WkL7");

if(typeof content === 'string') content = [[module.id, content, '']];

var transform;
var insertInto;



var options = {"hmr":true}

options.transform = transform
options.insertInto = undefined;

var update = __webpack_require__(/*! !../../../node_modules/style-loader/lib/addStyles.js */ "aET+")(content, options);

if(content.locals) module.exports = content.locals;

if(false) {}

/***/ }),

/***/ "QdVK":
/*!*******************************************!*\
  !*** ./src/ui/css/snapdragon-colours.css ***!
  \*******************************************/
/*! unknown exports (runtime-defined) */
/*! exports [maybe provided (runtime-defined)] [maybe used (runtime-defined)] */
/*! runtime requirements: module, __webpack_require__, module.id */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {


var content = __webpack_require__(/*! !!../../../node_modules/css-loader/dist/cjs.js!../../../node_modules/sass-loader/dist/cjs.js!./snapdragon-colours.css */ "bbET");

if(typeof content === 'string') content = [[module.id, content, '']];

var transform;
var insertInto;



var options = {"hmr":true}

options.transform = transform
options.insertInto = undefined;

var update = __webpack_require__(/*! !../../../node_modules/style-loader/lib/addStyles.js */ "aET+")(content, options);

if(content.locals) module.exports = content.locals;

if(false) {}

/***/ })

},[["Np9t","vendors"]]]);
//# sourceMappingURL=admin.bundle.js.map