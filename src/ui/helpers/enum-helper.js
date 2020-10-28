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
    'GET_LESSON_STATE',
    'ADD_SPECIES_TO_COLLECTION',
    'SAVE_LESSON_PROGRESS',
    'RENDER_SPECIES_LIST',    
]);

class navigation extends Enum {};
navigation.initEnum([
    'LANDSCAPE_HOME', 
    'SETTINGS', 
    'LESSONS',
    'LESSON',
    'GLOSSARY', 
    'EMAIL',
    'INFO',
    'LOGIN',
    'LANGUAGE',
    'QUIZ'
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

class guideType extends Enum {};
guideType.initEnum([
    'LOCATION',
    'INAT',
    'PICKER'
]);

class guideMode extends Enum {};
guideMode.initEnum([
    'STATIC',
    'DYNAMIC'
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
    'EDIT_LESSON',
    'TOGGLE_SPECIES_LIST',
    'PLAY_LESSON_VIDEO',
    'RETURN_LESSONS',
    'GO_TO_INTRODUCTION',
    'GO_TO_DASHBOARD',
    'GO_TO_LESSONS'
]);

class deckState extends Enum {};
deckState.initEnum([
    'BEGIN',
    'SCORE',
    'END'
]);

export const enums = {
    lessonState,
    navigation,
    taxon,
    guideType,
    guideMode,
    nextStep,
    quickFireType,
    quickFireStep,
    userEvent,
    deckState
};