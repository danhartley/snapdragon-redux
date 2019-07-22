import { utils } from 'utils/utils';

const parseNames = (names, languages) => {
    
    if(!names) return [];
    
    let parsedNames = names.filter(item => R.contains(item.language, languages));
    parsedNames = parsedNames.map(name => {
        return {
            language: name.language,
            vernacularName: name.vernacularName.toLowerCase()     
        }
    });

    const uniqueParsedNames = [ ...new Set(parsedNames.map(name => name.vernacularName)) ]; // distinct names

    const uniqueNames = uniqueParsedNames.map(name => {
        const obj = {
            vernacularName: name,
            language: parsedNames.find(n => {
                return n.vernacularName === name;
            }).language
        };
        return obj;
    });

    uniqueNames.forEach(name => {
        name.vernacularName = utils.capitaliseFirst(name.vernacularName);
    });

    return uniqueNames;
};

const flatten = array => {
    const flattenedArray = array.reduce(
      function(accumulator, currentValue) {
        return accumulator.concat(currentValue);
      },
      []
    );
    return flattenedArray;
};

const getBinomial = item => {
    if(!item.name) return;
    if(!item.name.length > 0) return;
    const taxa = item.name.split(' ');
    const binomial = `${taxa[0]} ${taxa [1]}`;
    return binomial;
};

const getImages = (items, itemOption) => {
    let imageIds = [];
    let images = '';
    let currentItemId = parseInt(itemOption.value);
    const species = items.find(item => parseInt(item.id) === currentItemId);
    if(!species.images) {
        console.log('No images!');
    };
    species.images.forEach((image, index) => {
        images = images + `<div><img id="${index}" width="260px" height="190px" style="cursor:pointer; object-fit: cover;" src="${image.url.replace('.jpg', '.260x190.jpg')}"/></div>`
    });
    document.querySelector('#images').innerHTML = images;  
    document.querySelectorAll('img').forEach(image => {
        image.addEventListener('click', event => {
            const image = event.target;
            const imageId = parseInt(event.target.id);
            const index = imageIds.indexOf(imageId);
            if (index > -1) {
                image.style.filter = 'saturate(100%)';
                image.style.opacity = 1;
                imageIds.splice(index, 1);
            } else {
                image.style.filter = 'saturate(10%)';
                image.style.opacity = .3;
                imageIds.push(imageId);
            }
        });
    });

    return { imageIds, currentItemId };
};

export const helpers = {
    parseNames,
    flatten,
    getBinomial,
    getImages
};