import { createLesson } from 'snapdragon-engine/lesson-builder';
import { layouts } from 'snapdragon-config/screen-layouts';
import { getNextActiveLayerLayouts } from 'snapdragon-engine/lesson-plan-handler';
import { getBonusTests } from 'snapdragon-engine/bonus/bonus-test-handler';
import { store } from 'redux/store';

const { summary, history } = layouts;

const createLessonPlan = (lessonPlan, config, collection) => {

    let { lesson } = store.getState(); // pass in

    collection.lesson = collection.lesson || { ...lessonPlan, level: { id: 1 } }; // lesson

    const layouts = getNextActiveLayerLayouts(collection, lessonPlan, config);
    
    const bonusTests = [];
    const bonusLayouts = [];
    // const bonusTests = getBonusTests(collection, config);
    // const bonusLayouts = collection.lesson.level.bonusLayouts;

    return createLesson(
        lessonPlan,
        layouts, 
        [ summary, history ],
        collection,
        bonusTests,
        bonusLayouts
    );        
};

export const lessonPlanner = {
    createLessonPlan
}