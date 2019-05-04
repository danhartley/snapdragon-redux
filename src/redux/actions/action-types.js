const UPDATE_CONFIG = '[UPDATE_CONFIG] change to config';
const STOP_START_LESSON = '[STOP_START_LESSON] Pause or play current lesson';
const CHANGE_LESSON_PLANS = '[CHANGE_LESSON_PLANS] Edit the set of lesson plans';
const CHANGE_LESSON_PLAN = '[CHANGE_LESSON_PLAN] Edit the original lesson plan';
const SELECT_COLLECTION = '[SELECT_COLLECTION] Update the current selected collection';
const CHANGE_PAGE = '[CHANGE_PAGE] Navigate to new page';
const NEXT_ROUND = '[NEXT_ROUND] Go to next round';
const NEXT_LESSON = '[NEXT_LESSON] Get (new) lesson plan';
const NEXT_LAYOUT = '[NEXT_LAYOUT] Render next layout';
const NEXT_ITEM = '[NEXT_ITEM] Get next item';

const NEW_COLLECTION = '[NEW_COLLECTION] New collection';
const UPDATE_COLLECTION = '[UPDATE_COLLECTION] Change collection';

const UPDATE_SCORE = '[UPDATE_SCORE] Check user answer and update running score';
const END_REVISION = '[END_REVISION] Revision complete';
const UPDATE_HISTORY = '[UPDATE_HISTORY] Copy round score to history';
const UPDATE_COLLECTION_ITEMS = '[UPDATE_COLLECTION_ITEMS] Change collection items';
const NEXT_LEVEL = '[NEXT_LEVEL] Go to next level';
const UPDATE_LANGUAGE = '[UPDATE_LANGUAGE] Update the current language';

const UPDATE_ENUMS = '[UPDATE_ENUMS] Update enums by config language';
const UPDATE_LESSON = '[UPDATE_LESSON] Create new lesson';

export const types = {
    CHANGE_LESSON_PLANS,
    CHANGE_LESSON_PLAN,
    NEXT_LESSON,
    NEXT_LAYOUT,
    NEXT_ITEM,
    UPDATE_SCORE,
    END_REVISION,
    UPDATE_HISTORY,
    NEW_COLLECTION,
    UPDATE_COLLECTION,
    UPDATE_COLLECTION_ITEMS,
    NEXT_ROUND,
    NEXT_LEVEL,
    UPDATE_CONFIG,
    STOP_START_LESSON,
    SELECT_COLLECTION,
    UPDATE_LANGUAGE,
    CHANGE_PAGE,
    UPDATE_ENUMS,
    UPDATE_LESSON
};