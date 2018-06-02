import { store } from 'redux/store';
import { renderTiles } from 'ui/screens/common/tiles';
import { DOM } from 'ui/dom';

export const renderSpecimenTiles = (collection) => {

    const item = collection.items[collection.itemIndex];

    if(!item) return;

    const { layout, config } = store.getState();

    DOM.collectionTxt.innerHTML = collection.name;
    const screenName = layout.screens[0].name;
    if(screenName !== 'species-scientifics' && screenName !== 'history')
        DOM.specimenSpeciesTxt.innerHTML =  config.isSmallDevice ? '' : `[ ${item.name} ]`;
    else 
        DOM.specimenSpeciesTxt.innerHTML = '';
    
    DOM.moreSpecimensBtn.style.display = 'inline-block';

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
                    <img 
                        src="${contentItem}" 
                        onError="this.src='https://lh3.googleusercontent.com/-w9gHw3gUIuRxpOMAjEqhLtwyj9znvCJbAgGWLzutQB1eWcpVtMXMuhiKNck4dpf1IxQVOYPMeVZbbfRU7g8fTZZu019Spiu4Vc84s1FxGr_JS9igG0pGcuUn8GCDL6ryuB92Ek00ON3lTHKaUYTD8Tt3-zw2CC8tr-tA0xbNpd4bg_GcxUzd9Y6d9MD0ps1OvysJaAZwb1319aGUCSVSVoXxPOi6bfBy8MeIrvFvbuQX-sRT58tXE_QzFoN2BdogUg9mesRyBpAknxhnNp3BhODD6sYEbXljXn-2Amk6cdzv95EEb5ZucSiRwtuaPyK-jpLchT2JrQQztftOP6JsiHbD_Dv7pib_PGN6faexLUmqVhil9OttpIjVwV8bFg7L9An3FMazrGrB3VpMCQ-v_Oz1M_4Ozw0HK6Iio93vURxJi_Wdh-3zr_rNgTcLHcVPRf9NWJ0otoPyNr732FfoRcnf6tTRwecfvIO57iobx7j9xBuzv5kMW6hWF3DhX7S1-PdcAJnWqVkvtaDXMIE8Qv9tRgWU4Es97876O8GBxhO0P9HTXATSLFAh0e3OAHo10jsfQcbMfSbpRKYqiLIddUe7Hx85bCaxY5d_6U=w978-h744-no';" 
                        data-toggle="modal" data-target="#imageModal"
                        data-src="${contentItem}"
                    />
                </div>`; 
    };

    renderTiles(screen, item, callback, config);

    DOM.moreSpecimensBtn.addEventListener('click', () => {
        item.content = images.slice(index,index + 4);
        index = index + 4;
        renderTiles(screen, item, callback, config);
        if(index === 8) {
            DOM.moreSpecimensBtn.innerText = 'Last 4 images';    
            index = 0;
        } else {
            DOM.moreSpecimensBtn.innerText = 'Next 4 images';
        }
        addContinueEventHandler();
    });

    const addContinueEventHandler = () => {
        if(config.isSmallDevice) {

            DOM.leftGrid.style.display = 'grid';
            DOM.rightGrid.style.display = 'none';
    
            document.querySelector('.js-continue-btn button').addEventListener('click', () => {
                DOM.leftGrid.style.display = 'none';
                DOM.rightGrid.style.display = 'grid';
            });
        }
    };

    addContinueEventHandler();

    if(config.isSmallDevice) {
        const btn = document.querySelector('.js-continue-btn button');
        const nextScreen = layout.screens[1];
        btn.innerText = nextScreen.cue || 'no cue';
    }

};