export const observeStore = (store, select, onChange, domain) => {
    let currentState = null;
  
    function handleChange() {      
      let nextState = select(store.getState());
      if (nextState !== currentState) {
        currentState = nextState;
        onChange(currentState);
      }
    }
  
    handleChange.domain = domain;
    handleChange.calledBy = onChange.name;
    console.log('** New listener added', `func: ${onChange.name}`, `domain: ${domain}`);
    let unsubscribe = store.subscribe(handleChange);
    handleChange();
    return { unsubscribe, name: onChange.name };
  };