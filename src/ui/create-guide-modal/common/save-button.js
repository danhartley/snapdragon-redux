import { returnTaxonIcon } from 'ui/helpers/icon-handler';

export const saveButton = (config, step, update = true) => {

    const chosen = document.querySelector('.js-chosen span:nth-child(2)');

    const handleSaveEvent = () => {

        switch(step) {

            case 'SPECIES':

            break;

            case 'LOCATION':

                if(config.guide.locationType) {
                    chosen.innerHTML = config.guide.locationType === 'place'
                        ? config.guide.locationPlace
                        : config.isLandscapeMode
                            ? config.guide.locationLongLat
                            : config.guide.locationLongLat.split(',')[0];
                }
                break;

            case 'TAXA':

                chosen.innerHTML = '';
                let iconicTaxa = config.guide.iconicTaxa;
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

            case 'INAT':
                
                if(config.guide.inatId.key) {
                    chosen.innerHTML = config.guide.inatId.key || '';
                } else {
                    chosen.innerHTML = '';
                }
                break;
        }
    }

    return handleSaveEvent;
}