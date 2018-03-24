import { DOM } from 'ui/dom';

export const renderSpecimensHeader = (count) => {
    DOM.collectionTxt.innerHTML = `There are ${count} items in this test`;
};

export const renderSpecimens = (screen, randomiser, itemImages) => {

    const template = document.querySelector(`.${screen.template}`);

    const rptrSpecimen = template.content.querySelector('.js-rptr-specimen');

    let renderSpecimenImages = null;

    const handleTabPress = event => {
        if(event.key === 'Tab') {
            renderSpecimenImages();          
        }
    };

    const renderImages = (specimenImages) => {        
        let images = [];
        randomiser.imageIndices.forEach(index => images.push(specimenImages[index]));
        window.addEventListener('keydown', handleTabPress);        
        return () => {                    
            let displayImages = images.splice(0,4);
            rptrSpecimen.innerHTML = displayImages.map(displayImages => {
            return `<div class="square">                            
                        <img src="${displayImages}" onError="this.src='https://lh3.googleusercontent.com/-w9gHw3gUIuRxpOMAjEqhLtwyj9znvCJbAgGWLzutQB1eWcpVtMXMuhiKNck4dpf1IxQVOYPMeVZbbfRU7g8fTZZu019Spiu4Vc84s1FxGr_JS9igG0pGcuUn8GCDL6ryuB92Ek00ON3lTHKaUYTD8Tt3-zw2CC8tr-tA0xbNpd4bg_GcxUzd9Y6d9MD0ps1OvysJaAZwb1319aGUCSVSVoXxPOi6bfBy8MeIrvFvbuQX-sRT58tXE_QzFoN2BdogUg9mesRyBpAknxhnNp3BhODD6sYEbXljXn-2Amk6cdzv95EEb5ZucSiRwtuaPyK-jpLchT2JrQQztftOP6JsiHbD_Dv7pib_PGN6faexLUmqVhil9OttpIjVwV8bFg7L9An3FMazrGrB3VpMCQ-v_Oz1M_4Ozw0HK6Iio93vURxJi_Wdh-3zr_rNgTcLHcVPRf9NWJ0otoPyNr732FfoRcnf6tTRwecfvIO57iobx7j9xBuzv5kMW6hWF3DhX7S1-PdcAJnWqVkvtaDXMIE8Qv9tRgWU4Es97876O8GBxhO0P9HTXATSLFAh0e3OAHo10jsfQcbMfSbpRKYqiLIddUe7Hx85bCaxY5d_6U=w978-h744-no';" />
                    </div>`; 
            }).join('');
            const clone = document.importNode(template.content, true);
            screen.parent.innerHTML = '';
            screen.parent.appendChild(clone);
        };        
    };
            
    renderSpecimenImages = renderImages(itemImages);
    renderSpecimenImages();

    DOM.moreSpecimensBtn.addEventListener('click', () => {
        renderSpecimenImages();
    });
};