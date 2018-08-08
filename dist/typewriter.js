// With thanks to Geoff Graham: https://css-tricks.com/snippets/css/typewriter-effect/
document.addEventListener('DOMContentLoaded',function(event){
    var dataText = [ "How many do you think you know?", "It\'s time to find out.", "Pick a course to begin.", "Good luck."];
    function typeWriter(text, i, fnCallback) {
      if (i < (text.length)) {        
        setTimeout(function() {
          const typewriter = document.querySelector(".js-typewriter");
          if(typewriter)
            typewriter.innerHTML = text.substring(0, i+1) +'<span aria-hidden="true"></span>';
        });
        setTimeout(function() {
          typeWriter(text, i + 1, fnCallback)
        }, 100);
      }
      else if (typeof fnCallback == 'function') {
        setTimeout(fnCallback, 1500);
      }
    }
     function StartTextAnimation(i) {

      const typewriter = document.querySelector(".js-typewriter");
      if(!typewriter) return;

      if (typeof dataText[i] == 'undefined'){
          setTimeout(function() {
            StartTextAnimation(0);
          }, 20000);
      }
      if (dataText && dataText[i] && i < dataText[i].length) {
      typeWriter(dataText[i], 0, function(){
        StartTextAnimation(i + 1);
      });
}
    }
    // start the text animation
    const url = `https://api.gbif.org/v1/species/search?advanced=true&dataset_key=7ddf754f-d193-4cc9-b351-99906754a03b&facet=rank&facet=dataset_key&facet=constituent_key&facet=highertaxon_key&facet=name_type&facet=status&facet=issue&facet=origin&facetMultiselect=true&issue.facetLimit=100&locale=en&name_type.facetLimit=100&rank=SPECIES&rank.facetLimit=100&status=ACCEPTED&status.facetLimit=100`;
        fetch(url)
            .then(json => json.json())
            .then(species => {
                setTimeout(function() {
                  dataText.unshift(`There are ${species.count.toLocaleString()} formerly described species on the planet.`);                  
                  StartTextAnimation(0);
                });
            })
            .catch(error => {
              dataText.unshift(`There are 1,727,253 formerly described species on the planet.`);                  
              StartTextAnimation(0);
            });
  });