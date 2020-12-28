import React, { useEffect } from 'react';
import styled from 'styled-components';
import Picker, { IEmojiPickerProps } from 'emoji-picker-react';

type EmojiInputProps = IEmojiPickerProps;

const EmojiInputContainer = styled.div`
    height: 32rem;
    z-index: 999;
    .emoji-picker-react {
        background-color: ${(props) => props.theme.color.bg.header};
        width: 100%;
        .content-wrapper::before {
            display: none;
        }
        .emoji-group {
            :before {
                position: inherit;
                background-color: ${(props) => props.theme.color.bg.header};
            }
        }
        input {
            background-color: #e6e6e6;
        }
    }
`;

const EmojiInput: React.FC<EmojiInputProps> = (props: EmojiInputProps) => {
    useEffect(() => {
        const ele = document.getElementsByClassName('emoji-search')[0];
        ele.setAttribute('placeholder', 'Search for Emoji');
    });
    return (
        <EmojiInputContainer>
            <Picker onEmojiClick={props.onEmojiClick} />
        </EmojiInputContainer>
    );
};

export default EmojiInput;
