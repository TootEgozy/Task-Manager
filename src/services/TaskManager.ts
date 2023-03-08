import Models from "../types/models";
import {ObjectId} from "bson";
import {TaskData} from "../types/modelData";

export class TaskManager {

    models: Models;

    constructor(models: Models) {
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
        } catch (e) {
            throw new Error(`Failed to create a new task. ${e.message}`);
        }
    }
}