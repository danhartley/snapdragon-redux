import { renderInatUser } from 'ui/create-guide-modal/inat-user';

export const renderGuides = (modal, config, createGuide) => {

    const guideTxt = modal.querySelector('.guide-text');
    const chosen = modal.querySelector('.js-chosen span:nth-child(2)');
    const saveYourChangesBtn = createGuide.save(config, chosen, 'GUIDE');

    guideTxt.innerHTML = 'Plan your lesson';

    renderInatUser(modal, config, saveYourChangesBtn, chosen);
}