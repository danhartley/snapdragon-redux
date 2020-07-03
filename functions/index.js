import firebase from 'firebase/app';
import 'firebase/admin';
import 'firebase/functions';

const functions = firebase.functions();
const admin = firebase.admin();
const serviceAccount = require('./credentials.json');

admin.initializeApp({
    // credential: admin.credential.cert(serviceAccount),
    // databaseURL: "https://snapdragon-222014.firebaseio.com"
});

const db = admin.firestore();

const speciesTrigger = functions.firestore.document('species/{speciesDoc}');
const taxonTrigger = functions.firestore.document('taxa_en/{taxonDoc}');

exports.addSpeciesName = speciesTrigger.onCreate(async(documentSnapshot, context) => {

        const species = documentSnapshot.data();

        const name = species.name;

        let ref;
        const refs = await db.collection('species').where('collection_property', '==', 'names').get();
        refs.forEach(r => ref = r.ref);

        return ref.update({
            value: admin.firestore.FieldValue.arrayUnion(name)
        })
        .catch(err => {
            return console.log('Error adding new name to the species name list', err);
        });
});

exports.deleteSpeciesName = speciesTrigger.onDelete(async(documentSnapshot, context) => {

        const species = documentSnapshot.data();

        const name = species.name;

        console.log(name);

        let ref;
        const refs = await db.collection('species').where('collection_property', '==', 'names').get();
        refs.forEach(r => ref = r.ref);

        return ref.update({
            value: admin.firestore.FieldValue.arrayRemove(name)
        })
        .catch(err => {
            return  console.log('Error adding new name to the species name list', err);
        });
});

exports.addTaxon = taxonTrigger.onCreate(async(documentSnapshot, context) => {

    const taxon = documentSnapshot.data();

    const name = taxon.name;

    let ref;
    const refs = await db.collection('taxa').where('collection_property', '==', 'names').get();
    refs.forEach(r => ref = r.ref);

    return ref.update({
        value: admin.firestore.FieldValue.arrayUnion(name)
    })
    .catch(e => {
      return console.log('Error adding new name to the taxa name list', e);
    });
});

exports.updateRandomSpeciesList = functions.pubsub.schedule('every day 00:00').onRun(async context => {

    // Check against https://bost.ocks.org/mike/shuffle/ Fisher–Yates Shuffle

    const getRandomInt = max => {
        return Math.floor(Math.random() * Math.floor(max));
    };
  
    const getRandomId = () => {
        const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        let autoId = '';
        for (let i = 0; i < 20; i++) {
            autoId += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        return autoId;
    
    };
    
    const randomSpecies = [];
  
    const random = getRandomInt(2);
  
    const operator = random === 0 ? '>=' : '<=';
  
    const snapshot = await db.collection('species').where(admin.firestore.FieldPath.documentId(), operator, getRandomId()).limit(25).get();
  
    snapshot.forEach(doc => {
        randomSpecies.push(doc.data());
    });
  
    const speciesPropertiesRef = db.collection(`species`).where("collection_property", "==", 'names');
  
    const querySnapshot = await speciesPropertiesRef.get();
    
    const docs = [];
  
    querySnapshot.forEach(doc => {
      docs.push(doc.ref);
    });
  
    const namesRef = docs[0];
  
    return namesRef.update({
        random_species: randomSpecies
    });
});