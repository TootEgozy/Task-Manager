import { prop } from 'typegoose';
import { ObjectId } from "bson";

class TaskSchema {

   @prop()
    public userId?: ObjectId;

   @prop({
       required: true,
       validate: {
           validator: (title) => !!title.length,
           message: 'A task must include a title'
       }
   })
   public title?: string;

   @prop()
   public details?: string | string[];

    @prop({ default: false })
    public done?: boolean;

   @prop()
   public subTasks?: string;
}

export default TaskSchema;