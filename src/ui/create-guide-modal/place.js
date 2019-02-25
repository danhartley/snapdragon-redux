import { utils } from 'utils/utils';
import { renderTemplate } from 'ui/helpers/templating';
import placeTemplate from 'ui/create-guide-modal/place-list-template.html';
import { rbEventHandler } from 'ui/create-guide-modal/common/rb-event-handler';

export const renderPlace = (modal, config, collections, createGuide) => {

    const guideTxt = modal.querySelector('.guide-text');
    const chosen = modal.querySelector('.js-chosen span:nth-child(2)');
    const saveYourChangesBtn = createGuide.save(config, chosen, 'PLACE');

    const location = config.guide.locationType === 'auto' 
            ? config.guide.autoLocation 
            : config.guide.userLocation;
    
    let place = [];

    if(config.guide.iconicTaxa && config.guide.iconicTaxa.length !== 0) {
        collections.forEach(collection => {
            collection.iconicTaxa.forEach(iconicTaxon => {
                config.guide.iconicTaxa.forEach(taxon => {
                    if(taxon === iconicTaxon) {
                        if(!place.includes(collection)) {
                            place.push(collection);
                        }                        
                    }
                })
            })
        })
    } else {
        place = utils.sortBy(collections.filter(c => c.type === 'species'), 'id', 'asc');
    }

    if(config.guide.place) {
        setTimeout(() => {
            const preSelectedCollection = modal.querySelector(`#id-${config.guide.place.id}`).querySelectorAll('span')[1];
            if(preSelectedCollection) {
                preSelectedCollection.click();                
            }
        });
        chosen.innerHTML = config.guide.place.name;
    } 

    if(location) {
        place.find(e => e.id === 1).name = `${location}`;
        guideTxt.innerHTML = 'Choose a place based on your location';
    }

    const template = document.createElement('template');
    template.innerHTML = placeTemplate;
    const parent = modal.querySelector('.js-actions');
    
    renderTemplate({ place }, template.content, parent);
    
    modal.querySelectorAll('.btn.btn-secondary div').forEach(type => type.addEventListener('click', event => {
        const target = rbEventHandler(modal, event);
        const placeId = parseInt(target.id.slice(3));
        if(placeId !== (config.guide.place && config.guide.place.id)) {
            saveYourChangesBtn.disabled = false;
        }
        config.guide.place = { id: placeId, name: target.innerText };
        config.collection.id = placeId;
    }));
};