import type Models from "../../types/models";
import { SubTaskData, TaskData } from "../../types/modelData.type";
import { faker } from '@faker-js/faker';

export default class Seeder {

  models: Models

  constructor(models: Models) {
    this.models = models;
  }

  async seedTask(save?: false, taskData?: TaskData){
    const task = new this.models.Task({
      userId: faker.string.uuid(),
      title: faker.lorem.words(faker.number.int()),
      details: faker.lorem.words(faker.number.int()),
      done: faker.datatype.boolean(),
      subTasks: [],
      ...taskData ? taskData : {},
    })
    return task;
  }
}