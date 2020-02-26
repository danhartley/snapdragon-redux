import { renderTemplate } from 'ui/helpers/templating';
import { firestore } from 'api/firebase/firestore';

import addQuestionTemplate from 'admin/screens/questions/add-question-template.html';

export const addQuestion = (activeSpecies, parent = null) => {

    const init = async () => {

        let species = activeSpecies || !!window.snapdragon.species ? window.snapdragon.species : null;
        let taxonomy = species ? species.taxonomy : null;

        const template = document.createElement('template');
              template.innerHTML = addQuestionTemplate;

        const questions = await firestore.getQuestionsWhere({
            key: 'taxon',
            operator: '==',
            value: species ? species.name : ''
        });

        renderTemplate({ questions }, template.content, parent);

        var elems = document.querySelectorAll('.collapsible');
        var instances = M.Collapsible.init(elems, {});
    }

    init();

};