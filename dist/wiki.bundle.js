!function(e){function webpackJsonpCallback(t){for(var o,c,i=t[0],s=t[1],l=t[2],f=0,p=[];f<i.length;f++)c=i[f],Object.prototype.hasOwnProperty.call(n,c)&&n[c]&&p.push(n[c][0]),n[c]=0;for(o in s)Object.prototype.hasOwnProperty.call(s,o)&&(e[o]=s[o]);for(u&&u(t);p.length;)p.shift()();return a.push.apply(a,l||[]),checkDeferredModules()}function checkDeferredModules(){for(var e,t=0;t<a.length;t++){for(var o=a[t],c=!0,i=1;i<o.length;i++){var u=o[i];0!==n[u]&&(c=!1)}c&&(a.splice(t--,1),e=__webpack_require__(__webpack_require__.s=o[0]))}return e}var t={},n={4:0},a=[];function __webpack_require__(n){if(t[n])return t[n].exports;var a=t[n]={i:n,l:!1,exports:{}};return e[n].call(a.exports,a,a.exports,__webpack_require__),a.l=!0,a.exports}__webpack_require__.m=e,__webpack_require__.c=t,__webpack_require__.d=function(e,t,n){__webpack_require__.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},__webpack_require__.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},__webpack_require__.t=function(e,t){if(1&t&&(e=__webpack_require__(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(__webpack_require__.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var a in e)__webpack_require__.d(n,a,function(t){return e[t]}.bind(null,a));return n},__webpack_require__.n=function(e){var t=e&&e.__esModule?function getDefault(){return e.default}:function getModuleExports(){return e};return __webpack_require__.d(t,"a",t),t},__webpack_require__.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},__webpack_require__.p="/";var o=window.webpackJsonp=window.webpackJsonp||[],c=o.push.bind(o);o.push=webpackJsonpCallback,o=o.slice();for(var i=0;i<o.length;i++)webpackJsonpCallback(o[i]);var u=c;a.push([519,0]),checkDeferredModules()}({1:function(e,t,n){"use strict";function _typeof(e){return(_typeof="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function _typeof(e){return typeof e}:function _typeof(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}function _toConsumableArray(e){return function _arrayWithoutHoles(e){if(Array.isArray(e))return _arrayLikeToArray(e)}(e)||function _iterableToArray(e){if("undefined"!=typeof Symbol&&Symbol.iterator in Object(e))return Array.from(e)}(e)||function _unsupportedIterableToArray(e,t){if(!e)return;if("string"==typeof e)return _arrayLikeToArray(e,t);var n=Object.prototype.toString.call(e).slice(8,-1);"Object"===n&&e.constructor&&(n=e.constructor.name);if("Map"===n||"Set"===n)return Array.from(e);if("Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))return _arrayLikeToArray(e,t)}(e)||function _nonIterableSpread(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function _arrayLikeToArray(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,a=new Array(t);n<t;n++)a[n]=e[n];return a}n.r(t),n.d(t,"utils",(function(){return i})),Array.prototype.concatAll=function(){var e=[];return this.forEach((function(t){t.forEach((function(t){e.push(t)}))})),e};var a=function timer(e,t){var n=null;return Bacon.fromBinder((function(){n=setInterval((function(){e()}),t)})).onValue((function(e){})),n};var o=function shuffleArray(e){if(e&&0!==e.length){for(var t,n,a=e.length;0!==a;)n=Math.floor(Math.random()*a),t=e[a-=1],e[a]=e[n],e[n]=t;return _toConsumableArray(e)}},c=function getCellValue(e,t,n,a){var o=e.children;return a||(o=_toConsumableArray(e.children).filter((function(e){return-1===_toConsumableArray(e.classList).join("").indexOf("wide-screen")}))),o[t].dataset.snapIndex||o[t].querySelector("button")&&o[t].querySelector("button").dataset.vernacularName||o[t].querySelector("button")&&o[t].querySelector("button").dataset.name||o[t].children[n].innerText||o[t].innerText||o[t].classList[0]||o[t].textContent},i={encodeQuery:function encodeQuery(e){return void 0===e||Number.isInteger(e)?e:encodeURIComponent(e.trim())},timer:a,shuffleArray:o,randomiseSelection:function randomiseSelection(e,t){var n=arguments.length>2&&void 0!==arguments[2]&&arguments[2],a=function r(a){var c=o(e);return(a=a.concat(c.map((function(e,o){if(o+a.length<t)return n?--e:e}))).filter((function(e){return void 0!==e}))).length<t?r(a):a};return a([])},onlyUnique:function onlyUnique(e,t,n){return n.indexOf(e)===t},sortBy:function sortBy(e,t){var n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:"asc";return"asc"===n?e.sort((function(e,n){return parseFloat(e[t])-parseFloat(n[t])})):e.sort((function(e,n){return parseFloat(n[t])-parseFloat(e[t])}))},sortAlphabeticallyBy:function sortAlphabeticallyBy(e,t){return e.sort((function(e,n){return e[t]<n[t]?-1:e[t]>n[t]?1:0})),e},calcItemIndex:function calcItemIndex(e,t,n){return(e+n)%t==0?e:e+(e+n)%t},capitaliseFirst:function capitaliseFirst(e){return e.substr(0,1).toUpperCase()+e.substr(1).toLowerCase()},capitaliseAll:function capitaliseAll(e){return e.toLowerCase().split(" ").map((function(e){return e.charAt(0).toUpperCase()+e.substring(1)})).join(" ")},makeSortable:function makeSortable(e,t,n){Array.from(e.querySelectorAll("th > span")).forEach((function(e){e.addEventListener("click",(function(){var e="ORDER"===this.innerText.toUpperCase()?1:0,a=[],o=this.parentElement;if("not-sortable"!==o.classList[0]){var i=o.closest("table"),u=i.querySelector("tbody"),s=i.querySelector("tfoot");snapLog('Array.from(tbody.querySelectorAll("tr")): ',Array.from(u.querySelectorAll("tr"))),Array.from(u.querySelectorAll("tr")).sort(function comparer(e,t,n,a){return function(o,i){return u=c(t?o:i,e,n,a),s=c(t?i:o,e,n,a),""===u||""===s||isNaN(u)||isNaN(s)?u.toString().localeCompare(s.toString()):u-s;var u,s}}(Array.from(o.parentNode.children).indexOf(o),this.asc=!this.asc,e,n)).forEach((function(e){e!==s&&(u.appendChild(e),a.push(e.cells[0].id))})),t(a)}}))}))},flatten:function flatten(e){return e.reduce((function(e,t){return e.concat(t)}),[])},getObservableMonths:function getObservableMonths(e){var t=function daysAway(t,n){var a=e,o="future"===t?1:-1;return a.setDate(a.getDate()+o*n),a},n=t("past",30).getMonth(),a=e.getMonth()+1,o=t("future",30).getMonth()+1,c=function getMonthName(e){return new Date(2e3,e,1).toLocaleString("en-uk",{month:"long"})},i=[{index:n,name:c(n)},{index:a,name:c(a)},{index:o,name:c(o)}];return i},getRandomInt:function getRandomInt(e){return Math.floor(Math.random()*Math.floor(e))},createSessionToken:function createSessionToken(){return"xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g,(function(e){var t=16*Math.random()|0;return("x"==e?t:3&t|8).toString(16)}))},getRandomObjectProperty:function getRandomObjectProperty(e){if(0===Object.keys(e).length&&e.constructor===Object)return{};var t=Object.keys(e),n=t[Math.floor(Math.random()*t.length)];return{key:n,value:e[n]}},toCamelCase:function toCamelCase(e){if(void 0===e)return"";var t="";return e.split(" ").forEach((function(e,n){var a=e.toLowerCase();t+=0===n?a:a[0].toUpperCase()+a.slice(1)})),t},fromCamelCase:function fromCamelCase(e){return void 0===e?"":e.replace(/([a-z])([A-Z])/g,"$1 $2").toLowerCase()},parseToLowerCase:function parseToLowerCase(e){return null==e?"":"object"===_typeof(e)?e:e?e.toLowerCase():""}}},119:function(e,t,n){var a={"./log":120};function webpackContext(e){var t=webpackContextResolve(e);return n(t)}function webpackContextResolve(e){if(!n.o(a,e)){var t=new Error("Cannot find module '"+e+"'");throw t.code="MODULE_NOT_FOUND",t}return a[e]}webpackContext.keys=function webpackContextKeys(){return Object.keys(a)},webpackContext.resolve=webpackContextResolve,e.exports=webpackContext,webpackContext.id=119},153:function(e,t,n){"use strict";var a=n(5),o=n(68);function _makeFlat(e){return function flatt(t){for(var n,a,c,i=[],u=0,s=t.length;u<s;){if(Object(o.a)(t[u]))for(c=0,a=(n=e?flatt(t[u]):t[u]).length;c<a;)i[i.length]=n[c],c+=1;else i[i.length]=t[u];u+=1}return i}}var c=Object(a.a)(_makeFlat(!0));t.a=c},22:function(e,t,n){"use strict";function _has(e,t){return Object.prototype.hasOwnProperty.call(t,e)}n.d(t,"a",(function(){return _has}))},23:function(e,t,n){"use strict";t.a=Array.isArray||function _isArray(e){return null!=e&&e.length>=0&&"[object Array]"===Object.prototype.toString.call(e)}},33:function(e,t,n){"use strict";function _isString(e){return"[object String]"===Object.prototype.toString.call(e)}n.d(t,"a",(function(){return _isString}))},34:function(e,t,n){"use strict";var a=n(5),o=n(22),c=n(67),i=!{toString:null}.propertyIsEnumerable("toString"),u=["constructor","valueOf","isPrototypeOf","toString","propertyIsEnumerable","hasOwnProperty","toLocaleString"],s=function(){return arguments.propertyIsEnumerable("length")}(),l=function contains(e,t){for(var n=0;n<e.length;){if(e[n]===t)return!0;n+=1}return!1},f="function"!=typeof Object.keys||s?Object(a.a)((function keys(e){if(Object(e)!==e)return[];var t,n,a=[],f=s&&Object(c.a)(e);for(t in e)!Object(o.a)(t,e)||f&&"length"===t||(a[a.length]=t);if(i)for(n=u.length-1;n>=0;)t=u[n],Object(o.a)(t,e)&&!l(a,t)&&(a[a.length]=t),n-=1;return a})):Object(a.a)((function keys(e){return Object(e)!==e?[]:Object.keys(e)}));t.a=f},45:function(e,t,n){"use strict";n.d(t,"a",(function(){return _includes}));var a=n(69);function _includes(e,t){return function _indexOf(e,t,n){var o,c;if("function"==typeof e.indexOf)switch(typeof t){case"number":if(0===t){for(o=1/t;n<e.length;){if(0===(c=e[n])&&1/c===o)return n;n+=1}return-1}if(t!=t){for(;n<e.length;){if("number"==typeof(c=e[n])&&c!=c)return n;n+=1}return-1}return e.indexOf(t,n);case"string":case"boolean":case"function":case"undefined":return e.indexOf(t,n);case"object":if(null===t)return e.indexOf(t,n)}for(;n<e.length;){if(Object(a.a)(e[n],t))return n;n+=1}return-1}(t,e,0)>=0}},49:function(e,t,n){"use strict";var a=n(5),o=Object(a.a)((function type(e){return null===e?"Null":void 0===e?"Undefined":Object.prototype.toString.call(e).slice(8,-1)}));t.a=o},5:function(e,t,n){"use strict";n.d(t,"a",(function(){return _curry1}));var a=n(8);function _curry1(e){return function f1(t){return 0===arguments.length||Object(a.a)(t)?f1:e.apply(this,arguments)}}},519:function(e,t,n){n(117),e.exports=n(75)},67:function(e,t,n){"use strict";var a=n(22),o=Object.prototype.toString,c=function(){return"[object Arguments]"===o.call(arguments)?function _isArguments(e){return"[object Arguments]"===o.call(e)}:function _isArguments(e){return Object(a.a)("callee",e)}}();t.a=c},68:function(e,t,n){"use strict";var a=n(5),o=n(23),c=n(33),i=Object(a.a)((function isArrayLike(e){return!!Object(o.a)(e)||!!e&&("object"==typeof e&&(!Object(c.a)(e)&&(1===e.nodeType?!!e.length:0===e.length||e.length>0&&(e.hasOwnProperty(0)&&e.hasOwnProperty(e.length-1)))))}));t.a=i},69:function(e,t,n){"use strict";var a=n(9);function _arrayFromIterator(e){for(var t,n=[];!(t=e.next()).done;)n.push(t.value);return n}function _includesWith(e,t,n){for(var a=0,o=n.length;a<o;){if(e(t,n[a]))return!0;a+=1}return!1}var o=n(22);var c="function"==typeof Object.is?Object.is:function _objectIs(e,t){return e===t?0!==e||1/e==1/t:e!=e&&t!=t},i=n(34),u=n(49);function _uniqContentEquals(e,t,n,a){var o=_arrayFromIterator(e);function eq(e,t){return _equals(e,t,n.slice(),a.slice())}return!_includesWith((function(e,t){return!_includesWith(eq,t,e)}),_arrayFromIterator(t),o)}function _equals(e,t,n,a){if(c(e,t))return!0;var s=Object(u.a)(e);if(s!==Object(u.a)(t))return!1;if(null==e||null==t)return!1;if("function"==typeof e["fantasy-land/equals"]||"function"==typeof t["fantasy-land/equals"])return"function"==typeof e["fantasy-land/equals"]&&e["fantasy-land/equals"](t)&&"function"==typeof t["fantasy-land/equals"]&&t["fantasy-land/equals"](e);if("function"==typeof e.equals||"function"==typeof t.equals)return"function"==typeof e.equals&&e.equals(t)&&"function"==typeof t.equals&&t.equals(e);switch(s){case"Arguments":case"Array":case"Object":if("function"==typeof e.constructor&&"Promise"===function _functionName(e){var t=String(e).match(/^function (\w*)/);return null==t?"":t[1]}(e.constructor))return e===t;break;case"Boolean":case"Number":case"String":if(typeof e!=typeof t||!c(e.valueOf(),t.valueOf()))return!1;break;case"Date":if(!c(e.valueOf(),t.valueOf()))return!1;break;case"Error":return e.name===t.name&&e.message===t.message;case"RegExp":if(e.source!==t.source||e.global!==t.global||e.ignoreCase!==t.ignoreCase||e.multiline!==t.multiline||e.sticky!==t.sticky||e.unicode!==t.unicode)return!1}for(var l=n.length-1;l>=0;){if(n[l]===e)return a[l]===t;l-=1}switch(s){case"Map":return e.size===t.size&&_uniqContentEquals(e.entries(),t.entries(),n.concat([e]),a.concat([t]));case"Set":return e.size===t.size&&_uniqContentEquals(e.values(),t.values(),n.concat([e]),a.concat([t]));case"Arguments":case"Array":case"Object":case"Boolean":case"Number":case"String":case"Date":case"Error":case"RegExp":case"Int8Array":case"Uint8Array":case"Uint8ClampedArray":case"Int16Array":case"Uint16Array":case"Int32Array":case"Uint32Array":case"Float32Array":case"Float64Array":case"ArrayBuffer":break;default:return!1}var f=Object(i.a)(e);if(f.length!==Object(i.a)(t).length)return!1;var p=n.concat([e]),y=a.concat([t]);for(l=f.length-1;l>=0;){var b=f[l];if(!Object(o.a)(b,t)||!_equals(t[b],e[b],p,y))return!1;l-=1}return!0}var s=Object(a.a)((function equals(e,t){return _equals(e,t,[],[])}));t.a=s},75:function(e,t,n){"use strict";n.r(t),n.d(t,"formatUrl",(function(){return u})),n.d(t,"formatWiki",(function(){return f})),n.d(t,"renderWiki",(function(){return renderWiki}));var a=n(153),o=n(86),c=n(1);function asyncGeneratorStep(e,t,n,a,o,c,i){try{var u=e[c](i),s=u.value}catch(e){return void n(e)}u.done?t(s):Promise.resolve(s).then(a,o)}function _asyncToGenerator(e){return function(){var t=this,n=arguments;return new Promise((function(a,o){var c=e.apply(t,n);function _next(e){asyncGeneratorStep(c,a,o,_next,_throw,"next",e)}function _throw(e){asyncGeneratorStep(c,a,o,_next,_throw,"throw",e)}_next(void 0)}))}}var i="",u=function formatUrl(e,t,n){var a=e;if(e.indexOf(" ")>0){var o=e.split(" ");(a=o[0]+" "+o[1]).indexOf("Speckled wood")>-1&&(a+=" "+o[2])}return t+n(a)};function fetchWiki(e,t){return _fetchWiki.apply(this,arguments)}function _fetchWiki(){return(_fetchWiki=_asyncToGenerator(regeneratorRuntime.mark((function _callee(e,t){var n,o,s,l,f;return regeneratorRuntime.wrap((function _callee$(p){for(;;)switch(p.prev=p.next){case 0:if(void 0!==e){p.next=2;break}return p.abrupt("return",t);case 2:return n=u(e,i,c.utils.encodeQuery),o={method:"GET"},p.prev=4,p.next=7,fetch(n,o);case 7:return s=p.sent,p.next=10,s.json();case 10:return l=p.sent,p.abrupt("return",Object(a.a)(l));case 14:return p.prev=14,p.t0=p.catch(4),f=new Promise((function(e,n){e(t)})),p.abrupt("return",f);case 18:case"end":return p.stop()}}),_callee,this,[[4,14]])})))).apply(this,arguments)}var s=function cleanEntry(e){var t=e;return t=(t=(t=(t=(t=t.replace("( or UK: , US: )","")).replace("(;","(")).replace("()","")).replace("( ","(")).replace("  "," ")},l=function wikiLink(e){var t=s(e).replace(".wikipedia",".m.wikipedia");return'<span data-toggle="modal" data-target="#wikiModal" data-src="'.concat(t,'" class="underline-link">Wiki modal</span>')},f=function formatWiki(e){if(Object(o.a)(e[0],["Tarragon","Apple"]))return'<li class="species-card-wiki-entry">\''.concat(s(e[2]),"'</li>");if(!e)return"";var t="";return 1===e.length&&(t+=l(e[0])),e[1]&&(t+='<li class="species-card-wiki-entry">\''.concat(s(e[1]),"'</li>")),e[2]&&(-1!==e[2].indexOf("https")?t+=l(e[2]):t+='<li class="species-card-wiki-entry">\''.concat(s(e[2]),"'</li>")),e[3]&&(-1!==e[3].indexOf("https")?t+=l(e[3]):t+='<li class="species-card-wiki-entry">\''.concat(s(e[3]),"'</li>")),t};function renderWiki(e,t,n){return _renderWiki.apply(this,arguments)}function _renderWiki(){return(_renderWiki=_asyncToGenerator(regeneratorRuntime.mark((function _callee2(e,t,n){var a,c,u,s,l,p,y;return regeneratorRuntime.wrap((function _callee2$(b){for(;;)switch(b.prev=b.next){case 0:return a=t.name,c=t.names?t.names.filter((function(e){return e.language===n})).find((function(e){return e.wikiSearchTerm})):null,u=c?c.vernacularName:t.searchTerms?t.searchTerms.filter((function(e){return e.language===n}))[0].searchTerm:a,i="https://".concat(n,".m.wikipedia.org/w/api.php?action=opensearch&format=json&origin=*&limit=1&search="),s=["Artemisia dracunculus","Malus domestica","Zingiber officinale"],Object(o.a)(t.name,s)&&(i="https://".concat(n,".m.wikipedia.org/w/api.php?action=opensearch&format=json&origin=*&limit=2&redirects=resolve&search=")),e.innerHTML="",b.next=9,fetchWiki(u);case 9:if(!(l=b.sent)||!l[2]){b.next=14;break}e.innerHTML=f(l.slice(1)),b.next=21;break;case 14:if(a){b.next=16;break}return b.abrupt("return","");case 16:return p=a.split(" ")[0],b.next=19,fetchWiki(p);case 19:""!==(y=b.sent)[2]?e.innerHTML=f(y.slice(1)):"en"!==n&&renderWiki(e,a,"en");case 21:case"end":return b.stop()}}),_callee2,this)})))).apply(this,arguments)}},8:function(e,t,n){"use strict";function _isPlaceholder(e){return null!=e&&"object"==typeof e&&!0===e["@@functional/placeholder"]}n.d(t,"a",(function(){return _isPlaceholder}))},86:function(e,t,n){"use strict";var a=n(45),o=n(9),c=Object(o.a)(a.a);t.a=c},9:function(e,t,n){"use strict";n.d(t,"a",(function(){return _curry2}));var a=n(5),o=n(8);function _curry2(e){return function f2(t,n){switch(arguments.length){case 0:return f2;case 1:return Object(o.a)(t)?f2:Object(a.a)((function(n){return e(t,n)}));default:return Object(o.a)(t)&&Object(o.a)(n)?f2:Object(o.a)(t)?Object(a.a)((function(t){return e(t,n)})):Object(o.a)(n)?Object(a.a)((function(n){return e(t,n)})):e(t,n)}}}}});
//# sourceMappingURL=wiki.bundle.js.map