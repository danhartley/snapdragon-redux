!function(n){var t={};function r(e){if(t[e])return t[e].exports;var o=t[e]={i:e,l:!1,exports:{}};return n[e].call(o.exports,o,o.exports,r),o.l=!0,o.exports}r.m=n,r.c=t,r.d=function(n,t,e){r.o(n,t)||Object.defineProperty(n,t,{configurable:!1,enumerable:!0,get:e})},r.r=function(n){Object.defineProperty(n,"__esModule",{value:!0})},r.n=function(n){var t=n&&n.__esModule?function(){return n.default}:function(){return n};return r.d(t,"a",t),t},r.o=function(n,t){return Object.prototype.hasOwnProperty.call(n,t)},r.p="",r(r.s=8)}({8:function(n,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),Array.prototype.concatAll=function(){var n=[];return this.forEach(function(t){t.forEach(function(t){n.push(t)})}),n};var e=function(n,t){var r=null;return Bacon.fromBinder(function(){r=setInterval(function(){n()},t)}).onValue(function(n){console.log(n)}),r};var o=function(n){return n.map(function(n){return[Math.random(),n]}).sort(function(n,t){return n[0]-t[0]}).map(function(n){return n[1]})},u=function(n,t){return n.children[t].innerText||n.children[t].textContent};t.utils={log:function(n){return function(t){return console.log(n,t),t}},encodeQuery:function(n){return void 0===n?n:Number.isInteger(n)?n:encodeURIComponent(n.trim())},timer:e,intervalTimer:function(n,t){var r;return this.pause=function(){window.clearInterval(r)},this.resume=function(){window.clearInterval(r),r=e(n,t)},this.getId=function(){return r},this.resume(),this},shuffleArray:o,nextItem:function(n,t){var r=n[t%n.length];return r.index=t%n.length,r},randomiseSelection:function(n,t){var r=arguments.length>2&&void 0!==arguments[2]&&arguments[2];return function e(u){var i=o(n);return(u=u.concat(i.map(function(n,e){if(e+u.length<t)return r?--n:n})).filter(function(n){return void 0!==n})).length<t?e(u):u}([])},insertObjectBetweenItems:function(n,t){return n.reduce(function(n,r,e){return n.concat([t,r])},[])},doubledItemsInArray:function(n){return n.reduce(function(n,t,r){return n.concat([t,t])},[])},onlyUnique:function(n,t,r){return r.indexOf(n)===t},sortBy:function(n,t){return"asc"===(arguments.length>2&&void 0!==arguments[2]?arguments[2]:"asc")?n.sort(function(n,r){return parseFloat(n[t])-parseFloat(r[t])}):n.sort(function(n,r){return parseFloat(r[t])-parseFloat(n[t])})},calcItemIndex:function(n,t,r){return(n+r)%t==0?n:n+(n+r)%t},isIterable:function(n){return Array.isArray(n)&&0!==n.length},capitaliseFirst:function(n){return n.charAt(0).toUpperCase()+n.slice(1)},makeSortable:function(n){Array.from(n.querySelectorAll("th")).forEach(function(n){n.addEventListener("click",function(){var t,r,e=n.closest("table"),o=e.querySelector("tbody"),i=e.querySelector("tfoot");Array.from(e.querySelectorAll("tr:nth-child(n+2)")).sort((t=Array.from(n.parentNode.children).indexOf(n),r=this.asc=!this.asc,function(n,e){return o=u(r?n:e,t),i=u(r?e:n,t),""===o||""===i||isNaN(o)||isNaN(i)?o.toString().localeCompare(i):o-i;var o,i})).forEach(function(n){n!==i&&o.appendChild(n)})})})},itemCountReducer:function(n,t){return n[t.toString()]=n[t.toString()]||0,n[t.toString()]++,n}}}});