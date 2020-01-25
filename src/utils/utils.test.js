import { utils } from 'utils/utils';

test('shuffleArray should return an non-equal array of the same size', () => {
    const source = [ 1,2,3,4,5,6,7,8,9,10 ];
    const array = utils.shuffleArray(source);
    expect(array).not.toBe(source);
    expect(array.length).toEqual(source.length);
});

test('nextItem() returns the next item from a given starting point', ()=>{
    const species = [{id:1},{id:2},{id:3},{id:4}];
    expect(utils.nextItem(species, 3)).toEqual({id:4, index: 3});
    expect(utils.nextItem(species, 4)).toEqual({id:1, index: 0});
});

test('should return 10 random image indexes including 0', () => {
    const source = [ 1,2,3,4,5,6,7,8,9,10 ];
    const num = 10;
    const zeroBased = true;
    const randoms = utils.randomiseSelection(source, num, zeroBased);
    expect(randoms.length).toEqual(10);
    expect(randoms.filter(num => num === 0).length).toBe(1);
});

test('should return 3 random image indexes', () => {
    const source = [ 1,2,3,4,5,6,7,8,9,10 ];
    const num = 3;
    const zeroBased = true;
    const randoms = utils.randomiseSelection(source, num, zeroBased);
    expect(randoms.length).toEqual(3);
});

test('should return 10 random image indexes including 10', () => {
    const source = [ 1,2,3,4,5,6,7,8,9,10 ];
    const num = 10;
    const zeroBased = false;
    const randoms = utils.randomiseSelection(source, num, zeroBased);
    expect(randoms.length).toEqual(10);
    expect(randoms.filter(num => num === 10).length).toBe(1);
});

const layouts = [
    {
      id: 1,
      active: true
    },
    {
      id: 2
    },
    {
      id: 3
    }
  ];

  test('should return required random numbers from a smaller array', () => {
    const source = layouts;
    const num = 50;
    const randoms = utils.randomiseSelection(source, num, false);
    expect(randoms.length).toEqual(num)
  }); 

  test('insertObjectBetweenItems for even items in 4 item array should return array length 8', () =>{
    const items = [{id:1},{id:2},{id:3},{id:4}];
    const insert = {id:0};
    const insertedIntoArray = utils.insertObjectBetweenItems(items, insert);
    expect(insertedIntoArray.length).toEqual(items.length*2);
  });
  
  test('doubledItemsInArray for even items in 4 item array should return array length 8', () =>{
    const items = [{id:1},{id:2},{id:3},{id:4}];
    const doubledArray = utils.doubledItemsInArray(items);
    const doubledItems = [{id:1},{id:1},{id:2},{id:2},{id:3},{id:3},{id:4},{id:4}];
    expect(doubledArray.length).toEqual(items.length*2);
    expect(doubledArray).toEqual(doubledItems);
  });

  test('onlyUnique should ony return unique values from an array', () => {
    const array = ['a', 1, 'a', 2, '1'];
    var unique = array.filter(utils.onlyUnique);
    expect(unique).toEqual(['a', 1, 2, '1']);
  });

  test('sortBy should return array sorted by numeric property ascending', () => {
    const array = [{id:4},{id:1},{id:2},{id:3}];
    const srtd = utils.sortBy(array, 'id');
    expect(srtd).toEqual([{id:1},{id:2},{id:3},{id:4}]);
  });

  test('given initial index and module size should return the next index', () => {
    // [0,1,2]
    // [3,4,5]
    // [6,7,8]
    // [9,10,11]

    let offSet, moduleSize, index, itemIndex;

    offSet = 0;
    moduleSize = 3;
    index = 0;
    itemIndex = utils.calcItemIndex(offSet, moduleSize, index);
    expect(itemIndex).toBe(0);

    offSet = 0;
    moduleSize = 3;
    index = 1;
    itemIndex = utils.calcItemIndex(offSet, moduleSize, index);
    expect(itemIndex).toBe(1);

    offSet = 0;
    moduleSize = 3;
    index = 2;
    itemIndex = utils.calcItemIndex(offSet, moduleSize, index);
    expect(itemIndex).toBe(2);

    offSet = 0;
    moduleSize = 3;
    index = 3;
    itemIndex = utils.calcItemIndex(offSet, moduleSize, index);
    expect(itemIndex).toBe(0);

    offSet = 0;
    moduleSize = 3;
    index = 4;
    itemIndex = utils.calcItemIndex(offSet, moduleSize, index);
    expect(itemIndex).toBe(1);

    offSet = 0;
    moduleSize = 3;
    index = 5;
    itemIndex = utils.calcItemIndex(offSet, moduleSize, index);
    expect(itemIndex).toBe(2);

    offSet = 0;
    moduleSize = 3;
    index = 6;
    itemIndex = utils.calcItemIndex(offSet, moduleSize, index);
    expect(itemIndex).toBe(0);

    offSet = 3;
    moduleSize = 3;
    index = 0;
    itemIndex = utils.calcItemIndex(offSet, moduleSize, index);
    expect(itemIndex).toBe(3);

    offSet = 3;
    moduleSize = 3;
    index = 1;
    itemIndex = utils.calcItemIndex(offSet, moduleSize, index);
    expect(itemIndex).toBe(4);

    offSet = 3;
    moduleSize = 3;
    index = 15;
    itemIndex = utils.calcItemIndex(offSet, moduleSize, index);
    expect(itemIndex).toBe(3);
  });

  test('should tally up pass or fail counts by item id', () => {
    const arr = [ 1,2,2,3,3,3,7 ];
    const ids = arr.reduce(utils.itemCountReducer, {});
    expect(ids).toEqual({1:1,2:2,3:3,7:1});
  });

  test('should capitalise all words', () => {
    const str = 'the small black dog jumped over the lazy moon';
    const strCapialised = 'The Small Black Dog Jumped Over The Lazy Moon';
    expect(utils.capitaliseAll(str)).toEqual(strCapialised);
  });

  test('should return observable months', () => {

    const date = new Date(2019, 2, 14);

    const months = utils.getObservableMonths(date, 3);

    expect(months.map(month => month.index)).toEqual([1,2,3]);
    expect(months.map(month => month.name)).toEqual(['February','March','April']);
  });

  test('should return appropriate camel-cased text for any string', () => {
    let string = 'Leaf blade';
    expect(utils.toCamelCase(string)).toEqual('leafBlade');
    string  = 'behaviour';
    expect(utils.toCamelCase(string)).toEqual('behaviour');
    string = undefined;
    expect(utils.toCamelCase(string)).toEqual('');
  });

  test('should capitalise only first word of any string', () => {
    let string = 'Leaf blade';
    expect(utils.capitaliseFirst(string)).toEqual('Leaf blade');
    string  = 'behaviour';
    expect(utils.capitaliseFirst(string)).toEqual('Behaviour');
  });

  test('should return lower case text from any camel-cased string', () => {
    let string = 'leafBlade';
    expect(utils.fromCamelCase(string)).toEqual('leaf blade');
    string = undefined;
    expect(utils.fromCamelCase(string)).toEqual('');
  });

  test('should return lower case argument for any string, handling objects, nulls and undefined', () => {
    
    let arg;
    
    arg = '';
    expect(utils.parseToLowerCase(arg)).toEqual('');
    arg = 'Dill';
    expect(utils.parseToLowerCase(arg)).toEqual('dill');
    arg = {term:'Dill'};
    expect(utils.parseToLowerCase(arg)).toEqual(arg);
    arg = undefined;
    expect(utils.parseToLowerCase(arg)).toEqual('');
    arg = null;
    expect(utils.parseToLowerCase(arg)).toEqual('');

  });
