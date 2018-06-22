import { renderTextEntry } from 'ui/screens/right/species-text-entry';
import { renderSpecimenTiles } from 'ui/screens/left/specimen-tiles';
import { renderHistory } from 'ui/progress/history';
import { renderCard } from 'ui/screens/common/card';
import { renderScientifics } from 'ui/screens/right/species-scientifics';
import { renderVernaculars } from 'ui/screens/right/species-vernaculars';
import { renderSpeciesTiles } from 'ui/screens/right/species-tiles';
import { renderSummary } from 'ui/progress/summary';
import { renderLetters } from 'ui/screens/common/letters';
import { renderLeafTile } from 'ui/screens/left/leaf-tile';
import { renderNameEntry } from 'ui/screens/right/leaf-text-entry';
import { runTask } from 'ui/screens/command';
import { renderSpeciesCollection } from 'ui/screens/common/species';

const functions = [
    { name: 'text-entry', func: renderTextEntry },
    { name: 'specimen-images', func: renderSpecimenTiles },
    { name: 'collections', func: renderSpeciesCollection },
    { name: 'species-card', func: renderCard },
    { name: 'species-scientifics', func: renderScientifics },
    { name: 'species-vernaculars', func: renderVernaculars },
    { name: 'species-images', func: renderSpeciesTiles },
    { name: 'summary', func: renderSummary },
    { name: 'command', func: [runTask, renderLetters] },
    { name: 'leaf-image', func: renderLeafTile },
    { name: 'leaf-text', func: renderNameEntry },
];

export const funcByName = name => {
    const match = functions.find(func => func.name === name);
    const func = match ? match.func : null;
    return func;
};