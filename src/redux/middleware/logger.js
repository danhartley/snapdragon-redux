export const logger = store => next => action => {
    
    // console.log('NEXT: ', next);
    // console.group(action.type)
    // console.info('dispatching', action)
    let result = next(action)
    // console.log('next state', store.getState())
    // console.groupEnd(action.type)

    // console.clear();
    console.log(`^^^ ${action.type}`);
  
    return result;
};