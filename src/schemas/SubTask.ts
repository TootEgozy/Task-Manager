import { prop } from '@typegoose/typegoose';
import { ObjectId } from "bson";

//TODO limit the fields permissions by user degree

class SubTaskClass {

    // TODO: add validation so order is included in the number of subTasks existing for the task
// (cannot be order 7 when there are 3 tasks) and unique among the subTasks of the parent task.
@prop({ required: true})
order?: number;

@prop({
    required: true,
    validate: {
        validator: (title: string) => !!title.length,
        message: 'A task must include a content'
    }
})
public text?: string;

@prop({ default: false })
public done?: boolean;
}

export default SubTaskClass;