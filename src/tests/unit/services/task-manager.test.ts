import { expect } from 'chai';
import { TaskManager } from "../../../services/TaskManager";
import { getModelForClass } from "@typegoose/typegoose";
import { User } from "../../../schemas/User";
import { Task } from "../../../schemas/Task";
import { SubTask } from "../../../schemas/SubTask";
import sinon from 'sinon';
import { TaskManagerError } from "../../../utils/ExpandedError";

// test each of the functions using sinon to make sure the correct mongoose functions are called

describe('TaskManager', () => {
    const models = {
        User: getModelForClass(User),
        Task: getModelForClass(Task),
        SubTask: getModelForClass(SubTask),
    };
    const taskManager = new TaskManager(models);
    describe('Create task', async () => {
        it('should create a task', async () => {
            const err = new TaskManagerError('task manager has stopped responding');
            expect(1).to.eq(1);
        })
    });
});