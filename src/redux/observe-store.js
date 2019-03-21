export const observeStore = (store, select, onChange, domain, layout) => {
    let currentState = null;
  
    function handleChange() {      
      let nextState = select(store.getState());

      let hasStateSignificantlyChanged = false;
      hasStateSignificantlyChanged = nextState !== currentState;
      
      if(currentState && nextState) {
        switch(layout) {
          case 'screen-species-card':
          case 'screen-taxon-card':
          case 'screen-non-taxon-card':
            hasStateSignificantlyChanged = currentState.itemIndex !== nextState.itemIndex;
            break;
          case 'screen-latin-to-common':
            hasStateSignificantlyChanged = currentState.speciesVernacularNames !== nextState.speciesVernacularNames;
          case 'screen-common-to-latin':
            hasStateSignificantlyChanged = currentState.speciesNames !== nextState.speciesNames;
          case 'screen-genus-completion':
            hasStateSignificantlyChanged = currentState.itemIndex !== nextState.itemIndex;
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