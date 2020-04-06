import { quickFireLogic } from 'ui/quick-fire-modal/quick-fire-logic';

const quickFireItems = [
    {
      "branch": "classification",
      "definition": "A plant that completes its life cycle within one year, and then dies.",
      "taxon": "plantae",
      "term": "Annual",
      "wiki": "https://en.wikipedia.org/wiki/Annual_plant",
      "id": "T2EXM9NAKh1K89a3Ye9q"
    },
    {
      "branch": "classification",
      "definition": "A flowering plant that takes two years to complete its biological lifecycle.",
      "taxon": "plantae",
      "term": "Biennial",
      "wiki": "https://en.wikipedia.org/wiki/Biennial_plant",
      "id": "CgDbrVexa0IptAGhz6Kh"
    },
    {
      "branch": "morphology",
      "definition": "An organ on plants in the division Pinophyta (conifers) that contains the reproductive structures.",
      "taxon": "plantae",
      "technical": false,
      "term": "Cone",
      "wiki": "https://en.wikipedia.org/wiki/Conifer_cone",
      "id": "yxV87hZEQV9QL0wgn2ut"
    },
    {
      "branch": "classification",
      "definition": "A division of vascular land plants containing a single extant class, Pinopsida. They are gymnosperms, cone-bearing seed plants.",
      "taxon": "plantae",
      "technical": false,
      "term": "Conifers",
      "wiki": "https://en.wikipedia.org/wiki/Pinophyta",
      "id": "GZDsTCb8DYLbYoovUlqC"
    },
    {
      "branch": "classification",
      "definition": "The term means 'falling off at maturity' or 'tending to fall off', in reference to trees and shrubs that seasonally shed leaves; to the shedding of petals, after flowering; and to the shedding of ripe fruit.",
      "taxon": "plantae",
      "term": "Deciduous",
      "wiki": "https://en.wikipedia.org/wiki/Deciduous",
      "id": "Q1MLN7iSfc1KwPF13fiT"
    },
    {
      "branch": "classification",
      "definition": "Group of flowering plants the seeds of which have two embryonic leaves (cotyledons).",
      "taxon": "plantae",
      "technical": false,
      "term": "Dicotyledon",
      "wiki": "https://en.wikipedia.org/wiki/Dicotyledon",
      "id": "8gDCZW29cUzuKWVc55Wm"
    },
    {
      "branch": "classification",
      "definition": "Non-herbaceous perennials which retain a mantle of leaves throughout the year.",
      "taxon": "plantae",
      "term": "Evergreen",
      "wiki": "https://en.wikipedia.org/wiki/Evergreen",
      "id": "oVGfDTbXZ2TfABj7AEce"
    },
    {
      "branch": "classification",
      "definition": "Plant that has no persistent woody stem above ground.",
      "taxon": "plantae",
      "term": "Herbaceous plant",
      "id": "oAPcc2Dsh9nsf9ye1qP6"
    },
    {
      "branch": "morphology",
      "definition": "A dorsiventrally flattened organ of a vascular plant, the principal lateral appendage of the stem usually borne above ground and specialised for photosynthesis.",
      "taxon": "plantae",
      "technical": false,
      "term": "Leaf",
      "wiki": "https://en.wikipedia.org/wiki/Leaf",
      "id": "cG1jsMkkoqDYdVOXcIFf"
    },
    {
      "branch": "morphology",
      "definition": "A structure at the base of a leaf's petiole that partly surrounds or protect the stem or another organ that it subtends.",
      "taxon": "plantae",
      "term": "Leaf sheath",
      "wiki": "https://en.wiktionary.org/wiki/leaf_sheath",
      "id": "Z2WonTmGqobh2qUysjU3"
    },
    {
      "branch": "classification",
      "definition": "Group of flowering plants the seeds of which typically have one embryonic leaf (cotyledon).",
      "taxon": "plantae",
      "technical": false,
      "term": "Monocotyledon",
      "wiki": "https://en.wikipedia.org/wiki/Monocotyledon",
      "id": "ADZNaidbQyZhokGLXoZp"
    },
    {
      "branch": "classification",
      "definition": "A plant that lives more than two years. Not a tree or shrub.",
      "taxon": "plantae",
      "term": "Perennial",
      "wiki": "https://en.wikipedia.org/wiki/Perennial_plant",
      "id": "qNB8cOmNea8079HMxGJ5"
    },
    {
      "branch": "physiology",
      "definition": "The process of aging in plants, both stress-induced and age-related developmental aging.",
      "taxon": "plantae",
      "technical": false,
      "term": "Plant senescence",
      "wiki": "https://en.wikipedia.org/wiki/Plant_senescence",
      "id": "gNHLtFHnIDMM9NKuCcwO"
    },
    {
      "branch": "morphology",
      "definition": "An embryonic plant enclosed in a protective outer covering.",
      "taxon": "plantae",
      "term": "Seed",
      "wiki": "https://en.wiktionary.org/wiki/Seed",
      "id": "hC2u5z5od0nXZ9vzQERY"
    },
    {
      "branch": "classification",
      "definition": "A small- to medium-sized perennial woody plant with multiple stems and restricted height (less than 6-10m).",
      "taxon": "plantae",
      "technical": false,
      "term": "Shrub",
      "wiki": "https://en.wikipedia.org/wiki/Shrub",
      "id": "34Eblk7Jpw8xUqPPtja2"
    },
    {
      "branch": "classification",
      "definition": "A group of related organisms capable of interbreeding and producing fertile offspring.",
      "taxon": "common",
      "term": "Species",
      "id": "JGw0sjiEcz2txMFvOX6H"
    },
    {
      "branch": "morphology",
      "definition": "The plant axis that bears buds and shoots with leaves and, at its basal end, roots. It conducts water, minerals, and food to other parts of the plant.",
      "taxon": "plantae",
      "term": "Stem",
      "wiki": "https://en.wikipedia.org/wiki/Plant_stem",
      "id": "85eE8sODpBIrJXvXgcpU"
    },
    {
      "branch": "morphology",
      "definition": "The non-leaf, non-nodes bearing parts of the plant's body that typically lie below the surface of the soil.",
      "taxon": "plantae",
      "technical": false,
      "term": "root",
      "wiki": "https://en.wikipedia.org/wiki/Root",
      "id": "pvvMMuJzWrnNCZ5PJ1t9"
    }
  ];

  const quickFire = { };

test('should return required number of answers', () => {
    const items = quickFireItems;    
    const answers = quickFireLogic.selectAnswers(quickFire, items);
    expect(answers.length).toEqual(4);
});

test('should return unique set of terms', () => {
    const items = quickFireItems;    
    const answers = quickFireLogic.selectAnswers(quickFire, items);
    const terms = [ ...new Set(answers.map(answer => answer.term)) ];
    expect(terms.length).toEqual(4);
  });
  
  test('should top up branch answers where number falls short', () => {
    const items = quickFireItems;    
          items.unshift(
            {
              "branch": "physiology",
              "term": "photosynthesis"
            },
          );
    const answers = quickFireLogic.selectAnswers(quickFire, items);
    expect(answers.length).toEqual(4);
});