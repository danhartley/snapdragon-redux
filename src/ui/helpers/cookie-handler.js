const setFirstTimeVisitorCookie = () =>  {
    let isFirstVisit = true;
    if (document.cookie === '') {
        document.cookie = 'first_time=false';
    } else {
        isFirstVisit = false;
    }
    return isFirstVisit;
}

const isFirstTimeVisitor = () => {
    
    let cookieValue, isFirstVisit = true;

    if (document.cookie !== '') {
        cookieValue = document.cookie.replace(/(?:(?:^|.*;\s*)first_time\s*\=\s*([^;]*).*$)|^.*$/, "$1");
        isFirstVisit = (cookieValue === 'true');
    }
    return isFirstVisit;
}

const removeFirstTimeVisitorCookie = () => {

    document.cookie = 'first_time= ; expires = Thu, 01 Jan 1970 00:00:00 GMT';
    
};

export const cookieHandler = {
    setFirstTimeVisitorCookie,
    isFirstTimeVisitor,
    removeFirstTimeVisitorCookie
};