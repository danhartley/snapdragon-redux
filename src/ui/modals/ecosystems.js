import { renderTemplate } from 'ui/helpers/templating';
import ecosystemTemplate from 'ui/modals/ecosystems-list-template.html';

export const renderEcosystems = (config, collections, modal) => {

    modal.querySelector('.guide-place').innerHTML = config.place.longLocation;
    modal.querySelector('.guide-categories').innerHTML = config.iconicTaxa.join(', ');

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

    const template = document.createElement('template');
    template.innerHTML = ecosystemTemplate;
    const parent = modal.querySelector('.js-ecosystems');
    parent.innerHTML = '';
    renderTemplate({ ecosystems }, template.content, parent);
    
    modal.querySelectorAll('.btn.btn-secondary div').forEach(type => type.addEventListener('click', event => {        
        const target = event.target.id ? event.target : event.target.parentElement;
        modal.querySelectorAll('.lesson-icon').forEach(icon => icon.innerHTML = '<i class="far fa-circle"></i>');
        target.querySelector('i').classList.remove('fa-circle');
        target.querySelector('i').classList.add('fa-dot-circle');
    }));
};