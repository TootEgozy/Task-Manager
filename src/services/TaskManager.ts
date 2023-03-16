import ModelsType from "../types/models.type";
import { ObjectId } from "bson";
import { TaskData } from "../types/modelData.type";

export class TaskManager {

    models: ModelsType;

    constructor(models: ModelsType) {
        this.models = models;
    }

    createTask = async (userId: ObjectId, taskData: TaskData) => {
        try {
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

    getTasks = async (userId: ObjectId) => {
        try {
            const userDoc = await this.models.User.findById(userId);
            if(!userDoc) throw new Error(`Cannot get tasks for not registered user: ${userId}`);
            const tasks = await this.models.Task.find({ '_id': { $in: userDoc.tasks } });
            return tasks;
        } catch(e: any) {
            throw new Error(`Failed to get tasks. ${e.message}`);
        }
    };

    getTaskById = async (taskId: ObjectId) => {
        const taskDoc = await this.models.Task.findById(taskId);
        if(!taskDoc) throw new Error('Task not found');
        return taskDoc;
    };

    editTask = async (taskId: ObjectId, options: Partial<TaskData>) => {
        try {
            const taskDoc = await this.models.Task.findOneAndUpdate({ _id: taskId }, options, { new: true });
            return taskDoc;
        } catch (e) {

        }
    }
}