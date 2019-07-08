import * as R from 'ramda';
import { getTrait, getTraitValues } from 'api/traits/species-traits';

const fox = {
    "name": "Vulpes vulpes",
    "active": {
      "value": [
        "nocturnal"
      ]
    },
    "behaviour": {
      "value": [
        "altricial"
      ]
    },
    "characteristic": {
      "type": "commensalism",
      "value": [
        "kin selection"
      ]
    },
    "collective": {
      "value": [
        "pack"
      ]
    },
    "diet": {
      "value": [
        "omnivore"
      ]
    },
    "female": {
      "value": [
        "vixen"
      ]
    },
    "length": {
      "unit": "cm",
      "value": [
        "45",
        "90"
      ]
    },
    "life span": {
      "unit": "yy",
      "value": [
        "5"
      ]
    },
    "litter size": {
      "value": [
        "4",
        "6"
      ]
    },
    "mating season": {
      "unit": "mm",
      "value": [
        "february"
      ]
    },
    "maximum speed": {
      "unit": "km/h",
      "value": [
        "50"
      ]
    },    
    "role": {
      "type": "predation",
      "value": [
        "aquila chrysaetos"
      ]
    },
    "shelter": {
      "value": [
        "burrow",
        " den",
        " vegetation"
      ]
    },
    "tail length": {
      "unit": "cm",
      "value": [
        "30",
        "55"
      ]
    },
    "usage": {
      "type": "predation",
      "value": [
        "fur"
      ]
    },
    "weaning": {
      "unit": "mm",
      "value": [
        "6",
        "7"
      ]
    },
    "young": {
      "value": [
        "kit"
      ]
    }
};

const hedgehog = {
  "name": "Erinaceus europaeus",
  "diet": {
    "value": [
      "omnivore"
    ]
  },
  "length": {
    "unit": "cm",
    "value": [
      "20",
      "26"
    ]
  },
  "role": {
    "type": "predation",
    "value": [
      "meles meles"
    ]
  }
};

const notAllowedTraitsSpecies = {
  'song': { key:'', value:'' },
  'voice': { key:'', value:'' }
};

const traitsToIgnore = [ 'song', 'look-alikes', 'symbionts', 'voice', 'pollination' ];

test('should exclude specified traits', () => {  
  const trait = getTrait(fox, traitsToIgnore);
  expect(!R.contains(trait.key, traitsToIgnore)).toBe(true);
});

test('should return null when there are no allowed traits', () => {  
  const trait = getTrait(notAllowedTraitsSpecies, traitsToIgnore);
  expect(trait).toEqual({"key": undefined, "value": undefined});
});

test('should match trait to pool of answers', () => {
  const trait = {
    key: 'young',
    value: {
      "value": [
        "kit"
      ]
    }
  };
  const traits = {
    young: {
      help: 'What is the name for the young of this species?',
      KIT: 'Kit',
      SQUEAKER: 'Squeaker',
      CUB: 'Cub',
      KITTEN: 'Kitten',
      CHICK: 'Chick',
      PUP: 'Pup',
      CALF: 'Calf',
      DUCKLING: 'Duckling',
      EYAS: 'Eyas',
      MAGGOT: 'Maggot',
      KID: 'Kid',
      GOSLING: 'Gosling',
      LEVERET: 'Leveret',
      NYMPH: 'Nymph',
      CATERPILLAR: 'Caterpillar',
      LARVA: 'Larva',
      SALAMANQUESA: 'Salamanquesa',
      type: 'young',
      name: 'young'
    },
    female: {
      help: 'What is the name for a female of this species?',
      VIXEN: 'Vixen',
      DOE: 'Doe',
      JILL: 'Jill',
      BITCH: 'Bitch',
      SOW: 'Sow',
      HEN: 'Hen',
      DUCK: 'Duck',
      GOOSE: 'Goose',
      PEN: 'Pen',
      type: 'female',
      name: 'female'
    }
  };
  expect(getTraitValues(trait, traits)).toEqual( {"CALF": "Calf", "CATERPILLAR": "Caterpillar", "CHICK": "Chick", "CUB": "Cub", "DUCKLING": "Duckling", "EYAS": "Eyas", "GOSLING": "Gosling", "KID": "Kid", "KIT": "Kit", "KITTEN": "Kitten", "LARVA": "Larva", "LEVERET": "Leveret", "MAGGOT": "Maggot", "NYMPH": "Nymph", "PUP": "Pup", "SALAMANQUESA": "Salamanquesa", "SQUEAKER": "Squeaker", "help": "What is the name for the young of this species?", "name": "young", "type": "young"});
});