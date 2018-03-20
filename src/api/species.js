import { utils } from 'utils/utils';
import { flora } from 'api/flora';

const binomials = flora[1].map(item => {
        const names = item.name.split(' ');
        item.genus = names[0];
        item.species = names[1];    
        item.name = item.name.split(' ').slice(0,2).join(' ');
        return item;
});

const species = utils.shuffleArray(binomials);

export const api = {
    species
};