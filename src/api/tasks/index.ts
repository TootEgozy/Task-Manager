import express, {Request, Response} from 'express';

const router = express.Router();

const tasks = (TaskManager: {}) => {
    // get all tasks
    // create new task
    // edit task by id
    // delete task
    // ...same for sub tasks
    router.get('/tasks', () => {});
};

export default tasks;