document.addEventListener('DOMContentLoaded',function(event){
    // array with texts to type in typewriter
    var dataText = [ "How many do you think you know?", "It\'s time to find out.", "Pick a course to begin.", "Good luck."];
    
    // type one text in the typwriter
    // keeps calling itself until the text is finished
    function typeWriter(text, i, fnCallback) {
      // chekc if text isn't finished yet
      if (i < (text.length)) {
        
        setTimeout(function() {
          document.querySelector(".js-typewriter").innerHTML = text.substring(0, i+1) +'<span aria-hidden="true"></span>';
        });
        // wait for a while and call this function again for next character
        setTimeout(function() {
          typeWriter(text, i + 1, fnCallback)
        }, 100);
      }
      // text finished, call callback if there is a callback function
      else if (typeof fnCallback == 'function') {
        // call callback after timeout
        setTimeout(fnCallback, 1500);
      }
    }
    // start a typewriter animation for a text in the dataText array
     function StartTextAnimation(i) {
       if (typeof dataText[i] == 'undefined'){
          setTimeout(function() {
            StartTextAnimation(0);
          }, 20000);
       }
       // check if dataText[i] exists
      if (dataText && i < dataText[i].length) {
        // text exists! start typewriter animation
       typeWriter(dataText[i], 0, function(){
         // after callback (and whole text has been animated), start next text
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