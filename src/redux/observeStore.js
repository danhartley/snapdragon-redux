export const observeStore = (store, select, onChange) => {
    let currentState = null;
  
    function handleChange() {
      const name = onChange.name;
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