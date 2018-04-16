export const createLesson = (lessonName, levelName, moduleSize, layouts, progressScreens, excludeRevision) => {
    
    if(excludeRevision) {
        layouts = layouts.filter(layout => layout.name !== 'revision');
    }

    const lessonPlan = [];

    lessonPlan.lessonName = lessonName;
    lessonPlan.levelName = levelName;

    let layoutIndex = 0;

    layouts.forEach( (layout, index) => {

        let i = 0;
        do {
            lessonPlan.push({...layout, layoutIndex: layoutIndex, itemIndex: i, exerciseIndex: index + 1, lessonName, levelName});
            lessonPlan[lessonPlan.length - 1].layoutIndex = layoutIndex;
            layoutIndex = layoutIndex + 1;
            i = i + 1;
        } while (i < moduleSize);
    });
    
    const finalLayout = lessonPlan[lessonPlan.length -1];
    const finalLayoutScreens = finalLayout.screens;
    const screens = [ ...finalLayoutScreens, ...progressScreens];
    finalLayout.screens = screens;

    lessonPlan.moduleSize = moduleSize;

    return lessonPlan;
};