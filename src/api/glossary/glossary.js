import { plantae } from 'api/glossary/plantae';
import { animalia } from 'api/glossary/animalia';
import { commmon } from 'api/glossary/common';
import { fungi } from 'api/glossary/fungi';
import { lichen } from 'api/glossary/lichen';
import { insecta } from 'api/glossary/insecta';

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
            case 'fungi':
                glossary = [ ...glossary, ...fungi ];
                break;
            case 'lichen':
                glossary = [ ...glossary, ...lichen ];
                break;
            case 'insecta':
                glossary = [ ...glossary, ...insecta ];
                break;
        }
    });

    return glossary;
};