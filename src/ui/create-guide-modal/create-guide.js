import * as R from 'ramda';

import 'ui/create-guide-modal/create-guide.css';

import { DOM } from 'ui/dom';
import { actions } from 'redux/actions/action-creators';
import { store } from 'redux/store';
import { renderHome } from 'ui/screens/home/home';
import { renderTemplate } from 'ui/helpers/templating';
import { renderLocation } from 'ui/create-guide-modal/location';
import { renderCategories } from 'ui/create-guide-modal/categories';
import { renderGuides } from 'ui/create-guide-modal/guides';
import actionsTemplate from 'ui/create-guide-modal/common/actions-template.html';
import { saveButton } from 'ui/create-guide-modal/common/save-button';

import createGuideTemplate from 'ui/create-guide-modal/create-guide-template.html';

const closeModalListeners = [];

export const listenToCloseCreateGuideModal = listener => { 
    closeModalListeners.push(listener);
};

class CreateGuide {

    constructor(step) {
        
        this.listeners = [];

        this.currentStep = step;
        
        this.steps = [
            { number: 1, title: 'Create Lesson', description: 'Location', nextStep: 'Filter species by category', disabled: true, className:'location-actions' },
            { number: 2, title: 'Create Lesson', description: 'Species', nextStep: 'Apply filters', disabled: true, className:'species-actions' },
            { number: 3, title: 'Create Lesson', description: 'Filters', nextStep: 'Start Lesson', disabled: true, className:'filter-actions' },
        ];
        
        this.modal = document.getElementById('createGuide');

        this.modalTitle = this.modal.querySelector('.js-modal-title div:nth-child(1)');
        this.modalTitleSteps = this.modal.querySelector('.js-modal-title div:nth-child(2)');
        this.progressSteps = this.modal.querySelectorAll('.js-modal-guide-progress > div > div');
        this.previousStepAction = this.modal.querySelector('.js-modal-guide-navigation > div:nth-child(1)');
        this.previousStepTitle = this.modal.querySelector('.js-modal-guide-navigation > div:nth-child(1) > div');
        this.previousStepActionTxt = this.modal.querySelector('.js-modal-guide-navigation > div:nth-child(1) > div > span:nth-child(2)');
        this.previousStepIcon = this.modal.querySelector('.js-modal-guide-navigation > div:nth-child(1) > div > span:nth-child(1)');
        this.nextStepAction = this.modal.querySelector('.js-modal-guide-navigation > div:nth-child(2)');
        this.nextStepTitle = this.modal.querySelector('.js-modal-guide-navigation > div:nth-child(2) > div');
        this.nextStepActionTxt = this.modal.querySelector('.js-modal-guide-navigation > div:nth-child(2) > div > span');

        this.progressSteps.forEach((ps,index) => {
            ps.innerHTML = this.steps[index].description;
        });      
    }

    get getCurrentStep() {
        return this.currentStep;
    }

    addStepActions(className) {
        
        let template = '';
        const parent = this.modal.querySelector('.js-landscape-inner-body');
        parent.innerHTML = '';
        template = document.createElement('template');
        const description = this.steps.find(step => step.number === this.currentStep).description;

        const { config: configState } = store.getState();
        const config = R.clone(configState);

        template.innerHTML = actionsTemplate;
        renderTemplate({ className }, template.content, parent);

        switch(description) {
            case 'Location':
                renderLocation(this.modal, config, this);
                break;
            case 'Species':
                renderCategories(this.modal, config, this);
                break;
            case 'Filters':
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
            config.guide.ready = true;
            actions.boundUpdateConfig(config);
            
            if(config.isLandscapeMode) {
                this.nextStepActionTxt.setAttribute('data-dismiss','modal');
                this.listeners.forEach((listener, index) => {
                    listener.element.removeEventListener('click', listener.handler, 'true');
                });
                this.listeners = [];
                return;
            } else {
                renderHome(0);
                return;
            }
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

        this.addStepActions(this.steps.find(step => step.number === nextStep).className);

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

    const { config } = store.getState();
    
    if(config.isPortraitMode) {
        const template = document.createElement('template');
        template.innerHTML = createGuideTemplate;
        DOM.rightBody.innerHTML = '';
        renderTemplate({}, template.content, DOM.rightBody);
    }

    const guide = new CreateGuide(step);

    guide.createStep(step);

    const handleNextStepAction = event => {
        guide.createStep(guide.getCurrentStep + 1, 'NEXT');
        guide.listeners.push( { element: guide.nextStepAction, handler: handleNextStepAction });
    };

    guide.nextStepAction.addEventListener('click', handleNextStepAction, true);

    const handlePreviousStepAction = event => {
        guide.createStep(guide.getCurrentStep - 1, 'PREVIOUS');
        guide.listeners.push( { element: guide.previousStepAction, handler: handlePreviousStepAction });
    };

    guide.previousStepAction.addEventListener('click', handlePreviousStepAction, true);

}