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
    console.log('new function asking to subscribe: ', handleChange.domain, ' ', handleChange.calledBy);
    let unsubscribe = store.subscribe(handleChange);
    handleChange();
    return unsubscribe;
  };