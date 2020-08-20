(window["webpackJsonplearn_the_planet"] = window["webpackJsonplearn_the_planet"] || []).push([["src_ui_fixtures_language_js"],{

/***/ "UAkh":
/*!*************************************!*\
  !*** ./src/ui/fixtures/language.js ***!
  \*************************************/
/*! namespace exports */
/*! export renderLanguagePicker [provided] [maybe used (runtime-defined)] [usage prevents renaming] */
/*! other exports [not provided] [maybe used (runtime-defined)] */
/*! runtime requirements: __webpack_require__, __webpack_require__.n, __webpack_require__.r, __webpack_exports__, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "renderLanguagePicker": () => /* binding */ renderLanguagePicker
/* harmony export */ });
/* harmony import */ var redux_store__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! redux/store */ "J8+u");
/* harmony import */ var ui_dom__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ui/dom */ "B+Uw");
/* harmony import */ var ui_helpers_templating__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ui/helpers/templating */ "xNSC");
/* harmony import */ var ui_screens_common_language_selection__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ui/screens/common/language-selection */ "0Zqs");
/* harmony import */ var ui_fixtures_language_template_html__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ui/fixtures/language-template.html */ "07M1");
/* harmony import */ var ui_fixtures_language_template_html__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(ui_fixtures_language_template_html__WEBPACK_IMPORTED_MODULE_4__);





var renderLanguagePicker = function renderLanguagePicker() {
  var _store$getState = redux_store__WEBPACK_IMPORTED_MODULE_0__.store.getState(),
      config = _store$getState.config;

  var parent = document.querySelector('#basicModal .js-modal-text');
  parent.innerHTML = '';
  var template = document.createElement('template');
  template.innerHTML = (ui_fixtures_language_template_html__WEBPACK_IMPORTED_MODULE_4___default());
  (0,ui_helpers_templating__WEBPACK_IMPORTED_MODULE_2__.renderTemplate)({}, template.content, parent);
  document.querySelector('#basicModal .js-modal-text-title header').innerHTML = 'Vernacular language';
  (0,ui_screens_common_language_selection__WEBPACK_IMPORTED_MODULE_3__.languagePicker)(config, document.querySelector('.js-language-selection-container'), function (config) {
    actions.boundUpdateConfig(config);
  });
};

/***/ }),

/***/ "07M1":
/*!************************************************!*\
  !*** ./src/ui/fixtures/language-template.html ***!
  \************************************************/
/*! unknown exports (runtime-defined) */
/*! exports [maybe provided (runtime-defined)] [maybe used (runtime-defined)] */
/*! runtime requirements: module */
/***/ ((module) => {

// Module
var code = "<div class=\"large-text centred-block standard-block\">Language preference</div>\n\n<div class=\"standard-block\">\n    <div>Your selection will affect the vernacular names of species only.</div>\n    <br>\n    <div>It will not apply to lessons in progress.</div>\n    <br>\n</div>\n\n<div class=\"double-standard-block js-language-selection-container\"></div>";
// Exports
module.exports = code;

/***/ })

}]);
//# sourceMappingURL=src_ui_fixtures_language_js.bundle.js.map