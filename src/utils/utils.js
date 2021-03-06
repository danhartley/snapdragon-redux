Array.prototype.concatAll = function() {
    const results = [];
  
    this.forEach(function(subArray) {
      subArray.forEach(function(element) {
        results.push(element);
      });
    });
  
    return results;
  };
  
  const encodeQuery = q => { 
    if(q === undefined) return q;
    if(Number.isInteger(q)) return q;
    return encodeURIComponent(q.trim()) 
  };
  
  const timer = function (sink, delay) {
    let id = null;
    Bacon.fromBinder(function() {
      id = setInterval(function() {
          sink();
        }, delay);    
      })
    .onValue(function(element) { 
      //
     });
    return id;
  };
  
  function intervalTimer (sink, delay) {
    var timerId;
  
    this.pause = function() {
        window.clearInterval(timerId);
    };
  
    this.resume = function() {
        window.clearInterval(timerId);
        timerId = timer(sink, delay);
    };
  
    this.getId = function (){
      return timerId;
    }
  
    this.resume();
  
    return this;
  };
  
  const shuffleArray = array => {

    // Check against https://bost.ocks.org/mike/shuffle/ Fisher–Yates Shuffle

    if(!array || array.length === 0) return;

    var currentIndex = array.length, temporaryValue, randomIndex;

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

    return [ ...array ];

    // return (arr
    //   .map(a => [Math.random(), a])
    //   .sort((a, b) => a[0] - b[0])
    //   .map(a => a[1]))
  };
  
  const randomiseSelection = (source, required, zeroBased = false) => {
    const r = selection => {
      const arr = shuffleArray(source);
      selection = selection.concat(arr.map((item, index) => {
        if(index + selection.length < required) {
          return zeroBased ? --item : item;
        }      
      })).filter(item => item !== undefined);
      return selection.length < required ? r(selection) : selection;
    }
    return r([]);
  };

 const onlyUnique = (value, index, self) => { 
    return self.indexOf(value) === index;
};

const sortBy = (arr, prop, dir = 'asc') => {
  return dir === 'asc' 
    ? arr.sort((a, b) => parseFloat(a[prop]) - parseFloat(b[prop]))
    : arr.sort((a, b) => parseFloat(b[prop]) - parseFloat(a[prop]));  
};

const sortAlphabeticallyBy = (arr, prop) => {
  arr.sort(function(a, b){
    if(a[prop] < b[prop]) return -1;
    if(a[prop] > b[prop]) return 1;
    return 0;
  });
  return arr;
};

const calcItemIndex = (offSet, moduleSize, index) => {
  const itemIndex = 
        (offSet + index) % moduleSize === 0 
          ? offSet
          : offSet + (offSet + index) % moduleSize;
  return itemIndex;
};

const capitaliseFirst = str => {
  const text = str.substr(0, 1).toUpperCase() + str.substr(1).toLowerCase();
  return text;
};

const capitaliseAll = str => {
  const text = str.toLowerCase()
    .split(' ')
    .map((s) => s.charAt(0).toUpperCase() + s.substring(1))
    .join(' ');
  return text;
};

const getCellValue = function(tr, idx, headerSortIndex, wide){
  let children = tr.children;
  if(!wide) {
    children = [...tr.children].filter(child => [...child.classList].join('').indexOf('wide-screen') === -1);
  }
  const valueToSortOn = 
    children[idx].dataset.snapIndex ||
    (children[idx].querySelector('button') && children[idx].querySelector('button').dataset.vernacularName) ||
    (children[idx].querySelector('button') && children[idx].querySelector('button').dataset.name) ||
    children[idx].children[headerSortIndex].innerText ||
    children[idx].innerText || 
    children[idx].classList[0] || 
    children[idx].textContent;
  return valueToSortOn;
}

const comparer = function(idx, asc, headerSortIndex, wide) { return function(a, b) { return function(v1, v2) {
      const isNumericallyComparible = v1 !== '' && v2 !== '' && !isNaN(v1) && !isNaN(v2);
      return isNumericallyComparible ? v1 - v2 : v1.toString().localeCompare(v2.toString());
    }(getCellValue(asc ? a : b, idx, headerSortIndex, wide), getCellValue(asc ? b : a, idx, headerSortIndex, wide));
}};

// https://stackoverflow.com/questions/14267781/sorting-html-table-with-javascript/14268260

const makeSortable = (document, callback, wide) => {

  Array.from(document.querySelectorAll('th > span')).forEach(function(sp) { sp.addEventListener('click', function() {

          const headerSortIndex = this.innerText.toUpperCase() === 'ORDER' ? 1 : 0;

          const names = [];
          var th = this.parentElement;
          if(th.classList[0] === 'not-sortable') return;
          var table = th.closest('table');
          var tbody = table.querySelector('tbody');
          var footer = table.querySelector('tfoot');          

          snapLog('Array.from(tbody.querySelectorAll("tr")): ', Array.from(tbody.querySelectorAll('tr')));

          Array.from(tbody.querySelectorAll('tr'))
              .sort(comparer(Array.from(th.parentNode.children).indexOf(th), this.asc = !this.asc, headerSortIndex, wide))
              .forEach(function(tr) { 
                if(tr !== footer) {
                  tbody.appendChild(tr);
                  names.push(tr.cells[0].id);
                }
              });        

            callback(names);
      })
  });
};

const flatten = array => {
  const flattenedArray = array.reduce(
    function(accumulator, currentValue) {
      return accumulator.concat(currentValue);
    },
    []
  );
  return flattenedArray;
}

const getObservableMonths = (date, span = 3) => {

  const daysAway = (when, days) => {
      let dateFromDays = date;
      const direction = when === 'future' ? 1 : -1;
      dateFromDays.setDate(dateFromDays.getDate() + direction * days);
      return dateFromDays;
  };

  const startMonth = daysAway('past', 30).getMonth();
  const thisMonth = date.getMonth() + 1;
  const endMonth = daysAway('future', 30).getMonth() + 1;

  const getMonthName = month => {    
    const exampleDate = new Date(2000, month, 1);
    const name = exampleDate.toLocaleString('en-uk', { month: 'long' });
    return name;
  }

  const months = [ 
      { index: startMonth, name: getMonthName(startMonth)}, 
      { index: thisMonth, name: getMonthName(thisMonth)}, 
      { index: endMonth, name: getMonthName(endMonth)}
    ];

  return months;
};

const getRandomInt = max => {
  return Math.floor(Math.random() * Math.floor(max));
}

const createSessionToken = () => {

  // uuidv4

  // https://stackoverflow.com/questions/105034/create-guid-uuid-in-javascript#answer-2117523

  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
}

const getRandomObjectProperty = obj => {
  if(Object.keys(obj).length === 0 && obj.constructor === Object) return {};
  const keys = Object.keys(obj);
  const index = Math.floor(Math.random() * keys.length);
  const key = keys[index];
	return { key, value: obj[key] };
};

const toCamelCase = sentenceCase => {
  if(sentenceCase === undefined) return '';
  var out = "";
  sentenceCase.split(" ").forEach(function (el, idx) {
      var add = el.toLowerCase();
      out += (idx === 0 ? add : add[0].toUpperCase() + add.slice(1));
  });
  return out;
};

const fromCamelCase = str => {
  if(str === undefined) return '';
  return str.replace(/([a-z])([A-Z])/g, '$1 $2').toLowerCase();
};

const parseToLowerCase = value => {
  if(value === undefined || value === null) return '';
  else if(typeof value === 'object') return value;
  else return !!value ? value.toLowerCase() : '';
};

const hasClass = (elem, className) => {
  if(!elem) return false;
    const classArray = [ ...elem.classList ];
    const isTrue = classArray.find(c => c === className);
    return !!isTrue;
};

const toggleClass = (elem, className) => {
  if(!elem) return;
  hasClass(elem, className) 
    ? elem.classList.remove(className)
    : elem.classList.add(className);
};

const removeClass = (elem, className) => {
  if(hasClass(elem, className)) {
      elem.classList.forEach(c => {
          if(c === className) {
              elem.classList.remove(c);
          }
      });
  }
};

const convertTraitKeyToUnitKey = traitKey => {
  let conversion = traitKey.replace('_', ' ');
  return toCamelCase(conversion);
};

export const utils = {
  encodeQuery,
  timer, 
  shuffleArray,
  randomiseSelection,
  onlyUnique,
  sortBy,
  sortAlphabeticallyBy,
  calcItemIndex,
  capitaliseFirst,
  capitaliseAll,
  makeSortable,
  flatten,
  getObservableMonths,
  getRandomInt,
  createSessionToken,
  getRandomObjectProperty,
  toCamelCase,
  fromCamelCase,
  parseToLowerCase,
  hasClass,
  removeClass,
  toggleClass,
  convertTraitKeyToUnitKey
};