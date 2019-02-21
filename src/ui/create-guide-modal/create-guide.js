import * as R from 'ramda';

import { store } from 'redux/store';
import { renderTemplate } from 'ui/helpers/templating';
import { renderLocation } from 'ui/create-guide-modal/location';
import { renderCategories } from 'ui/create-guide-modal/categories';
import { renderEcosystems } from 'ui/create-guide-modal/ecosystems';
import actionsTemplate from 'ui/create-guide-modal/common/actions-template.html';
import { renderGuides } from 'ui/create-guide-modal/guides';

class CreateGuide {
    
    constructor() {
        
        this.currentStep = 0;
        
        this.steps = [
            { number: 1, title: 'Create your Guide', description: 'Your Location', nextStep: 'Choose an environment' },
            { number: 2, title: 'Create your Guide', description: 'Environment', nextStep: 'Select species' },
            { number: 3, title: 'Create your Guide', description: 'Species', nextStep: 'Select guide type' },
            { number: 4, title: 'Create your Guide', description: 'Guide', nextStep: 'Start Guide' },
        ];
        
        this.modal = document.getElementById('createGuide');

        this.modalTitle = this.modal.querySelector('.js-modal-title div:nth-child(1)');
        this.modalTitleSteps = this.modal.querySelector('.js-modal-title div:nth-child(2)');
        this.progressSteps = this.modal.querySelectorAll('.js-create-guide-progress > div > div');
        this.previousStepTitle = this.modal.querySelector('.js-create-guide-navigation > div:nth-child(1) > div');
        this.previousStepAction = this.modal.querySelector('.js-create-guide-navigation > div:nth-child(1)');
        this.previousStepActionTxt = this.modal.querySelector('.js-create-guide-navigation > div:nth-child(1) > div > span:nth-child(2)');
        this.previousStepIcon = this.modal.querySelector('.js-create-guide-navigation > div:nth-child(1) > div > span:nth-child(1)');
        this.nextStepTitle = this.modal.querySelector('.js-create-guide-navigation > div:nth-child(2) > div');
        this.nextStepAction = this.modal.querySelector('.js-create-guide-navigation > div:nth-child(2)');
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

        const { config: configState, collections: collectionsState } = store.getState();
        const config = R.clone(configState);
        const collections = R.clone(collectionsState);

        template.innerHTML = actionsTemplate;
        renderTemplate({}, template.content, parent);

        switch(description) {
            case 'Your Location':                                
                renderLocation(this.modal, config);       
                break;
            case 'Environment':
                renderEcosystems(this.modal, config, collections);
                break;
            case 'Species':
                renderCategories(this.modal, config);
                break;
            case 'Guide':
                renderGuides(this.modal, config);
                break;
        }
    }

    createStep(nextStep) {

        this.currentStep = nextStep;

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

        if(this.currentStep === this.steps.length + 1) {
            this.nextStepActionTxt.setAttribute('data-dismiss','modal');
        }   
    }
};

export const createGuideHandler = (step) => {
    
    const guide = new CreateGuide();

    guide.createStep(step);

    guide.nextStepAction.addEventListener('click', event => {
        const nextStep = guide.getCurrentStep + 1;
        guide.createStep(nextStep);
    });

    guide.previousStepAction.addEventListener('click', event => {
        const previousStep = guide.getCurrentStep - 1;        
        guide.createStep(previousStep);
    });

}