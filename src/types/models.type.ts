import { User } from "../schemas/User";
import { Task } from "../schemas/Task";
import { SubTask } from "../schemas/SubTask";
import {ReturnModelType} from "@typegoose/typegoose";

export default interface ModelsType {
    User: ReturnModelType<typeof User>
    Task: ReturnModelType<typeof Task>
    SubTask: ReturnModelType<typeof SubTask>
}