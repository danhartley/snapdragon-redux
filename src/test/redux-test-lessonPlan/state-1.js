export const state1 = {
    id: 1,
    name: 'Lesson 1',
    portrait: false,
    'default': true,
    levels: [
      {
        id: 1,
        name: 'Level 1',
        layouts: [
          {
            name: 'screen-mixed-species-match',
            type: 'test',
            score: 1,
            kind: 'VMC',
            points: 3,
            given: 'Given species name',
            requirement: 'Select species image',
            screens: [
              {
                name: 'mixed-specimen-tiles',
                domain: 'ui'
              },
              {
                name: 'mixed-specimen-questions',
                domain: 'ui'
              }
            ]
          }
        ],
        wildcardLayouts: [],
        reviewLayouts: [
          {
            name: 'screen-latin-to-common',
            type: 'test',
            score: 1,
            points: 1,
            kind: 'MC',
            given: 'Given latin name',
            requirement: 'Select common name',
            screens: [
              {
                name: 'specimen-images',
                domain: 'collection',
                template: 'js-specimen-images-template'
              },
              {
                name: 'species-vernaculars',
                question: 'Tap to match latin name',
                domain: 'collection',
                template: 'js-strips-template',
                taxon: 'name'
              }
            ],
            isDeselected: true
          }
        ]
      },
      {
        id: 2,
        name: 'Level 2',
        layouts: [
          {
            name: 'screen-common-entry',
            type: 'test',
            score: 1,
            points: 2,
            kind: 'T',
            given: 'Species latin name',
            requirement: 'Enter common name',
            screens: [
              {
                name: 'specimen-images',
                domain: 'collection',
                template: 'js-specimen-images-template'
              },
              {
                name: 'text-entry',
                domain: 'collection',
                template: 'js-vernacular-entry-template',
                taxon: 'vernacular',
                headers: {
                  'long': 'Enter the common name',
                  'short': 'Enter the common name'
                }
              }
            ]
          },
          {
            name: 'screen-species-completion',
            type: 'test',
            score: 1,
            points: 2,
            kind: 'T',
            given: 'Given genus name',
            requirement: 'Select species name',
            screens: [
              {
                name: 'specimen-images',
                domain: 'collection',
                template: 'js-specimen-images-template'
              },
              {
                name: 'text-complete',
                domain: 'collection',
                question: 'Complete the latin name',
                type: 'text-complete-species'
              }
            ]
          },
          {
            name: 'screen-genus-entry',
            type: 'test',
            score: 1,
            points: 2,
            kind: 'T',
            given: 'Given species name',
            requirement: 'Enter genus name',
            screens: [
              {
                name: 'specimen-images',
                domain: 'collection',
                template: 'js-specimen-images-template'
              },
              {
                name: 'text-entry',
                domain: 'collection',
                template: 'js-genus-entry-template',
                taxon: 'genus'
              }
            ]
          }
        ],
        wildcardLayouts: [
          {
            name: 'screen-epithets',
            type: 'test',
            score: 1,
            points: 1,
            kind: 'T',
            given: 'Epithet',
            requirement: 'List epithet definitions',
            screens: [
              {
                name: 'specimen-images',
                domain: 'collection',
                template: 'js-specimen-images-template'
              },
              {
                name: 'epithet',
                domain: 'collection'
              }
            ]
          }
        ],
        reviewLayouts: [
          {
            name: 'screen-common-entry',
            type: 'test',
            score: 1,
            points: 2,
            kind: 'T',
            given: 'Species latin name',
            requirement: 'Enter common name',
            screens: [
              {
                name: 'specimen-images',
                domain: 'collection',
                template: 'js-specimen-images-template'
              },
              {
                name: 'text-entry',
                domain: 'collection',
                template: 'js-vernacular-entry-template',
                taxon: 'vernacular',
                headers: {
                  'long': 'Enter the common name',
                  'short': 'Enter the common name'
                }
              }
            ]
          },
          {
            name: 'screen-species-completion',
            type: 'test',
            score: 1,
            points: 2,
            kind: 'T',
            given: 'Given genus name',
            requirement: 'Select species name',
            screens: [
              {
                name: 'specimen-images',
                domain: 'collection',
                template: 'js-specimen-images-template'
              },
              {
                name: 'text-complete',
                domain: 'collection',
                question: 'Complete the latin name',
                type: 'text-complete-species'
              }
            ]
          },
          {
            name: 'screen-genus-entry',
            type: 'test',
            score: 1,
            points: 2,
            kind: 'T',
            given: 'Given species name',
            requirement: 'Enter genus name',
            screens: [
              {
                name: 'specimen-images',
                domain: 'collection',
                template: 'js-specimen-images-template'
              },
              {
                name: 'text-entry',
                domain: 'collection',
                template: 'js-genus-entry-template',
                taxon: 'genus'
              }
            ]
          }
        ]
      },
      {
        id: 3,
        name: 'Level 3',
        layouts: [
          {
            name: 'screen-species-entry',
            type: 'test',
            score: 1,
            points: 2,
            kind: 'T',
            given: 'Given genus name',
            requirement: 'Enter species name',
            screens: [
              {
                name: 'specimen-images',
                domain: 'collection',
                template: 'js-specimen-images-template'
              },
              {
                name: 'text-entry',
                domain: 'collection',
                template: 'js-species-entry-template',
                taxon: 'species'
              }
            ]
          }
        ],
        wildcardLayouts: [
          {
            name: 'screen-definitions',
            type: 'test',
            score: 1,
            points: 1,
            kind: 'T',
            given: 'Given glossary term',
            requirement: 'Select definition',
            screens: [
              {
                name: 'specimen-images',
                domain: 'collection',
                template: 'js-specimen-images-template'
              },
              {
                name: 'definition',
                domain: 'collection'
              }
            ]
          }
        ],
        reviewLayouts: [
          {
            name: 'screen-species-entry',
            type: 'test',
            score: 1,
            points: 2,
            kind: 'T',
            given: 'Given genus name',
            requirement: 'Enter species name',
            screens: [
              {
                name: 'specimen-images',
                domain: 'collection',
                template: 'js-specimen-images-template'
              },
              {
                name: 'text-entry',
                domain: 'collection',
                template: 'js-species-entry-template',
                taxon: 'species'
              }
            ]
          }
        ]
      },
      {
        id: 4,
        name: 'Level 4',
        layouts: [
          {
            name: 'screen-binomial-entry',
            type: 'test',
            score: 1,
            points: 4,
            kind: 'T',
            given: 'Given common name',
            requirement: 'Enter latin name',
            screens: [
              {
                name: 'specimen-images',
                domain: 'collection',
                template: 'js-specimen-images-template'
              },
              {
                name: 'text-entry',
                domain: 'collection',
                template: 'js-species-genus-entry-template',
                taxon: 'name'
              }
            ]
          }
        ],
        wildcardLayouts: [
          {
            name: 'screen-cultivars',
            type: 'test',
            score: 1,
            points: 1,
            kind: 'T',
            given: 'List of cultivars',
            requirement: 'List of species',
            screens: [
              {
                name: 'specimen-images',
                domain: 'collection',
                template: 'js-specimen-images-template'
              },
              {
                name: 'cultivar-card',
                domain: 'collection'
              },
              {
                name: 'cultivar-match',
                domain: 'collection'
              }
            ]
          }
        ],
        reviewLayouts: [
          {
            name: 'screen-binomial-entry',
            type: 'test',
            score: 1,
            points: 4,
            kind: 'T',
            given: 'Given common name',
            requirement: 'Enter latin name',
            screens: [
              {
                name: 'specimen-images',
                domain: 'collection',
                template: 'js-specimen-images-template'
              },
              {
                name: 'text-entry',
                domain: 'collection',
                template: 'js-species-genus-entry-template',
                taxon: 'name'
              }
            ]
          }
        ]
      },
      {
        id: 5,
        name: 'Level 5',
        layouts: [
          {
            name: 'screen-taxon-card',
            type: 'revision',
            score: 0,
            kind: 'F',
            points: 0,
            given: 'Study',
            requirement: 'Family summary',
            screens: [
              {
                name: 'specimen-images',
                domain: 'collection',
                template: 'js-specimen-images-template'
              },
              {
                name: 'taxon-card',
                domain: 'collection'
              }
            ]
          },
          {
            name: 'screen-species-to-family',
            type: 'test',
            score: 1,
            points: 2,
            kind: 'MC',
            given: 'Species name',
            requirement: 'List families',
            screens: [
              {
                name: 'specimen-images',
                domain: 'collection',
                template: 'js-specimen-images-template'
              },
              {
                name: 'family',
                domain: 'collection',
                question: 'Match species family'
              }
            ]
          },
          {
            name: 'screen-family-to-description',
            type: 'test',
            score: 1,
            points: 2,
            kind: 'MC',
            given: 'Family description',
            requirement: 'List families',
            screens: [
              {
                name: 'specimen-images',
                domain: 'collection',
                template: 'js-specimen-images-template'
              },
              {
                name: 'family-strips',
                domain: 'collection',
                question: 'Match species family'
              }
            ]
          }
        ],
        wildcardLayouts: [
          {
            name: 'screen-connections',
            type: 'test',
            score: 1,
            points: 1,
            kind: 'T',
            given: 'List of traits',
            requirement: 'List of species',
            screens: [
              {
                name: 'specimen-images',
                domain: 'collection',
                template: 'js-specimen-images-template'
              },
              {
                name: 'wildcard-card',
                domain: 'collection'
              },
              {
                name: 'wildcard-match',
                domain: 'collection'
              }
            ]
          }
        ],
        reviewLayouts: [
          {
            name: 'screen-family-to-description',
            type: 'test',
            score: 1,
            points: 2,
            kind: 'MC',
            given: 'Family description',
            requirement: 'List families',
            screens: [
              {
                name: 'specimen-images',
                domain: 'collection',
                template: 'js-specimen-images-template'
              },
              {
                name: 'family-strips',
                domain: 'collection',
                question: 'Match species family'
              }
            ]
          }
        ]
      }
    ],
    layouts: [
      {
        name: 'screen-common-entry',
        type: 'test',
        score: 1,
        points: 2,
        kind: 'T',
        given: 'Species latin name',
        requirement: 'Enter common name',
        screens: [
          {
            name: 'specimen-images',
            domain: 'collection',
            template: 'js-specimen-images-template'
          },
          {
            name: 'text-entry',
            domain: 'collection',
            template: 'js-vernacular-entry-template',
            taxon: 'vernacular',
            headers: {
              'long': 'Enter the common name',
              'short': 'Enter the common name'
            }
          }
        ],
        lessonName: 'Lesson 1',
        levelName: 'Level 2',
        itemIndex: 0,
        progressIndex: 1,
        roundScoreCount: 13
      },
      {
        name: 'screen-common-entry',
        type: 'test',
        score: 1,
        points: 2,
        kind: 'T',
        given: 'Species latin name',
        requirement: 'Enter common name',
        screens: [
          {
            name: 'specimen-images',
            domain: 'collection',
            template: 'js-specimen-images-template'
          },
          {
            name: 'text-entry',
            domain: 'collection',
            template: 'js-vernacular-entry-template',
            taxon: 'vernacular',
            headers: {
              'long': 'Enter the common name',
              'short': 'Enter the common name'
            }
          }
        ],
        lessonName: 'Lesson 1',
        levelName: 'Level 2',
        itemIndex: 1,
        progressIndex: 2,
        roundScoreCount: 13
      },
      {
        name: 'screen-common-entry',
        type: 'test',
        score: 1,
        points: 2,
        kind: 'T',
        given: 'Species latin name',
        requirement: 'Enter common name',
        screens: [
          {
            name: 'specimen-images',
            domain: 'collection',
            template: 'js-specimen-images-template'
          },
          {
            name: 'text-entry',
            domain: 'collection',
            template: 'js-vernacular-entry-template',
            taxon: 'vernacular',
            headers: {
              'long': 'Enter the common name',
              'short': 'Enter the common name'
            }
          }
        ],
        lessonName: 'Lesson 1',
        levelName: 'Level 2',
        itemIndex: 2,
        progressIndex: 3,
        roundScoreCount: 13
      },
      {
        name: 'screen-common-entry',
        type: 'test',
        score: 1,
        points: 2,
        kind: 'T',
        given: 'Species latin name',
        requirement: 'Enter common name',
        screens: [
          {
            name: 'specimen-images',
            domain: 'collection',
            template: 'js-specimen-images-template'
          },
          {
            name: 'text-entry',
            domain: 'collection',
            template: 'js-vernacular-entry-template',
            taxon: 'vernacular',
            headers: {
              'long': 'Enter the common name',
              'short': 'Enter the common name'
            }
          }
        ],
        lessonName: 'Lesson 1',
        levelName: 'Level 2',
        itemIndex: 3,
        progressIndex: 4,
        roundScoreCount: 13
      },
      {
        name: 'screen-species-completion',
        type: 'test',
        score: 1,
        points: 2,
        kind: 'T',
        given: 'Given genus name',
        requirement: 'Select species name',
        screens: [
          {
            name: 'specimen-images',
            domain: 'collection',
            template: 'js-specimen-images-template'
          },
          {
            name: 'text-complete',
            domain: 'collection',
            question: 'Complete the latin name',
            type: 'text-complete-species'
          }
        ],
        lessonName: 'Lesson 1',
        levelName: 'Level 2',
        itemIndex: 0,
        progressIndex: 5,
        roundScoreCount: 13
      },
      {
        name: 'screen-species-completion',
        type: 'test',
        score: 1,
        points: 2,
        kind: 'T',
        given: 'Given genus name',
        requirement: 'Select species name',
        screens: [
          {
            name: 'specimen-images',
            domain: 'collection',
            template: 'js-specimen-images-template'
          },
          {
            name: 'text-complete',
            domain: 'collection',
            question: 'Complete the latin name',
            type: 'text-complete-species'
          }
        ],
        lessonName: 'Lesson 1',
        levelName: 'Level 2',
        itemIndex: 1,
        progressIndex: 6,
        roundScoreCount: 13
      },
      {
        name: 'screen-species-completion',
        type: 'test',
        score: 1,
        points: 2,
        kind: 'T',
        given: 'Given genus name',
        requirement: 'Select species name',
        screens: [
          {
            name: 'specimen-images',
            domain: 'collection',
            template: 'js-specimen-images-template'
          },
          {
            name: 'text-complete',
            domain: 'collection',
            question: 'Complete the latin name',
            type: 'text-complete-species'
          }
        ],
        lessonName: 'Lesson 1',
        levelName: 'Level 2',
        itemIndex: 2,
        progressIndex: 7,
        roundScoreCount: 13
      },
      {
        name: 'screen-species-completion',
        type: 'test',
        score: 1,
        points: 2,
        kind: 'T',
        given: 'Given genus name',
        requirement: 'Select species name',
        screens: [
          {
            name: 'specimen-images',
            domain: 'collection',
            template: 'js-specimen-images-template'
          },
          {
            name: 'text-complete',
            domain: 'collection',
            question: 'Complete the latin name',
            type: 'text-complete-species'
          }
        ],
        lessonName: 'Lesson 1',
        levelName: 'Level 2',
        itemIndex: 3,
        progressIndex: 8,
        roundScoreCount: 13
      },
      {
        name: 'screen-genus-entry',
        type: 'test',
        score: 1,
        points: 2,
        kind: 'T',
        given: 'Given species name',
        requirement: 'Enter genus name',
        screens: [
          {
            name: 'specimen-images',
            domain: 'collection',
            template: 'js-specimen-images-template'
          },
          {
            name: 'text-entry',
            domain: 'collection',
            template: 'js-genus-entry-template',
            taxon: 'genus'
          }
        ],
        lessonName: 'Lesson 1',
        levelName: 'Level 2',
        itemIndex: 0,
        progressIndex: 9,
        roundScoreCount: 13
      },
      {
        name: 'screen-genus-entry',
        type: 'test',
        score: 1,
        points: 2,
        kind: 'T',
        given: 'Given species name',
        requirement: 'Enter genus name',
        screens: [
          {
            name: 'specimen-images',
            domain: 'collection',
            template: 'js-specimen-images-template'
          },
          {
            name: 'text-entry',
            domain: 'collection',
            template: 'js-genus-entry-template',
            taxon: 'genus'
          }
        ],
        lessonName: 'Lesson 1',
        levelName: 'Level 2',
        itemIndex: 1,
        progressIndex: 10,
        roundScoreCount: 13
      },
      {
        name: 'screen-genus-entry',
        type: 'test',
        score: 1,
        points: 2,
        kind: 'T',
        given: 'Given species name',
        requirement: 'Enter genus name',
        screens: [
          {
            name: 'specimen-images',
            domain: 'collection',
            template: 'js-specimen-images-template'
          },
          {
            name: 'text-entry',
            domain: 'collection',
            template: 'js-genus-entry-template',
            taxon: 'genus'
          }
        ],
        lessonName: 'Lesson 1',
        levelName: 'Level 2',
        itemIndex: 2,
        progressIndex: 11,
        roundScoreCount: 13
      },
      {
        name: 'screen-genus-entry',
        type: 'test',
        score: 1,
        points: 2,
        kind: 'T',
        given: 'Given species name',
        requirement: 'Enter genus name',
        screens: [
          {
            name: 'specimen-images',
            domain: 'collection',
            template: 'js-specimen-images-template'
          },
          {
            name: 'text-entry',
            domain: 'collection',
            template: 'js-genus-entry-template',
            taxon: 'genus'
          }
        ],
        lessonName: 'Lesson 1',
        levelName: 'Level 2',
        itemIndex: 3,
        progressIndex: 12,
        roundScoreCount: 13
      },
      {
        name: 'screen-epithet-meaning',
        type: 'test',
        score: 1,
        screens: [
          {
            name: 'specimen-images',
            domain: 'collection',
            template: 'js-specimen-images-template'
          },
          {
            name: 'epithet',
            domain: 'collection'
          }
        ],
        itemIndex: 1,
        epithet: {
          latin: [
            'vulgaris'
          ],
          en: [
            'common'
          ],
          name: 'Sturnus vulgaris',
          index: 1
        },
        progressIndex: 13,
        roundScoreCount: 13
      },
      {
        name: 'summary',
        screens: [
          {
            name: 'summary',
            domain: 'history',
            template: 'js-summary-template'
          },
          {
            name: 'history',
            domain: 'history',
            template: 'js-history-template'
          }
        ],
        lessonName: 'Lesson 1',
        levelName: 'Level 2',
        layoutIndex: 13,
        itemIndex: 0,
        roundScoreCount: 13
      }
    ],
    lessonName: 'Lesson 1',
    levelName: 'Level 2',
    moduleSize: 4,
    questionCount: 13,
    layoutCount: 14,
    layoutNames: [
      'screen-common-entry',
      'screen-common-entry',
      'screen-common-entry',
      'screen-common-entry',
      'screen-species-completion',
      'screen-species-completion',
      'screen-species-completion',
      'screen-species-completion',
      'screen-genus-entry',
      'screen-genus-entry',
      'screen-genus-entry',
      'screen-genus-entry',
      'screen-epithet-meaning',
      'summary'
    ],
    wildcardLayouts: [
      {
        name: 'screen-epithet-meaning',
        type: 'test',
        score: 1,
        screens: [
          {
            name: 'specimen-images',
            domain: 'collection',
            template: 'js-specimen-images-template'
          },
          {
            name: 'epithet',
            domain: 'collection'
          }
        ],
        itemIndex: 1,
        epithet: {
          latin: [
            'vulgaris'
          ],
          en: [
            'common'
          ],
          name: 'Sturnus vulgaris',
          index: 1
        },
        progressIndex: 13
      }
    ]
  };