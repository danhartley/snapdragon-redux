import { store } from 'redux/store';
import { renderScoreSummary } from 'ui/screens/progress/score-summary';

export const renderSummary = history => {

    const { collection, lesson } = store.getState();

    lesson.isLessonComplete
        ? renderScoreSummary(collection.id, false)
        : renderScoreSummary(collection.id, true);

    return;
};

