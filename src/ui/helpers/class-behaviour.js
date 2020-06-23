import{ contains } from 'ramda';

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

const hasClass = (elem, className) => {
    if(!elem) return false;
    const classArray = [ ...elem.classList ];
    return contains(className, classArray);
};

const removeClass = (elem, className) => {
    if(hasClass(elem, className)) {
        elem.classList.forEach(c => {
            if(c === className) {
                elem.classList.remove(c);
            }
        });
    }
};

export const elem = {
    show, hide, toggle, hasClass, removeClass
};