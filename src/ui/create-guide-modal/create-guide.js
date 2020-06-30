import 'ui/css/groups/create-guide.css';

import { CreateGuide } from 'ui/create-guide-modal/createGuide';
import { enums } from 'ui/helpers/enum-helper';

export const createGuideHandler = step => {

    const guide = new CreateGuide(step);
    
    guide.goToNextStep(step, 'NEXT');

    const handleNextStepAction = e => {

        guide.startLesson = parseInt(guide.nextStepActionArrow.dataset.number) === 4;
        if(guide.startLesson) { 
            guide.nextStepActionArrow.setAttribute('data-dismiss','modal');
        } else {
            guide.nextStepActionArrow.removeAttribute('data-dismiss');
        }
        const step = guide.steps.find(step => step.description === guide.getCurrentStep().nextStep);
        if(step) guide.goToNextStep(step.number, 'NEXT');
        guide.listeners.push( { element: guide.nextStepActionArrow, handler: handleNextStepAction });
    };

    guide.nextStepActionArrow.addEventListener('click', handleNextStepAction, true);

    const handlePreviousStepAction = e => {

        let prevStep;
        
        if(guide.getCurrentStep() && guide.getCurrentStep().number === 4) {
            prevStep = guide.option === enums.guideType.PICKER.name ? 2 : 3;
        } else {
            prevStep = guide.getCurrentStep().number - 1;
        }
        
        guide.goToNextStep(prevStep, 'PREVIOUS', guide.option);
        guide.listeners.push( { element: guide.previousStepActionArrow, handler: handlePreviousStepAction });
    };

    guide.previousStepActionArrow.addEventListener('click', handlePreviousStepAction, true);

    guide.callOnCreateCustomListeners = collection => {
        onCloseModalListeners.forEach(listener => listener(collection));
        onCloseModalListeners.pop();
    };
};

const onCloseModalListeners = [];

export const onCreateCustomLesson = listener => { 
    onCloseModalListeners.pop();
    onCloseModalListeners.push(listener);
};