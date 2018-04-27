export const cutter = (str, length) => {

    str = str.replace(' ', '');

    const strs = [];

    for(let s of str) {
        strs.push(s);
    }

    return recutter(strs, length);
};

const isMod = (length, strLength) => strLength % length === 0;

const recutter = (strs, newLength) => {

    let length = newLength || 4;
    
    const cuts = [];

    let cut = '';

    strs.forEach( (str, index) => {
        index++;
        cut += str;
        if(index !== 0 && index % length === 0) {
            cuts.push(cut);
            cut = '';
        }        
    });

    if(isMod(length, strs.length)) return cuts;

    if(strs.length % length === 1) {
        cuts[cuts.length-1] += strs.slice(-1);
    } else if(strs.length % length === 2){
        cuts[cuts.length-1] += strs.slice(-2).join('');
    } else if(strs.length % length === 3){
        cuts.push(strs.slice(-3).join(''));
    }
    else if(strs.length % length === 4){
        cuts.push(strs.slice(-4).join('')); 
    }
    else {
        recutter(strs, length)
    }    

    return cuts;
}