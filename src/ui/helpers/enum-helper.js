import { Enum } from 'enumify';

class lessonState extends Enum {};
lessonState.initEnum([
    'CREATE_LESSON',
    'BEGIN_LESSON',
    'BEGIN_OR_RESUME_LESSON',
    'PAUSE_LESSON', 
    'RESUME_LESSON',
    'NEXT_ROUND',
    'BEGIN_INTRO',
    'REVIEW_SUMMARY'
]);

class navigation extends Enum {};
navigation.initEnum([
    'LANDSCAPE_HOME', 
    'SETTINGS', 
    'PORTRAIT_HOME',
    'GLOSSARY', 
    'EMAIL',
    'INFO',
    'LOGIN'
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

class guideOption extends Enum {};
guideOption.initEnum([
    'LOCATION',
    'INAT',
    'PICKER'
]);

class nextStep extends Enum {};
nextStep.initEnum([
    'NEXT_ITEM',
    'NEXT_LAYOUT',
    'NEXT_LESSON',
    'NEXT_ROUND',
]);

class quickFireType extends Enum {};
quickFireType.initEnum([
    'DEFINITION',
    'REVERSE_DEFINITION',
    'TEXT_ENTRY'
]);

class quickFireStep extends Enum {};
quickFireStep.initEnum([
    'GLOSSARY',
    'FILTERS',
    'QUESTIONS'
]);

export const enums = {
    lessonState,
    navigation,
    taxon,
    guideOption,
    nextStep,
    quickFireType,
    quickFireStep
};