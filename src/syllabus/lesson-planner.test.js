import { lessonPlanner } from 'syllabus/lesson-planner';

const collection = {
    currentRound: 1,
    itemGroups: [
        [
          0,
          1,
          2,
          3
        ],
        [
          4,
          5,
          6,
          7
        ],
        [
          8,
          9
        ]
      ],
    items: [
        { 
            "name": "Vitis vinifera",
            "names": [
                {
                  "vernacularName": "Vine",
                  "language": "en"
                }
            ]
        },
        { 
            "name": "Vitis vinifera 2",
            "names": [
                {
                  "vernacularName": "Vine",
                  "language": "en"
                }
            ]
        }
    ],
    lesson: {
        level: { name: 'Lesson 1', id:1 }
    },
    wildcards: [{ name: 'epithets', items: [{species: 'species 1'}]}],
    moduleSize: 2
};

const lessonPlan = { collection };

lessonPlan.layouts = [
    {
      "name": "screen-common-to-latin",
      "type": "test",
      "score": 1,
      "points": 1,
      "kind": "MC",
      "given": "Given common name",
      "requirement": "Select latin name",
      "screens": [
        {
          "name": "specimen-images",
          "domain": "collection",
          "template": "js-specimen-images-template"
        },
        {
          "name": "species-scientifics",
          "headers": {
            "long": "Click the latin name to match the species",
            "short": "Click name to match species"
          },
          "question": "Tap to match common name",
          "domain": "collection",
          "template": "js-strips-template",
          "taxon": "name"
        }
      ],
      "lessonName": "Lesson 3",
      "levelName": "Level 2",
      "itemIndex": 0,
      "progressIndex": 1,
      "roundScoreCount": 8
    },
    {
      "name": "screen-common-to-latin",
      "type": "test",
      "score": 1,
      "points": 1,
      "kind": "MC",
      "given": "Given common name",
      "requirement": "Select latin name",
      "screens": [
        {
          "name": "specimen-images",
          "domain": "collection",
          "template": "js-specimen-images-template"
        },
        {
          "name": "species-scientifics",
          "headers": {
            "long": "Click the latin name to match the species",
            "short": "Click name to match species"
          },
          "question": "Tap to match common name",
          "domain": "collection",
          "template": "js-strips-template",
          "taxon": "name"
        }
      ],
      "lessonName": "Lesson 3",
      "levelName": "Level 2",
      "itemIndex": 1,
      "progressIndex": 2,
      "roundScoreCount": 8
    },
    {
      "name": "screen-common-to-latin",
      "type": "test",
      "score": 1,
      "points": 1,
      "kind": "MC",
      "given": "Given common name",
      "requirement": "Select latin name",
      "screens": [
        {
          "name": "specimen-images",
          "domain": "collection",
          "template": "js-specimen-images-template"
        },
        {
          "name": "species-scientifics",
          "headers": {
            "long": "Click the latin name to match the species",
            "short": "Click name to match species"
          },
          "question": "Tap to match common name",
          "domain": "collection",
          "template": "js-strips-template",
          "taxon": "name"
        }
      ],
      "lessonName": "Lesson 3",
      "levelName": "Level 2",
      "itemIndex": 2,
      "progressIndex": 3,
      "roundScoreCount": 8
    },
    {
      "name": "screen-common-to-latin",
      "type": "test",
      "score": 1,
      "points": 1,
      "kind": "MC",
      "given": "Given common name",
      "requirement": "Select latin name",
      "screens": [
        {
          "name": "specimen-images",
          "domain": "collection",
          "template": "js-specimen-images-template"
        },
        {
          "name": "species-scientifics",
          "headers": {
            "long": "Click the latin name to match the species",
            "short": "Click name to match species"
          },
          "question": "Tap to match common name",
          "domain": "collection",
          "template": "js-strips-template",
          "taxon": "name"
        }
      ],
      "lessonName": "Lesson 3",
      "levelName": "Level 2",
      "itemIndex": 3,
      "progressIndex": 4,
      "roundScoreCount": 8
    },
    {
      "name": "screen-common-entry",
      "type": "test",
      "score": 1,
      "points": 2,
      "kind": "T",
      "given": "Species latin name",
      "requirement": "Enter common name",
      "screens": [
        {
          "name": "specimen-images",
          "domain": "collection",
          "template": "js-specimen-images-template"
        },
        {
          "name": "text-entry",
          "domain": "collection",
          "template": "js-vernacular-entry-template",
          "taxon": "vernacular",
          "headers": {
            "long": "Enter the common name",
            "short": "Enter the common name"
          }
        }
      ],
      "lessonName": "Lesson 3",
      "levelName": "Level 2",
      "itemIndex": 0,
      "progressIndex": 5,
      "roundScoreCount": 8
    },
    {
      "name": "screen-common-entry",
      "type": "test",
      "score": 1,
      "points": 2,
      "kind": "T",
      "given": "Species latin name",
      "requirement": "Enter common name",
      "screens": [
        {
          "name": "specimen-images",
          "domain": "collection",
          "template": "js-specimen-images-template"
        },
        {
          "name": "text-entry",
          "domain": "collection",
          "template": "js-vernacular-entry-template",
          "taxon": "vernacular",
          "headers": {
            "long": "Enter the common name",
            "short": "Enter the common name"
          }
        }
      ],
      "lessonName": "Lesson 3",
      "levelName": "Level 2",
      "itemIndex": 1,
      "progressIndex": 6,
      "roundScoreCount": 8
    },
    {
      "name": "screen-common-entry",
      "type": "test",
      "score": 1,
      "points": 2,
      "kind": "T",
      "given": "Species latin name",
      "requirement": "Enter common name",
      "screens": [
        {
          "name": "specimen-images",
          "domain": "collection",
          "template": "js-specimen-images-template"
        },
        {
          "name": "text-entry",
          "domain": "collection",
          "template": "js-vernacular-entry-template",
          "taxon": "vernacular",
          "headers": {
            "long": "Enter the common name",
            "short": "Enter the common name"
          }
        }
      ],
      "lessonName": "Lesson 3",
      "levelName": "Level 2",
      "itemIndex": 2,
      "progressIndex": 7,
      "roundScoreCount": 8
    },
    {
      "name": "screen-common-entry",
      "type": "test",
      "score": 1,
      "points": 2,
      "kind": "T",
      "given": "Species latin name",
      "requirement": "Enter common name",
      "screens": [
        {
          "name": "specimen-images",
          "domain": "collection",
          "template": "js-specimen-images-template"
        },
        {
          "name": "text-entry",
          "domain": "collection",
          "template": "js-vernacular-entry-template",
          "taxon": "vernacular",
          "headers": {
            "long": "Enter the common name",
            "short": "Enter the common name"
          }
        }
      ],
      "lessonName": "Lesson 3",
      "levelName": "Level 2",
      "itemIndex": 3,
      "progressIndex": 8,
      "roundScoreCount": 8
    },
    {
      "name": "summary",
      "screens": [
        {
          "name": "summary",
          "domain": "history",
          "template": "js-summary-template"
        },
        {
          "name": "history",
          "domain": "history",
          "template": "js-history-template"
        }
      ],
      "lessonName": "Lesson 3",
      "levelName": "Level 2",
      "layoutIndex": 8,
      "itemIndex": 0,
      "roundScoreCount": 8
    }
  ];

lessonPlan.levels = [
    {
      "id": 1,
      "name": "Level 1",
      "layouts": [
        {
          "name": "screen-latin-to-common",
          "type": "test",
          "score": 1,
          "points": 1,
          "kind": "MC",
          "given": "Given latin name",
          "requirement": "Select common name",
          "screens": [
            {
              "name": "specimen-images",
              "domain": "collection",
              "template": "js-specimen-images-template"
            },
            {
              "name": "species-vernaculars",
              "question": "Tap to match latin name",
              "domain": "collection",
              "template": "js-strips-template",
              "taxon": "name"
            }
          ]
        },
        {
          "name": "screen-specimens-latin-match",
          "type": "test",
          "score": 1,
          "points": 1,
          "kind": "VMC",
          "given": "Given specimen images",
          "requirement": "Select latin name",
          "screens": [
            {
              "name": "specimen-images",
              "domain": "collection",
              "template": "js-specimen-images-template"
            },
            {
              "name": "visual-match",
              "domain": "collection",
              "type": "binomial"
            }
          ]
        }
      ],
      "wildcardLayouts": [],
      "reviewLayouts": [
        {
          "name": "screen-latin-to-common",
          "type": "test",
          "score": 1,
          "points": 1,
          "kind": "MC",
          "given": "Given latin name",
          "requirement": "Select common name",
          "screens": [
            {
              "name": "specimen-images",
              "domain": "collection",
              "template": "js-specimen-images-template"
            },
            {
              "name": "species-vernaculars",
              "question": "Tap to match latin name",
              "domain": "collection",
              "template": "js-strips-template",
              "taxon": "name"
            }
          ]
        }
      ]
    },
    {
      "id": 2,
      "name": "Level 2",
      "layouts": [
        {
          "name": "screen-common-to-latin",
          "type": "test",
          "score": 1,
          "points": 1,
          "kind": "MC",
          "given": "Given common name",
          "requirement": "Select latin name",
          "screens": [
            {
              "name": "specimen-images",
              "domain": "collection",
              "template": "js-specimen-images-template"
            },
            {
              "name": "species-scientifics",
              "headers": {
                "long": "Click the latin name to match the species",
                "short": "Click name to match species"
              },
              "question": "Tap to match common name",
              "domain": "collection",
              "template": "js-strips-template",
              "taxon": "name"
            }
          ]
        },
        {
          "name": "screen-common-entry",
          "type": "test",
          "score": 1,
          "points": 2,
          "kind": "T",
          "given": "Species latin name",
          "requirement": "Enter common name",
          "screens": [
            {
              "name": "specimen-images",
              "domain": "collection",
              "template": "js-specimen-images-template"
            },
            {
              "name": "text-entry",
              "domain": "collection",
              "template": "js-vernacular-entry-template",
              "taxon": "vernacular",
              "headers": {
                "long": "Enter the common name",
                "short": "Enter the common name"
              }
            }
          ]
        }
      ],
      "wildcardLayouts": [
        {
          "name": "screen-definitions",
          "type": "test",
          "score": 1,
          "points": 1,
          "kind": "T",
          "given": "Given glossary term",
          "requirement": "Select definition",
          "screens": [
            {
              "name": "specimen-images",
              "domain": "collection",
              "template": "js-specimen-images-template"
            },
            {
              "name": "definition",
              "domain": "collection"
            }
          ]
        }
      ],
      "reviewLayouts": [
        {
          "name": "screen-common-to-latin",
          "type": "test",
          "score": 1,
          "points": 1,
          "kind": "MC",
          "given": "Given common name",
          "requirement": "Select latin name",
          "screens": [
            {
              "name": "specimen-images",
              "domain": "collection",
              "template": "js-specimen-images-template"
            },
            {
              "name": "species-scientifics",
              "headers": {
                "long": "Click the latin name to match the species",
                "short": "Click name to match species"
              },
              "question": "Tap to match common name",
              "domain": "collection",
              "template": "js-strips-template",
              "taxon": "name"
            }
          ]
        },
        {
          "name": "screen-common-entry",
          "type": "test",
          "score": 1,
          "points": 2,
          "kind": "T",
          "given": "Species latin name",
          "requirement": "Enter common name",
          "screens": [
            {
              "name": "specimen-images",
              "domain": "collection",
              "template": "js-specimen-images-template"
            },
            {
              "name": "text-entry",
              "domain": "collection",
              "template": "js-vernacular-entry-template",
              "taxon": "vernacular",
              "headers": {
                "long": "Enter the common name",
                "short": "Enter the common name"
              }
            }
          ]
        }
      ]
    },
    {
      "id": 3,
      "name": "Level 3",
      "layouts": [
        {
          "name": "screen-genus-completion",
          "type": "test",
          "score": 1,
          "points": 1,
          "kind": "MC",
          "given": "Given species name",
          "requirement": "Select genus name",
          "screens": [
            {
              "name": "specimen-images",
              "domain": "collection",
              "template": "js-specimen-images-template"
            },
            {
              "name": "text-complete",
              "domain": "collection",
              "question": "Complete the latin name",
              "type": "text-complete-genus"
            }
          ]
        },
        {
          "name": "screen-genus-entry",
          "type": "test",
          "score": 1,
          "points": 2,
          "kind": "T",
          "given": "Given species name",
          "requirement": "Enter genus name",
          "screens": [
            {
              "name": "specimen-images",
              "domain": "collection",
              "template": "js-specimen-images-template"
            },
            {
              "name": "text-entry",
              "domain": "collection",
              "template": "js-genus-entry-template",
              "taxon": "genus"
            }
          ]
        }
      ],
      "wildcardLayouts": [],
      "reviewLayouts": [
        {
          "name": "screen-genus-completion",
          "type": "test",
          "score": 1,
          "points": 1,
          "kind": "MC",
          "given": "Given species name",
          "requirement": "Select genus name",
          "screens": [
            {
              "name": "specimen-images",
              "domain": "collection",
              "template": "js-specimen-images-template"
            },
            {
              "name": "text-complete",
              "domain": "collection",
              "question": "Complete the latin name",
              "type": "text-complete-genus"
            }
          ]
        },
        {
          "name": "screen-genus-entry",
          "type": "test",
          "score": 1,
          "points": 2,
          "kind": "T",
          "given": "Given species name",
          "requirement": "Enter genus name",
          "screens": [
            {
              "name": "specimen-images",
              "domain": "collection",
              "template": "js-specimen-images-template"
            },
            {
              "name": "text-entry",
              "domain": "collection",
              "template": "js-genus-entry-template",
              "taxon": "genus"
            }
          ]
        }
      ]
    },
    {
      "id": 4,
      "name": "Level 4",
      "layouts": [
        {
          "name": "screen-species-completion",
          "type": "test",
          "score": 1,
          "points": 2,
          "kind": "T",
          "given": "Given genus name",
          "requirement": "Select species name",
          "screens": [
            {
              "name": "specimen-images",
              "domain": "collection",
              "template": "js-specimen-images-template"
            },
            {
              "name": "text-complete",
              "domain": "collection",
              "question": "Complete the latin name",
              "type": "text-complete-species"
            }
          ]
        },
        {
          "name": "screen-species-entry",
          "type": "test",
          "score": 1,
          "points": 2,
          "kind": "T",
          "given": "Given genus name",
          "requirement": "Enter species name",
          "screens": [
            {
              "name": "specimen-images",
              "domain": "collection",
              "template": "js-specimen-images-template"
            },
            {
              "name": "text-entry",
              "domain": "collection",
              "template": "js-species-entry-template",
              "taxon": "species"
            }
          ]
        }
      ],
      "wildcardLayouts": [],
      "reviewLayouts": [
        {
          "name": "screen-species-completion",
          "type": "test",
          "score": 1,
          "points": 2,
          "kind": "T",
          "given": "Given genus name",
          "requirement": "Select species name",
          "screens": [
            {
              "name": "specimen-images",
              "domain": "collection",
              "template": "js-specimen-images-template"
            },
            {
              "name": "text-complete",
              "domain": "collection",
              "question": "Complete the latin name",
              "type": "text-complete-species"
            }
          ]
        },
        {
          "name": "screen-species-entry",
          "type": "test",
          "score": 1,
          "points": 2,
          "kind": "T",
          "given": "Given genus name",
          "requirement": "Enter species name",
          "screens": [
            {
              "name": "specimen-images",
              "domain": "collection",
              "template": "js-specimen-images-template"
            },
            {
              "name": "text-entry",
              "domain": "collection",
              "template": "js-species-entry-template",
              "taxon": "species"
            }
          ]
        }
      ]
    },
    {
      "id": 5,
      "name": "Level 5",
      "layouts": [
        {
          "name": "screen-binomial-entry",
          "type": "test",
          "score": 1,
          "points": 4,
          "kind": "T",
          "given": "Given common name",
          "requirement": "Enter latin name",
          "screens": [
            {
              "name": "specimen-images",
              "domain": "collection",
              "template": "js-specimen-images-template"
            },
            {
              "name": "text-entry",
              "domain": "collection",
              "template": "js-species-genus-entry-template",
              "taxon": "name"
            }
          ]
        }
      ],
      "wildcardLayouts": [
        {
          "name": "screen-connections",
          "type": "test",
          "score": 1,
          "points": 1,
          "kind": "T",
          "given": "List of traits",
          "requirement": "List of species",
          "screens": [
            {
              "name": "specimen-images",
              "domain": "collection",
              "template": "js-specimen-images-template"
            },
            {
              "name": "wildcard-card",
              "domain": "collection"
            },
            {
              "name": "wildcard-match",
              "domain": "collection"
            }
          ]
        }
      ],
      "reviewLayouts": [
        {
          "name": "screen-binomial-entry",
          "type": "test",
          "score": 1,
          "points": 4,
          "kind": "T",
          "given": "Given common name",
          "requirement": "Enter latin name",
          "screens": [
            {
              "name": "specimen-images",
              "domain": "collection",
              "template": "js-specimen-images-template"
            },
            {
              "name": "text-entry",
              "domain": "collection",
              "template": "js-species-genus-entry-template",
              "taxon": "name"
            }
          ]
        }
      ]
    }
  ];

test('createLessonPlan returns layouts and screens for Lesson 1 for landscape mode by default', () => {    
    const config = { lesson:  { name: 'Lesson 1', level: { name: 'Level 1'}}, moduleSize: 2, isPortraitMode: false, mode: 'learn' };
    const plan = lessonPlanner.createLessonPlan(lessonPlan, config, collection);
    const revisedLayoutCount = plan.layouts.length;
    let revisedScreens = [];
    plan.layouts.map(layout => {
        layout.screens.map(screen => revisedScreens.push(screen));
    });
    expect(revisedLayoutCount).toEqual(5); // 2*2 (items*module size) + 1 (summary)
    expect(revisedScreens.length).toEqual(10); // (2*2 (items*module size) + 1 (summary)) * 2 (screens)
});