import { contains, flatten } from 'ramda';

import { DOM } from 'ui/dom';
import { utils } from 'utils/utils';

import { roundHandler } from "snapdragon-engine/round-plan-handler";
import { bonusHandler } from 'snapdragon-engine/bonus/bonus-test-handler';
import { providerHandler } from 'snapdragon-engine/provider/provider-test-handler';
import { mixedTraitHandler } from 'ui/screens/multichoice/landscape/mixed-trait/mixed-trait-handler';

import { layouts as L } from 'snapdragon-config/screen-layouts';

export const createNextRound = (lessonPlan, nextRoundLayoutTemplates, progressScreens, collection, lesson) => {

    const init = async () => {
    
        lessonPlan.layouts = [];

        const moduleSize = lesson.moduleSize;
        const lessonName = lesson.name;
        const levelName = lesson.level.name;
        const itemsCountToDate = (lesson.currentRound - 1) * moduleSize;
        const itemsLeft = collection.items.length - itemsCountToDate;

        const layoutsToAdd = moduleSize > itemsLeft ? itemsLeft : moduleSize;
        const roundItemNames = roundHandler.getRoundItems(lesson.currentRound, moduleSize, collection.items.map(i => i.name));

        nextRoundLayoutTemplates.forEach( async (layout, index) => {
            let itemIndex = 0;
            do {
                if(layout.name === 'mixed-trait-images') {
                    
                    const item = collection.items.find(i => i.name === roundItemNames[itemIndex]);

                    const { requiredTraitValues, trait } = mixedTraitHandler.getMatchingTrait(utils.shuffleArray(layout.screens[1].traits), item.traits);

                    if(!trait) return;

                    const { traits, requiredTraits } = await mixedTraitHandler.fetchTraits(trait, requiredTraitValues, collection.glossary);

                    if(!requiredTraits || !traits) return;

                    layout.trait = trait;
                    layout.traits = traits;
                    layout.requiredTraits = requiredTraits;

                    const traitsToIgnore = [ 'n/a', 'none' ];
                    const addLayout = !!requiredTraits.find(t => !contains(t.term.toLowerCase(), traitsToIgnore));

                    if(addLayout) {
                        lessonPlan.layouts.push({...layout, lessonName, levelName, speciesName: roundItemNames[itemIndex] });
                    }
        
                } else {
                    lessonPlan.layouts.push({...layout, lessonName, levelName, speciesName: roundItemNames[itemIndex] });
                }

                itemIndex++;
                
            } while (itemIndex < layoutsToAdd);
        });

        if(lesson.level.id === 1) {
            let providerQuestions = await providerHandler.getLayouts(collection, roundItemNames);
                providerQuestions = flatten(providerQuestions).filter(layout => layout);

            let providerLayouts = providerQuestions.map(provider => {
                return { ...L.providerHorizontalStrip, lessonName:"Lesson 1", levelName:"Level 1", speciesName: provider.name || provider.taxon, provider };
            });

            if(providerLayouts) {
                lessonPlan.layouts = [ ...lessonPlan.layouts, ...providerLayouts ];
            }
        }

        const bonusLayouts = lessonPlan.layouts.filter(layout => layout.bonus);

        let lessonLayouts = lessonPlan.layouts.filter(layout => !layout.bonus).map((layout, i) => {
            layout.itemIndex = layout.itemIndex === undefined ? utils.calcItemIndex(itemsCountToDate, layoutsToAdd, i) : layout.itemIndex;
            return { ...layout };
        });

        const itemIndices = [ ...new Set(lessonPlan.layouts.map(layout => layout.itemIndex).filter(i => i !== undefined)) ];
        
        lessonPlan.layouts = lessonLayouts;

        if(lesson.level.id === 1) {

            if(bonusLayouts) {
                const bonusTests = await bonusHandler.getTests(collection, itemIndices, bonusLayouts, lessonName, levelName);
                lessonPlan.layouts = [ ...lessonPlan.layouts, ...bonusTests ];
            }
        }

        lessonLayouts = lessonPlan.layouts.map((layout, i) => {
            layout.roundProgressIndex = i + 1;
            return { ...layout };
        });

        const summaryLayout = lessonPlan.portrait 
            ? {
                name: 'summary',
                screens: [{ 
                    name: 'summary', 
                    domain: 'history', 
                    parent: DOM.rightBody
                }],
                lessonName,
                levelName,
                layoutIndex: lessonPlan.layouts.length,
                itemIndex: 0
            }
            : {
                name: 'summary',
                screens: [...progressScreens],
                lessonName,
                levelName,
                layoutIndex: lessonPlan.layouts.length,
                itemIndex: 0
            };

        // lessonPlan.layouts.push(summaryLayout);

        lessonPlan.layouts.push({
            name: 'summary',
            screens: [{ 
                name: 'summary', 
                domain: 'history', 
                parent: DOM.rightBody
            }],
            lessonName,
            levelName,
            layoutIndex: lessonPlan.layouts.length,
            itemIndex: 0
        });

        const scores = lessonPlan.layouts.map(layout => layout.score || 0);
        const roundScoreCount = scores.reduce((accumulator, currentValue) => accumulator + currentValue);

        lessonPlan.layouts.map(layout => layout.roundScoreCount = roundScoreCount);

        lesson.questionCount = lessonPlan.layouts.filter(layout => layout.type === 'test').length;
        
        lesson.layoutCount = lessonPlan.layouts.length;
        lesson.layoutNames = lessonPlan.layouts.map(layout => layout.name);

        return { updatedLessonPlan: lessonPlan, updatedCollection: collection, updatedLesson: lesson };
    }

    return init();
};
