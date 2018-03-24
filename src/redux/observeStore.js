export const observeStore = (store, select, onChange) => {
    let currentState;
  
    function handleChange() {
      const name = onChange;
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

  const selectSpecies = store => {
    const { strategy, randomiser, item } = store;
    return { strategy, randomiser, items, item };
  };