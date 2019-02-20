import { utils } from 'utils/utils';
import { renderTemplate } from 'ui/helpers/templating';
import ecosystemTemplate from 'ui/create-guide-modal/ecosystems-list-template.html';
import { saveButton } from 'ui/create-guide-modal/common/save-button';
import { rbEventHandler } from 'ui/create-guide-modal/common/rb-event-handler';

export const renderEcosystems = (config, collections, modal) => {

    const guideTxt = modal.querySelector('.guide-text');
    const guideSubTxt = modal.querySelector('.guide-sub-text');
    const chosen = modal.querySelector('.js-chosen span:nth-child(2)');

    const saveYourChangesBtn = saveButton(modal.querySelector('.js-save-your-changes'), config);

    const location = config.place 
            ? config.place.longLocation 
            : config.ipLocation 
                ? config.ipLocation.country_name
                : null;
    
    let ecosystems = [];

    if(config.iconicTaxa && config.iconicTaxa.length !== 0) {
        collections.forEach(collection => {
            collection.iconicTaxa.forEach(iconicTaxon => {
                config.iconicTaxa.forEach(taxon => {
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

    if(config.ecosystem) {
        setTimeout(() => {
            const preSelectedCollection = modal.querySelector(`#id-${config.ecosystem.id}`).querySelectorAll('span')[1];
            if(preSelectedCollection) {
                preSelectedCollection.click();
            }
        });
    }

    if(location) {
        ecosystems.find(e => e.id === 1).name = `${location}`;
        guideTxt.innerHTML = 'Choose an ecosystem';
        guideSubTxt.innerHTML = `There are ${ecosystems.length} ecosystems in ${location.toUpperCase()}. Choose one to study.`
    }

    const template = document.createElement('template');
    template.innerHTML = ecosystemTemplate;
    const parent = modal.querySelector('.js-actions');
    
    renderTemplate({ ecosystems }, template.content, parent);
    
    modal.querySelectorAll('.btn.btn-secondary div').forEach(type => type.addEventListener('click', event => {
        const target = rbEventHandler(modal, event);
        const ecosystemId = target.id.slice(3);
        if(ecosystemId !== (config.ecosystem && config.ecosystem.id)) {
            saveYourChangesBtn.disabled = false;
        }
        config.ecosystem = { id: ecosystemId, name: target.innerText };
        chosen.innerHTML = config.ecosystem.name;        
    }));
};