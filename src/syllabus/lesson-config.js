export const config = {
    moduleSize: 2,
    active: {
        lesson: 1,
        level: 1
    },
    lessons: [{
        id: 1,
        name: 'lesson1'
    }],
    levels: [{
        id: 1,
        name: 'level1'
    },{
        id: 2,
        name: 'level2'
    }]
};

config.changeLevel = (currentLevelName, direction) => {
    const currentLevel = config.levels.filter(level => level.name === currentLevelName)[0];
    const newLevelId = (direction === 'forwward') ? currentLevel.id + 1 : currentLevel.id - 1;
    if(!config.levels.filter(level => level.id === newLevelId)[0])    
        return config;
    config.active.level = newLevelId;
    return config;
};

config.nextLevel = currentLevelName => {
    return config.changeLevel(currentLevelName, 'forwward');
};

config.previousLevel = currentLevelName => {
    return config.changeLevel(currentLevelName, 'backward');
};