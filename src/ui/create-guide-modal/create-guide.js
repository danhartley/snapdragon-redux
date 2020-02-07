import 'ui/create-guide-modal/create-guide.css';

import { actions } from 'redux/actions/action-creators';
import { store } from 'redux/store';
import { renderTemplate } from 'ui/helpers/templating';
import { renderSpecies } from 'ui/create-guide-modal/species';
import { renderLocation } from 'ui/create-guide-modal/location';
import { renderInatUser } from 'ui/create-guide-modal/inat-user';
import { renderCategories } from 'ui/create-guide-modal/categories';
import { renderSpeciesPicker } from 'ui/create-guide-modal/species-picker';
import { saveGuide } from 'ui/create-guide-modal/common/save-button';
import { speciesPendingSpinner } from 'ui/create-guide-modal/species-pending';
import { enums } from 'ui/helpers/enum-helper';

import actionsTemplate from 'ui/create-guide-modal/common/actions-template.html';

class CreateGuide {

    constructor(step) {
        
        this.listeners = [];

        this.steps = [
            { number: 1, title: 'Species Picker', description: 'Provenance', nextStep: '', disabled: true, className:'species-actions',
                nextSteps: [
                    { id: enums.guideOption.LOCATION.name, step: 'Location' },
                    { id: enums.guideOption.INAT.name, step: 'Location'},
                    { id: enums.guideOption.PICKER.name, step: 'Picker'},
                ] },
            { number: 2, title: 'Species Picker', description: 'Location', nextStep: 'Taxa', prevStep: 'Provenance', disabled: true, className:'location-actions' },
            { number: 2, title: 'Species Picker', description: 'Picker', nextStep: 'Fetch Species', prevStep: 'Provenance', disabled: true, className:'location-actions' },
            { number: 3, title: 'Species Picker', description: 'Taxa', nextStep: 'Fetch Species', disabled: true, className:'taxa-actions' },
            { number: 4, title: 'Species Picker', description: 'Spinner', nextStep: 'Open Lesson', disabled: true, className:'filter-actions' }
        ];

        this.currentStep = this.steps.find(s => s.number == step);
        
        this.modal = document.getElementById('createGuide');

        if(!this.modal) return;

        this.modalTitle = this.modal.querySelector('.js-modal-title div:nth-child(1)');
        this.navigationContainer = this.modal.querySelector('.js-modal-guide-navigation');
        this.progressSteps = this.modal.querySelectorAll('.js-modal-guide-progress > div > div');
        this.previousStepAction = this.modal.querySelector('.js-modal-guide-navigation > div:nth-child(1)');
        this.previousStepTitle = this.modal.querySelector('.js-modal-guide-navigation > div:nth-child(1) > div');
        this.previousStepActionArrow = this.modal.querySelector('.js-modal-guide-navigation > div:nth-child(1) > div > span:nth-child(1)');
        this.previousStepActionTxt = this.modal.querySelector('.js-modal-guide-navigation > div:nth-child(1) > div > span:nth-child(2)');
        this.previousStepIcon = this.modal.querySelector('.js-modal-guide-navigation > div:nth-child(1) > div > span:nth-child(1)');
        this.optionsTxt = this.modal.querySelector('.js-modal-guide-navigation > div:nth-child(2) > span');
        this.nextStepAction = this.modal.querySelector('.js-modal-guide-navigation > div:nth-child(3)');
        this.nextStepTitle = this.modal.querySelector('.js-modal-guide-navigation > div:nth-child(3) > div');
        this.nextStepActionTxt = this.modal.querySelector('.js-modal-guide-navigation > div:nth-child(3) > div > span:nth-child(1)');
        this.nextStepActionArrow = this.modal.querySelector('.js-modal-guide-navigation > div:nth-child(3) > div > span:nth-child(2)');

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
            this.currentStep = this.steps.find(s => s.number === step);
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
        const description = this.steps.find(step => step.number === this.currentStep.number).description;

        renderTemplate({ className: nextStep.className }, template.content, parent);

        const options = this.modal.querySelector('.js-options');

        switch(description) {
            case 'Provenance':
                options.innerHTML = 'Select the species you want to study.';
                renderSpecies(this);
                break;
            case 'Location':                                
                options.innerHTML = 'Filter species by location and season.'
                switch(this.option) {
                    case enums.guideOption.LOCATION.name:
                        renderLocation(this.modal, this);
                        break;
                    case enums.guideOption.INAT.name:
                        renderInatUser(this.modal, this);
                        break;
                    case enums.guideOption.PICKER.name:                        
                        renderSpeciesPicker(this);
                        break;
                }
                break;
            case 'Taxa':
                options.innerHTML = 'Filter species by taxa.'
                renderCategories(this.modal, this);
                break;
            case 'Spinner':
                setTimeout(() => {
                    speciesPendingSpinner(this);
                });
                break;
        }
    }

    goToNextStep(nextStep, direction, option, next = null) {

        this.currentStep = next || this.steps.find(s => s.number === nextStep);
        this.direction = direction;
        this.option = option || this.option;

        if(this.startLesson ) {
            this.currentStep = { number: 0 };
        };

        const currentStepProperties = next || this.steps.find(s => s.number === this.currentStep.number);

        if(!this.modalTitle) return;
        
        this.modalTitle.innerText = currentStepProperties.title;
        this.nextStepActionTxt.innerHTML = currentStepProperties.nextStep;

        this.progressSteps.forEach((ps,index) => {

            ps.classList.remove('active');

            if(index + 1 === this.currentStep.number) {
                ps.classList.add('active');
                for(let i = 0; i < index; i++) {
                    this.progressSteps[i].classList.add('completed');
                }
            }
        });
        
        this.addStepActions(this.steps.find(step => step.number === this.currentStep.number));

        if(this.currentStep.number === 1) {
            this.navigationContainer.classList.remove('progress-container');
            this.optionsTxt.classList.remove('hide-important');
            this.previousStepActionTxt.classList.add('hide-important');
            this.previousStepActionArrow.classList.add('arrow-wrapper-hidden');
            this.nextStepActionArrow.classList.add('arrow-wrapper-hidden');
        } else {
            this.navigationContainer.classList.add('progress-container');
            this.optionsTxt.classList.add('hide-important');
            this.previousStepActionArrow.classList.remove('arrow-wrapper-hidden');
            this.nextStepActionArrow.classList.remove('arrow-wrapper-hidden');
            this.previousStepActionTxt.classList.remove('hide-important');
            this.previousStepTitle.classList.remove('hide-important');
            this.previousStepIcon.classList.remove('hide-important');
            const previousStepProperties = this.currentStep.prevStep
                                                ? this.steps.find(s => s.description === this.currentStep.prevStep)
                                                : this.steps.find(s => s.number === (this.currentStep.number - 1));
            this.previousStepActionTxt.innerHTML = previousStepProperties.description;
        }
    }

    saveStep(stepDescription) {
        saveGuide(this.getConfig(), stepDescription)();
    }
};

export const createGuideHandler = step => {

    const guide = new CreateGuide(step);

    guide.goToNextStep(step);

    const handleNextStepAction = event => {        
        guide.startLesson = guide.nextStepActionTxt.innerHTML.indexOf('Open Lesson') > -1; // hack
        if(guide.startLesson) guide.nextStepActionTxt.nextSibling.setAttribute('data-dismiss','modal');
        guide.goToNextStep(guide.getCurrentStep().number + 1, 'NEXT');
        guide.listeners.push( { element: guide.nextStepAction, handler: handleNextStepAction });
    };

    guide.nextStepAction.addEventListener('click', handleNextStepAction, true);

    const handlePreviousStepAction = event => {
        guide.goToNextStep(guide.getCurrentStep().number - 1, 'PREVIOUS');
        guide.listeners.push( { element: guide.previousStepAction, handler: handlePreviousStepAction });
    };

    guide.previousStepAction.addEventListener('click', handlePreviousStepAction, true);
};