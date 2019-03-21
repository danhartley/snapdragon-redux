export const renderWikiModal = (item, wikiLink, config) => {
    if(wikiLink) {
        wikiLink.addEventListener('click', event => {
            document.querySelector('.js-external-page-title').innerHTML = `${item.name}`;
            const entry = document.querySelector('.species-card-wiki-entry').innerText;
            const style = `
                <style type='text/css'>
                body {
                    font-family: PT Sans', 'Roboto', arial,sans-serif;
                }
                a {
                    text-decoration: none;
                    border: solid 1px;
                    border-top: none;
                    border-left: none;
                    border-right: none;
                    color: black;
                    cursor: pointer;
                }
            </style>`;
            const wiki = `<header>${style}</header><p>${entry}</p><p><a href='https://en.wikipedia.org/wiki/Salvia_officinalis' target='_blank'>Wikipedia page</a></p>`;

            document.querySelector('.js-external-page-body').innerHTML = config.isPortraitMode
                ? `<iframe class="modal-iframe" title="Wikipedia page for the species ${item.name}" src="data:text/html,${wiki}"></iframe>`          
                : `<iframe class="modal-iframe" title="Wikipedia page for the species ${item.name}" src="${wikiLink.querySelector('span').dataset.src}"></iframe>`;
                
            document.querySelector('#wikiModal').focus();
        });
    }
};