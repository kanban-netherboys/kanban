import { User } from './user.model';

export interface Task {
    title: string;
    description: string;
    status: string;
    progressStatus: number;
    blocked: boolean;
    color: string;
    id: number;
    priority?: number;
    userList?: Array<User>;
}
