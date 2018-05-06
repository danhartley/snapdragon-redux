export const config = {
    language: 'en',
    moduleSize: 2,
    callbackTime: 1500,
    collection: {
        id: ''
    },
    lessons: [{
        id: 1,
        name: 'Lesson 1',               
        level: {
            id: 1,
            name: 'Level 1',
            description: 'Click the species image or name'
        },
        levels: [
            {   id: 1,
                name: 'Level 1',
                description: 'Click the species image or name'
            },
            {   id: 2,
                name: 'Level 2',
                description: 'Enter the genus name'
            },
            {   id: 3,
                name: 'Level 3',
                description: 'Enter the species name'
            },
            {   id: 4,
                name: 'Level 4',
                description: 'Enter the genus and species name'
            },
            {   id: 5,
                name: 'Level 5',
                description: 'Piece the name back together'
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
        { name: 'عربى', lang: 'ar' },
        { name: 'deutsche', lang: 'de' },
        { name: 'italiano', lang: 'it' },
        { name: 'français', lang: 'fr' },
        { name: 'português', lang: 'pt' },
        { name: '中文', lang: 'zh' }
    ]
};

config.lesson = config.lessons[0];