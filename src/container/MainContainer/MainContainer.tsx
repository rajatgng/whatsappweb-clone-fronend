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

const InfoContainer = styled.div`
    width: 40%;
    height: 100%;
    background-color: yellow;
`;
const MainContainer: React.FC<MainContainerProps> = (props: MainContainerProps) => {
    const [selectedChatRoomId, setSelectedChatRoomId] = useState<number>();
    const [rooms, setRooms] = useState<RoomModel[]>(getRooms);
    return (
        <StyledMainContainer>
            <ChatListAndActionsContainer
                setSelectedChatRoomId={setSelectedChatRoomId}
                selectedChatRoom={rooms.filter((room) => room.id === selectedChatRoomId)[0]}
                rooms={rooms}
            />
            {selectedChatRoomId && (
                <ChatContainer
                    selectedChatRoom={rooms.filter((room) => room.id === selectedChatRoomId)[0]}
                    onMessageSubmit={(message) => {
                        const newRooms = rooms.filter((room) => room.id !== selectedChatRoomId);
                        const room = rooms.filter((room) => room.id === selectedChatRoomId)[0];
                        room.messages?.push(message);
                        newRooms.push(room);
                        setRooms(newRooms);
                    }}
                />
            )}
            {/*<InfoContainer />*/}
        </StyledMainContainer>
    );
};

export default MainContainer;
