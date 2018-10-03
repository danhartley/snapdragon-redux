import * as R from 'ramda';

const show = (elem) => {
    if(!elem) return;
	elem.classList.add('is-visible');
};

const hide = (elem) => {
    if(!elem) return;
	elem.classList.remove('is-visible');
};

const toggle = (elem) => {
    if(!elem) return;
	elem.classList.toggle('is-visible');
};

const addClassToSelected = (collection, element, classesToRemove, classToAdd) => {
    if(!element) return;
    collection.forEach(elem => {
        if(classesToRemove && classesToRemove.length > 0) 
        classesToRemove.forEach(redundant => elem.classList.remove(redundant));
    });    
    if(classToAdd)
        element.classList.add(classToAdd);
};

const hasClass = (elem, className) => {
    const classArray = [ ...elem.classList ];
    return R.contains(className, classArray);
};

export const elem = {
    show, hide, toggle, addClassToSelected, hasClass
};