import React from 'react';
import styled from 'styled-components';
import { HeaderPanel, Icon, IconButton, ScrollBarContainer } from 'components/global/globalStyles';
import SearchBar from 'components/SearchBar/SearchBar';
import { MdChat, MdDonutLarge, MdMoreVert } from 'react-icons/md';
import Avatar from 'components/Avatar/Avatar';
import ChatCard, { MessageStatus } from 'components/ChatCard/ChatCard';

const Wrapper = styled.div`
    width: 30%;
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

const ChatsNavigation = styled(ScrollBarContainer)`
    height: calc(100% - 6rem - 5rem); //6rem for header panel and 5rem for search bar
`;

const StatusIcon = Icon(MdDonutLarge);
const ChatIcon = Icon(MdChat);
const MoreVertIcon = Icon(MdMoreVert);

const ChatListAndActionsContainer: React.FC = () => {
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
            <ChatsNavigation>
                <ChatCard unreadCount={2} />
                <ChatCard unreadCount={5} />
                <ChatCard messageStatus={MessageStatus.SEEN} />
                <ChatCard muted messageStatus={MessageStatus.DELIVERED} />
                <ChatCard selected messageStatus={MessageStatus.SEEN} />
                <ChatCard muted messageStatus={MessageStatus.DELIVERED} />
                <ChatCard messageStatus={MessageStatus.SEEN} />
                <ChatCard muted messageStatus={MessageStatus.DELIVERED} />
                <ChatCard messageStatus={MessageStatus.SEEN} />
                <ChatCard muted messageStatus={MessageStatus.DELIVERED} />
                <ChatCard messageStatus={MessageStatus.SEEN} />
                <ChatCard muted messageStatus={MessageStatus.DELIVERED} />
                <ChatCard unreadCount={2} />
            </ChatsNavigation>
        </Wrapper>
    );
};

export default ChatListAndActionsContainer;
