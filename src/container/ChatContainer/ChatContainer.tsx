import React, { useEffect, useRef, useState } from 'react';
import styled, { keyframes } from 'styled-components';
import { Icon, ScrollBarContainer } from 'components/global/globalStyles';
import { MdExpandMore } from 'react-icons/md';
import ChatTextMessage from 'components/ChatTextMessage/ChatTextMessage';
import MessageModel from 'models/MessageModel';
import RoomModel from 'models/RoomModel';
import { sortByChronology } from 'utils/sortByChronology';
import ChatContainerFooter from 'container/ChatContainerFooter/ChatContainerFooter';
import ChatContainerHeader from '../ChatContainerHeader/ChatContainerHeader';

interface ChatContainerProps {
    selectedChatRoom: RoomModel;
    onMessageSubmit: (message: MessageModel) => void;
    isInfoContainerOpen: boolean;
    onChatContainerHeaderClick: () => void;
}

const iconSize = '2.8rem';

const ExpandMoreIcon = Icon(MdExpandMore, { size: iconSize });

const Wrapper = styled.div<{ isInfoContainerOpen: boolean }>`
    background-color: #e5ddd5;
    position: relative;
    display: flex;
    flex: 3;
    flex-direction: column;
    min-width: 0; // or overflow: hidden;
    @media screen and (max-width: 1024px) {
        ${({ isInfoContainerOpen }) =>
            isInfoContainerOpen &&
            `
        display: none;
    `};
    }
`;

const ChattingPanel = styled(ScrollBarContainer)`
    flex: 1;
    z-index: 999;
    /* Track */
    ::-webkit-scrollbar-track {
        background: transparent;
    }
`;

const ChatTiles = styled.div`
    //Todo: Change URL to Local Db
    background-image: url('https://web.whatsapp.com/img/bg-chat-tile-light_686b98c9fdffef3f63127759e2057750.png');
    background-repeat: repeat;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    opacity: 0.06;
    position: absolute;
`;

const enlargeAnimation = keyframes`
 0% { transform: scale(0); }
 100% {transform: scale(1) ; }
`;

const outLargeAnimation = keyframes`
 0% { transform: scale(1); }
 100% {transform: scale(0) ; }
`;

const ScrollDownBtn = styled.div<{ isUnMounting?: boolean }>`
    height: 4.2rem;
    width: 4.2rem;
    border-radius: 50%;
    background-color: #fff;
    position: absolute;
    right: 1rem;
    bottom: 8rem;
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 999;
    box-shadow: 0 0.1rem 0.1rem 0 rgba(0, 0, 0, 0.06), 0 0.2rem 0.5rem 0 rgba(0, 0, 0, 0.2);
    animation: ${({ isUnMounting }) => (isUnMounting ? outLargeAnimation : enlargeAnimation)} 250ms
        cubic-bezier(0.4, 0, 0.2, 1);
`;

const ChatContainer: React.FC<ChatContainerProps> = (props: ChatContainerProps) => {
    const scrollRef = useRef<HTMLDivElement>(null);
    const [isScrollDownBtnVisible, setIsScrollDownBtnVisible] = useState<boolean>(false);
    const [isUnMounting, setUnMounting] = useState<boolean>(false);
    const [isEmojiInputOpened, setIsEmojiInputOpened] = useState<boolean>(false);

    useEffect(() => {
        scrollToBottom();
    }, [props.selectedChatRoom, props.selectedChatRoom.messages?.length, isEmojiInputOpened]);

    const scrollToBottom = () => {
        if (scrollRef && scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    };

    const onScrollHandler = (event: React.UIEvent<HTMLDivElement>) => {
        const condition =
            event.currentTarget.scrollHeight - (event.currentTarget.scrollTop + event.currentTarget.offsetHeight);
        if (!isScrollDownBtnVisible && condition > 100) {
            setIsScrollDownBtnVisible(true);
        } else if (isScrollDownBtnVisible && condition < 100) {
            setUnMounting(true);
            setTimeout(() => {
                setIsScrollDownBtnVisible(false);
                setUnMounting(false);
            }, 250);
        }
    };

    return (
        <Wrapper isInfoContainerOpen={props.isInfoContainerOpen}>
            <ChatTiles />
            <ChatContainerHeader room={props.selectedChatRoom} onHeaderClick={props.onChatContainerHeaderClick} />
            <ChattingPanel ref={scrollRef} onScroll={onScrollHandler}>
                {props.selectedChatRoom &&
                    props.selectedChatRoom.messages &&
                    props.selectedChatRoom.messages.length > 0 &&
                    props.selectedChatRoom.messages
                        .sort((a, b) => sortByChronology(a.created_at, b.created_at))
                        .map((item, index) => (
                            <ChatTextMessage
                                key={index}
                                currentMessage={item}
                                previousMessage={
                                    props.selectedChatRoom.messages && index - 1 >= 0
                                        ? props.selectedChatRoom.messages[index - 1]
                                        : null
                                }
                                nextMessage={
                                    props.selectedChatRoom.messages &&
                                    index + 1 < props.selectedChatRoom.messages.length
                                        ? props.selectedChatRoom?.messages[index + 1]
                                        : null
                                }
                                loggedInUserId={2}
                            />
                        ))}
            </ChattingPanel>
            {isScrollDownBtnVisible && (
                <ScrollDownBtn isUnMounting={isUnMounting} onClick={scrollToBottom}>
                    <ExpandMoreIcon />
                </ScrollDownBtn>
            )}
            <ChatContainerFooter
                selectedChatRoom={props.selectedChatRoom}
                onMessageSubmit={props.onMessageSubmit}
                emojiInputToggle={(v) => setIsEmojiInputOpened(v)}
            />
        </Wrapper>
    );
};

export default ChatContainer;
