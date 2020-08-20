(window["webpackJsonplearn_the_planet"] = window["webpackJsonplearn_the_planet"] || []).push([["shared"],{

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

/***/ })

},[["EHpu"]]]);
//# sourceMappingURL=shared.bundle.js.map