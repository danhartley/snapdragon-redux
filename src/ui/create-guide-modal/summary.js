export const renderSummary = (config, modal) => {
    modal.querySelector('.guide-place').innerHTML = config.place.longLocation;
    modal.querySelector('.guide-categories').innerHTML = config.guide.iconicTaxa.join(', ');
}