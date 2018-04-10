import { DOM } from 'ui/dom';
import { renderSpeciesTiles } from 'ui/screens/right/species-tiles';
import { renderSpecimenTiles } from 'ui/screens/left/specimen-tiles';
import { renderCard } from 'ui/screens/common/card';
import { renderTextEntry } from 'ui/screens/right/species-text-entry';
import { renderVernaculars } from 'ui/screens/right/species-vernaculars';
import { renderScientificStrips } from 'ui/screens/right/species-scientifics';

import { renderSummary } from 'ui/progress/summary';
import { renderHistory } from 'ui/progress/history';

import { screens } from 'ui/layouts/species-layouts';
import { lessonPlanner } from 'syllabus/lesson-planner';

const layouts = lessonPlanner.lessonLayouts[0];
const layout = layouts[0];

it('lesson-planner should contain at least one lesson', () => {
    expect(layouts.length).toBeGreaterThan(0);
});

it('first lesson in layout should have a layoutIndex of 0', () => {
    expect(layout.layoutIndex).toEqual(0);
});