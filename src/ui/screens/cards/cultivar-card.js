import { store } from 'redux/store';
import { DOM } from 'ui/dom';
import { actions } from 'redux/actions/action-creators';
import { renderTemplate } from 'ui/helpers/templating';
import cultivarTemplate from 'ui/screens/cards/cultivar-card-template.html';

export const renderCultivarCard = collection => {

    const item = collection.items[collection.itemIndex];
    const { lessonPlan, layout, config } = store.getState();

    const cultivarCollection = lessonPlan.layouts.find(l => l.name === 'screen-cultivar-card').cultivars;

    const cultivars = cultivarCollection.subspecies.map(sub => {
        let locale = sub.names.find(n => n.language === config.language);
        locale = locale || sub.names.find(n => n.language === 'en');
        return {
            vernacular: locale.vernacularName || '',
            variety: sub.variety || '',
            form: sub.form || '',
            eol: locale.eol || '',
            eolAlt: locale.eol || 'N/A',
            wiki: locale.wiki || '',
            wikiAlt: locale.wiki || 'N/A'
        }
    });

    const template = document.createElement('template');

    template.innerHTML = cultivarTemplate;

    const parent = DOM.rightBody;
    parent.innerHTML = '';

    const context = {
        rank: 'cultivar',
        item: item,
        cultivars: cultivars
    }

    renderTemplate(context, template.content, parent);

    document.querySelector('.js-cultivar-card-btn').addEventListener('click', event => {
        actions.boundEndRevision(item);
    });

    document.querySelectorAll('[title="N/A"]').forEach(a => a.style.display = 'none');
};