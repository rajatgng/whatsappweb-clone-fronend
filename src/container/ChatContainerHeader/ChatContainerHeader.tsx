import React from 'react';
import Avatar from 'components/Avatar/Avatar';
import { DescriptionText, HeaderPanel, Icon, IconButton, TitleText } from 'components/global/globalStyles';
import styled from 'styled-components';
import { MdMoreVert, MdSearch } from 'react-icons/md';
import RoomModel, { RoomCategory } from 'models/RoomModel';

interface ChatContainerHeaderProps {
    room: RoomModel;
    onHeaderClick: () => void;
}

const iconSize = '2.5rem';

const MoreVertIcon = Icon(MdMoreVert, { size: iconSize });
const SearchIcon = Icon(MdSearch, { size: iconSize });

const StyledHeaderPanel = styled(HeaderPanel)`
    border-left: 0.1rem solid #d9d9d9;
    display: flex;
    align-items: center;
    padding: 1rem 1.6rem;
    z-index: 999;
    justify-content: space-between;
`;

const DescriptionContainer = styled.div`
    display: flex;
    flex-direction: column;
    margin: 0 1.5rem;
    min-width: 0;
`;

const ActionContainer = styled.div`
    display: flex;
    margin-left: 1rem;
`;

const RoomDescriptionContainer = styled.div`
    display: flex;
    flex: 1;
    align-items: center;
    min-width: 0; // or overflow: hidden;
    cursor: pointer;
`;

const ChatContainerHeader: React.FC<ChatContainerHeaderProps> = (props: ChatContainerHeaderProps) => {
    return (
        <StyledHeaderPanel>
            <RoomDescriptionContainer onClick={props.onHeaderClick}>
                <Avatar />
                <DescriptionContainer>
                    <TitleText>{props.room.room_name}</TitleText>
                    {props.room.category === RoomCategory.GROUP && (
                        <DescriptionText>Lorem Ipsum, Lorem Ipsum</DescriptionText>
                    )}
                </DescriptionContainer>
            </RoomDescriptionContainer>
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
