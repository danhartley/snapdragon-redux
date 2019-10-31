import { Enum } from 'enumify';

class lessonState extends Enum {};
lessonState.initEnum([
    'CREATE_LESSON', 
    // 'GET_SPECIES', 
    'BEGIN_LESSON',
    'BEGIN_OR_RESUME_LESSON',
    'PAUSE_LESSON', 
    'RESUME_LESSON',
    'NEXT_ROUND',
    'BEGIN_INTRO'
]);

class navigation extends Enum {};
navigation.initEnum([
    'LANDSCAPE_HOME', 
    'SETTINGS', 
    'PORTRAIT_HOME',
    'GLOSSARY', 
    'EMAIL'
]);

class taxon extends Enum {};
taxon.initEnum([
    'KINGDOM',
    'PHYLUM',
    'ORDER',
    'FAMILY',
    'GENUS',
    'SPECIES',
]);

class guideStep extends Enum {};
guideStep.initEnum([
    'LOCATION',
    'SPECIES',
    'INAT',
    'PICKER',
    'SEASON'
]);

export const enums = {
    lessonState,
    navigation,
    taxon,
    guideStep
};