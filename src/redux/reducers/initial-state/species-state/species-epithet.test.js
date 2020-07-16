import "babel-polyfill";
import { epithets } from 'api/botanical-latin';
import { getSpeciesEpithets, getMatchingEpithets } from 'redux/reducers/initial-state/species-state/species-epithets';

test('should return multiple epithet matches', async () => {

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
            "en" : ["of or belonging to the officina (storeroom for medicines)"],
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

    const latin = await getSpeciesEpithets(epithets, items);

    expect(latin).toEqual(expected);
});

test('index values should match when more than one species has the same epithet in its name', async () => {
  
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

  const latin = await getSpeciesEpithets(epithets, items);

  expect(latin).toEqual(expected);
});

test('should return a translation object where this is a matching latin name', async () => {
  const species = 'nucifer';
  const expected = {
      "latin" : ["nucifer"],
      "en" : ["bearing nuts"]
  };
  const epithet = await getMatchingEpithets(epithets, species);
  expect(epithet).toEqual(expected);
});

test('should not return a translation object where this is no a matching latin name', async () => {
  const species = 'schoenoprasum';
  const epithet = await getMatchingEpithets(epithets, species);
  expect(epithet).toEqual("");
});