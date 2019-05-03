import { createLesson } from 'snapdragon-engine/lesson-builder';
import { layouts } from 'snapdragon-config/screen-layouts';
import { getNextActiveLayerLayouts } from 'snapdragon-engine/lesson-plan-handler';
import { getBonusTests } from 'snapdragon-engine/bonus/bonus-test-handler';

const { summary, history } = layouts;

const createLessonPlan = (lessonPlan, config, collection) => {

    collection.lesson = collection.lesson || { ...lessonPlan, level: { id: 1 } };

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