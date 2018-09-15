import { speciesTraits } from 'api/traits';
import { itemProperties } from 'ui/helpers/data-checking';

export const getBirdSong = (item, node, portrait) => {

    if(item.taxonomy.class.toUpperCase() === 'AVES') {

        const endpoint = `https://cors-anywhere.herokuapp.com/http://www.xeno-canto.org/api/2/recordings?query=${item.name} q:A`;

        async function fetchAsync (endpoint) {

            let response = await fetch(endpoint);
            
            let data = await response.json();
            
            return data;
        }

        const loadPlayer = id => {
            const url = `https://www.xeno-canto.org/${id}/embed?simple=1`;
            portrait ? node.dataset.src = url : node.src = url;
            if(portrait) {
                node.classList.remove('bird-song-icon-disabled');
                node.classList.add('bird-song-icon');
            }
        };

        const playerId = itemProperties.getTrait(speciesTraits, item.name, 'song').value;
            
        if(playerId) {
            loadPlayer(playerId);
        } else {
            fetchAsync(endpoint).then(data => {        
                const recording = data.recordings[0];
                loadPlayer(recording.id);
            });
        }
    } else {
        node.style.display = 'none';
    }
}