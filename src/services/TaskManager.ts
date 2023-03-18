import ModelsType from "../types/models.type";
import { ObjectId } from "bson";
import { TaskData } from "../types/modelData.type";

export class TaskManager {

    models: ModelsType;

    constructor(models: ModelsType) {
        this.models = models;
    }

    create = async (userId: ObjectId | string, taskData: TaskData) => {
        try {
            // TODO: this should happen in task pre-save validation
            const newTask = await new this.models.Task(taskData).save();
            const userDoc = await this.models.User.findById(userId);
            if (userDoc) {
                userDoc.tasks = userDoc.tasks!.concat(newTask._id);
                await userDoc.save();
            } else {
                throw new Error('Couldn\'t find user');
            }
            return newTask._id;
        } catch (e: any) {
            throw new Error(`Failed to create a new task. ${e.message}`);
        }
    };

    getAll = async (userId: ObjectId | string) => {
        try {
            const userDoc = await this.models.User.findById(userId);
            if(!userDoc) throw new Error(`Cannot get tasks for not registered user: ${userId}`);
            const tasks = await this.models.Task.find({ '_id': { $in: userDoc.tasks } });
            return tasks;
        } catch(e: any) {
            throw new Error(`Failed to get tasks. ${e.message}`);
        }
    };

    getById = async (taskId: ObjectId | string) => {
        const taskDoc = await this.models.Task.findById(taskId);
        if(!taskDoc) throw new Error('Task not found');
        return taskDoc;
    };

    update = async (taskId: ObjectId | string, data: Partial<TaskData>) => {
        try {
            const taskDoc = await this.models.Task.findOneAndUpdate({ _id: taskId }, data, { new: true });
            return taskDoc;
        } catch (e: any) {
            throw new Error(`Failed to edit task. ${e.message}`);
        }
    }

    delete = async (taskId: ObjectId | string)=> {
        const deleted = await this.models.Task.deleteOne({ _id: taskId }).catch((e: any) => {
                throw new Error(`Unable to delete task: ${e.message}`);
            });
        return deleted;
    }
}