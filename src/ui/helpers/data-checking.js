import { utils } from 'utils/utils';
import { epithets } from 'api/botanical-latin';
import { taxa } from '../../api/snapdragon/taxa';

const vernacularName = (item, config) => {
    const englishNames = item.names.filter(name => name.language === 'en');
    const english = englishNames.length > 0 ? englishNames[0].vernacularName : 'Unknown';
    const names = item.names.filter(name => name.language === config.language);
    const name = names.length > 0 ? names[0].vernacularName : english;
    return utils.capitaliseFirst(name);
};

const genusName = binomial => {
    return binomial.split(' ')[0];
};

const speciesName = binomial => {
    return binomial.split(' ')[1];
};

const latin = species => {
    let epithet = epithets.find(e => {        
        const match = e.latin.find(part => part.toUpperCase() === species.toUpperCase());
        return match || '';
    });
    return epithet ? { ...epithet } : '';
};

const getTaxonProp = (taxon, language, prop) => {

    if(!taxon[prop]) return '';

    const propValue = taxon[prop].find(p => p.language === language) ? taxon[prop].find(p => p.language === language) : taxon[prop].find(p => p.language === 'en');

    return propValue || '';
};

const getNestedTaxonProp = (taxon, language, prop1, prop2, index) => {

    if(!taxon[prop1]) return '';

    const prop1Value = taxon[prop1].find(name => name.language === language) ? taxon[prop1].find(name => name.language === language) : taxon[prop1].find(name => name.language === 'en');

    if(!prop1Value) return '';

    const prop2Value = prop1Value[prop2];

    if(!prop2Value) return '';

    const output = index ? prop2Value[index] : prop2Value;

    return output;
}

const trimLatinName = name => {

    let binomial = name;

    if(name.indexOf('.') < 0) {
        binomial = name.split(' ').map((n,i) => {
            return i === 0 ? n.slice(0,1).trim() + '.' : n.trim()
          }).join(' ')
    }
    
    return binomial;
};

const familyVernacularNames = (name, language) => {
    if(name === '') return '';
    return taxa.find(taxon => taxon.name.toUpperCase() === name.toUpperCase()).names.find(name => name.language === language).names;
}

const getTrait = (traits, itemName, name, language) => {
    const item = traits.find(t => t.name === itemName);
    if(!item || !item.traits) return '';
    const trait = language 
        ? item.traits.find(t => t.name === name && t.language === language) 
        : item.traits.find(t => t.name === name);
    if(!trait || !trait.value) return '';
    return trait.value;
}

export const itemProperties = {
    vernacularName,
    genusName,
    speciesName,
    latin,
    getTaxonProp,
    getNestedTaxonProp,
    trimLatinName,
    familyVernacularNames,
    getTrait
};