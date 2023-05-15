import Models from "../types/models";
import { ObjectId } from "bson";
import { TaskData } from "../types/modelData.type";
import {TaskManagerError} from "../utils/ExpandedError";

export class TaskManager {

    models: Models;

    constructor(models: Models) {
        this.models = models;
    }

    create = async (taskData: TaskData) => {
        try {
            const userDoc = await this.models.User.findById(taskData.userId);
            if (!userDoc) throw new Error('Couldn\'t find user');
            const newTask = await new this.models.Task(taskData).save();
            userDoc.tasks = userDoc.tasks!.concat(newTask._id);
            const user = await userDoc.save();
            return newTask;
        } catch (e: any) {
            throw new TaskManagerError(`Failed to create a new task. ${e.stack}`);
        }
    };

    getAll = async (userId: ObjectId | string) => {
        try {
            const userDoc = await this.models.User.findById(userId);
            if(!userDoc) throw new Error(`Cannot get tasks for not registered user: ${userId}`);
            const tasks = await this.models.Task.find({ $in: userDoc.tasks });
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
            const taskDoc = await this.models.Task.findByIdAndUpdate(taskId, data, { new: true });
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