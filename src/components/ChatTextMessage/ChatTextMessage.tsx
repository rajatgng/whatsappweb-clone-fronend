import React from 'react';
import styled, { useTheme } from 'styled-components';
import MessageModel from 'models/MessageModel';
import { getTimeIn12HFormat, textualDateFormat } from 'utils/dateAndTimeUtils';
import { Icon } from 'components/global/globalStyles';
import { MdDoneAll } from 'react-icons/md';

const SeenIcon = Icon(MdDoneAll, { size: '1.5rem' });

interface ChatTextMessageProps {
    currentMessage: MessageModel;
    previousMessage: MessageModel | null | undefined;
    nextMessage: MessageModel | null | undefined;
    loggedInUserId: number;
}

const SWrapper = styled.div`
    padding: 0 9%;
    display: flex;
`;

const SentWrapper = styled(SWrapper)``;

const ReceivedWrapper = styled(SWrapper)`
    flex-direction: row-reverse;
`;

const SMessageContainer = styled.div<{ firstOfType?: boolean; lastOfType?: boolean }>`
    border-radius: 0.8rem;
    box-shadow: 0 0.1rem 0.05rem rgba(${(p) => p.theme.color.other.shadowRgb}, 0.13);
    overflow-wrap: break-word;
    margin-bottom: 0.2rem;
    ${({ lastOfType }) =>
        lastOfType &&
        `
            margin-bottom: 1.2rem;
        `};
    padding: 0.6rem 0.7rem 0.2rem 0.9rem;
    font-size: 1.42rem;
    line-height: 2rem;
    z-index: 9;
    max-width: 65%;
    color: ${(p) => p.theme.color.text.conversation};

    @media screen and (max-width: 1300px) {
        max-width: 75%;
    }
    @media screen and (max-width: 1024px) {
        max-width: 85%;
    }
    @media screen and (max-width: 900px) {
        max-width: 95%;
    }
`;

const SentMessageContainer = styled(SMessageContainer)`
    background-color: ${(p) => p.theme.color.bg.default};
    ${({ firstOfType }) =>
        firstOfType &&
        `
        border-top-left-radius: 0;
    `};
`;

const ReceivedMessageContainer = styled(SMessageContainer)`
    background-color: ${(p) => p.theme.color.bg.incomingMessage};
    ${({ firstOfType }) =>
        firstOfType &&
        `
        border-top-right-radius: 0;
    `};
`;

const SMessagePointer = styled.span`
    width: 0;
    height: 0;
    z-index: 99;
`;

const ReceivedMessagePointer = styled(SMessagePointer)`
    border-top: 1.2rem solid ${(p) => p.theme.color.bg.incomingMessage};
    border-right: 1rem solid transparent;
    margin-right: -1rem;
    border-top-right-radius: 0.1rem;
`;

const SentMessagePointer = styled(SMessagePointer)`
    border-top: 1.2rem solid ${(p) => p.theme.color.bg.default};
    border-left: 1rem solid transparent;
    margin-left: -1rem;
    border-top-left-radius: 0.1rem;
`;

const DateViewContainer = styled.div`
    padding: 0 9%;
    display: flex;
    justify-content: center;
    align-items: center;
`;
const DateView = styled.div`
    text-align: center;
    padding: 0.6rem 1.2rem 0.6rem;
    margin-bottom: 1.2rem;
    background-color: ${(p) => p.theme.color.bg.conversationDate};
    border-radius: 0.75rem;
    text-shadow: 0 0.1rem 0 ${(p) => p.theme.color.text.shadow};
    box-shadow: 0 0.1rem 0.05rem rgba(${(p) => p.theme.color.other.shadowRgb}, 0.13);
    font-size: 1.25rem;
    line-height: 2.1rem;
    text-transform: uppercase;
`;

const SubScript = styled.div`
    font-size: 1.1rem;
    color: ${(p) => p.theme.color.text.conversationSubscript};
    float: right;
    margin-top: 0.4rem;
    margin-left: 1rem;
    line-height: 1.5rem;
    display: flex;
    align-items: center;
`;

const TimeView = styled.div`
    margin-right: 0.3rem;
`;

const ChatTextMessage: React.FC<ChatTextMessageProps> = (props: ChatTextMessageProps) => {
    const isReceived = props.loggedInUserId !== props.currentMessage.sender_id;
    const firstOfType = props.currentMessage.sender_id !== props.previousMessage?.sender_id;
    const lastOfType = props.currentMessage.sender_id !== props.nextMessage?.sender_id;

    const Wrapper = isReceived ? ReceivedWrapper : SentWrapper;
    const MessageContainer = isReceived ? ReceivedMessageContainer : SentMessageContainer;
    const MessagePointer = isReceived ? ReceivedMessagePointer : SentMessagePointer;

    const currentMsgDate = new Date(props.currentMessage.created_at).toLocaleDateString();
    const previousMsgDate = props.previousMessage
        ? new Date(props.previousMessage.created_at).toLocaleDateString()
        : null;
    const showDate = currentMsgDate !== previousMsgDate;

    const theme = useTheme();

    return (
        <>
            {showDate && (
                <DateViewContainer>
                    <DateView>{textualDateFormat(props.currentMessage.created_at)}</DateView>
                </DateViewContainer>
            )}
            <Wrapper>
                {firstOfType && <MessagePointer />}
                <MessageContainer firstOfType={firstOfType} lastOfType={lastOfType}>
                    {props.currentMessage.message}
                    <SubScript>
                        <TimeView>{getTimeIn12HFormat(props.currentMessage.created_at)}</TimeView>
                        <span>
                            {' '}
                            <SeenIcon color={theme.color.other.iconTickSeen} />
                        </span>
                    </SubScript>
                </MessageContainer>
            </Wrapper>
        </>
    );
};

export default ChatTextMessage;
