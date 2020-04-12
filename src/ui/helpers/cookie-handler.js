const FIRST_TIME = 'first_time';
const LAST_VISITED = 'last_visited';
const TOO_MANY_DAYS = 5;

const setFirstTimeVisitorCookie = () =>  {
    let isFirstVisit = true;
    if (document.cookie.indexOf(FIRST_TIME) < 0) {
        document.cookie = `${FIRST_TIME}=false;`;
    } else {
        isFirstVisit = false;
    }
    return isFirstVisit;
};

const setLastVisitedCookie = date => {    
    if (document.cookie.indexOf(LAST_VISITED) < 0) {
        document.cookie = `${LAST_VISITED}=${date};`;
    } else {
        setLastVisited(date);
    }    
};

const hasUserBeenAwayTooLong = () => {
    const lastVisited = readCookie(LAST_VISITED);
    const timeDiff = Math.abs(new Date() - new Date(lastVisited));
    const daysDiff = Math.ceil(timeDiff / (1000 * 60 * 60 * 24)); 
    const beenGoneTooLong = daysDiff > TOO_MANY_DAYS;
    if(beenGoneTooLong) {
        setLastVisited(Date());
    }
    return beenGoneTooLong;
};

const isFirstTimeVisitor = () => {
    
    let cookieValue, isFirstVisit = true;

    if (document.cookie !== '') {
        cookieValue = document.cookie.replace(/(?:(?:^|.*;\s*)first_time\s*\=\s*([^;]*).*$)|^.*$/, "$1");
        isFirstVisit = (cookieValue === 'true');
    }
    return isFirstVisit;
};

const removeFirstTimeVisitorCookie = () => {
    document.cookie = `${FIRST_TIME}= ; expires = Thu, 01 Jan 1970 00:00:00 GMT;`; 
};

export const cookieHandler = {
    setFirstTimeVisitorCookie,
    isFirstTimeVisitor,
    removeFirstTimeVisitorCookie,
    setLastVisitedCookie,
    hasUserBeenAwayTooLong
};

const readCookie = name => {
	var nameEQ = name + "=";
	var ca = document.cookie.split(';');
	for(var i=0;i < ca.length;i++) {
		var c = ca[i];
		while (c.charAt(0)==' ') c = c.substring(1,c.length);
		if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length,c.length);
	}
	return null;
}

const setLastVisited = date => {
    const cookieValue = document.cookie.replace(/(?:(?:^|.*;\s*)last_time\s*\=\s*([^;]*).*$)|^.*$/, "$1");
    const cookieToAdd = cookieValue + `${LAST_VISITED}=${date};`;
    document.cookie = cookieToAdd;
};
