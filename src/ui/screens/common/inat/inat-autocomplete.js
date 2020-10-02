import autocomplete from 'autocompleter';
import { getAutocompleteBy } from 'api/inat/inat';
import { GoogleAutocomplete } from 'geo/geo';

// https://github.com/kraaden/autocomplete

export const inatAutocomplete = (input, type = 'users', className, rb) => {

    const MIN_LENGTH = 3;

    async function getUserSuggestions(text) {
        const users = await getAutocompleteBy(text, 'users');
        return users.results.map(user => {
            return { label: user.login_autocomplete, value: user.id, photo: user.icon, name: user.name };
        });
    }

    async function getInatPlaceSuggestions(text) {        
        const users = await getAutocompleteBy(text, 'places');
        return users.results.map(place => {
            return { label: place.display_name, value: place.id };
        });
    }    

    function getPlaceSuggestions(text, update) {
        let callback = null;
        callback = predictions => {
            update(predictions.map(prediction => {
                return { label: prediction.description, value: prediction.place_id };
            }));
        } 
        GoogleAutocomplete(text, callback);
    }

    async function getProjectSuggestions(text) {
        const projects = await getAutocompleteBy(text, 'projects');
        return projects.results.map(place => {
            return { label: place.title, value: place.id };
        });
    }
    
    const autocompleteRef = autocomplete({
        input: input,
        fetch: function(text, update) {
            switch(type) {
                case 'users':
                    getUserSuggestions(text).then(users => {
                        update(users);
                    });
                    break;
                case 'places':
                    getPlaceSuggestions(text, update);
                    break;
                case 'projects':
                    getProjectSuggestions(text).then(projects => {
                            update(projects);
                        });
                    break;
            }           

        },
        onSelect: function(item) {
            input.value = item.label;
            input.name = item.value;
        },
        className: className,
        rb: rb,
        minLength: MIN_LENGTH,
        debounceWaitMs: 200
    });

    return autocompleteRef;
};