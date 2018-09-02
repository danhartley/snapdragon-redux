export const getBirdSong = (binomial, node, portrait) => {

    const endpoint = `https://cors-anywhere.herokuapp.com/http://www.xeno-canto.org/api/2/recordings?query=${binomial} q:A`;

    async function fetchAsync (endpoint) {

        var request = new Request(endpoint);

        var init = { mode: 'no-cors' };
        
        let response = await fetch(endpoint);
        
        let data = await response.json();
        
        return data;
      }

      fetchAsync(endpoint).then(data => {        
        const recording = data.recordings[0];
        const url = `https://www.xeno-canto.org/${recording.id}/embed?simple=1`;
        portrait ? node.dataset.src = url : node.src = url;
        if(portrait) {
            node.classList.remove('bird-song-icon-disabled');
            node.classList.add('bird-song-icon');
        }
      });

      return fetchAsync(endpoint, node, portrait);
}