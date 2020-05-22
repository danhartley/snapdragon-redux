import { firestore } from 'api/firebase/firestore';

export const collectionPicker = async (input, listener) => {

    let collections = [];

    collections = await firestore.getCollections();

    const collectionNames = collections.map(collection => collection.name);
  
    const data = {};
    for (var i = 0; i < collectionNames.length; i++) {
      data[collectionNames[i]] = null;
    }

    var instances = M.Autocomplete.init(input, {data});

    input.addEventListener('keyup', async e => {
        if(e.keyCode == 13) {
            const props = { key: 'name', operator: '==', value: input.value };
            const collections = await firestore.getCollectionsWhere(props);
            window.snapdragon.collection = collections[0];
            listener(collections[0]);
        }
    });
};
