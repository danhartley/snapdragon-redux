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
  
  const shuffleArray = arr => {
    return (arr
      .map(a => [Math.random(), a])
      .sort((a, b) => a[0] - b[0])
      .map(a => a[1]))
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
  
  export const utils = {
    log,
    encodeQuery,
    timer, 
    intervalTimer,
    shuffleArray,
    nextItem,
    randomiseSelection,
    insertObjectBetweenItems,
    doubledItemsInArray
  };