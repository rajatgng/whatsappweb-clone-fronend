import React, { useState } from 'react';
import styled from 'styled-components';
import { Card, HeaderPanel, Icon, ScrollBarContainer, TitleText, DateText } from 'components/global/globalStyles';
import { MdCameraAlt, MdClose } from 'react-icons/md';
import RoomModel, { RoomCategory } from 'models/RoomModel';
import Avatar from 'components/Avatar/Avatar';

interface InfoContainerProps {
    onClick: () => void;
    selectedRoom: RoomModel;
}

const CloseIcon = styled(Icon(MdClose))`
    margin-right: 3rem;
`;

const CameraIcon = styled(Icon(MdCameraAlt))`
    color: ${(p) => p.theme.color.text.secondary};
`;
const Wrapper = styled.div`
    height: 100%;
    background-color: ${(p) => p.theme.color.bg.header};
    z-index: 999;
    flex-grow: 3.5;
    flex-basis: 35%;
    min-width: 0;
    @media screen and (max-width: 1024px) {
        flex-basis: 70%;
    }
    display: flex;
    flex-direction: column;
`;

const StyledHeaderPanel = styled(HeaderPanel)`
    border-left: 0.1rem solid ${(p) => p.theme.color.other.borderStrong};
    display: flex;
    align-items: center;
    padding: 1rem 1.6rem;
    z-index: 999;
`;

const AvatarContainer = styled.div`
    align-self: center;
    position: relative;
`;

const AvatarOverlay = styled.div`
    position: absolute;
    background-color: rgba(${(p) => p.theme.color.other.shadowRgb}, 0.3);
    border-radius: 50%;
    top: 0;
    left: 0;
    height: 20rem;
    width: 20rem;
    display: flex;
    justify-content: center;
    align-items: center;
    color: ${(p) => p.theme.color.text.secondary};
    font-size: 1.5rem;
    font-weight: 300;
    flex-direction: column;
    text-align: center;
    cursor: pointer;
`;

const NameAndDescriptionContainer = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 2rem;
    font-weight: 300;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
`;
const StyledTitleText = styled(TitleText)`
    font-size: 2rem;
`;

const InfoContainer: React.FC<InfoContainerProps> = (props: InfoContainerProps) => {
    const [showAvatarOverlay, setShowAvatarOverlay] = useState(false);
    return (
        <Wrapper>
            <StyledHeaderPanel>
                <span>
                    <CloseIcon onClick={props.onClick} />
                </span>
                <TitleText>
                    {props.selectedRoom.category === RoomCategory.GROUP ? 'Group Info' : 'Contact Info'}
                </TitleText>
            </StyledHeaderPanel>
            <ScrollBarContainer>
                <Card>
                    <AvatarContainer
                        onMouseEnter={() => setShowAvatarOverlay(true)}
                        onMouseLeave={() => setShowAvatarOverlay(false)}
                    >
                        <Avatar size={'20rem'} />
                        {props.selectedRoom.category === RoomCategory.GROUP && showAvatarOverlay && (
                            <AvatarOverlay>
                                <CameraIcon />
                                <br />
                                CHANGE <br />
                                GROUP ICON
                            </AvatarOverlay>
                        )}
                    </AvatarContainer>
                    <NameAndDescriptionContainer>
                        <StyledTitleText>{props.selectedRoom.room_name}</StyledTitleText>
                    </NameAndDescriptionContainer>
                    {props.selectedRoom.category === RoomCategory.GROUP && (
                        <DateText style={{ fontSize: '1.3rem' }}>Created at 5/23/2015 at 12 PM</DateText>
                    )}
                </Card>
            </ScrollBarContainer>
        </Wrapper>
    );
};

export default InfoContainer;
