import React from 'react';
import styled from 'styled-components';
import MessageModel from 'models/MessageModel';

interface ChatTextMessageProps {
    currentMessage: MessageModel;
    previousMessage: MessageModel | null;
    nextMessage: MessageModel | null;
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
    box-shadow: 0 0.1rem 0.05rem rgba(0, 0, 0, 0.13);
    overflow-wrap: break-word;
    margin-bottom: 0.2rem;
    ${({ lastOfType }) =>
        lastOfType &&
        `
            margin-bottom: 1.2rem;
        `};
    padding: 0.6rem 0.7rem 0.8rem 0.9rem;
    font-size: 1.5rem;
    line-height: 2rem;
    z-index: 9;
    max-width: 65%;

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
    background-color: #fff; //#dcf8c6
    ${({ firstOfType }) =>
        firstOfType &&
        `
        border-top-left-radius: 0;
    `};
`;

const ReceivedMessageContainer = styled(SMessageContainer)`
    background-color: #dcf8c6;
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
    border-top: 1.2rem solid #dcf8c6;
    border-right: 1rem solid transparent;
    margin-right: -1rem;
    border-top-right-radius: 0.1rem;
`;

const SentMessagePointer = styled(SMessagePointer)`
    border-top: 1.2rem solid #fff;
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
    background-color: rgba(225, 245, 254, 0.92);
    border-radius: 0.75rem;
    text-shadow: 0 0.1rem 0 rgba(255, 255, 255, 0.4);
    box-shadow: 0 0.1rem 0.05rem rgba(0, 0, 0, 0.13);
    font-size: 1.25rem;
    line-height: 2.1rem;
    text-transform: uppercase;
`;

const ChatTextMessage: React.FC<ChatTextMessageProps> = (props: ChatTextMessageProps) => {
    const isReceived = props.loggedInUserId !== props.currentMessage.sender_id;
    const firstOfType = props.currentMessage.sender_id !== props.previousMessage?.sender_id;
    const lastOfType = props.currentMessage.sender_id !== props.nextMessage?.sender_id;

    const Wrapper = isReceived ? ReceivedWrapper : SentWrapper;
    const MessageContainer = isReceived ? ReceivedMessageContainer : SentMessageContainer;
    const MessagePointer = isReceived ? ReceivedMessagePointer : SentMessagePointer;

    let currentMsgDate = new Date(props.currentMessage.created_at).toLocaleDateString();
    const previousMsgDate = props.previousMessage
        ? new Date(props.previousMessage.created_at).toLocaleDateString()
        : null;
    const showDate = currentMsgDate !== previousMsgDate;
    const previousDayDate = (+new Date().toLocaleDateString().split('/').reverse().join('') - 1).toString();
    if (currentMsgDate === new Date().toLocaleDateString()) {
        currentMsgDate = 'Today';
    } else if (currentMsgDate.split('/').reverse().join('') === previousDayDate) {
        currentMsgDate = 'Yesterday';
    }
    return (
        <>
            {showDate && (
                <DateViewContainer>
                    <DateView>{currentMsgDate}</DateView>
                </DateViewContainer>
            )}
            <Wrapper>
                {firstOfType && <MessagePointer />}
                <MessageContainer firstOfType={firstOfType} lastOfType={lastOfType}>
                    {props.currentMessage.message}
                </MessageContainer>
            </Wrapper>
        </>
    );
};

export default ChatTextMessage;
