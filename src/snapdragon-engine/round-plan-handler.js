const getRoundItems = (currentRound, moduleSize, items) => {

    const start = (currentRound - 1) * moduleSize;
    const end = start + moduleSize;
    return items.slice(start, end);
}

export const roundHandler = {
    getRoundItems
};