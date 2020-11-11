import React from 'react';
import styled from 'styled-components';
import { ScrollBarContainer } from 'components/global/globalStyles';
import { sortByReverseChronology } from '../../utils/sortByChronology';
import RoomCard from 'components/RoomCard/RoomCard';
import RoomModel from 'models/RoomModel';
import { textualDateFormat } from 'utils/dateAndTimeUtils';

interface RoomCardContainerProps {
    rooms: RoomModel[];
    setSelectedRoomId: (id: number) => void;
    selectedRoom?: RoomModel;
}

const RoomLists = styled(ScrollBarContainer)`
    height: calc(100% - 6rem - 5rem); //6rem for header panel and 5rem for search bar
`;

const RoomListContainer: React.FC<RoomCardContainerProps> = (props: RoomCardContainerProps) => {
    return (
        <RoomLists>
            {props.rooms
                .sort((a, b) =>
                    a.messages && b.messages
                        ? sortByReverseChronology(
                              a.messages[a.messages.length - 1].created_at,
                              b.messages[b.messages.length - 1].created_at,
                          )
                        : 0,
                )
                .map(
                    (item) =>
                        item.messages && (
                            <RoomCard
                                key={item.id}
                                onClick={() => props.setSelectedRoomId(item.id)}
                                selected={props.selectedRoom?.id === item.id}
                                date={textualDateFormat(item.messages[item.messages.length - 1].created_at, true)}
                                description={item.messages[item.messages.length - 1].message}
                                title={item.room_name}
                            />
                        ),
                )}
        </RoomLists>
    );
};

export default RoomListContainer;
