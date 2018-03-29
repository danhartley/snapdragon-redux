import * as R from 'ramda';

import { utils } from 'utils/utils';
import { store } from 'redux/store';

const root = `https://en.wikipedia.org/w/api.php?action=opensearch&format=json&origin=*&limit=1&search=`;

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

const formatWiki = (entry) => {
    let html = '';
    if(entry.length === 1)
        return `<li><i>Species: ${entry[0]}</i></li>`;
    if(entry[0]) html += `<li><p>${entry[0]}</p></li>`;
    if(entry[1]) html += `<li><p>${entry[1]}</p></li>`;
    if(entry[2])
        if(entry[2].indexOf('https')!== -1)
        html += `<li><a target="_blank" href="${entry[2]}">${entry[0]}</a></li>`;
        else html += `<li><p>${entry[2]}</p></li>`;
    if(entry[3]) 
        if(entry[3].indexOf('https')!== -1)
        html += `<li><a target="_blank" href="${entry[3]}">${entry[0]}</a></li>`;
        else html += `<li><p>${entry[3]}</p></li>`;
    return html;
};

const renderWiki = (wikiNode, binomial) => {
    const missingMessage = 'No Wikipedia entry is available for this plant. Sorry!';
    wikiNode.innerHTML = "";        
    fetchWiki(binomial, missingMessage)         
        .then(entry => {            
            if(entry === missingMessage)
            wikiNode.innerHTML = missingMessage;
            else if(entry.length > 3 && entry[2] === '') {                        
                const genus = binomial.split(' ')[0];                
                fetchWiki(genus).
                    then(genusEntry => {
                        wikiNode.innerHTML = `<li><i>Species: ${entry[0]}</i></li>`;
                        wikiNode.innerHTML+= formatWiki(genusEntry.slice(1));
                    });
            }
            else if(entry.length > 3)
                wikiNode.innerHTML = formatWiki(entry.slice(1));
            else {                        
                const genus = binomial.split(' ')[0];                
                fetchWiki(genus).
                    then(genusEntry => {
                        wikiNode.innerHTML = formatWiki(entry);
                        wikiNode.innerHTML+= formatWiki(genusEntry.slice(1));
                    });
            } 
        });
}

export {
    formatUrl, 
    formatWiki,
    renderWiki
};