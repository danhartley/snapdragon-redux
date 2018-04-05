import { store } from 'redux/store';
import { renderScoreHeader, renderScoreFooter } from 'ui/progress/score';

export const renderScore = () => {
    const { score } = store.getState();
    renderScoreFooter(score);
};