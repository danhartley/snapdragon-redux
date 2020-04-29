export const observeStore = (store, select, onChange, domain, layout) => {
    let currentState = null;
    let hasStateSignificantlyChanged = false;

    function handleChange() {      
      let nextState = select(store.getState());

      // let hasStateSignificantlyChanged = false;
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
          case 'mixed-specimen-question':
          case 'screen-common-to-latin':
          case 'screen-genus-completion':
          case 'screen-latin-to-common':
          case 'media-match':
            hasStateSignificantlyChanged = (nextState.nextItem && nextState.nextItem.name) !== (currentState.nextItem && currentState.nextItem.name);
            break;
        }
      }

      if(hasStateSignificantlyChanged) {
        currentState = nextState;
        onChange(currentState);
      }
    }
  
    handleChange.domain = domain;
    handleChange.calledBy = onChange.name;
    // console.log('*** NEW LISTENER', `func: ${onChange.name}`, `domain: ${domain}`);
    let unsubscribe = store.subscribe(handleChange);
    if(hasStateSignificantlyChanged) {
      handleChange();
    }
    return { unsubscribe, name: onChange.name };
  };