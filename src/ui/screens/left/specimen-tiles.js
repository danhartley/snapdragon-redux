import { store } from 'redux/store';
import { renderTiles } from 'ui/screens/common/tiles';
import { DOM } from 'ui/dom';

export const renderSpecimenTiles = (item) => {

    const { layout, items } = store.getState();

    const count = items.length;

    (count === 1)
        ? DOM.collectionTxt.innerHTML = `There is ${count} item in this test`
        : DOM.collectionTxt.innerHTML = `There are ${count} items in this test`;

    const screen = layout.screens.filter(el => el.name === 'specimen-images')[0];

    if(!screen) return;

    let images = [];
    item.imageIndices.forEach(index => images.push(item.images[index]));
    item.content = images.splice(0,4);

    const callback = contentItem => {
        return `<div class="square">                            
                    <img src="${contentItem}" onError="this.src='https://lh3.googleusercontent.com/-w9gHw3gUIuRxpOMAjEqhLtwyj9znvCJbAgGWLzutQB1eWcpVtMXMuhiKNck4dpf1IxQVOYPMeVZbbfRU7g8fTZZu019Spiu4Vc84s1FxGr_JS9igG0pGcuUn8GCDL6ryuB92Ek00ON3lTHKaUYTD8Tt3-zw2CC8tr-tA0xbNpd4bg_GcxUzd9Y6d9MD0ps1OvysJaAZwb1319aGUCSVSVoXxPOi6bfBy8MeIrvFvbuQX-sRT58tXE_QzFoN2BdogUg9mesRyBpAknxhnNp3BhODD6sYEbXljXn-2Amk6cdzv95EEb5ZucSiRwtuaPyK-jpLchT2JrQQztftOP6JsiHbD_Dv7pib_PGN6faexLUmqVhil9OttpIjVwV8bFg7L9An3FMazrGrB3VpMCQ-v_Oz1M_4Ozw0HK6Iio93vURxJi_Wdh-3zr_rNgTcLHcVPRf9NWJ0otoPyNr732FfoRcnf6tTRwecfvIO57iobx7j9xBuzv5kMW6hWF3DhX7S1-PdcAJnWqVkvtaDXMIE8Qv9tRgWU4Es97876O8GBxhO0P9HTXATSLFAh0e3OAHo10jsfQcbMfSbpRKYqiLIddUe7Hx85bCaxY5d_6U=w978-h744-no';" />
                </div>`; 
    };

    renderTiles(screen, item, callback);

};