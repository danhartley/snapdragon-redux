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

export const enums = {
    lessonState
};