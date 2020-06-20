import { utils } from 'utils/utils';
import { enums } from 'admin/api/enums';
import { firebaseConfig } from 'api/firebase/credentials';
import { questions } from 'api/firebase/questions';

firebase.initializeApp(firebaseConfig);

const storage = firebase.storage();

const db = firebase.firestore();

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

    } catch(e) {
      // logAPIError(e, 'getSpeciesWhere');
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

    } catch(e) {
      // logAPIError(e, 'getSpeciesNames');
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
    } catch(e) {
      // logAPIError(e, 'getTaxaNames');
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

    } catch (e) {
      // logAPIError(e, 'getTaxonByName');
      return e;
    }
};

const getAsyncTraitsByNameAndCollection = async (name, collection = 'traits_en', language) => {

    try {
    
    const languageTraits = db.collection(collection).where("name", "==", name);
  
    const traits = await languageTraits.get();
  
    return await traits;
    
    } catch(e) {
      // logAPIError(e, 'getAsyncTraitsByNameAndCollection');
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

const getImage = async image => {

  const storageRef = storage.ref();
  const url = await storageRef.child(`images/${image}`).getDownloadURL();
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

    try {
        docRef = await db.collection('species').add(species);
    } catch(e) {
      // logAPIError(e, 'addSpecies');
    }

    return docRef;
};

const updateSpecies = async species => {

    let speciesDocRef;

    if(species.images) {
        species.images = species.images.map(image => {
            const updatedSpecies = {
                license: image.license || '',
                photographer: image.photographer || '',
                rightsHolder: image.rightsHolder || '',
                source: image.source || '',
                title: image.title || '',
                url: image.url || '',
            };
            if(image.starred) {
                updatedSpecies.starred = image.starred;
            }
            if(image.provider) {
                updatedSpecies.provider = image.provider;
            }
            return updatedSpecies;
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
      // logAPIError(e, 'addTraits');
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
                } else {
                    querySnapshot.forEach(function(doc) {
                        speciesTraitsRef = doc.ref;
                    });
                }

                speciesTraitsRef.update({
                    [type]: firebase.firestore.FieldValue.arrayUnion(trait.update)
                });
            }));
        };

        await readyBatch();

        await batch.commit();

        return 'Relationship added.';

    } catch (e) {
      // logAPIError(e, 'addSpeciesRelationship');
      return e.message;
    }

};

const addPhotos = async (name, photos) => {

    let speciesDocRef;

    const querySnapshot = await db.collection("species").where("name", "==", name).get();
    
    querySnapshot.forEach(function(doc) {
        speciesDocRef = doc.ref;
    });

    try {
        return speciesDocRef.update({
            images: firebase.firestore.FieldValue.arrayUnion(...photos)
        });
    } catch (e) {
      // logAPIError(e, 'addPhotos');
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
          });
        } catch(e) {
          // logAPIError(e, 'deleteSpeciesTraitField unable to obtain reference to species trait');
        }
      
        var removeField = speciesTraitsRef.update({
            [field] : firebase.firestore.FieldValue.delete()
        });
  
        return removeField;

      } catch(e) {
        // logAPIError(e, 'deleteSpeciesTraitField');
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

const getDefinition = (term, glossary, required) => {

    const terms = term.split(',');

    let definitions = [];

    for(let term of terms) {        
        const definition = glossary.find(definition => definition.term.toLowerCase() === term.trim().toLowerCase() || definition.alt && definition.alt.toLowerCase() === term.trim().toLowerCase());
        definitions.push(definition);
    };
    
    return definitions.filter(definition => definition);
};

const getTraitDefinitions = (glossary, required, trait) => {
    
    const traits = glossary.filter(entry => entry.trait).filter(entry => entry.trait.toLowerCase() === trait.toLowerCase());

    return new Promise(resolve => resolve(traits));
};

const addTaxon = async props => {

    const { language, taxon } = props;
  
    let docRef;
  
    try {
        docRef = await db.collection(`taxa_en`).add(taxon);
        return 'Taxon saved.';
    } catch(e) {
      // logAPIError(e, 'addTaxon');
    }
  
    return docRef;
};

const getSpeciesInParallel = async species => {

    try {
        return Promise.all(species.map(sp => {                    
            return firestore.getSpeciesByName(sp.name).then(async item => {
                return await {                         
                    ...item, description: sp.description || '', time: sp.time || 0, questionIds: sp.questionIds, quickId: sp.quickId || ''
                }
            })                    
        }));

    } catch (e) {
      // logAPIError(e, 'getSpeciesInParallel');
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

    } catch (e) {
      // logAPIError(e, 'getSpeciesByNameInParallel');
    }
};

// const getQuestionById = (id, name) => {

//     return new Promise(resolve => resolve(questions.map(q => {
//         if(parseInt(q.id) === parseInt(id)) {
//             return {
//                 ...q,
//                 name: name
//             }
//         }
//     })));
// };


const addCollection = async (collection, user) => {

    if(!user) return;

    const collectionRef = await updateCollection(collection);

    if(collectionRef) return;
    
    collection.user = user;

    let docRef = null;
  
    try {
        docRef = await db.collection('collections').add(collection);
    } catch(e) {
      // logAPIError(e, 'addCollection');
    }
  
    return docRef;
  };

  const updateCollection = async collection => {

    try {
        collection.items = []; // we don't want to update items as we have the info we need in species; the rest we get at runtime

        let docRef = null;

        const querySnapshot = await db.collection("collections").where("name", "==", collection.name).get();
        
        querySnapshot.forEach(function(doc) {
            docRef = doc.ref;
        });

        if(docRef) {
            await docRef.update(collection);
        }

        return { message: 'Success', success : true };

    } catch(e) {
      // logAPIError(e, 'updateCollection');
      return { message: 'Failure', details: e.message, success : false };
    }

};
  
  const getCollectionsWhere = async props => {
  
    const { key, operator, value, limit } = props;
  
    const collectionRef = limit
      ? db.collection('collections').where(key, operator, value).limit(limit)
        : key
            ? db.collection('collections').where(key, operator, value)
            : db.collection('collections');
  
    const querySnapshot = await collectionRef.get();
    
    const docs = [];
  
    querySnapshot.forEach(doc => {
      docs.push(doc.data());
    });
  
    return docs;
  };

  const getCollections = async => {
    return getCollectionsWhere({});
  };

  const addQuestion = async question => {

    let docRef;
  
    try {
        docRef = await db.collection('questions').add(question);
    } catch(e) {
      // logAPIError(e, 'getCollectionsWhere');
    }
  
    return docRef;
  };
  
  const getQuestionsWhere = async props => {
  
    const { key, operator, value } = props;
  
    const collectionRef = key 
            ? db.collection(`questions`).where(key, operator, value)
            : db.collection(`questions`);
  
    const querySnapshot = await collectionRef.get();
    
    const docs = [];
  
    querySnapshot.forEach(doc => {
      docs.push(doc.data());
    });
  
    return docs;
  };

  const addDefinition = async definition => {

    const querySnapshot = await db.collection("glossary").where("term", "==", definition.term).get();

    let docRef;

    if(querySnapshot.empty) {

        try {
            docRef = await db.collection('glossary').add(definition);
        } catch(e) {
          // logAPIError(e, 'getQuestionsWhere');
        }
      
        return docRef;        

    } else {
        throw 'That definition already exists!';
    }

  };
  
  const getDefinitionsWhere = async props => {
  
    const { key, operator, value } = props;
  
    const collectionRef = key 
            ? db.collection(`glossary`).where(key, operator, value)
            : db.collection(`glossary`);

    const querySnapshot = await collectionRef.get();
    
    const docs = [];
  
    querySnapshot.forEach(doc => {
      docs.push({ ...doc.data(), id: doc.id });
    });
  
    return docs;
  };

  const getDefinitionById = async id => {
    return db.collection('glossary').doc(id).get().then(data => {
        return { ...data.data(), id: data.id };
    });
  };

  const getBatchDefinitionsById = async ids => {

    const terms = [];

    try {
        const batch = db.batch();

        const readyBatch = async () => {
            
            return Promise.all(ids.map(async id => {

                const term = await getDefinitionById(id);

                terms.push(term);

            }));
        };

        await readyBatch();

        await batch.commit();

        return terms;

    } catch (e) {
      // logAPIError(e, 'getBatchDefinitionsById');
    }
  }

  const getDefinitionsByTaxa = taxa => {
      return getDefinitionsWhere({
        key: 'taxon',
        operator: 'in', 
        value: taxa
    });
  };

  const updateDefinition = async definition => {

    let docRef;

    const querySnapshot = await db.collection("glossary").where("term", "==", definition.term).get();
    
    querySnapshot.forEach(function(doc) {
        docRef = doc.ref;
    });

    return await docRef.update(definition);
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
    getImage,
    getTraitValues,
    getRandomSpecies,
    getDefinition,
    getSpeciesInParallel,
    getSpeciesByNameInParallel,
    getCollections,
    getCollectionsWhere,
    getQuestionsWhere,
    
    addSpecies,
    addTraits,
    addSpeciesRelationship,
    addPhotos,
    addTaxon,
    addCollection,
    addQuestion,
    addDefinition,
    
    updateSpecies,
    updateSpeciesNames,
    updateCollection,
    updateDefinition,
  
    deleteSpeciesByName,
    deleteSpeciesTraitField,

    getTraitDefinitions,
    // getQuestionById,
    getDefinitionsWhere,
    getDefinitionsByTaxa,
    getDefinitionById,
    getBatchDefinitionsById
};

const getRandomId = () => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let autoId = '';
    for (let i = 0; i < 20; i++) {
        autoId += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return autoId;
};