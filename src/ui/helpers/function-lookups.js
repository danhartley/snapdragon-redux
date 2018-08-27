import { renderTextEntry } from 'ui/screens/text-entry/species-text-entry';
import { renderSpecimenTiles } from 'ui/screens/landscape/specimen-tiles';
import { renderHistory } from 'ui/screens/progress/history';
import { renderCard } from 'ui/screens/cards/card';
import { renderTaxonCard } from 'ui/screens/cards/taxon-card';
import { renderSpeciesTiles } from 'ui/screens/multichoice/species-tiles';
import { renderSummary } from 'ui/screens/progress/summary';
import { renderLeafTile } from 'ui/screens/landscape/leaf-tile';
import { renderNameEntry } from 'ui/screens/text-entry/leaf-text-entry';
import { runTask } from 'ui/screens/command';
import { renderSpeciesCollectionList } from 'ui/screens/lists/species-list';
import { renderRadioButtons } from 'ui/screens/multichoice/radiobuttons';
import { renderMultiStrips } from 'ui/screens/multichoice/multi-strips';
import { renderCompleteText } from 'ui/screens/text-entry/text-complete';
import { renderCultivarCard } from 'ui/screens/cards/cultivar-card';
import { renderWildcard } from 'ui/screens/cards/wildcard-card';

const functions = [
    { name: 'text-entry', func: renderTextEntry },
    { name: 'specimen-images', func: renderSpecimenTiles },
    { name: 'collection', func: renderSpeciesCollectionList },
    { name: 'species-card', func: renderCard },
    { name: 'species-scientifics', func: renderMultiStrips },
    { name: 'species-vernaculars', func: renderMultiStrips },
    { name: 'species-images', func: renderSpeciesTiles },
    { name: 'summary', func: renderSummary },
    { name: 'history', func: renderHistory },
    { name: 'command', func: [renderSpecimenTiles, runTask] },
    { name: 'leaf-image', func: renderLeafTile },
    { name: 'leaf-text', func: renderNameEntry },
    { name: 'epithet', func: renderMultiStrips },
    { name: 'definition', func: renderMultiStrips },
    { name: 'family', func: renderRadioButtons },
    { name: 'cultivar-match', func: renderRadioButtons },
    { name: 'family-strips', func: renderMultiStrips },
    { name: 'taxon-card', func: renderTaxonCard },
    { name: 'text-complete', func: renderCompleteText },
    { name: 'cultivar-card', func: renderCultivarCard },
    { name: 'wildcard-card', func: renderWildcard },
    { name: 'wildcard-match', func: renderMultiStrips },
];

export const funcByName = name => {
    const match = functions.find(func => func.name === name);
    const func = match ? match.func : null;
    return func;
};