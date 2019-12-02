import { renderTextEntry } from 'ui/screens/text-entry/species-text-entry';
import { renderSpecimenTiles } from 'ui/screens/landscape/specimen-tiles';
import { renderHistory } from 'ui/screens/progress/history';
import { renderCard } from 'ui/screens/cards/card';
import { renderTaxonCard } from 'ui/screens/cards/taxon-card';
import { renderNonTaxonCard } from 'ui/screens/cards/non-taxon-card';
import { renderSummary } from 'ui/screens/progress/summary';
import { renderMultiStrips } from 'ui/screens/multichoice/multi-strips';
import { renderCompleteText } from 'ui/screens/text-entry/text-complete';
import { renderCultivarCard } from 'ui/screens/cards/cultivar-card';
import { renderMixedSpecimenImagesAndQuestion } from 'ui/screens/multichoice/portrait/mixed-specimen/mixed-specimen-combined';
import { renderNonTaxonCardSpecimenTiles } from 'ui/screens/cards/non-taxon-card-specimen-tiles';
import { renderMixedSpecimenQuestion } from 'ui/screens/multichoice/landscape/mixed-specimen/right/mixed-specimen-question';
import { renderMixedSpecimenImages } from 'ui/screens/multichoice/landscape/mixed-specimen/left/mixed-specimen-images';
import { renderMediaPlayers } from 'ui/screens/media/landscape/media-players';
import { renderBonusTest } from 'ui/screens/bonus/bonus-test';
import { renderBonusSpecimenTiles } from 'ui/screens/bonus/bonus-specimen-tiles';
import { renderMixedTraitImages } from 'ui/screens/multichoice/landscape/mixed-trait/left/mixed-trait-images';
import { renderMixedTraitQuestion } from 'ui/screens/multichoice/landscape/mixed-trait/right/mixed-trait-question';
import { renderHorizontalStrips } from 'ui/screens/multichoice/horizontal-strips.js';

const functions = [
    { name: 'mixed-specimen-questions', func: renderMixedSpecimenImagesAndQuestion },
    { name: 'non-taxon-specimen-tiles', func: renderNonTaxonCardSpecimenTiles },
    { name: 'text-entry', func: renderTextEntry },
    { name: 'specimen-images', func: renderSpecimenTiles },
    { name: 'species-card', func: renderCard },
    { name: 'species-scientifics', func: renderMultiStrips },
    { name: 'species-vernaculars', func: renderMultiStrips },
    { name: 'summary', func: renderSummary },
    { name: 'history', func: renderHistory },
    { name: 'epithet', func: renderMultiStrips },
    { name: 'definition', func: renderBonusTest },
    { name: 'family', func: renderMultiStrips },
    { name: 'family-strips', func: renderMultiStrips },
    { name: 'taxon-card', func: renderTaxonCard },
    { name: 'non-taxon-card', func: renderNonTaxonCard },
    { name: 'text-complete', func: renderCompleteText },
    { name: 'cultivar-card', func: renderCultivarCard },
    { name: 'visual-match', func: renderMultiStrips },
    { name: 'trait-images', func: renderBonusSpecimenTiles },
    { name: 'trait-property', func: renderBonusTest },
    { name: 'lookalike-property', func: renderBonusTest },
    { name: 'symbiotic-property', func: renderMultiStrips },
        
    { name: 'mixed-specimen-question', func: renderMixedSpecimenQuestion },
    { name: 'mixed-specimen-images', func: renderMixedSpecimenImages },
    
    { name: 'birdsong', func: renderBonusTest },
    { name: 'media-players', func: renderMediaPlayers },    

    { name: 'mixed-trait-images', func: renderMixedTraitImages },
    { name: 'mixed-trait-question', func: renderMixedTraitQuestion },
    
    { name: 'provider-horizontal-strip-questions', func: renderHorizontalStrips },
];

export const funcByName = name => {
    const match = functions.find(func => func.name === name);
    const func = match ? match.func : null;
    return func;
};