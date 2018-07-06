import { epithets } from 'api/botanical-latin';

const vernacularName = (item, config) => {
    const englishNames = item.names.filter(name => name.language === 'en');
    const english = englishNames.length > 0 ? englishNames[0].vernacularName : 'Unknown';
    const names = item.names.filter(name => name.language === config.language);
    const name = names.length > 0 ? names[0].vernacularName : english;
    return name;
};

const genusName = binomial => {
    return binomial.split(' ')[0];
};

const speciesName = binomial => {
    return binomial.split(' ')[1];
};

const latin = species => {
    const epithet = epithets.find(item => {        
        const match = item.latin.find(part => part === species);
        return match || '';
    });
    return epithet || '';
};

export const itemProperties = {
    vernacularName,
    genusName,
    speciesName,
    latin
}