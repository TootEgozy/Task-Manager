import ModelsType from "../types/models.type";
import { ObjectId } from "bson";
import { TaskData } from "../types/modelData.type";
import {TaskManagerError} from "../utils/ExpandedError";

export class TaskManager {

    models: ModelsType;

    constructor(models: ModelsType) {
        this.models = models;
    }

    create = async (userId: ObjectId | string, taskData: TaskData) => {
        try {
            const newTask = await new this.models.Task(taskData).save();
            const userDoc = await this.models.User.findById(userId);
            if (!userDoc) throw new Error('Couldn\'t find user');
            userDoc.tasks = userDoc.tasks!.concat(newTask._id);
            await userDoc.save();
            return newTask;
        } catch (e: any) {
            throw new TaskManagerError(`Failed to create a new task. ${e.stack}`);
        }
    };

    getAll = async (userId: ObjectId | string) => {
        try {
            const userDoc = await this.models.User.findById(userId);
            if(!userDoc) throw new Error(`Cannot get tasks for not registered user: ${userId}`);
            const tasks = await this.models.Task.find({ '_id': { $in: userDoc.tasks } });
            return tasks;
        } catch(e: any) {
            throw new TaskManagerError(`Failed to get tasks. ${e.stack}`);
        }
    };

    getById = async (taskId: ObjectId | string) => {
        const taskDoc = await this.models.Task.findById(taskId);
        if(!taskDoc) throw new TaskManagerError(`Task ${taskId} not found`);
        return taskDoc;
    };

    update = async (taskId: ObjectId | string, data: Partial<TaskData>) => {
        try {
            const taskDoc = await this.models.Task.findOneAndUpdate({ _id: taskId }, data, { new: true });
            return taskDoc;
        } catch (e: any) {
            throw new TaskManagerError(`Failed to edit task. ${e.stack}`);
        }
    }

    delete = async (taskId: ObjectId | string)=> {
        const deleted = await this.models.Task.deleteOne({ _id: taskId }).catch((e: any) => {
                throw new TaskManagerError(`Unable to delete task: ${e.stack}`);
            });
        return deleted;
    }
}