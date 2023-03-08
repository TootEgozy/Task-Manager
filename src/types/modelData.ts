import { ObjectId } from 'bson';

export interface SubTaskData {
    order: number
    text: string
    done: boolean
}

export interface TaskData {
    userId: ObjectId;
    title: string;
    details: string | string[];
    done: boolean;
    subTasks?: SubTaskData[]
}