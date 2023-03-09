import UserClass from "../schemas/User";
import TaskClass from "../schemas/Task";
import SubTaskClass from "../schemas/SubTask";
import mongoose from 'mongoose';

export default interface ModelsType {
    User: mongoose.Model<UserClass>
    Task: mongoose.Model<TaskClass>
    SubTask: mongoose.Model<SubTaskClass>
}