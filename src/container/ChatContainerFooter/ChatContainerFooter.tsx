import React, { useRef, useState } from 'react';
import { Icon, IconButton, Input } from 'components/global/globalStyles';
import MessageModel from 'models/MessageModel';
import styled from 'styled-components';
import { MdAttachFile, MdClose, MdGif, MdMic, MdMood, MdSend } from 'react-icons/md';
import { BiNote } from 'react-icons/bi';
import RoomModel from 'models/RoomModel';

interface ChatContainerFooterProps {
    selectedChatRoom: RoomModel;
    onMessageSubmit: (message: MessageModel) => void;
    emojiInputToggle: (v: boolean) => void;
}

enum EmojiType {
    EMOJI,
    GIF,
    STICKER,
}

const iconSize = '2.8rem';

const MoodIcon = Icon(MdMood, { size: iconSize });
const AttachFileIcon = Icon(MdAttachFile, { size: iconSize });
const MicIcon = Icon(MdMic, { size: iconSize });
const SendIcon = Icon(MdSend, { size: iconSize });
const CloseIcon = Icon(MdClose, { size: iconSize });
const GifIcon = Icon(MdGif, { size: iconSize });
const StickerIcon = Icon(BiNote, { size: iconSize });

const ColumnContainer = styled.div`
    display: flex;
    flex-direction: column;
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
    //background-color: #ededed;
    background-color: green;
    z-index: 999;
`;

const ChatContainerFooter: React.FC<ChatContainerFooterProps> = (props: ChatContainerFooterProps) => {
    const [textMessage, setTextMessage] = useState('');
    const [openEmojiInput, setOpenEmojiInput] = useState(false);
    const [selectedEmojiInput, setSelectedEmojiInput] = useState<EmojiType>();

    const messageOnChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        setTextMessage(event.target.value);
    };

    const sendMessageHandler = () => {
        if (textMessage.length > 0) {
            const newMessage: MessageModel = {
                id: props.selectedChatRoom.messages ? props.selectedChatRoom.messages.length + 1 : 0,
                message: textMessage,
                sender_id: 1,
                created_at: new Date().toISOString(),
            };
            props.onMessageSubmit(newMessage);
            setTextMessage('');
        }
    };

    const messageSubmitHandler = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            sendMessageHandler();
        }
    };
    const emojiInputToggle = (v: boolean) => {
        setOpenEmojiInput(v);
        props.emojiInputToggle(v);
    };
    return (
        <ColumnContainer>
            {openEmojiInput && <EmojiInput></EmojiInput>}
            <FooterPanel>
                <FooterLeftActions>
                    {openEmojiInput && (
                        <StyledIconButton
                            onClick={() => {
                                emojiInputToggle(false);
                                setSelectedEmojiInput(undefined);
                            }}
                        >
                            <CloseIcon />
                        </StyledIconButton>
                    )}
                    <StyledIconButton
                        onClick={() => {
                            emojiInputToggle(true);
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
        </ColumnContainer>
    );
};

export default ChatContainerFooter;
