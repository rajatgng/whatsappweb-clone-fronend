import {} from 'styled-components';

const lightTheme = {
    color: {
        //background-color
        bg: {
            outerBg: '#e5ddd5',
            outerBgStripe: '#489789',
            default: '#ffffff',
            header: '#ededed',
            headerSecondary: '#00BFA5',
            footer: '#f0f0f0',
            incomingMessage: '#dcf8c6',
            noContent: '#faf9fa',
            avatar: '#dfe5e7',
            searchContainer: '#f6f6f6',
            notification: '#06d755',
            cardHover: '#f5f5f5',
            cardSelected: '#ebebeb',
            scrollBarDefault: '#ffffff',
            conversationPanel: '#e5ddd5', //same as outerBg
            conversationDate: 'rgba(225, 245, 254, 0.92)',
        },
        text: {
            default: '#000000',
            secondary: '#ffffff',
            conversation: '#303030',
            green: '#009688',
            conversationSubscript: 'rgba(0, 0, 0, 0.45)',
            shadow: 'rgba(255, 255, 255, 0.4)',
        },
        other: {
            shadowRgb: '0, 0, 0',
            iconDefault: '#919191',
            iconArrow: '#00a5f4',
            iconTickSeen: '#4fc3f7',
            iconEmojiSelected: '#009688',
            cardContainerBorder: '#f2f2f2',
            inputBorder: '#ffffff',
            borderStrong: 'rgba(0, 0, 0, 0.08)',
        },
    },
};

export default lightTheme;

type Theme = typeof lightTheme;

declare module 'styled-components' {
    // eslint-disable-next-line
    export interface DefaultTheme extends Theme {}
}
