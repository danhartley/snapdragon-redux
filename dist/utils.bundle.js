/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/utils/utils.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/utils/utils.js":
/*!****************************!*\
  !*** ./src/utils/utils.js ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\n\nfunction _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }\n\nArray.prototype.concatAll = function () {\n  var results = [];\n\n  this.forEach(function (subArray) {\n    subArray.forEach(function (element) {\n      results.push(element);\n    });\n  });\n\n  return results;\n};\n\nvar log = function log(msg) {\n  return function (array) {\n    console.log(msg, array);\n    return array;\n  };\n};\n\nvar encodeQuery = function encodeQuery(q) {\n  if (q === undefined) return q;\n  if (Number.isInteger(q)) return q;\n  return encodeURIComponent(q.trim());\n};\n\nvar timer = function timer(sink, delay) {\n  var id = null;\n  Bacon.fromBinder(function () {\n    id = setInterval(function () {\n      sink();\n    }, delay);\n  }).onValue(function (element) {\n    console.log(element);\n  });\n  return id;\n};\n\nfunction intervalTimer(sink, delay) {\n  var timerId;\n\n  this.pause = function () {\n    window.clearInterval(timerId);\n  };\n\n  this.resume = function () {\n    window.clearInterval(timerId);\n    timerId = timer(sink, delay);\n  };\n\n  this.getId = function () {\n    return timerId;\n  };\n\n  this.resume();\n\n  return this;\n};\n\nvar shuffleArray = function shuffleArray(array) {\n\n  var currentIndex = array.length,\n      temporaryValue,\n      randomIndex;\n\n  // While there remain elements to shuffle...\n  while (0 !== currentIndex) {\n\n    // Pick a remaining element...\n    randomIndex = Math.floor(Math.random() * currentIndex);\n    currentIndex -= 1;\n\n    // And swap it with the current element.\n    temporaryValue = array[currentIndex];\n    array[currentIndex] = array[randomIndex];\n    array[randomIndex] = temporaryValue;\n  }\n\n  return [].concat(_toConsumableArray(array));\n\n  // return (arr\n  //   .map(a => [Math.random(), a])\n  //   .sort((a, b) => a[0] - b[0])\n  //   .map(a => a[1]))\n};\n\nvar randomiseSelection = function randomiseSelection(source, required) {\n  var zeroBased = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;\n\n  var r = function r(selection) {\n    var arr = shuffleArray(source);\n    selection = selection.concat(arr.map(function (item, index) {\n      if (index + selection.length < required) {\n        return zeroBased ? --item : item;\n      }\n    })).filter(function (item) {\n      return item !== undefined;\n    });\n    return selection.length < required ? r(selection) : selection;\n  };\n  return r([]);\n};\n\nvar nextItem = function nextItem(array, index) {\n  var item = array[index % array.length];\n  item.index = index % array.length;\n  return item;\n};\n\nvar insertObjectBetweenItems = function insertObjectBetweenItems(array, insert) {\n  var insertedIntoArray = array.reduce(function (acc, curr, currIndex) {\n    return acc.concat([insert, curr]);\n  }, []);\n  return insertedIntoArray;\n};\n\nvar doubledItemsInArray = function doubledItemsInArray(array) {\n  var doubledArray = array.reduce(function (acc, curr, currIndex) {\n    return acc.concat([curr, curr]);\n  }, []);\n  return doubledArray;\n};\n\nvar onlyUnique = function onlyUnique(value, index, self) {\n  return self.indexOf(value) === index;\n};\n\nvar sortBy = function sortBy(arr, prop) {\n  var dir = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'asc';\n\n  return dir === 'asc' ? arr.sort(function (a, b) {\n    return parseFloat(a[prop]) - parseFloat(b[prop]);\n  }) : arr.sort(function (a, b) {\n    return parseFloat(b[prop]) - parseFloat(a[prop]);\n  });\n};\n\nvar sortAlphabeticallyBy = function sortAlphabeticallyBy(arr, prop) {\n  arr.sort(function (a, b) {\n    if (a[prop] < b[prop]) return -1;\n    if (a[prop] > b[prop]) return 1;\n    return 0;\n  });\n  return arr;\n};\n\nvar calcItemIndex = function calcItemIndex(offSet, moduleSize, index) {\n  var itemIndex = (offSet + index) % moduleSize === 0 ? offSet : offSet + (offSet + index) % moduleSize;\n  return itemIndex;\n};\n\nvar isIterable = function isIterable(array) {\n  return Array.isArray(array) && array.length !== 0;\n};\n\nvar capitaliseFirst = function capitaliseFirst(str) {\n  return str.charAt(0).toUpperCase() + str.slice(1);\n};\n\nvar getCellValue = function getCellValue(tr, idx) {\n  return tr.children[idx].innerText || tr.children[idx].textContent;\n};\n\nvar comparer = function comparer(idx, asc) {\n  return function (a, b) {\n    return function (v1, v2) {\n      return v1 !== '' && v2 !== '' && !isNaN(v1) && !isNaN(v2) ? v1 - v2 : v1.toString().localeCompare(v2);\n    }(getCellValue(asc ? a : b, idx), getCellValue(asc ? b : a, idx));\n  };\n};\n\nvar makeSortable = function makeSortable(document) {\n  Array.from(document.querySelectorAll('th')).forEach(function (th) {\n    th.addEventListener('click', function () {\n      var table = th.closest('table');\n      var body = table.querySelector('tbody');\n      var footer = table.querySelector('tfoot');\n      Array.from(table.querySelectorAll('tr:nth-child(n+2)')).sort(comparer(Array.from(th.parentNode.children).indexOf(th), this.asc = !this.asc)).forEach(function (tr) {\n        if (tr !== footer) {\n          body.appendChild(tr);\n        }\n      });\n    });\n  });\n};\n\nvar itemCountReducer = function itemCountReducer(acc, curr) {\n  acc[curr.toString()] = acc[curr.toString()] || 0;\n  acc[curr.toString()]++;\n  return acc;\n};\n\nvar flatten = function flatten(array) {\n  var flattenedArray = array.reduce(function (accumulator, currentValue) {\n    return accumulator.concat(currentValue);\n  }, []);\n  return flattenedArray;\n};\n\nvar utils = exports.utils = {\n  log: log,\n  encodeQuery: encodeQuery,\n  timer: timer,\n  intervalTimer: intervalTimer,\n  shuffleArray: shuffleArray,\n  nextItem: nextItem,\n  randomiseSelection: randomiseSelection,\n  insertObjectBetweenItems: insertObjectBetweenItems,\n  doubledItemsInArray: doubledItemsInArray,\n  onlyUnique: onlyUnique,\n  sortBy: sortBy,\n  sortAlphabeticallyBy: sortAlphabeticallyBy,\n  calcItemIndex: calcItemIndex,\n  isIterable: isIterable,\n  capitaliseFirst: capitaliseFirst,\n  makeSortable: makeSortable,\n  itemCountReducer: itemCountReducer,\n  flatten: flatten\n};\n\n//# sourceURL=webpack:///./src/utils/utils.js?");

/***/ })

/******/ });