import { buildSchema, getModelForClass, prop } from '@typegoose/typegoose';
import { ObjectId } from 'bson';
import { User } from './User'
import { SubTask, SubTaskSchema } from './SubTask';
import { Schema } from 'mongoose'

//TODO limit the fields permissions by user degree

const subtaskModel = getModelForClass(SubTask);

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
       },
       type: ObjectId,
   })
    public userId!: ObjectId;

   @prop({
       required: true,
       validate: {
           validator: (title: string) => !!title.length,
           message: 'A task must include a title'
       },
       type: Schema.Types.String,
   })
   public title!: string;

   @prop({ type: Schema.Types.String || Schema.Types.Array })
   public details!: string | string[];

    @prop({ default: false, type: Schema.Types.Boolean })
    public done!: boolean;

   @prop({ type: () => [SubTask] })
   public subTasks!: [SubTask: { type: Schema.Types.Subdocument }];
}

const TaskSchema = buildSchema(Task);
export {Task, TaskSchema};