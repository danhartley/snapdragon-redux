(window["webpackJsonplearn_the_planet"] = window["webpackJsonplearn_the_planet"] || []).push([["checklist"],{

/***/ "C+Vx":
/*!******************************************!*\
  !*** ./src/checklist/checklist-about.js ***!
  \******************************************/
/*! namespace exports */
/*! export about [provided] [used] [could be renamed] */
/*! other exports [not provided] [unused] */
/*! runtime requirements: __webpack_require__, __webpack_require__.n, __webpack_exports__, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "about": () => /* binding */ about
/* harmony export */ });
/* harmony import */ var checklist_templating__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! checklist/templating */ "kesI");
/* harmony import */ var checklist_checklist_api__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! checklist/checklist-api */ "Dn4O");
/* harmony import */ var checklist_checklist_about_template_html__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! checklist/checklist-about-template.html */ "fOm1");
/* harmony import */ var checklist_checklist_about_template_html__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(checklist_checklist_about_template_html__WEBPACK_IMPORTED_MODULE_2__);



var about = function about() {
  var template = document.createElement('template');
  template.innerHTML = (checklist_checklist_about_template_html__WEBPACK_IMPORTED_MODULE_2___default());
  var parent = document.querySelector('#main');
  parent.innerHTML = '';
  (0,checklist_templating__WEBPACK_IMPORTED_MODULE_0__.renderTemplate)({
    toollist: checklist_checklist_api__WEBPACK_IMPORTED_MODULE_1__.api.toollist
  }, template.content, parent);
};

/***/ }),

/***/ "Dn4O":
/*!****************************************!*\
  !*** ./src/checklist/checklist-api.js ***!
  \****************************************/
/*! namespace exports */
/*! export api [provided] [used] [could be renamed] */
/*! other exports [not provided] [unused] */
/*! runtime requirements: __webpack_require__, __webpack_exports__, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "api": () => /* binding */ api
/* harmony export */ });
/* harmony import */ var checklist_checklist_constants__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! checklist/checklist-constants */ "cp9t");

var sections = [// {
//   type: constants.PROCESS,
//   header: 'Iteration checklist',
//   steps: [
//     {
//       term: 'A working wireframe that covers major features and use cases',
//       descriptions: [`Create the simplest version of the site using few or no colours,  with intended layouts, standard padding, margins, grids, etc.
//       Treat Text as a User Interface.
//       Include all media breakpoints.        
//       Include all dependencies that will be needed whether or not they are immediately required e.g. firebase authentication.
//       The site should be semantically correct. If possible have someone familiar with using screen readers use the site.`]
//     },
//     {
//       term: 'Testing and metrics',
//       descriptions: [`Set up a Lighthouse budget and testing framework preferably on a dedicated machine.
//       Create a Lighthouse dashboard accessible to and understood by everyone.
//       Use realistic data that has been agreed by everyone. Avoid lorem ipsum.
//       Share responsibility for performance.`]
//     },
//     {
//       term: 'Design',
//       descriptions: [`Create live style guides accessible to everyone.
//       Pair programmers and designers. Use brower tools to test and demonstrate.`]
//     }
//   ]    
// },
{
  type: checklist_checklist_constants__WEBPACK_IMPORTED_MODULE_0__.constants.TOOLS,
  header: 'Tools',
  tools: [{
    name: 'Google\`s PageSpeed Insights',
    link: 'https://developers.google.com/speed/pagespeed/insights/?hl=en-GB',
    about: 'Lighthouse + Field Data.',
    title: 'page speed'
  }, {
    name: 'Lighthouse',
    link: 'https://developers.google.com/web/tools/lighthouse/',
    about: 'Automated tool for testing performance, etc.',
    checklist: [{
      name: 'Viewport',
      links: [{
        title: 'Responsive web design basics',
        link: 'https://web.dev/responsive-web-design-basics/#use-css-media-queries-for-responsiveness',
        tags: ['viewport', 'media queries', 'accessibility']
      }]
    }]
  }, {
    name: 'Google\'s Impact Calculator',
    link: 'https://www.thinkwithgoogle.com/feature/testmysite/',
    title: 'calculator',
    about: 'Enter your domain to test your mobile speed'
  }, {
    name: 'Chrome DevTools',
    link: 'https://www.google.com/chrome/',
    about: ''
  }, {
    name: 'loadCSS',
    link: 'https://github.com/filamentgroup/loadCSS/blob/master/README.md',
    about: 'Load CSS asynchronosuly'
  }, {
    name: 'Workspaces',
    link: 'https://developers.google.com/web/tools/chrome-devtools/workspaces/?utm_source=devtools',
    about: 'Save DevTool changes to file'
  }, {
    name: 'Local Overrides',
    link: 'https://developers.google.com/web/updates/2018/01/devtools#overrides',
    about: 'Have DevTool changes persist across page loads'
  }]
}, {
  type: checklist_checklist_constants__WEBPACK_IMPORTED_MODULE_0__.constants.CHECKS,
  header: 'Project checklist',
  checks: [{
    term: 'A working wireframe that covers major features and use cases',
    descriptions: ["Create the simplest version of the site using few or no colours,  with intended layouts, standard padding, margins, grids, etc.\n        Treat Text as a User Interface.\n        Include all media breakpoints.        \n        Include all dependencies that will be needed whether or not they are immediately required e.g. firebase authentication.\n        The site should be semantically correct. If possible have someone familiar with using screen readers use the site."]
  }, {
    term: 'Testing and metrics',
    descriptions: ["Set up a Lighthouse budget and testing framework preferably on a dedicated machine.\n        Create a Lighthouse dashboard accessible to and understood by everyone.\n        Use realistic data that has been agreed by everyone. Avoid lorem ipsum.\n        Share responsibility for performance."]
  }, {
    term: 'Design',
    descriptions: ["Create live style guides accessible to everyone.\n        Pair programmers and designers. Use brower tools to test and demonstrate."]
  }, {
    term: 'Intention',
    descriptions: [""]
  }, {
    term: 'Media queries',
    descriptions: ["Design the content to fit on a small screen size first, then expand the screen until a breakpoint becomes necessary."]
  }, {
    term: 'Set up tooling and testing',
    descriptions: ["Make full use of browser tooling such as Chrome DevTools.\n        Have sufficient screen space to show development tool dashboards and graphics.\n        Use a variety of web browsers.\n        Test against a range of real devices.\n        Have a staging environment that replicates the live site.\n        Test in adverse, but common, scenarios such as on a slow network, low memory, and offline."]
  }, {
    term: 'Google fonts',
    descriptions: ['Customise your request by family and variants e.g. \'Open Sans\'.', 'Default variants includes only \'regular 400\'. Combine fonts into a single request.', 'Append \'display=swap\' to request, or \'font-display: swap;\', this will allow text to load with fallback font until the Google Font is available.', 'Use DNS prefetching.', 'Use preconnect.']
  }, {
    term: 'JavaScript',
    descriptions: ['Remove unused code', 'Add the \'defer\' attribute to script tag where possible.']
  }, {
    term: 'Accessibility',
    descriptions: ['Add skip link.', 'Check for landmark elements.']
  }, {
    term: 'CSS',
    descriptions: ['Remove unused styles.', 'Copy CSS files and use loadCSS pattern to affect non-blocking request.']
  }, {
    term: 'JavaScript: PRPL',
    descriptions: ['Push (preload), Render, Pre-cache, Lazy-load'],
    link: 'https://web.dev/apply-instant-loading-with-prpl/'
  }]
}, {
  type: checklist_checklist_constants__WEBPACK_IMPORTED_MODULE_0__.constants.CHECKS,
  header: 'Feature checklist',
  checks: [{
    term: 'Set up local environment so that the new feature can be created and tested in isolation',
    descriptions: ['e.g. webpack and package configurations, index.html page, etc.']
  }, {
    term: 'Create README.md file',
    descriptions: ["List files used only during initial development and testing, and to support stand-alone deployment.\n        Include instructions on how to run the feature in isolation.\n        Mandatory sections for HTML, JavaScript and CSS naming conventions and preprocessors e.g. Sass & BME."]
  }, {
    term: 'Create tests',
    descriptions: ["Test pure functions.\n        Functions that do not (yet) have tests should be pure.\n        Create local data that can be used before live data is available, and for tests."]
  }, {
    term: 'Minimise moving parts',
    descriptions: ["Keep to a miniumum places where there is logic that is likely to change.\n        List active files (moving parts) in the READ.md.\n        Use a config file for parameters controlled outside of the feature.\n        List files that interact with the DOM, but in a local and temporary way. This code may need to be refactored."]
  }]
}, {
  type: checklist_checklist_constants__WEBPACK_IMPORTED_MODULE_0__.constants.TERMS,
  header: 'Terms',
  terms: [{
    term: 'CRP performance',
    descriptions: ['Critical Rendering Path.']
  }, {
    term: 'RUM Real user monitoring',
    descriptions: ['A passive monitoring technology that records all user interaction with a website or client interacting with a server or cloud-based application. The Navigation Timing API can be used to measure real-world CRP performance. AKA Field Data.'],
    link: 'https://developers.google.com/web/fundamentals/performance/critical-rendering-path'
  }, {
    term: 'Critical CSS',
    descriptions: ['A technique that extracts the CSS for above-the-fold content in order to render content to the user as fast as possible.'],
    link: 'https://web.dev/extract-critical-css/'
  }, {
    term: 'Bundle splitting and code splitting',
    descriptions: ['Def…'],
    link: 'https://medium.com/hackernoon/the-100-correct-way-to-split-your-chunks-with-webpack-f8a9df5b7758'
  }, {
    term: 'Tree shaking',
    descriptions: ['A form of dead code elimination.'],
    link: 'https://developers.google.com/web/fundamentals/performance/optimizing-javascript/tree-shaking'
  }, {
    term: 'Time to Interactive',
    descriptions: ['How long it takes a page to become fully interactive.'],
    link: 'https://web.dev/interactive'
  }, {
    term: 'Landmarks',
    descriptions: ['8 roles each of which represents a block of content that occurs commonly on web pages.'],
    link: 'https://www.washington.edu/accessibility/web/landmarks/'
  }, {
    term: 'RAIL',
    descriptions: ['A user-centric performance model that breaks down the user\'s experience into key actions: Response, Animation , Idle, Load'],
    more: [{
      link: 'https://developers.google.com/web/fundamentals/performance/rail#ux',
      title: 'RAIL performance'
    }, {
      link: 'https://www.udacity.com/course/website-performance-optimization--ud884',
      title: 'Udemy: Performance optimisation course'
    }]
  }, {
    term: 'Performance',
    link: 'https://developer.mozilla.org/en-US/docs/Web/API/Performance',
    descriptions: ['The Performance interface provides access to performance-related information for the current page.']
  }, {
    term: 'Critical CSS',
    link: 'https://web.dev/extract-critical-css/',
    descriptions: ['The CSS required for above-the-fold content.']
  }, {
    term: 'JAMstack',
    link: 'https://jamstack.org/',
    descriptions: ['Web development architecture based on client-side JavaScript, reusable APIs, and prebuilt Markup.']
  }, {
    term: 'JAMstack',
    link: 'https://jamstack.wtf/',
    descriptions: ['Web development architecture based on client-side JavaScript, reusable APIs, and prebuilt Markup.']
  }, {
    term: 'SSR Server side rendering',
    link: '',
    descriptions: ['']
  }, {
    term: 'ISSR Isomorphic server side rendering',
    link: '',
    descriptions: ['']
  }, {
    term: 'Topography',
    link: 'https://ia.net/topics/the-web-is-all-about-typography-period',
    descriptions: ['95% of web design is topography']
  }, {
    term: 'Ornament and Crime',
    link: 'https://en.wikipedia.org/wiki/Ornament_and_Crime',
    descriptions: ['A criticism of ornament in useful objects.']
  }]
}];
var toollist = sections.find(function (section) {
  return section.type === checklist_checklist_constants__WEBPACK_IMPORTED_MODULE_0__.constants.TOOLS;
});
var projectChecklist = sections.find(function (section) {
  return section.type === checklist_checklist_constants__WEBPACK_IMPORTED_MODULE_0__.constants.CHECKS && section.header === 'Project checklist';
});
var featureChecklist = sections.find(function (section) {
  return section.type === checklist_checklist_constants__WEBPACK_IMPORTED_MODULE_0__.constants.CHECKS && section.header === 'Feature checklist';
});
var termList = sections.find(function (section) {
  return section.type === checklist_checklist_constants__WEBPACK_IMPORTED_MODULE_0__.constants.TERMS;
}); // let processList = sections.find(section => section.type === constants.PROCESS);

toollist.tools.forEach(function (sk) {
  sk.link = sk.link || '';
  sk.about = sk.about || '';
  sk.title = sk.title || '';
});
var api = {
  sections: sections,
  toollist: toollist,
  projectChecklist: projectChecklist,
  featureChecklist: featureChecklist // processList

};

/***/ }),

/***/ "cp9t":
/*!**********************************************!*\
  !*** ./src/checklist/checklist-constants.js ***!
  \**********************************************/
/*! namespace exports */
/*! export constants [provided] [used] [could be renamed] */
/*! other exports [not provided] [unused] */
/*! runtime requirements: __webpack_exports__, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "constants": () => /* binding */ constants
/* harmony export */ });
var TOOLS = 'tools';
var CHECKS = 'checks';
var TERMS = 'terms';
var PROCESS = 'process';
var constants = {
  TOOLS: TOOLS,
  CHECKS: CHECKS,
  TERMS: TERMS,
  PROCESS: PROCESS
};

/***/ }),

/***/ "mBU2":
/*!************************************!*\
  !*** ./src/checklist/checklist.js ***!
  \************************************/
/*! namespace exports */
/*! exports [not provided] [unused] */
/*! runtime requirements: __webpack_require__, __webpack_require__.n, __webpack_require__.* */
/***/ ((__unused_webpack_module, __unused_webpack___webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony import */ var babel_polyfill__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! babel-polyfill */ "6pDI");
/* harmony import */ var babel_polyfill__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(babel_polyfill__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var checklist_style_scss__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! checklist/style.scss */ "octH");
/* harmony import */ var checklist_style_scss__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(checklist_style_scss__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var checklist_checklists__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! checklist/checklists */ "fiwX");
/* harmony import */ var checklist_checklist_tools__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! checklist/checklist.tools */ "TZGz");
/* harmony import */ var checklist_checklist_about__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! checklist/checklist-about */ "C+Vx");





var menuButtons = Array.from(document.querySelectorAll('.js-menu button'));
menuButtons.forEach(function (option) {
  option.addEventListener('click', function (e) {
    optionDefaults(e.target.id);

    switch (e.target.id) {
      case 'tools':
        (0,checklist_checklist_tools__WEBPACK_IMPORTED_MODULE_3__.toollist)();
        break;

      case 'about':
        (0,checklist_checklist_about__WEBPACK_IMPORTED_MODULE_4__.about)();
        break;

      case 'checklists':
        (0,checklist_checklists__WEBPACK_IMPORTED_MODULE_2__.checklists)();
        break;

      default:
        (0,checklist_checklists__WEBPACK_IMPORTED_MODULE_2__.checklists)();
    }
  });
});

var optionDefaults = function optionDefaults(id) {
  document.querySelector('footer button').style.display = id === 'about' ? 'none' : 'inline-block';
  document.querySelector('header h1').innerHTML = id === 'about' ? 'Daniel Hartley' : 'Checklists';
  document.querySelector('header h2').innerHTML = id === 'about' ? 'Web developer' : 'Web development';
  menuButtons.forEach(function (button) {
    return button.classList.remove('active');
  });
  document.querySelector("#".concat(id)).classList.add('active');
}; // document.querySelector('#about').focus();
// document.querySelector('#checklists').click();


(0,checklist_checklist_about__WEBPACK_IMPORTED_MODULE_4__.about)();

/***/ }),

/***/ "TZGz":
/*!******************************************!*\
  !*** ./src/checklist/checklist.tools.js ***!
  \******************************************/
/*! namespace exports */
/*! export toollist [provided] [used] [could be renamed] */
/*! other exports [not provided] [unused] */
/*! runtime requirements: __webpack_require__, __webpack_require__.n, __webpack_exports__, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "toollist": () => /* binding */ toollist
/* harmony export */ });
/* harmony import */ var checklist_templating__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! checklist/templating */ "kesI");
/* harmony import */ var checklist_checklist_api__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! checklist/checklist-api */ "Dn4O");
/* harmony import */ var checklist_checklist_tools_template_html__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! checklist/checklist-tools-template.html */ "oisN");
/* harmony import */ var checklist_checklist_tools_template_html__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(checklist_checklist_tools_template_html__WEBPACK_IMPORTED_MODULE_2__);



var toollist = function toollist() {
  var template = document.createElement('template');
  template.innerHTML = (checklist_checklist_tools_template_html__WEBPACK_IMPORTED_MODULE_2___default());
  var parent = document.querySelector('#main');
  parent.innerHTML = '';
  (0,checklist_templating__WEBPACK_IMPORTED_MODULE_0__.renderTemplate)({
    toollist: checklist_checklist_api__WEBPACK_IMPORTED_MODULE_1__.api.toollist
  }, template.content, parent);
};

/***/ }),

/***/ "fiwX":
/*!*************************************!*\
  !*** ./src/checklist/checklists.js ***!
  \*************************************/
/*! namespace exports */
/*! export checklists [provided] [used] [could be renamed] */
/*! other exports [not provided] [unused] */
/*! runtime requirements: __webpack_require__, __webpack_require__.n, __webpack_exports__, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "checklists": () => /* binding */ checklists
/* harmony export */ });
/* harmony import */ var checklist_templating__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! checklist/templating */ "kesI");
/* harmony import */ var checklist_checklist_api__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! checklist/checklist-api */ "Dn4O");
/* harmony import */ var checklist_checklists_template_html__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! checklist/checklists-template.html */ "3n5o");
/* harmony import */ var checklist_checklists_template_html__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(checklist_checklists_template_html__WEBPACK_IMPORTED_MODULE_2__);
function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }




var checklists = function checklists() {
  var template = document.createElement('template');
  template.innerHTML = (checklist_checklists_template_html__WEBPACK_IMPORTED_MODULE_2___default());
  var parent = document.querySelector('#main');
  parent.innerHTML = '';
  (0,checklist_templating__WEBPACK_IMPORTED_MODULE_0__.renderTemplate)({
    navigation: checklist_checklist_api__WEBPACK_IMPORTED_MODULE_1__.api.sections.map(function (section) {
      return section.header;
    }),
    projectChecklist: checklist_checklist_api__WEBPACK_IMPORTED_MODULE_1__.api.projectChecklist,
    featureChecklist: checklist_checklist_api__WEBPACK_IMPORTED_MODULE_1__.api.featureChecklist,
    termList: checklist_checklist_api__WEBPACK_IMPORTED_MODULE_1__.api.termList // processList: api.processList

  }, template.content, parent);
  Array.from(document.querySelectorAll('.task button:first-child')).forEach(function (task) {
    var tasksKey = 'checkedTasks';
    var currentState = localStorage.getItem(tasksKey) ? JSON.parse(localStorage.getItem(tasksKey)) : {
      keys: []
    };
    currentState.keys.forEach(function (key) {
      var span = task.querySelector('span');

      if (span && key === span.innerText) {
        task.classList.add('completed');
      }
    });
    task.addEventListener('click', function (e) {
      var state = localStorage.getItem(tasksKey) ? JSON.parse(localStorage.getItem(tasksKey)) : {
        keys: []
      };
      var taskToAdd = e.target.innerText.trim();

      if (state.keys.find(function (key) {
        return key === taskToAdd;
      })) {
        state.keys = state.keys.filter(function (key) {
          return key !== taskToAdd;
        });
      } else {
        state.keys.push(taskToAdd);
      }

      localStorage.setItem(tasksKey, JSON.stringify(state));
      toggleClass(task, 'completed');
    });
  });
  document.querySelector('.js-clear').addEventListener('click', function (e) {
    localStorage.clear();
    location.reload();
  });

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

  var hideShowMore = function hideShowMore(e) {
    var ddId = e.target.dataset.target;
    var otherDDs = Array.from(document.querySelectorAll('dd')).filter(function (dd) {
      return dd.id !== ddId;
    });
    otherDDs.forEach(function (dd) {
      return dd.classList.add('hide');
    });
    toggleClass(document.getElementById(ddId), 'hide');
  };

  var showMore = document.querySelectorAll('dt');
  showMore.forEach(function (dt) {
    return dt.addEventListener('click', hideShowMore);
  });
};

/***/ }),

/***/ "kesI":
/*!*************************************!*\
  !*** ./src/checklist/templating.js ***!
  \*************************************/
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

  ns.Context.prototype.import = function (id) {
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

/***/ "SS1E":
/*!***************************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./node_modules/sass-loader/dist/cjs.js!./src/checklist/style.scss ***!
  \***************************************************************************************************************/
/*! unknown exports (runtime-defined) */
/*! exports [maybe provided (runtime-defined)] [maybe used (runtime-defined)] */
/*! runtime requirements: __webpack_exports__, module, __webpack_require__, module.id */
/***/ ((module, exports, __webpack_require__) => {

// Imports
var ___CSS_LOADER_API_IMPORT___ = __webpack_require__(/*! ../../node_modules/css-loader/dist/runtime/api.js */ "QjQd");
exports = ___CSS_LOADER_API_IMPORT___(false);
// Module
exports.push([module.id, "h1 {\n  font-size: 2rem;\n  font-weight: normal;\n  margin: 0; }\n\nh2 {\n  font-size: 1rem;\n  letter-spacing: .1em;\n  font-weight: normal; }\n\nh3 {\n  font-size: 1rem; }\n\nbody {\n  background-color: #fafafa;\n  font-family: 'Open Sans', sans-serif;\n  margin: auto;\n  padding: 0.5rem;\n  max-width: 1000px;\n  color: #323232; }\n\nimg {\n  max-width: 100%;\n  display: block; }\n\nnav ul {\n  columns: 6 100px; }\n\nnav p span {\n  color: black;\n  background-color: #fafafa; }\n\nnav p:first-child {\n  color: black; }\n\nli {\n  margin-left: -1rem;\n  list-style-type: none; }\n  li span.goto::before {\n    margin: 0 0 0 0.25rem;\n    content: 'go to: '; }\n\na {\n  margin: 0 0.25rem;\n  text-decoration: none;\n  color: black;\n  border-bottom: 1px solid black; }\n  a:empty {\n    display: none; }\n\nheader {\n  border-bottom: 1px solid #e1e1e1; }\n\nsection {\n  padding: 0.5rem;\n  margin: 0.5rem 0; }\n\nbutton {\n  font-family: 'Open Sans', sans-serif; }\n\nhr {\n  border-style: hidden;\n  height: 1rem; }\n\ndd {\n  white-space: pre-line; }\n\nfooter button {\n  background-color: #fafafa;\n  display: inline-block;\n  border: 1px solid #6e6e6e;\n  padding: 0.25rem 0.5rem;\n  text-align: center;\n  letter-spacing: .02rem;\n  font-size: fontsizesmall;\n  text-transform: uppercase;\n  cursor: pointer;\n  width: fit-content; }\n  footer button:focus, footer button.active {\n    outline: none;\n    color: #fafafa;\n    background-color: #323232; }\n\n.flex {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  justify-content: center; }\n\n.l-reveal-container {\n  display: block !important; }\n\n.l-menu-wrapper {\n  position: relative; }\n\n.l-menu {\n  margin: 0;\n  padding: 0.25rem 0.125rem;\n  display: flex;\n  justify-content: center; }\n  .l-menu li {\n    margin: 0 0.125rem; }\n  .l-menu button {\n    background-color: #fafafa;\n    display: inline-block;\n    border: 1px solid #6e6e6e;\n    padding: 0.25rem 0.5rem;\n    text-align: center;\n    letter-spacing: .02rem;\n    font-size: fontsizesmall;\n    text-transform: uppercase;\n    cursor: pointer;\n    width: fit-content; }\n    .l-menu button:focus, .l-menu button.active {\n      outline: none;\n      color: #fafafa;\n      background-color: #323232; }\n  @media (min-width: 769px) {\n    .l-menu {\n      right: 0.5rem;\n      justify-content: initial;\n      position: absolute; } }\n\n.hide {\n  position: absolute;\n  width: 1px;\n  height: 0px;\n  padding: 0;\n  margin: -1px;\n  overflow: hidden;\n  clip: rect(0, 0, 0, 0);\n  white-space: nowrap;\n  /* added line */\n  border: 0; }\n\n.active {\n  color: red; }\n\n@media print {\n  a[href^=\"http\"]:after {\n    content: \" (\" attr(href) \")\";\n    font-size: 80%; }\n  @page {\n    margin: 20mm; }\n  .pagebreak {\n    break-after: page; }\n  .about-grid {\n    grid-template-columns: 1fr 1fr;\n    grid-template: \"main main\" \"programming programming\" \"design design\" \"left right\"; }\n  .circle {\n    display: none; }\n  .about-grid aside.left {\n    border-right: none; }\n  .about-grid aside.right {\n    border-left: none; }\n  .legacy {\n    display: none; }\n  .smaller {\n    font-size: 1rem !important; }\n  .pitch, .history, .education {\n    background-color: #fafafa;\n    color: #141414 !important; }\n    .pitch div > span, .history div > span, .education div > span {\n      font-size: 1.2em;\n      color: black; } }\n\n.checklist dt, .process dt {\n  display: grid;\n  grid-template-columns: auto 3rem;\n  cursor: pointer; }\n\n.checklist dt:nth-child(4n + 1), .process dt:nth-child(4n + 1) {\n  border-top: 1px solid #d2d2d2;\n  border-left: 1px solid #d2d2d2; }\n\n.checklist dt:nth-child(4n + 3), .process dt:nth-child(4n + 3) {\n  border-top: 1px solid #d2d2d2;\n  border-right: 1px solid #d2d2d2; }\n\n.checklist dd, .process dd {\n  padding: 0.5rem 1.5rem; }\n\n.process dt {\n  display: grid;\n  grid-template-columns: auto 3rem;\n  cursor: pointer; }\n\n.process dd {\n  margin: 0.5rem 0 1rem 0.5rem;\n  line-height: 1.8; }\n\n.task {\n  padding: 0.5rem; }\n  .task button {\n    background-color: transparent;\n    border: none;\n    font-size: 1rem;\n    cursor: pointer;\n    color: #323232;\n    text-align: left; }\n    .task button span {\n      color: #323232; }\n  .task button:first-child:before, .task button:nth-child(2):before {\n    display: inline-block;\n    border: 1px solid lightgray;\n    padding: 0.25rem 0.5rem;\n    margin-right: 0.5rem;\n    width: fit-content; }\n  .task button:first-child:before {\n    content: '\\2713';\n    color: transparent; }\n  .task button:nth-child(2):before {\n    content: '\\25bc';\n    color: #323232;\n    font-size: 1rem;\n    border: none; }\n\n.task button.completed:before {\n  color: #141414; }\n\n.skip-link {\n  position: absolute;\n  top: -40px;\n  left: 0;\n  background: #000000;\n  color: #fafafa;\n  padding: 8px;\n  z-index: 100; }\n\n.skip-link:focus {\n  top: 0; }\n\n.about-grid {\n  grid-template-columns: 1fr 1fr;\n  grid-template: \"main main\" \"programming programming\" \"design design\" \"left right\";\n  display: grid;\n  column-gap: 2rem; }\n  .about-grid main {\n    grid-area: main; }\n    .about-grid main ul {\n      font-size: 0.75rem; }\n    .about-grid main li span {\n      color: black; }\n  .about-grid .programming {\n    grid-area: programming; }\n  .about-grid .design {\n    grid-area: design; }\n  .about-grid aside {\n    display: flex;\n    margin-top: 1rem;\n    flex-direction: column;\n    gap: 0.5rem; }\n    .about-grid aside.left {\n      grid-area: left;\n      padding: 0 1rem 0 0; }\n    .about-grid aside.right {\n      grid-area: right;\n      padding: 0 0 0 1rem; }\n  .about-grid .smaller {\n    font-size: .8em; }\n  .about-grid .bigger {\n    font-size: 1.1em; }\n  .about-grid .skill {\n    margin-top: 0.5rem;\n    margin: 0.75rem 0 0.25rem 0; }\n    .about-grid .skill span {\n      font-style: italic;\n      font-size: .8em;\n      border-bottom: 1px solid #e1e1e1; }\n\n.work {\n  font-size: 1.4em;\n  color: black; }\n\n.legacy div {\n  margin: 0.25rem 0 0 0; }\n\n.pitch, .history, .education {\n  background-color: #323232;\n  color: #fafafa; }\n  .pitch div, .history div, .education div {\n    font-size: 1.1em; }\n    .pitch div span, .history div span, .education div span {\n      border-bottom: 1px dashed #fafafa; }\n  .pitch a, .history a, .education a {\n    color: #fafafa;\n    border-bottom: 1px solid #fafafa; }\n  .pitch .job, .history .job, .education .job {\n    font-style: italic; }\n  .pitch .job-link, .history .job-link, .education .job-link {\n    font-size: .8em; }\n  .pitch .indent, .history .indent, .education .indent {\n    margin: 0 0 0 0.5rem; }\n\n@media (min-width: 600px) {\n  .about-grid {\n    grid-template-columns: 1fr 4fr 1fr;\n    grid-template: \"left  main         right\" \"left  programming  right\" \"left  design       right\"; }\n  .circle {\n    display: flex;\n    align-items: center;\n    justify-content: center;\n    height: 150px;\n    margin: 20px;\n    clip-path: circle();\n    background: #e1e1e1; }\n  aside.left {\n    border-right: 1rem solid #d2d2d2; }\n  aside.right {\n    border-left: 1rem solid #d2d2d2; } }\n\n@media (min-width: 1024px) {\n  li {\n    margin-left: initial; }\n  .circle {\n    width: 150px;\n    shape-outside: circle(); }\n  #circle-left {\n    float: left; }\n  #circle-right {\n    float: right; }\n    #circle-right + ul {\n      text-align: right; }\n  #circle-left:hover, #circle-right:hover {\n    color: #fafafa;\n    background-size: contain;\n    background-image: url(\"https://media-exp1.licdn.com/dms/image/C4E03AQFAu1DpOa0Ygg/profile-displayphoto-shrink_200_200/0?e=1603324800&v=beta&t=XGmhP_mjl1oGKgU1-edbbOaPQzriUDhnrwBMyS1F_xQ\"); } }\n", ""]);
// Exports
module.exports = exports;


/***/ }),

/***/ "fOm1":
/*!*****************************************************!*\
  !*** ./src/checklist/checklist-about-template.html ***!
  \*****************************************************/
/*! unknown exports (runtime-defined) */
/*! exports [maybe provided (runtime-defined)] [maybe used (runtime-defined)] */
/*! runtime requirements: module */
/***/ ((module) => {

// Module
var code = "<section class=\"about-grid\">\n  <aside class=\"left\">\n    <div class=\"skill\">\n      <span>Expertise</span>\n    </div>\n    <div>Web apps</div>\n    <div>Site optimisation</div>\n    <div>Site accessibility</div>\n    <div>Site sustainability</div>\n    <div>PWAs</div>\n    <div class=\"skill\">\n      <span>Web Fundamentals</span>\n    </div>    \n    <div>Modern JS</div>\n    <div>CSS 3.0</div>\n    <div>HTML5</div>\n    <div class=\"skill\">\n      <span>Preferences</span>\n    </div>    \n    <div>Jamstack</div>\n    <div>Vanilla JavaScript</div>\n    <div>Typescript</div>\n    <div>Preact</div>\n    <div>Loose BDD & TDD</div>\n    <div class=\"smaller\">Functional programming</div>\n    <div>Modules</div>\n    <div>Service workers</div>\n    <div>REDUX</div>    \n    <div>Next.js</div>\n    <div>Netlify</div>\n    <div class=\"skill\">\n      <span>Development</span>\n    </div>    \n    <div>Webpack</div>\n    <div>Git | Github</div>\n    <div>Cypress, Cucumber</div>\n    <div>Jest, Enzyme</div>\n    <div>Sentry</div>\n    <div>Lighthouse</div>\n    <div>Node JS</div>\n    <div class=\"skill\">\n      <span>Libraries</span>\n    </div>\n    <div>Preact | Preact CLI</div>\n    <div>Sass</div>\n    <div>GCP | Firestore</div>    \n    <div>React | Hooks</div>\n    <div>Ramda</div>\n    <div class=\"legacy\">\n      <div class=\"skill\">\n        <span>Legacy</span>\n      </div>\n      <div>LESS</div>\n      <div>Grunt</div>\n      <div>jQuery</div>\n      <div>Materialize CSS</div>\n      <div>Bootstrap 4 & 5</div>    \n      <div>Angular</div>\n      <div class=\"smaller\">Java, C++, C#</div>\n      <div>MongoDB</div>\n      <div class=\"smaller\">Jasmine, Chai, Karma</div>\n      <div>Protractor</div>\n      <div>SQL | SQL Server</div>\n      <div>circleci</div>\n    </div>\n  </aside>\n  <main class=\"main\">\n    <p>\n      Developer with an eye for design. An easy collaborator comfortable leading a team or working alone.\n    </p>\n\n    <p>Specialist in web apps, optimisation, accessibility, sustainability, and PWAs. Quick to grasp new technologies and ideas. Reliable, diligent and responsible.</p>\n\n    <p>Full stack experience, now concentrating on front end solutions.</p>\n\n    <hr>\n\n    <section class=\"pitch\">\n      <div>\n        <span>Daniel will</span>\n      </div>\n  \n      <p>Design, implement or improve features using modern front-end technologies.</p>\n      \n      <p>Work with product managers, customer service teams, business analysts, designers, and others developers to solve problems and develop new features.</p>\n      \n      <p>Improve engineering standards, tooling and processes, and encourage others to do so.</p>\n      \n      <p>Review code, receive and offer criticism, pair program, mentor, and raise standards and skills in the team.</p>\n      \n      <div>\n        <span>Daniel has</span>\n      </div>\n      \n      <p>20+ years experience in software development.</p>\n      \n      <p>15+ years experience writing backend code (principally C# and SQL).</p>\n      \n      <p>10+ years experience writing client-side JavaScript.</p>\n      \n      <p>Expertise in building responsive layouts with native JavaScript, CSS, and HTML.</p>\n      \n      <p>Experience in building and debugging complex systems.</p>\n      \n      <p>Command of modern browser technologies, and web standards.</p>\n      \n      <p>Strong UX and design sensibilities.</p>\n      \n      <p>Experience in working on business-facing and consumer-facing products.</p>\n      \n      <p>Focus on optimising page performance, and user accessibility.</p>\n      \n      <p>A generous and supportive spirit.</p>  \n    </section>\n\n    <p>Daniel lives in Lisbon and therefore can commit only to remote roles.</p>\n\n    <p>Profile: <a target=\"_blank\" href=\"https://www.linkedin.com/in/danhartley/\">linkedin.com/in/danhartley</a></p>\n\n    <p>Mobile: <span>+351 967 256 941</span></p>\n\n    <p>Curriculum Vitae: <a href=\"https://danhartley.github.io/snapdragon-redux/wiki/\"> online</a></p>\n\n    <p>\n      Email: <span><a target=\"_blank\" href=\"mailto:danhartleybcn@gmail.com?subject=Web Developer Enquiry\">Web Developer Enquiry</a></span>\n    </p>\n\n    <section class=\"history\">\n      <div>\n        <span>Daniel is</span>\n      </div>\n\n      <p>2018-2021</p>\n\n      <p class=\"job\">ResponsibleTech.Work <span class=\"smaller\">- open-source framework developed by tech workers for tech workers</span></p>\n      \n      <p class=\"smaller\">Core contributor</p>\n\n      <p class=\"indent\">Introducing responsible practices into everyday workflows.</p>\n\n      <p class=\"job\">The Public Good <span class=\"smaller\">- personal website</span></p>\n\n      <p class=\"smaller\">Designer, Developer & Author</p>\n      \n      <p class=\"indent\">Responsible web development and climate change blog that follows best practices.</p>\n\n      <p class=\"job-link\"><a target=\"_blank\" href=\"https://www.the-public-good.com/\">https://www.the-public-good.com/.</a></p>\n      \n      <p class=\"job\">The Verb <span class=\"smaller\">- educational web app</span></p>\n\n      <p class=\"smaller\">Designer & Developer</p>\n      \n      <p class=\"indent\">Web app for testing conjugation of Portuguese and Spanish verbs.</p>\n\n      <p class=\"job-link\"><a target=\"_blank\" href=\"https://danhartley.github.io/snapdragon-verbs\">https://danhartley.github.io/snapdragon-verbs.</a></p>\n\n      <p class=\"job\">Snapdragon Retrieval <span class=\"smaller\">- educational web app</span></p>\n\n      <p class=\"smaller\">Designer & Developer</p>\n      \n      <p class=\"indent\">Tests to accompany articles and podcasts.</p>\n\n      <p class=\"job-link\"><a target=\"_blank\" href=\"https://snapdragon-retrieval.netlify.app/\">https://snapdragon-retrieval.netlify.app/.</a></p>\n      \n      <p class=\"job\">Learn the Planet <span class=\"smaller\">- educational web app</span></p>\n\n      <p class=\"smaller\">Founder and factotum</p>      \n      \n      <p class=\"indent\">Tireless in finding ways to help users appreciate, understand and learn about species, their behaviour, traits and interactions.</p>\n\n      <p class=\"job-link\"><a target=\"_blank\" href=\"https://www.learn-the-planet.com\">https://www.learn-the-planet.com.</a></p>\n\n      <div>\n        <span>Daniel was</span>\n      </div>\n\n      <p class=\"job\">Tippstr <span class=\"smaller\"></span></p>\n\n      <p>2013-2017</p>\n\n      <p class=\"smaller\">Lead front-end developer</p>\n      \n      <p class=\"indent\">Selected tools and methodologies, set up build, testing and deployment frameworks.</p>\n      <p class=\"indent\">Mentored developers.</p>\n      <p class=\"indent\">Lead several cycles of software updates.</p>\n      <p class=\"indent\">Supported Multi-LCL.</p>\n      <p class=\"indent\">Planned sprints and iterations.</p>\n      <p class=\"indent\">Reviewed code.</p>\n\n      <p class=\"job-link\">Tippstr is no longer maintained.</p>\n\n      <p class=\"job\">Seatwave <span class=\"smaller\">secondary ticket sales</span></p>\n\n      <p>2016-2012</p>\n\n      <p class=\"smaller\">Senior developer</p>\n      \n      <p class=\"indent\">Migrated app to service-based architecture.</p>\n      <p class=\"indent\">Oversaw build and deployment.</p>\n      <p class=\"indent\">Built numerous features.</p>\n      <p class=\"indent\">Collaborated on site API.</p>\n      <p class=\"indent\">Built web app version of the site.</p>\n\n      <p class=\"job-link\">Now part of Ticketmaster<a target=\"_blank\" href=\"https://www.ticketmaster.com/\">https://www.ticketmaster.com/.</a></p>\n\n      <p class=\"job\">Agencies <span class=\"smaller\">Arc Interactive, Enteraction, et al</span></p>\n\n      <p>2006-2011</p>\n\n      <p class=\"smaller\">Web developer</p>\n      \n      <p class=\"indent\">Developed multiple sites, front and back end, for clients including Malboro, Samsung, Lucazade, Mastercard and HMG.</p>\n\n      <p class=\"job\">Consultant <span class=\"smaller\">Betfair & Victor Chandler</span></p>\n\n      <p>2005</p>\n\n      <p class=\"smaller\">Web developer</p>\n      \n      <p class=\"indent\">One-off betting-related projects.</p>\n\n      <p class=\"job\">Advanced Betting Technology <span class=\"smaller\">fixed odds betting services</span></p>\n\n      <p>2002-2006</p>\n\n      <p class=\"smaller\">Team lead and product manager</p>\n      \n      <p class=\"indent\">Designed and built a suite of online applications for the creation and maintenance of a fixed odds betting book on behalf of the first independent bookmaker in Italy.</p>      \n\n      <p class=\"job\">Television production <span class=\"smaller\">BBC, ITV & Channel 4</span></p>\n\n      <p>Prior to taking an MSc in 2000 Daniel spent 7 years working in television, film and advertising production on dozens of projects and hundreds of hours of television.</p>\n    </section>    \n\n    <hr>\n\n    <div class=\"programming\">\n      <div id=\"circle-left\" class=\"circle smaller\">Programming Q&A</div>\n\n      <ul>\n        <li><span>What would you do differently on your next project?</span> Use a library that enforces immutability.</li>\n        <li><span>What are you keen to try out?</span> Jamstack and Netlify.</li>      \n        <li><span>Which design pattern has benefited you most?</span> REDUX.</li>\n        <li><span>Where can frameworks most help?</span> DOM interaction.</li>\n        <li><span>What causes you to lose time?</span> State management.</li>\n        <li><span>Do you have a mantra?</span> Learn first, hack second.</li>\n        <li><span>Which programming principle do you find most valuable?</span> Separation of concerns.</li>\n      </ul>      \n    </div>\n\n    <div>\n      <p class=\"work\">Open to offers for roles that require front end programming experience and UI design proficiency.</p>\n    </div>    \n\n    <div class=\"design\">\n      <div id=\"circle-right\" class=\"circle smaller\">Design Q&A</div>\n\n      <ul>\n        <li><span>What's your favourite design tool?</span> Pencil and paper.</li>\n        <li><span>What is your first rule of UI design?</span> Make it fast.</li>\n        <li><span>What area of design have you neglected?</span> Accessibility.</li>\n        <li><span>Is it okay to divert from pixel-perfect design?</span> Yes.</li>\n        <li><span>What motivates you to improve or rework a design?</span> Beauty. Saving other people's time.</li>\n        <li><span>How many versions of a design do you come up with?</span> Lots! Programme for change.</li>\n        <li><span>Do you enjoy working with users?</span> Yes, feedback is the best tool.</li>\n      </ul>\n      <hr>\n    </div>\n\n    <p>New ways to learn about the living world and better ways to build web sites are experimented with at <a target=\"_blank\" href=\"https://www.learn-the-planet.com\">Learn the Planet.</a></p>\n\n    <section class=\"education\">\n      <div>\n        <span>Daniel also</span>\n      </div>\n      <p>Encourages interaction and knowledge of the natural world.</p>\n      <p>Promotes sustainable ideas and practices.</p>\n      <p>Loves hiking and swimming in the sea.</p>\n      <p>Retired from playing football this year.</p>\n    </section>    \n\n    <section class=\"education\">\n      <p>MA English Literature <span class=\"smaller\">Edinburgh University</span></p>\n      <p>MSc Object Oriented Software Systems <span class=\"smaller\">City University</span></p>\n    </section>\n\n  </main>\n  <aside class=\"right\">\n    <div class=\"skill\">\n      <span>Design tools</span>\n    </div>\n    <div>Pencil & paper</div>\n    <div>Planning tools</div>\n    <div class=\"smaller\">Trello, Miro</div>\n    <div>Browser dev tools</div>\n    <div class=\"smaller\">Balsamiq, Figma, Axure</div>\n    <div class=\"skill\">\n      <span>Best practice</span>\n    </div>\n    <div class=\"smaller\">Think, sketch, walk, talk</div>\n    <div>Responsive UI</div>\n    <div class=\"smaller\">Mobile & Desktop in ||</div>\n    <div class=\"smaller\">Use cases, user-oriented</div>\n    <div class=\"smaller\">Repeatable common elements</div>\n    <div class=\"smaller\">Responsive elements</div>\n    <div class=\"smaller\">Autonomous components</div>\n    <div class=\"skill\">\n      <span>Management</span>\n    </div>\n    <div class=\"smaller\">Stand-ups</div>\n    <div class=\"smaller\">Team leadership</div>\n    <div class=\"smaller\">Project management, JIRA</div>\n    <div class=\"smaller\">Continuous review</div>\n    <div>Mentorship</div>\n    <div class=\"smaller\">Living wireframes</div>\n    <div class=\"smaller\">Code transparency</div>\n  </aside>\n</section>";
// Exports
module.exports = code;

/***/ }),

/***/ "oisN":
/*!*****************************************************!*\
  !*** ./src/checklist/checklist-tools-template.html ***!
  \*****************************************************/
/*! unknown exports (runtime-defined) */
/*! exports [maybe provided (runtime-defined)] [maybe used (runtime-defined)] */
/*! runtime requirements: module */
/***/ ((module) => {

// Module
var code = "<section class=\"toollist\">\n  <h2 id=\"{{ toollist.header }}\">{{ toollist.header }}</h2>\n  <dl data-repeat-tool=\"{{ toollist.tools }}\">\n    <dt class=\"task icon\" data-target=\"{{ tool.name }}\">\n        <button aria-label=\"Toggle whether or not {{ tool.name }} task has been completed\">\n          <span>{{ tool.name }}</span>\n        </button>\n        <button aria-label=\"Toggle visibility of {{ tool.name }} details\" data-target=\"{{ tool.name }}\"></button>\n    </dt>\n    <dd class=\"hide\" id=\"{{ tool.name }}\"><div>{{ tool.about }}</div></dd>\n  </dl>\n</section>\n  ";
// Exports
module.exports = code;

/***/ }),

/***/ "3n5o":
/*!************************************************!*\
  !*** ./src/checklist/checklists-template.html ***!
  \************************************************/
/*! unknown exports (runtime-defined) */
/*! exports [maybe provided (runtime-defined)] [maybe used (runtime-defined)] */
/*! runtime requirements: module */
/***/ ((module) => {

// Module
var code = "\n\n<!-- <section class=\"process\">\n  <h2 id=\"{{ processList.header }}\">{{ processList.header }}</h2>\n  <dl data-repeat-step=\"{{ processList.steps }}\">\n    <dt class=\"task icon\" data-target=\"{{ step.term }}\">\n        <button aria-label=\"Toggle whether or not {{ step.term }} task has been completed\">\n          <span>{{ step.term }}</span>\n        </button>\n        <button aria-label=\"Toggle visibility of {{ step.term }} details\" data-target=\"{{ step.term }}\"></button>\n    </dt>\n    <dd class=\"hide\" id=\"{{ step.term }}\" data-repeat-description=\"{{ step.descriptions }}\"><div>{{ description }}</div></dd>\n  </dl>\n</section> -->\n\n  <section class=\"checklist\">\n    <h2 id=\"{{ featureChecklist.header }}\">{{ featureChecklist.header }}</h2>\n    <dl data-repeat-check=\"{{ featureChecklist.checks }}\">\n      <dt class=\"task icon\" data-target=\"{{ check.term }}\">\n          <button aria-label=\"Toggle whether or not {{ check.term }} task has been completed\">\n            <span>{{ check.term }}</span>\n          </button>\n          <button aria-label=\"Toggle visibility of {{ check.term }} details\" data-target=\"{{ check.term }}\"></button>\n      </dt>\n      <dd class=\"hide\" id=\"{{ check.term }}\" data-repeat-description=\"{{ check.descriptions }}\"><div>{{ description }}</div></dd>\n    </dl>\n  </section>\n\n  <section class=\"checklist\">\n    <h2 id=\"{{ projectChecklist.header }}\">{{ projectChecklist.header }}</h2>\n    <dl data-repeat-check=\"{{ projectChecklist.checks }}\">\n      <dt class=\"task icon\" data-target=\"{{ check.term }}\">\n          <button aria-label=\"Toggle whether or not {{ check.term }} task has been completed\">\n            <span>{{ check.term }}</span>\n          </button>\n          <button aria-label=\"Toggle visibility of {{ check.term }} details\" data-target=\"{{ check.term }}\"></button>\n      </dt>\n      <dd class=\"hide\" id=\"{{ check.term }}\" data-repeat-description=\"{{ check.descriptions }}\"><div>{{ description }}</div></dd>\n    </dl>\n  </section>\n\n";
// Exports
module.exports = code;

/***/ }),

/***/ "octH":
/*!**********************************!*\
  !*** ./src/checklist/style.scss ***!
  \**********************************/
/*! unknown exports (runtime-defined) */
/*! exports [maybe provided (runtime-defined)] [maybe used (runtime-defined)] */
/*! runtime requirements: module, __webpack_require__, module.id */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {


var content = __webpack_require__(/*! !!../../node_modules/css-loader/dist/cjs.js!../../node_modules/sass-loader/dist/cjs.js!./style.scss */ "SS1E");

if(typeof content === 'string') content = [[module.id, content, '']];

var transform;
var insertInto;



var options = {"hmr":true}

options.transform = transform
options.insertInto = undefined;

var update = __webpack_require__(/*! !../../node_modules/style-loader/lib/addStyles.js */ "aET+")(content, options);

if(content.locals) module.exports = content.locals;

if(false) {}

/***/ }),

/***/ "9Mna":
/*!**************************************************************!*\
  !*** ./node_modules/webpack/hot sync nonrecursive ^\.\/log$ ***!
  \**************************************************************/
/*! unknown exports (runtime-defined) */
/*! exports [maybe provided (runtime-defined)] [maybe used (runtime-defined)] */
/*! runtime requirements: module, __webpack_require__.o, __webpack_require__ */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var map = {
	"./log": "+baR"
};


function webpackContext(req) {
	var id = webpackContextResolve(req);
	return __webpack_require__(id);
}
function webpackContextResolve(req) {
	if(!__webpack_require__.o(map, req)) {
		var e = new Error("Cannot find module '" + req + "'");
		e.code = 'MODULE_NOT_FOUND';
		throw e;
	}
	return map[req];
}
webpackContext.keys = function webpackContextKeys() {
	return Object.keys(map);
};
webpackContext.resolve = webpackContextResolve;
module.exports = webpackContext;
webpackContext.id = "9Mna";

/***/ })

},[["mBU2","vendors"],["OSi6","vendors"]]]);
//# sourceMappingURL=checklist.bundle.js.map