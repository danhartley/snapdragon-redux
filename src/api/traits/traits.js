import * as R from 'ramda';

import { getFungiTraits } from 'api/traits/fungi-traits';
import { getBirdTraits } from 'api/traits/bird-traits';
import { getPlantTraits } from 'api/traits/plant-traits';
import { getInsectTraits } from 'api/traits/insect-traits';
import { getMammalTraits } from 'api/traits/mammal-traits';

import { getPollinators } from 'api/snapdragon/relationships';

export const getTraits = (enums, item) => {

    let symbionts;

    let traits = [ 
        ...getBirdTraits(enums), ...getFungiTraits(enums), ...getPlantTraits(enums), 
        ...getInsectTraits(enums), ...getMammalTraits(enums)
    ];

    const addRelationshipTraits = true;

    if(item && addRelationshipTraits) {

        const getPollinationSymbionts = item => {
            const targetSpecies = getPollinators(enums).filter(species => species.speciesA);
            const candidates = targetSpecies.filter(symbiosis => R.contains(item.name, symbiosis.speciesA.names));
            return candidates;
        };

        symbionts = getPollinationSymbionts(item);

        let itemTraits = traits.find(trait => trait.name === item.name);

        if(!itemTraits) {
            itemTraits = { name: item.name, symbionts: [], traits: [] };            
        }
    
        if(symbionts) {
            symbionts.forEach(species => {
    
                species.speciesB.forEach(item => {
                    const name = item.names[0];
                    itemTraits.traits.push({
                        name: species.type[0],
                        value: name,
                        type: 'Mutualism'
                    });
                });
    
                species.speciesB.forEach(item => {
                    const name = item.names[0];
                    itemTraits.symbionts.push({ id: name });
                });            
            });

            traits.push(itemTraits); // only add the traits if there are any...
        }
    }

    return traits;
}