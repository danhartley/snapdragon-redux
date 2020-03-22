import * as R from 'ramda';

import { actions } from 'redux/actions/action-creators';
import { store } from 'redux/store';

const getItems = (taxa, includeTechnicalTerms = false) => {
    
    const glossary = store.getState().glossary;

    const items = glossary.filter(definition => R.contains(definition.taxon, taxa));

    let selectedItems = [];

    includeTechnicalTerms
        ? selectedItems = items
        : selectedItems = items.filter(item => item.technical !== 'true');

    return selectedItems.filter(item => R.contains(item.taxon, taxa));
};

const getBranches = items => {
    
    let branches = [ ...new Set(items.map(item => item.branch)) ];
        branches = branches.map(branch => {
            return {
                name: branch,
                count: items.filter(item => item.branch == branch).length
            }
          });
    return branches;
};

const getQuickFire = (glossary, type, collection) => {

    const items = collection.terms
            ? glossary.filter(definition => R.contains(definition.id, collection.terms))
            : glossary;

    const taxa = [ ...new Set(items.map(definition => definition.taxon))];

    const filter = {
          iconicTaxa: taxa,
          option: {
                key: "0",
                value: "multiple choice" // depends on type???
          }
    };
    
    const quickFire = {
        index: 0,
        isComplete: false,
        items,
        count: items.length,
        filter,
        type,
        score: {
            total: 0,
            correct: 0,
            incorrect: 0,
            isCorrect: null,
            isIncorrect: null,
            rounds: []
        },
        poolSize: items.length,
        terms: collection.terms
    };

    quickFire.filter.taxa = filter.iconicTaxa.map(taxon => {
        const iconicTaxon = {
            name: taxon,
            count: items.filter(item => item.taxon === taxon).length
        }
        return iconicTaxon;
    });

    quickFire.filter.taxa = quickFire.filter.taxa.filter(taxon => taxon.count > 0);

    actions.boundCreateQuickFire(quickFire);

    return quickFire;
};

export const quickFireAPI = {
    getItems,
    getBranches,
    getQuickFire
};