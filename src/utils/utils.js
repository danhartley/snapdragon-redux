Array.prototype.concatAll = function() {
    const results = [];
  
    this.forEach(function(subArray) {
      subArray.forEach(function(element) {
        results.push(element);
      });
    });
  
    return results;
  };
  
  const log = msg => { 
      return array => {
        console.log(msg, array); 
        return array; 
      }
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
    .onValue(function(element) { console.log(element) });
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
  
  const nextItem = (array, index) => {    
    const item = array[index % array.length];
    item.index = index % array.length;
    return item;
  };

  const insertObjectBetweenItems = (array, insert) => {
    const insertedIntoArray = array.reduce( (acc, curr, currIndex) => {        
        return acc.concat([insert, curr]);
    }, []);
    return insertedIntoArray;
  };

  const doubledItemsInArray = (array) => {
      const doubledArray = array.reduce( (acc, curr, currIndex) => {        
          return acc.concat([curr, curr]);
      }, []);
      return doubledArray;
  };

 const onlyUnique = (value, index, self) => { 
    return self.indexOf(value) === index;
};

const sortBy = (arr, prop, dir = 'asc') => {
  return dir === 'asc' 
    ? arr.sort((a, b) => parseFloat(a[prop]) - parseFloat(b[prop]))
    : arr.sort((a, b) => parseFloat(b[prop]) - parseFloat(a[prop]));
};

const sortAlphabeticallyBy = (arr, prop, dir = 'asc') => {
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

const isIterable = array => {
  return Array.isArray(array) && array.length !== 0;
};

const capitaliseFirst = str => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};

const getCellValue = function(tr, idx){ return tr.children[idx].innerText || tr.children[idx].textContent; }

const comparer = function(idx, asc) { return function(a, b) { return function(v1, v2) {
        return v1 !== '' && v2 !== '' && !isNaN(v1) && !isNaN(v2) ? v1 - v2 : v1.toString().localeCompare(v2);
    }(getCellValue(asc ? a : b, idx), getCellValue(asc ? b : a, idx));
}};

const makeSortable = document => {
  Array.from(document.querySelectorAll('th')).forEach(function(th) { th.addEventListener('click', function() {
          var table = th.closest('table');
          var body = table.querySelector('tbody');
          var footer = table.querySelector('tfoot');
          Array.from(table.querySelectorAll('tr:nth-child(n+2)'))
              .sort(comparer(Array.from(th.parentNode.children).indexOf(th), this.asc = !this.asc))
              .forEach(function(tr) { 
                if(tr !== footer) {
                  body.appendChild(tr);
                }
              });
      })
  });
};

const itemCountReducer = (acc, curr) => {
  acc[curr.toString()] = acc[curr.toString()] || 0;
  acc[curr.toString()]++;
  return acc;
};

export const utils = {
  log,
  encodeQuery,
  timer, 
  intervalTimer,
  shuffleArray,
  nextItem,
  randomiseSelection,
  insertObjectBetweenItems,
  doubledItemsInArray,
  onlyUnique,
  sortBy,
  sortAlphabeticallyBy,
  calcItemIndex,
  isIterable,
  capitaliseFirst,
  makeSortable,
  itemCountReducer
};