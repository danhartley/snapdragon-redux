import { enums } from 'ui/helpers/enum-helper';

export const observeStore = (store, select, onChange, domain, layout) => {
    let currentState = null;
  
    function handleChange() {      
      let nextState = select(store.getState());

      let hasStateSignificantlyChanged = false;
          hasStateSignificantlyChanged = nextState !== currentState;

          if(currentState && Object.is(currentState.index,0)) {            
            let areEqual = true;
                areEqual = areEqual && Object.is(nextState.index, currentState.index);
                areEqual = areEqual && Object.is(nextState.isLessonPaused, currentState.isLessonPaused);
            hasStateSignificantlyChanged = !areEqual;
          }

      // const { userAction } = store.getState();
      // const startLesson = userAction ? userAction.name === enums.userEvent.START_LESSON.name : false;

      if(currentState && nextState) {
        // console.log('layout: ', layout);
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
            hasStateSignificantlyChanged = nextState.nextItem.name !== currentState.nextItem.name;
            // hasStateSignificantlyChanged = nextState.nextItem.name !== currentState.nextItem.name && !startLesson;
            // console.log('hasStateSignificantlyChanged: ', hasStateSignificantlyChanged);
            break;
        }

        // if(nextState.given) {
        //   hasStateSignificantlyChanged = 
        //          (nextState.speciesName !== currentState.speciesName) 
        //       && (nextState.roundProgressIndex !== currentState.roundProgressIndex);

        //     hasStateSignificantlyChanged = hasStateSignificantlyChanged && !startLesson;

        //     if(hasStateSignificantlyChanged) {
        //       console.log('state has changed for layout');
        //     }              
        // } 

        if(nextState.score && nextState.score.total) {
          hasStateSignificantlyChanged = nextState.score.total !== currentState.score.total;
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