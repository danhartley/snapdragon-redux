import { renderTextEntry } from 'ui/screens/text-entry/species-text-entry';
import { renderSpecimenTiles } from 'ui/screens/landscape/specimen-tiles';
import { renderHistory } from 'ui/screens/progress/history';
import { renderCard } from 'ui/screens/cards/card';
import { renderScientifics } from 'ui/screens/multichoice/species-scientifics';
import { renderVernaculars } from 'ui/screens/multichoice/species-vernaculars';
import { renderSpeciesTiles } from 'ui/screens/multichoice/species-tiles';
import { renderSummary } from 'ui/screens/progress/summary';
import { renderLeafTile } from 'ui/screens/landscape/leaf-tile';
import { renderNameEntry } from 'ui/screens/text-entry/leaf-text-entry';
import { runTask } from 'ui/screens/command';
import { renderSpeciesCollection } from 'ui/screens/lists/species';
import { renderRadioButtons } from 'ui/screens/multichoice/radiobuttons';

const functions = [
    { name: 'text-entry', func: renderTextEntry },
    { name: 'specimen-images', func: renderSpecimenTiles },
    { name: 'collections', func: renderSpeciesCollection },
    { name: 'species-card', func: renderCard },
    { name: 'species-scientifics', func: renderScientifics },
    { name: 'species-vernaculars', func: renderVernaculars },
    { name: 'species-images', func: renderSpeciesTiles },
    { name: 'summary', func: renderSummary },
    { name: 'history', func: renderHistory },
    { name: 'command', func: [renderSpecimenTiles, runTask] },
    { name: 'leaf-image', func: renderLeafTile },
    { name: 'leaf-text', func: renderNameEntry },
    { name: 'epithet', func: renderRadioButtons },
    { name: 'family', func: renderRadioButtons },
    { name: 'family-description', func: renderRadioButtons },
];

export const funcByName = name => {
    const match = functions.find(func => func.name === name);
    const func = match ? match.func : null;
    return func;
};