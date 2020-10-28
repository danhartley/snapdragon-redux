import { inatAutocomplete } from 'ui/screens/common/inat/inat-autocomplete';
import { inat } from 'admin/api/inat-api';

export class Inat {
  constructor (parent, input) {
    this.containerSelector = 'inat-autocomplete-user-container';
    this.parent = parent;
    this.props = {
      key: '',
      type: 'user_id',
      param: 'iNat user ID',
      urlType: 'users'
    };    
    this.setProps = props => {
      this.props.key = props.key || this.props.key;
      this.props.type = props.type || this.props.type;
      this.props.param = props.param || this.props.param;
      this.props.urlType = props.urlType || this.props.urlType;
    };
    this.inatIdentityInputHandler = e => {
      this.input.removeEventListener('keypress', this.inatIdentityInputHandler);
      this.autocompleteRef = inatAutocomplete(this.input, this.props.urlType, this.containerSelector, '');
    };
    this.input = this.parent.querySelector(`#${input}`);
    this.input.focus();
    this.input.addEventListener('keypress', this.inatIdentityInputHandler);
    this.input.addEventListener('click', e => {
        e.preventDefault();
    });
    this.input.addEventListener('keyup', e => {
        e.preventDefault();
    });
    this.input.addEventListener('click', e => {
      e.preventDefault();
    });
    this.input.addEventListener('focusout', e => {
      e.preventDefault();
    });
    this.input.addEventListener('focusin', e => {
      e.preventDefault();
      this.input.value = '';
      this.input.focus();
    });
    this.form = this.parent.querySelector('#inatDashboardForm');
    this.form.addEventListener('submit', async e => {
      e.preventDefault();
      if(this.input.value !== '') {
        const username = this.input.value;
        const id = this.input.name;
        this.input.blur();
        const data = await inat.getUserOrProjectDashboard(username);
        const dashboard = data.results[0];

        // quick hack
        document.querySelector('.js-inat-observations > td:nth-child(2)').innerHTML = dashboard.observations_count || 0;
        document.querySelector('.js-inat-species > td:nth-child(2)').innerHTML = dashboard.species_count || 0;
        document.querySelector('.js-inat-identifications > td:nth-child(2)').innerHTML = dashboard.identifications_count || 0;

        document.querySelector('.js-inat-observations-link').innerHTML = 
        `<a href="https://www.inaturalist.org/observations?user_id=${this.input.value}" target="_blank" class="underline-link">
          Observations for ${dashboard.name}</a>`;
        //icon
        
      }
    });
  }
};