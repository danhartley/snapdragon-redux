const functions = require('firebase-functions');

const admin = require('firebase-admin');

// const serviceAccount = require('./credentials.json');

admin.initializeApp({
    // credential: admin.credential.cert(serviceAccount),
    // databaseURL: "https://snapdragon-222014.firebaseio.com"
});

const db = admin.firestore();

const newSpecies = functions.firestore.document('species/{speciesDoc}');

exports.addSpeciesName = newSpecies.onCreate(async(documentSnapshot, context) => {

        const species = documentSnapshot.data();

        const name = species.name;

        // const ref = db.collection('test').doc('names');

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