export const renderTaxaBox = async (item) => {


    parent.innerHTML = '';
    
    renderTemplate({ name, vernacularName: item.vernacularName, rank, subSpeciesCount, familyName, headerImage, familyVernacularName, trait, occurrences, iconicTaxon }, template.content, parent, clone);
}