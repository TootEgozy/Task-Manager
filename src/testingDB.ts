import ModelsType from "./types/models.type";
import ServicesType from "./types/services.type";
import {ObjectId} from "bson";

const testingDB = async (models: ModelsType, services: ServicesType) => {
    try {
        console.log('hi!');
        const user = await new models.User({
            name: 'testUser',
            email: 'any@gmail.com',
        }).save();

        const subtask = await new models.SubTask({
            text: 'subtask text 1',
            order: 1,
        }).save();
        console.log(JSON.stringify(subtask));

        const task = await new models.Task({
            userId: user._id,
            title: 'task',
            details: 'any details',
            subTasks: [subtask],
        }).save();

        console.log(JSON.stringify(task));

        const editedSubtask = JSON.parse(JSON.stringify(subtask));
        editedSubtask.text = 'subtask text 2';
        editedSubtask._id = new ObjectId();

        const data: Record<string, any> = {
            title: 'task - edited',
            details: 'any details',
            subTasks: [editedSubtask],
        };
        Object.keys(data).forEach((key) => task[key as keyof typeof task] = data[key]);
        await task.save();
        console.log(JSON.stringify(task));
    } catch (e) {
        console.log(e);
    }
};

export default testingDB;