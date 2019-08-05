const functions = require('firebase-functions');

const admin = require('firebase-admin');

// const serviceAccount = require('./credentials.json');

admin.initializeApp({
    // credential: admin.credential.cert(serviceAccount),
    // databaseURL: "https://snapdragon-222014.firebaseio.com"
});

const db = admin.firestore();

const speciesTrigger = functions.firestore.document('species/{speciesDoc}');

exports.addSpeciesName = speciesTrigger.onCreate(async(documentSnapshot, context) => {

        const species = documentSnapshot.data();

        const name = species.name;

        console.log(name);

        let ref;
        const refs = await db.collection('species').where('collection_property', '==', 'names').get();
        refs.forEach(r => ref = r.ref);

        return ref.update({
            value: admin.firestore.FieldValue.arrayUnion(name)
        })
        .catch(err => {
            return  console.log('Error adding new name to the species name list', err);
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