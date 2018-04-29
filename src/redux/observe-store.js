export const observeStore = (store, select, onChange, domain) => {
    let currentState = null;
  
    function handleChange() {      
      let nextState = select(store.getState());
      if (nextState !== currentState) {
        currentState = nextState;
        onChange(currentState);
      }
    }
  
    let unsubscribe = store.subscribe(handleChange);
    handleChange();
    return unsubscribe;
  };