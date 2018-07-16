import { epithets } from 'api/botanical-latin';

test('should return a translation object where this is a matching latin name', () => {
    const latinName = 'nucifer';
    const obj = epithets.find(item => {        
        return item.latin.find(part => part === latinName);
    });

    const expected = {
        "latin" : ["nucifer"],
        "en" : ["bearing nuts"]
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