import { actions } from 'redux/actions/action-creators';
import { returnTaxonIcon } from 'ui/helpers/icon-handler';
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
            },
            collection: {
              id: 2
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
            },
            collection: {
              id: 2
            }
        },
        {
            id: 3,
            name: 'Snapdragon Lichens',            
            guide: {
                locationPlace: 'Planet Earth',
                locationType: 'place',
                place: {
                    name: 'Planet Earth',
                    id: 'any',
                    type: 'places'
                },
                season: {
                    type: 'all_year'
                },
                iconicTaxa: [
                    {
                      id: 'fungi',
                      common: 'Fungi & Lichens'
                    }
                ],
                ready: true
            },
            collection: {
              id: 3
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

    const taxa = modal.querySelectorAll('.lesson-taxa');

    taxa.forEach(taxon => {
        const lessonId = parseInt(taxon.dataset.lessonId);
        const lessonTaxa = lessons.find(lesson => lesson.id === lessonId).guide.iconicTaxa.map(taxon => taxon.id);

        let icons = '';

        lessonTaxa.forEach(taxon => {
          const icon = returnTaxonIcon(taxon);
          icons += icon;
        });

        taxon.innerHTML = icons;
    });

    const confirmLessonBtn = modal.querySelector('.js-confirm-lesson-btn');
    const navigationBtn = modal.querySelector('.js-modal-guide-navigation div:nth-child(2)');
    navigationBtn.disabled = true;

    let selectedLesson;

    const lessonSelectors = modal.querySelectorAll('.btn.btn-secondary');

    lessonSelectors.forEach(lesson => {
        lesson.addEventListener('click', event => {
            confirmLessonBtn.disabled = false;
            let id = event.target.id;
            selectedLesson = lessons.find(lesson => lesson.id === parseInt(id));
        });
    });

    confirmLessonBtn.addEventListener('click', event => {        
        config.guide = { ...config.guide, ...selectedLesson.guide };
        config.collection = { ...config.collection, ...selectedLesson.collection };
        actions.boundUpdateConfig(config);

        navigationBtn.disabled = false;
        navigationBtn.setAttribute('data-dismiss','modal');

        const txt = modal.querySelector('.js-saved');

        txt.innerHTML = 'Your preference has been updated';
          setTimeout(() => {
              txt.innerHTML = '';
          }, 2000);
    });

    navigationBtn.addEventListener('click', event => {
        closeModalListeners.forEach(listener => listener());
    });
};