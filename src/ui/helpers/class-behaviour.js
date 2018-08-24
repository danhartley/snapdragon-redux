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

const add = (element, className, redundantClasses) => {
    if(!elem) return;
    if(redundantClasses && redundantClasses.length > 0) 
        redundantClasses.forEach(redundant => elem.classList.remove(redundant));
    if(className)
        elem.classList.add(className);
};

export const elem = {
    show, hide, toggle, add
};