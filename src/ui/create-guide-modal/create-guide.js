import 'ui/create-guide-modal/create-guide.css';

import { actions } from 'redux/actions/action-creators';
import { store } from 'redux/store';
import { renderHome } from 'ui/screens/home/home';
import { renderTemplate } from 'ui/helpers/templating';
import { renderSpecies } from 'ui/create-guide-modal/species';
import { renderLocation } from 'ui/create-guide-modal/location';
import { renderInatUser } from 'ui/create-guide-modal/inat-user';
import { renderCategories } from 'ui/create-guide-modal/categories';
import { renderSeason } from 'ui/create-guide-modal/season';
import { saveButton } from 'ui/create-guide-modal/common/save-button';
import { enums } from 'ui/helpers/enum-helper';

import actionsTemplate from 'ui/create-guide-modal/common/actions-template.html';

const closeModalListeners = [];

export const listenToCloseCreateGuideModal = listener => { 
    closeModalListeners.push(listener);
};

class CreateGuide {

    constructor(step) {
        
        this.listeners = [];

        this.currentStep = step;
        
        this.steps = [
            { number: 1, title: 'Create Lesson', description: 'Options', nextStep: '', disabled: true, className:'species-actions' },
            { number: 2, title: 'Create Lesson', description: 'Location', nextStep: 'Taxa', disabled: true, className:'location-actions' },
            { number: 3, title: 'Create Lesson', description: 'Taxa', nextStep: 'Language', disabled: true, className:'taxa-actions',
                alternative: { nextStep: 'Start Lesson' } },
            { number: 4, title: 'Create Lesson', description: 'Season', nextStep: 'Start Lesson', disabled: true, className:'filter-actions' }
        ];
        
        this.modal = document.getElementById('createGuide');

        if(!this.modal) return;

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
    }

    addStepActions(className) {
        
        const parent = this.modal.querySelector('.js-step-action-content');
              parent.innerHTML = '';
        const template = document.createElement('template');
              template.innerHTML = actionsTemplate;
        const description = this.steps.find(step => step.number === this.currentStep).description;

        renderTemplate({ className }, template.content, parent);

        switch(description) {
            case 'Options':
                renderSpecies(this);
                break;
            case 'Location':
                
                const options = this.modal.querySelector('.js-options');
                      options.classList.add('hide-important');
                const steps = this.modal.querySelector('.js-steps');
                      steps.classList.remove('hide-important');
                const navigation = this.modal.querySelector('.js-modal-guide-navigation');
                      navigation.classList.remove('hide-important');

                switch(this.option) {
                    case 'A':
                        renderLocation(this.modal, this);
                        break;
                    case 'B':
                        renderInatUser(this.modal, this);
                        break;
                    case 'C':
                        // picker
                        break;
                }
                break;
            case 'Taxa':
                renderCategories(this.modal, this);
                break;
            case 'Season':
                renderSeason(this.modal, this);
                break;
        }
    }

    goToNextStep(nextStep, direction, option) {

        this.currentStep = nextStep;
        this.direction = direction;
        this.option = option;

        this.nextStepActionTxt.removeAttribute('data-dismiss');

        if(this.startLesson ) {
            closeModalListeners.forEach(listener => listener(enums.lessonState.GET_SPECIES));
            this.currentStep = 0;
            const config = this.getConfig();
                  config.guide.ready = true;
            this.setConfig(config);
            
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

        if(!this.modalTitle) return;
        
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

    saveStep(stepDescription, update = true) {
        saveButton(this.getConfig(), stepDescription)();
    }
};

export const createGuideHandler = (step) => {

    const guide = new CreateGuide(step);

    guide.goToNextStep(step);

    const handleNextStepAction = event => {
        guide.startLesson = guide.nextStepActionTxt.innerHTML.indexOf('Start Lesson') > -1; // hack
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