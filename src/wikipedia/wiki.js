import{ contains, flatten } from 'ramda';
import { utils } from 'utils/utils';

let root = '';

const formatUrl = (name, root, encode) => {
    let binomial = name;
    if(name.indexOf(' ') > 0) {
        let ranks = name.split(' ');
        binomial = ranks[0] + ' ' + ranks[1];
        if(binomial.indexOf('Speckled wood') > -1) {
            binomial += ' ' + ranks[2];
        }
    }    
    return root + encode(binomial);
};

async function fetchWiki(name, missingMessage) {
    
    if(name === undefined) {
        return missingMessage;  
    }

    const url = formatUrl(name, root, utils.encodeQuery);
    const config = { 
        method: 'GET'
    };
    
    try { 
        const response = await fetch(url, config);
        const data = await response.json();        
        return flatten(data);        
    } catch (e) {
        const errorPromise = new Promise((resolve, reject) => {
            resolve(missingMessage)
        });
        return errorPromise;
    }    
};

const cleanEntry = str => {
    let cleaned = str;
    cleaned = cleaned.replace('( or UK: , US: )', '');
    cleaned = cleaned.replace('(;', '(');
    cleaned = cleaned.replace('()', '');
    cleaned = cleaned.replace('( ', '(');
    cleaned = cleaned.replace('  ', ' ');
    return cleaned;
};

const wikiLink = entry => {
    const src = cleanEntry(entry).replace('.wikipedia', '.m.wikipedia');
    return `<span data-toggle="modal" data-target="#wikiModal" data-src="${src}" class="underline-link">Wiki modal</span>`;    
};

const formatWiki = (entry) => {

    const exceptions = ['Tarragon', 'Apple'];

    if(contains(entry[0], exceptions)) {
        return `<li class="species-card-wiki-entry">'${cleanEntry(entry[2])}'</li>`;
    }

    if(!entry) return '';
    let html = '';
    if(entry.length === 1) {
        html += wikiLink(entry[0]);
    }
    if(entry[1]) html += `<li class="species-card-wiki-entry">'${cleanEntry(entry[1])}'</li>`;
    if(entry[2])
        if(entry[2].indexOf('https')!== -1) html += wikiLink(entry[2]);
        else html += `<li class="species-card-wiki-entry">'${cleanEntry(entry[2])}'</li>`;
    if(entry[3]) 
        if(entry[3].indexOf('https')!== -1)
        html += wikiLink(entry[3]);
        else html += `<li class="species-card-wiki-entry">'${cleanEntry(entry[3])}'</li>`;
    return html;
};

async function renderWiki(wikiNode, item, language) {
    const binomial = item.name;
    const wikiSearchTerm = item.names ? item.names.filter(name => name.language === language).find(name => name.wikiSearchTerm) : null;
    const searchTerm = wikiSearchTerm ? wikiSearchTerm.vernacularName : (item.searchTerms 
                            ? item.searchTerms.filter(term => term.language === language)[0].searchTerm 
                            : binomial);
    root = `https://${language}.m.wikipedia.org/w/api.php?action=opensearch&format=json&origin=*&limit=1&search=`;
    const exceptions = [ 'Artemisia dracunculus', 'Malus domestica', 'Zingiber officinale'];
    if(contains(item.name, exceptions)) {
        root = `https://${language}.m.wikipedia.org/w/api.php?action=opensearch&format=json&origin=*&limit=2&redirects=resolve&search=`;
    }    
    wikiNode.innerHTML = "";

    const entry = await fetchWiki(searchTerm);

    if(entry && entry[2]) {
        wikiNode.innerHTML = formatWiki(entry.slice(1));
    } else {
        if(!binomial) return '';
        const genus = binomial.split(' ')[0];
        const genusEntry = await fetchWiki(genus);
        if(genusEntry[2] !== '')
            wikiNode.innerHTML = formatWiki(genusEntry.slice(1));
        else if (language !== 'en') {
            renderWiki(wikiNode, binomial, 'en');
        }
    }
}

export {
    formatUrl, 
    formatWiki,
    renderWiki
};