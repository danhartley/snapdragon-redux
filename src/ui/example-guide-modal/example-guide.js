import { actions } from 'redux/actions/action-creators';
import { store } from 'redux/store';
import { renderTemplate } from 'ui/helpers/templating';
import exampleGuideTemplate from 'ui/example-guide-modal/example-guide.html';

const closeModalListeners = [];

export const listenToCloseExampleGuideModal = listener => { 
    closeModalListeners.push(listener);
};

export const renderExampleGuideHandler = config => {

    const modal = document.getElementById('exampleGuide');
    
    const lessons = [
        {
            id: 1,
            name: 'Parque Florestal Monsanto',            
            guide: {
                locationPlace: 'Monsanto Forest Park, LI, PT',
                locationType: 'place',
                place: {
                    name: 'Monsanto Forest Park, LI, PT',
                    id: 61034,
                    type: 'places'
                },
                season: {
                    type: 'all_year'
                },
                iconicTaxa: [
                    {
                      id: 'fungi',
                      common: 'Fungi & Lichens'
                    },
                    {
                      id: 'amphibia',
                      common: 'Amphibians'
                    },
                    {
                      id: 'mammalia',
                      common: 'Mammals'
                    },
                    {
                      id: 'plantae',
                      common: 'Plants'
                    },
                    {
                      id: 'lepidoptera',
                      common: 'Butterflies & Moths'
                    },
                    {
                      id: 'insecta',
                      common: 'Insects'
                    },
                    {
                      id: 'aves',
                      common: 'Birds'
                    }
                ],
                ready: true
            }
        },
        {
            id: 2,
            name: 'O Parque Natural da Arrábida, SE, PT',            
            guide: {
                locationPlace: 'O Parque Natural da Arrábida, SE, PT',
                locationType: 'place',
                place: {
                    name: 'O Parque Natural da Arrábida, SE, PT',
                    id: 131416,
                    type: 'places'
                },
                season: {
                    type: 'all_year'
                },
                iconicTaxa: [
                    {
                      id: 'fungi',
                      common: 'Fungi & Lichens'
                    },
                    {
                      id: 'amphibia',
                      common: 'Amphibians'
                    },
                    {
                      id: 'mammalia',
                      common: 'Mammals'
                    },
                    {
                      id: 'plantae',
                      common: 'Plants'
                    },
                    {
                      id: 'lepidoptera',
                      common: 'Butterflies & Moths'
                    },
                    {
                      id: 'insecta',
                      common: 'Insects'
                    },
                    {
                      id: 'aves',
                      common: 'Birds'
                    }
                ],
                ready: true
            }
        },
    ];

    lessons.forEach(lesson => {
        lesson.taxa = lesson.guide.iconicTaxa.map(taxon => taxon.common).join(', ');
    });

    const parent = modal.querySelector('.js-modal-guide-body div:nth-child(2)');
          parent.innerHTML = '';
    const template = document.createElement('template');
    template.innerHTML = exampleGuideTemplate;    
    renderTemplate({lessons}, template.content, parent);

    const confirmLessonBtn = modal.querySelector('.js-confirm-lesson-btn');
    const navigationBtn = modal.querySelector('.js-modal-guide-navigation div:nth-child(2)');
    navigationBtn.disabled = true;

    let selectedGuide;

    modal.querySelectorAll('.btn.btn-secondary').forEach(lesson => {
        lesson.addEventListener('click', event => {
            confirmLessonBtn.disabled = false;
            selectedGuide = lessons.find(lesson => lesson.id === parseInt(event.target.id)).guide;
        });
    });

    confirmLessonBtn.addEventListener('click', event => {        
        config.guide = { ...config.guide, ...selectedGuide };
        actions.boundUpdateConfig(config);

        navigationBtn.disabled = false;
        navigationBtn.setAttribute('data-dismiss','modal');
    });

    navigationBtn.addEventListener('click', event => {
        closeModalListeners.forEach(listener => listener());
    });
};