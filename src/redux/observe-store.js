export const observeStore = (store, select, onChange, domain, layout) => {
    let currentState = null;
  
    function handleChange() {      
      let nextState = select(store.getState());

      let hasStateSignificantlyChanged = false;
          hasStateSignificantlyChanged = nextState !== currentState;

          if(currentState && Object.is(currentState.index,0)) {            
            let areEqual = true;
                areEqual = areEqual && Object.is(nextState.index, currentState.index);
                areEqual = areEqual && Object.is(nextState.isLessonPaused, currentState.isLessonPaused);
            hasStateSignificantlyChanged = !areEqual;
          }

      if(currentState && nextState) {
        switch(layout) {
          case 'screen-species-card':
          case 'screen-taxon-card':
          case 'screen-non-taxon-card':
          case 'species-vernaculars':
          case 'mixed-specimen-images':
          case 'screen-common-to-latin':
          case 'screen-genus-completion':
          case 'screen-latin-to-common':
          case 'media-match':
            hasStateSignificantlyChanged = nextState.nextItem.name !== currentState.nextItem.name;
            break;
            // hasStateSignificantlyChanged = currentState.speciesVernacularNames !== nextState.speciesVernacularNames;
            // break;
            // hasStateSignificantlyChanged = currentState.speciesNames !== nextState.speciesNames;
            // break;
            // hasStateSignificantlyChanged = currentState.itemIndex !== nextState.itemIndex;
            // break;
            // hasStateSignificantlyChanged = currentState.speciesNames !== nextState.speciesNames;
            // break;
        }

        if(nextState.itemIndex) { // layout
          hasStateSignificantlyChanged = 
                 (nextState.speciesName !== currentState.speciesName) 
              && (nextState.roundProgressIndex !== currentState.roundProgressIndex) 
        } 

        if(nextState.score && nextState.score.total) {
          hasStateSignificantlyChanged = nextState.score.total !== currentState.score.total;
        }
      }

      if (hasStateSignificantlyChanged) {
        currentState = nextState;
        // console.log(`*** ${onChange.name} called `);
        onChange(currentState);
      }
    }
  
    handleChange.domain = domain;
    handleChange.calledBy = onChange.name;
    // console.log('*** NEW LISTENER', `func: ${onChange.name}`, `domain: ${domain}`);
    let unsubscribe = store.subscribe(handleChange);
    handleChange();
    return { unsubscribe, name: onChange.name };
  };