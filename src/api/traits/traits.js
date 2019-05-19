import { getFungiTraits } from 'api/traits/fungi-traits';
import { getBirdTraits } from 'api/traits/bird-traits';
import { getPlantTraits } from 'api/traits/plant-traits';
import { getInsectTraits } from 'api/traits/insect-traits';
import { getMammalTraits } from 'api/traits/mammal-traits';

export const getTraits = (enums) => {

    let traits = [ 
        ...getBirdTraits(enums), ...getFungiTraits(enums), ...getPlantTraits(enums), 
        ...getInsectTraits(enums), ...getMammalTraits(enums)
    ];

    // const addRelationshipTraits = true;

    // if(item && addRelationshipTraits) {

    //     const getPollinationSymbionts = item => {
    //         const traits = getPollinators(enums);
    //         const targetSpecies = traits.filter(species => species.type.filter(t => t === 'Pollination'));
    //         const candidates = targetSpecies.filter(symbiosis => R.contains(item.name, symbiosis.speciesA.names));            
    //         const candidatesB = targetSpecies.map(symbiosis => { 
    //             return symbiosis.speciesB.map(b => {
    //                 if(R.contains(item.name, b.names)) {
    //                     console.log(symbiosis.speciesA.names[0]);
    //                     return symbiosis.speciesA.names[0];
    //                 }
    //             })
    //         });
    //         return candidatesB.filter(b => b[0]);
    //     };

    //     const candidatesB = getPollinationSymbionts(item);

    //     itemTraits = traits.find(trait => trait.name === item.name);

    //     if(!itemTraits) {
    //         itemTraits = { name: item.name, symbionts: [], traits: [] };            
    //     }

    //     candidatesB.forEach(species => {
    //         itemTraits.traits.push({
    //             name: 'Pollination',
    //             value: species[0],
    //             type: 'Mutualism'
    //         });
    //     });
    // }

    return traits;
}