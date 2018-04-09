export const createLesson = (layouts, progressScreens, itemCount) => {
    
    const lessonPlan = [];
    let id = 0;

    layouts.forEach( (layout, index) => {

        let i = 0;
        do {
            i = i + 1;
            id = id + 1;
            lessonPlan.push({...layout,id: id});
          } while (i < itemCount);
    });
    
    const finalLayout = lessonPlan[lessonPlan.length -1];
    const finalLayoutScreens = finalLayout.screens;
    const screens = [ ...finalLayoutScreens, ...progressScreens];
    finalLayout.screens = screens;

    return lessonPlan;
};