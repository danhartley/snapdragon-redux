import { returnTaxonIcon } from 'ui/helpers/icon-handler';

export const saveGuide = (config, step, update = true) => {

    const chosen = document.querySelector('.js-chosen span:nth-child(2)');

    const handleSaveEvent = () => {

        switch(step) {

            case 'SPECIES':

            break;

            case 'LOCATION':

                const splitLocation = locationStr => {
                    return locationStr;
                };

                if(config.guide.locationType) {
                    chosen.innerHTML = config.guide.locationType === 'place'
                        ? config.guide.locationPlace
                        : config.isLandscapeMode
                            ? config.guide.locationLongLat
                            : splitLocation(config.guide.locationLongLat);
                }
                break;

            case 'TAXA':

                chosen.innerHTML = '';
                let icons = '';
                if(config.guide.iconicTaxa.length > 0) {
                    config.guide.iconicTaxa.forEach(taxon => {
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