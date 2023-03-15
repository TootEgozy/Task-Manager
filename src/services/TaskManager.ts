import ModelsType from "../types/models.type";
import {ObjectId} from "bson";
import {TaskData} from "../types/modelData.type";

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
    }

    getTasks = async (userId: ObjectId) => {
        try {
            const userDoc = await this.models.User.findById(userId);
            if(!userDoc) throw new Error(`Cannot get tasks for not registered user: ${userId}`);
            const tasks = await this.models.Task.find({ '_id': { $in: userDoc.tasks } });
            return tasks;
        } catch(e: any) {
            throw new Error(`Failed to get tasks. ${e.message}`);
        }
    }
}