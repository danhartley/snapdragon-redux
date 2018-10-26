import { actions } from 'redux/actions/action-creators';
import { store } from 'redux/store';
import { screensSubscriptionHandler } from 'ui/helpers/subscription-handler';

export const nextLayout = (counter) => {

    const isLessonPaused = (counter.log && counter.log.index !== counter.index);

    if(isLessonPaused) return;

    const { lessonPlan, config } = store.getState();

    if(!lessonPlan || !lessonPlan.layouts) return;

    const layout = lessonPlan.layouts[counter.index];

    if(!layout) return;

    actions.boundNextLayout(layout);

    screensSubscriptionHandler(layout, config);
};