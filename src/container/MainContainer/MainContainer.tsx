import React, { useState } from 'react';
import styled from 'styled-components';
import ChatContainer from 'container/ChatContainer/ChatContainer';
import ChatListAndActionsContainer from 'container/ChatListAndActionsContainer/ChatListAndActionsContainer';
import RoomModel from '../../models/RoomModel';
import { getRooms } from '../../assets/dummyData';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface MainContainerProps {}

const StyledMainContainer = styled.div`
    background-color: white;
    z-index: 100;
    box-shadow: 0 0.1rem 0.2rem #ccc;
    display: flex;
    width: 100%;
    max-width: 140rem;
    height: 100%;

    @media screen and (min-width: 1400px) {
        height: calc(100% - 4rem);
        margin: 0 2rem;
    }
`;

const ChatAndInfoContainer = styled.div`
    width: 70%;
    display: flex;
`;

const InfoContainer = styled.div`
    flex: 2;
    height: 100%;
    background-color: yellow;
    z-index: 999;
    @media screen and (max-width: 1024px) {
        flex-basis: 100%;
    }
`;

const NoRoomSelectedContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
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
            <ChatAndInfoContainer>
                {selectedChatRoomId ? (
                    <ChatContainer
                        onChatContainerHeaderClick={() => setIsInfoContainerOpen(true)}
                        isInfoContainerOpen={isInfoContainerOpen}
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
                        <h1>hhhhhhhhhh</h1>
                    </NoRoomSelectedContainer>
                )}
                {isInfoContainerOpen && <InfoContainer onClick={() => setIsInfoContainerOpen(false)} />}
            </ChatAndInfoContainer>
        </StyledMainContainer>
    );
};

export default MainContainer;
