import React from 'react';
import styled from 'styled-components';
import { HeaderPanel, Icon, IconButton } from 'components/global/globalStyles';
import SearchBar from 'components/SearchBar/SearchBar';
import { MdChat, MdDonutLarge, MdMoreVert } from 'react-icons/md';
import Avatar from 'components/Avatar/Avatar';
import RoomModel from 'models/RoomModel';
import RoomListContainer from 'container/RoomListContainer/RoomListContainer';

interface ChatListAndActionsContainerProps {
    setSelectedChatRoomId: (id: number) => void;
    selectedChatRoom?: RoomModel;
    rooms: RoomModel[];
}
const Wrapper = styled.div`
    flex-grow: 3;
    flex-basis: 30%;
    min-width: 0;
`;

const HeaderContent = styled.div`
    padding: 1rem 1.6rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
`;

const RightActions = styled.div`
    button:not(:last-child) {
        margin-right: 1rem;
    }
`;

const StatusIcon = Icon(MdDonutLarge);
const ChatIcon = Icon(MdChat);
const MoreVertIcon = Icon(MdMoreVert);

const ChatListAndActionsContainer: React.FC<ChatListAndActionsContainerProps> = (
    props: ChatListAndActionsContainerProps,
) => {
    return (
        <Wrapper>
            <HeaderPanel>
                <HeaderContent>
                    <Avatar src="https://picsum.photos/200/400" />
                    <RightActions>
                        <IconButton>
                            <StatusIcon />
                        </IconButton>
                        <IconButton>
                            <ChatIcon />
                        </IconButton>
                        <IconButton>
                            <MoreVertIcon />
                        </IconButton>
                    </RightActions>
                </HeaderContent>
            </HeaderPanel>
            <SearchBar onChange={(text) => console.log(text)} />
            <RoomListContainer
                rooms={props.rooms}
                selectedRoom={props.selectedChatRoom}
                setSelectedRoomId={props.setSelectedChatRoomId}
            />
        </Wrapper>
    );
};

export default ChatListAndActionsContainer;
