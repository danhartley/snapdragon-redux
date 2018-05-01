import * as R from 'ramda';

import { utils } from 'utils/utils';
import { store } from 'redux/store';

let root = '';

const formatUrl = (name, root, encode) => {
    let binomial = name;
    if(name.indexOf(' ') > 0) {
        let ranks = name.split(' ');
        binomial = ranks[0] + ' ' + ranks[1];
    }    
    return root + encode(binomial);
};

const fetchWiki = (name, missingMessage) => {
    if(name === undefined) {
        const errorPromise = new Promise((resolve, reject) => {
            resolve(missingMessage)
        });
        return errorPromise;
    }
    
    const url = formatUrl(name, root, utils.encodeQuery);
    const config = { 
        method: 'GET'
    };
    return fetch(url, config)
        .then(json => json.json())
        .then(R.flatten);
};

const cleanEntry = str => {
    let cleaned = str;
    cleaned = str.replace(' ()', '');
    cleaned = str.replace('()', '');
    return cleaned;
};

const formatWiki = (entry) => {
    let html = '';
    if(entry.length === 1) {
        html += `<li><a target="_blank" href="${cleanEntry(entry[0])}" class="underline-link">Wikipedia page</a></li>`;
    }
    if(entry[1]) html += `<li><p>${cleanEntry(entry[1])}</p></li>`;
    if(entry[2])
        if(entry[2].indexOf('https')!== -1)
        html += `<li><a target="_blank" href="${cleanEntry(entry[2])}" class="underline-link">Wikipedia page</a></li>`;
        else html += `<li><p>${entry[2]}</p></li>`;
    if(entry[3]) 
        if(entry[3].indexOf('https')!== -1)
        html += `<li><a target="_blank" href="${cleanEntry(entry[3])}" class="underline-link">Wikipedia page</a></li>`;
        else html += `<li><p>${entry[3]}</p></li>`;
    return html;
};

const renderWiki = (wikiNode, binomial, language) => {
    root = `https://${language}.wikipedia.org/w/api.php?action=opensearch&format=json&origin=*&limit=1&search=`;
    wikiNode.innerHTML = "";        
    fetchWiki(binomial)         
        .then(entry => {
            if(entry[2]) {
                wikiNode.innerHTML = formatWiki(entry.slice(1));
            } else {           
                const genus = binomial.split(' ')[0];                
                fetchWiki(genus).
                    then(genusEntry => {
                        if(genusEntry[2] !== '')
                            wikiNode.innerHTML+= formatWiki(genusEntry.slice(1));
                        else if (language !== 'en') {
                            renderWiki(wikiNode, binomial, 'en');
                        }
                    });
            } 
        });
}

export {
    formatUrl, 
    formatWiki,
    renderWiki
};