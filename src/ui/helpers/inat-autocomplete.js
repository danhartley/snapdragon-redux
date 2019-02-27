import autocomplete from 'autocompleter';

export const inatAutocomplete = input => {
    
    var countries = [
        { label: 'United Kingdom', value: 'UK' },
        { label: 'United States', value: 'US' },
        { label: 'United Gardens', value: 'UG' },
        { label: 'United Nowhere', value: 'UN' },
        { label: 'United Lost', value: 'UL' },
    ];
    
    autocomplete({
        input: input,
        fetch: function(text, update) {
            text = text.toLowerCase();
            // you can also use AJAX requests instead of preloaded data
            var suggestions = countries.filter(n => n.label.toLowerCase().startsWith(text))
            update(suggestions);
        },
        onSelect: function(item) {
            alert(item.value); // will display 'US' or 'UK'
        }
    });
};