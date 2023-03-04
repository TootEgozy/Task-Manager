import { prop } from 'typegoose';
import { ObjectId } from "bson";

class SubTaskSchema {

    // TODO: add validation so order is included in the number of subTasks existing for the task
    // (cannot be order 7 when there are 3 tasks) and unique among the subTasks of the parent task.
    @prop({ required: true})
    order?: number;

    @prop({
        required: true,
        validate: {
            validator: (title) => !!title.length,
            message: 'A task must include a content'
        }
    })
    public text?: string;

    @prop({ default: false })
    public done?: boolean;
}

export default SubTaskSchema;