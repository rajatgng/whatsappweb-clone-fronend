import React, { useRef, useState } from 'react';
import styled, { keyframes } from 'styled-components';
import { MdSearch, MdArrowBack, MdClose } from 'react-icons/md';
import { Input } from 'components/global/globalStyles';

interface SearchBarProps {
    onChange: (text: string) => void;
}

const SearchBarWrapper = styled.div<{ isInputFocused: boolean }>`
    background-color: ${(props) => (props.isInputFocused ? '#fff' : '#f6f6f6')};
    position: relative;
    height: 5rem;
    padding: 0.6rem 1rem;
    transition: box-shadow 150ms ease-out, background 250ms ease-out;
    box-shadow: 0 0.1rem 0.1rem rgba(0, 0, 0, 0.08);
    ${({ isInputFocused }) =>
        isInputFocused &&
        `
    box-shadow: 0 0.2rem 0.3rem rgba(0, 0, 0, 0.1);
    `}
`;

const enlargeAnimation = keyframes`
 0% { transform: translateY(-50%) scale(0.5) }
 100% {transform: translateY(-50%) scale(1) ; }
`;

const SearchIcon = styled(MdSearch)`
    color: #b3b3b3;
    font-size: 2rem;
    position: absolute;
    left: 2.5rem;
    top: 50%;
    transform: translateY(-50%) scale(1);
    cursor: pointer;
    animation: ${enlargeAnimation} 180ms cubic-bezier(0.4, 0, 0.2, 1);
`;

const rotateAnimation = keyframes`
 0% { transform: translateY(-50%) rotate(-90deg) }
 100% { transform: translateY(-50%) rotate(0deg) }
`;

const ArrowBackIcon = styled(MdArrowBack)`
    color: #00a5f4;
    font-size: 2.2rem;
    position: absolute;
    left: 2.5rem;
    top: 50%;
    transform: translateY(-50%) rotate(0deg);
    cursor: pointer;
    animation: ${rotateAnimation} 250ms cubic-bezier(0.4, 0, 0.2, 1);
`;

const CloseIcon = styled(MdClose)`
    color: #b3b3b3;
    font-size: 2rem;
    position: absolute;
    right: 2.5rem;
    top: 50%;
    transform: translateY(-50%);
    cursor: pointer;
`;
const StyledInput = styled(Input)`
    padding-left: 6rem;
    padding-right: 4rem;
`;

const SearchBar: React.FC<SearchBarProps> = (props: SearchBarProps) => {
    const inputEl = useRef(null);
    const [isInputFocused, setIsInputFocused] = useState(false);
    const [searchText, setSearchText] = useState('');
    return (
        <SearchBarWrapper isInputFocused={isInputFocused}>
            <StyledInput
                placeholder="Search or start a new chat"
                value={searchText}
                ref={inputEl}
                onFocus={() => {
                    setIsInputFocused(true);
                }}
                onChange={(event) => {
                    setSearchText(event.target.value);
                    props.onChange(event.target.value);
                }}
            />
            {!isInputFocused ? (
                <SearchIcon
                    onClick={() => {
                        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                        // @ts-ignore
                        inputEl.current?.focus();
                    }}
                />
            ) : (
                <ArrowBackIcon
                    onClick={() => {
                        setIsInputFocused(false);
                        setSearchText('');
                    }}
                />
            )}
            {isInputFocused && searchText.length > 0 && (
                <CloseIcon
                    onClick={() => {
                        setSearchText('');
                    }}
                />
            )}
        </SearchBarWrapper>
    );
};

export default SearchBar;
