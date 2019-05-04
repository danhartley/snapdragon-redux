// import * as R from 'ramda';

// import { utils } from 'utils/utils'; 
// import { getSpeciesEpithets } from 'redux/reducers/initial-state/species-state/species-epithets';
// import { getSpeciesCultivars } from 'redux/reducers/initial-state/species-state/species-cultivars';
// import { syndromes } from 'api/snapdragon/syndromes';
// import { getGlossary } from 'api/glossary/glossary';

// export const getCollectionLayouts = (wildcards, collection) => {

//     const getScreens = (wildcards, wildcardName) => {
        
//         const wildcard = wildcards.find(card => card.name === wildcardName);
        
//         if(!wildcard) return;

//         return wildcard.screens;
//     }

//     const epithetScreens = getScreens(wildcards, 'screen-epithets');
//     const cultivarScreens = getScreens(wildcards, 'screen-cultivars');
//     const connectionScreens = getScreens(wildcards, 'screen-connections');
//     const definitionScreens = getScreens(wildcards, 'screen-definitions');

//     const wildcardLayouts = [];
//     const wildcardLayoutsForGroup = [];

//     if(epithetScreens) {

//         const epithets = getSpeciesEpithets([ ...collection.items ]).filter(utils.onlyUnique);

//         if(utils.isIterable(epithets)) {
//             epithets.forEach(epithet => {
//                 const screens = [ epithetScreens[0], epithetScreens[1] ];
//                 const layout = { name: 'screen-epithet-meaning', type: 'test', score: 1, screens, itemIndex: epithet.index, epithet: R.take(1,utils.shuffleArray(epithet.parts))[0]};
//                 wildcardLayouts.push(layout);
//             });
//         }
//     }

//     if(cultivarScreens) {
 
//         const cultivars = getSpeciesCultivars([ ...collection.items ]);

//         if(utils.isIterable(cultivars)) {
//             cultivars.forEach(item => {
//                 let screens = [ cultivarScreens[0], cultivarScreens[1] ];
//                 wildcardLayouts.push({ name: 'screen-cultivar-card', type: 'revision', score: 0, screens, itemIndex: item.index, cultivars: item.cultivars});
//                 screens = [ cultivarScreens[0], cultivarScreens[2] ];
//                 wildcardLayouts.push({ name: 'screen-cultivars-species', type: 'test', score: 1, screens, itemIndex: item.index, cultivars: item.cultivars});
//             });
//         }
//     }

//     const names = [ 'Apis mellifera' ];

//     const insects = [ ...collection.items ].map( (item, i) => {
//         if(R.contains(item.name, names)) {
//             return {
//                 item: item,
//                 traits: R.flatten(syndromes.traits.map(trait => {
//                     const t = trait.keys.filter(key => key.key === 'bee');
//                     return { trait: trait.name, value: t[0].value, description: t[0].description || '' };
//                 })),
//                 index: i
//             };
//         }
//     }).filter(c => c);

//     if(connectionScreens) {

//         if(utils.isIterable(insects)) {
//             insects.forEach(item => {
//                 let screens = [ connectionScreens[0], connectionScreens[1] ];
//                 wildcardLayouts.push({ name: 'screen-traits-card', type: 'revision', score: 0, screens, itemIndex: item.index, insects});
//                 screens = [ connectionScreens[0], connectionScreens[2] ];
//                 wildcardLayouts.push({ name: 'screen-traits', type: 'test', score: 1, screens, itemIndex: item.index, insects});
//             });
//         }
//     }

//     // if(utils.isIterable(wildcardLayouts)) {
//     //     wildcardLayouts.forEach(layout => {
//     //         if(R.contains(layout.itemIndex, collection.itemGroup)) {
//     //             wildcardLayoutsForGroup.push(layout);
//     //         }         
//     //     })        
//     // }

//     // if(definitionScreens) {

//     //     const definitions = utils.shuffleArray(getGlossary(collection.glossary));
//     //     const level1 = definitions.filter(def => def.level === 1);
//     //     level1.forEach((def,index) => {
//     //         if(index < 3 && def) {
//     //             const definitionLayout = { 
//     //                 name: 'screen-definitions', 
//     //                 type: 'test', 
//     //                 score: 1, 
//     //                 screens: [definitionScreens[0], definitionScreens[1]], itemIndex: collection.itemGroup[0], 
//     //                 definition: def,
//     //                 given: 'Given glossary term',
//     //                 requirement: 'Select definition'
//     //             };
//     //             wildcardLayoutsForGroup.push(definitionLayout);
//     //         }
//     //     });        
//     // }

//     return wildcardLayoutsForGroup;
// };