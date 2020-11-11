export const getTimeIn12HFormat = (time: Date | string) => {
    if (typeof time === 'string') {
        return new Date(time).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
    } else {
        return time.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
    }
};

export const textualDateFormat = (date: Date | string, showTime?: boolean) => {
    const d = new Date(date);
    const newTodayDate = new Date().toLocaleDateString().split('/').reverse().join('');
    const prevDate = new Date(Date.now() - 864e5);
    const tMinus6Days = new Date();
    tMinus6Days.setDate(tMinus6Days.getDate() - 6);

    const newD = d.toLocaleDateString().split('/').reverse().join('');
    const newPrevDate = prevDate.toLocaleDateString().split('/').reverse().join('');
    const newtMinus6Days = tMinus6Days.toLocaleDateString().split('/').reverse().join('');

    let returnText;
    if (newD === newTodayDate) {
        if (showTime) {
            returnText = getTimeIn12HFormat(d);
        } else {
            returnText = 'Today';
        }
    } else if (newD === newPrevDate) {
        returnText = 'Yesterday';
    } else if (newD >= newtMinus6Days) {
        returnText = d.toLocaleDateString('en-US', { weekday: 'long' });
    } else {
        returnText = d.toLocaleDateString();
    }

    return returnText;
};

export default { getTimeIn12HFormat, textualDateFormat };
