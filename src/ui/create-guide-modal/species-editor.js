export const speciesEditor = (config, modal, selectedSpecies, speciesNames, selectedSpeciesDisplay, createGuide = null, input = null) => {
            
    selectedSpeciesDisplay.innerHTML = '';
    selectedSpecies.forEach(s => {
        selectedSpeciesDisplay.innerHTML +=
            `<li class="custom-control custom-checkbox">
            <input type="checkbox" class="custom-control-input" id="${s}" checked>
            <label class="custom-control-label" for="${s}">${s}</label>
            </li>`;
    });        

    if(input) {
        speciesNames = speciesNames.filter(name => name.value !== input.value);
        input.value = '';
    }

    modal.querySelectorAll('li input').forEach(checkBox => {
        
        checkBox.addEventListener('change', event => {

            const removedSpecies = event.target.id;

            speciesNames.push({ label: removedSpecies, value: removedSpecies});
            selectedSpecies = selectedSpecies.filter(species => species !== removedSpecies);
            
            config.guide.species = selectedSpecies.map(ss => { name: ss });

            if(createGuide) createGuide.setConfig(config);
            
            speciesEditor(config, modal, selectedSpecies, speciesNames, selectedSpeciesDisplay, createGuide, input);
        });
    })
};