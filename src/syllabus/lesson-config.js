export const config = {
    language: 'en',
    moduleSize: 2,
    callbackTime: 2000,
    isSmallDevice: true,
    collection: {
        id: ''
    },
    lessons: [{
        id: 1,
        name: 'Lesson 1',               
        level: {
            id: 1,
            name: 'Level 1',
            description: 'Match species'
        },
        levels: [
            {   id: 1,
                name: 'Level 1',
                description: 'Match species'
            },
            {   id: 2,
                name: 'Level 2',
                description: 'Recall genus name'
            },
            {   id: 3,
                name: 'Level 3',
                description: 'Recall species name'
            },
            {   id: 4,
                name: 'Level 4',
                description: 'Recall name'
            },
            {   id: 5,
                name: 'Level 5',
                description: 'Name puzzle'
            }
        ]
    },
    {
        id: 2,
        name: 'Lesson 2',
        level: {
            id: 1,
            name: 'Level 1',
            description: 'Name the leaf structure'
        },
        levels: [{
            id: 1,
            name: 'Level 1',
            description: 'Name the leaf part'
        }]
    }],
    languages : [
        { name: 'english', lang: 'en' },
        { name: 'español', lang: 'es' },
        { name: 'عربى', lang: 'ar' },
        { name: 'deutsche', lang: 'de' },
        { name: 'italiano', lang: 'it' },
        { name: 'français', lang: 'fr' },
        { name: 'português', lang: 'pt' },
        { name: '中文', lang: 'zh' }
    ]
};

config.lesson = config.lessons[0];