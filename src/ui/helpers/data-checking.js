import { take } from 'ramda';

import { utils } from 'utils/utils';

const getVernacularName = (item, config, useShortForm = false, namePart = 'vernacularName') => {
    try {
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
        const english = englishNames.length > 0 ? englishNames[0][namePart] : 'Unknown';
        const names = item.names.filter(name => name.language === config.language);
        const name = names.length > 0 ? names[0][namePart] : english;
        const capitalisedNames = name.split(' ');
        let capitalisedName;
        if(config.language === 'fr') {        
            capitalisedName = utils.capitaliseFirst(capitalisedNames.join(' '));
        } else {
            capitalisedName = capitalisedNames.map(name => utils.capitaliseFirst(name)).join(' ');
        }
        return capitalisedName;
    } catch(e) {
        console.error('Failing getting vernacular name for: ', item, 'error: ', e.message);
        return '';
    }
};

const getGenusName = binomial => {
    return binomial.split(' ')[0];
};

const getSpeciesName = binomial => {
    return binomial.split(' ')[1];
};

const getTaxonProp = (taxon, language, prop) => {

    if(!taxon[prop]) return '';

    const propValue = taxon[prop].find(p => p.language === language) ? taxon[prop].find(p => p.language === language) : taxon[prop].find(p => p.language === 'en');

    return propValue || '';
};

const getNestedTaxonProp = (taxon, language, prop1, prop2, index) => {

    if(!taxon || !taxon[prop1]) return '';

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

const familyVernacularNames = (name, language, taxa) => {
    if(name === '') return;
    const taxon = taxa.find(taxon => taxon.name.toUpperCase() === name.toUpperCase());
    if(!taxon) return;
    return taxon.names.find(name => name.language === language).names;
};

const getTrait = (item, name, formatter) => {
    
    if(!item.traits) return '';

    let trait;

    for (let [key, obj] of Object.entries(item.traits)) {
        if(key === name) {
            trait = obj.value;
        }
    }

    if(!trait) return '';
    if(!formatter) return trait;
    return formatter(trait);
}

const reducer = (acc, curr) => {
    return acc + curr;
}

const getActiveTrait = (item, options) => {
    const traitValues = options.map(option => { 
        const traitName = option.name;
        const formatter = option.formatter;
        return getTrait(item, traitName, formatter);
    });
    return traitValues.reduce(reducer, '');
}

const vernacularNamesForItems = (items, config) => {
    let itemNames = items.map(item => item.names);
    let vernaculars = itemNames.map(itemNames => itemNames.filter(name => 
        { return name.language === config.language || name.language === 'en' }));
    if(vernaculars.length === 0) return [];
    vernaculars = vernaculars.map(vernacular => {
        let name = vernacular.find(v => v.language === config.language);
        if(!name) name = vernacular.find(v => v.language === 'en');
        if(!name) return '';
        return utils.capitaliseFirst(name.vernacularName);
    }).filter(v => v !== '');
    return vernaculars;
};

const getVernacularNames = (item, config) => {
    try {
        const names = item.names.filter(name => name.language === config.language).map(name => utils.capitaliseFirst(name.vernacularName));
        return names;
    } catch(e) {
        console.error('Failing getting vernacular names for: ', item);
        return '';
    }
};

const answersFromList = (list, toInclude, number) => {
    const answers = take(number - 1, list.filter(item => item !== toInclude));
    answers.push(toInclude);
    return utils.shuffleArray(answers);
};

const statsReducer = function(obj,elem){
    obj[elem]=obj[elem] || 0;
    obj[elem]++;
    return obj;
};

const getFamilyStats = items => {
    return items.map(item => item.taxonomy.family).reduce(statsReducer,{});
};

const getFileNameFromImageUrl = url => {

    const pattern = /[\w:]+\.(jpe?g|png|gif|svg)/i;

    var filename = pattern.exec(url)[0];

    return filename;    
};

const getRootTraitValue = (traitValue, drop = 'end') => {

    const pattern = /[A-Z]+[^A-Z]*|[^A-Z]+/g;

    const parts = traitValue.match(pattern);

    const dropStarters = ['colour', 'shape'];

    dropStarters.forEach(starter => {
        if(traitValue.toLowerCase().indexOf(starter) > -1) {
            drop = 'start';
        }
    });

    let rootTraitValue = '';

    if(drop === 'start') {
        parts.forEach((part,index) => {
            if(index === parts.length - 1) {
                rootTraitValue += part;
            }
        });
        rootTraitValue = rootTraitValue.charAt(0).toLowerCase() + rootTraitValue.slice(1);
    } else {
        parts.forEach((part,index) => {
            if(index < parts.length - 1) {
                rootTraitValue += part;
            }
        });
    }
    
    return rootTraitValue;
};

const getImageRightsUrl = url => {

    const filename = getFileNameFromImageUrl(url);

    const template = `https://en.wikipedia.org/w/api.php?action=query&prop=imageinfo&iiprop=extmetadata&titles=File:${filename}&format=json`;

    return template;
}

const getLatestScore = (history, score) => {
  
  if(!history || !history.scores || history.scores.length === 0) return score;

  let _score = score.total > 0 ? score : history.scores[history.scores.length - 1];
      if(_score.total === 0) {
        if(history.scores[history.scores.length - 2]) {
          _score = history.scores[history.scores.length - 2];
        }
      }

  return _score;
}

export const itemProperties = {
    getVernacularName,
    getGenusName,
    getSpeciesName,
    getTaxonProp,
    getNestedTaxonProp,
    trimLatinName,
    familyVernacularNames,
    getTrait,
    getActiveTrait,
    vernacularNamesForItems,
    getVernacularNames,
    answersFromList,
    getFamilyStats,
    getFileNameFromImageUrl,
    getImageRightsUrl,
    getRootTraitValue,
    getLatestScore
};