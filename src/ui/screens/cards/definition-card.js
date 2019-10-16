// import { store } from 'redux/store';
// import { utils } from 'utils/utils';
// import { DOM } from 'ui/dom';
// import definitionCardTemplate from 'ui/screens/cards/definition-card-template.html';
// import { renderTemplate } from 'ui/helpers/templating';
// import { getGlossary } from 'api/glossary/glossary';

// export const renderDefinitionCard = collection => {

//     const template = document.createElement('template');

//     template.innerHTML = definitionCardTemplate;

//     const parent = DOM.rightBody;
//     parent.innerHTML = '';

//     const filteredTerms = getGlossary(collection.glossary);//.filter(term => term.level === 1);

//     const glossary = utils.sortAlphabeticallyBy(filteredTerms, 'term');
    
//     renderTemplate({ glossary }, template.content, parent);
// };