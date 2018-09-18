import { plantae } from 'api/glossary/plantae';
import { animalia } from 'api/glossary/animalia';
import { commmon } from 'api/glossary/common';
import { fungi } from 'api/glossary/fungi';

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
            case 'fungi':
                glossary = [ ...glossary, ...fungi ];
                break;
        }
    });

    return glossary;
};