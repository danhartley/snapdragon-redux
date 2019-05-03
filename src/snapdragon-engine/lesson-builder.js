import { DOM } from 'ui/dom';
import { utils } from 'utils/utils';

export const createLesson = (lessonPlan, layouts, progressScreens, collection) => {

    lessonPlan.layouts = [];

    const { moduleSize, lessonName, levelName } = collection;
    const itemsCountToDate = (collection.currentRound - 1) * moduleSize;
    const itemsLeft = collection.items.length - itemsCountToDate;

    const layoutsToAdd = moduleSize > itemsLeft ? itemsLeft : moduleSize;

    layouts.forEach( (layout, index) => {
        let i = 0;
        do {
            lessonPlan.layouts.push({...layout, lessonName, levelName });
            i++;
        } while (i < layoutsToAdd);
    });

    // collection layouts, indexed to match place in layout order (there my be more than 1 question per item)

    const lessonLayouts = lessonPlan.layouts.map( (layout, i) => {
        layout.itemIndex = layout.itemIndex || utils.calcItemIndex(itemsCountToDate, layoutsToAdd, i);
        layout.roundProgressIndex = i + 1;
        return { ...layout };
    });

    // bonus layouts, variable depending on item traits, etc.

    // these will kick in AFTER itemIndex has been set to zero, and BEFORE the summary. 

    // new reducer, BONUS, will need to know:
    // the bonus index
    // the current item index (to use the species, or family, etc.)

    // score: markBonusTest

    // remove all wildcard, definition panels and layouts, add new bonus panel and bonus-layout

    // option to 'wrap' collection screens, e.g. family name, to show family images. ('To which family/group/class do these species beling?')

    const bonusLayouts = [];

    // we want to attach these to score (and then history) object, in order not to repeat questions

    lessonPlan.layouts = [ ...lessonLayouts, ...bonusLayouts ];

    lessonPlan.lessonName = lessonName;
    lessonPlan.levelName = levelName;
    lessonPlan.moduleSize = moduleSize;

    const summaryLayout = lessonPlan.portrait 
        ? {
            name: 'summary',
            screens: [{ 
                name: 'summary', 
                domain: 'history', 
                parent: DOM.rightBody
            }],
            lessonName,
            levelName,
            layoutIndex: lessonPlan.layouts.length,
            itemIndex: 0
        }
        : {
            name: 'summary',
            screens: [...progressScreens],
            lessonName,
            levelName,
            layoutIndex: lessonPlan.layouts.length,
            itemIndex: 0
        };

    lessonPlan.layouts.push(summaryLayout);

    const scores = lessonPlan.layouts.map(layout => layout.score || 0);
    const roundScoreCount = scores.reduce((accumulator, currentValue) => accumulator + currentValue);

    lessonPlan.layouts.map(layout => layout.roundScoreCount = roundScoreCount);

    lessonPlan.moduleSize = moduleSize;
    lessonPlan.questionCount = lessonPlan.layouts.filter(layout => layout.type === 'test').length;
    lessonPlan.layoutCount = lessonPlan.layouts.length;
    lessonPlan.layoutNames = lessonPlan.layouts.map(layout => layout.name);

    return { updatedLessonPlan: lessonPlan, updatedCollection: collection };
};