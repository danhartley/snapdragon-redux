export const createLesson = (lessonName, levelName, moduleSize, layouts, progressScreens, excludeRevision) => {
    
    if(excludeRevision) {
        layouts = layouts.filter(layout => layout.name !== 'revision');
    }

    const lessonPlan = [];

    lessonPlan.lessonName = lessonName;
    lessonPlan.levelName = levelName;
    lessonPlan.moduleSize = moduleSize;

    let layoutIndex = 0;    

    layouts.forEach( (layout, index) => {

        let i = 0;
        do {
            lessonPlan.push({...layout, layoutIndex: layoutIndex, itemIndex: i, exerciseIndex: index + 1, lessonName, levelName});
            lessonPlan[lessonPlan.length - 1].layoutIndex = layoutIndex;
            layoutIndex = layoutIndex + 1;
            i++;
        } while (i < moduleSize);
    });
    
    const summaryLayout = {
        name: 'summary',
        screens: [...progressScreens],
        lessonName,
        levelName,
        layoutIndex: lessonPlan.length,
        itemIndex: 0  
    };

    lessonPlan.push(summaryLayout);

    const scores = lessonPlan.map(layout => layout.score || 0);
    const roundScoreCount = scores.reduce((accumulator, currentValue) => accumulator + currentValue);
    lessonPlan.map(layout => layout.roundScoreCount = roundScoreCount);

    lessonPlan.moduleSize = moduleSize;

    return lessonPlan;
};