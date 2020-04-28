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
    'REVIEW_SUMMARY',
    'UPDATE_COLLECTION', // required? use set active collection
    'GET_LESSON_PROGRESS',
    'ADD_SPECIES_TO_COLLECTION',
    'SAVE_LESSON_PROGRESS',
    'RENDER_SPECIES_LIST',    
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

class userEvent extends Enum {};
userEvent.initEnum([
    'DEFAULT',
    'START_LESSON',
    'START_LESSON_REVIEW',
    'START_TERM_REVIEW',
    'NAVIGATE_HOME',
    'EDIT_LESSON',
    'TOGGLE_SPECIES_LIST'
]);

export const enums = {
    lessonState,
    navigation,
    taxon,
    guideOption,
    nextStep,
    quickFireType,
    quickFireStep,
    userEvent
};