import { utils } from 'utils/utils';
import { flora } from 'api/flora';

const sampleSize = 3;

const binomials = flora[2]
    .map(item => {
        const names = item.name.split(' ');
        item.genus = names[0];
        item.species = names[1];
        item.name = item.name.split(' ').slice(0,2).join(' ');
        return item;
});

const pool = utils.shuffleArray(binomials);
const items = pool
    .filter((item, index) => {
        if(index < sampleSize) return item;
    });

export const modules = {
    pool, 
    items
};