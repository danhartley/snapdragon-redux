import { itemProperties } from 'ui/helpers/data-checking';

const item = {
    "names": [
        {
          "vernacularName": "نعنع (نَعْنَع)، لمام ( لِمام)",
          "language": "ar",
          
        },
        {
          "vernacularName": "حبق المويه(حَبَق المويه)، حبق الميه (حَبَق الميه)",
          "language": "ar"
        },
        {
          "vernacularName": "spearmint",
          "language": "en",
          
        },
        {
          "vernacularName": "Curled Mint",
          "language": "en"
        },
        {
          "vernacularName": "wild mint",
          "language": "en"
        },
        {
          "vernacularName": "Menthe à longues feuilles",
          "language": "fr",
          
        },
        {
          "vernacularName": "Baume",
          "language": "fr"
        },
        {
          "vernacularName": "Hortelã-verde",
          "language": "pt",
          
        },
        {
          "vernacularName": "欧薄荷",
          "language": "zh",
          
        },
        {
          "vernacularName": "狗肉香菜",
          "language": "zh"
        }
      ]
};

test('should return Menthe à longues feuilles for preferred french name', () => {
    const config = { language: 'fr'};
    const fr = itemProperties.getVernacularName(item, config);
    expect(fr).toEqual('Menthe à longues feuilles');
});

test('should return spearmint instead of missing preferred spanish name', () => {
    const config = { language: 'es'};
    const es = itemProperties.getVernacularName(item, config);
    expect(es).toEqual('Spearmint');
});


test('should return empty string when no match found for either english default or preferred spanish name', () => {
    const emptyItem = { names: [] };
    const config = { language: 'es'};
    const es = itemProperties.getVernacularName(emptyItem, config);
    expect(es).toEqual('Unknown');
});

test('should return a translation object where this is a matching latin name', () => {
  const species = 'nucifer';
  const expected = {
      "latin" : ["nucifer"],
      "en" : ["bearing nuts"]
  };
  const epithet = itemProperties.latin(species);
  expect(epithet).toEqual(expected);
});

test('should not return a translation object where this is no a matching latin name', () => {
  const species = 'schoenoprasum';
  const epithet = itemProperties.latin(species);
  expect(epithet).toEqual("");
});

test('should trim latin name', () => {
  const name = 'Allium schoenoprasum';
  const trimmedName = itemProperties.trimLatinName(name);
  expect(trimmedName).toEqual("A. schoenoprasum");
});

test('should return genus name', () => {
  const item =  { name: 'Foeniculum vulgare' };
  const expected = 'Foeniculum';
  expect(itemProperties.getGenusName(item.name)).toEqual(expected);
});

test('should return species name', () => {
  const item =  { name: 'Foeniculum vulgare' };
  const expected = 'vulgare';
  expect(itemProperties.getSpeciesName(item.name)).toEqual(expected);
});

test('should return vernacular family names when provided with latin name and language', () => {
  const family = {
      name: 'Malvaceae',
      names: [ { language: "en", names: ['Mallows or Hibiscus']} ,
      { language: "fr", names:[ 'Mauves' ]},
      { language: "de", names:[ 'Malvengewächse' ]},
      { language: "es", names:[ 'Storax family' ]},
      { language: "pt", names:[ 'Storax family' ]},
      { language: "it", names:[ 'Storax family' ]}]
  };
  const taxa = [ family ];
  expect(itemProperties.familyVernacularNames(family.name, 'en', taxa)).toEqual(['Mallows or Hibiscus']);
});

const list = [
  "Fistulina hepatica",
  "Boletus edulis",
  "Pleurotus ostreatus",
  "Auricularia auricula-judae",
  "Calvatia gigantea",
  "Hydnum repandum",
  "Polyporus squamosus",
  "Sarcoscypha coccinea",
  "Sparassis crispa",
  "Lepista personata"
];

test('answersFrom should return a new list matching the number requesting and including the correct answer', () => {
  const answers = ["Fistulina hepatica","Boletus edulis","Pleurotus ostreatus",];
  expect(itemProperties.answersFromList(list, 'Boletus edulis', 3).sort()).toEqual(answers.sort());
});

test('should extract file name from url', () => {
  const url = 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/37/Inflorescences_Panicle_Kwiatostan_Wiecha.svg/800px-Inflorescences_Panicle_Kwiatostan_Wiecha.svg.png';
  const expectedFilename = 'Inflorescences_Panicle_Kwiatostan_Wiecha.svg';
  expect(itemProperties.getFileNameFromImageUrl(url)).toEqual(expectedFilename);
});

test('should return rights url from image url', () => {
  const url = 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/37/Inflorescences_Panicle_Kwiatostan_Wiecha.svg/800px-Inflorescences_Panicle_Kwiatostan_Wiecha.svg.png';
  const expectedUrl = 'https://en.wikipedia.org/w/api.php?action=query&prop=imageinfo&iiprop=extmetadata&titles=File:Inflorescences_Panicle_Kwiatostan_Wiecha.svg&format=json';
  expect(itemProperties.getImageRightsUrl(url)).toEqual(expectedUrl);
});

test('should return common, root trait value for child value', () => {
  let child = 'leafSurfaceAbove';
  let parent = 'leafSurface';
  expect(itemProperties.getRootTraitValue(child)).toEqual(parent);
  child = 'leafColour';
  parent = 'colour';
  expect(itemProperties.getRootTraitValue(child, 'start')).toEqual(parent);
  expect(itemProperties.getRootTraitValue(child)).toEqual(parent);
});