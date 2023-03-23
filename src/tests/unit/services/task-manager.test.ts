import chai, { expect } from 'chai';
import chaiAsPromised from 'chai-as-promised';
import { TaskManager } from "../../../services/TaskManager";
import { getModelForClass } from "@typegoose/typegoose";
import { User } from "../../../schemas/User";
import { Task } from "../../../schemas/Task";
import { SubTask } from "../../../schemas/SubTask";
import sinon from 'sinon';
import { TaskManagerError } from "../../../utils/ExpandedError";

chai.use(chaiAsPromised);

describe('TaskManager', () => {
    const models = {
        User: getModelForClass(User),
        Task: getModelForClass(Task),
        SubTask: getModelForClass(SubTask),
    };
    const taskManager = new TaskManager(models);
    describe('Create task', async () => {
        const sandbox = sinon.createSandbox();
        let saveStub: sinon.SinonStub;
        let findByIdStub: sinon.SinonStub;


        it('should create a task', async () => {
            const err = new TaskManagerError('task manager has stopped responding');
            expect(1).to.eq(1);
        });
        it('should fail to create a task if user is undefined', async () => {

        });
        it('should fail to create a task if saving it to user fails', async () => {

        })
    });
});