import { epithets } from 'api/botanical-latin';

test('should return a translation object where this is a matching latin name', () => {
    const latinName = 'officinalis';
    const obj = epithets.find(item => {        
        return item.latin.find(part => part === latinName);
    });

    const expected = {
        "latin" : ["officinalis", "officinale"],
        "en" : "of or belonging to an officina, the store room of a monastery, where medicines and other necessaries were kept",
        "wiki": "https://en.wikipedia.org/wiki/Officinalis"
    };

    expect(obj).toEqual(expected);
});

test('should not return a translation object where this is no a matching latin name', () => {
    const latinName = 'schoenoprasum';
    const epithet = epithets.find(item => {        
        const match = item.latin.find(part => part === latinName);
        return match || '';
    }) || '';

    expect(epithet).toEqual("");
});