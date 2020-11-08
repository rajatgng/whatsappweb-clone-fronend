import React, { useState } from 'react';
import styled from 'styled-components';
import { HeaderPanel, Icon, IconButton, Input, ScrollBarContainer } from 'components/global/globalStyles';
import Avatar from 'components/Avatar/Avatar';
import { MdMoreVert, MdSearch, MdMood, MdAttachFile, MdMic, MdClose, MdGif, MdSend } from 'react-icons/md';
import { BiNote } from 'react-icons/bi';
import ChatTextMessage from '../../components/ChatTextMessage/ChatTextMessage';
import { dummyMessage } from '../../assets/dummyData';
import { MessageModel } from '../../models/MessageModel';
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

const ChatContainer: React.FC<ChatContainerProps> = (props: ChatContainerProps) => {
    const [textMessage, setTextMessage] = useState('');
    const [messages, setMessages] = useState<Array<MessageModel>>(dummyMessage);
    const [openEmojiInput, setOpenEmojiInput] = useState(false);
    const [selectedEmojiInput, setSelectedEmojiInput] = useState<EmojiType>();

    const messageOnChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        setTextMessage(event.target.value);
    };

    const sendMessageHandler = () => {
        if (messages.length > 0) {
            const newMessage: MessageModel = {
                id: messages.length + 1,
                message: textMessage,
                sender_id: 1,
                created_at: messages.length + 1,
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
            <ChattingPanel>
                {/*<div style={{ height: '300rem' }}>*/}
                {messages
                    .sort((a, b) => a.created_at - b.created_at)
                    .map((item, index) => (
                        <ChatTextMessage
                            key={index}
                            currentMessage={item}
                            previousMessage={index - 1 >= 0 ? messages[index - 1] : null}
                            nextMessage={index + 1 < messages.length ? messages[index + 1] : null}
                            loggedInUserId={1}
                        />
                    ))}
                {/*</div>*/}
            </ChattingPanel>
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
