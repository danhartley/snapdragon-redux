import { returnTaxonIcon } from 'ui/helpers/icon-handler';
import { actions } from 'redux/actions/action-creators';
import { renderTemplate } from 'ui/helpers/templating';
import saveButtonTemplate from 'ui/create-guide-modal/common/save-button-template.html';

export const saveButton = (parent, config, step, update = true) => {

    const chosenLabel = document.querySelector('.js-chosen span:nth-child(1)');
    const chosen = document.querySelector('.js-chosen span:nth-child(2)');
    
    const template = document.createElement('template');
    template.innerHTML = saveButtonTemplate;
    renderTemplate({}, template.content, parent);

    const savedTxt = parent.querySelector('div');
    let inatSavedTxt;

    const handleSaveEvent = () => {

        switch(step) {
            case 'LOCATION':

                if(config.guide.locationType) {
                    chosen.innerHTML = config.guide.locationType === 'place'
                        ? config.guide.locationPlace
                        : config.isLandscapeMode
                            ? config.guide.locationLongLat
                            : config.guide.locationLongLat.split(',')[0];
                }
                break;

            case 'SPECIES':

                chosen.innerHTML = '';
                const iconicTaxa = config.guide.iconicTaxa;
                let icons = '';
                if(iconicTaxa.length > 0) {
                    iconicTaxa.forEach(taxon => {
                        const icon = returnTaxonIcon(taxon.id);
                        icons += icon;
                    })
                    chosen.innerHTML = icons;
                } else {
                    chosen.innerHTML = 'All species';
                }
                break;

            case 'GUIDE':

                inatSavedTxt = document.querySelector('.js-saved-inat');

                const inatIdLabel = document.querySelector('.js-chosen-inat span:nth-child(1)');
                const inatId = document.querySelector('.js-chosen-inat span:nth-child(2)');
        
                if(config.guide.inatId.key) {
                    inatIdLabel.innerHTML = config.guide.inatId.param === 'project_id' 
                            ? 'iNaturalist Project:'
                            : 'iNaturalist User:';
                    inatId.innerHTML = config.guide.inatId.key || '';
                }
                if(config.guide.season) {
                    chosenLabel.innerHTML = 'Current selection:';
                    if(config.guide.season.type === 'months') {
                        const months = config.guide.season.observableMonths.map(month => month.name);
                        const observableMonths = `${months[0]}-${months[months.length - 1]}`;
                        chosen.innerHTML = observableMonths;    
                    } else {
                        chosen.innerHTML = 'All year';
                    }
                }
                break;
        }

        if(update) {
            actions.boundUpdateConfig(config);
            config.guide.operation === 'inat' 
                ? inatSavedTxt.innerHTML = 'Your preference has been updated.'
                : savedTxt.innerHTML = 'Your preference has been updated.';
            setTimeout(() => {
                inatSavedTxt.innerHTML = '';
                savedTxt.innerHTML = '';
            }, 2000);
        }
    }

    return handleSaveEvent;
}