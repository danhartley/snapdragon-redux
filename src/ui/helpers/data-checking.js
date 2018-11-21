import * as R from 'ramda';

import { utils } from 'utils/utils';
import { epithets } from 'api/botanical-latin';
import { taxa } from '../../api/snapdragon/taxa';

const getVernacularName = (item, config, useShortForm = false) => {
    let shortForm;
    if(useShortForm) {
        let englishShortForm = item.names.find(name => name.language === 'en' && name.shortForm);
        englishShortForm = englishShortForm ? englishShortForm.shortForm : undefined;
        let languageSortForm = item.names.find(name => name.language === config.language && name.shortForm);
        languageSortForm = languageSortForm ? languageSortForm.shortForm : undefined;
        shortForm = languageSortForm || englishShortForm;
    }
    if(shortForm) return shortForm;
    const englishNames = item.names.filter(name => name.language === 'en');
    const english = englishNames.length > 0 ? englishNames[0].vernacularName : 'Unknown';
    const names = item.names.filter(name => name.language === config.language);
    const name = names.length > 0 ? names[0].vernacularName : english;
    return utils.capitaliseFirst(name);
};

const getGenusName = binomial => {
    return binomial.split(' ')[0];
};

const getSpeciesName = binomial => {
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
    if(name === '') return;
    const taxon = taxa.find(taxon => taxon.name.toUpperCase() === name.toUpperCase());
    if(!taxon) return;
    return taxon.names.find(name => name.language === language).names;
}

const getTrait = (traits, itemName, name, formatter) => {
    const item = traits.find(t => t.name === itemName);
    if(!item || !item.traits) return '';
    const trait = item.traits.find(t => t.name === name);    
    if(!trait) return '';
    if(!formatter) return trait;
    return formatter(trait);
}

const reducer = (acc, curr) => {
    return acc + curr;
}

const getActiveTrait = (traits, itemName, options) => {
    const traitValues = options.map(option => { 
        const traitName = option.name;
        const formatter = option.formatter;
        return getTrait(traits, itemName, traitName, formatter);
    });
    return traitValues.reduce(reducer, '');
}

const vernacularNamesForItems = (items, config) => {
    let itemNames = items.map(item => item.names);
    let vernaculars = itemNames.map(itemNames => itemNames.filter(name => 
        { return name.language === config.language || name.language === 'en' 
    }));
    vernaculars = vernaculars.map(vernacular => {
        let name = vernacular.find(v => v.language === config.language);
        if(!name) name = vernacular.find(v => v.language === 'en');
        return utils.capitaliseFirst(name.vernacularName);
    });
    return vernaculars;
};

const getVernacularNames = (item, config) => {
    const names = item.names.filter(name => name.language === config.language).map(name => utils.capitaliseAll(name.vernacularName));
    return names;
};

const vernacularNamesForGroups = (items, config, itemGroup) => {
    const groupItems = itemGroup ? items.filter((item, index) => R.contains(index, itemGroup)) : items;
    return groupItems.map(groupItem => {
        return( utils.capitaliseFirst(getVernacularName(groupItem, config)) );
    });
};

const itemNamesForGroups = (items, itemGroup) => {
    const names = itemGroup ? items.filter((item, index) => R.contains(index, itemGroup)).map(item => item.name) : items.map(item => item.name);
    return names;
};

const answersFromList = (list, toInclude, number) => {
    const answers = R.take(number - 1, list.filter(item => item !== toInclude));
    answers.push(toInclude);
    return utils.shuffleArray(answers);
};

const itemContextProperty = (traits, item, propertyName) => {
    const trait = traits.find(trait => trait.name === item.name);
    if(!trait)return '';
    let property = trait.traits.find(c => c.name === propertyName);
    if(!property && trait.context) property = trait.context.find(c => c.name === propertyName);
    if(!property) return '';

    return property.values || property.value;
};

export const itemProperties = {
    getVernacularName,
    getGenusName,
    getSpeciesName,
    latin,
    getTaxonProp,
    getNestedTaxonProp,
    trimLatinName,
    familyVernacularNames,
    getTrait,
    getActiveTrait,
    vernacularNamesForItems,
    vernacularNamesForGroups,
    itemNamesForGroups,
    itemContextProperty,
    getVernacularNames,
    answersFromList
};