(window["webpackJsonplearn_the_planet"] = window["webpackJsonplearn_the_planet"] || []).push([["src_quiz_quiz-modal_js"],{

/***/ "7+u5":
/*!************************************!*\
  !*** ./src/quiz/quiz-api-decks.js ***!
  \************************************/
/*! namespace exports */
/*! export decks [provided] [used] [could be renamed] */
/*! other exports [not provided] [unused] */
/*! runtime requirements: __webpack_exports__, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "decks": () => /* binding */ decks
/* harmony export */ });
var decks = [{
  name: 'Wild Portugal',
  species: ["Phagnalon saxatile", "Lysimachia arvensis", "Campanula erinus", "Silene gallica", "Lagurus ovatus", "Acanthus mollis", "Glebionis coronaria", "Galactites tomentosa", "Geranium purpureum", "Taraxacum officinale"]
}, {
  name: 'Wild England I',
  species: ["Lysimachia arvensis", "Cymbalaria muralis", "Daucus carota", "Parietaria judaica", "Foeniculum vulgare", "Convolvulus arvensis", "Capsella bursa-pastoris", "Bellis perennis", "Geranium molle", "Glebionis coronaria"]
}, {
  name: 'Wild England II',
  species: ["Acanthus mollis", "Cistus salviifolius", "Borago officinalis", "Oxalis pes-caprae", "Lantana camara", "Trifolium repens", "Urtica dioica", "Lythrum salicaria", "Echium vulgare", "Dactylis glomerata"]
}, {
  name: 'Wild England III',
  species: ['Epilobium angustifolium', 'Cardamine hirsuta', 'Conium maculatum', 'Borago officinalis', 'Briza maxima', 'Brassica nigra', 'Malva multiflora', 'Achillea millefolium', 'Pulicaria dysenterica', 'Succisa pratensis']
}, {
  name: 'Mushrooms',
  species: ["Cantharellus lateritius", "Hericium erinaceus", "Pleurotus ostreatus", "Craterellus fallax", "Laetiporus sulphureus", "Calvatia gigantea", "Amanita bisporigera", "Galerina marginata", "Chlorophyllum molybdites", "Grifola frondosa"]
}];

/***/ }),

/***/ "YAPL":
/*!******************************!*\
  !*** ./src/quiz/quiz-api.js ***!
  \******************************/
/*! namespace exports */
/*! export api [provided] [used] [could be renamed] */
/*! other exports [not provided] [unused] */
/*! runtime requirements: __webpack_require__, __webpack_exports__, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "api": () => /* binding */ api
/* harmony export */ });
/* harmony import */ var api_firebase_firestore__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! api/firebase/firestore */ "xWjd");
/* harmony import */ var quiz_quiz_api_decks__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! quiz/quiz-api-decks */ "7+u5");
/* harmony import */ var ui_helpers_image_handler__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ui/helpers/image-handler */ "mASn");
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





var getDeckSummaries = function getDeckSummaries() {
  return new Promise(function (resolve) {
    return resolve(quiz_quiz_api_decks__WEBPACK_IMPORTED_MODULE_1__.decks.map(function (deck) {
      return {
        name: deck.name,
        count: deck.species.length
      };
    }));
  });
};

var getSpeciesDetailsInParallel = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(species) {
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return api_firebase_firestore__WEBPACK_IMPORTED_MODULE_0__.firestore.getSpeciesInParallel(species);

          case 2:
            return _context.abrupt("return", _context.sent);

          case 3:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, this);
  }));

  return function getSpeciesDetailsInParallel(_x) {
    return _ref.apply(this, arguments);
  };
}();

var getDecks = /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(name) {
    var species, items, deck;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            species = quiz_quiz_api_decks__WEBPACK_IMPORTED_MODULE_1__.decks.find(function (deck) {
              return deck.name === name;
            }).species;
            _context2.next = 3;
            return getSpeciesDetailsInParallel(species.map(function (s) {
              return {
                name: s
              };
            }));

          case 3:
            items = _context2.sent;
            deck = {
              name: name,
              species: items
            };
            return _context2.abrupt("return", [{
              name: deck.name,
              species: deck.species.map(function (sp) {
                return {
                  name: sp.name,
                  vernacularName: '',
                  names: sp.names,
                  srcs: sp.images.map(function (i) {
                    return (0,ui_helpers_image_handler__WEBPACK_IMPORTED_MODULE_2__.scaleImage)(i).medium;
                  })
                };
              })
            }]);

          case 6:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, this);
  }));

  return function getDecks(_x2) {
    return _ref2.apply(this, arguments);
  };
}();

var api = {
  getDeckSummaries: getDeckSummaries,
  getDecks: getDecks
};

/***/ }),

/***/ "zBa/":
/*!*********************************!*\
  !*** ./src/quiz/quiz-config.js ***!
  \*********************************/
/*! namespace exports */
/*! export quizConfig [provided] [used] [could be renamed] */
/*! other exports [not provided] [unused] */
/*! runtime requirements: __webpack_exports__, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "quizConfig": () => /* binding */ quizConfig
/* harmony export */ });
var quizConfig = {
  TIME_PER_QUESTION: 5,
  QUESTIONS_PER_SPECIES: 2
};

/***/ }),

/***/ "IYBF":
/*!*******************************!*\
  !*** ./src/quiz/quiz-deck.js ***!
  \*******************************/
/*! namespace exports */
/*! export quizDeck [provided] [used] [could be renamed] */
/*! other exports [not provided] [unused] */
/*! runtime requirements: __webpack_require__, __webpack_require__.n, __webpack_exports__, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "quizDeck": () => /* binding */ quizDeck
/* harmony export */ });
/* harmony import */ var quiz_templating__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! quiz/templating */ "hpCV");
/* harmony import */ var redux_store__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! redux/store */ "J8+u");
/* harmony import */ var quiz_quiz_logic__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! quiz/quiz-logic */ "Dl82");
/* harmony import */ var quiz_quiz_deck_image_template_html__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! quiz/quiz-deck-image-template.html */ "fSFr");
/* harmony import */ var quiz_quiz_deck_image_template_html__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(quiz_quiz_deck_image_template_html__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var quiz_quiz_deck_answers_template_html__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! quiz/quiz-deck-answers-template.html */ "asyO");
/* harmony import */ var quiz_quiz_deck_answers_template_html__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(quiz_quiz_deck_answers_template_html__WEBPACK_IMPORTED_MODULE_4__);
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






var quizDeck = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(deck) {
    var _store$getState, deckSettings, template, parent, card, handleAnswer, options;

    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            document.querySelector('.quiz .js-quiz-header').innerText = deck.name;
            _store$getState = redux_store__WEBPACK_IMPORTED_MODULE_1__.store.getState(), deckSettings = _store$getState.deckSettings;
            template = document.createElement('template');
            template.innerHTML = (quiz_quiz_deck_image_template_html__WEBPACK_IMPORTED_MODULE_3___default());
            parent = document.querySelector('.js-quiz-top');
            parent.innerHTML = '';
            card = deck.cards.find(function (card) {
              return card.isCurrent;
            }) || deck.cards[0];
            card.answers.forEach(function (answer) {
              answer.name1 = deckSettings.name === 'vernacular' ? answer.vernacularName : answer.name;
              answer.name2 = deckSettings.name === 'latin' ? answer.vernacularName : answer.name;
            });
            (0,quiz_templating__WEBPACK_IMPORTED_MODULE_0__.renderTemplate)({
              card: card
            }, template.content, parent);
            template.innerHTML = (quiz_quiz_deck_answers_template_html__WEBPACK_IMPORTED_MODULE_4___default());
            parent = document.querySelector('.js-quiz-middle');
            parent.innerHTML = '';
            (0,quiz_templating__WEBPACK_IMPORTED_MODULE_0__.renderTemplate)({
              card: card
            }, template.content, parent);

            handleAnswer = function handleAnswer(e) {
              var _store$getState2 = redux_store__WEBPACK_IMPORTED_MODULE_1__.store.getState(),
                  deckScore = _store$getState2.deckScore;

              var answer = {
                question: {
                  name: card.answer.name,
                  vernacularName: card.answer.vernacularName
                },
                answer: {
                  name: e.target.dataset.name,
                  vernacularName: e.target.dataset.vernacularName
                }
              };
              var cardIndex = deck.cards.findIndex(function (c) {
                return c.isCurrent;
              });
              var score = quiz_quiz_logic__WEBPACK_IMPORTED_MODULE_2__.logic.scoreResponseAndSetNextCard(answer, cardIndex === -1 ? 0 : cardIndex, deck.cards.length, deckScore);
              score.success ? e.target.classList.add('snap-success') : e.target.classList.add('snap-alert');

              if (!score.success) {
                document.querySelectorAll('.js-strip').forEach(function (strip) {
                  if (strip.dataset.name === score.question.name) {
                    strip.classList.add('snap-success');
                  }
                });
              }
            };

            options = document.querySelectorAll('.js-strip');
            options.forEach(function (option) {
              return option.addEventListener('click', handleAnswer);
            });

          case 16:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, this);
  }));

  return function quizDeck(_x) {
    return _ref.apply(this, arguments);
  };
}();

/***/ }),

/***/ "NLt7":
/*!********************************!*\
  !*** ./src/quiz/quiz-decks.js ***!
  \********************************/
/*! namespace exports */
/*! export quizDecks [provided] [used] [could be renamed] */
/*! other exports [not provided] [unused] */
/*! runtime requirements: __webpack_require__, __webpack_require__.n, __webpack_exports__, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "quizDecks": () => /* binding */ quizDecks
/* harmony export */ });
/* harmony import */ var quiz_templating__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! quiz/templating */ "hpCV");
/* harmony import */ var redux_store__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! redux/store */ "J8+u");
/* harmony import */ var ui_helpers_enum_helper__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ui/helpers/enum-helper */ "DXx0");
/* harmony import */ var redux_actions_action_creators__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! redux/actions/action-creators */ "/CNf");
/* harmony import */ var quiz_quiz_logic__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! quiz/quiz-logic */ "Dl82");
/* harmony import */ var quiz_quiz_config__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! quiz/quiz-config */ "zBa/");
/* harmony import */ var quiz_quiz_decks_template_html__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! quiz/quiz-decks-template.html */ "V6SG");
/* harmony import */ var quiz_quiz_decks_template_html__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(quiz_quiz_decks_template_html__WEBPACK_IMPORTED_MODULE_6__);
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








var quizDecks = function quizDecks(decks) {
  document.querySelector('.quiz .js-quiz-header').innerText = 'Species recognition';
  var template = document.createElement('template');
  template.innerHTML = (quiz_quiz_decks_template_html__WEBPACK_IMPORTED_MODULE_6___default());
  var parent = document.querySelector('.js-quiz-top');
  parent.innerHTML = '';
  (0,quiz_templating__WEBPACK_IMPORTED_MODULE_0__.renderTemplate)({
    decks: decks.filter(function (deck) {
      return deck.count > 0;
    })
  }, template.content, parent);

  var handleDeckSelector = /*#__PURE__*/function () {
    var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(e) {
      var _store$getState, deckSettings;

      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _store$getState = redux_store__WEBPACK_IMPORTED_MODULE_1__.store.getState(), deckSettings = _store$getState.deckSettings;
              _context.t0 = redux_actions_action_creators__WEBPACK_IMPORTED_MODULE_3__.actions;
              _context.next = 4;
              return quiz_quiz_logic__WEBPACK_IMPORTED_MODULE_4__.logic.getQuizDeck(e.target.dataset.name, quiz_quiz_config__WEBPACK_IMPORTED_MODULE_5__.quizConfig.QUESTIONS_PER_SPECIES, deckSettings.language);

            case 4:
              _context.t1 = _context.sent;

              _context.t0.boundUpdateDeck.call(_context.t0, _context.t1);

              redux_actions_action_creators__WEBPACK_IMPORTED_MODULE_3__.actions.boundUpdateDeckState(ui_helpers_enum_helper__WEBPACK_IMPORTED_MODULE_2__.enums.deckState.BEGIN);

            case 7:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, this);
    }));

    return function handleDeckSelector(_x) {
      return _ref.apply(this, arguments);
    };
  }();

  document.querySelectorAll('.js-decks').forEach(function (deck) {
    deck.addEventListener('click', handleDeckSelector, {
      once: true
    });
  });
};

/***/ }),

/***/ "Kwd0":
/*!****************************************!*\
  !*** ./src/quiz/quiz-logic-handler.js ***!
  \****************************************/
/*! namespace exports */
/*! export quizLogicHandler [provided] [used] [could be renamed] */
/*! other exports [not provided] [unused] */
/*! runtime requirements: __webpack_require__, __webpack_exports__, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "quizLogicHandler": () => /* binding */ quizLogicHandler
/* harmony export */ });
/* harmony import */ var ramda__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ramda */ "pWpQ");
/* harmony import */ var ramda__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ramda */ "CvH3");
/* harmony import */ var utils_utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! utils/utils */ "EHpu");
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




var getDeck = function getDeck(deck, numberOfAlternativeAnswers, numberOfCardsPerSpecies) {
  var _numberOfCardsPerSpecies = numberOfCardsPerSpecies > deck.species[0].srcs.length ? deck.species[0].srcs.length : numberOfCardsPerSpecies;

  var _index = 0;

  var _deck = _getDeck(deck, numberOfAlternativeAnswers, _index);

  ++_index;

  while (_index < _numberOfCardsPerSpecies) {
    _deck.cards = [].concat(_toConsumableArray(_deck.cards), _toConsumableArray(_getDeck(deck, numberOfAlternativeAnswers, _index).cards));
    ++_index;
  }

  return _deck;
};

var _getDeck = function _getDeck(deck, numberOfAlternativeAnswers, index) {
  deck.cards = [];
  deck.exclude = [];
  deck.species.forEach(function (sp) {
    var answer = utils_utils__WEBPACK_IMPORTED_MODULE_0__.utils.shuffleArray(deck.species.filter(function (sp) {
      return !(0,ramda__WEBPACK_IMPORTED_MODULE_1__.default)(sp.name, deck.exclude);
    }));
    if (!answer) return;
    answer = answer[0];
    var answers = utils_utils__WEBPACK_IMPORTED_MODULE_0__.utils.shuffleArray([].concat(_toConsumableArray((0,ramda__WEBPACK_IMPORTED_MODULE_2__.default)(numberOfAlternativeAnswers, deck.species.filter(function (sp) {
      return sp.name !== answer.name;
    }))), [answer]));
    var card = {
      answers: answers.map(function (answer) {
        return _objectSpread(_objectSpread({}, answer), {}, {
          src: answer.srcs[index]
        });
      }),
      answer: _objectSpread(_objectSpread({}, answer), {}, {
        src: answer.srcs[index]
      })
    };
    deck.exclude.push(answer.name);
    deck.cards.push(card);
  });
  return deck;
};

var getScore = function getScore(response, isLastCard, deckScore) {
  var score = {
    question: response.question,
    answer: response.answer,
    success: response.question.name === response.answer.name || response.question.vernacularName === response.answer.vernacularName,
    isLastCard: isLastCard
  };
  var total = ++deckScore.total;
  var correct = deckScore.correct;
  var incorrect = deckScore.incorrect;
  return _objectSpread(_objectSpread({}, score), {}, {
    total: total,
    correct: score.success ? ++correct : correct,
    incorrect: !score.success ? ++incorrect : incorrect
  });
};

var quizLogicHandler = {
  getDeck: getDeck,
  getScore: getScore
};

/***/ }),

/***/ "Dl82":
/*!********************************!*\
  !*** ./src/quiz/quiz-logic.js ***!
  \********************************/
/*! namespace exports */
/*! export logic [provided] [used] [could be renamed] */
/*! export scoreResponseAndSetNextCard [provided] [unused] [could be renamed] */
/*! other exports [not provided] [unused] */
/*! runtime requirements: __webpack_require__, __webpack_require__.n, __webpack_exports__, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "logic": () => /* binding */ logic
/* harmony export */ });
/* unused harmony export scoreResponseAndSetNextCard */
/* harmony import */ var babel_polyfill__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! babel-polyfill */ "6pDI");
/* harmony import */ var babel_polyfill__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(babel_polyfill__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var redux_store__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! redux/store */ "J8+u");
/* harmony import */ var redux_subscriptions__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! redux/subscriptions */ "6saE");
/* harmony import */ var quiz_quiz_api__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! quiz/quiz-api */ "YAPL");
/* harmony import */ var redux_actions_action_creators__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! redux/actions/action-creators */ "/CNf");
/* harmony import */ var quiz_quiz_logic_handler__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! quiz/quiz-logic-handler */ "Kwd0");
/* harmony import */ var quiz_quiz_deck__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! quiz/quiz-deck */ "IYBF");
/* harmony import */ var quiz_quiz_state__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! quiz/quiz-state */ "Tp34");
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










var getDecks = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return quiz_quiz_api__WEBPACK_IMPORTED_MODULE_3__.api.getDecks();

          case 2:
            return _context.abrupt("return", _context.sent);

          case 3:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, this);
  }));

  return function getDecks() {
    return _ref.apply(this, arguments);
  };
}();

var getQuizDeck = /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(name) {
    var numberOfCardsPerSpecies,
        language,
        _store$getState,
        config,
        NUMBER_OF_ALTERNATIVE_ANSWERS,
        decks,
        deck,
        _deck,
        _args2 = arguments;

    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            numberOfCardsPerSpecies = _args2.length > 1 && _args2[1] !== undefined ? _args2[1] : 1;
            language = _args2.length > 2 && _args2[2] !== undefined ? _args2[2] : 'en';
            _store$getState = redux_store__WEBPACK_IMPORTED_MODULE_1__.store.getState(), config = _store$getState.config;
            NUMBER_OF_ALTERNATIVE_ANSWERS = config.isLandscapeMode ? 5 : 3;
            _context2.next = 6;
            return quiz_quiz_api__WEBPACK_IMPORTED_MODULE_3__.api.getDecks(name);

          case 6:
            decks = _context2.sent;
            deck = decks[0];
            deck.species.forEach(function (s) {
              var names = s.names.filter(function (name) {
                return name.language === language;
              });
              s.vernacularName = names.length > 0 ? names[0].vernacularName : '';
            });
            _deck = quiz_quiz_logic_handler__WEBPACK_IMPORTED_MODULE_5__.quizLogicHandler.getDeck(_objectSpread(_objectSpread({}, deck), {}, {
              isCurrent: true
            }), NUMBER_OF_ALTERNATIVE_ANSWERS, numberOfCardsPerSpecies);
            redux_subscriptions__WEBPACK_IMPORTED_MODULE_2__.subscription.add(quiz_quiz_deck__WEBPACK_IMPORTED_MODULE_6__.quizDeck, 'deck', 'modal');
            redux_subscriptions__WEBPACK_IMPORTED_MODULE_2__.subscription.add(quiz_quiz_state__WEBPACK_IMPORTED_MODULE_7__.quizState, 'deckState', 'modal');
            redux_subscriptions__WEBPACK_IMPORTED_MODULE_2__.subscription.add(quiz_quiz_state__WEBPACK_IMPORTED_MODULE_7__.quizScore, 'deckScore', 'modal');
            return _context2.abrupt("return", _deck);

          case 14:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, this);
  }));

  return function getQuizDeck(_x) {
    return _ref2.apply(this, arguments);
  };
}();

var getDeckSummaries = /*#__PURE__*/function () {
  var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3() {
    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.next = 2;
            return quiz_quiz_api__WEBPACK_IMPORTED_MODULE_3__.api.getDeckSummaries();

          case 2:
            return _context3.abrupt("return", _context3.sent);

          case 3:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3, this);
  }));

  return function getDeckSummaries() {
    return _ref3.apply(this, arguments);
  };
}();

var getNextDeck = /*#__PURE__*/function () {
  var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4() {
    var decks;
    return regeneratorRuntime.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            _context4.next = 2;
            return quiz_quiz_api__WEBPACK_IMPORTED_MODULE_3__.api.getDecks();

          case 2:
            decks = _context4.sent;
            return _context4.abrupt("return", decks[0]);

          case 4:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4, this);
  }));

  return function getNextDeck() {
    return _ref4.apply(this, arguments);
  };
}();

var getTimeRemaining = function getTimeRemaining(endtime) {
  var total = Date.parse(endtime) - Date.parse(new Date());
  var seconds = Math.floor(total / 1000 % 60);
  var minutes = Math.floor(total / 1000 / 60 % 60);
  var hours = Math.floor(total / (1000 * 60 * 60) % 24);
  var days = Math.floor(total / (1000 * 60 * 60 * 24));
  return {
    total: total,
    days: days,
    hours: hours,
    minutes: minutes,
    seconds: seconds
  };
};

var timeinterval, currentClockTime;

var resetClock = function resetClock() {
  clearInterval(timeinterval);
  return currentClockTime;
};

var disableAnswers = function disableAnswers() {
  var answers = document.querySelector('.js-strips.answers');
  if (answers) answers.classList.add('no-pointer-events');
};

var initialiseClock = function initialiseClock(clock, endtime) {
  timeinterval = setInterval(function () {
    var t = getTimeRemaining(endtime);
    var seconds = t.minutes * 60 + t.seconds;
    clock.innerHTML = convertSecondsToClockTime(seconds);

    if (t.total < 0) {
      redux_actions_action_creators__WEBPACK_IMPORTED_MODULE_4__.actions.boundUpdateDeckScoreHistory(redux_store__WEBPACK_IMPORTED_MODULE_1__.store.getState().deckScore);
      disableAnswers();
      resetClock();
    }

    currentClockTime = convertSecondsToClockTime(seconds);
  }, 1000);
};

var scoreResponseAndSetNextCard = function scoreResponseAndSetNextCard(response) {
  var cardIndex = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
  var cardCount = arguments.length > 2 ? arguments[2] : undefined;
  var deckScore = arguments.length > 3 ? arguments[3] : undefined;
  var index = ++cardIndex;
  var isLastCard = index === cardCount;
  var isSecondLastCard = index === cardCount - 1;
  var score = quiz_quiz_logic_handler__WEBPACK_IMPORTED_MODULE_5__.quizLogicHandler.getScore(response, isLastCard, deckScore);
  setTimeout(function () {
    // delay to allow the card to change red or green, indicating incorrect or correct
    if (!isLastCard) {
      redux_actions_action_creators__WEBPACK_IMPORTED_MODULE_4__.actions.boundNextCard({
        index: index,
        isLastCard: isLastCard,
        isSecondLastCard: isSecondLastCard
      });
    }

    redux_actions_action_creators__WEBPACK_IMPORTED_MODULE_4__.actions.boundUpdateDeckScore(score);

    if (isLastCard) {
      redux_actions_action_creators__WEBPACK_IMPORTED_MODULE_4__.actions.boundUpdateDeckScoreHistory(score);
      disableAnswers();
    }
  }, 500);
  return score;
};

var convertSecondsToClockTime = function convertSecondsToClockTime(timeInSeconds) {
  var pad = function pad(num, size) {
    return ('000' + num).slice(size * -1);
  },
      time = parseFloat(timeInSeconds).toFixed(3),
      hours = Math.floor(time / 60 / 60),
      minutes = Math.floor(time / 60) % 60,
      seconds = Math.floor(time - minutes * 60),
      milliseconds = time.slice(-3);

  return pad(minutes, 2) + ':' + pad(seconds, 2);
};

var logic = {
  getDecks: getDecks,
  getQuizDeck: getQuizDeck,
  getDeckSummaries: getDeckSummaries,
  getNextDeck: getNextDeck,
  initialiseClock: initialiseClock,
  resetClock: resetClock,
  scoreResponseAndSetNextCard: scoreResponseAndSetNextCard,
  convertSecondsToClockTime: convertSecondsToClockTime
};

/***/ }),

/***/ "j2GY":
/*!********************************!*\
  !*** ./src/quiz/quiz-modal.js ***!
  \********************************/
/*! namespace exports */
/*! export openQuiz [provided] [maybe used (runtime-defined)] [usage prevents renaming] */
/*! other exports [not provided] [maybe used (runtime-defined)] */
/*! runtime requirements: __webpack_require__, __webpack_require__.r, __webpack_exports__, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "openQuiz": () => /* binding */ openQuiz
/* harmony export */ });
/* harmony import */ var redux_actions_action_creators__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! redux/actions/action-creators */ "/CNf");
/* harmony import */ var redux_subscriptions__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! redux/subscriptions */ "6saE");
/* harmony import */ var quiz_quiz_logic__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! quiz/quiz-logic */ "Dl82");
/* harmony import */ var quiz_quiz_decks__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! quiz/quiz-decks */ "NLt7");
/* harmony import */ var quiz_quiz_settings__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! quiz/quiz-settings */ "QVTd");
/* harmony import */ var quiz_quiz_summary__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! quiz/quiz-summary */ "2U65");
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







var openQuiz = function openQuiz() {
  var init = /*#__PURE__*/function () {
    var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
      var decks;
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              redux_subscriptions__WEBPACK_IMPORTED_MODULE_1__.subscription.add(quiz_quiz_decks__WEBPACK_IMPORTED_MODULE_3__.quizDecks, 'decks', 'modal');
              redux_subscriptions__WEBPACK_IMPORTED_MODULE_1__.subscription.add(quiz_quiz_settings__WEBPACK_IMPORTED_MODULE_4__.quizSettings, 'decks', 'modal');
              redux_subscriptions__WEBPACK_IMPORTED_MODULE_1__.subscription.add(quiz_quiz_summary__WEBPACK_IMPORTED_MODULE_5__.quizSummary, 'decks', 'modal');
              _context.next = 5;
              return quiz_quiz_logic__WEBPACK_IMPORTED_MODULE_2__.logic.getDeckSummaries();

            case 5:
              decks = _context.sent;
              redux_actions_action_creators__WEBPACK_IMPORTED_MODULE_0__.actions.boundUpdateDecks([].concat(_toConsumableArray(decks.filter(function (deck) {
                return deck.count > 0;
              })), [{
                name: "".concat(new Date().getTime()),
                count: 0
              }]));

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
};

/***/ }),

/***/ "QVTd":
/*!***********************************!*\
  !*** ./src/quiz/quiz-settings.js ***!
  \***********************************/
/*! namespace exports */
/*! export quizSettings [provided] [used] [could be renamed] */
/*! other exports [not provided] [unused] */
/*! runtime requirements: __webpack_require__, __webpack_require__.n, __webpack_exports__, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "quizSettings": () => /* binding */ quizSettings
/* harmony export */ });
/* harmony import */ var redux_store__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! redux/store */ "J8+u");
/* harmony import */ var quiz_templating__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! quiz/templating */ "hpCV");
/* harmony import */ var redux_actions_action_creators__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! redux/actions/action-creators */ "/CNf");
/* harmony import */ var quiz_quiz_settings_template_html__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! quiz/quiz-settings-template.html */ "L/cr");
/* harmony import */ var quiz_quiz_settings_template_html__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(quiz_quiz_settings_template_html__WEBPACK_IMPORTED_MODULE_3__);




var quizSettings = function quizSettings(decks) {
  var _store$getState = redux_store__WEBPACK_IMPORTED_MODULE_0__.store.getState(),
      deckSettings = _store$getState.deckSettings;

  var template = document.createElement('template');
  template.innerHTML = (quiz_quiz_settings_template_html__WEBPACK_IMPORTED_MODULE_3___default());
  var parent = document.querySelector('.js-quiz-middle');
  parent.innerHTML = '';
  (0,quiz_templating__WEBPACK_IMPORTED_MODULE_1__.renderTemplate)({}, template.content, parent);
  document.querySelectorAll('.names input').forEach(function (r) {
    if (r.id === deckSettings.name) r.checked = true;
    r.addEventListener('click', function (e) {
      redux_actions_action_creators__WEBPACK_IMPORTED_MODULE_2__.actions.boundUpdateDeckSettings({
        name: e.target.id
      });
    });
  });
  document.querySelectorAll('.languages input').forEach(function (r) {
    if (r.id === deckSettings.language) r.checked = true;
    r.addEventListener('click', function (e) {
      redux_actions_action_creators__WEBPACK_IMPORTED_MODULE_2__.actions.boundUpdateDeckSettings({
        language: e.target.id
      });
    });
  });
};

/***/ }),

/***/ "Tp34":
/*!********************************!*\
  !*** ./src/quiz/quiz-state.js ***!
  \********************************/
/*! namespace exports */
/*! export quizScore [provided] [used] [could be renamed] */
/*! export quizState [provided] [used] [could be renamed] */
/*! other exports [not provided] [unused] */
/*! runtime requirements: __webpack_require__, __webpack_require__.n, __webpack_exports__, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "quizState": () => /* binding */ quizState,
/* harmony export */   "quizScore": () => /* binding */ quizScore
/* harmony export */ });
/* harmony import */ var redux_store__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! redux/store */ "J8+u");
/* harmony import */ var redux_actions_action_creators__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! redux/actions/action-creators */ "/CNf");
/* harmony import */ var quiz_quiz_logic__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! quiz/quiz-logic */ "Dl82");
/* harmony import */ var ui_helpers_enum_helper__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ui/helpers/enum-helper */ "DXx0");
/* harmony import */ var quiz_templating__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! quiz/templating */ "hpCV");
/* harmony import */ var quiz_quiz_state_begin_html__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! quiz/quiz-state-begin.html */ "1yFW");
/* harmony import */ var quiz_quiz_state_begin_html__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(quiz_quiz_state_begin_html__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var quiz_quiz_state_score_html__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! quiz/quiz-state-score.html */ "ZBLv");
/* harmony import */ var quiz_quiz_state_score_html__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(quiz_quiz_state_score_html__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var quiz_quiz_config__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! quiz/quiz-config */ "zBa/");
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









var quizState = function quizState(deckState) {
  var _store$getState = redux_store__WEBPACK_IMPORTED_MODULE_0__.store.getState(),
      decks = _store$getState.decks,
      deck = _store$getState.deck;

  var seconds = quiz_quiz_config__WEBPACK_IMPORTED_MODULE_7__.quizConfig.TIME_PER_QUESTION * deck.cards.length * quiz_quiz_config__WEBPACK_IMPORTED_MODULE_7__.quizConfig.QUESTIONS_PER_SPECIES;
  var milliseconds = seconds * 1000;
  var template = document.createElement('template');

  switch (deckState) {
    case ui_helpers_enum_helper__WEBPACK_IMPORTED_MODULE_3__.enums.deckState.BEGIN:
      template.innerHTML = (quiz_quiz_state_begin_html__WEBPACK_IMPORTED_MODULE_5___default());
      break;

    case ui_helpers_enum_helper__WEBPACK_IMPORTED_MODULE_3__.enums.deckState.SCORE:
      template.innerHTML = (quiz_quiz_state_score_html__WEBPACK_IMPORTED_MODULE_6___default());
      break;

    default:
      template.innerHTML = (quiz_quiz_state_score_html__WEBPACK_IMPORTED_MODULE_6___default());
  }

  var parent = document.querySelector('.js-quiz-bottom');
  parent.innerHTML = '';
  (0,quiz_templating__WEBPACK_IMPORTED_MODULE_4__.renderTemplate)({
    time: quiz_quiz_logic__WEBPACK_IMPORTED_MODULE_2__.logic.convertSecondsToClockTime(seconds),
    remaining: deck.cards.length
  }, template.content, parent);
  var clock = document.querySelector('.js-clock');

  switch (deckState.name) {
    case ui_helpers_enum_helper__WEBPACK_IMPORTED_MODULE_3__.enums.deckState.BEGIN.name:
      break;

    case ui_helpers_enum_helper__WEBPACK_IMPORTED_MODULE_3__.enums.deckState.SCORE.name:
      var endTime = new Date(Date.now() + milliseconds);
      quiz_quiz_logic__WEBPACK_IMPORTED_MODULE_2__.logic.initialiseClock(clock, endTime);
      break;

    case ui_helpers_enum_helper__WEBPACK_IMPORTED_MODULE_3__.enums.deckState.END.name:
      clock.innerHTML = quiz_quiz_logic__WEBPACK_IMPORTED_MODULE_2__.logic.resetClock();
      break;
  }

  document.querySelector('.js-quiz-back').addEventListener('click', function (e) {
    quiz_quiz_logic__WEBPACK_IMPORTED_MODULE_2__.logic.resetClock();
    redux_actions_action_creators__WEBPACK_IMPORTED_MODULE_1__.actions.boundUpdateDecks([].concat(_toConsumableArray(decks.filter(function (deck) {
      return deck.count > 0;
    })), [{
      name: "".concat(new Date().getTime()),
      count: 0
    }]));
  });
};
var quizScore = function quizScore(deckScore) {
  var _store$getState2 = redux_store__WEBPACK_IMPORTED_MODULE_0__.store.getState(),
      deck = _store$getState2.deck;

  var score = document.querySelector('.js-deck-score');
  var remaining = document.querySelector('.js-deck-remaining');
  if (!score) return;
  score.innerHTML = "".concat(deckScore.correct, "/").concat(deckScore.total);
  remaining.innerHTML = deck.cards.length - deckScore.total;
};

/***/ }),

/***/ "2U65":
/*!**********************************!*\
  !*** ./src/quiz/quiz-summary.js ***!
  \**********************************/
/*! namespace exports */
/*! export quizSummary [provided] [used] [could be renamed] */
/*! other exports [not provided] [unused] */
/*! runtime requirements: __webpack_require__, __webpack_require__.n, __webpack_exports__, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "quizSummary": () => /* binding */ quizSummary
/* harmony export */ });
/* harmony import */ var redux_store__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! redux/store */ "J8+u");
/* harmony import */ var quiz_templating__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! quiz/templating */ "hpCV");
/* harmony import */ var quiz_quiz_summary_template_html__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! quiz/quiz-summary-template.html */ "pIAc");
/* harmony import */ var quiz_quiz_summary_template_html__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(quiz_quiz_summary_template_html__WEBPACK_IMPORTED_MODULE_2__);



var quizSummary = function quizSummary(decks) {
  var _store$getState = redux_store__WEBPACK_IMPORTED_MODULE_0__.store.getState(),
      deckScore = _store$getState.deckScore,
      deckScoreHistory = _store$getState.deckScoreHistory;

  var template = document.createElement('template');
  template.innerHTML = (quiz_quiz_summary_template_html__WEBPACK_IMPORTED_MODULE_2___default());
  var parent = document.querySelector('.js-quiz-bottom');
  parent.innerHTML = '';
  (0,quiz_templating__WEBPACK_IMPORTED_MODULE_1__.renderTemplate)({
    deckScoreHistory: deckScoreHistory,
    deckScore: deckScore
  }, template.content, parent);
};

/***/ }),

/***/ "hpCV":
/*!********************************!*\
  !*** ./src/quiz/templating.js ***!
  \********************************/
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

/***/ "asyO":
/*!**************************************************!*\
  !*** ./src/quiz/quiz-deck-answers-template.html ***!
  \**************************************************/
/*! unknown exports (runtime-defined) */
/*! exports [maybe provided (runtime-defined)] [maybe used (runtime-defined)] */
/*! runtime requirements: module */
/***/ ((module) => {

// Module
var code = "<section class=\"strips-container\">\n  <ul class=\"answers strips js-strips\" data-repeat-answer=\"{{ card.answers }}\">\n    <li class=\"strip js-strip\" data-name=\"{{ answer.name }}\" data-vernacular-name=\"{{ answer.vernacularName }}\">\n      <button class=\"snap-icon-btn\">\n        <span>{{ answer.name1 }}</span>\n        <span>{{ answer.name2 }}</span>\n      </button>\n    </li>\n  </ul>\n</section>";
// Exports
module.exports = code;

/***/ }),

/***/ "fSFr":
/*!************************************************!*\
  !*** ./src/quiz/quiz-deck-image-template.html ***!
  \************************************************/
/*! unknown exports (runtime-defined) */
/*! exports [maybe provided (runtime-defined)] [maybe used (runtime-defined)] */
/*! runtime requirements: module */
/***/ ((module) => {

// Module
var code = "<section class=\"image-block-container\">\n  <div class=\"image-container double-centred-block\">\n    <img src=\"{{ card.answer.src }}\" alt=\"{{ card.answer.name }}\" />\n  </div>\n</section>";
// Exports
module.exports = code;

/***/ }),

/***/ "V6SG":
/*!*******************************************!*\
  !*** ./src/quiz/quiz-decks-template.html ***!
  \*******************************************/
/*! unknown exports (runtime-defined) */
/*! exports [maybe provided (runtime-defined)] [maybe used (runtime-defined)] */
/*! runtime requirements: module */
/***/ ((module) => {

// Module
var code = "<div class=\"quiz-decks\">\n  <ul class=\"strips\" data-repeat-deck=\"{{ decks }}\">\n    <li class=\"strip js-decks\" data-name=\"{{ deck.name }}\">\n      <button class=\"snap-icon-btn\">\n        <span>{{ deck.name }}</span>\n        <span>{{ deck.count }}</span>\n      </button>\n    </li>\n  </ul>\n</div>";
// Exports
module.exports = code;

/***/ }),

/***/ "L/cr":
/*!**********************************************!*\
  !*** ./src/quiz/quiz-settings-template.html ***!
  \**********************************************/
/*! unknown exports (runtime-defined) */
/*! exports [maybe provided (runtime-defined)] [maybe used (runtime-defined)] */
/*! runtime requirements: module */
/***/ ((module) => {

// Module
var code = "<div class=\"quiz-settings\">\n\n  <div class=\"landscape double-centred-block\">\n    <span>Primary test name</span>\n  </div>\n  <div class=\"landscape padding double-centred-block\">\n    <span>Language for common names</span>\n  </div>\n\n  <div class=\"names double-centred-block\">\n    <div>\n      <input type=\"radio\" id=\"latin\" name=\"names\" value=\"latin\" checked>\n      <label for=\"latin\">Latin</label>\n    </div>\n    <div>\n      <input type=\"radio\" id=\"vernacular\" name=\"names\" value=\"vernacular\">\n      <label for=\"vernacular\">Vernacular</label>\n    </div>\n  </div>\n\n  <div class=\"languages\">\n    <div>\n      <input type=\"radio\" id=\"en\" name=\"languages\" value=\"English\" checked=\"\">\n      <label for=\"en\">English</label>\n    </div>\n    <div>\n      <input type=\"radio\" id=\"fr\" name=\"languages\" value=\"Français\">\n      <label for=\"fr\">Français</label>  \n    </div>\n    <div>\n      <input type=\"radio\" id=\"de\" name=\"languages\" value=\"Deutsche\">\n      <label for=\"de\">Deutsche</label>\n    </div>\n    <div>\n      <input type=\"radio\" id=\"it\" name=\"languages\" value=\"Italiano\">\n      <label for=\"it\">Italiano</label>\n    </div>\n    <div>\n      <input type=\"radio\" id=\"es\" name=\"languages\" value=\"Español\">\n      <label for=\"es\">Español</label>\n    </div>  \n    <div>\n      <input type=\"radio\" id=\"pt\" name=\"languages\" value=\"Português\">\n      <label for=\"pt\">Português</label>\n    </div>\n  </div>  \n</div>\n";
// Exports
module.exports = code;

/***/ }),

/***/ "1yFW":
/*!****************************************!*\
  !*** ./src/quiz/quiz-state-begin.html ***!
  \****************************************/
/*! unknown exports (runtime-defined) */
/*! exports [maybe provided (runtime-defined)] [maybe used (runtime-defined)] */
/*! runtime requirements: module */
/***/ ((module) => {

// Module
var code = "<div class=\"state-container\">\n  <div class=\"standard-block double-centred-block\">\n    <span class=\"quiz-back js-quiz-back\">&#8612;</span>\n  </div>\n  <div class=\"standard-block double-centred-block score-card\">\n    <span class=\"clock\">{{ time }}</span>  \n  </div>\n  <div class=\"standard-block double-centred-block\">\n    <span class=\"score\">0/0</span>\n    <span class=\"deck-remaining\">{{ remaining }}</span>\n  </div>\n</div>";
// Exports
module.exports = code;

/***/ }),

/***/ "ZBLv":
/*!****************************************!*\
  !*** ./src/quiz/quiz-state-score.html ***!
  \****************************************/
/*! unknown exports (runtime-defined) */
/*! exports [maybe provided (runtime-defined)] [maybe used (runtime-defined)] */
/*! runtime requirements: module */
/***/ ((module) => {

// Module
var code = "<div class=\"state-container\">\n  <div class=\"standard-block double-centred-block\">\n    <span class=\"quiz-back js-quiz-back\">&#8612;</span>\n  </div>\n  <div class=\"standard-block double-centred-block score-card js-score-card\">\n    <span class=\"clock js-clock\">{{ time }}</span>  \n  </div>\n  <div class=\"standard-block double-centred-block\">\n    <span class=\"score js-deck-score\">0/0</span>\n    <span class=\"deck-remaining js-deck-remaining\">{{ remaining }}</span>\n  </div>\n</div>";
// Exports
module.exports = code;

/***/ }),

/***/ "pIAc":
/*!*********************************************!*\
  !*** ./src/quiz/quiz-summary-template.html ***!
  \*********************************************/
/*! unknown exports (runtime-defined) */
/*! exports [maybe provided (runtime-defined)] [maybe used (runtime-defined)] */
/*! runtime requirements: module */
/***/ ((module) => {

// Module
var code = "<section>\n  <div class=\"standard-block vertical-centred-block double-centred-block\">\n    <div>\n      <span class=\"padding\">Session score</span><span>{{ deckScoreHistory.correct }} / {{ deckScoreHistory.total }}</span>\n    </div>\n    <div class=\"small-text\">\n      (complete attempts only!)\n    </div>\n    <!-- <div>\n      <span class=\"padding\">Last attempt</span><span>{{ deckScore.correct }} / {{ deckScore.total }}</span>\n    </div> -->\n  </div>\n</section>";
// Exports
module.exports = code;

/***/ })

}]);
//# sourceMappingURL=src_quiz_quiz-modal_js.bundle.js.map