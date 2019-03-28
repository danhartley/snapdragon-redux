import autocomplete from 'autocompleter';
import { getAutocompleteBy } from 'api/inat/inat';

// https://github.com/kraaden/autocomplete

export const inatAutocomplete = (input, type, container, rb) => {

    async function getUserSuggestions(text) {
        const users = await getAutocompleteBy(text, 'users');
        return users.results.map(user => {
            return { label: user.login_autocomplete, value: user.id, photo: user.icon, name: user.name };
        });
    }

    async function getPlaceSuggestions(text) {
        const users = await getAutocompleteBy(text, 'places');
        return users.results.map(place => {
            return { label: place.display_name, value: place.id };
        });
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
                    getPlaceSuggestions(text).then(places => {
                        update(places);
                    });
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
        container: container,
        rb: rb,
        minLength: 3
    });

    return autocompleteRef;
};