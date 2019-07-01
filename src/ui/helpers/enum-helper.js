import { Enum } from 'enumify';

class lessonState extends Enum {};
lessonState.initEnum([
    'CREATE_LESSON', 
    'GET_SPECIES', 
    'BEGIN_LESSON',
    'PAUSE_LESSON', 
    'RESUME_LESSON',
    'NEXT_ROUND'
]);

class navigation extends Enum {};
navigation.initEnum([
    'HOME', 
    'SETTINGS', 
    'LIST',
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

export const enums = {
    lessonState,
    navigation,
    taxon
};