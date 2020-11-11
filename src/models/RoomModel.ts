import MessageModel from 'models/MessageModel';
import UserModel from 'models/UserModel';

export enum RoomCategory {
    PERSONAL = 'PERSONAL',
    GROUP = 'GROUP',
}

export default interface RoomModel {
    id: number;
    messages: Array<MessageModel> | null;
    room_name: string;
    members: Array<UserModel>;
    category: RoomCategory;
}
