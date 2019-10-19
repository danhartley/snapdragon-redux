import { utils } from 'utils/utils';
import { enums } from 'admin/api/enums';
import { store } from 'redux/store';
import { getGlossary } from 'api/glossary/glossary';
import { firebaseConfig } from 'api/firebase/credentials';

firebase.initializeApp(firebaseConfig);

const storage = firebase.storage();

const db = firebase.firestore();

const getCollection = () => {
    return store.getState().collection;
};

const getSpeciesFromCollection = itemName => {
    const collection = getCollection();
    if(!collection || !collection.items) return null;
    return collection.items.find(i => i.name === itemName);
};

const getSpeciesWhere = async props => {

    try {
        const { key, operator, value, limit } = props;

        let speciesRef = limit
                        ? db.collection(`species`).where(key, operator, value).limit(limit)
                        : db.collection(`species`).where(key, operator, value);

        const querySnapshot = await speciesRef.get();

        const docs = [];

        querySnapshot.forEach(doc => {
            docs.push(doc.data());
        });

        return await docs;

    } catch(error) {
        console.error('error for ', props.value, ', error: ', error);
    }
};
  
const getSpecies = async props => {
    const item = await getSpeciesWhere(props);
    return item;
};

const getSpeciesNames = async () => {

    try {
        const speciesPropertiesRef = db.collection(`species`).where("collection_property", "==", 'names');

        const querySnapshot = await speciesPropertiesRef.get();
        
        const docs = [];
    
        querySnapshot.forEach(doc => {
            docs.push(doc.data());
        });
    
        return await docs;

    } catch(error) {
        console.error('error for species names', ', error: ', error);
    }
};

const getTaxaNames = async () => {

    try {
        const taxaPropertiesRef = db.collection(`taxa`).where("collection_property", "==", 'names');

        const querySnapshot = await taxaPropertiesRef.get();
        
        const docs = [];
    
        querySnapshot.forEach(doc => {
            docs.push(doc.data());
        });
    
        return await docs;
    } catch(error) {
        console.error('error for taxa names', ', error: ', error);
    }
};

const getSpeciesByIconicTaxon = async (item, number = 6) => {

    const { iconicTaxon, lichen: isLichen, eolId } = item;

    let querySnapshot, docs = [];

    var species = db.collection("species");

    const random = utils.getRandomInt(2);

    const operator = random === 0 ? '>=' : '<=';

    const randomId = getRandomId();
    
    if(isLichen) {
        querySnapshot = await species.where('lichen', '==', true).where(firebase.firestore.FieldPath.documentId(), operator, randomId).limit(number).get();
    } else {
        querySnapshot = await species.where('iconicTaxon', '==', iconicTaxon.toLowerCase()).where(firebase.firestore.FieldPath.documentId(), operator, randomId).limit(number).get();
    }

    querySnapshot.forEach(doc => {
        docs.push(doc.data());
    });

    return docs;
};

const getSpeciesByName = async (itemName, force = false) => {

    if(!itemName) return '';

    const items = await getSpecies({ key:'name', operator:'==', value:itemName });
    
    // console.log(items);

    return items[0];
};

const getTaxaWhere = async props => {

    const { language, key, operator, value, limit } = props;
  
    const taxaRef = limit
                        ? db.collection(`taxa_en`).where(key, operator, value).limit(limit)
                        : db.collection(`taxa_en`).where(key, operator, value);
  
    const querySnapshot = await taxaRef.get();
  
    const docs = [];
  
    querySnapshot.forEach(doc => {
      docs.push(doc.data());
    });
  
    return await docs;
};
  
const getFamiliesByIconicTaxon = async (iconicTaxonRank, iconicTaxonValue, isLichen, config) => {
    return await getTaxaWhere({ language: config.language, key: 'iconicTaxon', operator: '==', value: iconicTaxonValue, limit: 7 });
};

const getTaxonByName = async (config, name) => {

    try {
                
        let taxon = {};

        const taxaRef = db.collection(`taxa_en`).where('name', '==', name);

        const querySnapshot = await taxaRef.get();
        
        if(querySnapshot.docs.length > 0) {
            querySnapshot.forEach(doc => {
                taxon = doc.data();                                
          });          
        }

        return taxon;

    } catch (error) {
        console.error('error for: ', name, error);
        return error;
    }
};

const getAsyncTraitsByNameAndCollection = async (name, collection = 'traits_en', language) => {

    try {
    
    const languageTraits = db.collection(collection).where("name", "==", name);
  
    const traits = await languageTraits.get();
  
    return await traits;
    
    } catch(error) {
        console.error('error for ', name, ', error: ', error);
    }
};

const getTraitsBySpeciesName = async (name, language = 'en') => {

    let traits;

    const querySnapshot = await getAsyncTraitsByNameAndCollection(name, 'traits_en', language);

    if(!querySnapshot || !querySnapshot.docs) return new Promise(resolve => resolve({}));

    if(querySnapshot.docs.length > 0) {
        querySnapshot.forEach(doc => {
        traits = doc.data();
      });
    }

    return await traits;
};

const getTraitsByTaxonName = async (name, language = 'en') => {

    let traits;

    const querySnapshot = await getAsyncTraitsByNameAndCollection(name, 'taxa_en', language);

    if(!querySnapshot || !querySnapshot.docs) return new Promise(resolve => resolve({}));

    if(querySnapshot.docs.length > 0) {
        querySnapshot.forEach(doc => {
        traits = doc.data();
      });
    }

    return await traits;
};

const getBirdsong = async xcID => {

    const storageRef = storage.ref();
    const url = await storageRef.child(`birdsong/${xcID}.mp3`).getDownloadURL();
    return url;
};

const addSpecies = async species => {

    let docRef;

    if(species.images) {
        species.images = species.images.map(image => {
            return {
                license: image.license || '',
                photographer: image.photographer || '',
                rightsHolder: image.rightsHolder || '',
                source: image.source || '',
                title: image.title || '',
                url: image.url || ''
            }
        });
    }

    // console.log(species.images);

    try {
        docRef = await db.collection('species').add(species);
    } catch(err) {
        console.error("Error writing document: ", err);
    }

    return docRef;
};

const updateSpecies = async species => {

    let speciesDocRef;

    if(species.images) {
        species.images = species.images.map(image => {
            return {
                license: image.license || '',
                photographer: image.photographer || '',
                rightsHolder: image.rightsHolder || '',
                source: image.source || '',
                title: image.title || '',
                url: image.url || ''
            }
        });
    }

    const querySnapshot = await db.collection("species").where("name", "==", species.name).get();
    
    querySnapshot.forEach(function(doc) {
        speciesDocRef = doc.ref;
    });

    return await speciesDocRef.update(species); 

};

const updateSpeciesNames = async (species, names) => {

    let speciesDocRef;

    const querySnapshot = await db.collection("species").where("name", "==", species.name).get();
    
    querySnapshot.forEach(function(doc) {
        speciesDocRef = doc.ref;
    });

    console.log(speciesDocRef);

    return await speciesDocRef.update({names}); 

};

const getTraitValues = async () => {

    const traits = enums;

    return new Promise(resolve => resolve(enums));
};

const deleteSpeciesByName = async name => {

    const speciesRef = db.collection(`species`).where('name', '==', name);

    speciesRef.get().then(function(querySnapshot) {
        querySnapshot.forEach(function(doc) {
        doc.ref.delete();
        });
    });
};

// const addTraits = async props => {

//     const { language, traits } = props;

//     let docRef;

//     try {
//         docRef = await db.collection(`traits_en`).add(traits);
//     } catch(err) {
//         console.error("Error writing document: ", error);
//     }

//     return docRef;
// };

const addTraits = async (name, trait, collection = 'traits_en') => {

    let speciesTraitsRef;

    try {

        const querySnapshot = await db.collection(collection).where("name", "==", name).get();
        
        if(querySnapshot.empty) {
            trait.name = name;
            return await db.collection(collection).add(trait);
        } else {
            querySnapshot.forEach(function(doc) {
                speciesTraitsRef = doc.ref;
            });

            await speciesTraitsRef.update(trait); 

            return 'Update successful';
        }
    } catch(e) {
        return `Update failed. Error ${e.message}.`;
    }
};

const addSpeciesRelationship = async (type, traits) => {

    try {
        const batch = db.batch();

        const readyBatch = async () => {
            
            return Promise.all(traits.map(async trait => {

                let speciesTraitsRef;
        
                const querySnapshot = await db.collection("traits_en").where("name", "==", trait.name).get();

                if(querySnapshot.empty) {
                    trait.name = name;
                    speciesTraitsRef = await db.collection(`traits_en`).add(trait);
                    console.log(speciesTraitsRef);
                } else {
                    querySnapshot.forEach(function(doc) {
                        speciesTraitsRef = doc.ref;
                        console.log(speciesTraitsRef);
                    });
                }

                console.log(speciesTraitsRef);

                speciesTraitsRef.update({
                    [type]: firebase.firestore.FieldValue.arrayUnion(trait.update)
                });
            }));
        };

        await readyBatch();

        console.log('is batch ready');

        await batch.commit();

        return 'Relationship added.';

    } catch (e) {
        return e.message;
    }

};

const addPhotos = async (name, photos) => {

    let speciesDocRef;

    const querySnapshot = await db.collection("species").where("name", "==", name).get();
    
    querySnapshot.forEach(function(doc) {
        speciesDocRef = doc.ref;
    });

    console.log(speciesDocRef);

    try {
        return speciesDocRef.update({
            images: firebase.firestore.FieldValue.arrayUnion(...photos)
        });
    } catch (e) {
        return e.message;
    }

};

const deleteSpeciesTraitField = async (name, field) => {

    let querySnapshot, speciesTraitsRef;
  
    try {
        try {
          querySnapshot = await db.collection("traits_en").where("name", "==", name).get();
      
          querySnapshot.forEach(function(doc) {
              speciesTraitsRef = doc.ref;
            //   console.log(doc.data())
          });
        } catch(err) {
            console.error("Error writing document: ", err);
        }
      
        var removeField = speciesTraitsRef.update({
            [field] : firebase.firestore.FieldValue.delete()
        });
  
        return removeField;

      } catch(err) {
        console.error("Error writing document: ", err);
    }    
  };

const getRandomSpecies = async number => {

    let querySnapshot, docs = [];

    var species = db.collection("species");

    const random = utils.getRandomInt(2);

    const operator = random === 0 ? '>=' : '<=';

    querySnapshot = await species.where(firebase.firestore.FieldPath.documentId(), operator, getRandomId()).limit(number).get();

    querySnapshot.forEach(doc => {
        docs.push(doc.data());
    });

    return docs;
};

const getDefinition = (term, required) => {
    
    const dictionary = getGlossary(required);

    const terms = term.split(',');

    let definitions = [];

    for(let term of terms) {        
        const definition = dictionary.find(definition => definition.term.toLowerCase() === term.trim().toLowerCase() || definition.alt && definition.alt.toLowerCase() === term.trim().toLowerCase());
        definitions.push(definition);
    };
    
    return definitions.filter(definition => definition);
};

const addTaxon = async props => {

    const { language, taxon } = props;
  
    let docRef;
  
    try {
        docRef = await db.collection(`taxa_en`).add(taxon);
        return 'Taxon saved.';
    } catch(error) {
        console.error("Error writing document: ", error);
    }
  
    return docRef;
};

const getSpeciesInParallel = async species => {

    console.log('getSpeciesInParallel called, species returned: ', species);

    try {
        return Promise.all(species.map(sp => {                    
            return firestore.getSpeciesByName(sp.name).then(async item => {
                return await {                         
                    ...item, description: sp.description, time: sp.time
                }
            })                    
        }));

    } catch (error) {
        console.log(`error calling getSpeciesInParallel for species ${name}.`)
        console.log(`species object ${item}`)
        console.error('error message: ', error.message);
    }
};

const getSpeciesByNameInParallel = async itemNames => {
    try {
        return Promise.all(itemNames.map(name => {                    
            return firestore.getSpeciesByName(name).then(async item => {
                return await {                         
                    ...item
                }
            })                    
        }));

    } catch (error) {
        console.log(`${item} problem!!! For ${name}`)
        console.error(error);
    }
};

export const firestore = {
    getSpecies,
    getSpeciesNames,
    getTaxaNames,
    getSpeciesByName,
    getSpeciesByIconicTaxon,
    getFamiliesByIconicTaxon,
    getTaxonByName,
    getTraitsBySpeciesName,
    getTraitsByTaxonName,
    getBirdsong,
    getTraitValues,
    getRandomSpecies,
    getDefinition,
    getSpeciesInParallel,
    getSpeciesByNameInParallel,
    
    addSpecies,
    addTraits,
    addSpeciesRelationship,
    addPhotos,
    addTaxon,
    
    updateSpecies,
    updateSpeciesNames,
  
    deleteSpeciesByName,
    deleteSpeciesTraitField
};

const getRandomId = () => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let autoId = '';
    for (let i = 0; i < 20; i++) {
        autoId += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return autoId;
};