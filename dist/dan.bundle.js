/*! For license information please see dan.bundle.js.LICENSE.txt */
!function(e){function webpackJsonpCallback(n){for(var r,i,a=n[0],l=n[1],c=n[2],d=0,p=[];d<a.length;d++)i=a[d],Object.prototype.hasOwnProperty.call(t,i)&&t[i]&&p.push(t[i][0]),t[i]=0;for(r in l)Object.prototype.hasOwnProperty.call(l,r)&&(e[r]=l[r]);for(s&&s(n);p.length;)p.shift()();return o.push.apply(o,c||[]),checkDeferredModules()}function checkDeferredModules(){for(var e,n=0;n<o.length;n++){for(var r=o[n],i=!0,a=1;a<r.length;a++){var s=r[a];0!==t[s]&&(i=!1)}i&&(o.splice(n--,1),e=__webpack_require__(__webpack_require__.s=r[0]))}return e}var n={},t={dan:0},o=[];function __webpack_require__(t){if(n[t])return n[t].exports;var o=n[t]={i:t,l:!1,exports:{}};return e[t].call(o.exports,o,o.exports,__webpack_require__),o.l=!0,o.exports}__webpack_require__.m=e,__webpack_require__.c=n,__webpack_require__.d=function(e,n,t){__webpack_require__.o(e,n)||Object.defineProperty(e,n,{enumerable:!0,get:t})},__webpack_require__.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},__webpack_require__.t=function(e,n){if(1&n&&(e=__webpack_require__(e)),8&n)return e;if(4&n&&"object"==typeof e&&e&&e.__esModule)return e;var t=Object.create(null);if(__webpack_require__.r(t),Object.defineProperty(t,"default",{enumerable:!0,value:e}),2&n&&"string"!=typeof e)for(var o in e)__webpack_require__.d(t,o,function(n){return e[n]}.bind(null,o));return t},__webpack_require__.n=function(e){var n=e&&e.__esModule?function getDefault(){return e.default}:function getModuleExports(){return e};return __webpack_require__.d(n,"a",n),n},__webpack_require__.o=function(e,n){return Object.prototype.hasOwnProperty.call(e,n)},__webpack_require__.p="";var r=window.webpackJsonp=window.webpackJsonp||[],i=r.push.bind(r);r.push=webpackJsonpCallback,r=r.slice();for(var a=0;a<r.length;a++)webpackJsonpCallback(r[a]);var s=i;o.push(["./src/dan/dan.js","vendors~admin~app~dan"]),checkDeferredModules()}({"./node_modules/css-loader/dist/cjs.js!./node_modules/sass-loader/dist/cjs.js!./src/dan/style.scss":function(e,n,t){(n=t("./node_modules/css-loader/dist/runtime/api.js")(!1)).push([e.i,"h1 {\n  font-size: 1.5rem; }\n\nh2 {\n  font-size: 1.25rem; }\n\nh3 {\n  font-size: 1rem; }\n\nbody {\n  font-family: 'Open Sans', sans-serif;\n  margin: auto;\n  padding: 1rem;\n  max-width: 800px; }\n\nimg {\n  max-width: 100%;\n  display: block; }\n\nnav ul {\n  columns: 6 100px; }\n\nmain ul {\n  columns: 2 200px; }\n\nli {\n  list-style-type: none; }\n\na:empty {\n  display: none; }\n\nheader {\n  display: flex;\n  align-items: center;\n  justify-content: center; }\n\nsection {\n  padding: 0.5rem;\n  margin: 0.5rem 0; }\n\nbutton {\n  padding: 0.5rem; }\n\n.icon {\n  min-width: 1rem; }\n  .icon span:before {\n    content: '\\2713';\n    display: inline-block;\n    color: white;\n    min-width: 1rem;\n    margin-right: 0.5rem; }\n\n.icon.completed span:before {\n  color: black; }\n\n.skip-link {\n  position: absolute;\n  top: -40px;\n  left: 0;\n  background: #000000;\n  color: white;\n  padding: 8px;\n  z-index: 100; }\n\n.skip-link:focus {\n  top: 0; }\n",""]),e.exports=n},"./src/dan/about-template.html":function(e,n){e.exports='\n<header>\n\n  <nav>\n    <ul data-repeat-link="{{ navigation }}">\n      <li>\n        <a href="#{{ link }}">{{ link }}</a>\n      </li>\n    </ul>\n  </nav>\n  \n</header>\n\n<main id="main">\n\n  <h1>\n    Welcome to site optimisation\n  </h1>\n\n  <h2>Checklist</h2>\n\n  <section>\n    <h3>{{ checklist.header }}</h3>\n    <dl data-repeat-check="{{ checklist.checks }}">\n      <dt>\n        <a href="#" class="task icon">\n          <span>{{ check.term }}</span>\n        </a>\n      </dt>\n      <dd data-repeat-description="{{ check.descriptions }}"><div>{{ description }}</div></dd>\n    </dl>\n  </section>\n\n  <h2>Tools</h2>\n\n  <section>\n    <h3>{{ toollist.header }}</h3>\n    <ul data-repeat-tool="{{ toollist.tools }}">\n      <li>\n        <span>{{ tool.name }}</span><span><a href="{{ tool.link }}">{{ tool.title }}</a></span>\n      </li>\n    </ul>\n  </section>\n\n<h2>Concepts</h2>\n\n  <section>\n    <h3>{{ conceptList.header }}</h3>\n      <dl data-repeat-concept="{{ conceptList.concepts }}">\n        <dt>\n          <a href="#" class="task icon">\n            <span>{{ concept.term }}</span>\n          </a>\n        </dt>\n        <dd data-repeat-description="{{ concept.descriptions }}"><div>{{ description }}</div></dd>\n      </dl>\n  </section>\n\n  <section id="{{ toollist.header }}" style="height: 100px;">\n    some content....\n  </section>\n\n</main>\n\n<footer>\n  <button class="clear">Clear history</button>\n</footer>\n\n'},"./src/dan/about.js":function(e,n,t){"use strict";t.r(n),t.d(n,"about",(function(){return s}));var o=t("./src/ui/helpers/templating.js"),r=t("./src/dan/opt-api.js"),i=t("./src/dan/about-template.html"),a=t.n(i),s=function about(){var e=document.createElement("template");e.innerHTML=a.a;var n=document.querySelector("body");Object(o.renderTemplate)({navigation:r.api.sections.map((function(e){return e.header})),toollist:r.api.toollist,checklist:r.api.checklist,conceptList:r.api.conceptList},e.content,n),Array.from(document.querySelectorAll(".task")).forEach((function(e){var n=localStorage.getItem("checkedTasks")?JSON.parse(localStorage.getItem("checkedTasks")):{keys:[]};n.keys.forEach((function(n){e.querySelector("span")&&n===e.querySelector("span").innerText&&e.classList.add("completed")})),e.addEventListener("click",(function(t){n.keys.push(t.target.innerText),localStorage.setItem("checkedTasks",JSON.stringify(n)),e.classList.add("completed")}))})),document.querySelector(".clear").addEventListener("click",(function(e){localStorage.clear(),location.reload()}))}},"./src/dan/dan.js":function(e,n,t){"use strict";t.r(n);t("./node_modules/babel-polyfill/lib/index.js"),t("./src/dan/style.scss");var o=t("./src/dan/about.js");Object(o.about)()},"./src/dan/opt-api.js":function(e,n,t){"use strict";t.r(n),t.d(n,"api",(function(){return l}));var o=t("./src/dan/opt-constants.js"),r=[{type:o.constants.TOOLS,header:"Early testing",tools:[{name:"Google`s PageSpeed Insights",link:"https://developers.google.com/speed/pagespeed/insights/?hl=en-GB",about:"Lighthouse + Field Data.",title:"page speed"},{name:"Lighthouse",link:"https://developers.google.com/web/tools/lighthouse/",about:"Automated tool for testing performance, etc.",checklist:[{name:"Viewport",links:[{title:"Responsive web design basics",link:"https://web.dev/responsive-web-design-basics/#use-css-media-queries-for-responsiveness",tags:["viewport","media queries","accessibility"]}]}]},{name:"Google's Impact Calculator",link:"https://www.thinkwithgoogle.com/feature/testmysite/",title:"calculator",about:"Enter your domain to test your mobile speed"},{name:"Chrome DevTools",link:"https://www.google.com/chrome/",about:""},{name:"loadCSS",link:"https://github.com/filamentgroup/loadCSS/blob/master/README.md",about:"Load CSS asynchronosuly"}]},{type:o.constants.CHECKS,header:"Checklist",checks:[{term:"Media queries",descriptions:["Design the content to fit on a small screen size first, then expand the screen until a breakpoint becomes necessary."]},{term:"Page size",descriptions:["Chrome DevTools: Select Network, disable cache, reload, and check bytes transferred at the bottom of the screen."]},{term:"Google fonts",descriptions:["Customise your request by family and variants e.g. 'Open Sans'.","Default variants includes only 'regular 400'. Combine fonts into a single request.","Append 'display=swap' to request, or 'font-display: swap;', this will allow text to load with fallback font until the Google Font is available.","Use DNS prefetching.","Use preconnect."]},{term:"JavaScript",descriptions:["Remove unused code","Add the 'defer' attribute to script tag where possible."]},{term:"Accessibility",descriptions:["Add skip link.","Check for landmark elements."]},{term:"CSS",descriptions:["Remove unused styles.","Copy CSS files and use loadCSS pattern to affect non-blocking request."]}]},{type:o.constants.CONCEPTS,header:"Concepts",concepts:[{term:"CRP performance",descriptions:["Critical Rendering Path."]},{term:"Real user monitoring",descriptions:["A passive monitoring technology that records all user interaction with a website or client interacting with a server or cloud-based application. The Navigation Timing API can be used to measure real-world CRP performance. AKA Field Data."],link:"https://developers.google.com/web/fundamentals/performance/critical-rendering-path"},{term:"Critical CSS",descriptions:["A technique that extracts the CSS for above-the-fold content in order to render content to the user as fast as possible."],link:"https://web.dev/extract-critical-css/"},{term:"Bundle splitting and code splitting",descriptions:["Def…"],link:"https://medium.com/hackernoon/the-100-correct-way-to-split-your-chunks-with-webpack-f8a9df5b7758"},{term:"Tree shaking",descriptions:["A form of dead code elimination."],link:"https://developers.google.com/web/fundamentals/performance/optimizing-javascript/tree-shaking"},{term:"RAIL",descriptions:["A user-centric performance model that breaks down the user's experience into key actions: Response, Animation , Idle, Load"],more:[{link:"https://developers.google.com/web/fundamentals/performance/rail#ux",title:"RAIL performance"},{link:"https://www.udacity.com/course/website-performance-optimization--ud884",title:"Udemy: Performance optimisation course"}]}]}],i=r.find((function(e){return e.type===o.constants.TOOLS})),a=r.find((function(e){return e.type===o.constants.CHECKS})),s=r.find((function(e){return e.type===o.constants.CONCEPTS}));i.tools.forEach((function(e){e.link=e.link||"",e.about=e.about||"",e.title=e.title||""}));var l={sections:r,toollist:i,checklist:a,conceptList:s}},"./src/dan/opt-constants.js":function(e,n,t){"use strict";t.r(n),t.d(n,"constants",(function(){return o}));var o={TOOLS:"tools",CHECKS:"checks",CONCEPTS:"concepts"}},"./src/dan/style.scss":function(e,n,t){var o=t("./node_modules/css-loader/dist/cjs.js!./node_modules/sass-loader/dist/cjs.js!./src/dan/style.scss");"string"==typeof o&&(o=[[e.i,o,""]]);var r={hmr:!0,transform:void 0,insertInto:void 0};t("./node_modules/style-loader/lib/addStyles.js")(o,r);o.locals&&(e.exports=o.locals)},"./src/ui/helpers/templating.js":function(e,n,t){"use strict";t.r(n),t.d(n,"renderTemplate",(function(){return r}));var o=o||{};!function(e){e.Context=function(){},e.Context.prototype.import=function(e){return document.importNode(this.doc.querySelector("#"+e).content,!0)};var n,t=/{{\s([\w\.\^]+)\s}}/g;function filterState(e,n){for(var t=n,o=0,r=e.length;o<r;o++){var i=e[o];if(i in t)t=t[i];else{if(!t.hasAttribute||!t.hasAttribute(i))throw i+" is not a valid property of "+JSON.stringify(t);t=t.getAttribute(i)}}return t}function expandString(e,n){var o,r,i,a,s,l=[];for(t.exec("");null!=(o=t.exec(e));)l.push(o);for(var c=l.length-1;c>=0;c--){var d=filterState((o=l[c])[1].split("."),n);r=e,i=o.index,a=o[0].length,s=d,e=r.slice(0,i)+s+r.slice(i+a)}return l.length?e:null}function cloneAllNodes(e){for(var n=[],t=0,o=e.length;t<o;t++)"TEMPLATE"==e[t].nodeName?n.push(e[t].content.cloneNode(!0)):n.push(e[t].cloneNode(!0));return n}function appendChildren(e,n){for(var t=0,o=n.length;t<o;t++)e.appendChild(n[t])}function expand(e,o){if("#text"===e.nodeName)return null!=(_=expandString(e.textContent,o))&&(e.textContent=_),e;Array.isArray(e)||(e=[e]);for(var r=0,i=e.length;r<i;r++){var a=e[r],s=!0;if("#text"===a.nodeName)null!=(_=expandString(a.textContent,o))&&(a.textContent=_);else if(null!=a.attributes)for(var l=a.attributes.length-1;l>=0;l--){var c=a.attributes[l];if(0===c.name.indexOf("data-repeat")){s=!1;var d=c.name.split("-");if(3!==d.length&&4!==d.length)throw"Repeat format is data-repeat-<name>[-<iterName>]. Got "+c.name;for(var p=d[2],u=d[3],h=[];a.firstChild;)h.push(a.removeChild(a.firstChild));var f=[c.value];if(-1!==c.value.indexOf("}}")&&(S=c.value,f=null!=(n=t.exec(S))?n[1].split("."):null),null===f)throw c.value+" doesn't contain an address.";var m=filterState(f,o),b={"^":o};if("[object Array]"===Object.prototype.toString.call(m)){u=u||"i";for(var g=0;g<m.length;g++){var k=cloneAllNodes(h);b[p]=m[g],b[u]=g,expand(k,b),appendChildren(a,k)}}else{u=u||"key";for(var v=Object.keys(m).sort(),_=0;_<v.length;_++){var y=v[_];k=cloneAllNodes(h);b[p]=m[y],b[u]=y,expand(k,b),appendChildren(a,k)}}a.removeAttribute(c.name)}else{if(null!=(_=expandString(c.value,o)))"-"==(p=c.name).charAt(p.length-1)?(a.removeAttribute(c.name),a.setAttribute(c.name.slice(0,-1),_)):c.value=_}}if(s)for(var w=a.firstChild;null!=w;){var C=w.nextSibling;if("TEMPLATE"==w.nodeName){for(var x=expand(w.content.cloneNode(!0),o);x[0].childNodes.length>0;)a.insertBefore(x[0].firstChild,w);a.removeChild(w)}else expand(w,o);w=C}}var S;return e}e.appendChildren=appendChildren,e.expand=expand,e.expandInto=function expandInto(e,n,t){!function replaceChildren(e,n){e.innerHTML="",appendChildren(e,n)}(e,expand(n,t))}}(o);var r=function renderTemplate(e,n,t,r){var i=r||document.importNode(n,!0),a=(new o.Context,o.expand(i,e));o.appendChildren(t,a)}}});
//# sourceMappingURL=dan.bundle.js.map