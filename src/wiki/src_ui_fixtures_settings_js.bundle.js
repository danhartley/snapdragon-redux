(window["webpackJsonplearn_the_planet"] = window["webpackJsonplearn_the_planet"] || []).push([["src_ui_fixtures_settings_js"],{

/***/ "PhRV":
/*!*************************************!*\
  !*** ./src/ui/fixtures/settings.js ***!
  \*************************************/
/*! namespace exports */
/*! export settingsHandler [provided] [maybe used (runtime-defined)] [usage prevents renaming] */
/*! other exports [not provided] [maybe used (runtime-defined)] */
/*! runtime requirements: __webpack_require__, __webpack_require__.n, __webpack_require__.r, __webpack_exports__, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "settingsHandler": () => /* binding */ settingsHandler
/* harmony export */ });
/* harmony import */ var ui_dom__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ui/dom */ "B+Uw");
/* harmony import */ var redux_store__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! redux/store */ "J8+u");
/* harmony import */ var redux_actions_action_creators__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! redux/actions/action-creators */ "/CNf");
/* harmony import */ var ui_helpers_templating__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ui/helpers/templating */ "xNSC");
/* harmony import */ var ui_helpers_cookie_handler__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ui/helpers/cookie-handler */ "E8uJ");
/* harmony import */ var ui_screens_common_language_selection__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ui/screens/common/language-selection */ "0Zqs");
/* harmony import */ var ui_fixtures_settings_template_html__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ui/fixtures/settings-template.html */ "tK0M");
/* harmony import */ var ui_fixtures_settings_template_html__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(ui_fixtures_settings_template_html__WEBPACK_IMPORTED_MODULE_6__);








var settingsHandler = function settingsHandler() {
  document.querySelector('#basicModal .js-modal-text').innerHTML = '';
  var template = document.createElement('template');
  template.innerHTML = (ui_fixtures_settings_template_html__WEBPACK_IMPORTED_MODULE_6___default());
  var title = document.querySelector('#basicModal .js-modal-text-title');
  title.innerHTML = '<header>Snapdragon settings</header>';

  var _store$getState = redux_store__WEBPACK_IMPORTED_MODULE_1__.store.getState(),
      config = _store$getState.config;

  var delay = config.callbackTime / 1000;
  var languages = config.languages;
  (0,ui_helpers_templating__WEBPACK_IMPORTED_MODULE_3__.renderTemplate)({
    delay: delay,
    languages: languages
  }, template.content, document.querySelector('#basicModal .js-modal-text'));
  var clearCacheBtn = document.querySelector('.js-clear-cache-btn');
  var setDelayBtn = document.querySelector('.js-set-delay-btn');
  var setDelayInput = document.querySelector('.js-set-delay-input');
  var delayTxt = document.querySelector('.js-delay-text');
  document.querySelector('#basicModal .modal-body').classList.remove('bird-song-bg');
  delayTxt.innerHTML = delay === 1 ? "The current delay is ".concat(delay, " second.") : "The current delay is ".concat(delay, " seconds.");
  clearCacheBtn.addEventListener('click', function () {
    clearCacheBtn.innerText = 'Clearing cache…';
    setTimeout(function () {
      redux_store__WEBPACK_IMPORTED_MODULE_1__.persistor.purge();
      clearCacheBtn.innerText = 'Cache cleared';
      ui_helpers_cookie_handler__WEBPACK_IMPORTED_MODULE_4__.cookieHandler.removeFirstTimeVisitorCookie();
      setTimeout(function () {
        setTimeout(function () {
          window.location.reload(true);
        }, 500);
      }, 500);
    }, 1000);
  });
  setDelayBtn.addEventListener('click', function () {
    setDelayBtn.innerHTML = 'Setting delay…';
    setTimeout(function () {
      var delay = setDelayInput.value;
      config.callbackTime = delay * 1000;
      redux_actions_action_creators__WEBPACK_IMPORTED_MODULE_2__.actions.boundUpdateConfig(config);
      setDelayBtn.innerHTML = 'Set delay';
      delayTxt.innerHTML = delay === '1' ? "Delay updated to ".concat(delay, " second.") : "Delay updated to ".concat(delay, " seconds.");
    }, 500);
  });
  (0,ui_screens_common_language_selection__WEBPACK_IMPORTED_MODULE_5__.languagePicker)(config, document.querySelector('.js-language-selection-container'), function (config) {
    redux_actions_action_creators__WEBPACK_IMPORTED_MODULE_2__.actions.boundUpdateConfig(config);
  });
};

/***/ }),

/***/ "tK0M":
/*!************************************************!*\
  !*** ./src/ui/fixtures/settings-template.html ***!
  \************************************************/
/*! unknown exports (runtime-defined) */
/*! exports [maybe provided (runtime-defined)] [maybe used (runtime-defined)] */
/*! runtime requirements: module */
/***/ ((module) => {

// Module
var code = "<div class=\"double-standard-block vertical-centred-block\">\n    <p class=\"portrait\">Clear all data (and delete your score).</p>\n    <p class=\"landscape centred-block standard-block\">Clear all data (and delete your score).</p>\n    <button class=\"btn snap-action-btn js-clear-cache-btn\">Clear all data</button>\n</div>\n\n<hr>\n\n<div class=\"half-standard-block centred-block\">Time for answer to remain visible:</div>\n<div class=\"delay-slider\">\n    <div class=\"standard-block double-centred-block\">\n        <span>0 secs</span> <input class=\"js-set-delay-input\" type=\"range\" min=\"0\" max=\"5\" value=\"{{ delay }}\"><span> 5 secs</span>\n    </div>\n    <button class=\"btn snap-action-btn js-set-delay-btn\">Set delay</button>\n    <div class=\"half-standard-block centred-block js-delay-text\"></div>\n</div>\n\n<hr class=\"portrait\">\n\n<div class=\"portrait js-language-selection-container\"></div>\n\n<hr class=\"portrait\">\n\n<div class=\"portrait email centred-block\">\n    <a target=\"_blank\" href=\"mailto:danhartleybcn@gmail.com?subject=Learn The Planet\">\n        <i class=\"fas fa-envelope\"></i>        \n    </a>\n    <span class=\"margin-left\">Contact Snapdragon</span>\n</div>\n\n<!-- <img class=\"landscape\" src=\"https://api.thegreenwebfoundation.org/greencheckimage/www.learn-the-planet.com\" alt=\"This website is hosted Green - checked by thegreenwebfoundation.org\"> -->";
// Exports
module.exports = code;

/***/ })

}]);
//# sourceMappingURL=src_ui_fixtures_settings_js.bundle.js.map