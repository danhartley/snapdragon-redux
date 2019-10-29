import 'ui/create-guide-modal/create-guide.css';

import { actions } from 'redux/actions/action-creators';
import { store } from 'redux/store';
import { renderTemplate } from 'ui/helpers/templating';
import { renderSpecies } from 'ui/create-guide-modal/species';
import { renderLocation } from 'ui/create-guide-modal/location';
import { renderInatUser } from 'ui/create-guide-modal/inat-user';
import { renderCategories } from 'ui/create-guide-modal/categories';
import { renderSpeciesPicker } from 'ui/create-guide-modal/species-picker';
import { saveButton } from 'ui/create-guide-modal/common/save-button';
import { speciesPendingSpinner } from 'ui/create-guide-modal/species-pending';

import actionsTemplate from 'ui/create-guide-modal/common/actions-template.html';

class CreateGuide {

    constructor(step) {
        
        this.listeners = [];

        this.currentStep = step;
        
        this.steps = [
            { number: 1, title: 'Create Lesson', description: 'Options', nextStep: '', disabled: true, className:'species-actions' },
            { number: 2, title: 'Create Lesson', description: 'Location', nextStep: 'Taxa', disabled: true, className:'location-actions' },
            { number: 3, title: 'Create Lesson', description: 'Taxa', nextStep: 'Fetch Species', disabled: true, className:'taxa-actions' },
            { number: 4, title: 'Create Lesson', description: 'Spinner', nextStep: 'Open Lesson', disabled: true, className:'filter-actions' }
        ];
        
        this.modal = document.getElementById('createGuide');

        if(!this.modal) return;

        this.modalTitle = this.modal.querySelector('.js-modal-title div:nth-child(1)');
        // this.modalTitleSteps = this.modal.querySelector('.js-modal-title div:nth-child(2)');
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

        this.config = this.config || store.getState().config;

        this.getConfig = () => {
            return this.config;
        }
    
        this.setConfig = (config) => {
            this.config = config;
            actions.boundUpdateConfig(config);
        }

        this.getCurrentStep = () => {
            return this.currentStep;
        }

        this.setCurrentStep = step => {
            this.currentStep = step;
        }

        // prevent user rescaling which is caused by autocomplete

        // const viewport = document.querySelector("meta[name=viewport]");
        //       viewport.setAttribute('content', 'width=device-width, initial-scale=1, user-scalable=no');
    }

    addStepActions(nextStep) {
        
        if(!nextStep) return;
        
        const parent = this.modal.querySelector('.js-step-action-content');
              parent.innerHTML = '';
        const template = document.createElement('template');
              template.innerHTML = actionsTemplate;
        const description = this.steps.find(step => step.number === this.currentStep).description;

        renderTemplate({ className: nextStep.className }, template.content, parent);

        const options = this.modal.querySelector('.js-options');
        const navigation = this.modal.querySelector('.js-modal-guide-navigation');

        switch(description) {
            case 'Options':
                options.innerHTML = 'Choose how to find the species you want:';
                navigation.classList.add('hide-important');
                renderSpecies(this);
                break;
            case 'Location':                
                
                options.innerHTML = 'Choose species based on location and season.'
                navigation.classList.remove('hide-important');

                switch(this.option) {
                    case 'A':
                        renderLocation(this.modal, this);
                        break;
                    case 'B':
                        renderInatUser(this.modal, this);
                        break;
                    case 'C':                        
                        renderSpeciesPicker(this);
                        break;
                }
                break;
            case 'Taxa':
                renderCategories(this.modal, this);
                break;
            case 'Spinner':
                speciesPendingSpinner(this.getConfig(), this.modal);
                break;
        }
    }

    goToNextStep(nextStep, direction, option) {

        this.currentStep = nextStep;
        this.direction = direction;
        this.option = option || this.option;

        if(this.startLesson ) {
            this.currentStep = 0;
        };

        const currentStepProperties = this.steps.filter(s => s.number === this.currentStep);

        if(!this.modalTitle) return;
        
        this.modalTitle.innerText = currentStepProperties.map(s => s.title);
        // this.modalTitleSteps.innerHTML = `Step ${currentStepProperties.map(s => s.number)} of ${this.steps.length}`;
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
        
        this.addStepActions(this.steps.find(step => step.number === nextStep));

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

    saveStep(stepDescription, update = true) {
        saveButton(this.getConfig(), stepDescription)();
    }
};

export const createGuideHandler = step => {

    const guide = new CreateGuide(step);

    guide.goToNextStep(step);

    const handleNextStepAction = event => {        
        guide.startLesson = guide.nextStepActionTxt.innerHTML.indexOf('Open Lesson') > -1; // hack
        if(guide.startLesson) guide.nextStepActionTxt.nextSibling.setAttribute('data-dismiss','modal');
        guide.goToNextStep(guide.getCurrentStep() + 1, 'NEXT');
        guide.listeners.push( { element: guide.nextStepAction, handler: handleNextStepAction });
    };

    guide.nextStepAction.addEventListener('click', handleNextStepAction, true);

    const handlePreviousStepAction = event => {
        guide.goToNextStep(guide.getCurrentStep() - 1, 'PREVIOUS');
        guide.listeners.push( { element: guide.previousStepAction, handler: handlePreviousStepAction });
    };

    guide.previousStepAction.addEventListener('click', handlePreviousStepAction, true);
}