(window.webpackJsonplearn_the_planet=window.webpackJsonplearn_the_planet||[]).push([[13],{ZQUD:(e,t,i)=>{"use strict";i("6pDI"),i("octH");var a=a||{};!function(e){e.Context=function(){},e.Context.prototype.import=function(e){return document.importNode(this.doc.querySelector("#"+e).content,!0)};var t,i=/{{\s([\w\.\^]+)\s}}/g;function a(e,t){for(var i=t,a=0,n=e.length;a<n;a++){var r=e[a];if(r in i)i=i[r];else{if(!i.hasAttribute||!i.hasAttribute(r))throw r+" is not a valid property of "+JSON.stringify(i);i=i.getAttribute(r)}}return i}function n(e,t){var n,r,o,s,l,d=[];for(i.exec("");null!=(n=i.exec(e));)d.push(n);for(var c=d.length-1;c>=0;c--){var p=a((n=d[c])[1].split("."),t);r=e,o=n.index,s=n[0].length,l=p,e=r.slice(0,o)+l+r.slice(o+s)}return d.length?e:null}function r(e){for(var t=[],i=0,a=e.length;i<a;i++)"TEMPLATE"==e[i].nodeName?t.push(e[i].content.cloneNode(!0)):t.push(e[i].cloneNode(!0));return t}function o(e,t){for(var i=0,a=t.length;i<a;i++)e.appendChild(t[i])}function s(e,l){if("#text"===e.nodeName)return null!=(A=n(e.textContent,l))&&(e.textContent=A),e;Array.isArray(e)||(e=[e]);for(var d=0,c=e.length;d<c;d++){var p=e[d],m=!0;if("#text"===p.nodeName)null!=(A=n(p.textContent,l))&&(p.textContent=A);else if(null!=p.attributes)for(var u=p.attributes.length-1;u>=0;u--){var h=p.attributes[u];if(0===h.name.indexOf("data-repeat")){m=!1;var f=h.name.split("-");if(3!==f.length&&4!==f.length)throw"Repeat format is data-repeat-<name>[-<iterName>]. Got "+h.name;for(var g=f[2],v=f[3],b=[];p.firstChild;)b.push(p.removeChild(p.firstChild));var k=[h.value];if(-1!==h.value.indexOf("}}")&&(D=h.value,k=null!=(t=i.exec(D))?t[1].split("."):null),null===k)throw h.value+" doesn't contain an address.";var y=a(k,l),w={"^":l};if("[object Array]"===Object.prototype.toString.call(y)){v=v||"i";for(var S=0;S<y.length;S++){var x=r(b);w[g]=y[S],w[v]=S,s(x,w),o(p,x)}}else{v=v||"key";for(var C=Object.keys(y).sort(),A=0;A<C.length;A++){var L=C[A];x=r(b);w[g]=y[L],w[v]=L,s(x,w),o(p,x)}}p.removeAttribute(h.name)}else{if(null!=(A=n(h.value,l)))"-"==(g=h.name).charAt(g.length-1)?(p.removeAttribute(h.name),p.setAttribute(h.name.slice(0,-1),A)):h.value=A}}if(m)for(var T=p.firstChild;null!=T;){var j=T.nextSibling;if("TEMPLATE"==T.nodeName){for(var M=s(T.content.cloneNode(!0),l);M[0].childNodes.length>0;)p.insertBefore(M[0].firstChild,T);p.removeChild(T)}else s(T,l);T=j}}var D;return e}e.appendChildren=o,e.expand=s,e.expandInto=function(e,t,i){!function(e,t){e.innerHTML="",o(e,t)}(e,s(t,i))}}(a);var n=function(e,t,i,n){var r=n||document.importNode(t,!0),o=(new a.Context,a.expand(r,e));a.appendChildren(i,o)},r="tools",o="checks",s="terms",l="process",d=[{type:l,header:"Process checklist",steps:[{term:"A working wireframe that covers major features and use cases",descriptions:["Create the simplest version of the site using few or no colours,  with intended layouts, standard padding, margins, grids, etc.\n        Include all media breakpoints.\n        Include all dependencies that will be needed whether or not they are immediately required e.g. firebase authentication.\n        The site should be semantically correct. If possible have someone familiar with using screen readers use the site.\n        Set up a Lighthouse budget and testing framework preferably on a dedicated machine.\n        Create a Lighthouse dashboard accessible to and understood by everyone.\n        Use realistic data that has been agreed by everyone. Avoid lorem ipsum."]},{term:"Performance budgets and code sizes for new features.",descriptions:["Share responsibility for performance."]}]},{type:r,header:"Tools",tools:[{name:"Google`s PageSpeed Insights",link:"https://developers.google.com/speed/pagespeed/insights/?hl=en-GB",about:"Lighthouse + Field Data.",title:"page speed"},{name:"Lighthouse",link:"https://developers.google.com/web/tools/lighthouse/",about:"Automated tool for testing performance, etc.",checklist:[{name:"Viewport",links:[{title:"Responsive web design basics",link:"https://web.dev/responsive-web-design-basics/#use-css-media-queries-for-responsiveness",tags:["viewport","media queries","accessibility"]}]}]},{name:"Google's Impact Calculator",link:"https://www.thinkwithgoogle.com/feature/testmysite/",title:"calculator",about:"Enter your domain to test your mobile speed"},{name:"Chrome DevTools",link:"https://www.google.com/chrome/",about:""},{name:"loadCSS",link:"https://github.com/filamentgroup/loadCSS/blob/master/README.md",about:"Load CSS asynchronosuly"},{name:"Workspaces",link:"https://developers.google.com/web/tools/chrome-devtools/workspaces/?utm_source=devtools",about:"Save DevTool changes to file"},{name:"Local Overrides",link:"https://developers.google.com/web/updates/2018/01/devtools#overrides",about:"Have DevTool changes persist across page loads"}]},{type:o,header:"Project checklist",checks:[{term:"Intention",descriptions:[""]},{term:"Media queries",descriptions:["Design the content to fit on a small screen size first, then expand the screen until a breakpoint becomes necessary."]},{term:"Set up tooling and testing",descriptions:["Make full use of browser tooling such as Chrome DevTools.\n        Have sufficient screen space to show development tool dashboards and graphics.\n        Use a variety of web browsers.\n        Test against a range of real devices.\n        Have a staging environment that replicates the live site.\n        Test in adverse, but common, scenarios such as on a slow network, low memory, and offline."]},{term:"Google fonts",descriptions:["Customise your request by family and variants e.g. 'Open Sans'.","Default variants includes only 'regular 400'. Combine fonts into a single request.","Append 'display=swap' to request, or 'font-display: swap;', this will allow text to load with fallback font until the Google Font is available.","Use DNS prefetching.","Use preconnect."]},{term:"JavaScript",descriptions:["Remove unused code","Add the 'defer' attribute to script tag where possible."]},{term:"Accessibility",descriptions:["Add skip link.","Check for landmark elements."]},{term:"CSS",descriptions:["Remove unused styles.","Copy CSS files and use loadCSS pattern to affect non-blocking request."]},{term:"JavaScript: PRPL",descriptions:["Push (preload), Render, Pre-cache, Lazy-load"]}]},{type:o,header:"Feature checklist",checks:[{term:"Set up local environment so that the new feature can be created and tested in isolation",descriptions:["e.g. webpack and package configurations, index.html page, etc."]},{term:"Create README.md file",descriptions:["List files used only during initial development and testing, and to support stand-alone deployment.\n        Include instructions on how to run the feature in isolation."]},{term:"Create tests",descriptions:["Test only pure functions.\n        Functions that do not (yet) have tests should be pure.\n        Create local data that can be used before live data is available, and for tests."]},{term:"Minimise moving parts",descriptions:["Keep to a miniumum places where there is logic that is likely to change.\n        List active files (moving parts) in the READ.md.\n        Use a config file for parameters controlled outside of the feature.\n        List files that interact with the DOM, but in a local and temporary way. This code may need to be refactored."]}]},{type:s,header:"Terms",terms:[{term:"CRP performance",descriptions:["Critical Rendering Path."]},{term:"RUM Real user monitoring",descriptions:["A passive monitoring technology that records all user interaction with a website or client interacting with a server or cloud-based application. The Navigation Timing API can be used to measure real-world CRP performance. AKA Field Data."],link:"https://developers.google.com/web/fundamentals/performance/critical-rendering-path"},{term:"Critical CSS",descriptions:["A technique that extracts the CSS for above-the-fold content in order to render content to the user as fast as possible."],link:"https://web.dev/extract-critical-css/"},{term:"Bundle splitting and code splitting",descriptions:["Def…"],link:"https://medium.com/hackernoon/the-100-correct-way-to-split-your-chunks-with-webpack-f8a9df5b7758"},{term:"Tree shaking",descriptions:["A form of dead code elimination."],link:"https://developers.google.com/web/fundamentals/performance/optimizing-javascript/tree-shaking"},{term:"Time to Interactive",descriptions:["How long it takes a page to become fully interactive."],link:"https://web.dev/interactive"},{term:"RAIL",descriptions:["A user-centric performance model that breaks down the user's experience into key actions: Response, Animation , Idle, Load"],more:[{link:"https://developers.google.com/web/fundamentals/performance/rail#ux",title:"RAIL performance"},{link:"https://www.udacity.com/course/website-performance-optimization--ud884",title:"Udemy: Performance optimisation course"}]},{term:"Performance",link:"https://developer.mozilla.org/en-US/docs/Web/API/Performance",descriptions:["The Performance interface provides access to performance-related information for the current page."]},{term:"Critical CSS",link:"https://web.dev/extract-critical-css/",descriptions:["The CSS required for above-the-fold content."]},{term:"JAMstack",link:"https://jamstack.org/",descriptions:["Web development architecture based on client-side JavaScript, reusable APIs, and prebuilt Markup."]},{term:"JAMstack",link:"https://jamstack.wtf/",descriptions:["Web development architecture based on client-side JavaScript, reusable APIs, and prebuilt Markup."]},{term:"SSR Server side rendering",link:"",descriptions:[""]},{term:"ISSR Isomorphic server side rendering",link:"",descriptions:[""]}]}],c=d.find((function(e){return e.type===r})),p=d.find((function(e){return e.type===o&&"Project checklist"===e.header})),m=d.find((function(e){return e.type===o&&"Feature checklist"===e.header})),u=(d.find((function(e){return e.type===s})),d.find((function(e){return e.type===l})));c.tools.forEach((function(e){e.link=e.link||"",e.about=e.about||"",e.title=e.title||""}));var h={sections:d,toollist:c,projectChecklist:p,featureChecklist:m,processList:u},f=i("3n5o"),g=i.n(f);function v(e){return function(e){if(Array.isArray(e))return b(e)}(e)||function(e){if("undefined"!=typeof Symbol&&Symbol.iterator in Object(e))return Array.from(e)}(e)||function(e,t){if(!e)return;if("string"==typeof e)return b(e,t);var i=Object.prototype.toString.call(e).slice(8,-1);"Object"===i&&e.constructor&&(i=e.constructor.name);if("Map"===i||"Set"===i)return Array.from(e);if("Arguments"===i||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(i))return b(e,t)}(e)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function b(e,t){(null==t||t>e.length)&&(t=e.length);for(var i=0,a=new Array(t);i<t;i++)a[i]=e[i];return a}var k=function(){var e=document.createElement("template");e.innerHTML=g();var t=document.querySelector("#main");t.innerHTML="",n({navigation:h.sections.map((function(e){return e.header})),projectChecklist:h.projectChecklist,featureChecklist:h.featureChecklist,termList:h.termList,processList:h.processList},e.content,t),Array.from(document.querySelectorAll(".task button:first-child")).forEach((function(e){var t="checkedTasks";(localStorage.getItem(t)?JSON.parse(localStorage.getItem(t)):{keys:[]}).keys.forEach((function(t){var i=e.querySelector("span");i&&t===i.innerText&&e.classList.add("completed")})),e.addEventListener("click",(function(a){var n=localStorage.getItem(t)?JSON.parse(localStorage.getItem(t)):{keys:[]},r=a.target.innerText.trim();n.keys.find((function(e){return e===r}))?n.keys=n.keys.filter((function(e){return e!==r})):n.keys.push(r),localStorage.setItem(t,JSON.stringify(n)),i(e,"completed")}))})),document.querySelector(".clear").addEventListener("click",(function(e){localStorage.clear(),location.reload()}));var i=function(e,t){e&&(!function(e,t){return!!e&&!!v(e.classList).find((function(e){return e===t}))}(e,t)?e.classList.add(t):e.classList.remove(t))},a=function(e){var t=e.target.dataset.target;Array.from(document.querySelectorAll("dd")).filter((function(e){return e.id!==t})).forEach((function(e){return e.classList.add("hide")})),i(document.getElementById(t),"hide")};document.querySelectorAll("dt").forEach((function(e){return e.addEventListener("click",a)}))},y=i("oisN"),w=i.n(y),S=i("fOm1"),x=i.n(S),C=Array.from(document.querySelectorAll(".js-menu button"));C.forEach((function(e){e.addEventListener("click",(function(e){switch(A(e.target.id),e.target.id){case"tools":!function(){var e=document.createElement("template");e.innerHTML=w();var t=document.querySelector("#main");t.innerHTML="",n({toollist:h.toollist},e.content,t)}();break;case"about":!function(){var e=document.createElement("template");e.innerHTML=x();var t=document.querySelector("#main");t.innerHTML="",n({toollist:h.toollist},e.content,t)}();break;case"checklists":k();break;default:k()}}))}));var A=function(e){document.querySelector("footer button").style.display="about"===e?"none":"inline-block",document.querySelector("header h1").innerHTML="about"===e?"Daniel Hartley":"Checklists",document.querySelector("header div > div").innerHTML="about"===e?"Web developer":"Web development",C.forEach((function(e){return e.classList.remove("active")})),document.querySelector("#".concat(e)).classList.add("active")};document.querySelector("#about").focus(),document.querySelector("#about").click()},SS1E:(e,t,i)=>{(t=i("QjQd")(!1)).push([e.id,'.flex{display:flex;flex-direction:column;align-items:center;justify-content:center}.checklist-container{display:block !important}h1{font-size:2rem;font-weight:normal;margin:0}h1+div{font-size:.7rem;margin-bottom:1rem}h2{font-size:1.5rem;letter-spacing:.1em;font-weight:normal}h3{font-size:1rem}body{font-family:\'Open Sans\', sans-serif;margin:auto;padding:.5rem;max-width:1000px;color:#323232}img{max-width:100%;display:block}nav ul{columns:6 100px}li{margin-left:-1rem;list-style-type:none}li span.goto::before{margin:0 0 0 .25rem;content:\'go to: \'}a{margin:0 .25rem;text-decoration:none;color:#000;border-bottom:1px solid #000}a:empty{display:none}header{border-bottom:1px solid #e1e1e1}section{padding:.5rem;margin:.5rem 0}button{font-family:\'Open Sans\', sans-serif}button:focus,button.active{outline:none;background-color:#323232}hr{border-style:hidden;height:1rem}dd{white-space:pre-line}.checklist dt,.process dt{display:grid;grid-template-columns:auto 3rem;cursor:pointer}.checklist dt:nth-child(4n+1),.process dt:nth-child(4n+1){border-top:1px solid #d2d2d2;border-right:1px solid #d2d2d2}.checklist dt:nth-child(4n+3),.process dt:nth-child(4n+3){border-top:1px solid #d2d2d2;border-left:1px solid #d2d2d2}.checklist dd,.process dd{padding:.5rem 1.5rem}.process dt{display:grid;grid-template-columns:auto 3rem;cursor:pointer}.process dd{margin:.5rem 0 1rem .5rem;line-height:1.8}.task{padding:.5rem}.task button{background-color:transparent;border:none;width:fit-content;font-size:1rem;cursor:pointer;color:#323232;text-align:left}.task button span{color:#323232}.task button:first-child:before,.task button:nth-child(2):before{display:inline-block;border:1px solid lightgray;padding:.25rem .5rem;margin-right:.5rem}.task button:first-child:before{content:\'\\2713\';color:transparent}.task button:nth-child(2):before{content:\'\\25bc\';color:#323232;font-size:.75rem;border:none}.task button.completed:before{color:#141414}.skip-link{position:absolute;top:-40px;left:0;background:#000000;color:#fafafa;padding:8px;z-index:100}.hide{position:absolute;width:1px;height:0px;padding:0;margin:-1px;overflow:hidden;clip:rect(0, 0, 0, 0);white-space:nowrap;border:0}.active{color:red}.skip-link:focus{top:0}.menu-wrapper{position:relative}.menu{margin:0;padding:.25rem .125rem;display:flex;justify-content:center;display:none}.menu li{margin:0 .125rem}.menu button{background-color:#fafafa;display:inline-block;border:1px solid #6e6e6e;padding:.25rem;width:6rem;text-align:center;letter-spacing:.02rem;font-size:.8rem;text-transform:uppercase;cursor:pointer}.menu button.active{outline:none;color:#fafafa;background-color:#323232 !important}footer button{background-color:#fafafa;display:inline-block;border:1px solid #6e6e6e;padding:.25rem;width:6rem;text-align:center;letter-spacing:.02rem;font-size:.8rem;text-transform:uppercase;cursor:pointer}.about-grid{grid-template-columns:1fr 1fr;grid-template:"main main" "programming programming" "design design" "left right";display:grid;column-gap:2rem}.about-grid main{grid-area:main}.about-grid main ul{font-size:.8rem}.about-grid main li span{color:#000}.about-grid .programming{grid-area:programming}.about-grid .design{grid-area:design}.about-grid aside{display:flex;margin-top:1rem;flex-direction:column;gap:.5rem}.about-grid aside.left{grid-area:left;padding:0 1rem 0 0}.about-grid aside.right{grid-area:right;padding:0 0 0 1rem}.about-grid .smaller{font-size:.8em}.about-grid .bigger{font-size:1.1em}.about-grid .skill{margin-top:.5rem;margin:0.75rem 0 0.25rem 0}.about-grid .skill span{font-style:italic;font-size:.8em;border-bottom:1px solid #e1e1e1}nav p span{color:#000;background-color:#fafafa}nav p:first-child{color:#000}.work{font-size:1.4em;color:#000}.legacy div{margin:.25rem 0 0 0}.pitch,.history,.education{background-color:#323232;color:#fafafa}.pitch div,.history div,.education div{font-size:1.1em}.pitch div span,.history div span,.education div span{border-bottom:1px dashed #fafafa}.pitch a,.history a,.education a{color:#fafafa;border-bottom:1px solid #fafafa}.pitch .job,.history .job,.education .job{font-style:italic}.pitch .job-link,.history .job-link,.education .job-link{font-size:.8em}.pitch .indent,.history .indent,.education .indent{margin:0 0 0 .5rem}@media (min-width: 600px){.about-grid{grid-template-columns:1fr 4fr 1fr;grid-template:"left  main         right" "left  programming  right" "left  design       right"}.circle{display:flex;align-items:center;justify-content:center;height:150px;margin:20px;clip-path:circle();background:#e1e1e1}aside.left{border-right:1rem solid #d2d2d2}aside.right{border-left:1rem solid #d2d2d2}}@media (min-width: 769px){.menu{right:.5rem;justify-content:initial;position:absolute}}@media (min-width: 1024px){li{margin-left:initial}.circle{width:150px;shape-outside:circle()}#circle-left{float:left}#circle-right{float:right}#circle-right+ul{text-align:right}#circle-left:hover,#circle-right:hover{color:#fafafa;background-size:contain;background-image:url("https://media-exp1.licdn.com/dms/image/C4E03AQFAu1DpOa0Ygg/profile-displayphoto-shrink_200_200/0?e=1603324800&v=beta&t=XGmhP_mjl1oGKgU1-edbbOaPQzriUDhnrwBMyS1F_xQ")}}@media print{a[href^="http"]:after{content:" (" attr(href) ")";font-size:80%}@page{margin:20mm}.pagebreak{break-after:page}.about-grid{grid-template-columns:1fr 1fr;grid-template:"main main" "programming programming" "design design" "left right"}.circle{display:none}.about-grid aside.left{border-right:none}.about-grid aside.right{border-left:none}.legacy{display:none}.smaller{font-size:1rem !important}.pitch,.history,.education{background-color:#fafafa;color:#323232}.pitch div>span,.history div>span,.education div>span{font-size:1.2em;color:#000}}\n',""]),e.exports=t},fOm1:e=>{e.exports='<section class=about-grid> <aside class=left> <div class=skill> <span>Expertise</span> </div> <div>Web apps</div> <div>Site optimisation</div> <div>Site accessibility</div> <div>Good semantics</div> <div>SPAs & PWAs</div> <div class=skill> <span>Web Fundamentals</span> </div> <div>Modern JS</div> <div>CSS 3.0, Sass</div> <div>HTML5</div> <div class=skill> <span>Preferences</span> </div> <div>Vanilla JavaScript</div> <div>Loose TDD</div> <div class=smaller>Functional programming</div> <div>Modules</div> <div>Service workers</div> <div>REDUX</div> <div class=skill> <span>Development</span> </div> <div>Webpack</div> <div>Git | Github</div> <div>Jest, Sentry</div> <div>Lighthouse</div> <div>Node JS</div> <div class=skill> <span>Libraries</span> </div> <div>GCP | Firestore</div> <div>Materialize CSS</div> <div>Bootstrap 4 & 5</div> <div>React | Hooks</div> <div>Ramda</div> <div class=legacy> <div class=skill> <span>Legacy</span> </div> <div>LESS</div> <div>Grunt</div> <div>jQuery</div> <div>Angular</div> <div class=smaller>Java, C++, C#</div> <div>MongoDB</div> <div class=smaller>Jamsine, Chai, Karma</div> <div>Protractor</div> <div>SQL | SQL Server</div> <div>circleci</div> </div> </aside> <main class=main> <p> Developer with an eye for design. An easy collaborator comfortable leading a team or working alone. </p> <p>Specialist in web apps, optimisation, SPAs and PWAs. Quick to grasp new technologies and ideas. Reliable, diligent and responsible.</p> <hr> <div class=programming> <div id=circle-left class="circle smaller">Programming Q&A</div> <ul> <li><span>What would you do differently on your next project?</span> Use a library that enforces immutablility.</li> <li><span>What are you keen to try out?</span> Jamstack and Netlify.</li> <li><span>Which design pattern has benefited you most?</span> REDUX.</li> <li><span>Where can frameworks most help?</span> DOM interaction.</li> <li><span>What causes you to lose time?</span> State management.</li> <li><span>Do you have a mantra?</span> Learn first, hack second.</li> <li><span>Which programming principle do you find most valuable?</span> Separation of concerns.</li> </ul> </div> <div> <p class=work>Open to offers for roles that require front end programming experience and UI design proficiency.</p> </div> <div class=design> <div id=circle-right class="circle smaller">Design Q&A</div> <ul> <li><span>What\'s your favourite design tool?</span> Pencil and paper.</li> <li><span>What is your first rule of UI design?</span> Make it fast.</li> <li><span>What area of design have you neglected?</span> Accessibility.</li> <li><span>Is it okay to divert from pixel-perfect design?</span> Yes.</li> <li><span>What motivates you to improve or rework a design?</span> Beauty. Saving other people\'s time.</li> <li><span>How many versions of a design do you come up with?</span> Lots! Programme for change.</li> <li><span>Do you enjoy working with users?</span> Yes, feedback is the best tool.</li> </ul> <hr> </div> <section class=pitch> <div> <span>Daniel will</span> </div> <p>Design, implement or improve features using modern front-end technologies.</p> <p>Work with product managers, customer service teams, business analysts, designers, and others developers to solve problems and develop new features.</p> <p>Improve engineering standards, tooling and processes, and encourage others to do so.</p> <p>Review code, receive and offer criticism, pair program, mentor, and raise standards and skills in the team.</p> <div> <span>Daniel has</span> </div> <p>20+ years experience in software development.</p> <p>15+ years experience writing backend code (principally C# and SQL).</p> <p>10+ years experience writing client-side JavaScript.</p> <p>Expertise in building responsive layouts with native JavaScript, CSS, and HTML.</p> <p>Experience in building and debugging complex systems.</p> <p>Command of modern browser technologies, and web standards.</p> <p>Strong UX and design sensibilities.</p> <p>Experience in working on business-facing and consumer-facing products.</p> <p>Focus on optimising page performance, and user accessibility.</p> <p>A generous and supportive spirit.</p> </section> <p>Daniel lives in Lisbon and therefore can commit only to remote roles.</p> <p>Profile: <a target=_blank href=https://www.linkedin.com/in/danhartley/ >linkedin.com/in/danhartley</a></p> <p>Mobile: <span>+351 967 256 941</span></p> <p> Email: <span><a target=_blank href="mailto:danhartleybcn@gmail.com?subject=Web Developer Enquiry">Web Developer Enquiry</a></span> </p> <section class=history> <div> <span>Daniel is</span> </div> <p class=job>Learn the Planet <span class=smaller>educational web app</span></p> <p class=smaller>Founder and factotum</p> <p class=indent>Tireless in finding ways to help users appreciate, understand and learn about species, their behaviour, traits and interactions.</p> <p class=job-link><a target=_blank href=https://www.learn-the-planet.com>https://www.learn-the-planet.com.</a></p> <div> <span>Daniel was</span> </div> <p class=job>Tippstr <span class=smaller></span></p> <p class=smaller>Lead front-end developer</p> <p class=indent>Selected tools and methodologies, set up build, testing and deployment frameworks.</p> <p class=indent>Mentored developers.</p> <p class=indent>Lead several cycles of software updates.</p> <p class=indent>Supported Multi-LCL.</p> <p class=indent>Planned sprints and iterations.</p> <p class=indent>Reviewed code.</p> <p class=job-link>Tippstr is no longer maintained.</p> <p class=job>Seatwave <span class=smaller>secondary ticket sales</span></p> <p class=smaller>Senior developer</p> <p class=indent>Migrated app to service-based architecture.</p> <p class=indent>Oversaw build and deployment.</p> <p class=indent>Built numerous features.</p> <p class=indent>Collaborated on site API.</p> <p class=indent>Built web app version of the site.</p> <p class=job-link>Now part of Ticketmaster<a target=_blank href=https://www.ticketmaster.com/ >https://www.ticketmaster.com/.</a></p> <p class=job>Agencies <span class=smaller>Arc Interactive, Enteraction, et al</span></p> <p class=smaller>Web developer</p> <p class=indent>Developed multiple sites, front and back end, for clients including Malboro, Samsung, Lucazade, Mastercard and HMG.</p> <p class=job>Consultant <span class=smaller>Betfair & Victor Chandler</span></p> <p class=smaller>Web developer</p> <p class=indent>One-off betting-related projects.</p> <p class=job>Advanced Betting Technology <span class=smaller>fixed odds betting services</span></p> <p class=smaller>Team lead and product manager</p> <p class=indent>Designed and built a suite of online applications for the creation and maintenance of a fixed odds betting book on behalf of the first independent bookmaker in Italy.</p> <p class=job>Television production <span class=smaller>BBC, ITV & Channel 4</span></p> <p>Prior to taking an MSc in 2000 Daniel spent 7 years working in television, film and advertising production on dozens of projects and hundreds of hours of television.</p> </section> <section class=education> <div> <span>Daniel also</span> </div> <p>Encourages interaction and knowledge of the natural world.</p> <p>Promotes sustainable ideas and practices.</p> <p>Loves hiking and swimming in the sea.</p> <p>Retired from playing football this year.</p> </section> <p>New ways to learn about the living world and better ways to build web sites are experimented with at <a target=_blank href=https://www.learn-the-planet.com>Learn the Planet.</a></p> <section class=education> <p>MA English Literature <span class=smaller>Edinburgh University</span></p> <p>MSc Object Oriented Software Systems <span class=smaller>City University</span></p> </section> </main> <aside class=right> <div class=skill> <span>Design tools</span> </div> <div>Pencil & paper</div> <div>Browser dev tools</div> <div class=smaller>Balsamiq, Figma, Axure</div> <div class=skill> <span>Best practice</span> </div> <div class=smaller>Think, sketch, walk, talk</div> <div>Responsive UI</div> <div class=smaller>Mobile & Desktop in ||</div> <div class=smaller>Use cases, user-oriented</div> <div class=smaller>Repeatable common elements</div> <div class=smaller>Responsive elements</div> <div class=smaller>Auotomous components</div> <div class=skill> <span>Management</span> </div> <div class=smaller>Stand-ups</div> <div class=smaller>Team leadership</div> <div class=smaller>Project management, JIRA</div> <div class=smaller>Continuous review</div> <div>Mentorship</div> <div class=smaller>Living wireframes</div> <div class=smaller>Code transparency</div> </aside> </section>'},oisN:e=>{e.exports='<section class=toollist> <h2 id="{{ toollist.header }}">{{ toollist.header }}</h2> <dl data-repeat-tool="{{ toollist.tools }}"> <dt class="task icon" data-target="{{ tool.name }}"> <button aria-label="Toggle whether or not {{ tool.name }} task has been completed"> <span>{{ tool.name }}</span> </button> <button aria-label="Toggle visibility of {{ tool.name }} details" data-target="{{ tool.name }}"></button> </dt> <dd class=hide id="{{ tool.name }}"><div>{{ tool.about }}</div></dd> </dl> </section> '},"3n5o":e=>{e.exports=' <section class=process> <h2 id="{{ processList.header }}">{{ processList.header }}</h2> <dl data-repeat-step="{{ processList.steps }}"> <dt class="task icon" data-target="{{ step.term }}"> <button aria-label="Toggle whether or not {{ step.term }} task has been completed"> <span>{{ step.term }}</span> </button> <button aria-label="Toggle visibility of {{ step.term }} details" data-target="{{ step.term }}"></button> </dt> <dd class=hide id="{{ step.term }}" data-repeat-description="{{ step.descriptions }}"><div>{{ description }}</div></dd> </dl> </section> <section class=checklist> <h2 id="{{ featureChecklist.header }}">{{ featureChecklist.header }}</h2> <dl data-repeat-check="{{ featureChecklist.checks }}"> <dt class="task icon" data-target="{{ check.term }}"> <button aria-label="Toggle whether or not {{ check.term }} task has been completed"> <span>{{ check.term }}</span> </button> <button aria-label="Toggle visibility of {{ check.term }} details" data-target="{{ check.term }}"></button> </dt> <dd class=hide id="{{ check.term }}" data-repeat-description="{{ check.descriptions }}"><div>{{ description }}</div></dd> </dl> </section> <section class=checklist> <h2 id="{{ projectChecklist.header }}">{{ projectChecklist.header }}</h2> <dl data-repeat-check="{{ projectChecklist.checks }}"> <dt class="task icon" data-target="{{ check.term }}"> <button aria-label="Toggle whether or not {{ check.term }} task has been completed"> <span>{{ check.term }}</span> </button> <button aria-label="Toggle visibility of {{ check.term }} details" data-target="{{ check.term }}"></button> </dt> <dd class=hide id="{{ check.term }}" data-repeat-description="{{ check.descriptions }}"><div>{{ description }}</div></dd> </dl> </section> '},octH:(e,t,i)=>{var a=i("SS1E");"string"==typeof a&&(a=[[e.id,a,""]]);var n={hmr:!0,transform:void 0,insertInto:void 0};i("aET+")(a,n);a.locals&&(e.exports=a.locals)},"9Mna":(e,t,i)=>{var a={"./log":"+baR"};function n(e){var t=r(e);return i(t)}function r(e){if(!i.o(a,e)){var t=new Error("Cannot find module '"+e+"'");throw t.code="MODULE_NOT_FOUND",t}return a[e]}n.keys=function(){return Object.keys(a)},n.resolve=r,e.exports=n,n.id="9Mna"}},[["ZQUD",216],["OSi6",216]]]);
//# sourceMappingURL=checklist.bundle.js.map