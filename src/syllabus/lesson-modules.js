import { utils } from 'utils/utils';
import { flora } from 'api/flora';
import { lamiaceae } from 'api/families';

const binomials = lamiaceae
    .map(item => {
        const names = item.name.split(' ');
        item.genus = names[0];
        item.species = names[1];
        item.name = item.name.split(' ').slice(0,2).join(' ');
        return item;
});

const pool = utils.shuffleArray(binomials);

const createLessonModule = moduleSize => {    
    const items = pool
        .filter((item, index) => {
            if(index < moduleSize) return item;
        });
    const lesson = {
        pool,
        items,
        moduleSize
    }
    return lesson;
};

export const modules = {
    pool,
    createLessonModule
};