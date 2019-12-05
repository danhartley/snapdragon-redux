import { plantae } from 'api/glossary/plantae';
import { animalia } from 'api/glossary/animalia';
import { commmon } from 'api/glossary/common';
import { fungi } from 'api/glossary/fungi';
import { lichen } from 'api/glossary/lichen';
import { insecta } from 'api/glossary/insecta';
import { amphibia } from 'api/glossary/amphibia';
import { aves } from 'api/glossary/aves';

export const getGlossary = requiredGlossaries => {
    
    let glossary = [];

    requiredGlossaries = requiredGlossaries; // need to remove duplicates here

    if(requiredGlossaries) {
        requiredGlossaries.forEach(glossaryName => {
            switch(glossaryName) {
                case 'plantae':
                    glossary = [ ...glossary, ...plantae ];
                    break;
                case 'animalia':
                    glossary = [ ...glossary, ...animalia ];
                    break;
                case 'common':
                    glossary = [ ...glossary, ...commmon ];
                    break;
                case 'fungi':
                    glossary = [ ...glossary, ...fungi ];
                    break;
                case 'lichen':
                    glossary = [ ...glossary, ...lichen ];
                    break;
                case 'insecta':
                    glossary = [ ...glossary, ...insecta ];
                    break;
                case 'amphibia':
                    glossary = [ ...glossary, ...amphibia ];
                    break;
                case 'aves':
                    glossary = [ ...glossary, ...aves ];
                    break;
            }
        });
        if(glossary.length === 0) {
            glossary = [ ...commmon ];
        }
    } else {
        glossary = [ ...glossary, ...commmon, ...plantae, ...animalia, ...amphibia, ...fungi, ...lichen, ...insecta, ...aves ];
    }

    return glossary;
};