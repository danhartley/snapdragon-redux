const show = (elem) => {
	elem.classList.add('is-visible');
};

const hide = (elem) => {
	elem.classList.remove('is-visible');
};

const toggle = (elem) => {
	elem.classList.toggle('is-visible');
};

const add = (element, className, redundantClasses) => {
    if(redundantClasses && redundantClasses.length > 0) 
        redundantClasses.forEach(redundant => element.classList.remove(redundant));
    if(className)
        element.classList.add(className);
};

export const elem = {
    show, hide, toggle, add
};