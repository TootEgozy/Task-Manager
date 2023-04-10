import chai, { expect } from 'chai';
import chaiAsPromised from 'chai-as-promised';
import { TaskManager } from "../../../services/TaskManager";
import { getModelForClass } from "@typegoose/typegoose";
import { User } from "../../../schemas/User";
import { Task } from "../../../schemas/Task";
import { SubTask } from "../../../schemas/SubTask";
import sinon from 'sinon';
import { afterEach } from "mocha";
import Seeder from "../../utils/seeder";

chai.use(chaiAsPromised);

describe('TaskManager', () => {
  const models = {
    User: getModelForClass(User),
    Task: getModelForClass(Task),
    SubTask: getModelForClass(SubTask),
  };
  const taskManager = new TaskManager(models);
  const seeder = new Seeder(models);

  describe('Create task', async () => {
    const sandbox = sinon.createSandbox();
    let taskSaveStub: sinon.SinonStub;
    let userSaveStub: sinon.SinonStub;
    let taskFindByIdStub: sinon.SinonStub;
    let userFindByIdStub: sinon.SinonStub;

    beforeEach(async() => {


        taskSaveStub = sinon.stub(models.Task.prototype, 'save');
        userSaveStub = sinon.stub(models.User.prototype, 'save');
        taskFindByIdStub = sinon.stub(models.Task.prototype, 'findById');
        userFindByIdStub = sinon.stub(models.User.prototype, 'findById');
    });
    afterEach(() => sandbox.restore());

    it('should create a task', async () => {
      const taskData = { a: 'b' };
      console.log(seeder.seedTask());
    });

    it('should fail to create a task if user is undefined', async () => {

    });
    it('should fail to create a task if saving it to user fails', async () => {

    })
  });
});