import { returnTaxonIcon } from 'ui/helpers/icon-handler';
import { actions } from 'redux/actions/action-creators';

export const saveButton = (parent, config, step, update = true) => {

    const chosen = document.querySelector('.js-chosen span:nth-child(2)');

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
                
                if(config.guide.inatId.key) {
                    const inatIdLabel = document.querySelector('.js-chosen-inat span:nth-child(1)');
                    const inatId = document.querySelector('.js-chosen-inat span:nth-child(2)');
                    inatIdLabel.innerHTML = config.guide.inatId.param === 'project_id' 
                            ? 'iNaturalist Project:'
                            : 'iNaturalist User:';
                    inatId.innerHTML = config.guide.inatId.key || '';
                }
                break;
        }

        if(update) {
            actions.boundUpdateConfig(config);
        }
    }

    return handleSaveEvent;
}