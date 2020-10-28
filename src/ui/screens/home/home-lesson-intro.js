import { DOM } from 'ui/dom';
import { store } from 'redux/store';
import { videoSetup } from 'ui/screens/home/home-lesson-intro-video';
import { textSetup } from 'ui/screens/home/home-lesson-intro-text';

export const renderLessonIntro = (collection, showText = false) => {

    const { config, videoPlayer, collection: lesson } = store.getState();

    collection = { ...collection, items: lesson.items };

    showText
      ? textSetup(collection, config)
      : collection.hasVideo 
          ? videoSetup(collection, videoPlayer || [], DOM.rightBody) 
          : textSetup(collection, config);
    
}