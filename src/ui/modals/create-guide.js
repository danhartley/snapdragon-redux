import { renderTemplate } from 'ui/helpers/templating';
import locationTemplate from 'ui/modals/location-template.html';
import { renderLocation } from 'ui/modals/location';
import inatUserTemplate from 'ui/modals/inat-user-template.html';
import categoriesTemplate from 'ui/modals/categories-template.html';
import { renderCategories } from 'ui/modals/categories';
import ecosystemsTemplate from 'ui/modals/ecosystems-template.html';
import { renderEcosystems } from 'ui/modals/ecosystems';
import guidesTemplate from 'ui/modals/guides-template.html';
import { renderGuides } from 'ui/modals/guides';

class CreateGuide {
    
    constructor(config, collections) {
        
        this.currentStep = 0;
        this.config = config;
        this.collections = collections;
        
        this.steps = [
            { number: 1, title: 'Create a guide to your ecosystem', description: 'Location', nextStep: 'Category Filters' },
            { number: 2, title: 'Create a guide to your ecosystem', description: 'Category filters', nextStep: 'Choose Ecosystem' },
            { number: 3, title: 'Create a guide to your ecosystem', description: 'Ecosystem', nextStep: 'Choose Guide' },
            { number: 4, title: 'Create a guide to your ecosystem', description: 'Guide', nextStep: 'Start Guide' },
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
        switch(this.currentStep) {
            case 1:                
                template.innerHTML = locationTemplate;
                renderTemplate({}, template.content, parent);
                renderLocation(this.config, this.modal);
                template.innerHTML = inatUserTemplate;
                // renderTemplate({}, template.content, parent);
                break;
            case 2:
                template.innerHTML = categoriesTemplate;
                renderTemplate({}, template.content, parent);
                renderCategories(this.config, this.modal);
                break;
            case 3:
                template.innerHTML = ecosystemsTemplate;
                renderTemplate({}, template.content, parent);
                renderEcosystems(this.config, this.collections, this.modal);
                break;
            case 4:
                template.innerHTML = guidesTemplate;
                renderTemplate({}, template.content, parent);
                renderGuides(this.config, this.modal);
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
            if(index + 1 === this.currentStep) {
                ps.classList.add('active');
                for(let i = 0; i < index; i++) {
                    this.progressSteps[i].classList.remove('active');
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

        if(this.currentStep === 5) {
            this.nextStepActionTxt.setAttribute('data-dismiss','modal');
        }   
    }
};

export const createGuideHandler = (step, config, collections) => {
    
    const guide = new CreateGuide(config, collections);

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