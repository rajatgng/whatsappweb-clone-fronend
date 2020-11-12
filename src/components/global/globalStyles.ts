import styled from 'styled-components';
import { IconType } from 'react-icons';

export const HeaderPanel = styled.header`
    background-color: #ededed;
    height: 6rem;
`;

export const Input = styled.input`
    border: 0.1rem solid #fff;
    border-radius: 2rem;
    width: 100%;
    min-height: 3.5rem;
    outline: none;
    padding: 0 1.5rem;
    font-size: 1.5rem;
`;

export const Icon = (IconName: IconType, style?: { size?: string; color?: string }) => styled(IconName)`
    color: ${() => style?.color ?? '#919191'};
    height: ${() => style?.size ?? '2.4rem'};
    width: ${() => style?.size ?? '2.4rem'};
    cursor: pointer;
`;

export const IconButton = styled.button`
    display: inline-flex;
    outline: none;
    padding: 0.8rem;
    border-radius: 50%;
    border-color: transparent;
    border-width: 0;
    :focus {
        background-color: rgba(0, 0, 0, 0.1);
    }
    transition: background-color 250ms ease-out;
`;

export const ScrollBarContainer = styled.div`
    overflow: auto;
    //scroll-behavior: smooth;

    /* width */
    ::-webkit-scrollbar {
        width: 0.6rem;
    }

    /* Track */
    ::-webkit-scrollbar-track {
        background: #fff;
    }

    /* Handle */
    ::-webkit-scrollbar-thumb {
        background: rgba(0, 0, 0, 0.25);
    }

    /* Handle on hover */
    ::-webkit-scrollbar-thumb:hover {
        background: rgba(0, 0, 0, 0.3);
    }
`;

export const EllipsisTextContainer = styled.span`
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
`;

export const TitleText = styled(EllipsisTextContainer)`
    font-size: 1.7rem;
    font-weight: 400;
`;

export const DateText = styled.span`
    font-size: 1.2rem;
    font-weight: 200;
    margin-left: 0.6rem;
    white-space: pre;
`;

export const DescriptionText = styled(EllipsisTextContainer)`
    font-size: 1.4rem;
    font-weight: 300;
    margin-left: 0.3rem;
`;
