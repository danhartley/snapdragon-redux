import { contains, take } from 'ramda';

import { utils } from 'utils/utils';

const selectAnswers = (quickFire, quickFireItems) => {

    quickFire.spareItems = quickFire.spareItems || take(5, quickFireItems);

    quickFire.question = quickFireItems.splice(0,1)[0];

    let items = quickFireItems.filter(item => item.branch === quickFire.question.branch);

    const itemCount = items ? items.length : 0;
    const requiredItems = 3;

    if (itemCount <= requiredItems) {
        const itemsToAdd = take((requiredItems - itemCount), quickFire.spareItems.filter(sp => !contains(sp.term, items.map(i => i.term)) && sp.term !== quickFire.question.term ));
              itemsToAdd.forEach(item => items.push(item));
    }

    let answers = take(3, items);
        answers.push(quickFire.question);
        answers = utils.shuffleArray(answers);
        answers = answers.map((item, index) => {
            return {
                term: item.term,
                index
            };
        });

    return answers;
};

export const quickFireLogic = {
    selectAnswers
};