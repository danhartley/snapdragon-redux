import { createNextRound } from 'snapdragon-engine/round-planner';
import { layouts } from 'snapdragon-config/screen-layouts';
import { getNextRoundLayouts } from 'snapdragon-engine/lesson-plan-handler';

const { summary, history } = layouts;

const createLessonPlan = async (lessonPlan, config, collection, lesson) => {

    lesson.moduleSize = lesson.moduleSize || collection.moduleSize || config.moduleSize;
    lesson.currentRound = lesson.currentRound || 1;

    let rounds = collection.items.length / lesson.moduleSize;            
        rounds = collection.items.length % lesson.moduleSize === 0 ? rounds : rounds === 1 ? 1 : Math.floor(rounds) + 1;

    lesson = lesson.level === undefined ? { ...lesson, ...lessonPlan, level: { id: 1 }, rounds } : lesson;

    const nextRoundLayoutTemplates = getNextRoundLayouts(lessonPlan, config, lesson);
    // const nextRoundLayoutTemplates = [ ...lesson.levels[0].layouts, ...lesson.levels[0].bonusLayouts ]; // hack while we only have 1 level

    return await createNextRound(
        lessonPlan,
        nextRoundLayoutTemplates, 
        [ summary, history ],
        collection,
        lesson
    );        
};

export const lessonPlanner = {
    createLessonPlan
}