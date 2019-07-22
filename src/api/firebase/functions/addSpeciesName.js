const firestore = require('firestore-db');

exports.addSpeciesName = functions.firestore
    .document('species/{speciesDoc}')
    .onCreate((snap, context) => {

      const newSpecies = snap.data();

      // access a particular field as you would any JS property
      const name = newSpecies.name;

    const speciesPropertiesRef = db.collection(`species`).where("collection_property", "==", 'names');

    speciesPropertiesRef.update({
        db.FieldValue.arrayUnion(name);
    });
    // const querySnapshot = await speciesPropertiesRef.get();
    
    // let arr;

    // querySnapshot.forEach(doc => {
    //     arr = doc.ref;
    // });

    // var washingtonRef = db.collection("cities").doc("DC");

    // washingtonRef.update({
    //     regions: firebase.firestore.FieldValue.arrayUnion("greater_virginia")
    // });
});