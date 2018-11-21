export const snapdragon = {
    counter: {
      index: 4
    },
    lessonPlans: {
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
              ]
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
      ]
    },
    lessonPlan: {
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
              ]
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
          lessonName: 'Lesson 1',
          levelName: 'Level 1',
          itemIndex: 4,
          progressIndex: 1,
          roundScoreCount: 4
        },
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
          lessonName: 'Lesson 1',
          levelName: 'Level 1',
          itemIndex: 5,
          progressIndex: 2,
          roundScoreCount: 4
        },
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
          lessonName: 'Lesson 1',
          levelName: 'Level 1',
          itemIndex: 6,
          progressIndex: 3,
          roundScoreCount: 4
        },
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
          lessonName: 'Lesson 1',
          levelName: 'Level 1',
          itemIndex: 7,
          progressIndex: 4,
          roundScoreCount: 4
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
          levelName: 'Level 1',
          layoutIndex: 4,
          itemIndex: 0,
          roundScoreCount: 4
        }
      ],
      lessonName: 'Lesson 1',
      levelName: 'Level 1',
      moduleSize: 4,
      questionCount: 4,
      layoutCount: 5,
      layoutNames: [
        'screen-latin-to-common',
        'screen-latin-to-common',
        'screen-latin-to-common',
        'screen-latin-to-common',
        'summary'
      ],
      wildcardLayouts: []
    },
    layout: {
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
      levelName: 'Level 1',
      layoutIndex: 4,
      itemIndex: 0,
      roundScoreCount: 4
    },
    config: {
      language: 'en',
      moduleSize: 2,
      callbackTime: 2000,
      callbackDelay: 2000,
      excludeRevision: false,
      isPortraitMode: false,
      isLandscapeMode: true,
      collection: {
        id: 3
      },
      mode: 'learn',
      languages: [
        {
          name: 'English',
          lang: 'en'
        },
        {
          name: 'Español',
          lang: 'es'
        },
        {
          name: 'Deutsche',
          lang: 'de'
        },
        {
          name: 'Italiano',
          lang: 'it'
        },
        {
          name: 'Français',
          lang: 'fr'
        },
        {
          name: 'Português',
          lang: 'pt'
        }
      ]
    },
    collection: {
      id: 3,
      descriptions: [
        'This lesson will test you on the top 10 most common birds in the UK.',
        'The list is taken from the RSPB Big Garden Birdwatch 2018 survey.',
        '420,489 people recorded 6,764,475 separate bird sightings.'
      ],
      currentRound: 2,
      rounds: 2,
      isNextRound: true,
      providerId: 1,
      name: 'RSPB Top 10 UK Birds',
      type: 'species',
      items: [
        {
          id: 922241,
          name: 'Passer domesticus',
          images: [
            '2012/06/13/17/07300_orig.jpg',
            '2012/06/13/17/12554_orig.jpg',
            '2012/06/13/17/57539_orig.jpg',
            '2012/06/13/17/04879_orig.jpg',
            '2012/06/13/17/56733_orig.jpg',
            '2012/06/13/17/37561_orig.jpg',
            '2012/06/13/17/26690_orig.jpg',
            '2012/06/13/17/55437_orig.jpg',
            '2012/06/13/17/97022_orig.jpg',
            '2013/09/13/13/71550_orig.jpg',
            '2012/06/13/17/28480_orig.jpg'
          ],
          names: [
            {
              vernacularName: 'Haussperling',
              language: 'de',
              eol_preferred: true
            },
            {
              vernacularName: 'Italiensperling',
              language: 'de'
            },
            {
              vernacularName: 'Lüning [norddt.]',
              language: 'de'
            },
            {
              vernacularName: 'Spatz',
              language: 'de'
            },
            {
              vernacularName: 'Sperling',
              language: 'de'
            },
            {
              vernacularName: 'Sparrow',
              language: 'en'
            },
            {
              vernacularName: 'House Sparrow',
              language: 'en',
              eol_preferred: true,
              wikiSearchTerm: true
            },
            {
              vernacularName: 'English sparrow',
              language: 'en'
            },
            {
              vernacularName: 'Italian Sparrow',
              language: 'en'
            },
            {
              vernacularName: 'Phillip sparrow',
              language: 'en'
            },
            {
              vernacularName: 'Town sparrow',
              language: 'en'
            },
            {
              vernacularName: 'sparrow, house',
              language: 'en'
            },
            {
              vernacularName: 'Gorrión común',
              language: 'es',
              eol_preferred: true
            },
            {
              vernacularName: 'Europese huismus',
              language: 'es'
            },
            {
              vernacularName: 'Gorrion casero',
              language: 'es'
            },
            {
              vernacularName: 'Gorrión Doméstico',
              language: 'es'
            },
            {
              vernacularName: 'Gorrión Italiano',
              language: 'es'
            },
            {
              vernacularName: 'Gorrión casero',
              language: 'es'
            },
            {
              vernacularName: 'Pardal',
              language: 'es'
            },
            {
              vernacularName: 'dror habayit',
              language: 'es'
            },
            {
              vernacularName: 'gorrion',
              language: 'es'
            },
            {
              vernacularName: 'graspurv',
              language: 'es'
            },
            {
              vernacularName: 'moineau domestique',
              language: 'fr',
              eol_preferred: true
            },
            {
              vernacularName: 'Moineau cisalpin *',
              language: 'fr'
            },
            {
              vernacularName: 'moineau franc',
              language: 'fr'
            },
            {
              vernacularName: 'Passero domestico',
              language: 'it',
              eol_preferred: true
            },
            {
              vernacularName: 'Passera europea',
              language: 'it'
            },
            {
              vernacularName: 'Passera oltremontana',
              language: 'it'
            },
            {
              vernacularName: 'Pardal-comum',
              language: 'pt',
              eol_preferred: true
            },
            {
              vernacularName: 'Pardal-dos-telhados',
              language: 'pt'
            }
          ],
          descriptions: [],
          taxonomy: {
            usageKey: 5231190,
            scientificName: 'Passer domesticus (Linnaeus, 1758)',
            canonicalName: 'Passer domesticus',
            rank: 'SPECIES',
            status: 'ACCEPTED',
            confidence: 99,
            matchType: 'EXACT',
            kingdom: 'Animalia',
            phylum: 'Chordata',
            order: 'Passeriformes',
            family: 'Passeridae',
            genus: 'Passer',
            species: 'Passer domesticus',
            kingdomKey: 1,
            phylumKey: 44,
            classKey: 212,
            orderKey: 729,
            familyKey: 5264,
            genusKey: 2492321,
            speciesKey: 5231190,
            synonym: false,
            'class': 'Aves'
          },
          family: 'Passeridae',
          eolName: 'Passer domesticus (Linnaeus, 1758)',
          snapIndex: 1,
          image: '2012/06/13/17/07300_orig.jpg',
          vernacularName: 'Sparrow',
          passes: 1,
          fails: '--',
          binomial: 'Passer domesticus',
          shortName: 'P. domesticus',
          keyTrait: '',
          genus: 'Passer',
          species: 'domesticus'
        },
        {
          id: 922253,
          name: 'Sturnus vulgaris',
          images: [
            '2012/07/26/22/29825_orig.jpg',
            '2012/07/26/22/97131_orig.jpg',
            '2012/07/26/22/22348_orig.jpg',
            '2012/07/26/22/16230_orig.jpg',
            '2012/06/14/17/58924_orig.jpg',
            '2009/07/24/13/08245_orig.jpg',
            '2012/06/14/17/67732_orig.jpg',
            '2012/06/14/17/94516_orig.jpg'
          ],
          names: [
            {
              vernacularName: 'Star',
              language: 'de',
              eol_preferred: true
            },
            {
              vernacularName: 'Starling',
              language: 'en'
            },
            {
              vernacularName: 'Common Starling',
              language: 'en',
              eol_preferred: true,
              wikiSearchTerm: true
            },
            {
              vernacularName: 'English starling',
              language: 'en'
            },
            {
              vernacularName: 'Eurasian Starling',
              language: 'en'
            },
            {
              vernacularName: 'European Starling',
              language: 'en'
            },
            {
              vernacularName: 'Purple-winged Starling',
              language: 'en'
            },
            {
              vernacularName: 'church-martin',
              language: 'en'
            },
            {
              vernacularName: 'Estornino pinto',
              language: 'es',
              eol_preferred: true
            },
            {
              vernacularName: 'Etourneau sansonnet',
              language: 'fr',
              eol_preferred: true
            },
            {
              vernacularName: '',
              language: 'fr'
            },
            {
              vernacularName: 'Ètourneau sansonnet',
              language: 'fr'
            },
            {
              vernacularName: 'Étourneau sansonnet',
              language: 'fr'
            },
            {
              vernacularName: 'Storno',
              language: 'it',
              eol_preferred: true
            },
            {
              vernacularName: 'Estorninho-malhado',
              language: 'pt',
              eol_preferred: true
            }
          ],
          descriptions: [
            'Depth range based on 159 specimens in 1 taxon.<br>Water temperature and chemistry ranges based on 100 samples.<br><br>Environmental ranges<br>&nbsp;&nbsp;Depth range (m): 0 - 0<br>&nbsp;&nbsp;Temperature range (&deg;C): 7.567 - 16.537<br>&nbsp;&nbsp;Nitrate (umol/L): 0.165 - 12.829<br>&nbsp;&nbsp;Salinity (PPS): 6.428 - 35.283<br>&nbsp;&nbsp;Oxygen (ml/l): 5.634 - 8.179<br>&nbsp;&nbsp;Phosphate (umol/l): 0.258 - 0.734<br>&nbsp;&nbsp;Silicate (umol/l): 0.987 - 11.140<br><br>Graphical representation<br><br>Temperature range (&deg;C): 7.567 - 16.537 <img src=\'http://chart.apis.google.com/chart?cht=bvs&chs=350x150&chd=t:7.567|8.969999999999999&chxr=0,-2.072,29.546&chds=0,29.546&chbh=50,20,15&chxt=y,r&chm=N,FF0000,-1,,12|N,000000,0,,12,,c|N,00000000,1,,12,,c|N,ffffff,2,,12,,c&chma=20&chf=b1,lg,90,FF0000,0,76A4FB,1&chco=ffffff,389ced&chxl=1:|global oceans min: -2.072|average|global oceans max: 29.546\'><br><br>Nitrate (umol/L): 0.165 - 12.829 <img src=\'http://chart.apis.google.com/chart?cht=bvs&chs=350x150&chd=t:0.165|12.664&chxr=0,0,49.846&chds=0,49.846&chbh=50,20,15&chxt=y,r&chm=N,FF0000,-1,,12|N,000000,0,,12,,c|N,00000000,1,,12,,c|N,ffffff,2,,12,,c&chma=20&chf=&chco=ffffff,00ff00&chxl=1:|global oceans min|average|global oceans max: 49.846\'><br><br>Salinity (PPS): 6.428 - 35.283 <img src=\'http://chart.apis.google.com/chart?cht=bvs&chs=350x150&chd=t:6.428|28.855&chxr=0,5,40.817&chds=0,40.817&chbh=50,20,15&chxt=y,r&chm=N,FF0000,-1,,12|N,000000,0,,12,,c|N,00000000,1,,12,,c|N,ffffff,2,,12,,c&chma=20&chf=&chco=ffffff,389ced&chxl=1:|global oceans min: 5|average|global oceans max: 40.817\'><br><br>Oxygen (ml/l): 5.634 - 8.179 <img src=\'http://chart.apis.google.com/chart?cht=bvs&chs=350x150&chd=t:5.634|2.545&chxr=0,0,9.323&chds=0,9.323&chbh=50,20,15&chxt=y,r&chm=N,FF0000,-1,,12|N,000000,0,,12,,c|N,00000000,1,,12,,c|N,ffffff,2,,12,,c&chma=20&chf=&chco=ffffff,389ced&chxl=1:|global oceans min|average|global oceans max: 9.323\'><br><br>Phosphate (umol/l): 0.258 - 0.734 <img src=\'http://chart.apis.google.com/chart?cht=bvs&chs=350x150&chd=t:0.258|0.476&chxr=0,0.006,3.661&chds=0,3.661&chbh=50,20,15&chxt=y,r&chm=N,FF0000,-1,,12|N,000000,0,,12,,c|N,00000000,1,,12,,c|N,ffffff,2,,12,,c&chma=20&chf=&chco=ffffff,00ff00&chxl=1:|global oceans min: 0.006|average|global oceans max: 3.661\'><br><br>Silicate (umol/l): 0.987 - 11.140 <img src=\'http://chart.apis.google.com/chart?cht=bvs&chs=350x150&chd=t:0.987|10.153&chxr=0,0,230.3&chds=0,230.3&chbh=50,20,15&chxt=y,r&chm=N,FF0000,-1,,12|N,000000,0,,12,,c|N,00000000,1,,12,,c|N,ffffff,2,,12,,c&chma=20&chf=&chco=ffffff,00ff00&chxl=1:|global oceans min|average|global oceans max: 230.3\'><br>&nbsp;<br>Note: this information has not been validated. Check this *<a target=\'obis_gallery\' href=\'http://www.eol.org/content_partners/257\'>note</a>*. Your feedback is most welcome.'
          ],
          taxonomy: {
            usageKey: 9809229,
            scientificName: 'Sturnus vulgaris Linnaeus, 1758',
            canonicalName: 'Sturnus vulgaris',
            rank: 'SPECIES',
            status: 'ACCEPTED',
            confidence: 100,
            matchType: 'EXACT',
            kingdom: 'Animalia',
            phylum: 'Chordata',
            order: 'Passeriformes',
            family: 'Sturnidae',
            genus: 'Sturnus',
            species: 'Sturnus vulgaris',
            kingdomKey: 1,
            phylumKey: 44,
            classKey: 212,
            orderKey: 729,
            familyKey: 9350,
            genusKey: 2489099,
            speciesKey: 9809229,
            synonym: false,
            'class': 'Aves'
          },
          family: 'Sturnidae',
          eolName: 'Sturnus vulgaris Linnaeus 1758',
          snapIndex: 2,
          image: '2012/07/26/22/29825_orig.jpg',
          vernacularName: 'Starling',
          passes: 1,
          fails: '--',
          binomial: 'Sturnus vulgaris',
          shortName: 'S. vulgaris',
          keyTrait: '',
          genus: 'Sturnus',
          species: 'vulgaris'
        },
        {
          id: 1051997,
          name: 'Cyanistes caeruleus',
          images: [
            '2012/06/13/05/94188_orig.jpg',
            '2015/01/20/05/14639_orig.jpg',
            '2012/06/13/05/25999_orig.jpg',
            '2015/01/21/07/32241_orig.jpg',
            '2016/08/04/15/99579_orig.jpg',
            '2014/12/28/22/94944_orig.jpg',
            '2012/06/13/05/65775_orig.jpg',
            '2015/02/21/12/22894_orig.jpg'
          ],
          names: [
            {
              vernacularName: 'Blaumeise',
              language: 'de',
              eol_preferred: true
            },
            {
              vernacularName: 'Blue Tit',
              language: 'en',
              eol_preferred: true
            },
            {
              vernacularName: 'Blaumeise',
              language: 'en'
            },
            {
              vernacularName: 'Eurasian Blue Tit',
              language: 'en',
              wikiSearchTerm: true
            },
            {
              vernacularName: 'Fuerteventura Blue Tit',
              language: 'en'
            },
            {
              vernacularName: 'North African Blue Tit',
              language: 'en'
            },
            {
              vernacularName: 'Palma Blue Tit',
              language: 'en'
            },
            {
              vernacularName: 'Tenerife Blue Tit',
              language: 'en'
            },
            {
              vernacularName: 'Herrerillo común',
              language: 'es',
              eol_preferred: true
            },
            {
              vernacularName: 'Parus caeruleus',
              language: 'es'
            },
            {
              vernacularName: 'Mésange bleue',
              language: 'fr',
              eol_preferred: true
            },
            {
              vernacularName: 'Mésange de Fuerteventura',
              language: 'fr'
            },
            {
              vernacularName: 'Mésange de Palma',
              language: 'fr'
            },
            {
              vernacularName: 'Mésange de Ténérife',
              language: 'fr'
            },
            {
              vernacularName: 'Mésange maghrébine',
              language: 'fr'
            },
            {
              vernacularName: 'Cyanistes caeruleus',
              language: 'it',
              eol_preferred: true
            },
            {
              vernacularName: 'Cinciarella',
              language: 'it'
            },
            {
              vernacularName: 'Chapim-azul',
              language: 'pt',
              eol_preferred: true
            }
          ],
          descriptions: [],
          taxonomy: {
            usageKey: 2487879,
            scientificName: 'Cyanistes caeruleus (Linnaeus, 1758)',
            canonicalName: 'Cyanistes caeruleus',
            rank: 'SPECIES',
            status: 'ACCEPTED',
            confidence: 99,
            matchType: 'EXACT',
            kingdom: 'Animalia',
            phylum: 'Chordata',
            order: 'Passeriformes',
            family: 'Paridae',
            genus: 'Cyanistes',
            species: 'Cyanistes caeruleus',
            kingdomKey: 1,
            phylumKey: 44,
            classKey: 212,
            orderKey: 729,
            familyKey: 9327,
            genusKey: 2487875,
            speciesKey: 2487879,
            synonym: false,
            'class': 'Aves'
          },
          family: 'Paridae',
          eolName: 'Cyanistes caeruleus (Linnaeus, 1758)',
          snapIndex: 3,
          image: '2012/06/13/05/94188_orig.jpg',
          vernacularName: 'Blue Tit',
          passes: 1,
          fails: '--',
          binomial: 'Cyanistes caeruleus',
          shortName: 'C. caeruleus',
          keyTrait: '',
          genus: 'Cyanistes',
          species: 'caeruleus'
        },
        {
          id: 1177498,
          name: 'Turdus merula',
          images: [
            '2012/06/12/22/82380_orig.jpg',
            '2012/06/12/22/09755_orig.jpg',
            '2012/06/12/22/82216_orig.jpg',
            '2012/06/12/22/25194_orig.jpg',
            '2012/06/12/22/61837_orig.jpg',
            '2015/12/01/11/13825_orig.jpg',
            '2012/06/12/22/34309_orig.jpg'
          ],
          names: [
            {
              vernacularName: 'Amsel',
              language: 'de',
              eol_preferred: true
            },
            {
              vernacularName: 'Blackbird',
              language: 'en'
            },
            {
              vernacularName: 'Common Blackbird',
              language: 'en',
              eol_preferred: true,
              wikiSearchTerm: true
            },
            {
              vernacularName: 'Amsel',
              language: 'en'
            },
            {
              vernacularName: 'Common blackbird and Eurasian blackbird',
              language: 'en'
            },
            {
              vernacularName: 'Eurasian Blackbird',
              language: 'en'
            },
            {
              vernacularName: 'Nilgiri Blackbird',
              language: 'en'
            },
            {
              vernacularName: 'Mirlo común',
              language: 'es',
              eol_preferred: true
            },
            {
              vernacularName: 'Turdus merula',
              language: 'es'
            },
            {
              vernacularName: 'merle noir',
              language: 'fr',
              eol_preferred: true
            },
            {
              vernacularName: 'Turdus merula',
              language: 'it',
              eol_preferred: true
            },
            {
              vernacularName: 'Merlo',
              language: 'it'
            }
          ],
          descriptions: [],
          taxonomy: {
            usageKey: 2490719,
            scientificName: 'Turdus merula Linnaeus, 1758',
            canonicalName: 'Turdus merula',
            rank: 'SPECIES',
            status: 'ACCEPTED',
            confidence: 100,
            matchType: 'EXACT',
            kingdom: 'Animalia',
            phylum: 'Chordata',
            order: 'Passeriformes',
            family: 'Muscicapidae',
            genus: 'Turdus',
            species: 'Turdus merula',
            kingdomKey: 1,
            phylumKey: 44,
            classKey: 212,
            orderKey: 729,
            familyKey: 9322,
            genusKey: 2490714,
            speciesKey: 2490719,
            synonym: false,
            'class': 'Aves'
          },
          family: 'Muscicapidae',
          eolName: 'Turdus merula Linnaeus 1758',
          snapIndex: 4,
          image: '2012/06/12/22/82380_orig.jpg',
          vernacularName: 'Blackbird',
          passes: 1,
          fails: '--',
          binomial: 'Turdus merula',
          shortName: 'T. merula',
          keyTrait: '',
          genus: 'Turdus',
          species: 'merula'
        },
        {
          id: 1049693,
          name: 'Columba palumbus',
          images: [
            '2016/08/01/19/68979_orig.jpg',
            '2016/08/03/10/91552_orig.jpg',
            '2016/08/01/09/74595_orig.jpg',
            '2011/11/01/15/93754_orig.jpg',
            '2016/08/01/10/38005_orig.jpg',
            '2012/05/23/10/70480_orig.jpg',
            '2011/11/02/00/33144_orig.jpg',
            '2015/04/30/03/00948_orig.jpg',
            '2016/08/03/18/35813_orig.jpg',
            '2015/05/20/09/96688_orig.jpg'
          ],
          names: [
            {
              vernacularName: 'Ringeltaube',
              language: 'de',
              eol_preferred: true
            },
            {
              vernacularName: 'Wood Pigeon',
              language: 'en',
              eol_preferred: true
            },
            {
              vernacularName: 'Bar-tailed Cuckoo',
              language: 'en'
            },
            {
              vernacularName: 'Common Wood Pigeon',
              language: 'en',
              wikiSearchTerm: true
            },
            {
              vernacularName: 'Common Wood-Pigeon',
              language: 'en'
            },
            {
              vernacularName: 'Common woodpigeon',
              language: 'en'
            },
            {
              vernacularName: 'Ring Dove or Cushat',
              language: 'en'
            },
            {
              vernacularName: 'Wood Pigeon, Ring Dove or Cushat',
              language: 'en'
            },
            {
              vernacularName: 'Woodpigeon',
              language: 'en'
            },
            {
              vernacularName: 'Paloma torcaz',
              language: 'es',
              eol_preferred: true
            },
            {
              vernacularName: 'Pigeon ramier',
              language: 'fr',
              eol_preferred: true
            },
            {
              vernacularName: 'Columba palumbus',
              language: 'it',
              eol_preferred: true
            },
            {
              vernacularName: 'Colombaccio',
              language: 'it'
            }
          ],
          descriptions: [
            'Woodpigeons feed on grains, fruits, seeds, peas and beans, root crops and the occasional invertebrate (3).&nbsp;Courtship displays involve birds flying fairly high before clapping the wings together and gliding down, as well as males strutting and fluffing out their chest feathers (3). The male brings nesting materials to the female, who builds an untidy platform-like nest, usually in a tree, before laying 2 white eggs (3). Both sexes incubate the eggs for around 17 days; they then feed the young (known as squabs), on \'pigeon milk\', a regurgitated milky substance from a food-storage organ called the crop (3). The squabs fledge 29-35 days after hatching (3).'
          ],
          taxonomy: {
            usageKey: 2495455,
            scientificName: 'Columba palumbus Linnaeus, 1758',
            canonicalName: 'Columba palumbus',
            rank: 'SPECIES',
            status: 'ACCEPTED',
            confidence: 100,
            matchType: 'EXACT',
            kingdom: 'Animalia',
            phylum: 'Chordata',
            order: 'Columbiformes',
            family: 'Columbidae',
            genus: 'Columba',
            species: 'Columba palumbus',
            kingdomKey: 1,
            phylumKey: 44,
            classKey: 212,
            orderKey: 1446,
            familyKey: 5233,
            genusKey: 2495404,
            speciesKey: 2495455,
            synonym: false,
            'class': 'Aves'
          },
          family: 'Columbidae',
          eolName: 'Columba palumbus Linnaeus 1758',
          snapIndex: 5,
          image: '2016/08/01/19/68979_orig.jpg',
          vernacularName: 'Wood Pigeon',
          passes: 1,
          fails: '--',
          binomial: 'Columba palumbus',
          shortName: 'C. palumbus',
          keyTrait: '',
          genus: 'Columba',
          species: 'palumbus'
        },
        {
          id: 1051079,
          name: 'Carduelis carduelis',
          images: [
            '2016/08/30/19/54849_orig.jpg',
            '2013/12/10/02/78587_orig.jpg',
            '2013/11/30/20/90252_orig.jpg',
            '2012/06/12/10/38629_orig.jpg',
            '2013/11/30/10/89179_orig.jpg',
            '2013/12/07/17/97056_orig.jpg',
            '2013/12/01/23/15478_orig.jpg',
            '2013/12/10/02/54036_orig.jpg',
            '2013/12/10/02/96135_orig.jpg',
            '2013/12/10/02/56352_orig.jpg',
            '2016/12/31/12/21834_orig.jpg'
          ],
          names: [
            {
              vernacularName: 'Distelfink',
              language: 'de',
              eol_preferred: true
            },
            {
              vernacularName: 'Stieglitz',
              language: 'de'
            },
            {
              vernacularName: 'Stieglitz (Distelfink)',
              language: 'de'
            },
            {
              vernacularName: 'European Goldfinch',
              language: 'en',
              eol_preferred: true,
              wikiSearchTerm: true
            },
            {
              vernacularName: 'Goldfinch',
              language: 'en'
            },
            {
              vernacularName: 'draw-water',
              language: 'en'
            },
            {
              vernacularName: 'eurasian goldfinch',
              language: 'en'
            },
            {
              vernacularName: 'thistle-bird',
              language: 'en'
            },
            {
              vernacularName: 'Jilguero Europeo',
              language: 'es',
              eol_preferred: true
            },
            {
              vernacularName: 'Colorín',
              language: 'es'
            },
            {
              vernacularName: 'Jilguero',
              language: 'es'
            },
            {
              vernacularName: 'Siete Colores',
              language: 'es'
            },
            {
              vernacularName: 'chardonneret èlègant',
              language: 'fr',
              eol_preferred: true
            },
            {
              vernacularName: 'chardonneret élégant',
              language: 'fr'
            },
            {
              vernacularName: 'Cardellino',
              language: 'it',
              eol_preferred: true
            },
            {
              vernacularName: 'Pintassilgo',
              language: 'pt',
              eol_preferred: true
            }
          ],
          descriptions: [
            'Depth range based on 3 specimens in 1 taxon.<br>Water temperature and chemistry ranges based on 1 sample.<br><br>Environmental ranges<br>&nbsp;&nbsp;Depth range (m): 0 - 0<br>&nbsp;&nbsp;Temperature range (&deg;C): 11.811 - 11.811<br>&nbsp;&nbsp;Nitrate (umol/L): 6.342 - 6.342<br>&nbsp;&nbsp;Salinity (PPS): 34.953 - 34.953<br>&nbsp;&nbsp;Oxygen (ml/l): 6.391 - 6.391<br>&nbsp;&nbsp;Phosphate (umol/l): 0.377 - 0.377<br>&nbsp;&nbsp;Silicate (umol/l): 3.584 - 3.584<br>&nbsp;<br>Note: this information has not been validated. Check this *<a target=\'obis_gallery\' href=\'http://www.eol.org/content_partners/257\'>note</a>*. Your feedback is most welcome.'
          ],
          taxonomy: {
            usageKey: 2494686,
            scientificName: 'Carduelis carduelis (Linnaeus, 1758)',
            canonicalName: 'Carduelis carduelis',
            rank: 'SPECIES',
            status: 'ACCEPTED',
            confidence: 99,
            matchType: 'EXACT',
            kingdom: 'Animalia',
            phylum: 'Chordata',
            order: 'Passeriformes',
            family: 'Fringillidae',
            genus: 'Carduelis',
            species: 'Carduelis carduelis',
            kingdomKey: 1,
            phylumKey: 44,
            classKey: 212,
            orderKey: 729,
            familyKey: 5242,
            genusKey: 2494621,
            speciesKey: 2494686,
            synonym: false,
            'class': 'Aves'
          },
          family: 'Fringillidae',
          eolName: 'Carduelis carduelis (Linnaeus, 1758)',
          snapIndex: 6,
          image: '2016/08/30/19/54849_orig.jpg',
          vernacularName: 'European Goldfinch',
          passes: 1,
          fails: '--',
          binomial: 'Carduelis carduelis',
          shortName: 'C. carduelis',
          keyTrait: '',
          genus: 'Carduelis',
          species: 'carduelis'
        },
        {
          id: 1051974,
          name: 'Parus major',
          images: [
            '2013/11/25/22/11572_orig.jpg',
            '2012/06/13/05/98189_orig.jpg',
            '2012/06/13/05/93978_orig.jpg',
            '2016/08/02/05/74716_orig.jpg',
            '2016/08/06/04/17413_orig.jpg',
            '2016/08/04/15/83315_orig.jpg',
            '2015/04/27/05/41188_orig.jpg',
            '2015/03/21/14/16241_orig.jpg',
            '2012/06/13/05/19172_orig.jpg',
            '2015/04/27/05/22078_orig.jpg',
            '2016/08/02/05/59828_orig.jpg'
          ],
          names: [
            {
              vernacularName: 'Kohlmeise',
              language: 'de',
              eol_preferred: true
            },
            {
              vernacularName: 'Great Tit',
              language: 'en',
              eol_preferred: true,
              wikiSearchTerm: true
            },
            {
              vernacularName: 'Cinereous Tit',
              language: 'en'
            },
            {
              vernacularName: 'Kohlmeise',
              language: 'en'
            },
            {
              vernacularName: 'Széncinege',
              language: 'en'
            },
            {
              vernacularName: 'Carbonero común',
              language: 'es',
              eol_preferred: true
            },
            {
              vernacularName: 'Mésange charbonnière',
              language: 'fr',
              eol_preferred: true
            },
            {
              vernacularName: 'Parus major',
              language: 'it',
              eol_preferred: true
            },
            {
              vernacularName: 'Cinciallegra',
              language: 'it'
            },
            {
              vernacularName: 'Chapim-real',
              language: 'pt',
              eol_preferred: true
            }
          ],
          descriptions: [],
          taxonomy: {
            usageKey: 9705453,
            scientificName: 'Parus major Linnaeus, 1758',
            canonicalName: 'Parus major',
            rank: 'SPECIES',
            status: 'ACCEPTED',
            confidence: 100,
            matchType: 'EXACT',
            kingdom: 'Animalia',
            phylum: 'Chordata',
            order: 'Passeriformes',
            family: 'Paridae',
            genus: 'Parus',
            species: 'Parus major',
            kingdomKey: 1,
            phylumKey: 44,
            classKey: 212,
            orderKey: 729,
            familyKey: 9327,
            genusKey: 2487923,
            speciesKey: 9705453,
            synonym: false,
            'class': 'Aves'
          },
          family: 'Paridae',
          eolName: 'Parus major Linnaeus 1758',
          snapIndex: 7,
          image: '2013/11/25/22/11572_orig.jpg',
          vernacularName: 'Great Tit',
          passes: 1,
          fails: '--',
          binomial: 'Parus major',
          shortName: 'P. major',
          keyTrait: '',
          genus: 'Parus',
          species: 'major'
        },
        {
          id: 1051567,
          name: 'Erithacus rubecula',
          images: [
            '2012/06/12/23/28926_orig.jpg',
            '2012/06/12/23/08809_orig.jpg',
            '2012/06/12/23/37934_orig.jpg',
            '2012/06/13/13/98179_orig.jpg',
            '2015/04/07/04/85402_orig.jpg',
            '2012/06/12/23/18687_orig.jpg',
            '2012/06/12/23/65810_orig.jpg'
          ],
          names: [
            {
              vernacularName: 'Rotkehlchen',
              language: 'de',
              eol_preferred: true
            },
            {
              vernacularName: 'Robin',
              language: 'en'
            },
            {
              vernacularName: 'European Robin',
              language: 'en',
              eol_preferred: true,
              wikiSearchTerm: true
            },
            {
              vernacularName: 'Eurasian Robin',
              language: 'en'
            },
            {
              vernacularName: 'Petirrojo',
              language: 'es',
              eol_preferred: true
            },
            {
              vernacularName: 'Rougegorge',
              language: 'fr',
              eol_preferred: true
            },
            {
              vernacularName: 'Rougegorge familier',
              language: 'fr'
            },
            {
              vernacularName: 'Pettirosso',
              language: 'it',
              eol_preferred: true
            },
            {
              vernacularName: 'Pisco-de-peito-ruivo',
              language: 'pt',
              eol_preferred: true
            }
          ],
          descriptions: [
            'Depth range based on 14 specimens in 1 taxon.<br>Water temperature and chemistry ranges based on 13 samples.<br><br>Environmental ranges<br>&nbsp;&nbsp;Depth range (m): 0 - 0<br>&nbsp;&nbsp;Temperature range (&deg;C): 7.705 - 10.083<br>&nbsp;&nbsp;Nitrate (umol/L): 1.327 - 6.274<br>&nbsp;&nbsp;Salinity (PPS): 6.218 - 35.157<br>&nbsp;&nbsp;Oxygen (ml/l): 6.360 - 8.325<br>&nbsp;&nbsp;Phosphate (umol/l): 0.240 - 0.497<br>&nbsp;&nbsp;Silicate (umol/l): 1.816 - 10.160<br><br>Graphical representation<br><br>Temperature range (&deg;C): 7.705 - 10.083 <img src=\'http://chart.apis.google.com/chart?cht=bvs&chs=350x150&chd=t:7.705|2.378&chxr=0,-2.072,29.546&chds=0,29.546&chbh=50,20,15&chxt=y,r&chm=N,FF0000,-1,,12|N,000000,0,,12,,c|N,00000000,1,,12,,c|N,ffffff,2,,12,,c&chma=20&chf=b1,lg,90,FF0000,0,76A4FB,1&chco=ffffff,389ced&chxl=1:|global oceans min: -2.072|average|global oceans max: 29.546\'><br><br>Nitrate (umol/L): 1.327 - 6.274 <img src=\'http://chart.apis.google.com/chart?cht=bvs&chs=350x150&chd=t:1.327|4.947&chxr=0,0,49.846&chds=0,49.846&chbh=50,20,15&chxt=y,r&chm=N,FF0000,-1,,12|N,000000,0,,12,,c|N,00000000,1,,12,,c|N,ffffff,2,,12,,c&chma=20&chf=&chco=ffffff,00ff00&chxl=1:|global oceans min|average|global oceans max: 49.846\'><br><br>Salinity (PPS): 6.218 - 35.157 <img src=\'http://chart.apis.google.com/chart?cht=bvs&chs=350x150&chd=t:6.218|28.939&chxr=0,5,40.817&chds=0,40.817&chbh=50,20,15&chxt=y,r&chm=N,FF0000,-1,,12|N,000000,0,,12,,c|N,00000000,1,,12,,c|N,ffffff,2,,12,,c&chma=20&chf=&chco=ffffff,389ced&chxl=1:|global oceans min: 5|average|global oceans max: 40.817\'><br><br>Oxygen (ml/l): 6.360 - 8.325 <img src=\'http://chart.apis.google.com/chart?cht=bvs&chs=350x150&chd=t:6.360|1.964999999999999&chxr=0,0,9.323&chds=0,9.323&chbh=50,20,15&chxt=y,r&chm=N,FF0000,-1,,12|N,000000,0,,12,,c|N,00000000,1,,12,,c|N,ffffff,2,,12,,c&chma=20&chf=&chco=ffffff,389ced&chxl=1:|global oceans min|average|global oceans max: 9.323\'><br><br>Phosphate (umol/l): 0.240 - 0.497 <img src=\'http://chart.apis.google.com/chart?cht=bvs&chs=350x150&chd=t:0.240|0.257&chxr=0,0.006,3.661&chds=0,3.661&chbh=50,20,15&chxt=y,r&chm=N,FF0000,-1,,12|N,000000,0,,12,,c|N,00000000,1,,12,,c|N,ffffff,2,,12,,c&chma=20&chf=&chco=ffffff,00ff00&chxl=1:|global oceans min: 0.006|average|global oceans max: 3.661\'><br><br>Silicate (umol/l): 1.816 - 10.160 <img src=\'http://chart.apis.google.com/chart?cht=bvs&chs=350x150&chd=t:1.816|8.343999999999999&chxr=0,0,230.3&chds=0,230.3&chbh=50,20,15&chxt=y,r&chm=N,FF0000,-1,,12|N,000000,0,,12,,c|N,00000000,1,,12,,c|N,ffffff,2,,12,,c&chma=20&chf=&chco=ffffff,00ff00&chxl=1:|global oceans min|average|global oceans max: 230.3\'><br>&nbsp;<br>Note: this information has not been validated. Check this *<a target=\'obis_gallery\' href=\'http://www.eol.org/content_partners/257\'>note</a>*. Your feedback is most welcome.'
          ],
          taxonomy: {
            usageKey: 2492462,
            scientificName: 'Erithacus rubecula (Linnaeus, 1758)',
            canonicalName: 'Erithacus rubecula',
            rank: 'SPECIES',
            status: 'ACCEPTED',
            confidence: 99,
            matchType: 'EXACT',
            kingdom: 'Animalia',
            phylum: 'Chordata',
            order: 'Passeriformes',
            family: 'Muscicapidae',
            genus: 'Erithacus',
            species: 'Erithacus rubecula',
            kingdomKey: 1,
            phylumKey: 44,
            classKey: 212,
            orderKey: 729,
            familyKey: 9322,
            genusKey: 2492460,
            speciesKey: 2492462,
            synonym: false,
            'class': 'Aves'
          },
          family: 'Muscicapidae',
          eolName: 'Erithacus rubecula (Linnaeus, 1758)',
          snapIndex: 8,
          image: '2012/06/12/23/28926_orig.jpg',
          vernacularName: 'Robin',
          passes: 1,
          fails: '--',
          binomial: 'Erithacus rubecula',
          shortName: 'E. rubecula',
          keyTrait: '',
          genus: 'Erithacus',
          species: 'rubecula'
        }
      ],
      collections: [
        'RSPB Top 10 UK Birds'
      ],
      thumb: 'https://media.eol.org/content/2015/01/21/07/32241_88_88.jpg',
      moduleSize: 4,
      curator: 'Snapdragon',
      userLevel: 'General Interest',
      lessonPlanLandscape: 1,
      lessonPlanPortrait: 101,
      glossary: [
        'animalia',
        'common'
      ],
      courseId: 3,
      course: 'Snapdragon',
      speciesCount: 10,
      familiesCount: 7,
      itemNames: [
        'Passer domesticus',
        'Sturnus vulgaris',
        'Cyanistes caeruleus',
        'Turdus merula',
        'Columba palumbus',
        'Carduelis carduelis',
        'Parus major',
        'Erithacus rubecula',
        'Aegithalos caudatus',
        'Fringilla coelebs'
      ],
      itemIndex: 0,
      families: [
        'Passeridae',
        'Sturnidae',
        'Paridae',
        'Muscicapidae',
        'Columbidae',
        'Fringillidae',
        'Paridae',
        'Muscicapidae'
      ],
      familyStats: {
        Passeridae: 1,
        Sturnidae: 1,
        Paridae: 2,
        Muscicapidae: 2,
        Columbidae: 1,
        Fringillidae: 1
      },
      speciesNames: [
        'Passer domesticus',
        'Sturnus vulgaris',
        'Cyanistes caeruleus',
        'Turdus merula',
        'Columba palumbus',
        'Carduelis carduelis',
        'Parus major',
        'Erithacus rubecula'
      ],
      speciesVernacularNames: [
        'European Goldfinch',
        'Blackbird',
        'Starling',
        'Wood Pigeon',
        'Sparrow',
        'Great Tit',
        'Robin',
        'Blue Tit'
      ],
      nextItem: {
        id: 922241,
        name: 'Passer domesticus',
        images: [
          '2012/06/13/17/07300_orig.jpg',
          '2012/06/13/17/12554_orig.jpg',
          '2012/06/13/17/57539_orig.jpg',
          '2012/06/13/17/04879_orig.jpg',
          '2012/06/13/17/56733_orig.jpg',
          '2012/06/13/17/37561_orig.jpg',
          '2012/06/13/17/26690_orig.jpg',
          '2012/06/13/17/55437_orig.jpg',
          '2012/06/13/17/97022_orig.jpg',
          '2013/09/13/13/71550_orig.jpg',
          '2012/06/13/17/28480_orig.jpg'
        ],
        names: [
          {
            vernacularName: 'Haussperling',
            language: 'de',
            eol_preferred: true
          },
          {
            vernacularName: 'Italiensperling',
            language: 'de'
          },
          {
            vernacularName: 'Lüning [norddt.]',
            language: 'de'
          },
          {
            vernacularName: 'Spatz',
            language: 'de'
          },
          {
            vernacularName: 'Sperling',
            language: 'de'
          },
          {
            vernacularName: 'Sparrow',
            language: 'en'
          },
          {
            vernacularName: 'House Sparrow',
            language: 'en',
            eol_preferred: true,
            wikiSearchTerm: true
          },
          {
            vernacularName: 'English sparrow',
            language: 'en'
          },
          {
            vernacularName: 'Italian Sparrow',
            language: 'en'
          },
          {
            vernacularName: 'Phillip sparrow',
            language: 'en'
          },
          {
            vernacularName: 'Town sparrow',
            language: 'en'
          },
          {
            vernacularName: 'sparrow, house',
            language: 'en'
          },
          {
            vernacularName: 'Gorrión común',
            language: 'es',
            eol_preferred: true
          },
          {
            vernacularName: 'Europese huismus',
            language: 'es'
          },
          {
            vernacularName: 'Gorrion casero',
            language: 'es'
          },
          {
            vernacularName: 'Gorrión Doméstico',
            language: 'es'
          },
          {
            vernacularName: 'Gorrión Italiano',
            language: 'es'
          },
          {
            vernacularName: 'Gorrión casero',
            language: 'es'
          },
          {
            vernacularName: 'Pardal',
            language: 'es'
          },
          {
            vernacularName: 'dror habayit',
            language: 'es'
          },
          {
            vernacularName: 'gorrion',
            language: 'es'
          },
          {
            vernacularName: 'graspurv',
            language: 'es'
          },
          {
            vernacularName: 'moineau domestique',
            language: 'fr',
            eol_preferred: true
          },
          {
            vernacularName: 'Moineau cisalpin *',
            language: 'fr'
          },
          {
            vernacularName: 'moineau franc',
            language: 'fr'
          },
          {
            vernacularName: 'Passero domestico',
            language: 'it',
            eol_preferred: true
          },
          {
            vernacularName: 'Passera europea',
            language: 'it'
          },
          {
            vernacularName: 'Passera oltremontana',
            language: 'it'
          },
          {
            vernacularName: 'Pardal-comum',
            language: 'pt',
            eol_preferred: true
          },
          {
            vernacularName: 'Pardal-dos-telhados',
            language: 'pt'
          }
        ],
        descriptions: [],
        taxonomy: {
          usageKey: 5231190,
          scientificName: 'Passer domesticus (Linnaeus, 1758)',
          canonicalName: 'Passer domesticus',
          rank: 'SPECIES',
          status: 'ACCEPTED',
          confidence: 99,
          matchType: 'EXACT',
          kingdom: 'Animalia',
          phylum: 'Chordata',
          order: 'Passeriformes',
          family: 'Passeridae',
          genus: 'Passer',
          species: 'Passer domesticus',
          kingdomKey: 1,
          phylumKey: 44,
          classKey: 212,
          orderKey: 729,
          familyKey: 5264,
          genusKey: 2492321,
          speciesKey: 5231190,
          synonym: false,
          'class': 'Aves'
        },
        family: 'Passeridae',
        eolName: 'Passer domesticus (Linnaeus, 1758)',
        snapIndex: 1,
        image: '2012/06/13/17/07300_orig.jpg',
        vernacularName: 'Sparrow',
        passes: 1,
        fails: '--',
        binomial: 'Passer domesticus',
        shortName: 'P. domesticus',
        keyTrait: '',
        genus: 'Passer',
        species: 'domesticus'
      },
      lesson: {
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
                ]
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
        level: {
          id: 1,
          name: 'Level 1',
          layouts: [
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
              ]
            }
          ]
        }
      },
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
        ]
      ],
      activeLevelCount: 5,
      lessonName: 'Lesson 1',
      levelName: 'Level 1',
      layoutCount: 5,
      layoutCounter: 5,
      itemGroup: [
        4,
        5,
        6,
        7
      ],
      layoutName: 'summary',
      isLevelComplete: true,
      isLessonComplete: false
    },
    score: {
      total: 4,
      correct: 4,
      binomial: 'Erithacus rubecula',
      incorrect: 0,
      answer: 'Robin',
      question: 'Robin',
      fails: [],
      passes: [
        {
          itemId: 1049693,
          taxon: 'name',
          binomial: 'Columba palumbus',
          question: 'Wood Pigeon',
          answer: 'Wood Pigeon'
        },
        {
          itemId: 1051079,
          taxon: 'name',
          binomial: 'Carduelis carduelis',
          question: 'European Goldfinch',
          answer: 'European Goldfinch'
        },
        {
          itemId: 1051974,
          taxon: 'name',
          binomial: 'Parus major',
          question: 'Great Tit',
          answer: 'Great Tit'
        },
        {
          itemId: 1051567,
          taxon: 'name',
          binomial: 'Erithacus rubecula',
          question: 'Robin',
          answer: 'Robin'
        }
      ],
      success: true,
      mode: 'learn',
      totalPassPoints: 4,
      totalPoints: 4,
      itemId: 1051567,
      items: {
        '0': {},
        '1': {},
        '2': {},
        '3': {},
        '4': {},
        '5': {}
      },
      taxon: 'name',
      questionCount: 4,
      layoutCount: 5,
      points: 1,
      colour: 'snap-success',
      passesTotals: {
        '1049693': 1,
        '1051079': 1,
        '1051567': 1,
        '1051974': 1
      },
      failsTotals: 0,
      totalFailPoints: 0,
      questionTotal: 4
    },
    collections: [
      {
        providerId: 1,
        id: 1,
        name: 'Kitchen Garden',
        type: 'species',
        descriptions: [
          'Learn the common and scientific names of herbs, vegetables and fruit used in Western cooking.',
          'All of the species are either native or adapted to a Mediterranean climate.',
          'Later lessons will introduce you to families and the traits they share.'
        ],
        items: [],
        thumb: 'https://media.eol.org/content/2014/06/03/05/47795_orig.jpg',
        moduleSize: 6,
        curator: 'Snapdragon',
        userLevel: 'General Interest',
        lessonPlanLandscape: 1,
        lessonPlanPortrait: 101,
        glossary: [
          'plantae',
          'common'
        ],
        courseId: 1,
        course: 'Snapdragon',
        speciesCount: 56,
        familiesCount: 19,
        itemNames: [
          'Allium sativum',
          'Coriandrum sativum',
          'Cuminum cyminum',
          'Origanum majorana',
          'Cymbopogon citratus',
          'Sinapis alba',
          'Zingiber officinale',
          'Brassica nigra',
          'Carum carvi',
          'Satureja hortensis',
          'Piper nigrum',
          'Laurus nobilis',
          'Capsicum annuum',
          'Salvia officinalis',
          'Origanum vulgare',
          'Foeniculum vulgare',
          'Mentha spicata',
          'Anethum graveolens',
          'Thymus vulgaris',
          'Petroselinum crispum',
          'Ocimum basilicum',
          'Allium schoenoprasum',
          'Artemisia dracunculus',
          'Rosmarinus officinalis',
          'Borago officinalis',
          'Cucumis sativus',
          'Beta vulgaris',
          'Spinacia oleracea',
          'Raphanus sativus',
          'Cucurbita pepo',
          'Solanum lycopersicum',
          'Brassica rapa',
          'Vicia faba',
          'Phaseolus coccineus',
          'Pisum sativum',
          'Pastinaca sativa',
          'Solanum melongena',
          'Cynara cardunculus',
          'Lactuca sativa',
          'Daucus carota',
          'Brassica oleracea',
          'Solanum tuberosum',
          'Allium cepa',
          'Vitis vinifera',
          'Mespilus germanica',
          'Prunus armeniaca',
          'Prunus domestica',
          'Prunus persica',
          'Rubus idaeus',
          'Citrus limon',
          'Fragaria ananassa',
          'Pyrus communis',
          'Ficus carica',
          'Malus domestica',
          'Prunus avium',
          'Apis mellifera'
        ],
        selected: false
      },
      {
        providerId: 2,
        id: 2,
        name: 'Deciduous and Evergreen Trees',
        type: 'species',
        descriptions: [
          'This is an approved list of Deciduous and Evergreen Trees from the Royal Horticultural Society (RHS).',
          'Students taking RHS courses in Practical Horticulture are required to learn some, or all, of these species.'
        ],
        items: [],
        collections: [
          'Deciduous and evergreen trees'
        ],
        thumb: 'https://media.eol.org/content/2012/06/12/18/89509_orig.jpg',
        moduleSize: 6,
        curator: 'Snapdragon',
        userLevel: 'RHS students',
        lessonPlanLandscape: 1,
        lessonPlanPortrait: 101,
        glossary: [
          'plantae',
          'common'
        ],
        courseId: 2,
        course: 'RHS Practical Horticulture',
        speciesCount: 65,
        familiesCount: 20,
        itemNames: [
          'Styrax hemsleyanus',
          'Stewartia sinensis',
          'Tilia euchlora',
          'Sorbus cashmiriana',
          'Tilia europaea',
          'Stewartia pseudocamellia',
          'Sorbus aucuparia',
          'Salix sepulcralis',
          'Sorbus aria',
          'Salix alba',
          'Robinia pseudoacacia',
          'Quercus robur',
          'Pyrus salicifolia',
          'Quercus ilex',
          'Quercus coccinea',
          'Prunus serrula',
          'Pyrus calleryana',
          'Prunus subhirtella',
          'Prunus cerasifera',
          'Platanus orientalis',
          'Populus nigra',
          'Prunus avium',
          'Olea europaea',
          'Platanus acerifolia',
          'Liriodendron chinense',
          'Malus floribunda',
          'Malus sylvestris',
          'Liriodendron tulipifera',
          'Laburnum watereri',
          'Magnolia soulangeana',
          'Liquidambar styraciflua',
          'Ilex altaclerensis',
          'Ligustrum lucidum',
          'Eucryphia x nymansensis',
          'Juglans regia',
          'Eucalyptus pauciflora',
          'Crataegus prunifolia',
          'Fraxinus ornus',
          'Eucalyptus gunnii',
          'Gleditsia triacanthos',
          'Fagus sylvatica',
          'Fraxinus excelsior',
          'Crataegus laevigata',
          'Crataegus monogyna',
          'Cercis siliquastrum',
          'Cercidiphyllum japonicum',
          'Cordyline australis',
          'Catalpa bignonioides',
          'Betula utilis',
          'Amelanchier lamarckii',
          'Castanea sativa',
          'Carpinus betulus',
          'Betula pendula',
          'Amelanchier canadensis',
          'Alnus cordata',
          'Alnus glutinosa',
          'Aesculus carnea',
          'Aesculus hippocastanum',
          'Acer rubrum',
          'Acer platanoides',
          'Acer pseudoplatanus',
          'Acer davidii',
          'Acer griseum',
          'Acacia baileyana',
          'Acacia dealbata'
        ],
        selected: false
      },
      {
        providerId: 1,
        id: 3,
        name: 'RSPB Top 10 UK Birds',
        type: 'species',
        descriptions: [
          'This lesson will test you on the top 10 most common birds in the UK.',
          'The list is taken from the RSPB Big Garden Birdwatch 2018 survey.',
          '420,489 people recorded 6,764,475 separate bird sightings.'
        ],
        items: [],
        collections: [
          'RSPB Top 10 UK Birds'
        ],
        thumb: 'https://media.eol.org/content/2015/01/21/07/32241_88_88.jpg',
        moduleSize: 4,
        curator: 'Snapdragon',
        userLevel: 'General Interest',
        lessonPlanLandscape: 1,
        lessonPlanPortrait: 101,
        glossary: [
          'animalia',
          'common'
        ],
        courseId: 3,
        course: 'Snapdragon',
        speciesCount: 10,
        familiesCount: 7,
        itemNames: [
          'Passer domesticus',
          'Sturnus vulgaris',
          'Cyanistes caeruleus',
          'Turdus merula',
          'Columba palumbus',
          'Carduelis carduelis',
          'Parus major',
          'Erithacus rubecula',
          'Aegithalos caudatus',
          'Fringilla coelebs'
        ],
        selected: true
      },
      {
        providerId: 2,
        id: 4,
        name: 'RHS Weeds I',
        type: 'species',
        descriptions: [
          'Part I of the approved list of Weeds for students taking Royal Horticultural Society Qualifications in Practical Horticulture.',
          'Snapdragon does not necessarily support the view that weeds are plants in the wrong place.'
        ],
        items: [],
        collections: [
          'RHS Weeds I'
        ],
        thumb: 'https://media.eol.org/content/2012/06/13/04/53382_orig.jpg',
        moduleSize: 4,
        curator: 'Snapdragon',
        userLevel: 'RHS students',
        lessonPlanLandscape: 1,
        lessonPlanPortrait: 101,
        glossary: [
          'plantae',
          'common'
        ],
        courseId: 2,
        course: 'RHS Practical Horticulture',
        speciesCount: 11,
        familiesCount: 7,
        itemNames: [
          'Elymus repens',
          'Equisetum arvense',
          'Dactylis glomerata',
          'Convolvulus arvensis',
          'Cerastium fontanum',
          'Cirsium arvense',
          'Calystegia sepium',
          'Cardamine hirsuta',
          'Aegopodium podagraria',
          'Capsella bursa-pastoris',
          'Bellis perennis'
        ],
        selected: false
      },
      {
        providerId: 1,
        type: 'species',
        thumb: 'https://media.eol.org/content/2013/03/01/14/45554_orig.jpg',
        moduleSize: 4,
        curator: 'Snapdragon',
        userLevel: 'Amateur mycologists',
        lessonPlanLandscape: 3,
        lessonPlanPortrait: 103,
        glossary: [
          'fungi'
        ],
        course: 'Snapdragon',
        id: 6,
        name: 'Mushrooms for Beginners',
        itemNames: [
          'Fistulina hepatica',
          'Boletus edulis',
          'Pleurotus ostreatus',
          'Auricularia auricula-judae',
          'Calvatia gigantea',
          'Hydnum repandum',
          'Polyporus squamosus',
          'Sarcoscypha coccinea',
          'Sparassis crispa',
          'Lepista personata'
        ],
        descriptions: [
          'A collection of 10 mushrooms that are distinctive in appearance and have no poisonous look-alikes.',
          'A good start for beginners.',
          'Specific to the UK.'
        ],
        items: [],
        speciesCount: 10,
        familiesCount: 10,
        selected: false
      },
      {
        providerId: 1,
        type: 'species',
        thumb: 'https://media.eol.org/content/2013/03/01/14/45554_orig.jpg',
        moduleSize: 4,
        curator: 'Snapdragon',
        userLevel: 'Amateur mycologists',
        lessonPlanLandscape: 3,
        lessonPlanPortrait: 103,
        glossary: [
          'fungi'
        ],
        course: 'Snapdragon',
        id: 7,
        name: 'Mushrooms of Portugal',
        itemNames: [
          'Boletus edulis',
          'Lactarius deliciosus',
          'Agaricus campestris',
          'Macrolepiota procera',
          'Craterellus cornucopioides',
          'Cantharellus cibarius',
          'Amanita caesarea',
          'Fistulina hepatica',
          'Amanita phalloides',
          'Amanita muscaria',
          'Amanita ponderosa',
          'Tricholoma equestre',
          'Boletus pinophilus',
          'Hydnum repandum'
        ],
        descriptions: [
          'A collection of mushrooms, both edible and poisonous, common to one or more regions of Portugal.'
        ],
        items: [],
        speciesCount: 14,
        familiesCount: 8,
        selected: false
      },
      {
        providerId: 1,
        type: 'species',
        thumb: 'https://media.eol.org/content/2013/03/01/14/45554_orig.jpg',
        moduleSize: 4,
        curator: 'Snapdragon',
        userLevel: 'Amateur mycologists',
        lessonPlanLandscape: 3,
        lessonPlanPortrait: 103,
        glossary: [
          'fungi'
        ],
        course: 'Snapdragon',
        id: 5,
        name: 'Mushrooms Eastern US Fall',
        itemNames: [
          'Grifola frondosa',
          'Laetiporus sulphureus',
          'Hericium erinaceus',
          'Lycoperdon perlatum',
          'Lycoperdon pyriforme',
          'Hydnum repandum',
          'Laetiporus cincinnatus',
          'Craterellus tubaeformis',
          'Hydnum umbilicatum',
          'Hericium americanum',
          'Hericium coralloides',
          'Calvatia gigantea',
          'Clitocybe nuda',
          'Armillaria mellea',
          'Armillaria tabescens',
          'Entoloma abortivum'
        ],
        descriptions: [
          'A collection of mushrooms that can be found in the Fall in the Eastern United States.',
          'Some of the species may be found in other seasons, and across the US.'
        ],
        items: [],
        speciesCount: 16,
        familiesCount: 9,
        selected: false
      }
    ],
    history: {
      scores: [
        {
          total: 4,
          correct: 4,
          binomial: 'Turdus merula',
          incorrect: 0,
          answer: 'Blackbird',
          question: 'Blackbird',
          fails: [],
          passes: [
            {
              itemId: 922241,
              taxon: 'name',
              binomial: 'Passer domesticus',
              question: 'Sparrow',
              answer: 'Sparrow'
            },
            {
              itemId: 922253,
              taxon: 'name',
              binomial: 'Sturnus vulgaris',
              question: 'Starling',
              answer: 'Starling'
            },
            {
              itemId: 1051997,
              taxon: 'name',
              binomial: 'Cyanistes caeruleus',
              question: 'Blue Tit',
              answer: 'Blue Tit'
            },
            {
              itemId: 1177498,
              taxon: 'name',
              binomial: 'Turdus merula',
              question: 'Blackbird',
              answer: 'Blackbird'
            }
          ],
          success: true,
          mode: 'learn',
          totalPassPoints: 4,
          totalPoints: 4,
          itemId: 1177498,
          items: {
            '0': {},
            '1': {},
            '2': {},
            '3': {},
            '4': {},
            '5': {}
          },
          taxon: 'name',
          questionCount: 4,
          layoutCount: 5,
          points: 1,
          colour: 'snap-success',
          passesTotals: {
            '922241': 1,
            '922253': 1,
            '1051997': 1,
            '1177498': 1
          },
          failsTotals: 0,
          totalFailPoints: 0,
          questionTotal: 4
        },
        {
          total: 4,
          correct: 4,
          binomial: 'Erithacus rubecula',
          incorrect: 0,
          answer: 'Robin',
          question: 'Robin',
          fails: [],
          passes: [
            {
              itemId: 1049693,
              taxon: 'name',
              binomial: 'Columba palumbus',
              question: 'Wood Pigeon',
              answer: 'Wood Pigeon'
            },
            {
              itemId: 1051079,
              taxon: 'name',
              binomial: 'Carduelis carduelis',
              question: 'European Goldfinch',
              answer: 'European Goldfinch'
            },
            {
              itemId: 1051974,
              taxon: 'name',
              binomial: 'Parus major',
              question: 'Great Tit',
              answer: 'Great Tit'
            },
            {
              itemId: 1051567,
              taxon: 'name',
              binomial: 'Erithacus rubecula',
              question: 'Robin',
              answer: 'Robin'
            }
          ],
          success: true,
          mode: 'learn',
          totalPassPoints: 4,
          totalPoints: 4,
          itemId: 1051567,
          items: {
            '0': {},
            '1': {},
            '2': {},
            '3': {},
            '4': {},
            '5': {}
          },
          taxon: 'name',
          questionCount: 4,
          layoutCount: 5,
          points: 1,
          colour: 'snap-success',
          passesTotals: {
            '1049693': 1,
            '1051079': 1,
            '1051567': 1,
            '1051974': 1
          },
          failsTotals: 0,
          totalFailPoints: 0,
          questionTotal: 4
        }
      ],
      correct: 8,
      total: 8,
      incorrect: 0
    },
    page: {
      name: '',
      glossary: true
    },
    ui: {
      sharedItems: [
        'Sturnus vulgaris',
        'Erithacus rubecula',
        'Columba palumbus',
        'Passer domesticus'
      ]
    },
    enums: {
      name: {
        CAP_SHAPE: 'cap shape',
        CAP_COLOUR: 'cap colour',
        ECO_TYPE: 'ecological type',
        HOW_EDIBLE: 'how edible',
        HYMEMIUM_TYPE: 'hymenium type',
        SPORE_PRINT_COLOUR: 'spore print colour',
        STIPE_CHARACTER: 'stipe character',
        GILL_ATTACHMENT: 'gill attachment',
        FLESH: 'flesh',
        LOOK_ALIKES: 'look-alikes',
        ECOLOGY: 'ecology',
        SYMBIONTS: 'symbionts',
        SMELL: 'smell',
        VITAMINS: 'vitamins',
        GROUPING: 'grouping',
        STIPE_COLOUR: 'stipe colour',
        GILL_COLOUR: 'gill colour'
      },
      habitats: {
        WOOD: 'Wood',
        WOODLAND: 'Woodland',
        WOODLAND_LITTER: 'Woodland litter',
        GRASSLAND: 'Grassland',
        SOIL: 'Soil',
        VEGETATION: 'Vegetation',
        ROOTS: 'Roots',
        DUNG: 'Dung',
        DUNES: 'Dunes',
        WIDESPREAD: 'Widespread',
        DEAD_WOOD: 'Dead wood',
        WASTELAND: 'Wasteland',
        MEADOW: 'Meadow',
        FIELDS: 'Fields',
        MOSS: 'Moss',
        PASTURE: 'Pasture',
        COMMONS: 'Common',
        HEATH: 'Heath',
        ORCHARDS: 'Orchards',
        HEDGEROWS: 'Hedgerows',
        LAWNS: 'Lawns',
        RINGS: 'Rings',
        DAMP: 'Damp',
        TREE_BASE: 'Tree base',
        FOREST_EDGE: 'Forest edge',
        PARKS: 'Parks',
        TRUNKS: 'Trunks',
        STUMPS: 'Stumps'
      },
      treeTypes: {
        OAK: 'Oak',
        BEECH: 'Beech',
        BIRCH: 'Birch',
        DECIDUOUS: 'Deciduous',
        MIXED_WOODLAND: 'Mixed woodland',
        CONIFERS: 'Conifers',
        PINE: 'Pine',
        ELM: 'Elm',
        ASH: 'Ash',
        SYCAMORE: 'Sycamore',
        ASPEN: 'Aspen',
        ELDER: 'Elder',
        CHESTNUT: 'Chestnut',
        HARDWOODS: 'Hardwoods',
        PRUNUS: 'Prunus',
        PYRUS: 'Pyrus',
        SALIX: 'Salix',
        ROBINIA: 'Robinia',
        CERATONIA: 'Ceratonia',
        EUCALYPTUS: 'Eucalyptus',
        BROAD_LEAF: 'Broad-leaf',
        SWEET_CHESTNUT: 'Sweet chestnut',
        POPLAR: 'Poplar',
        CORK: 'Cork',
        FIR: 'Fir',
        SPRUCE: 'Spruce',
        PLANE: 'Plane',
        WILLOW: 'Willow',
        MAPLE: 'Maple',
        LARCH: 'Larch',
        CEDAR: 'Cedar',
        YEW: 'Yew',
        TURKEY_OAK: 'Turkey oak'
      },
      howEdible: {
        CHOICE: 'Choice',
        EDIBLE: 'Edible',
        INEDIBLE: 'Inedible',
        POISONOUS: 'Poisonous',
        DEADLY: 'Deadly'
      },
      ecoType: {
        SAPROTROPHIC: 'Saprotrophic',
        PARASITIC: 'Parasitic',
        MYCORRHIZAL: 'Mycorrhizal'
      },
      capShape: {
        CONVEX: 'Convex',
        CONICAL: 'Conical',
        FLAT: 'Flat',
        POTATO_SHAPED: 'Potato shaped',
        NA: 'N/A',
        SPHERICAL: 'Spherical',
        PEAR_SHAPED: 'Pear shaped',
        OFFSET: 'Offset',
        INFUNDIBULIFORM: 'Infundibuliform',
        BRAIN_LIKE: 'Brain-like',
        DEPRESSED: 'Depressed',
        UMBONATE: 'Umbonate',
        OVATE: 'Ovate',
        HONEYCOMB: 'Honeycomb',
        HEMI_SPHERICAL: 'Hemispherical'
      },
      hymeniumType: {
        GILLS: 'Gills',
        PORES: 'Pores',
        GLEBA: 'Gleba',
        SMOOTH: 'Smooth',
        TEETH: 'Teeth',
        RIDGES: 'Ridges'
      }
    },
    _persist: {
      version: -1,
      rehydrated: true
    }
  };