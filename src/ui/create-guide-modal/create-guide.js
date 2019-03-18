import * as R from 'ramda';

import 'ui/create-guide-modal/create-guide.css';

import { actions } from 'redux/actions/action-creators';
import { store } from 'redux/store';
import { renderTemplate } from 'ui/helpers/templating';
import { renderLocation } from 'ui/create-guide-modal/location';
import { renderCategories } from 'ui/create-guide-modal/categories';
import { renderGuides } from 'ui/create-guide-modal/guides';
import actionsTemplate from 'ui/create-guide-modal/common/actions-template.html';
import { saveButton } from 'ui/create-guide-modal/common/save-button';

const closeModalListeners = [];

export const listenToCloseCreateGuideModal = listener => { 
    closeModalListeners.push(listener);
  };  

class CreateGuide {
    
    constructor(step) {
        
        this.currentStep = step;
        
        this.steps = [
            { number: 1, title: 'Create Lesson', description: 'Location', nextStep: 'Filter species by category', disabled: true },
            { number: 2, title: 'Create Lesson', description: 'Species', nextStep: 'Find a guide', disabled: true },
            { number: 3, title: 'Create Lesson', description: 'Guide', nextStep: 'Start Lesson', disabled: true },
        ];
        
        this.modal = document.getElementById('createGuide');

        this.modalTitle = this.modal.querySelector('.js-modal-title div:nth-child(1)');
        this.modalTitleSteps = this.modal.querySelector('.js-modal-title div:nth-child(2)');
        this.progressSteps = this.modal.querySelectorAll('.js-create-guide-progress > div > div');
        this.previousStepAction = this.modal.querySelector('.js-create-guide-navigation > div:nth-child(1)');
        this.previousStepTitle = this.modal.querySelector('.js-create-guide-navigation > div:nth-child(1) > div');
        this.previousStepActionTxt = this.modal.querySelector('.js-create-guide-navigation > div:nth-child(1) > div > span:nth-child(2)');
        this.previousStepIcon = this.modal.querySelector('.js-create-guide-navigation > div:nth-child(1) > div > span:nth-child(1)');
        this.nextStepAction = this.modal.querySelector('.js-create-guide-navigation > div:nth-child(2)');
        this.nextStepTitle = this.modal.querySelector('.js-create-guide-navigation > div:nth-child(2) > div');
        this.nextStepActionTxt = this.modal.querySelector('.js-create-guide-navigation > div:nth-child(2) > div > span');

        this.progressSteps.forEach((ps,index) => {
            ps.innerHTML = this.steps[index].description;
        });      
    }

    get getCurrentStep() {
        return this.currentStep;
    }

    addStepActions() {
        
        let template = '';
        const parent = this.modal.querySelector('.js-create-guide-action');
        parent.innerHTML = '';
        template = document.createElement('template');
        const description = this.steps.find(step => step.number === this.currentStep).description;

        const { config: configState } = store.getState();
        const config = R.clone(configState);

        template.innerHTML = actionsTemplate;
        renderTemplate({}, template.content, parent);

        switch(description) {
            case 'Location':
                renderLocation(this.modal, config, this);
                break;
            case 'Species':
                renderCategories(this.modal, config, this);
                break;
            case 'Guide':
                renderGuides(this.modal, config, this);
                break;
        }
    }

    createStep(nextStep, direction) {

        this.currentStep = nextStep;
        this.direction = direction;

        this.nextStepActionTxt.removeAttribute('data-dismiss');

        if(nextStep > this.steps.length) {            
            const { config: configState } = store.getState();
            const config = R.clone(configState);
            closeModalListeners.forEach(listener => listener(this.currentStep));
            this.currentStep = 0;
            this.nextStepActionTxt.setAttribute('data-dismiss','modal');
            config.guide.ready = true;
            actions.boundUpdateConfig(config);

            // handle listeners correctly; this won't work:

            // guide.nextStepAction.removeEventListener('click');        
            // guide.previousStepAction.removeEventListener('click');

            return;
        };

        const currentStepProperties = this.steps.filter(s => s.number === this.currentStep);
        this.modalTitle.innerText = currentStepProperties.map(s => s.title);
        this.modalTitleSteps.innerHTML = `Step ${currentStepProperties.map(s => s.number)} of ${this.steps.length}`;
        this.nextStepActionTxt.innerHTML = currentStepProperties.map(csp => csp.nextStep);

        this.progressSteps.forEach((ps,index) => {

            ps.classList.remove('active');

            if(index + 1 === this.currentStep) {
                ps.classList.add('active');
                for(let i = 0; i < index; i++) {
                    this.progressSteps[i].classList.add('completed');
                }
            }
        });

        this.addStepActions();

        if(this.currentStep === 1) {
            this.previousStepActionTxt.classList.add('hide-important');
            this.previousStepTitle.classList.add('hide-important');
            this.previousStepIcon.classList.add('hide-important');
        } else {
            this.previousStepActionTxt.classList.remove('hide-important');
            this.previousStepTitle.classList.remove('hide-important');
            this.previousStepIcon.classList.remove('hide-important');
            const previousStepProperties = this.steps.filter(s => s.number === (this.currentStep - 1));
            this.previousStepActionTxt.innerHTML = previousStepProperties.map(psp => psp.description);
        }
    }

    save(config, stepDescription, update) {
        const saveChanges = saveButton(this.modal.querySelector('.js-save-your-changes'), config, stepDescription, update);
        return saveChanges;
    }
};

export const createGuideHandler = (step) => {
    
    const guide = new CreateGuide(step);

    guide.createStep(step);

    guide.nextStepAction.addEventListener('click', event => {    
        guide.createStep(guide.getCurrentStep + 1, 'NEXT');
    });

    guide.previousStepAction.addEventListener('click', event => {
        guide.createStep(guide.getCurrentStep - 1, 'PREVIOUS');
    });

}