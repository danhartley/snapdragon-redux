import 'ui/css/groups/create-guide.css';

import { actions } from 'redux/actions/action-creators';
import { store } from 'redux/store';
import { renderTemplate } from 'ui/helpers/templating';
import { renderSpeciesSearchOptions } from 'ui/create-guide-modal/species-search-options';
import { renderLocation } from 'ui/create-guide-modal/location';
import { renderInatUser } from 'ui/create-guide-modal/inat-user';
import { renderCategories } from 'ui/create-guide-modal/categories';
import { renderSpeciesPicker } from 'ui/create-guide-modal/species-picker';
import { saveGuide } from 'ui/create-guide-modal/common/save-guide';
import { speciesSearch } from 'ui/create-guide-modal/species-search';
import { enums } from 'ui/helpers/enum-helper';

import actionsTemplate from 'ui/create-guide-modal/common/actions-template.html';

class CreateGuide {

    constructor(step) {
        
        this.listeners = [];

        this.steps = [
            { number: 1, title: 'Species Picker', description: 'Provenance', nextStep: '', disabled: true, className:'species-actions',
                nextSteps: [
                    { id: enums.guideType.LOCATION.name, step: 'Location' },
                    { id: enums.guideType.INAT.name, step: 'Location'},
                    { id: enums.guideType.PICKER.name, step: 'Picker'},
                ] },
            { number: 2, title: 'Species Picker', description: 'Location', nextStep: 'Taxa', prevStep: 'Provenance', disabled: true, className:'location-actions' },
            { number: 2, title: 'Species Picker', description: 'Picker', nextStep: 'Species', prevStep: 'Provenance', disabled: true, className:'location-actions' },
            { number: 3, title: 'Species Picker', description: 'Taxa', nextStep: 'Species', disabled: true, className:'taxa-actions' },
            { number: 4, title: 'Species Picker', description: 'Species', nextStep: 'View Guide', disabled: true, className:'filter-actions' }
        ];

        this.currentStep = this.steps.find(s => s.number == step);
        
        this.modal = document.getElementById('createGuide');

        if(!this.modal) return;

        this.modalTitle = this.modal.querySelector('.js-modal-title header');
        this.navigationContainer = this.modal.querySelector('.js-modal-guide-navigation');
        this.progressSteps = this.modal.querySelectorAll('.js-modal-guide-progress > div > div');
        
        this.previousStepActionArrow = this.modal.querySelector('.js-left');
        this.previousStepActionTxt = this.modal.querySelector('.js-left .title');
        
        this.optionsTxt = this.modal.querySelector('.js-centre .title');
        
        this.nextStepActionArrow = this.modal.querySelector('.js-right');
        this.nextStepActionTxt = this.modal.querySelector('.js-right .title');

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

        this.user = store.getState().user;
    }

    addStepActions(nextStep) {
        
        if(!nextStep) return;
        
        const parent = this.modal.querySelector('.js-step-action-content');
              parent.innerHTML = '';
        const template = document.createElement('template');
              template.innerHTML = actionsTemplate;
        const description = this.steps.find(step => step.number === this.currentStep.number).description;

        renderTemplate({ className: nextStep.className }, template.content, parent);

        const options = this.modal.querySelector('.js-options > h1');

        switch(description) {
            case 'Provenance':
                options.innerHTML = 'How do you want to select your species?';
                renderSpeciesSearchOptions(this);
                break;
            case 'Location':                                
                options.innerHTML = 'Filter species by location and season.'
                switch(this.option) {
                    case enums.guideType.LOCATION.name:
                        renderLocation(this.modal, this);
                        break;
                    case enums.guideType.INAT.name:
                        renderInatUser(this.modal, this);
                        break;
                    case enums.guideType.PICKER.name:
                        const chosenOnes = this.modal.querySelector('.js-chosen');
                              chosenOnes.classList.add('hide-important');
                        document.querySelector('.js-step-action-content .location-actions').classList.add('species-picker-actions');
                        renderSpeciesPicker({
                            container: this.modal,
                            config: this.config,
                            setConfig: this.setConfig
                        }, this.modal.querySelector('.js-actions'));
                        const title = this.modal.querySelector('.js-options > h1');
                              title.innerHTML = 'Add species by name.';            
                        break;
                }
                break;
            case 'Taxa':
                options.innerHTML = 'Filter species by taxa.'
                renderCategories(this.modal, this);
                break;
            case 'Species':
                setTimeout(() => {
                    speciesSearch(this);
                });
                break;
        }
    }

    goToNextStep(nextStep, direction, option = null, next = null) {

        this.currentStep = next || this.steps.find(s => s.number === nextStep);

        if(option === enums.guideType.PICKER.name && direction === 'NEXT') {
            this.currentStep = this.steps[2];
        }

        this.direction = direction;
        this.option = option || this.option;

        if(this.startLesson ) {
            this.currentStep = { number: 0 };
        };

        if(!this.modalTitle) return;
        
        this.modalTitle.innerText = this.currentStep.title;
        this.nextStepActionTxt.innerHTML = this.currentStep.nextStep;

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
            this.nextStepActionArrow.dataset.number = this.currentStep.number;
            this.previousStepActionTxt.classList.remove('hide-important');
            const previousStepProperties = this.currentStep.prevStep
                                                ? this.steps.find(s => s.description === this.currentStep.prevStep)
                                                : this.steps.find(s => s.number === (this.currentStep.number - 1));
            

            if(this.getCurrentStep().number === 4) {
                this.previousStepActionTxt.innerHTML = this.option === enums.guideType.PICKER.name 
                    ? this.steps[2].description
                    : this.steps[3].description;
            } else {
                this.previousStepActionTxt.innerHTML = previousStepProperties.description;
            }
        }
    }

    saveStep(stepDescription, config) {
        saveGuide(config || this.getConfig(), stepDescription)();
    }
};

export const createGuideHandler = step => {

    const guide = new CreateGuide(step);
    
    guide.goToNextStep(step, 'NEXT');

    const handleNextStepAction = event => {
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

    const handlePreviousStepAction = event => {

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