import { itemProperties } from 'ui/helpers/data-checking';
import { epithets } from 'api/botanical-latin';

const item = {
    "names": [
        {
          "vernacularName": "نعنع (نَعْنَع)، لمام ( لِمام)",
          "language": "ar",
          "eol_preferred": true
        },
        {
          "vernacularName": "حبق المويه(حَبَق المويه)، حبق الميه (حَبَق الميه)",
          "language": "ar"
        },
        {
          "vernacularName": "spearmint",
          "language": "en",
          "eol_preferred": true
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
          "eol_preferred": true
        },
        {
          "vernacularName": "Baume",
          "language": "fr"
        },
        {
          "vernacularName": "Hortelã-verde",
          "language": "pt",
          "eol_preferred": true
        },
        {
          "vernacularName": "欧薄荷",
          "language": "zh",
          "eol_preferred": true
        },
        {
          "vernacularName": "狗肉香菜",
          "language": "zh"
        }
      ]
};

test('should return Menthe à longues feuilles for preferred french name', () => {
    const config = { language: 'fr'};
    const fr = itemProperties.vernacularName(item, config);
    expect(fr).toEqual('Menthe à longues feuilles');
});

test('should return spearmint instead of missing preferred spanish name', () => {
    const config = { language: 'es'};
    const es = itemProperties.vernacularName(item, config);
    expect(es).toEqual('Spearmint');
});


test('should return empty string when no match found for either english default or preferred spanish name', () => {
    const emptyItem = { names: [] };
    const config = { language: 'es'};
    const es = itemProperties.vernacularName(emptyItem, config);
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
  expect(itemProperties.genusName(item.name)).toEqual(expected);
});

test('should return species name', () => {
  const item =  { name: 'Foeniculum vulgare' };
  const expected = 'vulgare';
  expect(itemProperties.speciesName(item.name)).toEqual(expected);
});