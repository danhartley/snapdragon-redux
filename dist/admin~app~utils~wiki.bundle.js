/*! For license information please see admin~app~utils~wiki.bundle.js.LICENSE.txt */
(window.webpackJsonp=window.webpackJsonp||[]).push([["admin~app~utils~wiki"],{"./src/utils/utils.js":function(t,e,n){"use strict";function _typeof(t){return(_typeof="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function _typeof(t){return typeof t}:function _typeof(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t})(t)}function _toConsumableArray(t){return function _arrayWithoutHoles(t){if(Array.isArray(t))return _arrayLikeToArray(t)}(t)||function _iterableToArray(t){if("undefined"!=typeof Symbol&&Symbol.iterator in Object(t))return Array.from(t)}(t)||function _unsupportedIterableToArray(t,e){if(!t)return;if("string"==typeof t)return _arrayLikeToArray(t,e);var n=Object.prototype.toString.call(t).slice(8,-1);"Object"===n&&t.constructor&&(n=t.constructor.name);if("Map"===n||"Set"===n)return Array.from(t);if("Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))return _arrayLikeToArray(t,e)}(t)||function _nonIterableSpread(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function _arrayLikeToArray(t,e){(null==e||e>t.length)&&(e=t.length);for(var n=0,o=new Array(e);n<e;n++)o[n]=t[n];return o}n.r(e),n.d(e,"utils",(function(){return u})),Array.prototype.concatAll=function(){var t=[];return this.forEach((function(e){e.forEach((function(e){t.push(e)}))})),t};var o=function timer(t,e){var n=null;return Bacon.fromBinder((function(){n=setInterval((function(){t()}),e)})).onValue((function(t){})),n};var a=function shuffleArray(t){if(t&&0!==t.length){for(var e,n,o=t.length;0!==o;)n=Math.floor(Math.random()*o),e=t[o-=1],t[o]=t[n],t[n]=e;return _toConsumableArray(t)}},i=function getCellValue(t,e,n,o){var a=t.children;return o||(a=_toConsumableArray(t.children).filter((function(t){return-1===_toConsumableArray(t.classList).join("").indexOf("wide-screen")}))),a[e].dataset.snapIndex||a[e].querySelector("button")&&a[e].querySelector("button").dataset.vernacularName||a[e].querySelector("button")&&a[e].querySelector("button").dataset.name||a[e].children[n].innerText||a[e].innerText||a[e].classList[0]||a[e].textContent},u={encodeQuery:function encodeQuery(t){return void 0===t||Number.isInteger(t)?t:encodeURIComponent(t.trim())},timer:o,shuffleArray:a,randomiseSelection:function randomiseSelection(t,e){var n=arguments.length>2&&void 0!==arguments[2]&&arguments[2],o=function r(o){var i=a(t);return(o=o.concat(i.map((function(t,a){if(a+o.length<e)return n?--t:t}))).filter((function(t){return void 0!==t}))).length<e?r(o):o};return o([])},onlyUnique:function onlyUnique(t,e,n){return n.indexOf(t)===e},sortBy:function sortBy(t,e){var n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:"asc";return"asc"===n?t.sort((function(t,n){return parseFloat(t[e])-parseFloat(n[e])})):t.sort((function(t,n){return parseFloat(n[e])-parseFloat(t[e])}))},sortAlphabeticallyBy:function sortAlphabeticallyBy(t,e){return t.sort((function(t,n){return t[e]<n[e]?-1:t[e]>n[e]?1:0})),t},calcItemIndex:function calcItemIndex(t,e,n){return(t+n)%e==0?t:t+(t+n)%e},capitaliseFirst:function capitaliseFirst(t){return t.substr(0,1).toUpperCase()+t.substr(1).toLowerCase()},capitaliseAll:function capitaliseAll(t){return t.toLowerCase().split(" ").map((function(t){return t.charAt(0).toUpperCase()+t.substring(1)})).join(" ")},makeSortable:function makeSortable(t,e,n){Array.from(t.querySelectorAll("th > span")).forEach((function(t){t.addEventListener("click",(function(){var t="ORDER"===this.innerText.toUpperCase()?1:0,o=[],a=this.parentElement;if("not-sortable"!==a.classList[0]){var u=a.closest("table"),c=u.querySelector("tbody"),l=u.querySelector("tfoot");snapLog('Array.from(tbody.querySelectorAll("tr")): ',Array.from(c.querySelectorAll("tr"))),Array.from(c.querySelectorAll("tr")).sort(function comparer(t,e,n,o){return function(a,u){return c=i(e?a:u,t,n,o),l=i(e?u:a,t,n,o),""===c||""===l||isNaN(c)||isNaN(l)?c.toString().localeCompare(l.toString()):c-l;var c,l}}(Array.from(a.parentNode.children).indexOf(a),this.asc=!this.asc,t,n)).forEach((function(t){t!==l&&(c.appendChild(t),o.push(t.cells[0].id))})),e(o)}}))}))},flatten:function flatten(t){return t.reduce((function(t,e){return t.concat(e)}),[])},getObservableMonths:function getObservableMonths(t){var e=function daysAway(e,n){var o=t,a="future"===e?1:-1;return o.setDate(o.getDate()+a*n),o},n=e("past",30).getMonth(),o=t.getMonth()+1,a=e("future",30).getMonth()+1,i=function getMonthName(t){return new Date(2e3,t,1).toLocaleString("en-uk",{month:"long"})},u=[{index:n,name:i(n)},{index:o,name:i(o)},{index:a,name:i(a)}];return u},getRandomInt:function getRandomInt(t){return Math.floor(Math.random()*Math.floor(t))},createSessionToken:function createSessionToken(){return"xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g,(function(t){var e=16*Math.random()|0;return("x"==t?e:3&e|8).toString(16)}))},getRandomObjectProperty:function getRandomObjectProperty(t){if(0===Object.keys(t).length&&t.constructor===Object)return{};var e=Object.keys(t),n=e[Math.floor(Math.random()*e.length)];return{key:n,value:t[n]}},toCamelCase:function toCamelCase(t){if(void 0===t)return"";var e="";return t.split(" ").forEach((function(t,n){var o=t.toLowerCase();e+=0===n?o:o[0].toUpperCase()+o.slice(1)})),e},fromCamelCase:function fromCamelCase(t){return void 0===t?"":t.replace(/([a-z])([A-Z])/g,"$1 $2").toLowerCase()},parseToLowerCase:function parseToLowerCase(t){return null==t?"":"object"===_typeof(t)?t:t?t.toLowerCase():""}}}}]);
//# sourceMappingURL=admin~app~utils~wiki.bundle.js.map