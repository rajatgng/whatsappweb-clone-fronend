// only iso string format or YYYY-MM-DD
export const sortByChronology = (a: string, b: string) => {
    if (a < b) {
        return -1;
    } else if (a > b) {
        return 1;
    } else {
        return 0;
    }
};

export const sortByReverseChronology = (a: string, b: string) => {
    //most recent first
    if (a < b) {
        return 1;
    } else if (a > b) {
        return -1;
    } else {
        return 0;
    }
};

export default { sortByReverseChronology, sortByChronology };
