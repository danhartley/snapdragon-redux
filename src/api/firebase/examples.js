import { species } from 'api/species';
import { iconicTaxa, matchTaxon } from 'api/snapdragon/iconic-taxa';

const db = admin.firestore();

const getIconicTaxon = item => {
    return matchTaxon(item.taxonomy, iconicTaxa).value;
};

const getSpecies = () => {
    return species;
};

const addSpecies = function(species) {

    // https://firebase.google.com/docs/firestore/manage-data/add-data

    const documentId = species.id;

    delete species.id;

    species.iconicTaxon = getIconicTaxon(species);
    
    db.collection("_species")
        .doc(documentId)
        .set(species)
        .then(function() {
            console.log("Document successfully written!");
        })
        .catch(function(error) {
            console.error("Error writing document: ", error);
        });
};  

export const examples = {
    getSpecies
}

addSpecies(species.find(s => s.id === 1037909)).then(() => {
    console.log('Holy squirrels!');
});