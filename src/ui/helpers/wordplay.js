export const cutter = (str, length) => {
    
    const strs = [];

    for(let s of str) {
        strs.push(s);
    }

    const cuts = [];

    let cut = '';

    strs.forEach( (str, index) => {
        cut += str;
        if(index % length === 0) {
            cuts.push(cut);
            cut = '';
        }        
    });

    console.log(cuts);

    return cuts;
};