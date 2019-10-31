import { enums } from 'ui/helpers/enum-helper';
import { setupHandler } from 'ui/setup/setup-handler';

export const nextItem = layout => {

    if(setupHandler.isRequired(enums.nextStep.NEXT_ITEM, { layout })) {
        setupHandler.actionUpdate(enums.nextStep.NEXT_ITEM, { layout });
    }
};