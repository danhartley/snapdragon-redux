import { actions } from 'redux/actions/action-creators';
import { store } from 'redux/store';
import { funcByName } from 'ui/helpers/function-lookups';
import { subscription } from 'redux/subscriptions';

export const nextLayout = (counter) => {

    const isLessonPaused = (counter.log && counter.log.index !== counter.index);

    if(isLessonPaused) return;

    const { lessonPlan, config } = store.getState();

    if(!lessonPlan || !lessonPlan.layouts) return;

    const layout = lessonPlan.layouts[counter.index];

    subscription.getByRole('screen').forEach(sub => subscription.remove(sub));

    subscription.getByName('renderSnapdragon').forEach(sub => subscription.remove(sub));
    subscription.getByName('renderCollections').forEach(sub => subscription.remove(sub));

    if(!layout) return;

    layout.screens.forEach( (screen, index) => {

        if(screen.name === 'command') {
            const funcs = funcByName(screen.name);
            funcs.forEach(func => {
                subscription.add(func, screen.domain, 'screen');
            });
        } else {
            const func = funcByName(screen.name);
            if(func) {
                if(config.isPortraitMode) {
                    if(index === 1 || screen.name === 'history') subscription.add(func, screen.domain, 'screen');                    
                } else {
                    subscription.add(func, screen.domain, 'screen');
                }                           
            }
        }
    });

    setTimeout(() => {
        actions.boundNextLayout(layout); 
    });    
};