import React, { useState } from 'react';
import styled from 'styled-components';
import Avatar from 'components/Avatar/Avatar';
import { MdDone, MdDoneAll, MdVolumeOff, MdExpandMore, MdVideocam } from 'react-icons/md';
import { Icon, TitleText, DescriptionText, DateText } from 'components/global/globalStyles';

export enum MessageStatus {
    SENT,
    DELIVERED,
    SEEN,
}

const SentIcon = Icon(MdDone, { size: '1.8rem' });
const DeliveredIcon = Icon(MdDoneAll, { size: '1.8rem' });
const SeenIcon = Icon(MdDoneAll, { size: '1.8rem', color: '#4fc3f7' });
const ExpandMoreIcon = Icon(MdExpandMore, { size: '2.8rem' });
const MuteIcon = Icon(MdVolumeOff, { size: '2rem' });

interface ChatCardProps {
    muted?: boolean;
    selected?: boolean;
    messageStatus?: MessageStatus;
    unreadCount?: number;
    onClick: (e: React.MouseEvent) => void;
    title: string;
    description?: string;
    date?: string;
}

const RoomCardContainer = styled.div<{ selected?: boolean }>`
    cursor: pointer;
    height: 7.5rem;
    display: flex;
    padding: 0 1.3rem;
    align-items: center;
    // active : #ebebeb  hover:f5f5f5
    background-color: ${({ selected }) => (selected ? '#ebebeb' : '#fff')};
    ${({ selected }) =>
        !selected &&
        `
    :hover {
        background-color: #f5f5f5;
    }
    `}
`;

const Content = styled.div`
    border-top: 0.15rem solid #f2f2f2;
    padding-left: 1.3rem;
    display: flex;
    flex-direction: column;
    flex: 1;
    justify-content: center;
    height: 100%;
    overflow: hidden;
`;

const SpaceBetweenContainer = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
`;

const LastMessageAndActionContainer = styled(SpaceBetweenContainer)`
    min-height: 2.8rem;
`;

const ActionContainer = styled.div`
    display: flex;
    align-items: center;
    margin-left: 0.6rem;
`;

const LastChatMessageContainer = styled.div`
    display: flex;
    align-items: center;
    overflow: hidden;
`;

const UnreadMessageCount = styled.div`
    height: 2rem;
    width: 2rem;
    border-radius: 50%;
    background-color: #06d755;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-right: 0.5rem;
    color: #fff;
    font-size: 1.2rem;
    text-align: center;
`;

const RoomCard: React.FC<ChatCardProps> = (props: ChatCardProps) => {
    const [isHovered, setIsHovered] = useState(false);

    const { messageStatus, muted, selected, unreadCount } = props;

    const MessageStatusIcon = () => {
        if (messageStatus === MessageStatus.DELIVERED) {
            return <DeliveredIcon />;
        } else if (messageStatus === MessageStatus.SEEN) {
            return <SeenIcon />;
        } else {
            return <SentIcon />;
        }
    };
    return (
        <RoomCardContainer
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            selected={selected}
            onClick={(e) => props.onClick(e)}
        >
            <Avatar size={'5rem'} />
            <Content>
                <SpaceBetweenContainer>
                    <TitleText>{props.title}</TitleText>
                    <DateText>{props.date}</DateText>
                </SpaceBetweenContainer>
                <LastMessageAndActionContainer>
                    <LastChatMessageContainer>
                        <span>
                            <MessageStatusIcon />
                        </span>
                        <DescriptionText>{props.description}</DescriptionText>
                    </LastChatMessageContainer>
                    <ActionContainer>
                        {unreadCount && <UnreadMessageCount>{unreadCount}</UnreadMessageCount>}
                        {muted && <MuteIcon />}
                        {isHovered && <ExpandMoreIcon />}
                    </ActionContainer>
                </LastMessageAndActionContainer>
            </Content>
        </RoomCardContainer>
    );
};

export default RoomCard;
