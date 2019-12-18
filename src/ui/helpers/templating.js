
export const renderTemplate = (context, content, parent, clone) => {
    const contentClone = clone || document.importNode(content, true);    
    var ctx = new Stamp.Context();
    var expanded = Stamp.expand(contentClone, context);
    Stamp.appendChildren(parent, expanded);
};

//https://github.com/jcgregorio/stamp/wiki