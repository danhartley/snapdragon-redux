!function(t){var n={};function e(r){if(n[r])return n[r].exports;var o=n[r]={i:r,l:!1,exports:{}};return t[r].call(o.exports,o,o.exports,e),o.l=!0,o.exports}e.m=t,e.c=n,e.d=function(t,n,r){e.o(t,n)||Object.defineProperty(t,n,{configurable:!1,enumerable:!0,get:r})},e.r=function(t){Object.defineProperty(t,"__esModule",{value:!0})},e.n=function(t){var n=t&&t.__esModule?function(){return t.default}:function(){return t};return e.d(n,"a",n),n},e.o=function(t,n){return Object.prototype.hasOwnProperty.call(t,n)},e.p="",e(e.s=12)}({12:function(t,n,e){"use strict";function r(t){if(Array.isArray(t)){for(var n=0,e=Array(t.length);n<t.length;n++)e[n]=t[n];return e}return Array.from(t)}Object.defineProperty(n,"__esModule",{value:!0}),Array.prototype.concatAll=function(){var t=[];return this.forEach(function(n){n.forEach(function(n){t.push(n)})}),t};var o=function(t,n){var e=null;return Bacon.fromBinder(function(){e=setInterval(function(){t()},n)}).onValue(function(t){console.log(t)}),e};var u=function(t){if(t&&0!==t.length){for(var n,e,o=t.length;0!==o;)e=Math.floor(Math.random()*o),n=t[o-=1],t[o]=t[e],t[e]=n;return[].concat(r(t))}},i=function(t,n,e,o){var u=t.children;return o||(u=[].concat(r(t.children)).filter(function(t){return-1===[].concat(r(t.classList)).join("").indexOf("wide-screen")})),u[n].dataset.snapIndex||u[n].children[e].innerText||u[n].innerText||u[n].classList[0]||u[n].textContent};n.utils={log:function(t){return function(t){return t}},encodeQuery:function(t){return void 0===t?t:Number.isInteger(t)?t:encodeURIComponent(t.trim())},timer:o,intervalTimer:function(t,n){var e;return this.pause=function(){window.clearInterval(e)},this.resume=function(){window.clearInterval(e),e=o(t,n)},this.getId=function(){return e},this.resume(),this},shuffleArray:u,nextItem:function(t,n){var e=t[n%t.length];return e.index=n%t.length,e},randomiseSelection:function(t,n){var e=arguments.length>2&&void 0!==arguments[2]&&arguments[2];return function r(o){var i=u(t);return(o=o.concat(i.map(function(t,r){if(r+o.length<n)return e?--t:t})).filter(function(t){return void 0!==t})).length<n?r(o):o}([])},insertObjectBetweenItems:function(t,n){return t.reduce(function(t,e,r){return t.concat([n,e])},[])},doubledItemsInArray:function(t){return t.reduce(function(t,n,e){return t.concat([n,n])},[])},onlyUnique:function(t,n,e){return e.indexOf(t)===n},sortBy:function(t,n){return"asc"===(arguments.length>2&&void 0!==arguments[2]?arguments[2]:"asc")?t.sort(function(t,e){return parseFloat(t[n])-parseFloat(e[n])}):t.sort(function(t,e){return parseFloat(e[n])-parseFloat(t[n])})},sortAlphabeticallyBy:function(t,n){return t.sort(function(t,e){return t[n]<e[n]?-1:t[n]>e[n]?1:0}),t},calcItemIndex:function(t,n,e){return(t+e)%n==0?t:t+(t+e)%n},isIterable:function(t){return Array.isArray(t)&&0!==t.length},capitaliseFirst:function(t){return t.substr(0,1).toUpperCase()+t.substr(1).toLowerCase()},capitaliseAll:function(t){return t.toLowerCase().split(" ").map(function(t){return t.charAt(0).toUpperCase()+t.substring(1)}).join(" ")},makeSortable:function(t,n,e){Array.from(t.querySelectorAll("th > span")).forEach(function(t){t.addEventListener("click",function(){var t="ORDER"===this.innerText.toUpperCase()?1:0,r=[],o=this.parentElement;if("not-sortable"!==o.classList[0]){var u=o.closest("table"),a=u.querySelector("tbody"),c=u.querySelector("tfoot");Array.from(u.querySelectorAll("tr:nth-child(n+2)")).sort(function(t,n,e,r){return function(o,u){return a=i(n?o:u,t,e,r),c=i(n?u:o,t,e,r),""===a||""===c||isNaN(a)||isNaN(c)?a.toString().localeCompare(c):a-c;var a,c}}(Array.from(o.parentNode.children).indexOf(o),this.asc=!this.asc,t,e)).forEach(function(t){t!==c&&(a.appendChild(t),r.push(t.cells[0].id))}),n(r)}})})},itemCountReducer:function(t,n){return t[n.toString()]=t[n.toString()]||0,t[n.toString()]++,t},flatten:function(t){return t.reduce(function(t,n){return t.concat(n)},[])},getObservableMonths:function(t){arguments.length>1&&void 0!==arguments[1]&&arguments[1];var n=function(n,e){var r=t,o="future"===n?1:-1;return r.setDate(r.getDate()+o*e),r},e=n("past",30).getMonth(),r=t.getMonth()+1,o=n("future",30).getMonth()+1,u=function(t){return new Date(2e3,t,1).toLocaleString("en-uk",{month:"long"})};return[{index:e,name:u(e)},{index:r,name:u(r)},{index:o,name:u(o)}]},getRandomInt:function(t){return Math.floor(Math.random()*Math.floor(t))},createSessionToken:function(){return"xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g,function(t){var n=16*Math.random()|0;return("x"==t?n:3&n|8).toString(16)})},debounce:function(t,n,e){var r;return function(){var o=this,u=arguments,i=e&&!r;clearTimeout(r),r=setTimeout(function(){r=null,e||t.apply(o,u)},n),i&&t.apply(o,u)}},getRandomObjectProperty:function(t){if(0===Object.keys(t).length&&t.constructor===Object)return{};var n=Object.keys(t),e=n[Math.floor(Math.random()*n.length)];return{key:e,value:t[e]}},toCamelCase:function(t){var n="";return t.split(" ").forEach(function(t,e){var r=t.toLowerCase();n+=0===e?r:r[0].toUpperCase()+r.slice(1)}),n}}}});