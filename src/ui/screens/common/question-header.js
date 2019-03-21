// import { itemProperties } from 'ui/helpers/data-checking';
// import { renderIcon } from 'ui/helpers/icon-handler';
// import { renderTemplate } from 'ui/helpers/templating';
// import questionHeaderTemplate from 'ui/screens/common/question-header-template.html';

// export const renderQuestionHeader = (parent, item, config, overrideVernacular, overrideBinomial) => {

//     const template = document.createElement('template');

//     template.innerHTML = questionHeaderTemplate;

//     parent.innerHTML = '';

//     const vernacularName = overrideVernacular || itemProperties.getVernacularName(item, config);
//     const binomial = overrideBinomial || item.name;

//     renderTemplate({ vernacularName, binomial }, template.content, parent);

//     return renderIcon(item, document);
// };