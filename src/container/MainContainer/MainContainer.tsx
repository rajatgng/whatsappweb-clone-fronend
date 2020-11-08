import React from 'react';
import styled from 'styled-components';
import ChatContainer from 'container/ChatContainer/ChatContainer';
import ChatListAndActionsContainer from 'container/ChatListAndActionsContainer/ChatListAndActionsContainer';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface MainContainerProps {}

const StyledMainContainer = styled.div`
    position: absolute;
    background-color: white;
    z-index: 100;
    box-shadow: 0 0.1rem 0.2rem #ccc;
    display: flex;
    width: 100%;
    max-width: 140rem;
    height: 100%;

    @media screen and (min-width: 1400px) {
        top: 2rem;
        height: calc(100% - 4rem);
        left: 50%;
        transform: translateX(-50%);
    }
`;

const MainContainer: React.FC<MainContainerProps> = (props: MainContainerProps) => {
    return (
        <StyledMainContainer>
            <ChatListAndActionsContainer />
            <ChatContainer />
        </StyledMainContainer>
    );
};

export default MainContainer;
