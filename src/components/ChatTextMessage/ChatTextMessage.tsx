import React from 'react';
import styled from 'styled-components';
import { MessageModel } from '../../models/MessageModel';

interface ChatTextMessageProps {
    currentMessage: MessageModel;
    previousMessage: MessageModel | null;
    nextMessage: MessageModel | null;
    loggedInUserId: number;
}

const SWrapper = styled.div`
    padding: 0 9rem;
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

const ChatTextMessage: React.FC<ChatTextMessageProps> = (props: ChatTextMessageProps) => {
    const isReceived = props.loggedInUserId !== props.currentMessage.sender_id;
    const firstOfType = props.currentMessage.sender_id !== props.previousMessage?.sender_id;
    const lastOfType = props.currentMessage.sender_id !== props.nextMessage?.sender_id;
    const Wrapper = isReceived ? ReceivedWrapper : SentWrapper;
    const MessageContainer = isReceived ? ReceivedMessageContainer : SentMessageContainer;
    const MessagePointer = isReceived ? ReceivedMessagePointer : SentMessagePointer;
    return (
        <Wrapper>
            {firstOfType && <MessagePointer />}
            <MessageContainer firstOfType={firstOfType} lastOfType={lastOfType}>
                {props.currentMessage.message}
            </MessageContainer>
        </Wrapper>
    );
};

export default ChatTextMessage;
