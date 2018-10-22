const UPDATE_CONFIG = '[UPDATE_CONFIG] change to config';
const STOP_START_LESSON = '[STOP_START_LESSON] Pause or play current lesson';
const CHANGE_LESSON_PLAN = '[CHANGE_LESSON_PLAN] Edit the original lesson plan';
const SELECT_COLLECTION = '[SELECT_COLLECTION] Update the current selected collection';
const CHANGE_PAGE = '[CHANGE_PAGE] Navigate to new page';
const NEXT_ROUND = '[NEXT_ROUND] Go to next round';
const NEXT_LESSON = '[NEXT_LESSON] Get (new) lesson plan';
const NEXT_LAYOUT = '[NEXT_LAYOUT] Render next layout';
const NEXT_ITEM = '[NEXT_ITEM] Get next item';
const CHANGE_COLLECTION = '[CHANGE_COLLECTION] Change collection';

const UPDATE_SCORE = '[UPDATE_SCORE] Check user answer and update running score';
const END_REVISION = '[END_REVISION] Revision complete';
const UPDATE_HISTORY = '[UPDATE_HISTORY] Copy round score to history';
const CHANGE_COLLECTION_ITEMS = '[CHANGE_COLLECTION_ITEMS] Change collection items';
const NEXT_LEVEL = '[NEXT_LEVEL] Go to next level';
const UPDATE_LANGUAGE = '[UPDATE_LANGUAGE] Update the current language';

const UPDATE_UI = '[UPDATE_UI] update UI elements';

const UPDATE_ENUMS = '[UPDATE_ENUMS] update enums by config language';

export const types = {
    CHANGE_LESSON_PLAN,
    NEXT_LESSON,
    NEXT_LAYOUT,
    NEXT_ITEM,
    UPDATE_SCORE,
    END_REVISION,
    UPDATE_HISTORY,
    CHANGE_COLLECTION,
    CHANGE_COLLECTION_ITEMS,
    NEXT_ROUND,
    NEXT_LEVEL,
    UPDATE_CONFIG,
    STOP_START_LESSON,
    SELECT_COLLECTION,
    UPDATE_LANGUAGE,
    CHANGE_PAGE,
    UPDATE_UI,
    UPDATE_ENUMS
};