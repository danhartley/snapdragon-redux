// import { plantae } from 'api/glossary/plantae';
// import { animalia } from 'api/glossary/animalia';
// import { common } from 'api/glossary/common';
// import { fungi } from 'api/glossary/fungi';
// import { lichen } from 'api/glossary/lichen';
// import { insecta } from 'api/glossary/insecta';
// import { amphibia } from 'api/glossary/amphibia';
// import { aves } from 'api/glossary/aves';

// export const getGlossary = requiredGlossaries => {
    
//     let glossary = [];

//     requiredGlossaries = requiredGlossaries; // need to remove duplicates here

//     if(requiredGlossaries) {
//         requiredGlossaries.forEach(glossaryName => {
//             switch(glossaryName) {
//                 case 'plantae':
//                     glossary = [ ...glossary, ...plantae.map(p => {
//                         p.taxon = 'plantae';
//                         return p;
//                     })];
//                     break;
//                 case 'animalia':
//                     glossary = [ ...glossary, ...animalia.map(p => {
//                         p.taxon = 'animalia';
//                         return p;
//                     })];
//                     break;
//                 case 'common':
//                     glossary = [ ...glossary, ...common.map(p => {
//                         p.taxon = 'common';
//                         return p;
//                     })];
//                     break;
//                 case 'fungi':
//                     glossary = [ ...glossary, ...fungi.map(p => {
//                         p.taxon = 'fungi';
//                         return p;
//                     })];
//                     break;
//                 case 'lichen':
//                     glossary = [ ...glossary, ...lichen.map(p => {
//                         p.taxon = 'lichen';
//                         return p;
//                     })];
//                     break;
//                 case 'insecta':
//                     glossary = [ ...glossary, ...insecta.map(p => {
//                         p.taxon = 'insecta';
//                         return p;
//                     })];
//                     break;
//                 case 'amphibia':
//                     glossary = [ ...glossary, ...amphibia.map(p => {
//                         p.taxon = 'amphibia';
//                         return p;
//                     })];
//                     break;
//                 case 'aves':
//                     glossary = [ ...glossary, ...aves.map(p => {
//                         p.taxon = 'aves';
//                         return p;
//                     })];
//                     break;
//             }
//         });
//         if(glossary.length === 0) {
//             glossary = [ ...glossary, ...common ];
//         }
//     } else {
//         glossary = [ ...glossary, ...common, ...plantae, ...animalia, ...amphibia, ...fungi, ...lichen, ...insecta, ...aves ];
//     }

//     return glossary;
// };