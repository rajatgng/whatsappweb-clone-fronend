import React, { useEffect, useRef, useState } from 'react';
import styled, { keyframes } from 'styled-components';
import { HeaderPanel, Icon, IconButton, Input, ScrollBarContainer } from 'components/global/globalStyles';
import Avatar from 'components/Avatar/Avatar';
import {
    MdMoreVert,
    MdSearch,
    MdMood,
    MdAttachFile,
    MdMic,
    MdClose,
    MdGif,
    MdSend,
    MdExpandMore,
} from 'react-icons/md';
import { BiNote } from 'react-icons/bi';
import ChatTextMessage from 'components/ChatTextMessage/ChatTextMessage';
import { dummyMessage } from 'assets/dummyData';
import MessageModel from 'models/MessageModel';
// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface ChatContainerProps {}

enum EmojiType {
    EMOJI,
    GIF,
    STICKER,
}
const iconSize = '2.8rem';

const MoreVertIcon = Icon(MdMoreVert, { size: iconSize });
const SearchIcon = Icon(MdSearch, { size: iconSize });
const MoodIcon = Icon(MdMood, { size: iconSize });
const AttachFileIcon = Icon(MdAttachFile, { size: iconSize });
const MicIcon = Icon(MdMic, { size: iconSize });
const SendIcon = Icon(MdSend, { size: iconSize });
const CloseIcon = Icon(MdClose, { size: iconSize });
const GifIcon = Icon(MdGif, { size: iconSize });
const StickerIcon = Icon(BiNote, { size: iconSize });
const ExpandMoreIcon = Icon(MdExpandMore, { size: iconSize });

const Wrapper = styled.div`
    width: 70%;
    background-color: #e5ddd5;
    position: relative;
    display: flex;
    flex-direction: column;
`;

const StyledHeaderPanel = styled(HeaderPanel)`
    border-left: 0.1rem solid #d9d9d9;
    display: flex;
    align-items: center;
    padding: 1rem 1.6rem;
    z-index: 999;
`;

const InfoContainer = styled.div`
    flex: 1;
    display: flex;
    flex-direction: column;
    margin: 0 1.5rem;
    cursor: pointer;
`;

const ActionContainer = styled.div``;

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

const FooterPanel = styled.div`
    display: flex;
    align-items: center;
    min-height: 6.2rem;
    background-color: #ededed;
    z-index: 999;
    padding: 0.5rem 1rem;
`;

const StyledInput = styled(Input)`
    min-height: 4.2rem;
`;

const FooterLeftActions = styled.div`
    display: flex;
    padding: 0.5rem 1rem;
`;

const FooterRightActions = styled.div`
    display: flex;
    padding: 0.5rem 1rem;
`;

const StyledIconButton = styled(IconButton)<{ selected?: boolean }>`
    :focus {
        background-color: rgba(0, 0, 0, 0);
    }
    ${({ selected }) =>
        selected &&
        `
    svg {
        color: #009688;
    }
    `}
`;

const EmojiInput = styled.div`
    height: 32rem;
    background-color: #ededed;
    z-index: 999;
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
    const [textMessage, setTextMessage] = useState('');
    const scrollRef = useRef<HTMLDivElement>(null);
    const [messages, setMessages] = useState<Array<MessageModel>>(dummyMessage);
    const [openEmojiInput, setOpenEmojiInput] = useState(false);
    const [selectedEmojiInput, setSelectedEmojiInput] = useState<EmojiType>();
    const [isScrollDownBtnVisible, setIsScrollDownBtnVisible] = useState<boolean>(false);
    const [isUnMounting, setUnMounting] = useState<boolean>(false);

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const scrollToBottom = () => {
        if (scrollRef && scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    };

    const messageOnChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        setTextMessage(event.target.value);
    };

    const sendMessageHandler = () => {
        if (messages.length > 0) {
            const newMessage: MessageModel = {
                id: messages.length + 1,
                message: textMessage,
                sender_id: 1,
                created_at: new Date().toISOString(),
            };
            setMessages([...messages, newMessage]);
            setTextMessage('');
        }
    };

    const messageSubmitHandler = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter' && textMessage.length > 0) {
            sendMessageHandler();
        }
    };

    const sortByDate = (a: MessageModel, b: MessageModel) => {
        if (a.created_at < b.created_at) {
            return -1;
        } else if (a.created_at > b.created_at) {
            return 1;
        } else {
            return 0;
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
        <Wrapper>
            <ChatTiles />
            <StyledHeaderPanel>
                <Avatar />
                <InfoContainer>
                    <h1 style={{ fontSize: '17px', fontWeight: 500 }}>Chat Title</h1>
                    <h3 style={{ fontSize: '14px', fontWeight: 300 }}>Lorem Ipsum, Lorem Ipsum</h3>
                </InfoContainer>
                <ActionContainer>
                    <IconButton>
                        <SearchIcon />
                    </IconButton>
                    <IconButton>
                        <MoreVertIcon />
                    </IconButton>
                </ActionContainer>
            </StyledHeaderPanel>
            <ChattingPanel ref={scrollRef} onScroll={onScrollHandler}>
                {messages.sort(sortByDate).map((item, index) => (
                    <ChatTextMessage
                        key={index}
                        currentMessage={item}
                        previousMessage={index - 1 >= 0 ? messages[index - 1] : null}
                        nextMessage={index + 1 < messages.length ? messages[index + 1] : null}
                        loggedInUserId={1}
                    />
                ))}
            </ChattingPanel>
            {isScrollDownBtnVisible && (
                <ScrollDownBtn isUnMounting={isUnMounting} onClick={scrollToBottom}>
                    <ExpandMoreIcon />
                </ScrollDownBtn>
            )}
            {openEmojiInput && <EmojiInput></EmojiInput>}
            <FooterPanel>
                <FooterLeftActions>
                    {openEmojiInput && (
                        <StyledIconButton
                            onClick={() => {
                                setOpenEmojiInput(false);
                                setSelectedEmojiInput(undefined);
                            }}
                        >
                            <CloseIcon />
                        </StyledIconButton>
                    )}
                    <StyledIconButton
                        onClick={() => {
                            setOpenEmojiInput(true);
                            setSelectedEmojiInput(EmojiType.EMOJI);
                        }}
                        selected={selectedEmojiInput === EmojiType.EMOJI}
                    >
                        <MoodIcon />
                    </StyledIconButton>
                    {openEmojiInput && (
                        <>
                            <StyledIconButton
                                selected={selectedEmojiInput === EmojiType.GIF}
                                onClick={() => {
                                    setSelectedEmojiInput(EmojiType.GIF);
                                }}
                            >
                                <GifIcon />
                            </StyledIconButton>
                            <StyledIconButton
                                selected={selectedEmojiInput === EmojiType.STICKER}
                                onClick={() => {
                                    setSelectedEmojiInput(EmojiType.STICKER);
                                }}
                            >
                                <StickerIcon />
                            </StyledIconButton>
                        </>
                    )}
                    <IconButton>
                        <AttachFileIcon />
                    </IconButton>
                </FooterLeftActions>
                <StyledInput
                    placeholder="Type a message"
                    onChange={messageOnChangeHandler}
                    value={textMessage}
                    onKeyDown={messageSubmitHandler}
                />
                <FooterRightActions>
                    <StyledIconButton>
                        {!textMessage.length && <MicIcon />}
                        {!!textMessage.length && <SendIcon onClick={sendMessageHandler} />}
                    </StyledIconButton>
                </FooterRightActions>
            </FooterPanel>
        </Wrapper>
    );
};

export default ChatContainer;
