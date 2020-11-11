import React from 'react';
import Avatar from 'components/Avatar/Avatar';
import { HeaderPanel, Icon, IconButton } from 'components/global/globalStyles';
import styled from 'styled-components';
import { MdMoreVert, MdSearch } from 'react-icons/md';

interface ChatContainerHeaderProps {
    roomName: string;
}

const iconSize = '2.8rem';

const MoreVertIcon = Icon(MdMoreVert, { size: iconSize });
const SearchIcon = Icon(MdSearch, { size: iconSize });

const StyledHeaderPanel = styled(HeaderPanel)`
    border-left: 0.1rem solid #d9d9d9;
    display: flex;
    align-items: center;
    padding: 1rem 1.6rem;
    z-index: 999;
`;

const DescriptionContainer = styled.div`
    flex: 1;
    display: flex;
    flex-direction: column;
    margin: 0 1.5rem;
    cursor: pointer;
`;

const ActionContainer = styled.div``;

const ChatContainerHeader: React.FC<ChatContainerHeaderProps> = (props: ChatContainerHeaderProps) => {
    return (
        <StyledHeaderPanel>
            <Avatar />
            <DescriptionContainer>
                <h1 style={{ fontSize: '17px', fontWeight: 500 }}>{props.roomName}</h1>
                <h3 style={{ fontSize: '14px', fontWeight: 300 }}>Lorem Ipsum, Lorem Ipsum</h3>
            </DescriptionContainer>
            <ActionContainer>
                <IconButton>
                    <SearchIcon />
                </IconButton>
                <IconButton>
                    <MoreVertIcon />
                </IconButton>
            </ActionContainer>
        </StyledHeaderPanel>
    );
};

export default ChatContainerHeader;
