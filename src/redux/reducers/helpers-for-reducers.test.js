import { helpers } from 'redux/reducers/helpers-for-reducers';

test('notItem should return array with item excluded', () => {
    const collection = { items:[ {name: 'a', id: 1}, {name: 'b', id: 2}, {name: 'c', id: 3}]};
    const item = collection.items[0];
    const newCollection = helpers.notItem(item, collection.items);
    expect(newCollection).not.toContain(item);
});

test('spliceArrays shoudlre return single array with all common valus', () => {
    const objs = [ { id: 1, name: 'a'}, { id: 2, name: 'b'}, { id: 3, name: 'c'}, { id: 4, name: 'd'} ]
    const names = [ 'a', 'b' ];
    expect(helpers.spliceArrays(objs, names)).toEqual([ { id: 1, name: 'a'}, { id: 2, name: 'b'} ]);
});

test('cleanNames should add genus and species names to each item passed in', () =>{
    const collection = { items: [ 
        { name: 'Genus species L', id: 1 }        
    ]};

    const { name, genus, species} = helpers.cleanNames(collection.items)[0];
    expect(name).toBe('Genus species');
    expect(genus).toBe('Genus');
    expect(species).toBe('species');
})