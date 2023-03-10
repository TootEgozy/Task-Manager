import {buildSchema, prop} from '@typegoose/typegoose';
import { ObjectId } from "bson";
import { SubTaskClass } from "./SubTask";

//TODO limit the fields permissions by user degree

class TaskClass {

   @prop()
    public userId?: ObjectId;

   @prop({
       required: true,
       validate: {
           validator: (title: string) => !!title.length,
           message: 'A task must include a title'
       }
   })
   public title?: string;

   @prop()
   public details?: string | string[];

    @prop({ default: false })
    public done?: boolean;

   @prop()
   public subTasks?: SubTaskClass[];
}

const TaskSchema = buildSchema(TaskClass);

export {TaskClass, TaskSchema};