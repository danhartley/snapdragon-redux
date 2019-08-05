import * as R from 'ramda';

import { store } from 'redux/store';
import { firebaseConfig } from 'api/firebase/credentials';

firebase.initializeApp(firebaseConfig);

const storage = firebase.storage();

const db = firebase.firestore();

const getCollection = () => {
    return store.getState().collection;
};

const getSpeciesFromCollection = itemName => {
    const collection = getCollection();
    if(!collection || !collection.items) return null;
    return collection.items.find(i => i.name === itemName);
};

const getSpeciesWhere = async props => {

    try {
        const { key, operator, value, limit } = props;

        let speciesRef = limit
                        ? db.collection(`species`).where(key, operator, value).limit(limit)
                        : db.collection(`species`).where(key, operator, value);

        const querySnapshot = await speciesRef.get();

        const docs = [];

        querySnapshot.forEach(doc => {
            docs.push(doc.data());
        });

        return await docs;

    } catch(error) {
        console.error('error for ', props.value, ', error: ', error);
    }
};
  
const getSpecies = async props => {
    const item = await getSpeciesWhere(props);
    return item;
};

const getSpeciesNames = async () => {

    try {
        const speciesPropertiesRef = db.collection(`species`).where("collection_property", "==", 'names');

        const querySnapshot = await speciesPropertiesRef.get();
        
        const docs = [];
    
        querySnapshot.forEach(doc => {
        docs.push(doc.data());
        });
    
        return await docs;
    } catch(error) {
        console.error('error for species names', ', error: ', error);
    }
};

const getSpeciesByIconicTaxon = async (taxon, isLichen, limit = 6) => {

    let matches = await getSpeciesWhere({ key:'iconicTaxon', operator:'==', value: taxon.value.toLowerCase(), limit });

    if(taxon.value.toLowerCase() === 'fungi') {
        matches = isLichen ? matches.filter(match => match.lichen) : matches.filter(match => !match.lichen);
    } 
    return matches;
};

const getSpeciesByName = async itemName => {

    if(!itemName) return '';

    const item = getSpeciesFromCollection(itemName);
    
    if(item) return new Promise(resolve => resolve(item));
    
    const items = await getSpecies({ key:'name', operator:'==', value:itemName });
    
    return items[0];
};

const getTaxaWhere = async props => {

    const { language, key, operator, value, limit } = props;
  
    const taxaRef = limit
                        ? db.collection(`taxa_en`).where(key, operator, value).limit(limit)
                        : db.collection(`taxa_en`).where(key, operator, value);
  
    const querySnapshot = await taxaRef.get();
  
    const docs = [];
  
    querySnapshot.forEach(doc => {
      docs.push(doc.data());
    });
  
    return await docs;
};
  
const getFamiliesByIconicTaxon = async (iconicTaxonRank, iconicTaxonValue, isLichen, config) => {
    return await getTaxaWhere({ language: config.language, key: 'iconicTaxon', operator: '==', value: iconicTaxonValue, limit: 7 });
};

const getItemTaxonByName = async (config, name) => {

    try {
                
        let taxon = {};

        const taxaRef = db.collection(`taxa_en`).where('name', '==', name);

        const querySnapshot = await taxaRef.get();
        
        if(querySnapshot.docs.length > 0) {
            querySnapshot.forEach(doc => {
                taxon = doc.data();
          });
        }

        return taxon;

    } catch (error) {
        console.error('error for: ', name, error);
    }
};

const getAsyncTraitsBySpeciesName = async (name, language) => {

    try {
    
    const languageTraits = db.collection(`traits_en`).where("name", "==", name);
  
    const traits = await languageTraits.get();
  
    return await traits;
    
    } catch(error) {
        console.error('error for ', name, ', error: ', error);
    }
};

const getTraitsBySpeciesName = async (name, language = 'en') => {

    let traits;

    const querySnapshot = await getAsyncTraitsBySpeciesName(name, language);

    if(!querySnapshot || !querySnapshot.docs) return new Promise(resolve => resolve({}));

    if(querySnapshot.docs.length > 0) {
        querySnapshot.forEach(doc => {
        traits = doc.data();
      });
    }

    return await traits;
};

const getBirdsong = async xcID => {

    const storageRef = storage.ref();
    const url = await storageRef.child(`birdsong/${xcID}.mp3`).getDownloadURL();
    return url;
};

const addSpecies = async species => {

    let docRef;

    if(species.images) {
        species.images = species.images.map(image => {
            return {
                license: image.license || '',
                photographer: image.photographer || '',
                rightsHolder: image.rightsHolder || '',
                source: image.source || '',
                title: image.title || '',
                url: image.url || ''
            }
        });
    }

    console.log(species.images);

    try {
        docRef = await db.collection('species').add(species);
    } catch(err) {
        console.error("Error writing document: ", err);
    }

    return docRef;
};

const getTraitValues = async () => {

    const enums = {
        name: {
        CAP_SHAPE: 'cap shape',
        CAP_COLOUR: 'cap colour',
        CAP_SIZE: 'cap size',
        ECO_TYPE: 'ecological type',
        HOW_EDIBLE: 'how edible',
        HYMENIUM_TYPE: 'hymenium type',
        SPORE_PRINT_COLOUR: 'spore print colour',
        STIPE_CHARACTER: 'stipe character',
        STIPE_LENGTH: 'stipe length',
        STIPE_WIDTH: 'stipe width',
        GILL_ATTACHMENT: 'gill attachment',
        FLESH: 'flesh',
        STIPE_COLOUR: 'stipe colour',
        GILL_COLOUR: 'gill colour',
        SUBSTRATE: 'substrate',
        THALLUS_TYPE: 'thallus type',
        RHIZINE_TYPE: 'rhizine type',
        DISC_WIDTH: 'Width',
        LOBE_WIDTH: 'Lobe width',
        LOBE_LENGTH: 'Lobe length',
        LOBE_DIAMETER: 'Lobe diameter',
        ROLE: 'Role',
        NATIVE: 'Native',
        SYMBIOSIS: 'Symbiosis',
        ASSOCIATE: 'associate',
        SYMBIONTS: 'symbionts',
        LOOK_ALIKES: 'look-alikes',
        ECOLOGY: 'ecology',
        HABITAT: 'habitat',
        TROPHIC_LEVEL: 'Trophic level',
        ORGANISATION: 'Organisation',
        SMELL: 'smell',
        FRUIT_TYPE: 'Fruit',
        SEED_COUNT: 'Seed count',
        PH_TOLERANCE: 'pH tolerance',
        VITAMINS: 'vitamins',
        GROUPING: 'grouping',
        POLLUTION_TOLERANCE: 'pollution tolerance',
        HEAVY_METAL_TOLERANCE: 'heavy metal tolerance',
        MEDICINAL_PROPERTIES: 'Medicinal properties',
        ACID_RAIN: 'Acid rain tolerance',
        COLOUR: 'Colour',
        USAGE: 'Usage',
        FORM: 'Form',
        LIFE_SPAN: 'Life span',
        ACTIVE: 'Active',
        SUBSTRATE_ADHERANCE: 'Substrate adherance',
        RANK: 'UK Rank',
        SIZE: 'Size',
        LENGTH: 'Length',
        VOICE: 'Voice',
        HEIGHT: 'Height',
        WEIGHT: 'Weight',
        COMPOUND: 'Leaf type',
        REPRODUCTION: 'Reproduction',
        ASEXUAL_REPRODUCTION: 'Asexual reproduction',
        DISPLAY: 'Display',
        BEHAVIOUR: 'behaviour',
        CHARACTERISTIC: 'Characteristic',
        COMMUNICATION: 'Communication',
        SHELTER: 'Shelter',
        DISEASE: 'Disease',
        THREAT: 'Threat',
        FOOD: 'Food',
        SEXUAL_DIMORPHISM: 'Sexual dimorphism',
        WING_SPAN: 'Wing span',
        BLADE: 'Blade',
        LEAF_VARIATION: 'Leaf variation',
        LEAF_SHAPE: 'Leaf shape',
        STEM_ARRANGEMENT: 'Stem arrangement',
        LEAF_EDGE: 'Leaf edge',
        INFLORESCENCE: 'Inflorescence',
        FEMALE_CONE_LENGTH: 'Female cone length',
        MALE_CONE_LENGTH: 'Male cone length',
        ALLOCHORY: 'Allochory',
        REPRODUCTIVE_CONTAINER: 'Reproductive container',
        CATERPILLAR_FOOD: 'Caterpillar food',
        CATERPILLAR_LENGTH: 'Caterpillar length',
        CATERPILLAR_COLOUR: 'Caterpillar colour',
        HIBERNATING_STAGE: 'Hibernating stage',
        PHYSIOLOGY: 'Physiology',
        MATING: 'Mating season',
        MATING_SYSTEM: 'mating system',
        PREGNANCY: 'Pregnancy',
        LITTER_SIZE: 'Litter size',
        YOUNG: 'Young',
        GESTATION: 'Gestation',
        WEANING: 'Weaning',
        LACTATION: 'Lactation',
        SENSORY_ACUITY: 'Sensory acuity',
        CRYPSIS: 'Crypsis',
        CACHE_SIZE: 'Number of caches',
        COLLECTIVE: 'Collective',
        FEMALE: 'Female',
        MALE: 'Male',
        TAIL_LENGTH: 'Tail length',
        MAX_SPEED: 'Maximum speed',
        DIET: 'Diet',
        ALTRICIAL: 'Altricial',
        MOULTING: 'Moulting',
        MATURITY: 'Maturity',
        MARGIN_TYPE: 'Margin type',
        SOIL_TYPE: 'Soil type',
        PH: 'pH',
        LICEN_CUP_COLOUR: 'Licen cup colour',
        RIM: 'Rim',
        CENTRE: 'Centre',
        POLLINATION: 'Pollination',
        PROPAGATION: 'Propagation',
        CLIMATE: 'Climate',
        SONG: 'Song',
        type: 'name',
        name: 'name'
        },
        howEdible: {
        help: 'How edible is this species?',
        CHOICE: 'Choice',
        EDIBLE: 'Edible',
        INEDIBLE: 'Inedible',
        POISONOUS: 'Poisonous',
        DEADLY: 'Deadly',
        TOXIC: 'Toxic',
        type: 'howEdible',
        name: 'how edible'
        },
        habitat: {
        help: 'What is the habitat of this species?',
        WOOD: 'Wood',
        WOODLAND: 'Woodland',
        WOODLAND_LITTER: 'Woodland litter',
        GRASSLAND: 'Grassland',
        SOIL: 'Soil',
        VEGETATION: 'Vegetation',
        DUNG: 'Dung',
        DUNES: 'Dunes',
        WIDESPREAD: 'Widespread',
        DEAD_WOOD: 'Dead wood',
        WASTELAND: 'Wasteland',
        MEADOW: 'Meadow',
        FIELDS: 'Fields',
        MOSS: 'Moss',
        PASTURE: 'Pasture',
        BARK: 'Bark',
        SHOOTS: 'Shoots',
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
        STUMPS: 'Stumps',
        ROCKS: 'Rocks',
        FENCES: 'Fences',
        TREES: 'Trees',
        SHRUBS: 'Shrubs',
        SHRUBLAND: 'Shrubland',
        MARSHLAND: 'Marshland',
        EXPOSED_WOOD: 'Exposed wood',
        BRANCHES: 'Branches',
        HILLS: 'Hills',
        URBAN: 'Urban',
        VALLEYS: 'Valleys',
        MAQUIS: 'Maquis',
        SAVANNA: 'Savanna',
        FOREST_STEPPE: 'Forest steppe',
        MEADOW_STEPPE: 'meadow steppe',
        BOREAL: 'Boreal',
        SCRUB: 'Scrub',
        WALLS: 'Walls',
        MOORLAND: 'Moorland',
        COAST: 'Coast',
        BRUSH: 'Brush',
        WATER: 'Water',
        SNOW: 'Snow',
        NO_SNOW: 'No snow',
        CONIFERS: 'conifers',
        BROAD_LEAF: 'broad-leaf',
        PINE: 'pine',
        BEECH: 'beech',
        OAK: 'oak',
        type: 'habitat',
        name: 'habitat'
        },
        ecoType: {
        help: 'What is the ecological type of this mushroom?',
        SAPROTROPHIC: 'Saprotrophic',
        PARASITIC: 'Parasitic',
        MYCORRHIZAL: 'Mycorrhizal',
        type: 'ecoType',
        name: 'eco type'
        },
        capShape: {
        help: 'How would you describe the pileus?',
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
        HEMI_SPHERICAL: 'Hemispherical',
        type: 'capShape',
        name: 'cap shape'
        },
        treeType: {
        OAK: 'Quercus',
        BEECH: 'Fagus',
        BIRCH: 'Betula',
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
        TURKEY_OAK: 'Turkey oak',
        HAWTHORN: 'Hawthorn',
        BUSH: 'Bush',
        SHRUB: 'Shrub',
        type: 'treeType',
        name: 'tree type'
        },
        hymeniumType: {
        help: 'What is the hymenium type?',
        GILLS: 'Gills',
        PORES: 'Pores',
        GLEBA: 'Gleba',
        SMOOTH: 'Smooth',
        TEETH: 'Teeth',
        RIDGES: 'Ridges',
        type: 'hymeniumType',
        name: 'hymenium type'
        },
        associate: {
        ALGA: 'Alga',
        CYNOBACTERIUM: 'Cyanobacterium',
        FUNGUS: 'Fungus',
        type: 'associate',
        name: 'associate'
        },
        thallusType: {
        help: 'What is this lichen\'s thallus type?',
        FOLIOSE: 'Foliose',
        FRUTICOSE: 'Fruticose',
        CRUSTOSE: 'Crustose',
        SQUAMULOSE: 'Squamulose',
        LEPROSE: 'Leprose',
        EPIPHYTE: 'Epiphyte',
        type: 'thallusType',
        name: 'thallus type'
        },
        rhizineType: {
        SPARSE: 'Sparse',
        HAPTER: 'Hapter',
        type: 'rhizineType',
        name: 'rhizine type'
        },
        substrate: {
        WOOD: 'Wood',
        BARK: 'Bark',
        ROCKS: 'Rocks',
        SOIL: 'Soil',
        type: 'substrate',
        name: 'substrate'
        },
        level: {
        HIGH: 'High',
        MEDIUM: 'Medium',
        LOW: 'Low',
        VARIABLE: 'Variable',
        type: 'level',
        name: 'level'
        },
        medicinalProperties: {
        ANTIVIRAL: 'Antiviral',
        ANTISEPTIC: 'Antiseptic',
        ANTI_INFLAMMATORY: 'Anti-inflammatory',
        ANTIBIOTIC: 'Antibiotic',
        ANLAGESIC: 'Analgesic',
        ANTIBACTERIAL: 'Antibacterial',
        ANTICOAGULANT: 'Anticoagulant',
        ANTIFUNGAL: 'Antifungal',
        type: 'medicinalProperties',
        name: 'medicinal properties'
        },
        pHLevel: {
        ACIDIC: 'Acidic',
        ALKALINE: 'Alkaline',
        NEUTRAL: 'Neutral',
        type: 'pHLevel',
        name: 'p h level'
        },
        colour: {
        help: 'Which colour best describes this species?',
        WHITE: 'White',
        YELLOW: 'Yellow',
        GREEN: 'Green',
        WHITE_GREEN: 'White-green',
        BRIGHT_GREEN: 'Bright green',
        OLIVE_GREEN: 'Olive-green',
        BRIGHT_YELLOW_GREEN: 'Bright yellow-green',
        YELLOW_GREEN: 'Yellow-green',
        DARK_YELLOW: 'Dark yellow',
        ORANGE_RED: 'Orange red',
        GREY: 'Grey',
        PALE_GREY: 'Pale grey',
        GREY_GREEN: 'Grey-green',
        BROWN: 'Brown',
        PAPER_BROWN: 'Paper brown',
        BLACK: 'Black',
        PALE_GREEN: 'Pale green',
        PALE_YELLOW_GREEN: 'Pale yellow-green',
        PALE_GREY_GREEN: 'Pale yellow-green',
        GLAUCOUS: 'Glaucous',
        GREY_YELLOW: 'Grey-yellow',
        CREAM: 'Cream',
        CHALKY: 'Chalky',
        type: 'colour',
        name: 'colour'
        },
        usage: {
        help: 'To what use do humans put this species?',
        PERFUMERY: 'Perfumery',
        TANNING: 'Tanning',
        DYING: 'Dying',
        BREWING: 'Brewing',
        FOOD: 'Food',
        WINE: 'Wine',
        COFFEE: 'Coffee',
        TEA: 'Tea',
        BIRDS_NEST: 'Bird\'s nest',
        POISON: 'Poison',
        FODDER: 'Fodder',
        GREEN_MANURE: 'Green manure',
        MEDICINE: 'Medicine',
        FUR: 'Fur',
        TIMBER: 'Timber',
        PEST_CONTROL: 'Pest control',
        HERB: 'Herb',
        SPICE: 'Spice',
        ESSENTIAL_OIL: 'Essential oil',
        type: 'usage',
        name: 'usage'
        },
        nonTaxaType: {
        FORM: 'Form',
        type: 'nonTaxaType',
        name: 'non taxa type'
        },
        element: {
        NITROGEN: 'Nitrogen',
        SULPUR_DIOXIDE: 'Sulpur dioxide',
        type: 'element',
        name: 'element'
        },
        blade: {
        SIMPLE: 'Simple ',
        COMPOUND: 'Compound',
        type: 'blade',
        name: 'blade'
        },
        leafType: {
        PALMATE: 'Palmate',
        PINNATE: 'Pinnate',
        ODD_PINNATE: 'Odd pinnate',
        EVEN_PINNATE: 'Even pinnate',
        BIPINNATE: 'Bipinnate',
        TRIFOLIATE: 'Trifoliate',
        PINNATIFID: 'Pinnatifid',
        type: 'leafType',
        name: 'leaf type'
        },
        leafVariation: {
        HOMOBLASTIC: 'Homoblastic',
        HETEROBLASTIC: 'Heteroblastic',
        type: 'leafVariation',
        name: 'leaf variation'
        },
        leafShape: {
        LINEAR: 'Linear',
        OVATE: 'Ovate',
        OBLANCEOLATE: 'Oblanceolate',
        OBOVATE: 'Obovate',
        type: 'leafShape',
        name: 'leaf shape'
        },
        reproduction: {
        SELF_POLLINATION: 'Self-pollination',
        CROSS_POLLINATION: 'Cross-pollination',
        type: 'reproduction',
        name: 'reproduction'
        },
        asexualReproduction: {
        BUDDING: 'budding',
        FRAGMENTATION: 'fragmentation',
        FISSION: 'fission',
        SPORE_FORMATION: 'spore formation',
        VEGETATIVE_PROPAGATION: 'vegetative propagation',
        type: 'asexualReproduction',
        name: 'asexual reproduction'
        },
        stemArrangement: {
        ALTERNATE: 'Alternate',
        BASAL: 'Basal',
        CAULINE: 'Rosulate',
        OPPOSITE: 'Opposite',
        WHORLED: 'Whorled',
        ROWS: 'Rows',
        type: 'stemArrangement',
        name: 'stem arrangement'
        },
        leafEdge: {
        DENTATE: 'Dentate',
        SMOOTH: 'Smooth',
        type: 'leafEdge',
        name: 'leaf edge'
        },
        food: {
        GRASS: 'Grass',
        ROTTEN_FRUIT: 'Rotten fruit',
        NECTAR: 'Nectar',
        HONEYDEW: 'Honeydew',
        SEEDS: 'Seeds',
        NUTS: 'Nuts',
        GRAINS: 'Grains',
        BERRIES: 'Berries',
        HERBAGE: 'Herbage',
        SWARD: 'Sward',
        LEAVES: 'Leaves',
        WOOD: 'Wood',
        ROOTS: 'Roots',
        TUBERS: 'Tubers',
        RHIZOMES: 'Rhizomes',
        BULBS: 'Bulbs',
        BARK: 'Bark',
        SHOOTS: 'Shoots',
        type: 'food',
        name: 'food'
        },
        hibernatingStage: {
        ADULT: 'Adult',
        CATERPILLAR: 'Caterpillar',
        PUPA: 'Pupa',
        type: 'hibernatingStage',
        name: 'hibernating stage'
        },
        symbiosis: {
        MUTUALISM: 'Mutualism',
        COMMENSALISM: 'Commensalism',
        PREDATION: 'Predation',
        PARASITISM: 'Parasitism',
        HERBIVORY: 'Herbivory',
        COMPETITION: 'Competition',
        MYCORRHIZAL: 'Mycorrhizal',
        COMPANION: 'Companion planting',
        type: 'symbiosis',
        name: 'symbiosis'
        },
        trophicLevel: {
        help: 'What is the trophic level or this species?',
        PRIMARY_PRODUCER: 'Primary producer',
        PRIMARY_CONSUMER: 'Primary consumer',
        SECONDARY_CONSUMER: 'Secondary consumer',
        OMNIVORE: 'Omnivore',
        TERTIARY_CONSUMER: 'Tertiary consumer',
        APEX_PREDATOR: 'Apex predator',
        type: 'trophicLevel',
        name: 'trophic level'
        },
        shelter: {
        help: 'What is the name of this species`s shelter?',
        DREY: 'Drey',
        BURROW: 'Burrow',
        DEN: 'Den',
        WARREN: 'Warren',
        SETT: 'Sett',
        ROOKERY: 'Rookery',
        LODGE: 'Lodge',
        DAM: 'Dam',
        NEST: 'Nest',
        SHELTER: 'Shelter',
        VEGETATION: 'vegetation',
        type: 'shelter',
        name: 'shelter'
        },
        active: {
        help: 'When is this species most active?',
        CREPUSCULAR: 'Crepuscular',
        DIURNAL: 'Diurnal',
        NOCTURNAL: 'Nocturnal',
        MATUTINAL: 'Matutinal',
        VESPERTINE: 'Vespertine',
        type: 'active',
        name: 'active'
        },
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
        month: {
        JANUARY: 'January',
        FEBRUARY: 'February',
        MARCH: 'March',
        APRIL: 'April',
        MAY: 'May',
        JUNE: 'June',
        JULY: 'July',
        AUGUST: 'August',
        SEPTEMBER: 'September',
        OCTOBER: 'October',
        NOVEMBER: 'November',
        DECEMBER: 'December',
        type: 'month',
        name: 'month'
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
        },
        male: {
        help: 'What is the name for a male of this species?',
        BUCK: 'Buck',
        DOG: 'Dog',
        BOAR: 'Boar',
        TOM: 'Tom',
        JACK: 'Jack',
        COCK: 'Cock',
        DRAKE: 'Drake',
        REYNARD: 'Reynard',
        TOD: 'Tod',
        TERCEL: 'Tercel',
        GANDER: 'Gander',
        COB: 'Cob',
        type: 'male',
        name: 'male'
        },
        diet: {
        help: 'How is the diet of this species best described?',
        HERBIVORE: 'Herbivore',
        OMNIVORE: 'Omnivore',
        CARNIVORE: 'Carnivore',
        XYLOPHAGOUS: 'Xylophagous',
        POLYPHAGOUS: 'Polyphagous',
        type: 'diet',
        name: 'diet'
        },
        marginType: {
        LOBED: 'Lobed',
        CORTICATE: 'Corticate',
        type: 'marginType',
        name: 'margin type'
        },
        soilType: {
        SILICEOUS: 'Siliceous',
        CALCAREOUS: 'Calcareous',
        NUTRIENT_POOR: 'Nutrient poor',
        type: 'soilType',
        name: 'soil type'
        },
        organisation: {
        help: 'How is this species organised?',
        EUSOCIAL: 'Eusocial',
        SOCIAL: 'Social',
        SOLITARY: 'Solitary',
        MATRIARCHY: 'Matriarchy',
        type: 'organisation',
        name: 'organisation'
        },
        role: {
        NATIVE: 'Native',
        NONNATIVE: 'Nonnative',
        INDICATOR: 'Indicator',
        KEYSTONE: 'Keystone',
        FOUNDATION: 'Foundation',
        SPECIALIST: 'Specialist',
        GENERALIST: 'Generalist',
        PIONEER: 'Pioneer',
        INVASIVE: 'Invasive',
        POLLINATOR: 'Pollinator',
        PREDATOR: 'Predator',
        HERBIVORE: 'Herbivore',
        OMNIVORE: 'Omnivore',
        CARNIVORE: 'Carnivore',
        MUCIVORE: 'Mucivore',
        PREY: 'Prey',
        COMPETITOR: 'Competitor',
        HOST: 'Host',
        CARRIER: 'Carrier',
        RUDERAL: 'Ruderal',
        SUPERTRAMP: 'Supertramp',
        SYMBIONT: 'Symbiont',
        OCCUPANT: 'Lives in',
        type: 'role',
        name: 'role'
        },
        fruitType: {
        help: 'What fruit type does this plant have?',
        DRUPE: 'Drupe',
        POME: 'Pome',
        BERRY: 'Berry',
        AGGREGATE_FRUIT: 'Aggregate fruit',
        LEGUME: 'Legume',
        CAPSULE: 'Capsule',
        NUT: 'Nut',
        GRAIN: 'Grain',
        MULTIPLE_FRUIT: 'Multiple fruit',
        type: 'fruitType',
        name: 'fruit type'
        },
        inflorescence: {
        help: 'What type of inflorescence does this plant have?',
        CATKIN: 'catkin',
        UMBEL: 'umbel',
        SPIKE: 'spike',
        RACEME: 'raceme',
        CORYMB: 'corymb',
        type: 'inflorescence',
        name: 'inflorescence'
        },
        display: {
        help: 'Which form of display does this species exhibit?',
        DIEMATIC: 'Diematic',
        SEXUAL_COLOUR_DIMORPHISM: 'Sexual colour dimorphism',
        NO_SEXUAL_COLOUR_DIMORPHISM: 'No sexual colour dimorphism',
        SEXUAL_DIMORPHISM: 'Sexual dimorphism',
        NO_SEXUAL_DIMORPHISM: 'No sexual dimorphism',
        MELANISTIC: 'Melanistic',
        type: 'display',
        name: 'display'
        },
        behaviour: {
        help: 'This species exhibits which form of behaviour?',
        SEXUAL_CANNIBALISM: 'Sexual cannibalism',
        MONANDROUS: 'Monandrous',
        VOCALISATION: 'Vocalisation',
        CRYPSIS: 'Crypsis',
        HOARDING: 'Hoarding',
        HIBERNATION: 'Hibernation',
        GAME_PLAYING: 'Game playing',
        PLAYFUL: 'Playful',
        TERRITORIAL: 'Territorial',
        NON_TERRITORIAL: 'Non territorial',
        BIPARENTAL: 'Biparental',
        COOPERATIVE_BREEDING: 'Cooperative breeding',
        TOOL_MAKING: 'Tool making',
        PROBLEM_SOLVING: 'Problem solving',
        DIVISION_OF_LABOUR: 'Division of labour',
        SUPERORGANISM: 'Superorganism',
        ANAUTOGENY: 'Anautogeny',
        MASS_PROVISIONING: 'Mass provisioning',
        PRECOCIAL: 'Precocial',
        ALTRICIAL: 'Altricial',
        AUTOTOMIC: 'Autotomic',
        ECTOTHERMIC: 'Ectothermic',
        ADHESION: 'Adhesion',
        POLYPHYODONT: 'Polyphyodont',
        VIVIPAROUS: 'Viviparous',
        REGURGITATION: 'Feeding through regurgitation',
        MULTIVOLTINE: 'Multivoltine',
        BIVOLTINE: 'Bivoltine',
        UNIVOLTINE: 'Univoltine',
        SEMIVOLTINE: 'Semivoltine',
        METAMORPHOSIS: 'Metamorphosis',
        RUTTING: 'Rutting',
        WHELPING: 'Whelping',
        FARROWING: 'Farrowing',
        SWIMMING: 'Swimming',
        DECUMBENT: 'Decumbent',
        ETHYLENE_RIPENING: 'Ethylene ripening',
        MIGRATORY: 'Migratory',
        type: 'behaviour',
        name: 'behaviour'
        },
        sense: {
        help: 'Which sense does this species favour?',
        SIGHT: 'Sight',
        MOVEMENT: 'Movement',
        SMELL: 'Smell',
        SPATIAL: 'Spatial',
        MEMORY: 'Memory',
        ECHOLOCATION: 'Echolocation',
        type: 'sense',
        name: 'sense'
        },
        crypsis: {
        CAMOUFLAGE: 'Camouflage',
        NOCTURNALITY: 'Nocturnality',
        SUBTERRANEAN: 'Subterranean',
        MIMICRY: 'Mimicry',
        VISUAL: 'Visual',
        OLFACTORY: 'Olfactory',
        AUDITORY: 'Auditory',
        type: 'crypsis',
        name: 'crypsis'
        },
        allochory: {
        ANEMOCHORY: 'Anemochory',
        HYDROCHORY: 'Hydrochory',
        ZOOCHORY: 'Zoochory',
        ANTHROPOCHORY: 'Anthropochory',
        type: 'allochory',
        name: 'allochory'
        },
        reproductiveContainer: {
        CONE: 'Cone',
        type: 'reproductiveContainer',
        name: 'reproductive container'
        },
        communication: {
        VOCALISATION: 'Vocalisation',
        POSTURING: 'Posturing',
        type: 'communication',
        name: 'communication'
        },
        matingSystem: {
        POLYGYNOUS: 'Polygynous',
        MONOGAMOUS: 'Monogamous',
        type: 'matingSystem',
        name: 'mating system'
        },
        physiology: {
        C3_CARBON_FIXATION: 'C3 carbon fixation',
        NITROGEN_FIXING: 'Nitrogen fixing',
        MYCORRHIZAL: 'Mycorrhizal',
        DORMANCY: 'Dormancy',
        EVERGREEN: 'Evergreen',
        DECIDUOUS: 'Deciduous',
        type: 'physiology',
        name: 'physiology'
        },
        collective: {
        help: 'What is the term for a collective of this species?',
        SOUNDER: 'Sounder',
        SLOTH: 'Sloth',
        MURMURATION: 'Murmuration',
        PACK: 'Pack',
        type: 'collective',
        name: 'collective'
        },
        ecology: {
        DIGGING: 'Digging',
        SCRAPING: 'Scraping',
        ROOTING: 'Rooting',
        SCAVENGING: 'Scavenging',
        type: 'ecology',
        name: 'ecology'
        },
        characteristic: {
        help: 'Which characteritics does this species display?',
        PERENNIAL: 'Perennial',
        ANNUAL: 'Annual',
        BIENNIAL: 'Biennial',
        HERBACEOUS: 'Herbaceous',
        DIOECIOUS: 'Dioecious',
        DICOTYLEDON: 'Dicot',
        MONOCOTYLEDON: 'Monocot',
        PUBESCENT: 'Pubescent',
        CHAMAEPHYTE: 'Chamaephyte',
        FIBROUS_ROOT_SYSTEM: 'Fibrous root system',
        TAPROOT_SYSTEM: 'Taproot system',
        KIN_SELECTION: 'Kin selection',
        BIOINDICATOR: 'Bioindicator',
        type: 'characteristic',
        name: 'characteristic'
        },
        climate: {
        HOT: 'Hot',
        DRY: 'Dry',
        TEMPERATE: 'Temperate',
        COOL: 'Cool',
        TROPICAL: 'Tropical',
        CONTINENTAL: 'Continental',
        DROUGHT_TOLERANT: 'Drought-tolerant',
        type: 'climate',
        name: 'climate'
        },
        pollination: {
        ALLOGAMY: 'Allogamy',
        ANEMOPHILY: 'Anemophily',
        HYDROPHILY: 'Hydrophily',
        ENTOMOPHILY: 'Entomophily',
        AMBOPHILY: 'Ambophily',
        MELITTOPHILY: 'Melittophily',
        PSYCHOPHILY: 'Psychophily',
        PHALAENOPHILY: 'Phalaenophily',
        SONICATION: 'Sonication',
        type: 'pollination',
        name: 'pollination'
        },
        stipeCharacter: {
        RING: 'Ring',
        RING_AND_VOLVA: 'ring and volva',
        BARE: 'Bare',
        NA: 'N/A',
        NONE: 'None',
        SHORT: 'short',
        STUMPY: 'stumpy',
        CLUB_LIKE: 'Club-like',
        WARTS: 'warts',
        HOLLOW: 'hollow',
        type: 'stipeCharacter',
        name: 'stipe character'
        },
        gillAttachment: {
        FREE: 'Free',
        ADNATE: 'Adnate',
        DECURRENT: 'Decurrent',
        NA: 'N/A',
        NONE: 'None',
        EMARGINATE: 'emarginate',
        SUBDECURRENT: 'subdecurrent',
        type: 'gillAttachment',
        name: 'gill attachment'
        },
        grouping: {
        LARGE_GROUPS: 'large groups',
        CLUSTERS: 'clusters',
        LARGE_CLUSTERS: 'large clusters',
        SCATTERED_CLUSTERS: 'scattered clusters',
        FAIRY_RINGS: 'fairy rings',
        GREGARIOUS: 'gregarious',
        NUMEROUS: 'numerous',
        type: 'grouping',
        name: 'grouping'
        },
        propagation: {
        RHIZOMES: 'rhizomes',
        SEEDS: 'seeds',
        type: 'propagation',
        name: 'propagation'
        }
    }

    return new Promise(resolve => resolve(enums));
};

const deleteSpeciesByName = async name => {

    const speciesRef = db.collection(`species`).where('name', '==', name);

    speciesRef.get().then(function(querySnapshot) {
        querySnapshot.forEach(function(doc) {
        doc.ref.delete();
        });
    });
};

export const firestore = {
    getSpecies,
    getSpeciesNames,
    getSpeciesByName,
    getSpeciesByIconicTaxon,
    getFamiliesByIconicTaxon,
    getItemTaxonByName,
    getTraitsBySpeciesName,
    getBirdsong,
    addSpecies,
    getTraitValues,
    deleteSpeciesByName
};