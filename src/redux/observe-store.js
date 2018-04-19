export const observeStore = (store, select, onChange, domain) => {
    let currentState = null;
  
    function handleChange() {
      const name = onChange ? onChange.name : 'no name';
      // console.log('listening for changes on domain:', domain);
      let nextState = select(store.getState());
      if (nextState !== currentState && nextState !== null) {
        currentState = nextState;
        onChange(currentState);
      }
    }
  
    let unsubscribe = store.subscribe(handleChange);
    handleChange();
    return unsubscribe;
  };