import { plantae } from 'api/glossary/plantae';
import { animalia } from 'api/glossary/animalia';
import { commmon } from 'api/glossary/common';

export const getGlossary = requiredGlossaries => {
    
    let glossary = [];

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
        }
    });

    return glossary;
};