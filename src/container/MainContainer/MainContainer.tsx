import React, { useState } from 'react';
import styled from 'styled-components';
import ChatContainer from 'container/ChatContainer/ChatContainer';
import ChatListAndActionsContainer from 'container/ChatListAndActionsContainer/ChatListAndActionsContainer';
import InfoContainer from 'container/InfoContainer/InfoContainer';
import RoomModel from 'models/RoomModel';
import { getRooms } from 'assets/dummyData';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface MainContainerProps {}

const StyledMainContainer = styled.div`
    background-color: ${(p) => p.theme.color.bg.default};
    z-index: 100;
    box-shadow: 0 0.1rem 0.1rem 0 rgba(${(p) => p.theme.color.other.shadowRgb}, 0.06),
        0 0.2rem 0.5rem 0 rgba(${(p) => p.theme.color.other.shadowRgb}, 0.2);
    display: flex;
    width: 100%;
    max-width: 140rem;
    height: 100%;

    @media screen and (min-width: 1400px) {
        height: calc(100% - 4rem);
        margin: 0 2rem;
    }
`;

const NoRoomSelectedContainer = styled.div`
    display: flex;
    flex-grow: 7;
    flex-basis: 70%;
    justify-content: center;
    align-items: center;
    padding: 3rem 0;
    background-color: ${(p) => p.theme.color.bg.noContent};
    border-left: 0.1rem solid rgba(${(p) => p.theme.color.other.shadowRgb}, 0.08);
`;

const MainContainer: React.FC<MainContainerProps> = (props: MainContainerProps) => {
    const [selectedChatRoomId, setSelectedChatRoomId] = useState<number>();
    const [rooms, setRooms] = useState<RoomModel[]>(getRooms);
    const [isInfoContainerOpen, setIsInfoContainerOpen] = useState(false);
    return (
        <StyledMainContainer>
            <ChatListAndActionsContainer
                setSelectedChatRoomId={setSelectedChatRoomId}
                selectedChatRoom={rooms.filter((room) => room.id === selectedChatRoomId)[0]}
                rooms={rooms}
            />
            {selectedChatRoomId ? (
                <ChatContainer
                    onChatContainerHeaderClick={() => setIsInfoContainerOpen(true)}
                    isInfoContainerOpen={isInfoContainerOpen}
                    setIsInfoContainerOpen={setIsInfoContainerOpen}
                    selectedChatRoom={rooms.filter((room) => room.id === selectedChatRoomId)[0]}
                    onMessageSubmit={(message) => {
                        const newRooms = rooms.filter((room) => room.id !== selectedChatRoomId);
                        const room = rooms.filter((room) => room.id === selectedChatRoomId)[0];
                        room.messages?.push(message);
                        newRooms.push(room);
                        setRooms(newRooms);
                    }}
                />
            ) : (
                <NoRoomSelectedContainer>
                    <h1>To get started select the Chat ! </h1>
                </NoRoomSelectedContainer>
            )}
            {selectedChatRoomId && isInfoContainerOpen && (
                <InfoContainer
                    selectedRoom={rooms.filter((room) => room.id === selectedChatRoomId)[0]}
                    onClick={() => setIsInfoContainerOpen(false)}
                />
            )}
        </StyledMainContainer>
    );
};

export default MainContainer;
