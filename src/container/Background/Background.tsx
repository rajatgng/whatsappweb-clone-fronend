import React, { ReactNode } from 'react';
import styled from 'styled-components';

interface BackgroundProps {
    children: ReactNode;
}

const BackgroundContainer = styled.div`
    background-color: ${(p) => p.theme.color.bg.outerBg};
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    width: 100vw;
    ::after {
        background-color: ${(p) => p.theme.color.bg.outerBgStripe};
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
