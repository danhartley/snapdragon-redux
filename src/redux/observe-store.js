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
    console.log('*added listener', onChange.name);
    let unsubscribe = store.subscribe(handleChange);
    handleChange();
    return unsubscribe;
  };