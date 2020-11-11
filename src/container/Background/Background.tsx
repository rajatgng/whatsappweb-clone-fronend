import React, { ReactNode } from 'react';
import styled from 'styled-components';

interface BackgroundProps {
    children: ReactNode;
}

const BackgroundContainer = styled.div`
    background-color: #e5ddd5;
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    width: 100vw;
    ::after {
        background-color: #489789;
        height: 12rem;
        top: 0;
        position: absolute;
        content: '';
        width: 100%;
    }
`;

const Background: React.FC<BackgroundProps> = (props: BackgroundProps) => {
    return <BackgroundContainer>{props.children}</BackgroundContainer>;
};

export default Background;
