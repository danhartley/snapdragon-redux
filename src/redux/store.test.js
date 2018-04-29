import { observeStore } from 'redux/observe-store';
import { store } from 'redux/store';
import { collections, collection } from 'redux/reducers/species-reducers';
import { index, score, history, revision } from 'redux/reducers/progress-reducers';
import { config, lesson, layouts, layout } from 'redux/reducers/layout-reducers';

test('observeStore returns unsubscribe function for every listener', () => {
    const onChange = () => {};
    const action = '';
    const unsubscribe = observeStore(store, store => store.lesson, onChange,'');
    console.log(unsubscribe)
    expect(unsubscribe.name).toEqual('unsubscribe');
});