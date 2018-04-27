import { store } from 'redux/store';
import { renderTiles } from 'ui/screens/common/tiles';
import { DOM } from 'ui/dom';

export const renderSpecimenTiles = (collection) => {

    const item = collection.items[collection.itemIndex];

    const { layout, config } = store.getState();

    DOM.collectionTxt.innerHTML = config.currentCollectionName;
    
    if (window.matchMedia("(min-width: 1024px)").matches || window.matchMedia("(min-width: 1200px)").matches)
        DOM.moreSpecimensBtn.style.display = 'block';
    else DOM.moreSpecimensBtn.style.display = 'none';

    let screen = layout.screens.filter(el => el.name === 'specimen-images')[0];

    if(layout.screens[0].name === 'command') screen = layout.screens[0].left;

    if(!screen) return;

    let images = [];
    
    item.imageIndices.forEach(index => {
        const image = item.images[index];
        if(image)
            images.push(image);
    });
    item.content = images.slice(0,4);
    let index = 4;

    const callback = contentItem => {
        return `<div class="square">                            
                    <img src="${contentItem}" onError="this.src='https://lh3.googleusercontent.com/-w9gHw3gUIuRxpOMAjEqhLtwyj9znvCJbAgGWLzutQB1eWcpVtMXMuhiKNck4dpf1IxQVOYPMeVZbbfRU7g8fTZZu019Spiu4Vc84s1FxGr_JS9igG0pGcuUn8GCDL6ryuB92Ek00ON3lTHKaUYTD8Tt3-zw2CC8tr-tA0xbNpd4bg_GcxUzd9Y6d9MD0ps1OvysJaAZwb1319aGUCSVSVoXxPOi6bfBy8MeIrvFvbuQX-sRT58tXE_QzFoN2BdogUg9mesRyBpAknxhnNp3BhODD6sYEbXljXn-2Amk6cdzv95EEb5ZucSiRwtuaPyK-jpLchT2JrQQztftOP6JsiHbD_Dv7pib_PGN6faexLUmqVhil9OttpIjVwV8bFg7L9An3FMazrGrB3VpMCQ-v_Oz1M_4Ozw0HK6Iio93vURxJi_Wdh-3zr_rNgTcLHcVPRf9NWJ0otoPyNr732FfoRcnf6tTRwecfvIO57iobx7j9xBuzv5kMW6hWF3DhX7S1-PdcAJnWqVkvtaDXMIE8Qv9tRgWU4Es97876O8GBxhO0P9HTXATSLFAh0e3OAHo10jsfQcbMfSbpRKYqiLIddUe7Hx85bCaxY5d_6U=w978-h744-no';" />
                </div>`; 
    };

    renderTiles(screen, item, callback, config.callbackTime);

    DOM.moreSpecimensBtn.addEventListener('click', () => {
        item.content = images.slice(index,index + 4);
        index = index + 4;
        renderTiles(screen, item, callback, config.callbackTime);
        if(index === 8)
            DOM.moreSpecimensBtn.style.display = 'none';
    });

};