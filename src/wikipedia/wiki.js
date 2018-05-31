import { flatten } from 'ramda';

import { utils } from 'utils/utils';

let root = '';

const formatUrl = (name, root, encode) => {
    let binomial = name;
    if(name.indexOf(' ') > 0) {
        let ranks = name.split(' ');
        binomial = ranks[0] + ' ' + ranks[1];
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
    cleaned = str.replace(' ()', '');
    cleaned = str.replace('()', '');
    return cleaned;
};

const wikiLink = entry => {
    const src = cleanEntry(entry).replace('.wikipedia', '.m.wikipedia');
    return `<li class="species-card-wiki-page"><span data-toggle="modal" data-target="#externalPageModal" data-src="${src}" class="underline-link">Wikipedia page</span></li>`;    
};

const formatWiki = (entry) => {
    let html = '';
    if(entry.length === 1) {
        html += wikiLink(entry[0]);
    }
    if(entry[1]) html += `<li class="species-card-wiki-entry"><p>${cleanEntry(entry[1])}</p></li>`;
    if(entry[2])
        if(entry[2].indexOf('https')!== -1) html += wikiLink(entry[2]);
        else html += `<li class="species-card-wiki-entry"><p>${entry[2]}</p></li>`;
    if(entry[3]) 
        if(entry[3].indexOf('https')!== -1)
        html += wikiLink(entry[3]);
        else html += `<li class="species-card-wiki-entry"><p>${entry[3]}</p></li>`;
    return html;
};

async function renderWiki(wikiNode, item, language) {
    const binomial = item.name;
    const searchTerm = item.searchTerms 
                            ? item.searchTerms.filter(term => term.language === language)[0].searchTerm 
                            : binomial;
    root = `https://${language}.m.wikipedia.org/w/api.php?action=opensearch&format=json&origin=*&limit=1&search=`;
    wikiNode.innerHTML = "";

    const entry = await fetchWiki(searchTerm);

    if(entry[2]) {
        wikiNode.innerHTML = formatWiki(entry.slice(1));
    } else {
        const genus = binomial.split(' ')[0];
        const genusEntry = await fetchWiki(genus);
        if(genusEntry[2] !== '')
            wikiNode.innerHTML+= formatWiki(genusEntry.slice(1));
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