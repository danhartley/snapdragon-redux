import { renderTemplate } from 'ui/helpers/templating';
import { DOM } from 'ui/dom';
import { store } from 'redux/store';
import { renderSpeciesCollectionList } from 'ui/screens/lists/species-list';

import lessonTemplate from 'ui/screens/home/home-lesson-intro-template.html';

export const renderLesson = lesson => {

    const { config } = store.getState();

    if(!lesson) return;

    const template = document.createElement('template');
          template.innerHTML = lessonTemplate;

    DOM.rightBody.innerHTML = '';

    lesson.video.webLabel = lesson.video.links[1].label;
    lesson.video.webUrl = lesson.video.links[1].url;
    
    renderTemplate({ video: lesson.video }, template.content, DOM.rightBody);

    const video = document.getElementsByTagName('iframe')[0];
    const videoWidth = video.offsetWidth;
    video.height = videoWidth * 9/16;

    const loadSpeciesCallback = () => console.log('getting species!');

    const container = DOM.rightBody.querySelector('.lesson-list .scrollable');

    if(config.isPortraitMode) {
        renderSpeciesCollectionList(lesson, { readOnlyMode: false, parent: container, tableParent: container, loadSpeciesCallback, isInCarousel: false });
    }
}