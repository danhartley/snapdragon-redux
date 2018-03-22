import { store } from 'redux/store';
import { renderScoreHeader, renderScoreFooter } from 'ui/screens/score';

let currScore = undefined;

export const renderScore = () => {
    const { score } = store.getState();
    if(score === currScore) return;
    currScore = score;
    renderScoreHeader(score);
    renderScoreFooter(score);
};