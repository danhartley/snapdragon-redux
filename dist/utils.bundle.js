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


Object.defineProperty(exports, "__esModule", {
  value: true
});

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

Array.prototype.concatAll = function () {
  var results = [];

  this.forEach(function (subArray) {
    subArray.forEach(function (element) {
      results.push(element);
    });
  });

  return results;
};

var log = function log(msg) {
  return function (array) {
    console.log(msg, array);
    return array;
  };
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
  }).onValue(function (element) {
    console.log(element);
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
};

var shuffleArray = function shuffleArray(array) {

  if (!array) return;

  var currentIndex = array.length,
      temporaryValue,
      randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return [].concat(_toConsumableArray(array));

  // return (arr
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

var nextItem = function nextItem(array, index) {
  var item = array[index % array.length];
  item.index = index % array.length;
  return item;
};

var insertObjectBetweenItems = function insertObjectBetweenItems(array, insert) {
  var insertedIntoArray = array.reduce(function (acc, curr, currIndex) {
    return acc.concat([insert, curr]);
  }, []);
  return insertedIntoArray;
};

var doubledItemsInArray = function doubledItemsInArray(array) {
  var doubledArray = array.reduce(function (acc, curr, currIndex) {
    return acc.concat([curr, curr]);
  }, []);
  return doubledArray;
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

var isIterable = function isIterable(array) {
  return Array.isArray(array) && array.length !== 0;
};

var capitaliseFirst = function capitaliseFirst(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
};

var capitaliseAll = function capitaliseAll(str) {
  return str.replace(/\w\S*/g, function (txt) {
    return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
  });
};

var getCellValue = function getCellValue(tr, idx) {
  return tr.children[idx].innerText || tr.children[idx].textContent;
};

var comparer = function comparer(idx, asc) {
  return function (a, b) {
    return function (v1, v2) {
      return v1 !== '' && v2 !== '' && !isNaN(v1) && !isNaN(v2) ? v1 - v2 : v1.toString().localeCompare(v2);
    }(getCellValue(asc ? a : b, idx), getCellValue(asc ? b : a, idx));
  };
};

var makeSortable = function makeSortable(document) {
  Array.from(document.querySelectorAll('th > span:nth-child(1)')).forEach(function (sp) {
    sp.addEventListener('click', function () {
      var th = this.parentElement;
      var table = th.closest('table');
      var body = table.querySelector('tbody');
      var footer = table.querySelector('tfoot');
      Array.from(table.querySelectorAll('tr:nth-child(n+2)')).sort(comparer(Array.from(th.parentNode.children).indexOf(th), this.asc = !this.asc)).forEach(function (tr) {
        if (tr !== footer) {
          body.appendChild(tr);
        }
      });
    });
  });
};

var itemCountReducer = function itemCountReducer(acc, curr) {
  acc[curr.toString()] = acc[curr.toString()] || 0;
  acc[curr.toString()]++;
  return acc;
};

var flatten = function flatten(array) {
  var flattenedArray = array.reduce(function (accumulator, currentValue) {
    return accumulator.concat(currentValue);
  }, []);
  return flattenedArray;
};

var utils = exports.utils = {
  log: log,
  encodeQuery: encodeQuery,
  timer: timer,
  intervalTimer: intervalTimer,
  shuffleArray: shuffleArray,
  nextItem: nextItem,
  randomiseSelection: randomiseSelection,
  insertObjectBetweenItems: insertObjectBetweenItems,
  doubledItemsInArray: doubledItemsInArray,
  onlyUnique: onlyUnique,
  sortBy: sortBy,
  sortAlphabeticallyBy: sortAlphabeticallyBy,
  calcItemIndex: calcItemIndex,
  isIterable: isIterable,
  capitaliseFirst: capitaliseFirst,
  capitaliseAll: capitaliseAll,
  makeSortable: makeSortable,
  itemCountReducer: itemCountReducer,
  flatten: flatten
};
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy91dGlscy91dGlscy5qcyJdLCJuYW1lcyI6WyJBcnJheSIsInByb3RvdHlwZSIsImNvbmNhdEFsbCIsInJlc3VsdHMiLCJmb3JFYWNoIiwic3ViQXJyYXkiLCJlbGVtZW50IiwicHVzaCIsImxvZyIsImNvbnNvbGUiLCJtc2ciLCJhcnJheSIsImVuY29kZVF1ZXJ5IiwicSIsInVuZGVmaW5lZCIsIk51bWJlciIsImlzSW50ZWdlciIsImVuY29kZVVSSUNvbXBvbmVudCIsInRyaW0iLCJ0aW1lciIsInNpbmsiLCJkZWxheSIsImlkIiwiQmFjb24iLCJmcm9tQmluZGVyIiwic2V0SW50ZXJ2YWwiLCJvblZhbHVlIiwiaW50ZXJ2YWxUaW1lciIsInRpbWVySWQiLCJwYXVzZSIsIndpbmRvdyIsImNsZWFySW50ZXJ2YWwiLCJyZXN1bWUiLCJnZXRJZCIsInNodWZmbGVBcnJheSIsImN1cnJlbnRJbmRleCIsImxlbmd0aCIsInRlbXBvcmFyeVZhbHVlIiwicmFuZG9tSW5kZXgiLCJNYXRoIiwiZmxvb3IiLCJyYW5kb20iLCJyYW5kb21pc2VTZWxlY3Rpb24iLCJzb3VyY2UiLCJyZXF1aXJlZCIsInplcm9CYXNlZCIsInIiLCJhcnIiLCJzZWxlY3Rpb24iLCJjb25jYXQiLCJtYXAiLCJpdGVtIiwiaW5kZXgiLCJmaWx0ZXIiLCJuZXh0SXRlbSIsImluc2VydE9iamVjdEJldHdlZW5JdGVtcyIsImluc2VydCIsImluc2VydGVkSW50b0FycmF5IiwicmVkdWNlIiwiYWNjIiwiY3VyciIsImN1cnJJbmRleCIsImRvdWJsZWRJdGVtc0luQXJyYXkiLCJkb3VibGVkQXJyYXkiLCJvbmx5VW5pcXVlIiwidmFsdWUiLCJzZWxmIiwiaW5kZXhPZiIsInNvcnRCeSIsInByb3AiLCJkaXIiLCJzb3J0IiwiYSIsImIiLCJwYXJzZUZsb2F0Iiwic29ydEFscGhhYmV0aWNhbGx5QnkiLCJjYWxjSXRlbUluZGV4Iiwib2ZmU2V0IiwibW9kdWxlU2l6ZSIsIml0ZW1JbmRleCIsImlzSXRlcmFibGUiLCJpc0FycmF5IiwiY2FwaXRhbGlzZUZpcnN0Iiwic3RyIiwiY2hhckF0IiwidG9VcHBlckNhc2UiLCJzbGljZSIsImNhcGl0YWxpc2VBbGwiLCJyZXBsYWNlIiwidHh0Iiwic3Vic3RyIiwidG9Mb3dlckNhc2UiLCJnZXRDZWxsVmFsdWUiLCJ0ciIsImlkeCIsImNoaWxkcmVuIiwiaW5uZXJUZXh0IiwidGV4dENvbnRlbnQiLCJjb21wYXJlciIsImFzYyIsInYxIiwidjIiLCJpc05hTiIsInRvU3RyaW5nIiwibG9jYWxlQ29tcGFyZSIsIm1ha2VTb3J0YWJsZSIsImZyb20iLCJkb2N1bWVudCIsInF1ZXJ5U2VsZWN0b3JBbGwiLCJzcCIsImFkZEV2ZW50TGlzdGVuZXIiLCJ0aCIsInBhcmVudEVsZW1lbnQiLCJ0YWJsZSIsImNsb3Nlc3QiLCJib2R5IiwicXVlcnlTZWxlY3RvciIsImZvb3RlciIsInBhcmVudE5vZGUiLCJhcHBlbmRDaGlsZCIsIml0ZW1Db3VudFJlZHVjZXIiLCJmbGF0dGVuIiwiZmxhdHRlbmVkQXJyYXkiLCJhY2N1bXVsYXRvciIsImN1cnJlbnRWYWx1ZSIsInV0aWxzIl0sIm1hcHBpbmdzIjoiOzs7Ozs7OztBQUFBQSxNQUFNQyxTQUFOLENBQWdCQyxTQUFoQixHQUE0QixZQUFXO0FBQ25DLE1BQU1DLFVBQVUsRUFBaEI7O0FBRUEsT0FBS0MsT0FBTCxDQUFhLFVBQVNDLFFBQVQsRUFBbUI7QUFDOUJBLGFBQVNELE9BQVQsQ0FBaUIsVUFBU0UsT0FBVCxFQUFrQjtBQUNqQ0gsY0FBUUksSUFBUixDQUFhRCxPQUFiO0FBQ0QsS0FGRDtBQUdELEdBSkQ7O0FBTUEsU0FBT0gsT0FBUDtBQUNELENBVkg7O0FBWUUsSUFBTUssTUFBTSxTQUFOQSxHQUFNLE1BQU87QUFDZixTQUFPLGlCQUFTO0FBQ2RDLFlBQVFELEdBQVIsQ0FBWUUsR0FBWixFQUFpQkMsS0FBakI7QUFDQSxXQUFPQSxLQUFQO0FBQ0QsR0FIRDtBQUlELENBTEg7O0FBT0EsSUFBTUMsY0FBYyxT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QVQsRUFBc0JDLFlBQXRCLEVBQW9DO0FBQ2xDLFdBQU9ELFlBQVkxRSxNQUFaLENBQW1CMkUsWUFBbkIsQ0FBUDtBQUNELEdBSG9CLEVBSXJCLEVBSnFCLENBQXZCO0FBTUEsU0FBT0YsY0FBUDtBQUNELENBUkQ7O0FBVU8sSUFBTUcsd0JBQVE7QUFDbkJySCxVQURtQjtBQUVuQkksMEJBRm1CO0FBR25CTyxjQUhtQjtBQUluQlEsOEJBSm1CO0FBS25CTyw0QkFMbUI7QUFNbkJvQixvQkFObUI7QUFPbkJaLHdDQVBtQjtBQVFuQmEsb0RBUm1CO0FBU25CTywwQ0FUbUI7QUFVbkJFLHdCQVZtQjtBQVduQkksZ0JBWG1CO0FBWW5CTyw0Q0FabUI7QUFhbkJDLDhCQWJtQjtBQWNuQkksd0JBZG1CO0FBZW5CRSxrQ0FmbUI7QUFnQm5CSyw4QkFoQm1CO0FBaUJuQmtCLDRCQWpCbUI7QUFrQm5CZSxvQ0FsQm1CO0FBbUJuQkM7QUFuQm1CLENBQWQiLCJmaWxlIjoidXRpbHMuanMiLCJzb3VyY2VSb290IjoiL1VzZXJzL2Rhbm1pbmltYWMvY29kZS9zbmFwZHJhZ29uLXJlZHV4Iiwic291cmNlc0NvbnRlbnQiOlsiQXJyYXkucHJvdG90eXBlLmNvbmNhdEFsbCA9IGZ1bmN0aW9uKCkge1xuICAgIGNvbnN0IHJlc3VsdHMgPSBbXTtcbiAgXG4gICAgdGhpcy5mb3JFYWNoKGZ1bmN0aW9uKHN1YkFycmF5KSB7XG4gICAgICBzdWJBcnJheS5mb3JFYWNoKGZ1bmN0aW9uKGVsZW1lbnQpIHtcbiAgICAgICAgcmVzdWx0cy5wdXNoKGVsZW1lbnQpO1xuICAgICAgfSk7XG4gICAgfSk7XG4gIFxuICAgIHJldHVybiByZXN1bHRzO1xuICB9O1xuICBcbiAgY29uc3QgbG9nID0gbXNnID0+IHsgXG4gICAgICByZXR1cm4gYXJyYXkgPT4ge1xuICAgICAgICBjb25zb2xlLmxvZyhtc2csIGFycmF5KTsgXG4gICAgICAgIHJldHVybiBhcnJheTsgXG4gICAgICB9XG4gICAgfTtcbiAgXG4gIGNvbnN0IGVuY29kZVF1ZXJ5ID0gcSA9PiB7IFxuICAgIGlmKHEgPT09IHVuZGVmaW5lZCkgcmV0dXJuIHE7XG4gICAgaWYoTnVtYmVyLmlzSW50ZWdlcihxKSkgcmV0dXJuIHE7XG4gICAgcmV0dXJuIGVuY29kZVVSSUNvbXBvbmVudChxLnRyaW0oKSkgXG4gIH07XG4gIFxuICBjb25zdCB0aW1lciA9IGZ1bmN0aW9uIChzaW5rLCBkZWxheSkge1xuICAgIGxldCBpZCA9IG51bGw7XG4gICAgQmFjb24uZnJvbUJpbmRlcihmdW5jdGlvbigpIHtcbiAgICAgIGlkID0gc2V0SW50ZXJ2YWwoZnVuY3Rpb24oKSB7XG4gICAgICAgICAgc2luaygpO1xuICAgICAgICB9LCBkZWxheSk7ICAgIFxuICAgICAgfSlcbiAgICAub25WYWx1ZShmdW5jdGlvbihlbGVtZW50KSB7IGNvbnNvbGUubG9nKGVsZW1lbnQpIH0pO1xuICAgIHJldHVybiBpZDtcbiAgfTtcbiAgXG4gIGZ1bmN0aW9uIGludGVydmFsVGltZXIgKHNpbmssIGRlbGF5KSB7XG4gICAgdmFyIHRpbWVySWQ7XG4gIFxuICAgIHRoaXMucGF1c2UgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgd2luZG93LmNsZWFySW50ZXJ2YWwodGltZXJJZCk7XG4gICAgfTtcbiAgXG4gICAgdGhpcy5yZXN1bWUgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgd2luZG93LmNsZWFySW50ZXJ2YWwodGltZXJJZCk7XG4gICAgICAgIHRpbWVySWQgPSB0aW1lcihzaW5rLCBkZWxheSk7XG4gICAgfTtcbiAgXG4gICAgdGhpcy5nZXRJZCA9IGZ1bmN0aW9uICgpe1xuICAgICAgcmV0dXJuIHRpbWVySWQ7XG4gICAgfVxuICBcbiAgICB0aGlzLnJlc3VtZSgpO1xuICBcbiAgICByZXR1cm4gdGhpcztcbiAgfTtcbiAgXG4gIGNvbnN0IHNodWZmbGVBcnJheSA9IGFycmF5ID0+IHtcblxuICAgIGlmKCFhcnJheSkgcmV0dXJuO1xuXG4gICAgdmFyIGN1cnJlbnRJbmRleCA9IGFycmF5Lmxlbmd0aCwgdGVtcG9yYXJ5VmFsdWUsIHJhbmRvbUluZGV4O1xuXG4gICAgLy8gV2hpbGUgdGhlcmUgcmVtYWluIGVsZW1lbnRzIHRvIHNodWZmbGUuLi5cbiAgICB3aGlsZSAoMCAhPT0gY3VycmVudEluZGV4KSB7XG5cbiAgICAgIC8vIFBpY2sgYSByZW1haW5pbmcgZWxlbWVudC4uLlxuICAgICAgcmFuZG9tSW5kZXggPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiBjdXJyZW50SW5kZXgpO1xuICAgICAgY3VycmVudEluZGV4IC09IDE7XG5cbiAgICAgIC8vIEFuZCBzd2FwIGl0IHdpdGggdGhlIGN1cnJlbnQgZWxlbWVudC5cbiAgICAgIHRlbXBvcmFyeVZhbHVlID0gYXJyYXlbY3VycmVudEluZGV4XTtcbiAgICAgIGFycmF5W2N1cnJlbnRJbmRleF0gPSBhcnJheVtyYW5kb21JbmRleF07XG4gICAgICBhcnJheVtyYW5kb21JbmRleF0gPSB0ZW1wb3JhcnlWYWx1ZTtcbiAgICB9XG5cbiAgICByZXR1cm4gWyAuLi5hcnJheSBdO1xuXG4gICAgLy8gcmV0dXJuIChhcnJcbiAgICAvLyAgIC5tYXAoYSA9PiBbTWF0aC5yYW5kb20oKSwgYV0pXG4gICAgLy8gICAuc29ydCgoYSwgYikgPT4gYVswXSAtIGJbMF0pXG4gICAgLy8gICAubWFwKGEgPT4gYVsxXSkpXG4gIH07XG4gIFxuICBjb25zdCByYW5kb21pc2VTZWxlY3Rpb24gPSAoc291cmNlLCByZXF1aXJlZCwgemVyb0Jhc2VkID0gZmFsc2UpID0+IHtcbiAgICBjb25zdCByID0gc2VsZWN0aW9uID0+IHtcbiAgICAgIGNvbnN0IGFyciA9IHNodWZmbGVBcnJheShzb3VyY2UpO1xuICAgICAgc2VsZWN0aW9uID0gc2VsZWN0aW9uLmNvbmNhdChhcnIubWFwKChpdGVtLCBpbmRleCkgPT4ge1xuICAgICAgICBpZihpbmRleCArIHNlbGVjdGlvbi5sZW5ndGggPCByZXF1aXJlZCkge1xuICAgICAgICAgIHJldHVybiB6ZXJvQmFzZWQgPyAtLWl0ZW0gOiBpdGVtO1xuICAgICAgICB9ICAgICAgXG4gICAgICB9KSkuZmlsdGVyKGl0ZW0gPT4gaXRlbSAhPT0gdW5kZWZpbmVkKTtcbiAgICAgIHJldHVybiBzZWxlY3Rpb24ubGVuZ3RoIDwgcmVxdWlyZWQgPyByKHNlbGVjdGlvbikgOiBzZWxlY3Rpb247XG4gICAgfVxuICAgIHJldHVybiByKFtdKTtcbiAgfTtcbiAgXG4gIGNvbnN0IG5leHRJdGVtID0gKGFycmF5LCBpbmRleCkgPT4geyAgICBcbiAgICBjb25zdCBpdGVtID0gYXJyYXlbaW5kZXggJSBhcnJheS5sZW5ndGhdO1xuICAgIGl0ZW0uaW5kZXggPSBpbmRleCAlIGFycmF5Lmxlbmd0aDtcbiAgICByZXR1cm4gaXRlbTtcbiAgfTtcblxuICBjb25zdCBpbnNlcnRPYmplY3RCZXR3ZWVuSXRlbXMgPSAoYXJyYXksIGluc2VydCkgPT4ge1xuICAgIGNvbnN0IGluc2VydGVkSW50b0FycmF5ID0gYXJyYXkucmVkdWNlKCAoYWNjLCBjdXJyLCBjdXJySW5kZXgpID0+IHsgICAgICAgIFxuICAgICAgICByZXR1cm4gYWNjLmNvbmNhdChbaW5zZXJ0LCBjdXJyXSk7XG4gICAgfSwgW10pO1xuICAgIHJldHVybiBpbnNlcnRlZEludG9BcnJheTtcbiAgfTtcblxuICBjb25zdCBkb3VibGVkSXRlbXNJbkFycmF5ID0gKGFycmF5KSA9PiB7XG4gICAgICBjb25zdCBkb3VibGVkQXJyYXkgPSBhcnJheS5yZWR1Y2UoIChhY2MsIGN1cnIsIGN1cnJJbmRleCkgPT4geyAgICAgICAgXG4gICAgICAgICAgcmV0dXJuIGFjYy5jb25jYXQoW2N1cnIsIGN1cnJdKTtcbiAgICAgIH0sIFtdKTtcbiAgICAgIHJldHVybiBkb3VibGVkQXJyYXk7XG4gIH07XG5cbiBjb25zdCBvbmx5VW5pcXVlID0gKHZhbHVlLCBpbmRleCwgc2VsZikgPT4geyBcbiAgICByZXR1cm4gc2VsZi5pbmRleE9mKHZhbHVlKSA9PT0gaW5kZXg7XG59O1xuXG5jb25zdCBzb3J0QnkgPSAoYXJyLCBwcm9wLCBkaXIgPSAnYXNjJykgPT4ge1xuICByZXR1cm4gZGlyID09PSAnYXNjJyBcbiAgICA/IGFyci5zb3J0KChhLCBiKSA9PiBwYXJzZUZsb2F0KGFbcHJvcF0pIC0gcGFyc2VGbG9hdChiW3Byb3BdKSlcbiAgICA6IGFyci5zb3J0KChhLCBiKSA9PiBwYXJzZUZsb2F0KGJbcHJvcF0pIC0gcGFyc2VGbG9hdChhW3Byb3BdKSk7XG59O1xuXG5jb25zdCBzb3J0QWxwaGFiZXRpY2FsbHlCeSA9IChhcnIsIHByb3ApID0+IHtcbiAgYXJyLnNvcnQoZnVuY3Rpb24oYSwgYil7XG4gICAgaWYoYVtwcm9wXSA8IGJbcHJvcF0pIHJldHVybiAtMTtcbiAgICBpZihhW3Byb3BdID4gYltwcm9wXSkgcmV0dXJuIDE7XG4gICAgcmV0dXJuIDA7XG4gIH0pO1xuICByZXR1cm4gYXJyO1xufTtcblxuY29uc3QgY2FsY0l0ZW1JbmRleCA9IChvZmZTZXQsIG1vZHVsZVNpemUsIGluZGV4KSA9PiB7XG4gIGNvbnN0IGl0ZW1JbmRleCA9IFxuICAgICAgICAob2ZmU2V0ICsgaW5kZXgpICUgbW9kdWxlU2l6ZSA9PT0gMCBcbiAgICAgICAgICA/IG9mZlNldFxuICAgICAgICAgIDogb2ZmU2V0ICsgKG9mZlNldCArIGluZGV4KSAlIG1vZHVsZVNpemU7XG4gIHJldHVybiBpdGVtSW5kZXg7XG59O1xuXG5jb25zdCBpc0l0ZXJhYmxlID0gYXJyYXkgPT4ge1xuICByZXR1cm4gQXJyYXkuaXNBcnJheShhcnJheSkgJiYgYXJyYXkubGVuZ3RoICE9PSAwO1xufTtcblxuY29uc3QgY2FwaXRhbGlzZUZpcnN0ID0gc3RyID0+IHtcbiAgcmV0dXJuIHN0ci5jaGFyQXQoMCkudG9VcHBlckNhc2UoKSArIHN0ci5zbGljZSgxKTtcbn07XG5cbmNvbnN0IGNhcGl0YWxpc2VBbGwgPSBzdHIgPT4ge1xuICByZXR1cm4gc3RyLnJlcGxhY2UoL1xcd1xcUyovZywgZnVuY3Rpb24odHh0KXtyZXR1cm4gdHh0LmNoYXJBdCgwKS50b1VwcGVyQ2FzZSgpICsgdHh0LnN1YnN0cigxKS50b0xvd2VyQ2FzZSgpO30pO1xufTtcblxuY29uc3QgZ2V0Q2VsbFZhbHVlID0gZnVuY3Rpb24odHIsIGlkeCl7IHJldHVybiB0ci5jaGlsZHJlbltpZHhdLmlubmVyVGV4dCB8fCB0ci5jaGlsZHJlbltpZHhdLnRleHRDb250ZW50OyB9XG5cbmNvbnN0IGNvbXBhcmVyID0gZnVuY3Rpb24oaWR4LCBhc2MpIHsgcmV0dXJuIGZ1bmN0aW9uKGEsIGIpIHsgcmV0dXJuIGZ1bmN0aW9uKHYxLCB2Mikge1xuICAgICAgICByZXR1cm4gdjEgIT09ICcnICYmIHYyICE9PSAnJyAmJiAhaXNOYU4odjEpICYmICFpc05hTih2MikgPyB2MSAtIHYyIDogdjEudG9TdHJpbmcoKS5sb2NhbGVDb21wYXJlKHYyKTtcbiAgICB9KGdldENlbGxWYWx1ZShhc2MgPyBhIDogYiwgaWR4KSwgZ2V0Q2VsbFZhbHVlKGFzYyA/IGIgOiBhLCBpZHgpKTtcbn19O1xuXG5jb25zdCBtYWtlU29ydGFibGUgPSBkb2N1bWVudCA9PiB7XG4gIEFycmF5LmZyb20oZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgndGggPiBzcGFuOm50aC1jaGlsZCgxKScpKS5mb3JFYWNoKGZ1bmN0aW9uKHNwKSB7IHNwLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgdmFyIHRoID0gdGhpcy5wYXJlbnRFbGVtZW50O1xuICAgICAgICAgIHZhciB0YWJsZSA9IHRoLmNsb3Nlc3QoJ3RhYmxlJyk7XG4gICAgICAgICAgdmFyIGJvZHkgPSB0YWJsZS5xdWVyeVNlbGVjdG9yKCd0Ym9keScpO1xuICAgICAgICAgIHZhciBmb290ZXIgPSB0YWJsZS5xdWVyeVNlbGVjdG9yKCd0Zm9vdCcpOyAgICAgICAgICBcbiAgICAgICAgICBBcnJheS5mcm9tKHRhYmxlLnF1ZXJ5U2VsZWN0b3JBbGwoJ3RyOm50aC1jaGlsZChuKzIpJykpXG4gICAgICAgICAgICAgIC5zb3J0KGNvbXBhcmVyKEFycmF5LmZyb20odGgucGFyZW50Tm9kZS5jaGlsZHJlbikuaW5kZXhPZih0aCksIHRoaXMuYXNjID0gIXRoaXMuYXNjKSlcbiAgICAgICAgICAgICAgLmZvckVhY2goZnVuY3Rpb24odHIpIHsgXG4gICAgICAgICAgICAgICAgaWYodHIgIT09IGZvb3Rlcikge1xuICAgICAgICAgICAgICAgICAgYm9keS5hcHBlbmRDaGlsZCh0cik7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB9KTtcbiAgICAgIH0pXG4gIH0pO1xufTtcblxuY29uc3QgaXRlbUNvdW50UmVkdWNlciA9IChhY2MsIGN1cnIpID0+IHtcbiAgYWNjW2N1cnIudG9TdHJpbmcoKV0gPSBhY2NbY3Vyci50b1N0cmluZygpXSB8fCAwO1xuICBhY2NbY3Vyci50b1N0cmluZygpXSsrO1xuICByZXR1cm4gYWNjO1xufTtcblxuY29uc3QgZmxhdHRlbiA9IGFycmF5ID0+IHtcbiAgY29uc3QgZmxhdHRlbmVkQXJyYXkgPSBhcnJheS5yZWR1Y2UoXG4gICAgZnVuY3Rpb24oYWNjdW11bGF0b3IsIGN1cnJlbnRWYWx1ZSkge1xuICAgICAgcmV0dXJuIGFjY3VtdWxhdG9yLmNvbmNhdChjdXJyZW50VmFsdWUpO1xuICAgIH0sXG4gICAgW11cbiAgKTtcbiAgcmV0dXJuIGZsYXR0ZW5lZEFycmF5O1xufVxuXG5leHBvcnQgY29uc3QgdXRpbHMgPSB7XG4gIGxvZyxcbiAgZW5jb2RlUXVlcnksXG4gIHRpbWVyLCBcbiAgaW50ZXJ2YWxUaW1lcixcbiAgc2h1ZmZsZUFycmF5LFxuICBuZXh0SXRlbSxcbiAgcmFuZG9taXNlU2VsZWN0aW9uLFxuICBpbnNlcnRPYmplY3RCZXR3ZWVuSXRlbXMsXG4gIGRvdWJsZWRJdGVtc0luQXJyYXksXG4gIG9ubHlVbmlxdWUsXG4gIHNvcnRCeSxcbiAgc29ydEFscGhhYmV0aWNhbGx5QnksXG4gIGNhbGNJdGVtSW5kZXgsXG4gIGlzSXRlcmFibGUsXG4gIGNhcGl0YWxpc2VGaXJzdCxcbiAgY2FwaXRhbGlzZUFsbCxcbiAgbWFrZVNvcnRhYmxlLFxuICBpdGVtQ291bnRSZWR1Y2VyLFxuICBmbGF0dGVuXG59OyJdfQ==

/***/ })

/******/ });
//# sourceMappingURL=utils.bundle.js.map