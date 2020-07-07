import { renderTemplate } from 'ui/helpers/templating';
import { speciesInGuideEditor } from 'ui/create-guide-modal/species-in-guide-editor';
import { speciesEditor } from 'ui/create-guide-modal/species-editor';
import { enums } from 'ui/helpers/enum-helper';

import speciesPickerTemplate from 'ui/create-guide-modal/species-picker-template.html';

export const renderSpeciesPicker = (props, parent) => {

      const { config, container, selectedSpecies } = props;

      const template = document.createElement('template');
            template.innerHTML = speciesPickerTemplate;

      parent.innerHTML = '';

      renderTemplate({}, template.content, parent);

      const selectedSpeciesDisplay = parent.querySelector('.js-selected-species-container');
            selectedSpeciesDisplay.innerHTML = '';

      if(config) {
          config.guide.guideMode = enums.guideMode.STATIC.name;
          speciesInGuideEditor(config, container, selectedSpeciesDisplay, props, config.guide.species || []);
      } else {
          speciesEditor(parent, selectedSpeciesDisplay, selectedSpecies, [], []);
      }
};
