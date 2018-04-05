import { utils } from 'utils/utils';
import { flora } from 'api/flora';

const sampleSize = 12;

const binomials = flora[2]
    .map(item => {
        const names = item.name.split(' ');
        item.genus = names[0];
        item.species = names[1];
        item.name = item.name.split(' ').slice(0,2).join(' ');
        return item;
});

const species = utils.shuffleArray(binomials)
    .filter((sp, index) => {
        if(index < sampleSize) return sp;
    });

export const api = {
    species
};