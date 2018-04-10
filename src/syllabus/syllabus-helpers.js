export const createLesson = (layouts, progressScreens, itemCount) => {
    
    const lessonPlan = [];
    let layoutIndex = 0;

    layouts.forEach( (layout, index) => {

        let i = 0;
        do {
            lessonPlan.push({...layout, layoutIndex: layoutIndex, itemIndex: i, exerciseIndex: index + 1});
            layoutIndex = layoutIndex + 1;
            i = i + 1;
        } while (i < itemCount);
    });
    
    const finalLayout = lessonPlan[lessonPlan.length -1];
    const finalLayoutScreens = finalLayout.screens;
    const screens = [ ...finalLayoutScreens, ...progressScreens];
    finalLayout.screens = screens;

    return lessonPlan;
};