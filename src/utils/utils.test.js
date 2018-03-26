import { utils } from './utils';

it('shuffleArray should return an non-equal array of the same size', () => {
    const source = [ 1,2,3,4,5,6,7,8,9,10 ];
    const array = utils.shuffleArray(source);
    expect(array).not.toBe(source);
    expect(array.length).toEqual(source.length);
});

it('nextItem() returns the next item from a given starting point', ()=>{
    const species = [{id:1},{id:2},{id:3},{id:4}];
    expect(utils.nextItem(species, 3)).toEqual({id:4, index: 3});
    expect(utils.nextItem(species, 4)).toEqual({id:1, index: 0});
});

it('should return 10 random image indexes including 0', () => {
    const source = [ 1,2,3,4,5,6,7,8,9,10 ];
    const num = 10;
    const zeroBased = true;
    const randoms = utils.randomiseSelection(source, num, zeroBased);
    expect(randoms.length).toEqual(10);
    expect(randoms.filter(num => num === 0).length).toBe(1);
});

it('should return 3 random image indexes', () => {
    const source = [ 1,2,3,4,5,6,7,8,9,10 ];
    const num = 3;
    const zeroBased = true;
    const randoms = utils.randomiseSelection(source, num, zeroBased);
    expect(randoms.length).toEqual(3);
});

it('should return 10 random image indexes including 10', () => {
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

  it('should return required random numbers from a smaller array', () => {
    const source = layouts;
    const num = 50;
    const randoms = utils.randomiseSelection(source, num, false);
    expect(randoms.length).toEqual(num)
});