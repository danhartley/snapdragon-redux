export const itemVernacularName = (item, config) => {
    const englishNames = item.names.filter(name => name.language === 'en');
    const english = englishNames.length > 0 ? englishNames[0].vernacularName : 'Unknown';
    const names = item.names.filter(name => name.language === config.language);
    const name = names.length > 0 ? names[0].vernacularName : english;
    return name;
};