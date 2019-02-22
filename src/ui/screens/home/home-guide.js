import { renderTemplate } from 'ui/helpers/templating';
import homeGuideTemplate from 'ui/screens/home/home-guide-template.html';

export const renderHomeGuide = (config, parent) => {

    config.location = config.locationType === 'auto' ? config.autoLocation : config.userLocation;
    config.taxa = config.iconicTaxa.join(', ');

    const template = document.createElement('template');
    template.innerHTML = homeGuideTemplate;

    renderTemplate({config}, template.content, parent);
};