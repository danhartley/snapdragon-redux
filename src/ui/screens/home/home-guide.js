import { renderTemplate } from 'ui/helpers/templating';
import homeGuideTemplate from 'ui/screens/home/home-guide-template.html';

export const renderGuideSummary = (config, parent) => {

    config.location = config.guide.locationType === 'auto' ? config.guide.autoLocation : config.guide.userLocation;
    config.taxa = config.guide.iconicTaxa.join(', ');

    const template = document.createElement('template');
    template.innerHTML = homeGuideTemplate;

    renderTemplate({config}, template.content, parent);
};