import { traits } from 'api/traits';

export const getBirdSong = (binomial, node, portrait) => {

    const endpoint = `https://cors-anywhere.herokuapp.com/http://www.xeno-canto.org/api/2/recordings?query=${binomial} q:A`;

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

    const playerId = traits.find(t => t.name === binomial);
        
    if(playerId) {
        loadPlayer(playerId.value);
    } else {
        fetchAsync(endpoint).then(data => {        
            const recording = data.recordings[0];
            loadPlayer(recording.id);
        });
    }
}