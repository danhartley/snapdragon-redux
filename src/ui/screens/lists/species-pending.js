import { DOM } from 'ui/dom';
import { renderTemplate } from 'ui/helpers/templating';
import spinnerTemplate from 'ui/screens/lists/species-pending-template.html';
import { listenToInatRequests } from 'api/inat/inat';

export const speciesPendingSpinner = (config) => {

    const template = document.createElement('template');
    template.innerHTML = spinnerTemplate;

    const parent = config.isPortraitMode ? DOM.rightBody : DOM.leftBody;
    parent.innerHTML = '';
    
    renderTemplate({ }, template.content, parent);

    const OrdinalSuffixOf = i => {
        var j = i % 10,
            k = i % 100;
        if (j == 1 && k != 11) {
            return i + "st";
        }
        if (j == 2 && k != 12) {
            return i + "nd";
        }
        if (j == 3 && k != 13) {
            return i + "rd";
        }
        return i + "th";
    }

    const callback = request => {
        const feedback = document.querySelector('.js-request-feedback');
        feedback.innerHTML = `Making ${OrdinalSuffixOf(request.page)} request of ${request.numberOfRequests}`;
    };

    listenToInatRequests(callback);
};