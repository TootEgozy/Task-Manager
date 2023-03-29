import type Models from "../../types/models";
import { SubTaskData, TaskData } from "../../types/modelData.type";
import { ObjectId } from "bson";
import * as faker from 'faker';

export default class Seeder {

  models: Models

  constructor(models: Models) {
    this.models = models;
  }

  async seedTask(save = false, taskData: TaskData){
    const task = new this.models.Task({
      userId: faker.datatype.uuid(),
      title: faker.random.words(faker.datatype.number()),
      details: faker.random.words(faker.datatype.number()),
      done: faker.datatype.boolean(),
      subTasks: [],
      ...taskData,
    })
  }
}