import {buildSchema, getModelForClass, prop} from '@typegoose/typegoose';
import { ObjectId } from 'bson';
import { User } from './User'
import { SubTask } from './SubTask';

//TODO limit the fields permissions by user degree

class Task {

   @prop({
       required: true,
       validate: {
           validator: async (userId: ObjectId) => {
               const userModel = getModelForClass(User);
               const userDoc = await userModel.findById(userId);
               return !!userDoc;
           },
           message: 'A task must belong to a user'
       }
   })
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
   public subTasks?: SubTask[];
}

const TaskSchema = buildSchema(Task);

export {Task, TaskSchema};