import React, { useState } from 'react';
import styled from 'styled-components';
import { FaUserCircle } from 'react-icons/fa';

interface AvatarProps {
    size?: string;
    src?: string;
}

const DummyAvatar = styled(FaUserCircle)<{ size?: string }>`
    color: #dfe5e7;
    height: ${(props) => props.size ?? '4rem'};
    width: ${(props) => props.size ?? '4rem'};
    cursor: pointer;
`;

const ImageAvatar = styled.img<{ size?: string; isLoaded: boolean }>`
    height: ${(props) => props.size ?? '4rem'};
    width: ${(props) => props.size ?? '4rem'};
    cursor: pointer;
    border-radius: 50%;
    object-fit: cover;
    display: ${(props) => (props.isLoaded ? 'inherit' : 'none')};
`;

const AvatarContainer = styled.span``;

const Avatar: React.FC<AvatarProps> = (props: AvatarProps) => {
    const [imageLoaded, setImageLoaded] = useState(false);
    return (
        <AvatarContainer>
            {props.src && (
                <ImageAvatar
                    src={props.src}
                    size={props.size}
                    onLoad={() => setImageLoaded(true)}
                    isLoaded={imageLoaded}
                />
            )}
            {(!props.src || (props.src && !imageLoaded)) && <DummyAvatar size={props.size} />}
        </AvatarContainer>
    );
};

export default Avatar;
