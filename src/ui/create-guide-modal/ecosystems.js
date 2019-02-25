import { utils } from 'utils/utils';
import { renderTemplate } from 'ui/helpers/templating';
import ecosystemTemplate from 'ui/create-guide-modal/ecosystems-list-template.html';
import { rbEventHandler } from 'ui/create-guide-modal/common/rb-event-handler';

export const renderEcosystems = (modal, config, collections, createGuide) => {

    const guideTxt = modal.querySelector('.guide-text');
    const chosen = modal.querySelector('.js-chosen span:nth-child(2)');
    const saveYourChangesBtn = createGuide.save(config, chosen, 'ECOSYSTEM');

    const location = config.guide.locationType === 'auto' 
            ? config.guide.autoLocation 
            : config.guide.userLocation;
    
    let ecosystems = [];

    if(config.guide.iconicTaxa && config.guide.iconicTaxa.length !== 0) {
        collections.forEach(collection => {
            collection.iconicTaxa.forEach(iconicTaxon => {
                config.guide.iconicTaxa.forEach(taxon => {
                    if(taxon === iconicTaxon) {
                        if(!ecosystems.includes(collection)) {
                            ecosystems.push(collection);
                        }                        
                    }
                })
            })
        })
    } else {
        ecosystems = utils.sortBy(collections.filter(c => c.type === 'species'), 'id', 'asc');
    }

    if(config.guide.ecosystem) {
        setTimeout(() => {
            const preSelectedCollection = modal.querySelector(`#id-${config.guide.ecosystem.id}`).querySelectorAll('span')[1];
            if(preSelectedCollection) {
                preSelectedCollection.click();                
            }
        });
        chosen.innerHTML = config.guide.ecosystem.name;
    } 
    // else {
    //     setTimeout(() => {
    //         const local = modal.querySelector('.btn.btn-secondary');
    //         local.querySelector('#id-1').click();    
    //         local.innerHTML += '<span class="default-local">The default based on your location</span>';
    //         saveYourChangesBtn.click();
    //     });
    // }

    if(location) {
        ecosystems.find(e => e.id === 1).name = `${location}`;
        guideTxt.innerHTML = 'Choose a place based on your location';
    }

    const template = document.createElement('template');
    template.innerHTML = ecosystemTemplate;
    const parent = modal.querySelector('.js-actions');
    
    renderTemplate({ ecosystems }, template.content, parent);
    
    modal.querySelectorAll('.btn.btn-secondary div').forEach(type => type.addEventListener('click', event => {
        const target = rbEventHandler(modal, event);
        const ecosystemId = parseInt(target.id.slice(3));
        if(ecosystemId !== (config.guide.ecosystem && config.guide.ecosystem.id)) {
            saveYourChangesBtn.disabled = false;
        }
        config.guide.ecosystem = { id: ecosystemId, name: target.innerText };
        config.collection.id = ecosystemId;
    }));
};