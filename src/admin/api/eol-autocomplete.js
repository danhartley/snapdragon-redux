import autocomplete from 'autocompleter';
import { eol } from 'admin/api/eol';

// https://github.com/kraaden/autocomplete

export const eolAutocomplete = (input, type, className, feedbackCallback, onSelectCalback) => {

    const MIN_LENGTH = 7;

    const autocompleteRef = autocomplete({
        input: input,
        fetch: function(text, update) {
            switch(type) {
                case 'search':
                    feedbackCallback();
                    eol.getSpeciesByName(text).then(terms => {
                        update(terms.results);
                        feedbackCallback();
                    });
                    break;
            }           

        },
        onSelect: function(item) {
            input.value = item.title;
            input.name = item.id;
            onSelectCalback();
        },
        className: className,
        minLength: MIN_LENGTH,
        debounceWaitMs: 200
    });

    return autocompleteRef;
};