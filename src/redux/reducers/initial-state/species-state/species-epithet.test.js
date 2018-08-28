import { getSpeciesEpithets } from 'redux/reducers/initial-state/species-state/species-epithets';

test('should return multiple epithet matches', () => {

    const items = [ { index: 1, name: 'Foeniculum vulgare'}, { index: 2, name: 'Rosmarinus officinalis'}, { index: 3, name: 'No latin epithet'} ];

    const expected = [
      {
        "parts": [
          {
            "en": [
              "hay"
            ],
            "index": 0,
            "latin": [
              "foeniculum"
            ],
            "name": "Foeniculum vulgare"
          },
          {
            "en": [
              "common"
            ],
            "index": 0,
            "latin": [
              "vulgare"
            ],
            "name": "Foeniculum vulgare"
          }
        ],
        "index": 0
      },
      {
        "parts": [
          {
            "en" : ["of or belonging to the officina (storeroom for medicines)."],
            "index": 1,
            "latin": [
              "officinalis"
            ],
            "name": "Rosmarinus officinalis",
            "wiki": "https://en.wikipedia.org/wiki/Officinalis"
          }
        ],
        "index": 1
      }
    ]

    const epithets = getSpeciesEpithets(items);

    expect(epithets).toEqual(expected);
});

test('index values should match when more than one species has the same epithet in its name', () => {
  const items = [ { index: 1, name: 'Allium sativum'}, { index: 2, name: 'Coriandrum sativum'} ];

  const expected = [
    {
      "index": 0,
      "parts": [
        {
          "en": [
            "sown",
            "cultivated"
          ],
          "index": 0,
          "latin": [
            "sativum"
          ],
          "name": "Allium sativum"
        }
      ]
    },
    {
      "index": 1,
      "parts": [
        {
          "en": [
            "sown",
            "cultivated"
          ],
          "index": 1,
          "latin": [
            "sativum"
          ],
          "name": "Coriandrum sativum"
        }
      ]
    }
  ]

  const epithets = getSpeciesEpithets(items);

  expect(epithets).toEqual(expected);
});