import { store } from 'redux/store';
import { DOM } from 'ui/dom';
import { actions } from 'redux/actions/action-creators';
import { renderWiki } from 'wikipedia/wiki';
import { renderFamily } from 'gbif/gbif';

export const renderCardHeader = (collectionName) => {
    DOM.rightHeader.style.backgroundColor = 'rgb(12, 44, 84)';
    DOM.headerTxt.innerHTML = ``;
};

export const renderCard = (collection) => {
    
    const item = collection.items[collection.itemIndex];

    const { layout, config } = store.getState();

    DOM.rightHeader.style.backgroundColor = 'rgb(12, 44, 84)';
    DOM.headerTxt.innerHTML = ``;

    const screen = layout.screens.filter(el => el.name === 'species-card')[0];

    if(!screen) return;

    const template = document.querySelector(`.${screen.template}`);

    const speciesTxt = template.content.querySelector('.js-txt-species');

    speciesTxt.innerHTML = item.name;

    const vernacularNames = template.content.querySelector('.js-txt-species-names');

    const names = item.names.filter(name => name.language === config.language);

    // const listNames = names.map((vernacular, index) => {
    //         if(index < 1) {
    //             return `<li>${vernacular.vernacularName}</li>`;
    //     }
    // }).join('');

    // vernacularNames.innerHTML = `<ul>${listNames}</ul>`;
    vernacularNames.innerHTML = names[0].vernacularName;

    const clone = document.importNode(template.content, true);

    clone.querySelector('button').addEventListener('click', event => {
        actions.boundEndRevision(item);
        event.stopPropagation();
    });

    screen.parent.style.backgroundColor = 'rgb(50, 50, 50)';
    
    screen.parent.innerHTML = '';
    screen.parent.appendChild(clone);

    document.querySelector('.js-species-card-eol-link').addEventListener('click', event => {
        document.querySelector('.js-external-page-title').innerHTML = `EOL ${item.name}`;
        document.querySelector('.js-external-page-body').innerHTML = 
            `<iframe width="100%" height="100%" frameborder="0" src="http://eol.org/pages/${item.id}/overview"><script>document.write()</script></iframe>`;
    });

    setTimeout(()=>{
        const wikiLink = document.querySelector('.js-species-card-wiki span');
        wikiLink.addEventListener('click', event => {
            document.querySelector('.js-external-page-title').innerHTML = `Wikipedia ${item.name}`;
            document.querySelector('.js-external-page-body').innerHTML = 
                `<iframe width="100%" height="100%" frameborder="0" src="${wikiLink.dataset.src}"></iframe>`;
        });
    },1000);    

    const wiki = document.querySelector('.js-species-card-wiki');

    renderWiki(wiki, item.name, config.language);

    const gbif = document.querySelector('.js-card .js-txt-family span');

    renderFamily(gbif, item.name);
    
    // small screens

    if(config.isSmallDevice) {
        DOM.leftGrid.style.display = 'none';
        DOM.rightGrid.style.display = 'grid';
        DOM.headerTxt.innerHTML = collection.name;

        let images = [];
        
        item.imageIndices.forEach(index => {
            const image = item.images[index];
            if(image)
                images.push(image);
        });
        images = images.slice(0,2);

        const speciesImages = document.querySelectorAll('.js-species-card img');
        speciesImages[0].src = images[0];
        speciesImages[1].src = images[1];
    }
};