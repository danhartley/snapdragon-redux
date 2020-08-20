(window["webpackJsonplearn_the_planet"] = window["webpackJsonplearn_the_planet"] || []).push([["src_ui_quick-fire-modal_quick-fire_js"],{

/***/ "Pok+":
/*!***************************************************!*\
  !*** ./src/ui/quick-fire-modal/quick-fire-api.js ***!
  \***************************************************/
/*! namespace exports */
/*! export quickFireAPI [provided] [used] [could be renamed] */
/*! other exports [not provided] [unused] */
/*! runtime requirements: __webpack_require__, __webpack_exports__, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "quickFireAPI": () => /* binding */ quickFireAPI
/* harmony export */ });
/* harmony import */ var ramda__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ramda */ "pWpQ");
/* harmony import */ var redux_actions_action_creators__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! redux/actions/action-creators */ "/CNf");
/* harmony import */ var redux_store__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! redux/store */ "J8+u");
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





var getItems = function getItems(taxa) {
  var includeTechnicalTerms = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
  var glossary = redux_store__WEBPACK_IMPORTED_MODULE_1__.store.getState().glossary;
  var items = glossary.filter(function (definition) {
    return (0,ramda__WEBPACK_IMPORTED_MODULE_2__.default)(definition.taxon, taxa);
  });
  var selectedItems = [];
  includeTechnicalTerms ? selectedItems = items : selectedItems = items.filter(function (item) {
    return item.technical !== 'true';
  });
  return selectedItems.filter(function (item) {
    return (0,ramda__WEBPACK_IMPORTED_MODULE_2__.default)(item.taxon, taxa);
  });
};

var getBranches = function getBranches(items) {
  var branches = _toConsumableArray(new Set(items.map(function (item) {
    return item.branch;
  })));

  branches = branches.map(function (branch) {
    return {
      name: branch,
      count: items.filter(function (item) {
        return item.branch == branch;
      }).length
    };
  });
  return branches;
};

var getQuickFire = function getQuickFire(glossary, type, collection) {
  var items = collection.terms ? glossary.filter(function (definition) {
    return (0,ramda__WEBPACK_IMPORTED_MODULE_2__.default)(definition.id, collection.terms);
  }) : glossary;

  var taxa = _toConsumableArray(new Set(items.map(function (definition) {
    return definition.taxon;
  })));

  var filter = {
    iconicTaxa: taxa,
    option: {
      key: "0",
      value: "multiple choice" // depends on type???

    }
  };
  var quickFire = {
    index: 0,
    isComplete: false,
    items: items,
    count: items.length,
    filter: filter,
    type: type,
    termScore: {
      total: 0,
      correct: 0,
      incorrect: 0,
      isCorrect: null,
      isIncorrect: null,
      rounds: [],
      passes: [],
      fails: []
    },
    poolSize: items.length,
    terms: collection.terms,
    onClickFiltersLinkListeners: [],
    onClickGlossaryLinkListeners: [],
    lessonId: collection.id
  };
  quickFire.filter.taxa = filter.iconicTaxa.map(function (taxon) {
    var iconicTaxon = {
      name: taxon,
      count: items.filter(function (item) {
        return item.taxon === taxon;
      }).length
    };
    return iconicTaxon;
  });
  quickFire.filter.taxa = quickFire.filter.taxa.filter(function (taxon) {
    return taxon.count > 0;
  });
  redux_actions_action_creators__WEBPACK_IMPORTED_MODULE_0__.actions.boundCreateQuickFire(quickFire);
  return quickFire;
};

var quickFireAPI = {
  getItems: getItems,
  getBranches: getBranches,
  getQuickFire: getQuickFire
};

/***/ }),

/***/ "2cJ+":
/*!*****************************************************!*\
  !*** ./src/ui/quick-fire-modal/quick-fire-logic.js ***!
  \*****************************************************/
/*! namespace exports */
/*! export quickFireLogic [provided] [used] [could be renamed] */
/*! other exports [not provided] [unused] */
/*! runtime requirements: __webpack_require__, __webpack_exports__, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "quickFireLogic": () => /* binding */ quickFireLogic
/* harmony export */ });
/* harmony import */ var ramda__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ramda */ "CvH3");
/* harmony import */ var ramda__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ramda */ "pWpQ");
/* harmony import */ var utils_utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! utils/utils */ "EHpu");



var selectAnswers = function selectAnswers(quickFire, quickFireItems) {
  quickFire.spareItems = quickFire.spareItems || (0,ramda__WEBPACK_IMPORTED_MODULE_1__.default)(5, quickFireItems);
  quickFire.question = quickFireItems.splice(0, 1)[0];
  var items = quickFireItems.filter(function (item) {
    return item.branch === quickFire.question.branch;
  });
  var itemCount = items ? items.length : 0;
  var requiredItems = 3;

  if (itemCount <= requiredItems) {
    var itemsToAdd = (0,ramda__WEBPACK_IMPORTED_MODULE_1__.default)(requiredItems - itemCount, quickFire.spareItems.filter(function (sp) {
      return !(0,ramda__WEBPACK_IMPORTED_MODULE_2__.default)(sp.term, items.map(function (i) {
        return i.term;
      })) && sp.term !== quickFire.question.term;
    }));
    itemsToAdd.forEach(function (item) {
      return items.push(item);
    });
  }

  var answers = (0,ramda__WEBPACK_IMPORTED_MODULE_1__.default)(3, items);
  answers.push(quickFire.question);
  answers = utils_utils__WEBPACK_IMPORTED_MODULE_0__.utils.shuffleArray(answers);
  answers = answers.map(function (item, index) {
    return {
      term: item.term,
      index: index
    };
  });
  return answers;
};

var quickFireLogic = {
  selectAnswers: selectAnswers
};

/***/ }),

/***/ "buZI":
/*!**************************************************!*\
  !*** ./src/ui/quick-fire-modal/quick-fire-ui.js ***!
  \**************************************************/
/*! namespace exports */
/*! export quickFireUI [provided] [used] [could be renamed] */
/*! other exports [not provided] [unused] */
/*! runtime requirements: __webpack_require__, __webpack_exports__, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "quickFireUI": () => /* binding */ quickFireUI
/* harmony export */ });
/* harmony import */ var ramda__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ramda */ "pWpQ");
/* harmony import */ var redux_store__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! redux/store */ "J8+u");
/* harmony import */ var ui_helpers_enum_helper__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ui/helpers/enum-helper */ "DXx0");




var renderResponse = function renderResponse(isCorrect, term) {
  return isCorrect ? "<span class=\"centred-block icon\"><i class=\"fas fa-check extra-large-text correct-answer-color margin-right\"></i>That is correct.</span>" : "<span class=\"centred-block icon\"><i class=\"fas fa-times extra-large-text incorrect-answer-color margin-right\"></i>The correct answer is <span class=\"answer-response half-margin-left\">'".concat(term, "'.</span></span>");
};

var updateBranchCounts = function updateBranchCounts(quickFire, branchOptions) {
  var items = quickFire.terms ? quickFire.items.filter(function (item) {
    return (0,ramda__WEBPACK_IMPORTED_MODULE_2__.default)(item.id, quickFire.terms);
  }) : quickFire.items;
  branchOptions.forEach(function (branchBadge) {
    branchBadge.innerHTML = items.filter(function (item) {
      return item.branch === branchBadge.dataset.name;
    }).length;
  });
};

var updateTaxonCounters = function updateTaxonCounters(quickFire, taxonCounters, includeTechnicalTerms) {
  var items = quickFire.terms ? quickFire.items.filter(function (item) {
    return (0,ramda__WEBPACK_IMPORTED_MODULE_2__.default)(item.id, quickFire.terms);
  }) : quickFire.items;
  taxonCounters.forEach(function (taxonBadge) {
    taxonBadge.innerHTML = includeTechnicalTerms ? items.filter(function (item) {
      return item.taxon === taxonBadge.dataset.taxon;
    }).length : items.filter(function (item) {
      return item.taxon === taxonBadge.dataset.taxon && !item.technical;
    }).length;
  });
  return includeTechnicalTerms ? items : items.filter(function (item) {
    return !item.technical;
  });
};

var updateTotalCounts = function updateTotalCounts(quickFire, input, counters, branchCounters, taxonCounters) {
  var includeTechnicalTerms = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : false;
  updateBranchCounts(quickFire, branchCounters);
  var terms = updateTaxonCounters(quickFire, taxonCounters, includeTechnicalTerms);
  quickFire.count = terms.length;
  counters.forEach(function (counter) {
    counter.innerHTML = quickFire.count;
  });
  input.value = quickFire.count;
  quickFire.poolSize = parseInt(input.value);
};

var scoreMultipleChoice = function scoreMultipleChoice(quickFire, answer, quickFireMessage) {
  var isCorrect = answer === quickFire.question.term;
  quickFire.question.answer = answer;
  quickFire.termScore.total++;

  if (isCorrect) {
    quickFire.termScore.correct++;
    quickFire.termScore.isCorrect = true;
    quickFire.termScore.isIncorrect = false;
    quickFire.termScore.passes.push(quickFire.question);
  } else {
    quickFire.termScore.incorrect++;
    quickFire.termScore.isCorrect = false;
    quickFire.termScore.isIncorrect = true;
    quickFire.termScore.fails.push(quickFire.question);
  }

  quickFireMessage.innerHTML = renderResponse(isCorrect, quickFire.question.term.toLowerCase());
};

var scoreTextEntry = function scoreTextEntry(quickFire, quickFireInput, quickFireMessage, timer, continueQuickFireBtn) {
  if (quickFire.filter.option.key === '1') {
    var brackets = /\(.+?\)/;
    var term = quickFire.question.term;
    var acceptableAnswers = term.split(',').map(function (answer) {
      var acceptable = answer;
      acceptable = acceptable.replace(brackets, '');
      acceptable = acceptable.trim();
      acceptable = acceptable.toLowerCase();
      return acceptable;
    });
    var isCorrect = (0,ramda__WEBPACK_IMPORTED_MODULE_2__.default)(quickFireInput.value.trim().toLowerCase(), acceptableAnswers);
    quickFire.termScore.total++;

    if (isCorrect) {
      quickFire.termScore.correct++;
      quickFire.termScore.passes.push(quickFire.question);
    } else {
      quickFire.termScore.incorrect++;
      quickFire.termScore.fails.push(quickFire.question);
    }

    quickFireMessage.innerHTML = renderResponse(isCorrect, quickFire.question.term.toLowerCase());
    timer = setTimeout(function () {
      continueQuickFireBtn.click();
    }, redux_store__WEBPACK_IMPORTED_MODULE_0__.store.getState().config.callbackTime + 500);
  }

  return timer;
};

var readyTemplate = function readyTemplate(headerTemplate) {
  var template = document.createElement('template');
  template.innerHTML = headerTemplate;
  var modal = document.querySelector('#glossaryModal');
  var parent = modal.querySelector('.js-modal-text');
  parent.innerHTML = '';
  return {
    template: template,
    modal: modal,
    parent: parent
  };
};

var updateHeaders = function updateHeaders(screen, links, getQuickFire, quickFireActions) {
  var glossary = links.glossary,
      filters = links.filters,
      questions = links.questions;
  var hide = 'hide-important';
  var quickFire = getQuickFire();

  var loadGlossary = function loadGlossary(e) {
    quickFireActions.quickFireGlossary(quickFire.items);

    if (quickFire.linkFromLesson) {
      questions.classList.remove(hide);
      filters.classList.add(hide);
    } else {
      filters.classList.remove(hide);
    }
  };

  var loadFilters = function loadFilters(e) {
    quickFireActions.quickFireFilters(quickFire.linkFromLesson);
  };

  var handleGlossaryLink = function handleGlossaryLink() {
    quickFire.onClickGlossaryLinkListeners = quickFire.onClickGlossaryLinkListeners || [];

    if (quickFire.onClickGlossaryLinkListeners.length < 1) {
      glossary.addEventListener('click', loadGlossary, {
        once: true
      });
      quickFire.onClickGlossaryLinkListeners.push('filters');
    }
  };

  var handleFiltersLink = function handleFiltersLink() {
    quickFire.onClickFiltersLinkListeners = quickFire.onClickFiltersLinkListeners || [];

    if (quickFire.onClickFiltersLinkListeners.length < 1) {
      filters.addEventListener('click', loadFilters, {
        once: true
      }, true);
      quickFire.onClickFiltersLinkListeners.push('filters');
    }
  };

  switch (screen) {
    case ui_helpers_enum_helper__WEBPACK_IMPORTED_MODULE_1__.enums.quickFireStep.FILTERS:
      filters.classList.add(hide);
      glossary.classList.remove(hide);
      handleGlossaryLink();
      break;

    case ui_helpers_enum_helper__WEBPACK_IMPORTED_MODULE_1__.enums.quickFireStep.QUESTIONS:
      filters.classList.remove(hide);
      filters.innerHTML = 'Vocab filter';
      handleGlossaryLink();
      handleFiltersLink();
      break;

    case ui_helpers_enum_helper__WEBPACK_IMPORTED_MODULE_1__.enums.quickFireStep.GLOSSARY:
      filters.classList.remove(hide);
      filters.innerHTML = 'Vocab filter';
      questions.classList.add(hide);
      handleFiltersLink();
      break;
  }
};

var quickFireUI = {
  updateTotalCounts: updateTotalCounts,
  updateHeaders: updateHeaders,
  scoreMultipleChoice: scoreMultipleChoice,
  scoreTextEntry: scoreTextEntry,
  readyTemplate: readyTemplate
};

/***/ }),

/***/ "U7Pl":
/*!***********************************************!*\
  !*** ./src/ui/quick-fire-modal/quick-fire.js ***!
  \***********************************************/
/*! namespace exports */
/*! export quickFireHandlers [provided] [maybe used (runtime-defined)] [usage prevents renaming] */
/*! other exports [not provided] [maybe used (runtime-defined)] */
/*! runtime requirements: __webpack_require__, __webpack_require__.n, __webpack_require__.r, __webpack_exports__, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "quickFireHandlers": () => /* binding */ quickFireHandlers
/* harmony export */ });
/* harmony import */ var ramda__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ramda */ "kGug");
/* harmony import */ var ramda__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ramda */ "pWpQ");
/* harmony import */ var redux_store__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! redux/store */ "J8+u");
/* harmony import */ var utils_utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! utils/utils */ "EHpu");
/* harmony import */ var redux_actions_action_creators__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! redux/actions/action-creators */ "/CNf");
/* harmony import */ var redux_subscriptions__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! redux/subscriptions */ "6saE");
/* harmony import */ var api_snapdragon_iconic_taxa__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! api/snapdragon/iconic-taxa */ "Bv5j");
/* harmony import */ var ui_helpers_enum_helper__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ui/helpers/enum-helper */ "DXx0");
/* harmony import */ var ui_helpers_templating__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ui/helpers/templating */ "xNSC");
/* harmony import */ var ui_quick_fire_modal_quick_fire_api__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ui/quick-fire-modal/quick-fire-api */ "Pok+");
/* harmony import */ var ui_quick_fire_modal_quick_fire_ui__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ui/quick-fire-modal/quick-fire-ui */ "buZI");
/* harmony import */ var ui_quick_fire_modal_quick_fire_logic__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ui/quick-fire-modal/quick-fire-logic */ "2cJ+");
/* harmony import */ var ui_fixtures_glossary_template_html__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ui/fixtures/glossary-template.html */ "esqe");
/* harmony import */ var ui_fixtures_glossary_template_html__WEBPACK_IMPORTED_MODULE_10___default = /*#__PURE__*/__webpack_require__.n(ui_fixtures_glossary_template_html__WEBPACK_IMPORTED_MODULE_10__);
/* harmony import */ var ui_quick_fire_modal_quick_fire_filters_template_html__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ui/quick-fire-modal/quick-fire-filters-template.html */ "aiZC");
/* harmony import */ var ui_quick_fire_modal_quick_fire_filters_template_html__WEBPACK_IMPORTED_MODULE_11___default = /*#__PURE__*/__webpack_require__.n(ui_quick_fire_modal_quick_fire_filters_template_html__WEBPACK_IMPORTED_MODULE_11__);
/* harmony import */ var ui_quick_fire_modal_quick_fire_questions_template_html__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ui/quick-fire-modal/quick-fire-questions-template.html */ "VbJr");
/* harmony import */ var ui_quick_fire_modal_quick_fire_questions_template_html__WEBPACK_IMPORTED_MODULE_12___default = /*#__PURE__*/__webpack_require__.n(ui_quick_fire_modal_quick_fire_questions_template_html__WEBPACK_IMPORTED_MODULE_12__);
/* harmony import */ var ui_quick_fire_modal_quick_fire_summary_template_html__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ui/quick-fire-modal/quick-fire-summary-template.html */ "J3ds");
/* harmony import */ var ui_quick_fire_modal_quick_fire_summary_template_html__WEBPACK_IMPORTED_MODULE_13___default = /*#__PURE__*/__webpack_require__.n(ui_quick_fire_modal_quick_fire_summary_template_html__WEBPACK_IMPORTED_MODULE_13__);
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

















var headers = function headers(step, quickFire) {
  var getQuickFire = function getQuickFire() {
    return quickFire;
  };

  var modal = document.querySelector('#glossaryModal');
  var links = {
    glossary: modal.querySelector('.js-modal-text-title'),
    filters: modal.querySelector('.js-quick-fire-filters'),
    questions: modal.querySelector('.js-quick-fire-questions')
  };
  ui_quick_fire_modal_quick_fire_ui__WEBPACK_IMPORTED_MODULE_8__.quickFireUI.updateHeaders(step, links, getQuickFire, quickFireActions);
};

var filters = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(linkFromLesson) {
    var args, _quickFireUI$readyTem, template, modal, parent, items, type, filter, resetQuickFire, state, quickFire, options, branches, counters, branchCounters, taxonCounters, input, updateArray, getFilterTaxa, taxa, includeTechnicalTerms, getIncludeTechnicalTerms, createQuickFireBtn, quickFireOptions, branchOptions, technical, reset;

    return regeneratorRuntime.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            _context4.next = 2;
            return init();

          case 2:
            args = _context4.sent;
            _quickFireUI$readyTem = ui_quick_fire_modal_quick_fire_ui__WEBPACK_IMPORTED_MODULE_8__.quickFireUI.readyTemplate((ui_quick_fire_modal_quick_fire_filters_template_html__WEBPACK_IMPORTED_MODULE_11___default())), template = _quickFireUI$readyTem.template, modal = _quickFireUI$readyTem.modal, parent = _quickFireUI$readyTem.parent;
            headers(ui_helpers_enum_helper__WEBPACK_IMPORTED_MODULE_5__.enums.quickFireStep.FILTERS, {
              items: args.items,
              onClickFiltersLinkListeners: [],
              onClickGlossaryLinkListeners: []
            });
            items = args.items, type = args.type, filter = args.filter;

            resetQuickFire = function resetQuickFire() {
              redux_actions_action_creators__WEBPACK_IMPORTED_MODULE_2__.actions.boundUpdateQuickFire(ui_quick_fire_modal_quick_fire_api__WEBPACK_IMPORTED_MODULE_7__.quickFireAPI.getQuickFire(redux_store__WEBPACK_IMPORTED_MODULE_0__.store.getState().glossary, ui_helpers_enum_helper__WEBPACK_IMPORTED_MODULE_5__.enums.quickFireType.DEFINITION, {}));
              quickFireFilters(quickFire.linkFromLesson);
            };

            state = redux_store__WEBPACK_IMPORTED_MODULE_0__.store.getState().quickFire || ui_quick_fire_modal_quick_fire_api__WEBPACK_IMPORTED_MODULE_7__.quickFireAPI.getQuickFire(items, filter, type);
            quickFire = (0,ramda__WEBPACK_IMPORTED_MODULE_14__.default)(state);
            quickFire = quickFire.isComplete ? resetQuickFire() : quickFire;
            quickFire.linkFromLesson = linkFromLesson || false;
            quickFire.onClickFiltersLinkListeners = [];
            quickFire.onClickGlossaryLinkListeners = [];
            redux_actions_action_creators__WEBPACK_IMPORTED_MODULE_2__.actions.boundUpdateQuickFire(quickFire);
            options = [{
              key: 0,
              value: 'multiple choice'
            }, {
              key: 1,
              value: 'text entry'
            } // { key: 2, value: 'multiple choice followed by text entry' },
            // { key: 3, value: 'mixed multiple choice and text entry' },
            ];
            branches = ui_quick_fire_modal_quick_fire_api__WEBPACK_IMPORTED_MODULE_7__.quickFireAPI.getBranches(items);
            (0,ui_helpers_templating__WEBPACK_IMPORTED_MODULE_6__.renderTemplate)({
              quickFire: quickFire,
              options: options,
              branches: branches
            }, template.content, parent);
            counters = document.querySelectorAll('.js-quick-fire-count');
            branchCounters = document.querySelectorAll('.js-quick-fire-branches li input');
            taxonCounters = document.querySelectorAll('.js-quick-fire-taxa li > span');
            input = document.querySelector('.js-input-quick-fire');
            input.addEventListener('input', function (e) {
              quickFire.poolSize = parseInt(e.target.value);
            });
            setTimeout(function () {
              input.focus();
            }, 250);
            quickFire.poolSize = parseInt(input.value);

            updateArray = function updateArray(arr, elem) {
              if (arr.find(function (e) {
                return e === elem;
              })) {
                return arr.filter(function (iconicTaxon) {
                  return iconicTaxon !== elem;
                });
              } else {
                arr.push(elem);
                return arr;
              }
            };

            getFilterTaxa = function getFilterTaxa() {
              return quickFire.filter.iconicTaxa;
            };

            taxa = document.querySelectorAll('.js-quick-fire-taxa li');
            taxa.forEach(function (taxon) {
              var chkBox = taxon.querySelector('input');

              if (!(0,ramda__WEBPACK_IMPORTED_MODULE_15__.default)(taxon.dataset.name, quickFire.filter.iconicTaxa)) {
                chkBox.click();
              }

              taxon.addEventListener('change', /*#__PURE__*/function () {
                var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(e) {
                  var selectedTaxon, updatedTaxa;
                  return regeneratorRuntime.wrap(function _callee$(_context) {
                    while (1) {
                      switch (_context.prev = _context.next) {
                        case 0:
                          selectedTaxon = e.target.id;
                          updatedTaxa = updateArray(getFilterTaxa(getIncludeTechnicalTerms), selectedTaxon);
                          quickFire.filter.iconicTaxa = updatedTaxa;
                          quickFire.items = ui_quick_fire_modal_quick_fire_api__WEBPACK_IMPORTED_MODULE_7__.quickFireAPI.getItems(updatedTaxa);
                          ui_quick_fire_modal_quick_fire_ui__WEBPACK_IMPORTED_MODULE_8__.quickFireUI.updateTotalCounts(quickFire, input, counters, branchCounters, taxonCounters, getIncludeTechnicalTerms());

                        case 5:
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
            includeTechnicalTerms = quickFire.lessonId ? true : false;

            getIncludeTechnicalTerms = function getIncludeTechnicalTerms() {
              return includeTechnicalTerms;
            };

            ui_quick_fire_modal_quick_fire_ui__WEBPACK_IMPORTED_MODULE_8__.quickFireUI.updateTotalCounts(quickFire, input, counters, branchCounters, taxonCounters, getIncludeTechnicalTerms());
            createQuickFireBtn = document.querySelector('.js-create-quick-fire');
            createQuickFireBtn.innerHTML = quickFire.termScore.total === 0 ? 'Start vocab review' : 'Continue your vocab review';
            createQuickFireBtn.addEventListener('click', function (e) {
              questions(quickFire);
            }, {
              once: true
            });
            quickFireOptions = document.querySelectorAll('.js-quick-fire-filter-options button');
            quickFire.filter.option.key === "0" ? quickFireOptions[0].click() : quickFireOptions[1].click();
            quickFireOptions[parseInt(quickFire.filter.option.key)].classList.add('active');
            quickFireOptions[0].addEventListener('click', function (e) {
              e.preventDefault();

              if (!utils_utils__WEBPACK_IMPORTED_MODULE_1__.utils.hasClass(e.target, 'active')) {
                e.target.classList.add('active');
                quickFire.filter.option = {
                  key: e.target.dataset.key,
                  value: e.target.dataset.value
                };
                quickFireOptions[1].classList.remove('active');
              }
            });
            quickFireOptions[1].addEventListener('click', function (e) {
              e.preventDefault();

              if (!utils_utils__WEBPACK_IMPORTED_MODULE_1__.utils.hasClass(e.target, 'active')) {
                e.target.classList.add('active');
                quickFire.filter.option = {
                  key: e.target.dataset.key,
                  value: e.target.dataset.value
                };
                quickFireOptions[0].classList.remove('active');
              }
            });
            branchOptions = document.querySelectorAll('.js-quick-fire-branches li');

            if (quickFire.filter.branches) {
              branchOptions.forEach(function (branch) {
                if (!(0,ramda__WEBPACK_IMPORTED_MODULE_15__.default)(branch.dataset.key, quickFire.filter.branches)) {
                  branch.click();
                }
              });
            }

            branchOptions.forEach(function (branch) {
              branch.addEventListener('click', function (e) {
                setTimeout( /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
                  var checkedBranches;
                  return regeneratorRuntime.wrap(function _callee2$(_context2) {
                    while (1) {
                      switch (_context2.prev = _context2.next) {
                        case 0:
                          checkedBranches = Array.from(branchOptions).filter(function (b) {
                            return elem.hasClass(b, 'active');
                          });
                          checkedBranches = checkedBranches.map(function (b) {
                            return b.dataset.key;
                          });
                          quickFire.filter.branches = checkedBranches;
                          _context2.next = 5;
                          return ui_quick_fire_modal_quick_fire_api__WEBPACK_IMPORTED_MODULE_7__.quickFireAPI.getItems(quickFire.filter.iconicTaxa);

                        case 5:
                          quickFire.items = _context2.sent;
                          quickFire.items = quickFire.items.filter(function (item) {
                            return (0,ramda__WEBPACK_IMPORTED_MODULE_15__.default)(item.branch, checkedBranches);
                          });
                          ui_quick_fire_modal_quick_fire_ui__WEBPACK_IMPORTED_MODULE_8__.quickFireUI.updateTotalCounts(quickFire, input, counters, branchCounters, taxonCounters, getIncludeTechnicalTerms());

                        case 8:
                        case "end":
                          return _context2.stop();
                      }
                    }
                  }, _callee2, this);
                })));
              });
            });
            technical = document.querySelector('.js-quick-fire-technical');
            technical.addEventListener('change', /*#__PURE__*/function () {
              var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(e) {
                return regeneratorRuntime.wrap(function _callee3$(_context3) {
                  while (1) {
                    switch (_context3.prev = _context3.next) {
                      case 0:
                        includeTechnicalTerms = e.target.checked;
                        quickFire.filter.includeTechnicalTerms = includeTechnicalTerms;
                        _context3.t0 = quickFire.items;

                        if (_context3.t0) {
                          _context3.next = 7;
                          break;
                        }

                        _context3.next = 6;
                        return ui_quick_fire_modal_quick_fire_api__WEBPACK_IMPORTED_MODULE_7__.quickFireAPI.getItems(quickFire.filter.iconicTaxa, includeTechnicalTerms);

                      case 6:
                        _context3.t0 = _context3.sent;

                      case 7:
                        quickFire.items = _context3.t0;
                        ui_quick_fire_modal_quick_fire_ui__WEBPACK_IMPORTED_MODULE_8__.quickFireUI.updateTotalCounts(quickFire, input, counters, branchCounters, taxonCounters, getIncludeTechnicalTerms());

                      case 9:
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
            if (includeTechnicalTerms) technical.click();
            reset = document.querySelector('.js-quick-fire-reset');
            reset.addEventListener('click', function (e) {
              resetQuickFire();
            });

          case 47:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4, this);
  }));

  return function filters(_x) {
    return _ref.apply(this, arguments);
  };
}();

var questions = function questions(state) {
  var quickFire;
  if (!state) return;else quickFire = (0,ramda__WEBPACK_IMPORTED_MODULE_14__.default)(state);
  quickFire.onClickGlossaryLinkListeners = [];
  headers(ui_helpers_enum_helper__WEBPACK_IMPORTED_MODULE_5__.enums.quickFireStep.QUESTIONS, quickFire);

  var _quickFireUI$readyTem2 = ui_quick_fire_modal_quick_fire_ui__WEBPACK_IMPORTED_MODULE_8__.quickFireUI.readyTemplate((ui_quick_fire_modal_quick_fire_questions_template_html__WEBPACK_IMPORTED_MODULE_12___default())),
      template = _quickFireUI$readyTem2.template,
      modal = _quickFireUI$readyTem2.modal,
      parent = _quickFireUI$readyTem2.parent;

  var timer;

  if (quickFire.poolSize > quickFire.termScore.total) {
    var answers = ui_quick_fire_modal_quick_fire_logic__WEBPACK_IMPORTED_MODULE_9__.quickFireLogic.selectAnswers(quickFire, utils_utils__WEBPACK_IMPORTED_MODULE_1__.utils.shuffleArray(quickFire.items));
    (0,ui_helpers_templating__WEBPACK_IMPORTED_MODULE_6__.renderTemplate)({
      question: quickFire.question,
      answers: answers,
      total: quickFire.termScore.total + 1,
      count: quickFire.poolSize,
      correct: quickFire.termScore.correct,
      answered: quickFire.termScore.total
    }, template.content, parent);
    var layouts = document.querySelectorAll('.js-quick-layouts');
    layouts.forEach(function (layout) {
      layout.classList.add('hide-important');
      if (layout.id === quickFire.filter.option.key) layout.classList.remove('hide-important');
    });
    var quickFireMessage = document.querySelector('.js-quick-fire-message');
    var options = Array.from(document.querySelectorAll('.js-quick-fire-options > li'));
    options.forEach(function (option) {
      option.addEventListener('click', function (e) {
        var button = e.target;
        var term = button.querySelector('span').innerHTML;
        var answer = term;
        ui_quick_fire_modal_quick_fire_ui__WEBPACK_IMPORTED_MODULE_8__.quickFireUI.scoreMultipleChoice(quickFire, answer, quickFireMessage);
        continueQuickFireBtn.disabled = false;

        if (quickFire.termScore.isIncorrect) {
          option.classList.add('snap-alert');
        }

        options.forEach(function (option) {
          if (option.id === quickFire.question.term) {
            option.classList.add('snap-success');
          }
        });
        timer = setTimeout(function () {
          continueQuickFireBtn.click();
        }, redux_store__WEBPACK_IMPORTED_MODULE_0__.store.getState().config.callbackTime);
      }, {
        once: true
      });
    });
    setTimeout(function () {
      options[0].querySelector('button').focus();
    }, 500);
    var quickFireInputContainer = modal.querySelector('.js-quick-fire-text-entry');
    var quickFireInput = modal.querySelector('.js-quick-fire-text-entry input');

    if (quickFire.filter.option.key === '1') {
      quickFireInputContainer.classList.remove('hide-important');
      quickFireInput.focus();
    }

    var continueQuickFireBtn = document.querySelector('.js-continue-quick-fire-btn');
    continueQuickFireBtn.addEventListener('click', function (e) {
      continueQuickFireBtn.setAttribute("disabled", true);
      quickFire.items = quickFire.items.filter(function (item) {
        return item.term !== quickFire.question.term;
      });
      redux_subscriptions__WEBPACK_IMPORTED_MODULE_3__.subscription.add(quickFireQuestions, 'quickFire', 'modal');
      redux_actions_action_creators__WEBPACK_IMPORTED_MODULE_2__.actions.boundUpdateQuickFire(quickFire);
      clearTimeout(timer);
    }, {
      once: true
    });
    var check = true;
    quickFireInput.addEventListener('keydown', function (event) {
      if (event.keyCode == 9 && check) {
        check = false;
        timer = ui_quick_fire_modal_quick_fire_ui__WEBPACK_IMPORTED_MODULE_8__.quickFireUI.scoreTextEntry(quickFire, quickFireInput, quickFireMessage, timer, continueQuickFireBtn);
        continueQuickFireBtn.disabled = false;
      }
    });
    quickFireInput.addEventListener('keypress', function (event) {
      if (event.keyCode == 13 && check) {
        check = false;
        timer = ui_quick_fire_modal_quick_fire_ui__WEBPACK_IMPORTED_MODULE_8__.quickFireUI.scoreTextEntry(quickFire, quickFireInput, quickFireMessage, timer, continueQuickFireBtn);
        continueQuickFireBtn.disabled = false;
      }
    });
    quickFireInput.addEventListener('blur', function (e) {
      if (check && e.target.value.length > 2) {
        check = false;
        timer = ui_quick_fire_modal_quick_fire_ui__WEBPACK_IMPORTED_MODULE_8__.quickFireUI.scoreTextEntry(quickFire, quickFireInput, quickFireMessage, timer, continueQuickFireBtn);
        continueQuickFireBtn.disabled = false;
      }
    });

    if ((quickFire.question.term.split(' ').length > 1 || quickFire.question.term.indexOf('(') === 0) && quickFire.filter.option.key === '1') {
      var hint = modal.querySelector('.js-quick-fire-hint');
      hint.classList.remove('hide');
    }
  } else {
    summary(quickFire);
  }

  var review = modal.querySelector('.js-quick-review-progress');

  if (review) {
    review.addEventListener('click', function (e) {
      summary(quickFire);
    }, {
      once: true
    });
  }
};

var getTermsGlossary = function getTermsGlossary(glossary, terms) {
  if (!terms || terms.length === 0) return glossary;
  var definitions = [];
  terms.forEach(function (term) {
    var definition = glossary.find(function (def) {
      return def.id === term;
    });
    definitions.push(definition);
  });
  return definitions.filter(function (term) {
    return term;
  });
};

var definitions = /*#__PURE__*/function () {
  var _ref5 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5(terms) {
    var _quickFireUI$readyTem3, template, modal, parent, quickFire, glossary;

    return regeneratorRuntime.wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            _quickFireUI$readyTem3 = ui_quick_fire_modal_quick_fire_ui__WEBPACK_IMPORTED_MODULE_8__.quickFireUI.readyTemplate((ui_fixtures_glossary_template_html__WEBPACK_IMPORTED_MODULE_10___default())), template = _quickFireUI$readyTem3.template, modal = _quickFireUI$readyTem3.modal, parent = _quickFireUI$readyTem3.parent;
            quickFire = redux_store__WEBPACK_IMPORTED_MODULE_0__.store.getState().quickFire || ui_quick_fire_modal_quick_fire_api__WEBPACK_IMPORTED_MODULE_7__.quickFireAPI.getQuickFire(terms, ui_helpers_enum_helper__WEBPACK_IMPORTED_MODULE_5__.enums.quickFireType.DEFINITION, {
              collection: {}
            });
            headers(ui_helpers_enum_helper__WEBPACK_IMPORTED_MODULE_5__.enums.quickFireStep.GLOSSARY, quickFire);
            parent.innerHTML = '';
            glossary = getTermsGlossary(terms, quickFire.terms);
            (0,ui_helpers_templating__WEBPACK_IMPORTED_MODULE_6__.renderTemplate)({
              glossary: glossary
            }, template.content, parent);

          case 6:
          case "end":
            return _context5.stop();
        }
      }
    }, _callee5, this);
  }));

  return function definitions(_x4) {
    return _ref5.apply(this, arguments);
  };
}();

var init = /*#__PURE__*/function () {
  var _ref6 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee6() {
    var taxa, iconicTaxaKeys, _store$getState, quickFire, items, args;

    return regeneratorRuntime.wrap(function _callee6$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            taxa = [];
            iconicTaxaKeys = Object.keys(api_snapdragon_iconic_taxa__WEBPACK_IMPORTED_MODULE_4__.iconicTaxa).map(function (key) {
              return key.toLowerCase();
            });
            iconicTaxaKeys.push('common');
            iconicTaxaKeys.forEach(function (taxon) {
              taxa.push(taxon);
            });
            _store$getState = redux_store__WEBPACK_IMPORTED_MODULE_0__.store.getState(), quickFire = _store$getState.quickFire;
            _context6.t0 = quickFire.items;

            if (_context6.t0) {
              _context6.next = 10;
              break;
            }

            _context6.next = 9;
            return ui_quick_fire_modal_quick_fire_api__WEBPACK_IMPORTED_MODULE_7__.quickFireAPI.getItems(taxa);

          case 9:
            _context6.t0 = _context6.sent;

          case 10:
            items = _context6.t0;
            args = {
              items: items,
              type: ui_helpers_enum_helper__WEBPACK_IMPORTED_MODULE_5__.enums.quickFireType.DEFINITION,
              filter: {
                iconicTaxa: taxa
              }
            };
            return _context6.abrupt("return", args);

          case 13:
          case "end":
            return _context6.stop();
        }
      }
    }, _callee6, this);
  }));

  return function init() {
    return _ref6.apply(this, arguments);
  };
}();

var summary = function summary(quickFire) {
  var _quickFireUI$readyTem4 = ui_quick_fire_modal_quick_fire_ui__WEBPACK_IMPORTED_MODULE_8__.quickFireUI.readyTemplate((ui_quick_fire_modal_quick_fire_summary_template_html__WEBPACK_IMPORTED_MODULE_13___default())),
      template = _quickFireUI$readyTem4.template,
      modal = _quickFireUI$readyTem4.modal,
      parent = _quickFireUI$readyTem4.parent;

  var passes = quickFire.termScore.passes;
  passes.forEach(function (pass, i) {
    pass.index = i;
    pass.wiki = pass.wiki || '';
    pass.showWikiClass = pass.wiki.length > 0 ? '' : 'hide-important';
  });
  var fails = quickFire.termScore.fails;
  fails.forEach(function (fail, i) {
    fail.index = i;
    fail.wiki = fail.wiki || '';
    fail.showWikiClass = fail.wiki.length > 0 ? '' : 'hide-important';
  });
  (0,ui_helpers_templating__WEBPACK_IMPORTED_MODULE_6__.renderTemplate)({
    score: quickFire.termScore,
    passes: passes,
    fails: fails
  }, template.content, parent);
  var answers = modal.querySelectorAll('.js-quick-review-answers');
  var tabs = modal.querySelectorAll('.js-quick-review-tabs a');
  tabs.forEach(function (tab) {
    tab.addEventListener('click', function (e) {
      var type = e.target.id;
      answers.forEach(function (t) {
        t.dataset.type === type ? t.classList.remove('hide-important') : t.classList.add('hide-important');
      });
    });
  });
  var summaryText = modal.querySelector('.js-quick-fire-summary div:nth-child(1) > span');
  var scoreSummary = modal.querySelector('.js-score-text-summary');
  var continueReview = modal.querySelector('.js-quick-review-continue-review');
  quickFire.isComplete = quickFire.poolSize === quickFire.termScore.total;

  if (quickFire.isComplete) {
    summaryText.innerHTML = '<span class="emphasis">You have answered all of the questions correctly.</span>';
    scoreSummary.classList.add('modal-background-relief-emphasis');
    scoreSummary.innerHTML = "You scored ".concat(quickFire.termScore.correct, " out of ").concat(quickFire.termScore.total, ".");

    if (quickFire.termScore.incorrect > 0) {
      summaryText.innerHTML = "<span class=\"emphasis\">You've answered the questions, but not all correctly.</span>";
      continueReview.innerHTML = "<span>Continue</span>";
      continueReview.addEventListener('click', function (e) {
        var quickFireRevision = ui_quick_fire_modal_quick_fire_api__WEBPACK_IMPORTED_MODULE_7__.quickFireAPI.getQuickFire(quickFire.termScore.fails, ui_helpers_enum_helper__WEBPACK_IMPORTED_MODULE_5__.enums.quickFireType.DEFINITION, {});
        quickFireQuestions(quickFireRevision);
      }, {
        once: true
      });
    } else {
      continueReview.classList.add('hide-important');
      continueReview.addEventListener('click', function (e) {
        questions(quickFire);
      }, {
        once: true
      });
    }
  } else {
    summaryText.innerHTML = "<span>You have answered ".concat(quickFire.termScore.total, " of ").concat(quickFire.poolSize, " questions.</span>");
    continueReview.addEventListener('click', function (e) {
      questions(quickFire);
    }, {
      once: true
    });
  }
};

var quickFireHandlers = {
  filters: filters,
  questions: questions,
  headers: headers,
  init: ui_quick_fire_modal_quick_fire_api__WEBPACK_IMPORTED_MODULE_7__.quickFireAPI.getQuickFire,
  definitions: definitions
};

var quickFireFilters = function quickFireFilters(linkFromLesson) {
  quickFireHandlers.filters(linkFromLesson);
};

var quickFireQuestions = function quickFireQuestions(quickFire) {
  quickFireHandlers.questions(quickFire);
};

var quickFireGlossary = function quickFireGlossary(glossary) {
  quickFireHandlers.definitions(glossary);
};

var quickFireActions = {
  quickFireFilters: quickFireFilters,
  quickFireQuestions: quickFireQuestions,
  quickFireGlossary: quickFireGlossary
};

/***/ }),

/***/ "esqe":
/*!************************************************!*\
  !*** ./src/ui/fixtures/glossary-template.html ***!
  \************************************************/
/*! unknown exports (runtime-defined) */
/*! exports [maybe provided (runtime-defined)] [maybe used (runtime-defined)] */
/*! runtime requirements: module */
/***/ ((module) => {

// Module
var code = "<div class=\"snapdragon-container\">\n    <dl data-repeat-item=\"{{ glossary }}\" class=\"definition card scrollable\">\n      <dt>{{ item.term }}</dt><dd>{{ item.definition }}</dd>\n    </dl>\n</div>\n    ";
// Exports
module.exports = code;

/***/ }),

/***/ "aiZC":
/*!******************************************************************!*\
  !*** ./src/ui/quick-fire-modal/quick-fire-filters-template.html ***!
  \******************************************************************/
/*! unknown exports (runtime-defined) */
/*! exports [maybe provided (runtime-defined)] [maybe used (runtime-defined)] */
/*! runtime requirements: module */
/***/ ((module) => {

// Module
var code = "<div class=\"quick-fire\">\n    \n    <div class=\"margin-left centred-block standard-block padding-top\">\n        Answer <input min=\"1\" max=\"{{ quickFire.count }}\" required class=\"big half-margin-left half-margin-right js-input-quick-fire\" type=\"number\" value=\"{{ quickFire.count }}\">\n        <span class=\"landscape\">questions selected at random from <span class=\"js-quick-fire-count\">{{ quickFire.count }}</span> terms.</span>\n        <span class=\"portrait\">from <span class=\"js-quick-fire-count\">{{ quickFire.count }}</span> terms.</span>\n    </div>\n\n    <div class=\"landscape half-standard-block\"></div>\n    <div class=\"portrait padding\"></div>\n\n    <ul class=\"margin-left quick-fire-taxa list-group js-quick-fire-taxa\" data-repeat-taxon=\"{{ quickFire.filter.taxa }}\">\n      <li class=\"list-group-item fit-width margin-right\">\n        <input id=\"{{ taxon.name }}\" class=\"form-check-input mr-1\" type=\"checkbox\" value=\"\" aria-label=\"...\">\n        {{ taxon.name }}<span data-taxon=\"{{ taxon.name }}\" class=\"\">{{ taxon.count }}</span>\n      </li>\n    </ul>\n\n    <div class=\"landscape half-standard-block\"></div>\n    <div class=\"portrait padding\"></div>\n\n    <ul class=\"margin-left list-group quick-fire-branches js-quick-fire-branches\" data-toggle=\"buttons\" data-repeat-branch=\"{{ branches }}\">\n      <li class=\"list-group-item fit-width margin-right\" data-key=\"{{ branch.name }}\" data-value=\"{{ branch.name }}\">\n        <input class=\"form-check-input mr-1\" type=\"checkbox\" value=\"\" aria-label=\"{{ branch.name }}\" checked>\n        {{ branch.name }}<span data-name=\"{{ branch.name }}\">{{ branch.count }}</span>\n      </li>\n    </ul>\n\n    <div class=\"landscape half-standard-block\"></div>\n    <div class=\"portrait half-padding\"></div>\n\n    <div role=\"group\" class=\"btn-group margin-left quick-fire-options margin-bottom js-quick-fire-filter-options\" data-toggle=\"buttons\" data-repeat-option=\"{{ options }}\" arai-lable=\"Vocab question type: multiple choice or text entry\">\n        <button id=\"{{ option.key }}\" type=\"button\" data-key=\"{{ option.key }}\" class=\"btn btn-secondary margin-right\" data-value=\"{{ option.value }}\">\n          {{ option.value }}\n        </button>\n    </div>\n\n    <div class=\"landscape half-standard-block\"></div>\n\n    <div class=\"low-relief-block standard-block centred-block horizontal-evenly-spaced-block\">\n        <div class=\"centred-block fit-width\">\n            <input type=\"checkbox\" class=\"js-quick-fire-technical half-margin-right\" id=\"technical\">\n            <label for=\"technical\">Include technical</label>\n        </div>\n        <div>\n            <div class=\"btn snap-action-btn js-quick-fire-reset\">Reset filters</div>\n        </div>\n    </div>\n\n    <div class=\"centred-block absolute-bottom\">\n        <button class=\"btn snap-action-btn js-create-quick-fire\">Start quick-fire review</button>\n    </div>\n\n</div>";
// Exports
module.exports = code;

/***/ }),

/***/ "VbJr":
/*!********************************************************************!*\
  !*** ./src/ui/quick-fire-modal/quick-fire-questions-template.html ***!
  \********************************************************************/
/*! unknown exports (runtime-defined) */
/*! exports [maybe provided (runtime-defined)] [maybe used (runtime-defined)] */
/*! runtime requirements: module */
/***/ ((module) => {

// Module
var code = "<div class=\"quick-fire\">\n\n    <div class=\"margin-left centred-block standard-block justify-space-between\">\n        <h2>\n            <span>Question {{ total }} of {{ count }}</span>\n        </h2>\n        <div class=\"margin-right\">\n            <button class=\"btn snap-btn small-text js-quick-review-progress\">Progress</button>\n        </div>\n    </div>\n\n    <div class=\"double-centred-block double-standard-block modal-background-relief border-light js-quick-fire-definition\">\n        <span class=\"padding\">{{ question.definition }}</span>\n    </div>\n\n    <ul id=\"0\" class=\"strips description margin-top js-quick-layouts js-quick-fire-options\" data-repeat-answer=\"{{ answers }}\">\n        <li class=\"strip\" id=\"{{ answer.term }}\" role=\"group\" aria-label=\"answers to the question\">\n            <button class=\"snap-icon-btn\" data-answer-index=\"{{ answer.index }}\">\n                <span>{{ answer.term }}</span>\n            </button>\n          </li>\n      </ul>\n\n    <div id=\"1\" class=\"hide vertical-block centred-block margin-top js-quick-layouts quick-fire-text-entry js-quick-fire-text-entry\">\n        <div class=\"centred-block standard-block\">\n            <input type=\"text\" placeholder=\"Enter the term that fits this description\">\n        </div>\n        <div class=\"half-standard-block\">\n            <div class=\"hide centered-block js-quick-fire-hint\">\n                <span class=\"margin-left latin\">Hint: </span><span>The answer has two words.</span>\n            </div>\n        </div>\n        \n    </div>\n\n    <div class=\"vertical-centred-block centred-block absolute-bottom\">\n\n      <div class=\"margin-left centred-block standard-block js-quick-fire-message\"></div>\n\n      <div class=\"half-standard-block\">\n          Score {{ correct }} of {{ answered }}\n      </div>  \n\n      <div class=\"action-update\">\n          <button disabled class=\"btn snap-action-btn js-continue-quick-fire-btn\">Continue lesson</button>\n      </div>\n    </div>\n\n</div>";
// Exports
module.exports = code;

/***/ }),

/***/ "J3ds":
/*!******************************************************************!*\
  !*** ./src/ui/quick-fire-modal/quick-fire-summary-template.html ***!
  \******************************************************************/
/*! unknown exports (runtime-defined) */
/*! exports [maybe provided (runtime-defined)] [maybe used (runtime-defined)] */
/*! runtime requirements: module */
/***/ ((module) => {

// Module
var code = "<div class=\"quick-fire\">\n\n    <div class=\"justify-space-between centred-block margin-left standard-block js-quick-fire-summary\">\n        <div>\n            <span>You have answered all of the questions.</span>\n        </div>\n        <div class=\"margin-right padding-left nowrap\">\n          <button class=\"btn snap-btn small-text js-quick-review-continue-review\">Vocab</button>\n        </div>\n    </div>\n\n    <div class=\"border-light standard-block padding-left centred-block modal-background-relief js-score-text-summary\">\n        You have scored {{ score.correct }} out of {{ score.total }} so far.\n    </div>\n\n    <ul class=\"margin-top nav nav-pills nav-fill quick-review-tabs js-quick-review-tabs mb-3\" role=\"tablist\">\n        <li class=\"nav-item\">\n            <a class=\"nav-link\" href=\"#\" id=\"js-quick-review-correct\" data-toggle=\"pill\" role=\"tab\">\n                <span class=\"landscape\">Correct answers</span>\n                <span class=\"portrait\">Correct</span>\n            </a>\n        </li>\n        <li class=\"nav-item\">\n            <a class=\"nav-link active\" href=\"#\" id=\"js-quick-review-incorrect\" data-toggle=\"pill\" role=\"tab\">\n                <span class=\"landscape\">Incorrect answers</span>\n                <span class=\"portrait\">Incorrect</span>\n            </a>\n        </li>\n      </ul>\n\n    <div class=\"scrollable accordions-container\">\n\n        <div id=\"accordion-correct\" data-type=\"js-quick-review-correct\" class=\"hide-important quick-review-answers js-quick-review-answers\" data-repeat-pass=\"{{ passes }}\">\n            <div class=\"card quick-fire-summary-row margin-bottom\">\n                <div class=\"card-header capitalise\" id=\"pass_header_{{ pass.index }}\">\n                <button type=\"button\" class=\"btn snap-icon-btn\" data-toggle=\"collapse\" data-target=\"#pass_target_{{ pass.index }}\" aria-expanded=\"false\" aria-controls=\"pass_target_{{ pass.index }}\">\n                    <div>{{ pass.term }}</div>                    \n                </button>\n                </div>\n            </div>\n            <div id=\"pass_target_{{ pass.index }}\" class=\"collapse\" aria-labelledby=\"pass_header_{{ pass.index }}\" data-parent=\"#accordion-correct\">\n                <div class=\"card-body\">\n                    <div>{{ pass.definition }}</div>\n                    <div class=\"centred-block half-standard-block\">\n                      <span class=\"sr-only\">Opens in new window</span>\n                      <a class=\"small-text underline-link {{ pass.showWikiClass }}\" href=\"{{ pass.wiki }}\" target=\"_blank\">\n                        <span class=\"sr-only\">Opens in new window</span>\n                        <span>View Wikipedia page for {{ pass.term }} in a new window</span>\n                        <i aria-hidden=\"true\" class=\"super fas fa-external-link-alt\"></i>\n                      </a>                      \n                    </div>\n                </div>\n            </div>\n        </div>\n\n        <div id=\"accordion-incorrect\" data-type=\"js-quick-review-incorrect\" class=\"quick-review-answers js-quick-review-answers\" data-repeat-fail=\"{{ fails }}\">\n            <div class=\"card quick-fire-summary-row margin-bottom\">\n                <div class=\"card-header capitalise\" id=\"fail_header_{{ fail.index }}\">\n                <button type=\"button\" class=\"btn snap-icon-btn\" data-toggle=\"collapse\" data-target=\"#fail_target_{{ fail.index }}\" aria-expanded=\"false\" aria-controls=\"fail_target_{{ fail.index }}\">\n                    <div>{{ fail.term }}</div>\n                </button>\n                </div>\n            </div>\n            <div id=\"fail_target_{{ fail.index }}\" class=\"collapse\" aria-labelledby=\"fail_header_{{ fail.index }}\" data-parent=\"#accordion-incorrect\">\n                <div class=\"card-body\">\n                    <div>{{ fail.definition }}</div>\n                    <div class=\"centred-block half-standard-block\">\n                      <a class=\"small-text underline-link {{ fail.showWikiClass }}\" href=\"{{ fail.wiki }}\" target=\"_blank\">\n                        <span class=\"sr-only\">Opens in new window</span>\n                        <span>View Wikipedia page for {{ fail.term }} in a new window</span>\n                        <i aria-hidden=\"true\" class=\"super fas fa-external-link-alt\"></i>\n                      </a>\n                    </div>\n                    <div class=\"small-text margin-top\"><span>You answered: </span><span>{{ fail.answer }}</span></div>\n                </div>\n            </div>\n        </div>\n\n    </div>\n</div>";
// Exports
module.exports = code;

/***/ })

}]);
//# sourceMappingURL=src_ui_quick-fire-modal_quick-fire_js.bundle.js.map