import { createLesson } from 'snapdragon-engine/lesson-builder';
import { layouts } from 'snapdragon-config/screen-layouts';
import { getNextActiveLayerLayouts } from 'snapdragon-engine/lesson-plan-handler';

const { summary, history } = layouts;

const createLessonPlan = async (lessonPlan, config, collection, lesson) => {

    lesson.moduleSize = lesson.moduleSize || config.moduleSize;
    lesson.currentRound = lesson.currentRound || 1;

    let rounds = collection.items.length / lesson.moduleSize;            
        rounds = collection.items.length % lesson.moduleSize === 0 ? rounds : rounds === 1 ? 1 : Math.floor(rounds) + 1;

    lesson = lesson.level === undefined ? { ...lesson, ...lessonPlan, level: { id: 1 }, rounds } : lesson;

    const layouts = getNextActiveLayerLayouts(lessonPlan, config, lesson);
    
    return await createLesson(
        lessonPlan,
        layouts, 
        [ summary, history ],
        collection,
        lesson
    );        
};

export const lessonPlanner = {
    createLessonPlan
}