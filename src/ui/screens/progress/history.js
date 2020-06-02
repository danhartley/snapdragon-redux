import { store } from 'redux/store';
import { renderLessons } from 'ui/screens/lists/lesson-list';

export const renderHistory = history => {
            
    const { collection} = store.getState();

    renderLessons();
}    