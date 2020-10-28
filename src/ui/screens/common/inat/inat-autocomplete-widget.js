import { renderTemplate } from 'ui/helpers/templating';

import { Inat } from 'ui/screens/common/inat/inat';

import inatAutompleteTemplate from 'ui/screens/common/inat/inat-autocomplete-widget.html';

export const renderInatAutocomplete = parent => {

  const template = document.createElement('template');
        template.innerHTML = inatAutompleteTemplate;

  parent.innerHTML = '';
  
  renderTemplate({ }, template.content, parent);

  const inat = new Inat(parent, 'inat-input-dashboard');
        inat.setProps({type: null, key: 7});

  console.log(inat)

};